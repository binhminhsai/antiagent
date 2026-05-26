# 📄 Module Design — Tạo KH/NCC tự động từ API MST

> **Module:** `casso_partner_mst` (M3)
> **Phiên bản:** v0.1 | 18/5/2026 | Tech Lead: MinhCQ
> **Odoo target:** 17.0 Community Edition
> **Trạng thái:** Design draft — cần review trước Sprint 1

---

## 1. Tóm tắt 1 trang

**Vấn đề:**
Kế toán và nhân viên Sales/Purchase ở doanh nghiệp VN đang lặp đi lặp lại 1 thao tác: mỗi khi gặp khách hàng/NCC mới, phải mở Google → tracuunnt.gdt.gov.vn → tra MST → copy tên công ty + địa chỉ + người đại diện → quay lại phần mềm → paste vào form. Lặp lại ở mỗi nơi: tạo hóa đơn đầu vào, hóa đơn đầu ra, báo giá, phiếu nhập kho, contract... Mỗi lần là 30-60 giây, **một ngày mất 30-60 phút**, một tháng = **10-20 giờ làm việc**.

**Hậu quả phụ:** Nhập tay → sai chính tả tên công ty → cùng 1 doanh nghiệp tồn tại 3-5 record trong DB (vd "CTY TNHH ABC", "Cong Ty TNHH ABC", "Công ty trách nhiệm hữu hạn ABC"). Hệ quả: báo cáo công nợ sai, gửi nhầm hóa đơn, vi phạm khi đối chiếu thuế.

**Giải pháp:**
Module `casso_partner_mst` cho phép user **chỉ cần nhập MST** ở bất kỳ form nào có liên quan partner. Module sẽ:

1. Validate MST format (10 hoặc 13 chữ số)
2. Check DB local trước — nếu đã có partner với MST đó → return luôn
3. Nếu chưa có → gọi CASSO API → lấy data từ GDT/VNPT/Viettel → preview cho user xác nhận
4. Tạo `res.partner` mới (hoặc update existing) với đầy đủ thông tin
5. Auto-link vào form đang mở

**3 quyết định kiến trúc cần chốt:**

| # | Decision | Đề xuất | Rationale |
|---|---|---|---|
| Q1 | Module độc lập, hay coupling vào `casso_bank_sync`? | **Độc lập** | Module MST có thể đứng riêng — bán/cài cho ai chưa cần Bank Sync. Coupling sẽ làm tăng install size không cần thiết. |
| Q2 | Lookup trigger là button thủ công hay `@api.onchange` tự động? | **Cả 2** — onchange khi VAT đã match regex hợp lệ + button "Tra cứu MST" cho retry manual | Onchange UX tốt hơn nhưng có thể trigger ngoài ý muốn. Button làm fallback. |
| Q3 | Khi MST đã có partner trong DB, hỏi user "dùng partner hiện tại hay update"? | **Default: dùng partner hiện tại**, có option "Cập nhật thông tin từ MST" | Tránh ghi đè data user đã chỉnh tay (vd email, phone) |

---

## 2. Tại sao module này là "đòn bẩy" trong Odoo

### 2.1 Kiến trúc đặc biệt của Odoo

```
╔══════════════════════════════════════════════════════════════════════╗
║              ODOO PARTNER ARCHITECTURE                               ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║                    ┌───────────────────────────┐                     ║
║                    │      res.partner          │                     ║
║                    │  ─────────────────────    │                     ║
║                    │  name, vat, address...    │  ← MỘT model duy   ║
║                    │  customer_rank: int       │     nhất cho tất    ║
║                    │  supplier_rank: int       │     cả loại "đối    ║
║                    │  is_company: bool         │     tác"            ║
║                    └────────────┬──────────────┘                     ║
║                                 │                                    ║
║         ┌───────────┬───────────┼───────────┬───────────┐            ║
║         │           │           │           │           │            ║
║         ▼           ▼           ▼           ▼           ▼            ║
║  ┌────────┐  ┌──────────┐ ┌──────────┐ ┌────────┐ ┌──────────┐      ║
║  │ Sales  │  │ Purchase │ │Accounting│ │  CRM   │ │   POS    │      ║
║  │.order  │  │ .order   │ │ .move    │ │ .lead  │ │ .order   │      ║
║  └────────┘  └──────────┘ └──────────┘ └────────┘ └──────────┘      ║
║                                                                      ║
║  ┌──────────┐  ┌────────────┐  ┌────────┐  ┌─────────────┐          ║
║  │  stock   │  │   project  │  │   hr   │  │  helpdesk   │          ║
║  │.picking  │  │  .project  │  │.employee│ │   .ticket   │          ║
║  └──────────┘  └────────────┘  └────────┘  └─────────────┘          ║
║                                                                      ║
║  Mọi model trên đều có field partner_id → res.partner               ║
╚══════════════════════════════════════════════════════════════════════╝
```

