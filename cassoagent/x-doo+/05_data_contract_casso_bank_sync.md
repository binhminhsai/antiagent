# 📄 Data Contract — CASSO API ↔ Odoo Bank Statement

> **Module:** `casso_bank_sync` (M1)
> **Phiên bản:** v0.1 | 18/5/2026 | Tech Lead: MinhCQ
> **Odoo target:** 17.0 Community Edition
> **Status:** Draft — cần review trước Sprint 2 (02/06)

---

## 1. Tóm tắt 1 trang

**Nguồn (Source):** CASSO Transaction API — `GET /v2/transactions` hoặc webhook payload

**Đích (Target):** Odoo model `account.bank.statement.line` (mỗi giao dịch CASSO = 1 statement line)

**Volume dự kiến:** ~100-500 transactions/ngày cho CASSO nội bộ, có thể tăng đến 10,000+/ngày khi scale ở Q1/27

**Critical insight:** CASSO schema **giàu hơn** Odoo schema. Có 8/15 fields CASSO không có chỗ chứa native trong Odoo → cần **extend model** với custom fields. Không làm điều này = mất data quan trọng (BIN ngân hàng đối ứng, virtual account, payment channel) → khó reconcile và audit.

**3 quyết định kỹ thuật cần chốt trước Sprint 2:**

| # | Quyết định | Đề xuất | Owner |
|---|---|---|---|
| Q1 | Đặt custom fields trực tiếp trên `account.bank.statement.line` hay tạo model `casso.transaction.raw` riêng? | **Extend `account.bank.statement.line`** + giữ `casso_raw_payload` để audit | Dev Lead |
| Q2 | Dùng `unique_import_id` chuẩn OCA hay custom field riêng để dedup? | Dùng **`unique_import_id`** (chuẩn OCA — tương thích Odoo App Store reviewer) | Dev Lead |
| Q3 | Map `paymentChannel` thành Selection enum hay Char free-text? | **Selection** với 4 values cố định + 1 "other" fallback (data từ CASSO API là controlled vocab) | Dev1 |

---

## 2. CASSO Source Schema (input)

Đây là schema bạn cung cấp, format hóa lại để dễ tham chiếu:

```typescript
// CASSO API response: GET /v2/transactions
interface CassoTransaction {
  // === REQUIRED ===
  reference: string;             // Transaction reference từ ngân hàng (unique trong scope account)
  transactionDate: string;       // Format: "YYYY-MM-DD" (valueDate)
  amount: number;                // Số dương = tiền vào, số âm = tiền ra
  description: string;           // Nội dung chuyển khoản (free text từ ngân hàng)
  accountNumber: string;         // Số TK CASSO của doanh nghiệp (để xác định journal)

  // === NULLABLE ===
  transactionDateTime: string | null;  // ISO 8601: "2023-12-28T15:53:26+07:00"
  bookingDate: string | null;          // Thời điểm post lên sổ ngân hàng
  runningBalance: number | null;       // Số dư sau giao dịch
  virtualAccountNumber: string | null; // Số TK ảo (nếu có)
  virtualAccountName: string | null;   // Tên TK ảo
  paymentChannel: string | null;       // "Napas247" | "Nội bộ" | "Citad" | "Swift"
  counterAccountNumber: string | null; // Số TK đối ứng
  counterAccountName: string | null;   // Tên chủ TK đối ứng
  counterAccountBankId: string | null; // BIN ngân hàng đối ứng (6 số, vd "970422")
  counterAccountBankName: string | null; // Tên ngân hàng đối ứng (vd "MB Bank")
}
```

**Ghi chú:**
- `reference` là **business key** từ CASSO — quan trọng cho dedup
- `amount` đã có dấu (signed), không cần xử lý debit/credit riêng
- `paymentChannel` là controlled vocab — chỉ có 4 giá trị có thể
- BIN VN có chuẩn 6 chữ số (Vietcombank=970436, MB=970422, OCB=970448...)

---

## 3. Odoo Target Schema (output)

### 3.1 Standard fields trên `account.bank.statement.line` (Odoo 17 CE)

Đây là các fields có sẵn trong Odoo, không cần install gì thêm:

