# Sprint Planning: CASERP (Q2 - 2026)
**Thời lượng:** 6 tuần (Chia làm 3 Sprints, mỗi Sprint 2 tuần).
**Nhân sự:** 2 Odoo Devs, 1 QA (Chị Mỹ - Kế toán), PM (MinhCQ).
**Mục tiêu (Go-live):** 01/07/2026.

---

## 🏃 Sprint 1: Data Integration (15/5 - 28/5)
*Mục tiêu: "Kéo được cục Data về nhà an toàn". Chưa cần xử lý logic kế toán rườm rà.*

**Task List (Cho 2 Dev Odoo):**
- **[F3]** Setup Webhook / Cronjob kết nối CASSO API để kéo Giao dịch ngân hàng. Lưu thô vào bảng nháp trong Odoo.
- **[F2/F1]** Tích hợp API tra cứu mã số thuế tự động tạo Contact.
- **[F2]** Kéo thử nghiệm file XML Hóa đơn đầu vào từ Tổng cục thuế (GDT).
- **Deliverable cuối Sprint 1:** Chị Mỹ mở màn hình Odoo thấy data ngân hàng nhảy vào theo real-time.

## 🏃 Sprint 2: Accounting Logic & Matching (29/5 - 11/6)
*Mục tiêu: Xử lý logic gạch nợ và tự động hạch toán.*

**Task List (Cho 2 Dev Odoo):**
- **[F3]** Code thuật toán Auto-matching (So khớp số tiền, so khớp mã báo có).
- **[F3]** Code tính năng tự động tạo Bút toán (Journal Entry) khi User ấn "Khớp".
- **[F2]** Mapping dữ liệu từ hóa đơn đầu vào (XML) thành Vendor Bill chuẩn của Odoo.
- **Deliverable cuối Sprint 2:** Chị Mỹ ấn nút "Gạch nợ" hoặc "Tạo Bill", Odoo tự ghi sổ kế toán chuẩn xác.

## 🏃 Sprint 3: Refine, Parallel Run & UAT (12/6 - 25/6)
*Mục tiêu: Vá lỗi UX, test thực tế với data khổng lồ.*

**Task List:**
- **[Dev]** Tối ưu hóa UI/UX: Làm Dashboard nhìn gọn gàng hơn, thêm bộ lọc ngày tháng, tìm kiếm.
- **[Dev]** Xử lý Unhappy cases (Giao dịch trùng lặp, hóa đơn sai mã số thuế...).
- **[Kế toán - Chị Mỹ]** Chạy song song (Parallel Run): Hạch toán tháng 6 trên Misa và hạch toán trên CASERP. So sánh bảng cân đối kế toán.
- **Deliverable cuối Sprint 3:** Bảng cân đối 2 bên khớp nhau 100%.

## 🚀 Tuần Đệm: Go-live & Training (26/6 - 30/6)
- Xóa data test, reset DB.
- Tổ chức buổi Training nội bộ cho toàn bộ user.
- **01/07:** Chính thức tắt Misa, chuyển sang Odoo.

---
## 🚨 Lộ trình tiếp theo (Tháng 7 - Báo Động Đỏ):
**Epic F4: Tự động hóa Báo cáo Thuế (Tax Reporting)**
- Chị Mỹ yêu cầu phải có giao diện tờ khai thuế (GTGT, TNCN, TNDN) xuất ra XML giống hệt Misa để nộp cơ quan thuế. Không thể dùng bảng kê thô của Viindoo.
- *Hành động:* Giữa tháng 6 (Sprint 3), PM bắt đầu làm FRS cho F4. Đầu tháng 7 Dev nhảy vào code luôn để kịp báo cáo quý.