**Hệ quả thực tế:**
- Cùng 1 doanh nghiệp "Công ty ABC" có MST 0123456789 → chỉ tồn tại **1 record** trong `res.partner`
- Record này dùng được cho: tạo hóa đơn bán, mua, báo giá, đơn hàng, phiếu xuất kho, lead, ticket support... — **bất kỳ chỗ nào trong Odoo**
- Field `customer_rank` và `supplier_rank` tự tăng khi partner này xuất hiện trên sale order/purchase order — tự động phân loại không cần user check tay

### 2.2 So sánh với Misa và các ERP đóng

| Khía cạnh | Misa | Odoo |
|---|---|---|
| Lưu KH | Bảng `KhachHang` riêng | `res.partner` (chung) |
| Lưu NCC | Bảng `NhaCungCap` riêng | `res.partner` (chung) |
| Cùng 1 đối tác vừa mua vừa bán | Phải tạo 2 record + đồng bộ | 1 record, 2 ranks > 0 |
| Module mới cần partner | Phải code mapping 2 bảng | Tự động — chỉ cần `Many2one` đến `res.partner` |
| Module MST lookup phải code mấy nơi? | 2 (KH + NCC) hoặc nhiều hơn | **1 chỗ duy nhất** |

**Đây là lý do module MST trong Odoo "free ride" vào mọi module khác:** Code 1 lần trên `res.partner`, dùng được cả ở Sales, Purchase, Kế toán, Kho, HR, CRM... mà không cần code thêm gì.

### 2.3 Câu trả lời cho câu hỏi "Có áp dụng được cho module khác kế toán như Kho, Y tế?"

**CÓ — và đây là cơ chế:**

| Module | Quan hệ với `res.partner` | Ví dụ use case |
|---|---|---|
| **Kế toán** (`account.move`) | `partner_id` → KH/NCC trên hóa đơn | Tạo NCC mới khi nhập hóa đơn đầu vào lần đầu |
| **Sales** (`sale.order`) | `partner_id` → khách hàng đặt hàng | Tạo KH mới khi nhận báo giá lần đầu |
| **Purchase** (`purchase.order`) | `partner_id` → NCC | Tạo NCC mới khi tạo PO |
| **Kho** (`stock.picking`) | `partner_id` → NCC giao hàng / KH nhận hàng | Tạo NCC vận chuyển khi nhập kho |
| **CRM** (`crm.lead`) | `partner_id` → khách tiềm năng (sau convert) | Tạo lead → khi MST tra ra là DN lớn, auto-set tier |
| **HR** (`hr.employee`) | `address_home_id` → res.partner cho địa chỉ NV | Hiếm dùng MST nhưng vẫn áp dụng được |
| **POS** (`pos.order`) | `partner_id` → khách hàng tại điểm bán | Khách mua hàng giá trị cao yêu cầu xuất hóa đơn VAT → cashier nhập MST |
| **Helpdesk** (`helpdesk.ticket`) | `partner_id` → KH gửi ticket | Tự động fill thông tin DN khi KH submit ticket |
| **Y tế** (custom: `medical.patient` hoặc OpenHealth) | `partner_id` → bệnh nhân/người thân/bảo hiểm | Bệnh viện cần xuất HĐ thanh toán → user nhập MST đơn vị bảo hiểm → auto-fill |
| **Project** (`project.project`) | `partner_id` → KH thuê dự án | Tạo client mới khi sign contract |
| **Subscription** (`sale.subscription`) | `partner_id` → KH subscribe | Tạo KH mới khi đăng ký gói dịch vụ |

**Implementation trên các module khác:** Hoàn toàn không cần code thêm gì. Module M3 chỉ extend `res.partner` và hook vào field `vat`. Bất kỳ form nào có dropdown chọn partner_id → tự động hỗ trợ MST lookup.

**Đối với module y tế cụ thể:**
- Nếu dùng **OpenHealth** (open-source): model `medical.patient` đã inherit `res.partner` → module M3 work ngay
- Nếu CASSO sau này build module y tế VN riêng: dùng pattern `_inherits = {'res.partner': 'partner_id'}` → cũng work ngay
- Use case y tế cụ thể tại VN: bệnh viện cần xuất hóa đơn cho **đơn vị bảo hiểm y tế** hoặc **công ty bảo lãnh** — MST lookup giúp nhập đúng MST các đơn vị này

---

## 3. Module hoạt động như thế nào trên Odoo

### 3.1 Sequence diagram — Happy path

