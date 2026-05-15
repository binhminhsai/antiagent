# Master Sprint Planning: Phòng ISA (Quý 2 - 2026)
**Quản trị danh mục dự án (Portfolio Management)**
**Thời lượng:** 8 tuần (Nửa cuối T5 - Hết T6). Các dự án chạy nhịp độ (cadence) độc lập.
**Nhân sự:** MinhCQ (PM) | 2 Dev Odoo | 1 Dev Internal (Dev 3) | Chị Mỹ (QA/User).
**Dự án:** CASERP | X-clock-in | X-sign.

---

## 🟢 GIAI ĐOẠN 1: Tách luồng & Focus (19/5 - 01/6)
*Giai đoạn PM đàm phán X-sign, Dev tập trung code Core API cho CASERP và X-clock-in.*

| Dự án | Nhân sự | Nhiệm vụ (Backlog) | Deliverable (Kết quả) |
| :--- | :--- | :--- | :--- |
| **CASERP** (Sprint 1) | 2 Dev Odoo | - Setup Webhook kéo giao dịch bank (F3) lưu bảng nháp.<br>- Tích hợp API tra MST tự tạo Contact (F1).<br>- Kéo thử nghiệm XML Hóa đơn đầu vào (F2). | Chị Mỹ thấy giao dịch ngân hàng thật nhảy vào Odoo real-time (Import data thô). |
| **X-clock-in** | Dev 3 (100%) | - Chạy nước rút Backend lưu giờ.<br>- Tính năng check Wifi nội bộ.<br>- Dashboard xem bảng giờ cho HR. | MVP chạy được trên điện thoại và Smart TV, sẵn sàng UAT đầu tháng 6. |
| **X-sign** | PM (100%)<br>Dev 3 (0%) | - **Freeze Code.** Dev 3 không đụng vào X-sign.<br>- PM hoàn thành Figma/Wireframe & Spec cho KysoQR và CAS ID (tạo chữ ký, xóa ký mù, dấu mộc).<br>- **Đàm phán BAAS Team:** Chốt luồng, API contract và scope "ISA hỗ trợ code CAS ID". | Chốt được phương án tích hợp với BAAS team. Luồng UI/UX sẵn sàng cho Dev. |

---

## 🟡 GIAI ĐOẠN 2: Hardening, Chuyển giao & Tích hợp (02/6 - 15/6)
*X-clock-in Go-live, Dev 3 lao vào code X-sign. CASERP chạy song song với MISA.*

| Dự án | Nhân sự | Nhiệm vụ (Backlog) | Deliverable (Kết quả) |
| :--- | :--- | :--- | :--- |
| **CASERP** (Sprint 2) | 2 Dev Odoo | - Thuật toán Auto-matching (so tiền, so mã).<br>- Tự tạo Bút toán (Auto-Journal).<br>- Bắt đầu Setup Parallel Run (Dùng Viindoo // Misa). | Chị Mỹ bấm "Gạch nợ" là Odoo tự ghi sổ chuẩn xác. Sổ cái nhảy đúng số. |
| **X-clock-in** | Dev 3 (Trực chiến) | - **05/06: CHÍNH THỨC GO-LIVE TOÀN CÔNG TY.**<br>- Hypercare (Trực chiến fix bug nóng). | Toàn nhân sự sử dụng ổn định. |
| **X-sign** (Sprint 1) | Dev 3 (Từ 08/6) | - Code UI platform cho **KysoQR** (tạo hợp đồng, xem hợp đồng không cần đăng nhập).<br>- Bắt đầu đụng vào repo của **CAS ID** (hỗ trợ BAAS) để code logic xóa ký mù và lưu template. | Giao diện KysoQR lên hình, gọi API xác thực cơ bản sang CAS ID. |

---

## 🔴 GIAI ĐOẠN 3: Nước rút & Kiểm tra chéo (16/6 - 30/6)
*Test luồng Bulk Sign và chuẩn bị Go-live Kép vào 01/07.*

| Dự án | Nhân sự | Nhiệm vụ (Backlog) | Deliverable (Kết quả) |
| :--- | :--- | :--- | :--- |
| **CASERP** (Sprint 3) | 2 Dev Odoo | - Xử lý Unhappy cases (trùng lặp, sai MST).<br>- Chốt số liệu 100% với Misa (Dress Rehearsal).<br>- PM bóc tách requirement Báo cáo Thuế (F4). | Bảng cân đối Odoo khớp 100% với Misa. **30/06 GO-LIVE CASERP.** Khóa Misa. |
| **X-clock-in** | Dev 3 | - Bảo trì (Maintenance). | Hệ thống tự động hóa hoàn toàn. |
| **X-sign** (Sprint 2) | Dev 3 & PM | - Ráp luồng E2E: *Tạo HĐ (KysoQR) -> Ký (CAS ID) -> Báo thành công (KysoQR).*<br>- Xử lý logic **Ký hàng loạt (Bulk sign)** cho HĐ khoán việc/thực tập.<br>- UAT chéo với BAAS team. | **01/07 GO-LIVE X-SIGN NỘI BỘ** (Sẵn sàng cho HR sử dụng). |

---

### 🚨 Kế hoạch thực thi dành cho PM (Scrum Ceremonies)
1. **Lễ nghi độc lập:** Họp Sprint Planning và Review tách riêng Team Odoo và Team Internal (Dev 3). Không gộp chung 1 buổi để tránh Dev phải nghe phần việc không liên quan.
2. **Daily Standup:** Gộp chung cả phòng (10-15 phút) tập trung trả lời: *"Hôm nay làm gì? Đang bị block bởi ai không?"*.
3. **Mục tiêu 01/07:** Đạt mốc Go-live kép: **Kế toán dùng CASERP, HR dùng X-sign.**
