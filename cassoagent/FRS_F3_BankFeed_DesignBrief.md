# 📐 DESIGN BRIEF – FRS_F3: Bank Feed
**Project:** X-doo+ ERP · CASSO × Viindoo
**Feature:** Bank Feed – Đồng bộ & Đối soát Giao dịch Ngân hàng
**Version:** 1.0 · 2026-05
**Audience:** Figma Designer / Figma AI Prototype

---

## 1. CONTEXT & GOAL

CASSO là fintech platform kết nối Open Banking. X-doo+ là ERP (based on Viindoo/Odoo, phiên bản Việt Nam hóa). Feature **Bank Feed** tự động kéo giao dịch ngân hàng realtime vào ERP, để kế toán viên xem xét, xác nhận và hạch toán — thay thế hoàn toàn việc nhập tay từ sao kê PDF.

**Goal của prototype:** Demo cho CEO thấy toàn bộ hành trình kế toán viên sử dụng Bank Feed, từ lúc có giao dịch mới đến khi hóa đơn được đánh dấu "Đã thanh toán".

---

## 2. USER & SCENARIO

**Primary User:** Kế toán viên (Accountant) — dùng web app ERP hằng ngày.

**Scenario chính (Semi-Auto):**
> CASSO tự động sync giao dịch ngân hàng → Viindoo ERP auto-match với hóa đơn → Kế toán viên review, click Xác nhận → Hệ thống tạo bút toán → Post → Hóa đơn = Paid.

**Scenario phụ (Manual fallback):**
> Giao dịch không khớp tự động → Kế toán chọn đối tác + tài khoản + hóa đơn thủ công → Click Xác nhận.

---

## 3. SCREENS CẦN THIẾT KẾ (5 màn hình)

### Screen 1 – Dashboard / Bank Feed Overview
**Mô tả:** Trang chính của Bank Feed. Kế toán thấy ngay số giao dịch cần xử lý.

**Layout:** Sidebar ERP bên trái + Content area bên phải
**Components cần có:**
- Header: Tên tài khoản ngân hàng, thời gian sync gần nhất, nút "Đồng bộ ngay"
- **4 Stat Cards (KPI):**
  - ⏳ Chờ xác nhận: 8
  - 🔧 Cần xử lý thủ công: 3
  - 🔍 Cần kiểm tra: 2
  - ✅ Đã đối soát (tháng này): 47
- **Tab navigation:** Chờ xác nhận | Cần xử lý thủ công | Cần kiểm tra | Đã đối soát
- **Filter bar:** Search input + dropdown chọn tài khoản + date range
- **Transaction Table** với columns:
  - Checkbox | Ngày GD | Nội dung CK | Đối tác đề xuất | Số tiền | Hóa đơn liên quan | Độ khớp (%) | Trạng thái | Thao tác
- Row màu xanh lá = tiền vào | màu đỏ = tiền ra
- Nút "Xác nhận tất cả" ở filter bar

---

### Screen 2 – Chi tiết GD có Đề xuất Khớp (Happy Path)
**Mô tả:** Kế toán click vào 1 giao dịch đã được auto-match. Xem chi tiết và xác nhận.

**Layout:** 2 column trên + 1 section bên dưới
**Components:**
- **Breadcrumb + Back button**
- Badge "Đề xuất khớp – 97%" (màu xanh lá)
- **Info banner:** "Hệ thống đã tìm thấy hóa đơn khớp, vui lòng kiểm tra và xác nhận"
- **Column trái – Thông tin GD ngân hàng:**
  - Số tiền (lớn, xanh lá nếu vào / đỏ nếu ra)
  - Ngày giờ GD | Ngân hàng | Nội dung CK | Mã tham chiếu | Số dư sau GD
- **Column phải – Đề xuất khớp tự động:**
  - Đối tác đề xuất | Mã KH
  - Hóa đơn liên quan (link) | Giá trị HĐ
  - Ngày đến hạn | Trạng thái HĐ hiện tại
  - Lý do khớp (text nhỏ)
  - Progress bar "Độ tin cậy 97%"
