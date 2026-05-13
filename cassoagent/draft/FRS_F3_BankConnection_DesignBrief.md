# 📐 DESIGN BRIEF – FRS_F3: Bank Connection (Prerequisite của Bank Feed)
**Project:** X-doo+ ERP · CASSO × Viindoo
**Feature:** Bank Connection – Kết nối Tài khoản Ngân hàng với ERP qua CASSO API
**Version:** 1.0 · 2026-05
**Reference Figma:** `sKPkaFAnPKA7Wpbs2yO9eP` · node `1:320`
**Audience:** Figma Designer / Figma AI Prototype

---

## 1. BỐI CẢNH & LÝ DO TỒN TẠI

Viindoo ERP (Odoo phiên bản Việt Nam) **không có khả năng tự động kéo sao kê ngân hàng**. Hiện tại kế toán phải:
1. Tải file sao kê PDF/Excel từ Internet Banking
2. Import thủ công vào Viindoo

**Giải pháp:** CASSO đóng vai trò **Open Banking broker** — kế toán viên kết nối tài khoản ngân hàng một lần duy nhất thông qua CASSO API. Sau đó, CASSO tự động sync giao dịch realtime vào Bank Feed của ERP.

**Flow tổng thể:**
```
[Bank Connection] → (một lần setup) → [Bank Feed] → (hằng ngày) → [Voucher → Post → Reconcile]
```

---

## 2. KIẾN TRÚC KỸ THUẬT (để Designer hiểu context)

```
Kế toán viên
    │
    ▼
Viindoo ERP (shell)
    │  Modal overlay
    ▼
CASSO Middleware
    │  OAuth / Credential relay
    ▼
Bank API (VCB, BIDV, Techcombank, ACB...)
```

- CASSO **không lưu** password ngân hàng — chỉ relay để lấy Access Token
- Sau khi kết nối: CASSO giữ token và định kỳ sync giao dịch về Viindoo
- Kế toán viên nhập **credential Internet Banking** của ngân hàng (không phải tài khoản CASSO)
- Có alternative path: người dùng đã có **CASSO ID** (App) → không cần nhập lại credential

---

## 3. VISUAL DESIGN SYSTEM (từ Figma hiện tại)

### ERP Shell (Viindoo native)
| Element | Value |
|---|---|
| Top navbar bg | Dark teal `#1B6B7B` (Viindoo brand) |
| Primary button | Purple `#6C3483` → `#7D3C98` |
| Font | Roboto / system-ui, 13–14px |
| Background | White `#FFFFFF` |
| Border | Light gray `#E0E0E0` |

### CASSO OAuth Modal (overlay trên ERP shell)
| Element | Value |
|---|---|
| Modal bg | White, border-radius 12px, shadow nặng |
| CTA button (LIÊN KẾT / ĐỒNG Ý) | **Black `#000000`** — phân biệt với Viindoo purple |
| Step indicator | Logo Viindoo → Logo CASSO → Logo Ngân hàng, nối bằng dashed line |
| Success icon | Green checkmark circle `#4CAF50` |
| Text "Thành công" | Bold, centered |

> ⚠️ **Quan trọng cho Designer:** Phần ERP shell dùng màu Viindoo (teal/purple). Phần CASSO modal dùng màu riêng (black CTA) để kế toán viên biết đây là bước xác thực bên thứ 3.

---

## 4. SCREENS CẦN THIẾT KẾ (Bank Connection Flow)

### Screen BC-01 – ERP Dashboard → Khu vực "Ngân hàng"
**Mô tả:** Trang tổng quan kế toán Viindoo. Khu vực "Ngân hàng" ở góc dưới trái có 3 actions.

**Sections trên dashboard:**
- Hóa đơn bán hàng (Hoá đơn mới button)
- Hoá đơn nhà cung cấp (Tải lên / Tạo thủ công)
- **Ngân hàng** (focus)
  - Button tím: **"Kết nối"** ← điểm bắt đầu flow
  - Link: "Giao dịch mới"
  - Link: "Import sao kê"
- Hoạt động khác (Bút toán mới)

**Interaction:** Click "Kết nối" → mở Modal BC-02

---

### Screen BC-02 – Modal: Tạo tài khoản ngân hàng (Empty State)
**Mô tả:** Modal form để nhập thông tin tài khoản ngân hàng muốn kết nối.

**Modal title:** `Tạo một tài khoản ngân hàng`
**Close button:** X góc trên phải