| Field | Type | Required | Mô tả |
|---|---|:---:|---|
| `journal_id` | Many2one → `account.journal` | ✅ | Bank journal (1 journal = 1 tài khoản ngân hàng) |
| `date` | Date | ✅ | Ngày giao dịch (chỉ date, không có time) |
| `payment_ref` | Char | ✅ | "Label" hiển thị trong reconciliation widget. Đây là field user nhìn thấy nhiều nhất |
| `amount` | Monetary | ✅ | Số tiền (đã có dấu) |
| `currency_id` | Many2one → `res.currency` | auto | Tự động từ journal nếu cùng currency |
| `partner_id` | Many2one → `res.partner` | optional | Đối tác trong DB (nếu match được) |
| `partner_name` | Char | optional | Tên đối tác **khi chưa có trong DB** — Odoo sẽ dùng cho auto-create partner lúc reconcile |
| `account_number` | Char | optional | Số TK đối ứng |
| `narration` | Html | optional | Note dài, hỗ trợ rich text |
| `ref` | Char | optional | Reference phụ |
| `transaction_type` | Char | optional | Loại giao dịch (Odoo standard nhưng để free-text) |
| `amount_currency` | Monetary | optional | Số tiền ngoại tệ (cho Swift transactions) |
| `foreign_currency_id` | Many2one → `res.currency` | optional | Ngoại tệ |
| `unique_import_id` | Char | optional | **KEY FIELD** — chuẩn OCA cho dedup khi import từ external sources |
| `state` | Selection | auto | `draft` / `posted` / `cancel` |
| `move_id` | Many2one → `account.move` | auto | Journal entry được tạo tự động khi reconcile |

### 3.2 Custom fields cần thêm (extend `account.bank.statement.line`)

CASSO có 8 fields **không có chỗ chứa native** trong Odoo. Đề xuất extend model:

```python
# File: casso_bank_sync/models/account_bank_statement_line.py

from odoo import models, fields

class AccountBankStatementLine(models.Model):
    _inherit = 'account.bank.statement.line'

    # === Datetime fields ===
    casso_transaction_datetime = fields.Datetime(
        string="Transaction Datetime",
        help="Thời điểm giao dịch đầy đủ (date + time) từ CASSO. "
             "Khác với 'date' chỉ có ngày."
    )
    casso_booking_date = fields.Date(
        string="Booking Date",
        help="Ngày post lên sổ ngân hàng. Có thể khác với transaction date "
             "(ví dụ giao dịch cuối tuần)."
    )

    # === Balance ===
    casso_running_balance = fields.Monetary(
        string="Running Balance (CASSO)",
        currency_field='currency_id',
        help="Số dư sau giao dịch theo data từ CASSO API. "
             "Dùng để cross-check với Odoo's computed running balance."
    )

    # === Virtual Account (cho cổng thanh toán, MoMo-style) ===
    casso_virtual_account_number = fields.Char(
        string="Virtual Account Number",
        index=True,  # Index vì sẽ query nhiều cho auto-matching
        help="Số TK ảo. VD: VA của các cổng thanh toán."
    )
    casso_virtual_account_name = fields.Char(
        string="Virtual Account Name"
    )

    # === Payment channel (controlled vocab) ===
    casso_payment_channel = fields.Selection([
        ('napas247', 'Napas 24/7'),
        ('internal', 'Nội bộ ngân hàng'),
        ('citad', 'Citad'),
        ('swift', 'Swift'),
        ('other', 'Khác'),
    ], string="Payment Channel", index=True)

    # === Counter bank info (cho reconciliation và compliance) ===
    casso_counter_bank_bin = fields.Char(
        string="Counter Bank BIN",
        size=6,
        help="BIN (Bank Identification Number) 6 chữ số của ngân hàng đối ứng. "
             "VD: 970436 (Vietcombank), 970422 (MB Bank)."
    )
    casso_counter_bank_name = fields.Char(
        string="Counter Bank Name"
    )

    # === Audit trail ===
    casso_raw_payload = fields.Text(
        string="CASSO Raw Payload",
        readonly=True,
        help="JSON gốc từ CASSO API. Phục vụ audit và debug. "
             "Không hiển thị trong list view."
    )
    casso_synced_at = fields.Datetime(
        string="CASSO Sync Time",
        readonly=True,
        help="Timestamp khi record được sync từ CASSO. "
             "Dùng để measure latency."
    )
```

