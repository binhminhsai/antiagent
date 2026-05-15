# Master Sprint Planning: Phòng ISA (Quý 2 - 2026)
**Thời lượng:** 6 tuần (Chia làm 3 Sprints, mỗi Sprint 2 tuần).
**Nhân sự:** MinhCQ (PM) | 2 Dev Odoo | 1 Dev Internal | Chị Mỹ (QA/User).
**Dự án:** CASERP | X-clock-in | X-sign.

---

## 🏃 SPRINT 1: "Data & Khởi động Nhanh" (15/5 - 28/5)
*Giai đoạn tập trung cao độ lấy data cho CASERP và đẩy nhanh MVP cho chấm công.*

| Dự án | Nhân sự | Sprint Backlog (Nhiệm vụ) | Deliverable (Kết quả) |
| :--- | :--- | :--- | :--- |
| **CASERP** | 2 Dev Odoo | - Cài đặt Webhook/Cronjob gọi API CASSO.<br>- Kéo giao dịch bank (F3) lưu nháp vào Odoo.<br>- Thử nghiệm gọi API tra mã số thuế (F2). | Chị Mỹ thấy giao dịch ngân hàng thật nhảy vào Odoo real-time. |
| **X-clock-in** | Dev 3 (100%) | - **CẤM LÀM X-SIGN.**<br>- Dựng Backend lưu giờ (Check in/out).<br>- Làm tính năng check Wifi nội bộ.<br>- Dựng Dashboard xem bảng giờ cho HR. | Bản MVP chạy được trên điện thoại và Smart TV, HR xem được bảng công. |
| **X-sign** | Dev 3 (0%) | Tạm đóng băng (Freeze). | N/A |

---

## 🏃 SPRINT 2: "Logic Hạch toán & Chạy thực tế" (29/5 - 11/6)
*Giai đoạn xử lý các nghiệp vụ khó của kế toán và đưa X-clock-in vào sử dụng thật.*

| Dự án | Nhân sự | Sprint Backlog (Nhiệm vụ) | Deliverable (Kết quả) |
| :--- | :--- | :--- | :--- |
| **CASERP** | 2 Dev Odoo | - Thuật toán Auto-matching (so tiền, so mã).<br>- Tự tạo Bút toán (Journal Entry).<br>- Mapping XML hóa đơn vào Vendor Bill. | Bấm nút "Gạch nợ" là sổ cái Odoo tự động ghi nhận chuẩn xác. |
| **X-clock-in** | Dev 3 (30%) | - **05/06: CHÍNH THỨC GO-LIVE TOÀN CÔNG TY.**<br>- Theo dõi lỗi, fix bug nóng (hotfix). | Toàn nhân sự xài X-clock-in mượt mà. |
| **X-sign** | Dev 3 (70%) | - Khởi động lại dự án sau khi X-clock-in ổn định.<br>- Chốt FRS cải tiến X-sign.<br>- Setup môi trường dev. | FRS X-sign được duyệt. Dev nắm rõ scope. |

---

## 🏃 SPRINT 3: "Kiểm tra chéo & Tăng tốc X-sign" (12/6 - 25/6)
*Giai đoạn Kế toán chạy thử Odoo song song với Misa, và Dev 3 chạy nước rút cho X-sign.*

| Dự án | Nhân sự | Sprint Backlog (Nhiệm vụ) | Deliverable (Kết quả) |
| :--- | :--- | :--- | :--- |
| **CASERP** | 2 Dev Odoo | - Tối ưu UI/UX bảng điều khiển.<br>- Xử lý Unhappy cases (lỗi, trùng lặp).<br>- **Bắt đầu nghiên cứu API HTKK Thuế (F4).** | Bảng cân đối trên Odoo khớp 100% với Misa (Parallel Run). |
| **X-clock-in** | Dev 3 (5%) | - Maintain, chỉ sửa lỗi nghiêm trọng. | Hệ thống chạy tự động. |
| **X-sign** | Dev 3 (95%) | - Code logic ký số nội bộ.<br>- Hoàn thiện Dashboard quản lý văn bản. | Môi trường Staging (Test) của X-sign sẵn sàng để PM test. |

---

## 🚀 TUẦN ĐỆM: Go-live & Đóng Quý 2 (26/6 - 30/6)

- **30/06:** Ra mắt **X-sign** (Sử dụng nội bộ). Dev 3 ăn mừng.
- **26/6 - 30/6:** Training CASERP cho toàn bộ team Kế toán. Xóa data nháp, dọn dẹp Database Odoo.
- **01/07:** Chính thức Go-live **CASERP**. Khóa Misa. 2 Dev Odoo bắt tay vào code Báo cáo Thuế (F4).