```
User (Chị Mỹ)        Odoo UI         M3 Module      CASSO API      GDT/Provider
     │                  │                │              │               │
     │ Mở form tạo HĐ    │                │              │               │
     ├─────────────────►│                │              │               │
     │                  │                │              │               │
     │ Nhập MST          │                │              │               │
     │ "0123456789"      │                │              │               │
     ├─────────────────►│                │              │               │
     │                  │ onchange       │              │               │
     │                  │ trigger        │              │               │
     │                  ├───────────────►│              │               │
     │                  │                │ Validate     │               │
     │                  │                │ format       │               │
     │                  │                │              │               │
     │                  │                │ Search DB    │               │
     │                  │                │ [('vat','=', │               │
     │                  │                │ '01234..')]  │               │
     │                  │                │              │               │
     │                  │   [NOT FOUND]  │              │               │
     │                  │                │ Call API     │               │
     │                  │                ├─────────────►│               │
     │                  │                │              │ Forward       │
     │                  │                │              ├──────────────►│
     │                  │                │              │               │
     │                  │                │              │   [Scrape /   │
     │                  │                │              │    Query]     │
     │                  │                │              │◄──────────────┤
     │                  │                │   {name,     │               │
     │                  │                │    address,  │               │
     │                  │                │    status}   │               │
     │                  │                │◄─────────────┤               │
     │                  │                │              │               │
     │                  │ Preview popup  │              │               │
     │                  │◄───────────────┤              │               │
     │  "Đúng DN này?"   │                │              │               │
     │◄─────────────────┤                │              │               │
     │                  │                │              │               │
     │ Click "Xác nhận" │                │              │               │
     ├─────────────────►│                │              │               │
     │                  │                │ Create       │               │
     │                  │                │ res.partner  │               │
     │                  │                │ + link to    │               │
     │                  │                │ form         │               │
     │                  │                │              │               │
     │  Form đã có       │                │              │               │
     │  partner_id       │                │              │               │
     │◄─────────────────┤                │              │               │
```

### 3.2 Architecture overview

Module gồm **5 thành phần chính:**

```
┌──────────────────────────────────────────────────────────────────────┐
│   casso_partner_mst (Module structure)                               │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. models/res_partner.py                                            │
│     ├── _inherit = 'res.partner'                                     │
│     ├── Add: casso_mst_status, casso_mst_last_sync_at                │
│     ├── Add: casso_mst_business_type, casso_mst_legal_rep            │
│     ├── Override _name_search (cho phép tìm bằng MST)                │
│     └── Add: action_casso_lookup_mst() — main action                 │
│                                                                      │
│  2. models/casso_mst_cache.py                                        │
│     └── Model `casso.mst.cache` — TTL 24h, giảm API calls            │
│                                                                      │
│  3. services/mst_lookup.py                                           │
│     ├── validate_mst_format(mst) → bool                              │
│     ├── parse_mst(mst) → {type: 'business'|'personal', branch: bool} │
│     └── fetch_mst_info(mst) → dict (gọi CASSO API)                   │
│                                                                      │
│  4. wizards/mst_lookup_wizard.py                                     │
│     ├── Preview popup hiển thị data từ API                           │
│     ├── Cho user confirm/edit trước khi tạo                          │
│     └── Action "Tạo mới" hoặc "Cập nhật partner hiện tại"            │
│                                                                      │
│  5. views/res_partner_views.xml                                      │
│     ├── Thêm button "Tra cứu MST" trên form partner                  │
│     ├── Thêm badge hiển thị status (Đang hoạt động / Tạm ngưng)      │
│     └── Inherit form views của account.move, sale.order, etc.        │
│         để gắn widget MST lookup vào field vat hoặc partner_id       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### 3.3 Custom fields thêm vào `res.partner`

```python
# File: casso_partner_mst/models/res_partner.py

from odoo import models, fields, api

class ResPartner(models.Model):
    _inherit = 'res.partner'

    # === MST tracking ===
    # Note: field `vat` đã có sẵn trong Odoo standard, không tạo lại

    casso_mst_status = fields.Selection([
        ('active', 'Đang hoạt động'),
        ('suspended', 'Tạm ngưng'),
        ('inactive', 'Ngừng hoạt động'),
        ('not_found', 'Không tìm thấy'),
        ('unverified', 'Chưa kiểm tra'),
    ], string="Trạng thái MST", default='unverified', index=True)

    casso_mst_last_sync_at = fields.Datetime(
        string="Lần đồng bộ MST cuối",
        readonly=True,
        help="Lần cuối thông tin partner được đồng bộ từ MST API. "
             "Nếu > 90 ngày, cần re-sync."
    )

    casso_mst_business_type = fields.Char(
        string="Loại hình DN",
        help="VD: Công ty TNHH, CTCP, DNTN, HKD..."
    )

    casso_mst_legal_rep = fields.Char(
        string="Người đại diện pháp luật"
    )

    casso_mst_managing_tax_office = fields.Char(
        string="Cơ quan thuế quản lý",
        help="VD: Chi cục Thuế Quận 1, Cục Thuế TP.HCM..."
    )

    casso_mst_registered_at = fields.Date(
        string="Ngày đăng ký MST"
    )

    casso_mst_branches = fields.Text(
        string="Danh sách chi nhánh (JSON)",
        help="JSON array các MST chi nhánh, dạng [{mst: ..., name: ...}]"
    )

    # === Normalized name for fuzzy matching ===
    casso_normalized_name = fields.Char(
        string="Normalized Name (internal)",
        compute='_compute_casso_normalized_name',
        store=True,
        index=True,
        help="Tên đã chuẩn hóa (lowercase, bỏ dấu, bỏ ký tự đặc biệt) "
             "để fuzzy match. Internal use."
    )

    @api.depends('name')
    def _compute_casso_normalized_name(self):
        for partner in self:
            partner.casso_normalized_name = self._normalize_text(partner.name)

    @staticmethod
    def _normalize_text(text):
        if not text:
            return ''
        # Implementation: lowercase, remove diacritics, strip non-alphanumeric
        import unicodedata
        text = unicodedata.normalize('NFD', text.lower())
        text = ''.join(c for c in text if unicodedata.category(c) != 'Mn')
        text = ''.join(c for c in text if c.isalnum() or c.isspace())
        return ' '.join(text.split())  # Collapse multiple spaces

    # === Main action ===
    def action_casso_lookup_mst(self):
        """Trigger lookup từ button trong form view."""
        self.ensure_one()
        if not self.vat:
            raise UserError("Vui lòng nhập Mã số thuế trước.")
        return self._casso_perform_lookup(self.vat)

    # === Onchange trigger ===
    @api.onchange('vat')
    def _onchange_vat_casso_lookup(self):
        """Tự động trigger lookup khi MST hợp lệ."""
        if not self.vat:
            return
        if not self._casso_validate_mst_format(self.vat):
            return
        # Check user preference (settings)
        if not self.env.user.company_id.casso_mst_auto_lookup_enabled:
            return
        # Don't lookup if name already filled (user prob filled manually)
        if self.name and len(self.name) > 3:
            return
        return self._casso_perform_lookup(self.vat)