**Vì sao chọn extend `account.bank.statement.line` thay vì tạo model riêng `casso.transaction.raw`:**

- **Pro extend:** Mọi tool Odoo (reconciliation widget, reports, filters) work ngay với data CASSO. Không cần copy data 2 nơi.
- **Con extend:** Custom fields hiện trên TẤT CẢ statement lines (kể cả non-CASSO). Acceptable vì hầu hết nullable.
- **Decision:** Đi extend. Nếu sau này nhiều provider khác (Plaid VN v2), refactor thành abstract base.

---

## 4. Field Mapping Table (CASSO → Odoo)

| # | CASSO field | → | Odoo field | Transformation |
|---|---|:---:|---|---|
| 1 | `reference` | → | `unique_import_id` + `ref` | `unique_import_id = f"casso_{accountNumber}_{reference}"`. `ref = reference`. |
| 2 | `transactionDate` | → | `date` | `datetime.strptime(transactionDate, "%Y-%m-%d").date()` |
| 3 | `transactionDateTime` | → | `casso_transaction_datetime` | Parse ISO 8601 với timezone. Lưu UTC trong Odoo (Odoo conv). |
| 4 | `bookingDate` | → | `casso_booking_date` | Parse YYYY-MM-DD. Nullable. |
| 5 | `amount` | → | `amount` | Direct copy. CASSO đã có dấu (+ in, − out). |
| 6 | `description` | → | `payment_ref` + `narration` | `payment_ref = description[:64]` (Odoo display limit ~64 chars), `narration = f"<p>{description}</p>"` (full text, HTML escape). |
| 7 | `runningBalance` | → | `casso_running_balance` | Direct copy. Cross-check với Odoo computed balance. |
| 8 | `accountNumber` | → | (used to lookup `journal_id`) | Match `res.partner.bank.acc_number` → tìm `account.journal` được link với bank đó. Nếu không match → reject transaction (config error). |
| 9 | `virtualAccountNumber` | → | `casso_virtual_account_number` | Direct copy. |
| 10 | `virtualAccountName` | → | `casso_virtual_account_name` | Direct copy. |
| 11 | `paymentChannel` | → | `casso_payment_channel` + `transaction_type` | Map theo bảng dưới. |
| 12 | `counterAccountNumber` | → | `account_number` | Direct copy (standard Odoo field). |
| 13 | `counterAccountName` | → | `partner_name` + (lookup `partner_id`) | Set `partner_name` luôn. Nếu match được partner trong DB qua `counterAccountNumber` → set `partner_id` luôn. |
| 14 | `counterAccountBankId` | → | `casso_counter_bank_bin` | Direct copy (BIN 6 chữ số). |
| 15 | `counterAccountBankName` | → | `casso_counter_bank_name` | Direct copy. |

### 4.1 Mapping `paymentChannel`

| CASSO value | Odoo `casso_payment_channel` | Odoo `transaction_type` (for filters) |
|---|---|---|
| `"Napas247"` | `napas247` | `napas247` |
| `"Nội bộ"` | `internal` | `internal_transfer` |
| `"Citad"` | `citad` | `citad` |
| `"Swift"` | `swift` | `swift_transfer` |
| `null` hoặc khác | `other` | `unknown` |

### 4.2 Partner matching logic (3-level fallback)

```python
def _resolve_partner(self, counter_account_number, counter_account_name, counter_bank_bin):
    """
    Try to resolve Odoo partner from CASSO counterparty info.
    Returns: (partner_id, partner_name) — partner_id có thể None.
    """
    # Level 1: Match by exact bank account number
    if counter_account_number:
        bank_account = self.env['res.partner.bank'].search([
            ('acc_number', '=', counter_account_number.strip())
        ], limit=1)
        if bank_account:
            return bank_account.partner_id.id, counter_account_name

    # Level 2: Fuzzy match by partner name (only if Level 1 fails)
    if counter_account_name:
        # Normalize: lowercase, remove diacritics, strip
        normalized = self._normalize_partner_name(counter_account_name)
        partner = self.env['res.partner'].search([
            ('casso_normalized_name', '=', normalized)
        ], limit=1)
        if partner:
            return partner.id, counter_account_name

    # Level 3: Not found — return only the name for lazy creation
    return None, counter_account_name
```