- **Section dưới – Preview Bút toán kế toán:**
  - Table: TK | Tên TK | Đối tác | Nợ | Có
  - Row 1: 1121 – Tiền gửi NH | Nợ: 15,000,000
  - Row 2: 1311 – Phải thu KH | Có: 15,000,000
  - Footer: Tổng Nợ = Tổng Có → "✅ Cân bằng"
- **Action bar (bottom):**
  - Button xanh lá: "✅ Xác nhận & Hạch toán" (primary)
  - Button cam: "✏️ Sửa đề xuất"
  - Button outline: "⏸ Cần kiểm tra"
  - Button đỏ (ghost): "✖ Từ chối"

---

### Screen 3 – Chi tiết GD Xử lý Thủ công
**Mô tả:** Giao dịch không khớp tự động. Kế toán nhập thông tin thủ công.

**Components:**
- Badge "🔧 Cần xử lý thủ công" (màu cam)
- **Warning banner:** "Không tìm thấy đề xuất khớp, vui lòng nhập thủ công"
- **Column trái – Thông tin GD:** (giống Screen 2 trái)
- **Column phải – Form nhập liệu thủ công:**
  - Dropdown: Đối tác (searchable)
  - Dropdown: Hóa đơn liên quan (filter theo đối tác đã chọn)
  - Dropdown: Tài khoản kế toán (TK 1311, 511, 1388…)
  - Text input: Nhãn / Ghi chú
  - All fields có placeholder rõ ràng
- **Section dưới – Preview Bút toán** (cập nhật realtime khi user chọn tài khoản)
- **Action bar:** Tương tự Screen 2

---

### Screen 4 – Modal Xác nhận (Overlay)
**Mô tả:** Popup xác nhận trước khi hạch toán. Tránh nhấn nhầm.

**Component:**
- Modal overlay mờ nền
- Icon cảnh báo + tiêu đề "Xác nhận giao dịch"
- Tóm tắt: Đối tác | Số tiền | Hóa đơn liên kết
- Mô tả hậu quả: "Hành động này sẽ tạo bút toán, hạch toán và đánh dấu hóa đơn là Đã thanh toán"
- 2 buttons: "Hủy" (outline) + "✅ Xác nhận" (filled green)

---

### Screen 5 – Kết quả sau Xác nhận (Success State)
**Mô tả:** Sau khi xác nhận thành công. Kế toán thấy kết quả ngay lập tức.

**Components:**
- Large success icon (✅ hoặc animated checkmark)
- Tiêu đề: "Giao dịch đã được xử lý thành công!"
- **Result summary card:**
  - Mã GD | Số tiền
  - Số bút toán kế toán (link) | Trạng thái: Posted
  - Số hóa đơn (link) | Trạng thái: ✅ Đã thanh toán
  - Đối soát ngân hàng: ✅ Đã đối soát
  - Thời gian xử lý: ~1 giây
- **3 navigation buttons:**
  - "← Quay lại Bank Feed"
  - "📒 Xem Bút toán"
  - "📄 Xem Hóa đơn"

---

## 4. NAVIGATION FLOW (Prototype Connections)

```
Screen 1 (Overview)
  → Click row "Đề xuất khớp"  → Screen 2 (Detail Matched)
  → Click row "Thủ công"       → Screen 3 (Detail Manual)

Screen 2 → Click "Xác nhận & Hạch toán" → Screen 4 (Modal)
Screen 3 → Click "Xác nhận & Hạch toán" → Screen 4 (Modal)

Screen 4 → Click "Hủy"        → Back to Screen 2 or 3
Screen 4 → Click "Xác nhận"   → Screen 5 (Success)

Screen 5 → Click "Quay lại Bank Feed" → Screen 1
```

---

## 5. VISUAL DESIGN DIRECTION