```

### 3.4 Hook vào các form khác — KHÔNG cần code thêm

Đây là điểm thú vị: vì Odoo dùng `res.partner` ở mọi nơi, module M3 **tự động work** trên các form khác. Cách thức:

1. **Form `account.move` (hóa đơn):** Field `partner_id` mở dropdown chọn partner. Trong dropdown có nút "Tạo mới" → mở form res.partner inline → user nhập MST → onchange trigger lookup → form res.partner được fill → save → partner_id trên invoice được set. **Không cần code gì cho `account.move`.**

2. **Form `sale.order` (báo giá/đơn hàng):** Tương tự — `partner_id` field, "Tạo mới" → form res.partner → MST lookup work.

3. **Form `purchase.order`:** Tương tự.

4. **Form `stock.picking` (phiếu xuất/nhập):** Field `partner_id` cho NCC giao hàng. Tương tự.

5. **Form `crm.lead`:** Có 2 fields — `partner_id` (sau convert) và `vat` (trực tiếp trên lead, nếu user nhập sớm). Module M3 có thể hook vào field `vat` của crm.lead luôn.

**Code optional để cải thiện UX trên các form đó:**

```xml
<!-- File: casso_partner_mst/views/account_move_views.xml -->
<odoo>
    <record id="view_move_form_casso_mst" model="ir.ui.view">
        <field name="name">account.move.form.casso.mst</field>
        <field name="model">account.move</field>
        <field name="inherit_id" ref="account.view_move_form"/>
        <field name="arch" type="xml">
            <!-- Thêm option "Tra cứu nhanh MST" vào partner widget -->
            <field name="partner_id" position="attributes">
                <attribute name="options">
                    {'no_create_edit': False,
                     'casso_mst_lookup': True}
                </attribute>
            </field>
        </field>
    </record>
</odoo>
```

(Widget custom `casso_mst_lookup` sẽ render thêm icon "tìm bằng MST" cạnh dropdown.)

---

## 4. Căn cứ vào đâu để tạo khách hàng tự động? (Data Sources)

Đây là phần kỹ thuật trọng yếu — **độ tin cậy của module phụ thuộc hoàn toàn vào nguồn data**.

### 4.1 Các nguồn data MST tại VN

| # | Nguồn | Loại | Free? | API? | Độ tin cậy | Hạn chế |
|---|---|---|:---:|:---:|:---:|---|
| 1 | **GDT — Tổng cục Thuế** (tracuunnt.gdt.gov.vn) | Official | ✅ | ❌ (có CAPTCHA) | ⭐⭐⭐⭐⭐ | Phải scrape, có CAPTCHA, rate limit |
| 2 | **VNPT MST API** | Commercial | ❌ | ✅ | ⭐⭐⭐⭐⭐ | Phí 500-1000 VND/lượt, cần ký hợp đồng |
| 3 | **Viettel MST API** | Commercial | ❌ | ✅ | ⭐⭐⭐⭐⭐ | Tương tự VNPT |
| 4 | **masothue.com** | Third-party | ✅ | ❌ (HTML scrape) | ⭐⭐⭐⭐ | Lag 1-7 ngày so với GDT, có thể đổi cấu trúc HTML |
| 5 | **thongtindoanhnghiep.co** | Third-party | ✅ | ⚠️ (chưa chính thức) | ⭐⭐⭐ | Source data từ scraping |
| 6 | **MISA meBusiness API** | Commercial | ❌ | ✅ | ⭐⭐⭐⭐ | Cần hợp đồng Misa |
| 7 | **e-Tax (thuedientu.gdt.gov.vn)** | Official | ✅ | ❌ (cần CMS login) | ⭐⭐⭐⭐⭐ | Yêu cầu chữ ký số DN, không phù hợp public lookup |

### 4.2 Đề xuất chiến lược nguồn (Fallback chain)

```
Request MST
     │
     ▼