**Lưu ý:** Level 2 cần thêm field `casso_normalized_name` trên `res.partner` (compute field, indexed). Chỉ làm Level 2 nếu user enable trong settings (vì false positives có thể nguy hiểm — gán nhầm partner).

---

## 5. Deduplication Strategy

**Đây là phần dễ sai nhất.** Mất dedup → double-booking giao dịch → kế toán mất uy tín.

### 5.1 Quy ước `unique_import_id`

```
unique_import_id = "casso_{accountNumber}_{reference}"

Examples:
  casso_0123456789_FT24001234567
  casso_0987654321_TRX20240528001
```

**Vì sao kết hợp `accountNumber` + `reference`:**

- Reference từ CASSO unique trong scope **per-account**, không phải global
- Nếu CASSO thay đổi reference format → prefix `casso_` cho phép phân biệt với providers khác sau này

### 5.2 Database constraint

```python
class AccountBankStatementLine(models.Model):
    _inherit = 'account.bank.statement.line'

    _sql_constraints = [
        ('casso_unique_import_id',
         'UNIQUE(unique_import_id)',
         'Giao dịch CASSO này đã được sync trước đó.')
    ]
```

### 5.3 Khi nào KHÔNG dedup (edge case)

CASSO có thể gửi lại transaction nếu họ phát hiện sai sót (correction). Trong trường hợp này, transaction có **cùng `reference` nhưng `bookingDate` khác**. Cách xử lý:

1. **Default:** Skip (giữ record gốc, log warning)
2. **Có cờ `force_resync`:** Update record gốc thay vì tạo mới (chỉ admin được phép)

Tuyệt đối **KHÔNG soft-delete + insert lại** vì sẽ phá vỡ reconciliation đã có.

### 5.4 Webhook delivery semantics

CASSO webhook là **at-least-once delivery** (có thể gửi cùng 1 transaction 2+ lần nếu CASSO không nhận được ACK). Module phải xử lý idempotent:

```python
def _process_webhook(self, payload):
    try:
        existing = self.env['account.bank.statement.line'].search([
            ('unique_import_id', '=', f"casso_{payload['accountNumber']}_{payload['reference']}")
        ], limit=1)
        if existing:
            _logger.info(f"Duplicate webhook for {existing.unique_import_id}, skipping.")
            return True  # Return 200 to CASSO để stop retries
        # ... create line ...
    except Exception as e:
        _logger.error(f"Webhook processing failed: {e}")
        return False  # CASSO will retry
```

---

## 6. Transformation Examples

### Example 1 — Giao dịch nhận từ khách hàng qua Napas247

**Input (từ CASSO):**
```json
{
  "reference": "FT24142001234567",
  "transactionDate": "2026-05-22",
  "transactionDateTime": "2026-05-22T14:23:45+07:00",
  "bookingDate": "2026-05-22",
  "amount": 5000000,
  "description": "CTY ABC THANH TOAN HD0001 - REF FT24142001234567",
  "runningBalance": 125000000,
  "accountNumber": "0123456789",
  "virtualAccountNumber": null,
  "virtualAccountName": null,
  "paymentChannel": "Napas247",
  "counterAccountNumber": "9876543210",
  "counterAccountName": "CONG TY TNHH ABC",
  "counterAccountBankId": "970436",
  "counterAccountBankName": "Vietcombank"
}
```