**Style:** Clean SaaS / ERP Dashboard — chuyên nghiệp, không quá playful.
**Màu chủ đạo:**
- Primary: `#1565C0` (xanh dương đậm – Viindoo/CASSO brand)
- Success: `#2E7D32` (xanh lá – tiền vào, xác nhận)
- Warning: `#E65100` (cam – thủ công, chờ xử lý)
- Danger: `#C62828` (đỏ – tiền ra, từ chối)
- Neutral BG: `#F5F7FA`
- Surface: `#FFFFFF`

**Typography:** Inter hoặc Roboto, size 12-14px cho body, 18-22px cho heading.

**Components language:**
- Card bo tròn 8-10px
- Shadow nhẹ `0 1px 4px rgba(0,0,0,0.08)`
- Badge pill cho trạng thái
- Table rows có hover state `#F8FBFF`
- Selected row highlight `#E3F2FD`
- Progress bar cho "Độ khớp" (xanh lá nếu >80%, vàng 50-80%, đỏ <50%)

**Sidebar ERP (Left navigation):**
- Background: `#1E2A3B` (dark navy)
- Active item: `#1565C0` với left border vàng `#FFD54F`
- Width: 220px

**Top bar:**
- Background: gradient `#1a237e → #1565C0`
- Notification badge cam nổi bật
- Breadcrumb trắng mờ

---

## 6. KEY UX PRINCIPLES

1. **Giảm cognitive load:** Kế toán chỉ cần nhìn vào 1 màn hình để biết phải làm gì tiếp theo.
2. **Confidence score rõ ràng:** Luôn hiển thị % độ tin cậy của đề xuất khớp kèm progress bar màu sắc.
3. **Preview bút toán trước khi confirm:** Kế toán thấy chính xác Nợ/Có sẽ được tạo trước khi bấm nút.
4. **Destructive actions cần confirm:** Nút "Xác nhận & Hạch toán" phải qua modal xác nhận. Không có undo.
5. **Realtime feedback:** Sau xác nhận, kết quả hiển thị ngay (không reload page), bao gồm link đến bút toán và hóa đơn.
6. **Empty state:** Nếu không có GD nào cần xử lý → hiển thị "🎉 Tất cả giao dịch đã được đối soát!" kèm illustration.

---

## 7. DATA LABELS (Vietnamese – dùng trong UI)

| English term | Vietnamese label |
|---|---|
| Bank Feed | Bank Feed |
| Bank Transaction | Giao dịch ngân hàng |
| Bank Statement | Sao kê ngân hàng |
| Journal Entry | Bút toán kế toán |
| Post (accounting) | Hạch toán |
| Reconcile | Đối soát |
| Invoice | Hóa đơn |
| Debit | Nợ |
| Credit | Có |
| Validate / Confirm | Xác nhận |
| Partner | Đối tác |
| Account code | Mã tài khoản |
| Matching score | Độ khớp |
| Suggested match | Đề xuất khớp |
| Needs review | Cần kiểm tra |
| Posted | Đã hạch toán |
| Reconciled | Đã đối soát |
| Paid | Đã thanh toán |

---

## 8. WHAT TO AVOID

- ❌ Không dùng quá nhiều màu sắc — giữ palette tối giản (xanh, cam, đỏ, xanh lá)
- ❌ Không ẩn thông tin quan trọng sau modal hay tooltip phức tạp
- ❌ Không cho phép xác nhận khi bút toán chưa cân bằng (Nợ ≠ Có)
- ❌ Không thiếu trạng thái loading khi hệ thống đang xử lý
- ❌ Không bỏ qua mobile responsive — CEO có thể xem trên tablet

---

*Brief này dành cho Figma AI / Designer tạo high-fidelity prototype của FRS_F3 Bank Feed.*
*Tham chiếu wireframe HTML: `FRS_F3_BankFeed_Wireframe.html` · BPMN: `FRS_F3_BankFeed_BPMN.html`*