┌──────────────────────┐
│  CASSO Cache         │  ← Layer 1: TTL 24h, miễn phí
│  (last 24h)          │
└──────────┬───────────┘
           │ MISS
           ▼
┌──────────────────────┐
│  CASSO Internal DB   │  ← Layer 2: data từ users CASSO trước đó
│  (cross-user share)  │
└──────────┬───────────┘
           │ MISS
           ▼
┌──────────────────────┐
│  Primary: VNPT API   │  ← Layer 3: trả phí, độ ổn định cao
│  (commercial)        │
└──────────┬───────────┘
           │ ERROR / TIMEOUT
           ▼
┌──────────────────────┐
│  Fallback: GDT scrape│  ← Layer 4: free, có CAPTCHA, backup
│  (with OCR)          │
└──────────┬───────────┘
           │ ERROR
           ▼
┌──────────────────────┐
│  Last resort:        │  ← Layer 5: cảnh báo user accuracy thấp
│  masothue.com scrape │
└──────────────────────┘
```

**Trade-off:**
- VNPT primary giúp CASSO control được SLA cho khách
- GDT direct là source of truth nhưng phụ thuộc CAPTCHA — không ổn định cho automation
- masothue.com chỉ dùng khi 2 nguồn trên fail — kèm warning rõ với user

**CASSO's role:** Là **abstraction layer** giữa Odoo và các nguồn này. User của module M3 không cần biết source — chỉ thấy `casso.vn/api/v2/tax-id/{mst}` trả về data chuẩn hóa.

### 4.3 Data Contract: CASSO MST API → Odoo `res.partner`

**Endpoint đề xuất:** `GET https://api.casso.vn/v2/tax-id/{mst}`

**Response schema:**

```typescript
interface CassoTaxIdLookupResponse {
  mst: string;                    // Echo lại MST đã query
  status: 'active' | 'suspended' | 'inactive' | 'not_found';

  // Core company info
  name: string;                   // Tên đầy đủ DN
  shortName?: string;             // Tên viết tắt (nếu có)
  legalRepresentative?: string;   // Người đại diện pháp luật

  // Address
  address: {
    fullAddress: string;          // Địa chỉ đầy đủ 1 dòng
    street?: string;
    ward?: string;                // Phường/xã
    district?: string;            // Quận/huyện
    province?: string;            // Tỉnh/thành phố
  };

  // Tax-specific
  businessType?: string;          // VD: "Công ty TNHH"
  managingTaxOffice?: string;     // VD: "Chi cục Thuế Quận 1"
  registeredAt?: string;          // ISO date

  // Contact (nếu có)
  phone?: string;
  email?: string;

  // Branches (cho DN có nhiều chi nhánh)
  branches?: Array<{
    mst: string;
    name: string;
    address: string;
  }>;

  // Provenance
  source: 'vnpt' | 'gdt' | 'masothue' | 'cache';
  fetchedAt: string;              // ISO datetime
  confidence: number;             // 0-1, 1.0 = fully trusted
}
```

### 4.4 Field mapping: API response → `res.partner`

| API field | → | Odoo `res.partner` field | Notes |
|---|---|---|---|
| `mst` | → | `vat` | Standard field |
| `name` | → | `name` | Required |
| `address.fullAddress` | → | `street` | Hoặc parse và split ra street/city/zip |
| `address.province` | → | `state_id` (via lookup) | Lookup `res.country.state` by name |
| `address.district` | → | `city` | Odoo's `city` field |
| `address.ward` | → | `street2` | Lưu phường/xã ở đây |
| `phone` | → | `phone` | |
| `email` | → | `email` | |
| `legalRepresentative` | → | `casso_mst_legal_rep` | Custom field |
| `businessType` | → | `casso_mst_business_type` | Custom field |
| `managingTaxOffice` | → | `casso_mst_managing_tax_office` | Custom field |
| `registeredAt` | → | `casso_mst_registered_at` | Custom field |
| `status` | → | `casso_mst_status` | Custom field |
| `branches` | → | `casso_mst_branches` | JSON serialize |
| `fetchedAt` | → | `casso_mst_last_sync_at` | Update mỗi lần lookup |

**Standard fields cần set thêm:**
- `country_id`: lookup `res.country` cho 'VN'
- `is_company`: `True` nếu MST 10 chữ số (DN), `False` nếu cá nhân
- `company_type`: `'company'` hoặc `'person'` tương ứng

---

## 5. MST Validation Logic

### 5.1 Quy tắc MST Việt Nam