**Output (Odoo `account.bank.statement.line`):**
```python
{
    'journal_id': 5,  # MB Bank journal (lookup from accountNumber)
    'date': '2026-05-22',
    'payment_ref': 'CTY ABC THANH TOAN HD0001 - REF FT24142001234567',
    'amount': 5000000.0,
    'currency_id': 1,  # VND
    'partner_id': 42,  # CONG TY TNHH ABC (matched by counterAccountNumber)
    'partner_name': 'CONG TY TNHH ABC',
    'account_number': '9876543210',
    'narration': '<p>CTY ABC THANH TOAN HD0001 - REF FT24142001234567</p>',
    'ref': 'FT24142001234567',
    'unique_import_id': 'casso_0123456789_FT24142001234567',
    'transaction_type': 'napas247',
    # Custom CASSO fields
    'casso_transaction_datetime': '2026-05-22 07:23:45',  # UTC
    'casso_booking_date': '2026-05-22',
    'casso_running_balance': 125000000.0,
    'casso_payment_channel': 'napas247',
    'casso_counter_bank_bin': '970436',
    'casso_counter_bank_name': 'Vietcombank',
    'casso_raw_payload': '{"reference":"FT24142001234567",...}',
    'casso_synced_at': '2026-05-22 07:23:50',
}
```

### Example 2 — Giao dịch qua Virtual Account (cổng thanh toán)

**Input:**
```json
{
  "reference": "VA20260522001",
  "transactionDate": "2026-05-22",
  "transactionDateTime": "2026-05-22T09:15:30+07:00",
  "amount": 199000,
  "description": "Thanh toan don hang #ORD-2026-1234 qua Momo",
  "accountNumber": "0123456789",
  "virtualAccountNumber": "VA999000123456",
  "virtualAccountName": "CASSO - ORD-2026-1234",
  "paymentChannel": "Napas247",
  "counterAccountNumber": "0901234567",
  "counterAccountName": "NGUYEN VAN A",
  "counterAccountBankId": "970422",
  "counterAccountBankName": "MB Bank"
}
```

**Output (key changes vs Example 1):**
- `payment_ref`: vẫn dùng description
- `casso_virtual_account_number`: `"VA999000123456"` (sẽ trigger auto-reconciliation rule với sale order ORD-2026-1234)
- `casso_virtual_account_name`: `"CASSO - ORD-2026-1234"`
- `partner_id`: `None` (khách lẻ, không match), `partner_name`: `"NGUYEN VAN A"`

**Insight:** Virtual account number là **key để auto-match với sale order/invoice**. Trong Sprint 2 task "Code thuật toán Auto-matching", logic chính sẽ là:

```python
# Pseudo-code for auto-match by virtual account
if line.casso_virtual_account_number:
    # Extract order ref from virtual account name (regex pattern)
    match = re.search(r'ORD-\d{4}-\d+', line.casso_virtual_account_name or '')
    if match:
        order = self.env['sale.order'].search([('name', '=', match.group())])
        if order and order.amount_total == line.amount:
            # Auto-create reconciliation
            line._auto_reconcile_with_order(order)
```

### Example 3 — Giao dịch ra (chi tiền) qua Citad

**Input:**
```json
{
  "reference": "CITAD-2026052200078",
  "transactionDate": "2026-05-22",
  "amount": -120000000,
  "description": "CHUYEN KHOAN LUONG THANG 5 - 12 NHAN VIEN",
  "accountNumber": "0123456789",
  "paymentChannel": "Citad",
  "counterAccountNumber": null,
  "counterAccountName": "NHIEU NGUOI HUONG",
  "counterAccountBankId": null,
  "counterAccountBankName": null
}
```

**Output (edge case):**
- `amount`: `-120000000.0` (giữ dấu âm)
- `partner_id`: `None` (vì counterparty là "nhiều người")
- `partner_name`: `"NHIEU NGUOI HUONG"` (giữ làm reference)
- `account_number`: `None`
- `casso_payment_channel`: `'citad'`
- `casso_counter_bank_bin`: `None`

**Lưu ý:** Giao dịch batch (chuyển lương) không có counterAccount đầy đủ. Module cần handle null gracefully, không reject.

---

## 7. Edge Cases & Error Handling