**Form fields:**
| Field | Placeholder | Ghi chú |
|---|---|---|
| Số tài khoản | `vd: BE15001559627230` | Required |
| Ngân hàng | `vd: Ngân hàng Thương mại Cổ phần Á Châu` | Dropdown searchable |
| Mã định danh ngân hàng | `vd: GEBABEBB` | SWIFT code, auto-fill khi chọn ngân hàng |
| Số nhật ký | _(text gợi ý)_ | "Để trống để tạo một số nhật ký mới cho tài khoản ngân hàng này hoặc chọn một số nhật ký để liên kết nó với tài khoản ngân hàng." |

**Action buttons:**
- `Tạo` (Purple — Viindoo primary)
- `Hủy` (text/outline)

**Interaction:** Click "Tạo" → modal chuyển sang BC-03 (filled state preview) hoặc thẳng BC-04 (CASSO login)

---

### Screen BC-03 – Modal: Tạo tài khoản ngân hàng (Filled State – BIDV example)
**Mô tả:** Sau khi user chọn ngân hàng, các field liên quan tự động điền. Đây là trạng thái review trước khi sang bước CASSO login.

**Form fields (filled):**
| Field | Value |
|---|---|
| Số tài khoản | `8600014479` |
| Ngân hàng | `BIDV` |
| Mã định danh ngân hàng | `BIDVVNVX (theo mã SWIFT)` |
| Mã kế toán | `112A` |

**Action buttons:** `Tạo` (active, purple) + `Hủy`

**Interaction:** Click "Tạo" → mở Modal BC-04 (CASSO OAuth)

---

### Screen BC-04 – Modal CASSO OAuth: Đăng nhập Internet Banking
**Mô tả:** CASSO OAuth overlay. Kế toán nhập credential Internet Banking để ủy quyền CASSO kéo sao kê.

**Modal layout:**
- Back arrow ← (góc trên trái)
- Close X (góc trên phải)

**Step indicator (3 bước):**
```
[Viindoo logo] ──── [CASSO logo] ──── [Bank logo ✓]
```
- Viindoo logo: màu teal
- CASSO logo: màu brand CASSO
- Bank logo (VCB/BIDV...): hiển thị logo ngân hàng được chọn + dấu check khi hoàn thành

**Title:** `Đăng nhập`

**Body text:**
> Vui lòng nhập thông tin đăng nhập Dịch vụ Ngân hàng **[TÊN NGÂN HÀNG]** để kết nối tài khoản của bạn với **Wonder Wallet**

**Form:**
| Field | Icon | Placeholder |
|---|---|---|
| Tên đăng nhập | 👤 person icon | `bankusrdemo1` |
| Mật khẩu | 👁️ eye icon (toggle show/hide) | `••••••` |

**CTA Button:** `LIÊN KẾT` (full-width, **black background**, white text, rounded)

**Alternative link:** `Đã liên kết tài khoản ở App Cas ID?` (hyperlink, centered dưới button)

**Security note** _(optional, nhỏ dưới cùng):_ "CASSO không lưu trữ mật khẩu của bạn. Kết nối được bảo mật bằng mã hóa."

**Interaction:** 
- Click "LIÊN KẾT" → loading state → BC-05 (Success) hoặc BC-06 (Error)
- Click "Đã liên kết tài khoản ở App Cas ID?" → BC-07 (Cas ID flow)

---

### Screen BC-05 – Modal CASSO: Kết nối thành công
**Mô tả:** Confirmation screen sau khi liên kết thành công.

**Layout (centered):**
- Large green checkmark circle (icon, ~80px)
- Title: **"Thành công"** (bold, 20px)
- Subtitle: "Tài khoản của bạn đã liên kết thành công"

**CTA Button:** `ĐỒNG Ý` (full-width, **black background**, white text)

**Interaction:** Click "Đồng ý" → đóng modal → quay về Dashboard BC-01, khu vực "Ngân hàng" cập nhật hiển thị tài khoản vừa kết nối + số dư hiện tại.

---

### Screen BC-06 – Modal CASSO: Lỗi đăng nhập (Error State)
**Mô tả:** Khi credential sai hoặc ngân hàng không phản hồi.

**Nội dung:**
- Icon cảnh báo đỏ ⚠️
- Title: "Đăng nhập thất bại"
- Message: "Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng kiểm tra lại." HOẶC "Không thể kết nối tới ngân hàng, vui lòng thử lại sau."
- Button: `THỬ LẠI` (black) + link `Hủy`

---