```
┌──────────────────────────────────────────────────────────────────────┐
│   FORMAT MST                                                         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   1. DOANH NGHIỆP (10 chữ số):    0123456789                         │
│      - Chữ số 1-2: Mã tỉnh nơi đăng ký                                │
│      - Chữ số 3-9: Số định danh                                       │
│      - Chữ số 10: Số kiểm tra (check digit)                          │
│                                                                      │
│   2. CHI NHÁNH (13 chữ số):       0123456789-001                     │
│      - 10 chữ số đầu: MST trụ sở chính                                │
│      - 3 chữ số sau dấu '-': Mã chi nhánh                            │
│                                                                      │
│   3. CÁ NHÂN (10 chữ số):         8123456789                         │
│      - Bắt đầu bằng 8 hoặc 9 thường                                   │
│      - Logic tương tự DN nhưng cho cá nhân                            │
│                                                                      │
│   4. HỘ KINH DOANH (10 chữ số):   Tương tự cá nhân                   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### 5.2 Validation algorithm (check digit)

MST VN dùng thuật toán Modulus 11 với weights `[31, 29, 23, 19, 17, 13, 7, 5, 3]`:

```python
def validate_mst_checksum(mst: str) -> bool:
    """
    Validate MST checksum theo quy tắc Tổng cục Thuế.

    Args:
        mst: chuỗi 10 chữ số (chỉ MST trụ sở chính, không gồm chi nhánh)

    Returns:
        True nếu MST có check digit hợp lệ
    """
    if not mst.isdigit() or len(mst) != 10:
        return False

    weights = [31, 29, 23, 19, 17, 13, 7, 5, 3]
    total = sum(int(mst[i]) * weights[i] for i in range(9))
    check_digit = 10 - (total % 11)
    if check_digit == 10:
        check_digit = 0

    return check_digit == int(mst[9])


def parse_mst(mst_raw: str) -> dict:
    """
    Parse và validate MST. Returns dict:
        {valid: bool, parent_mst: str, branch_code: str|None, type: str}
    """
    mst = mst_raw.strip().replace(' ', '')

    # Check format
    if '-' in mst:
        parts = mst.split('-')
        if len(parts) != 2 or len(parts[0]) != 10 or len(parts[1]) != 3:
            return {'valid': False, 'error': 'invalid_format'}
        parent_mst = parts[0]
        branch_code = parts[1]
        if not branch_code.isdigit():
            return {'valid': False, 'error': 'invalid_branch_code'}
    else:
        if len(mst) != 10:
            return {'valid': False, 'error': 'invalid_length'}
        parent_mst = mst
        branch_code = None

    # Validate checksum
    if not validate_mst_checksum(parent_mst):
        return {'valid': False, 'error': 'invalid_checksum'}

    # Detect type by first digit (heuristic)
    first_digit = int(parent_mst[0])
    if first_digit in [8, 9]:
        partner_type = 'personal'
    else:
        partner_type = 'business'

    return {
        'valid': True,
        'parent_mst': parent_mst,
        'branch_code': branch_code,
        'is_branch': branch_code is not None,
        'type': partner_type,
    }