| # | Edge Case | Xử lý |
|---|---|---|
| E1 | `accountNumber` không match journal nào trong Odoo | Reject, log error, alert admin. Không tạo record. |
| E2 | `amount = 0` | Reject (Odoo không cho `amount = 0` trên statement line). |
| E3 | `transactionDate` ở tương lai (clock skew) | Cảnh báo nhưng vẫn tạo record. |
| E4 | `transactionDate` trước period đã đóng sổ kế toán | Reject + alert kế toán. |
| E5 | `description` quá dài (>1000 chars) | Truncate `payment_ref` to 64, full text vẫn vào `narration` và `casso_raw_payload`. |
| E6 | `description` chứa ký tự HTML/script | Escape HTML khi gán vào `narration` (use `markupsafe.escape`). |
| E7 | `counterAccountNumber` match nhiều partners (cùng số TK ở nhiều partner — rare nhưng có) | Set `partner_id = None`, set `partner_name`. Để user manual chọn lúc reconcile. |
| E8 | Webhook duplicate (cùng `reference`) | Skip + log + return 200. |
| E9 | CASSO API trả về lỗi 500 | Retry với exponential backoff (1s, 2s, 4s, max 5 lần). Sau đó alert. |
| E10 | `paymentChannel` value mới chưa từng thấy | Map về `'other'`, log warning. Không reject. |
| E11 | `counterAccountBankId` không phải 6 chữ số | Vẫn lưu (some banks dùng format khác) + log warning. |
| E12 | Foreign currency transaction (Swift) | Cần fetch `amount_currency` + `foreign_currency_id` — **CHƯA SUPPORT trong MVP**. Reject với error rõ. |
| E13 | Timezone không có trong `transactionDateTime` | Default to GMT+7 (Vietnam). |
| E14 | `bookingDate < transactionDate` | Hiếm nhưng có thể (giao dịch cuối tuần). Vẫn lưu cả 2. |
| E15 | `runningBalance` không khớp với Odoo computed | Log discrepancy, không block. Hiển thị warning trong UI. |

---

## 8. Idempotency & Retry Logic

### 8.1 Pull mode (CASSO API polling)

```python
def _cron_sync_casso_transactions(self):
    """
    Cron job chạy mỗi 30 phút.
    Logic: fetch all transactions since last_sync_at, dedup, upsert.
    """
    for journal in self.env['account.journal'].search([('casso_enabled', '=', True)]):
        try:
            last_sync = journal.casso_last_sync_at or (now - timedelta(days=7))
            transactions = self._fetch_casso_transactions(
                account_number=journal.casso_account_number,
                since=last_sync,
            )
            for txn in transactions:
                self._create_statement_line_from_casso(txn, journal)
            journal.casso_last_sync_at = fields.Datetime.now()
        except Exception as e:
            _logger.error(f"Sync failed for journal {journal.name}: {e}")
            # Don't update last_sync_at — retry next cycle
```

### 8.2 Push mode (webhook)

Endpoint: `POST /casso/webhook` với HMAC signature header.

```python
@http.route('/casso/webhook', type='json', auth='public', csrf=False)
def casso_webhook(self, **kwargs):
    # Verify HMAC signature
    if not self._verify_signature(request.httprequest):
        return {'error': 'Invalid signature'}, 401

    payload = request.jsonrequest
    # Process idempotent
    line = self._create_statement_line_from_casso(payload['data'])
    return {'status': 'ok', 'line_id': line.id}
```

**Pull vs Push trade-off:**

| | Pull (cron) | Push (webhook) |
|---|---|---|
| Latency | 30 phút | Real-time |
| Reliability | High (Odoo controls) | Phụ thuộc webhook delivery |
| Complexity | Thấp | Cao (cần endpoint, signature, retry) |
| Phù hợp Sprint 1? | ✅ | ❌ (làm Sprint 2-3) |

**Đề xuất:** Sprint 1 chỉ build **Pull mode**. Push mode (webhook) làm Sprint 2 sau khi pull stable.

---

## 9. Data Contract Versioning

CASSO API có thể thay đổi schema (thêm field, đổi format). Module cần resilient.

### 9.1 Strategy

1. **Lưu raw payload luôn** (`casso_raw_payload`) — nếu CASSO đổi mapping, có thể re-parse từ raw.
2. **Schema version field** trên mỗi line — `casso_schema_version` (Char) lưu version API đã dùng lúc sync.
3. **Field whitelisting** — chỉ parse các field đã biết. Field mới = log info, không reject.
4. **Backward compatibility test suite** — sample payloads của v1, v2, v3 phải đều parse được.

```python
class AccountBankStatementLine(models.Model):
    _inherit = 'account.bank.statement.line'

    casso_schema_version = fields.Char(
        string="CASSO API Version",
        default='v2',
        readonly=True,
    )
```

