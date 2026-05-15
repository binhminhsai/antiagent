# Sprint Planning: CASERP (Q2 - 2026)
**Khung thời gian:** 19/05 - 30/06 (Chạy Scrum 2 tuần/Sprint).
**Nhân sự:** 2 Odoo Devs, 1 QA (Chị Mỹ - Kế toán), PM (MinhCQ).
**Mục tiêu (Go-live):** 30/06/2026 (Kế toán nội bộ CASSO dùng hoàn toàn Odoo).

---

## 🏃 Sprint 1: Data Integration (19/05 - 01/06)
*Mục tiêu: "Kéo được cục Data thô về nhà an toàn". Chưa cần xử lý logic kế toán rườm rà.*

**Sprint Backlog (Cho 2 Dev Odoo):**
- **[F3 - Bank Feed]** Setup Webhook kết nối CASSO API để kéo Giao dịch ngân hàng. Lưu data thô vào bảng nháp trong Odoo.
- **[F1 - MST]** Tích hợp API tra cứu mã số thuế tự động tạo Contact/Partner trên Odoo.
- **[F2 - Hóa đơn]** Kéo thử nghiệm file XML Hóa đơn đầu vào từ Tổng cục thuế (GDT) hoặc qua Viettel S-Invoice.
- **Deliverable:** Chị Mỹ mở màn hình Odoo thấy data ngân hàng nhảy vào theo real-time.

## 🏃 Sprint 2: Accounting Logic & Parallel Run Setup (02/06 - 15/06)
*Mục tiêu: Xử lý logic hạch toán tự động và bắt đầu nhập liệu song song.*

**Sprint Backlog (Cho 2 Dev Odoo):**
- **[F3 - Bank Feed]** Code thuật toán Auto-matching (So khớp số tiền, so khớp đối tác dựa trên mã báo có/nội dung CK).
- **[F3 - Bank Feed]** Tự động tạo Bút toán (Auto-Journal Entry) khi User ấn "Khớp".
- **[F2 - Hóa đơn]** Mapping dữ liệu từ hóa đơn đầu vào thành Vendor Bill chuẩn của Odoo.
- **[QA - Kế toán]** Bắt đầu chạy song song (Parallel Run): Hạch toán trên Misa và hạch toán trên CASERP.
- **Deliverable:** Chị Mỹ ấn nút "Gạch nợ" hoặc "Tạo Bill", Odoo tự ghi sổ kế toán chuẩn xác.

## 🏃 Sprint 3: Refine & 100% Parallel Run (16/06 - 30/06)
*Mục tiêu: Vá lỗi UX, chạy song song 100% và chuẩn bị khóa MISA.*

**Sprint Backlog:**
- **[Dev]** Tối ưu hóa UI/UX: Dashboard ngân hàng gọn gàng, bộ lọc ngày tháng.
- **[Dev]** Xử lý Unhappy cases: Giao dịch trùng lặp, hóa đơn sai mã số thuế, chênh lệch số dư (Reconciliation).
- **[QA - Kế toán]** Đảm bảo Bảng cân đối tài khoản trên Odoo khớp 100% với Misa cho tháng 6.
- **[PM]** Bóc tách Requirement và chốt FRS cho Epic F4 (Tờ khai Thuế XML giống Misa).
- **Deliverable:** **30/06 GO-LIVE.** Tắt Misa. Sẵn sàng code F4 vào tháng 7.