```

**Lưu ý:** Checksum validation chỉ confirm MST **có thể là MST hợp lệ về mặt toán học**, KHÔNG xác nhận MST đó thực sự được cấp bởi GDT. Phải call API để confirm tồn tại.

---

## 6. UX Patterns (3 cách user trigger lookup)

### 6.1 Pattern A — Manual button (default + safe)

**Khi nào dùng:** Mặc định cho mọi user.

**Cách thức:**
1. User mở form res.partner (hoặc form Invoice/SO/PO)
2. Nhập MST vào field `vat`
3. Click button **"🔍 Tra cứu MST"** (button mới được thêm trong form view)
4. Nếu hợp lệ → mở wizard preview → user xác nhận → form được fill

**Pros:** User control, không tốn API call ngoài ý muốn.
**Cons:** Cần extra click.

### 6.2 Pattern B — Onchange tự động (premium UX)

**Khi nào dùng:** User power-user enable trong settings.

**Cách thức:**
1. User nhập MST vào field `vat`
2. Khi user **leave field** (blur event), Odoo trigger `_onchange_vat`
3. Module check: MST hợp lệ format + name field còn trống → tự động gọi API
4. Wizard preview hiện ra ngay

**Pros:** UX siêu mượt, gần như magic.
**Cons:** Có thể tốn API call ngoài ý muốn nếu user paste lung tung.

**Settings để enable/disable:**
```python
# res.config.settings extension
casso_mst_auto_lookup_enabled = fields.Boolean(
    string="Tự động tra cứu khi nhập MST",
    default=False,
    help="Khi user nhập MST hợp lệ, module sẽ tự động tra cứu và preview "
         "thông tin DN mà không cần click button. Tốn nhiều API call hơn."
)
```

### 6.3 Pattern C — Search-create-from-MST (cho Sales/Purchase forms)

**Khi nào dùng:** User đang ở form khác (Invoice, SO, PO), gõ MST vào dropdown chọn partner.

**Cách thức:**
1. Form Invoice mở, user click vào dropdown `partner_id`
2. Thay vì gõ tên DN, user gõ MST (vd "0123456789")
3. Module override `_name_search` của `res.partner`:
   ```python
   @api.model
   def _name_search(self, name, args=None, operator='ilike', limit=100, name_get_uid=None):
       # Nếu name là MST format → search by vat
       if name and self._casso_looks_like_mst(name):
           args = (args or []) + [('vat', '=', name)]
       return super()._name_search(name, args, operator, limit, name_get_uid)
   ```
4. Nếu tìm thấy → show partner trong dropdown
5. Nếu không tìm thấy → show option "➕ Tạo mới từ MST {mst}..." ở cuối dropdown
6. Click option → mở wizard preview → tạo → return partner_id về form Invoice

**Pros:** Workflow tự nhiên, kế toán không cần rời form Invoice.
**Cons:** Cần override Odoo standard search, cần test kỹ.

**Đề xuất:** Sprint 1 implement A và B. Pattern C làm Sprint 2 (cần thêm thời gian test).

---

## 7. Edge Cases & Error Handling

| # | Tình huống | Xử lý |
|---|---|---|
| E1 | MST format sai (vd 9 chữ số) | Hiện inline error dưới field vat: "MST phải 10 hoặc 13 chữ số" |
| E2 | MST checksum sai | Inline error: "MST không hợp lệ — vui lòng kiểm tra lại" |
| E3 | MST không tồn tại trên GDT | Wizard popup: "Không tìm thấy MST này. Tạo partner thủ công?" |
| E4 | MST đã tồn tại trong DB | Wizard: "MST này thuộc về '{existing.name}'. Dùng partner này HOẶC cập nhật thông tin?" |
| E5 | MST tạm ngưng hoạt động | Vẫn cho tạo nhưng set `casso_mst_status='suspended'` + cảnh báo |
| E6 | API timeout | Retry 1 lần. Nếu fail tiếp → cho user nhập thủ công + log error |
| E7 | API trả về 429 (rate limit) | Show: "Đã đạt giới hạn lookup hôm nay. Liên hệ admin." |
| E8 | MST chi nhánh (vd 0123456789-001) | Lookup MST chính (0123456789), set partner = trụ sở. Show option tạo riêng cho chi nhánh nếu user muốn. |
| E9 | Tên DN từ API quá dài (> 128 chars) | Truncate cho field `name` (Odoo limit), full text vào `comment` field |
| E10 | Địa chỉ từ API không match `res.country.state` | Lưu vào `street` đầy đủ, để `state_id = None`, không fail |
| E11 | DN có 50+ chi nhánh | Lưu vào `casso_mst_branches` (Text/JSON), không tạo 50 partner records |
| E12 | User nhập MST cá nhân (10 chữ số bắt đầu bằng 8/9) | Tạo partner với `is_company=False`, không error |
| E13 | MST trùng giữa multi-company database (Odoo multi-company) | Mỗi company có partner riêng. Lookup chỉ trong scope company hiện tại. |
| E14 | Race condition: 2 user cùng lookup 1 MST đồng thời | `unique_index` trên `vat` + company_id, second user nhận existing partner |

---

## 8. Comparison: Misa vs CASERP cho use case này

| Tình huống | Misa AMIS | CASERP (Odoo + M3) |
|---|---|---|
| Tạo NCC mới | Mở form Nhà cung cấp → nhập tay 10+ fields | Form Vendor Bill → gõ MST → 1 click confirm → xong |
| Cùng DN vừa mua vừa bán | Tạo 2 records (KH + NCC), sync 2 chiều thủ công | 1 record, 2 ranks tự động |
| MST validation | Có (regex check) | Có + checksum + check status real-time |
| Update info khi DN đổi địa chỉ | Phải tự sửa | Auto-detect khi sync lại, hoặc cron job định kỳ |
| Áp dụng cho module khác (Kho, CRM) | Mỗi module phải code riêng | Tự động — chỉ cần module dùng `res.partner` |
| Khả năng extend bởi dev | Đóng | Mở (Odoo Apps Store) |
| Chi phí | Trả phí Misa | Free (Odoo CE) + chi phí CASSO API |

---

## 9. Implementation Roadmap

### Sprint 1 (19/05 - 01/06) — đã có trong plan

Task F1 trong sprint plan: **"Tích hợp API tra cứu mã số thuế tự động tạo Contact/Partner trên Odoo"**

Chi tiết breakdown:

- [ ] **Day 1-2:** Module skeleton + manifest
- [ ] **Day 2-3:** Extend `res.partner` với 7 custom fields (section 3.3)
- [ ] **Day 3-4:** `services/mst_lookup.py` — validation + API client gọi CASSO API mock
- [ ] **Day 4-5:** Wizard `mst_lookup_wizard` — preview popup UI
- [ ] **Day 5-6:** Form view extension — thêm button "Tra cứu MST" trên `res.partner`
- [ ] **Day 6-7:** Cache layer (`casso.mst.cache` model, TTL 24h)
- [ ] **Day 7-8:** Settings UI (`res.config.settings`) cho enable/disable onchange auto-lookup
- [ ] **Day 8-9:** Manual testing với 5-10 MST thật của khách hàng/NCC CASSO
- [ ] **Day 9-10:** Smoke test integration với form `account.move` (vendor bill) — verify flow tự động work
- [ ] **Day 10-11:** Documentation user + test fixture

**Deliverable Sprint 1:** Chị Mỹ mở form NCC mới, nhập MST của 1 NCC thực, click "Tra cứu MST", thấy popup preview → confirm → partner được tạo với đầy đủ thông tin chỉ trong 5 giây. Verify cùng flow work khi mở form Vendor Bill.

### Sprint 2-3 (Q2 còn lại) — enhancements

- Pattern C: search-create-from-MST trong dropdown partner_id
- Auto-resync cron: định kỳ sync lại partners có `casso_mst_last_sync_at > 90 ngày`
- Bulk update wizard: update info cho 100+ partners hiện có cùng lúc
- View badge hiển thị trạng thái MST (Đang hoạt động / Tạm ngưng) trên list view partner

### Q3+ — Marketplace ready

- Refactor để module dùng được standalone (không phụ thuộc CASSO API)
- Optional integration với providers khác (VNPT, masothue) cho non-CASSO customers
- Submit `casso_partner_mst` lên `apps.odoo.com`

---

## 10. Open Questions cần align

| # | Câu hỏi | Hỏi ai | Deadline |
|---|---|---|---|
| Q1 | CASSO đã có endpoint `/v2/tax-id/{mst}` chưa? Hay cần CASSO dev build mới? | Anh Điệp + Dev CASSO | Tuần này |
| Q2 | Nguồn data CASSO định dùng là gì? (VNPT? GDT scrape? masothue?) | Anh Điệp | Tuần này |
| Q3 | Pricing: tra cứu MST tính phí riêng hay bundle vào subscription chung? | Anh Điệp | Q3 (chưa cần ngay) |
| Q4 | Rate limit per user/company là bao nhiêu? | Dev CASSO | Tuần này |
| Q5 | Có cần support MST của các nước khác không? (Lào, Cambodia DN setup ở VN) | Chị Mỹ | Sprint 2 |
| Q6 | UX preference: button manual hay auto onchange — default nào? | Chị Mỹ | Demo prototype |
| Q7 | Multi-company database: 1 MST có thể mapping tới nhiều partners (mỗi company 1 partner) hay duy nhất? | Anh Điệp | Sprint 1 |

---

## 11. Tóm tắt 3 câu trả lời cho câu hỏi gốc

> **Câu 1: Module sẽ hoạt động như thế nào trên nền tảng Odoo?**

User nhập MST vào bất kỳ form nào liên quan partner (Vendor Bill, Customer Invoice, Sale Order, PO, Contact, Lead...). Module M3 sẽ: (1) validate MST format + checksum, (2) check DB local trước, (3) nếu chưa có gọi CASSO API, (4) preview cho user xác nhận, (5) tạo record trong `res.partner` (model dùng chung cho mọi đối tác trong Odoo) hoặc link tới partner đã có, (6) auto-fill form đang mở. Toàn bộ flow 5-10 giây vs nhập tay 30-60 giây.

> **Câu 2: Có áp dụng được cho module khác kế toán (Kho, Y tế)?**

**Có — và đây là điểm mạnh nhất của Odoo so với Misa.** Odoo dùng `res.partner` là model duy nhất cho mọi loại đối tác: Khách hàng, Nhà cung cấp, Nhân viên, Bệnh nhân (nếu module y tế), Lead, Contact, đối tác vận chuyển... Mọi module Odoo (Sales, Purchase, Kế toán, Kho, CRM, HR, Helpdesk, POS, Y tế...) đều có field `partner_id → res.partner`. Vì M3 extend trực tiếp `res.partner`, nó **tự động work** trên mọi module mà không cần code thêm. Build 1 lần, dùng được mọi nơi.

> **Câu 3: Module căn cứ vào đâu để tạo khách hàng tự động?**

Căn cứ vào **3 layer data sources** theo thứ tự fallback:
1. **Cache CASSO** (TTL 24h) — miễn phí, nhanh nhất
2. **CASSO internal DB** — data đã được lookup bởi user khác (cross-user)
3. **External providers** với fallback chain: VNPT API (commercial, ổn định) → GDT scraping (free, official, có CAPTCHA) → masothue.com (free, third-party, accuracy thấp hơn)

CASSO đóng vai trò **abstraction layer** — user của module không cần biết source data, chỉ thấy CASSO API trả về data chuẩn hóa với confidence score.

---

*File này là design draft. Sẽ update sau khi align 7 Open Questions ở section 10.*
*Lần cập nhật cuối: 18/5/2026 — MinhCQ*