### 9.2 Khi nào bump version

- CASSO breaking change → bump major (v2 → v3)
- CASSO thêm field optional → bump minor (v2.1 → v2.2), không cần migrate

---

## 10. Implementation Checklist cho Sprint 1-2

### Sprint 1 (19/05 - 01/06) — Data Integration

**[F3 - Bank Feed] Setup Webhook... → đổi thành: Setup Pull-based sync**

Tôi đề xuất downgrade Sprint 1 task từ "Setup Webhook" thành "Setup Pull-based cron sync" vì:
1. Webhook cần expose public endpoint — phức tạp với Odoo dev environment
2. Pull mode đơn giản hơn, test dễ hơn
3. Webhook làm sau khi pull stable (Sprint 2)

**Checklist Sprint 1:**

- [ ] **Day 1-2 (19-20/5):** Tạo module skeleton `casso_bank_sync` với manifest đúng chuẩn marketplace
- [ ] **Day 2-3 (20-21/5):** Extend `account.bank.statement.line` với 9 custom fields (xem section 3.2)
- [ ] **Day 3-4 (21-22/5):** Extend `account.journal` với:
  - `casso_enabled` (Boolean)
  - `casso_api_key` (Char, encrypted)
  - `casso_account_number` (Char)
  - `casso_last_sync_at` (Datetime)
- [ ] **Day 4-5 (22-25/5):** Build settings UI cho CASSO API config trên journal
- [ ] **Day 5-7 (25-27/5):** Implement `_fetch_casso_transactions` helper (gọi CASSO API)
- [ ] **Day 7-9 (27-29/5):** Implement `_create_statement_line_from_casso` mapper (full transformation logic)
- [ ] **Day 9-10 (29-31/5):** Implement cron job + dedup logic
- [ ] **Day 10-11 (31/5-1/6):** Smoke test với CASSO sandbox API, log 3-5 transactions thật

**Deliverable Sprint 1:** Chị Mỹ mở Odoo, thấy bank statement lines hiện ra với data CASSO. **Chưa cần** auto-matching hay tạo journal entry — đó là Sprint 2.

### Sprint 2 (02-15/06) — Accounting Logic

- [ ] Auto-matching algorithm (dựa trên virtual account, amount, partner)
- [ ] Auto-Journal Entry khi user click "Khớp"
- [ ] Webhook endpoint (push mode, optional)
- [ ] Parallel Run với chị Mỹ

---

## 11. Open Questions cần align trước Sprint 1

| # | Câu hỏi | Hỏi ai |
|---|---|---|
| Q1 | CASSO API có document chính thức schema không? File `Fre_de_rics_2024.pdf` trong project có liên quan? | Anh Điệp / Dev CASSO |
| Q2 | Rate limit của CASSO API là bao nhiêu? Có cần backoff aggressive không? | Dev CASSO |
| Q3 | CASSO có gửi historical transactions (vd 30 ngày trước) khi sync lần đầu không? | Dev CASSO |
| Q4 | `runningBalance` từ CASSO có chính xác 100% không, hay có lag? | Dev CASSO |
| Q5 | BIN list — chị Mỹ có muốn dùng `casso_counter_bank_bin` để query partners theo bank không? | Chị Mỹ |
| Q6 | Custom fields có cần dịch tiếng Việt trên UI không? (Đề xuất: Có) | Chị Mỹ + MinhCQ |
| Q7 | Khi đăng module lên apps.odoo.com, có muốn các custom fields prefix là `casso_` (rõ ràng) hay `x_` (chuẩn Odoo Studio)? | Dev Lead |

---

## 12. Reference Materials

- Odoo 17 source: `/addons/account/models/account_bank_statement_line.py` (Odoo CE GitHub)
- OCA standard: `OCA/bank-statement-import` repo, branch `17.0`
- CASSO API docs: `docs.casso.vn/api` (đã tham chiếu trong sprint kanban)
- BIN list VN: Tham khảo Napas (https://napas.com.vn) — 50+ BINs Vietnam banks

---

*File này là living document. Update sau mỗi quyết định kỹ thuật.*
*Lần cập nhật cuối: 18/5/2026 — MinhCQ*