### Screen BC-07 – Modal CASSO: Liên kết qua Cas ID (Alternative Path)
**Mô tả:** Dành cho người dùng đã có tài khoản CASSO ID (App CASSO). Không cần nhập credential ngân hàng.

**Nội dung:**
- Hướng dẫn: "Mở App CASSO → Vào Cài đặt → Chia sẻ tài khoản → Quét mã QR bên dưới"
- QR Code (placeholder)
- Hoặc: Nhập mã Cas ID manual
- Button: `XÁC NHẬN` (black)

---

### Screen BC-08 – Dashboard sau khi kết nối thành công
**Mô tả:** Trở về dashboard. Khu vực "Ngân hàng" giờ hiển thị tài khoản đã kết nối và button đồng bộ.

**Khu vực Ngân hàng (updated):**
- Hiển thị: `[Logo Ngân hàng] BIDV *4479 · 651,790,000 đ`
- Badge: `🟢 Đã kết nối · Sync lần cuối: vừa xong`
- Button: **"Đồng bộ ngay"** (thay thế "Kết nối")
- Link: "Giao dịch mới" (→ mở Bank Feed)
- Link: "Import sao kê"

---

## 5. NAVIGATION FLOW (Prototype Connections)

```
BC-01 Dashboard
  └─ Click "Kết nối" → BC-02 (Modal empty form)
       └─ Chọn ngân hàng, điền STK → BC-03 (Modal filled)
            └─ Click "Tạo" → BC-04 (CASSO OAuth login)
                 ├─ Credential đúng → [Loading] → BC-05 (Thành công)
                 │       └─ Click "Đồng ý" → BC-08 (Dashboard updated)
                 │               └─ Click "Giao dịch mới" → [Bank Feed Screen 1]
                 │
                 ├─ Credential sai → BC-06 (Error)
                 │       └─ Click "Thử lại" → BC-04
                 │
                 └─ Click "Đã liên kết App Cas ID?" → BC-07 (QR / Cas ID)
                         └─ Xác nhận → BC-05 (Thành công)
```

---

## 6. MICRO-INTERACTIONS & STATES

| Interaction | Behavior |
|---|---|
| Hover row ngân hàng trong dropdown | Highlight row, hiện logo ngân hàng |
| Chọn ngân hàng | Auto-fill SWIFT code, Mã kế toán |
| Eye icon mật khẩu | Toggle show/hide password |
| Click "LIÊN KẾT" | Button → loading spinner (white) → giữ nguyên màu đen |
| Success state | Checkmark icon animate từ nhỏ → to (scale in) |
| Dashboard sau kết nối | Badge "Đã kết nối" pulse xanh lần đầu |

---

## 7. THÔNG TIN BỔ SUNG CHO FIGMA AI

**Ngân hàng hỗ trợ** (dropdown list mẫu):
Vietcombank (VCB) · BIDV · Techcombank · ACB · MB Bank · VPBank · Agribank · Sacombank · HDBank · TPBank

**SWIFT codes tương ứng** (auto-fill):
VCB = BFTVVNVX · BIDV = BIDVVNVX · TCB = VTCBVNVX · ACB = ASCBVNVX

**Tài khoản kế toán mặc định:** 112 (Tiền gửi ngân hàng)
- 1121: VND
- 1122: Ngoại tệ

**Tone & Voice của copy:**
- Thân thiện, ngắn gọn
- Không dùng thuật ngữ kỹ thuật với người dùng cuối
- Nhấn mạnh bảo mật ở bước nhập credential ngân hàng

---

## 8. LIÊN HỆ VỚI FRS_F3 BANK FEED

Sau khi hoàn thành Bank Connection (BC-08), kế toán viên click **"Giao dịch mới"** để vào màn hình **Bank Feed** (đã có Design Brief riêng: `FRS_F3_BankFeed_DesignBrief.md`).

**Sequence đúng của toàn bộ FRS_F3:**
```
1. Bank Connection (file này)     → Setup một lần
2. Bank Feed – Danh sách GD       → Hằng ngày
3. Bank Feed – Xem xét & Xác nhận → Theo từng GD
4. Hạch toán & Đối soát           → Tự động sau Xác nhận
```

---

*Brief này dành cho Figma AI / Designer tạo high-fidelity prototype của FRS_F3 Bank Connection.*
*Tham chiếu Figma hiện có: `sKPkaFAnPKA7Wpbs2yO9eP` — đã có wireframe low-fi cho 5 màn hình chính.*
*Kết hợp với: `FRS_F3_BankFeed_DesignBrief.md` để có toàn bộ FRS_F3.*
