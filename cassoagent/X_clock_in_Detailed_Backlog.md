# X-clock-in Detailed Backlog & Execution Plan (Q2 2026)

Dựa trên lộ trình (Tháng 5 Tuần 3 đến Tháng 6 Tuần 1) và Workflow "AI-First PM", dưới đây là danh sách Backlog chi tiết để PM control tiến độ cho X-clock-in.

## 👥 Nguồn lực
- **PM (Bạn):** Phân tích, Viết Spec/FRS, Vibe UI/Prototype, QC, Đưa lên UAT, Showcase.
- **Dev (Dev Internal / Dev 3):** Nhận FRS, Vibe Code logic Core, API, Tivi UI, Fix bug.

---

## 📅 THÁNG 5 - TUẦN 3 (19/05 - 25/05)
**Theme:** Core Logic & Spec

| Trạng thái | Assignee | Loại Task | Tên Task (Backlog Item) | Deadline | Mô tả & Deliverable |
|:---:|:---|:---|:---|:---|:---|
| ⬜ | **PM** | FRS | Viết Spec & Vibe UI X-clock-in | **23/05** | Viết luồng chấm công (Lark/Wifi), vẽ prototype cho Điện thoại & Tivi. Chốt AC. |
| ⬜ | **Dev 3** | Code | Phát triển Core chấm công | **24/05** | Code xử lý logic lưu giờ vào DB. |
| ⬜ | **Dev 3** | Code | Tích hợp Lark & Backup Quẹt thẻ | **26/05** | Kết nối API Lark để lấy log hoặc chuẩn bị API quẹt thẻ backup nếu rớt mạng. |

---

## 📅 THÁNG 5 - TUẦN 4 (26/05 - 01/06)
**Theme:** Tivi UI & UAT Deployment

| Trạng thái | Assignee | Loại Task | Tên Task (Backlog Item) | Deadline | Mô tả & Deliverable |
|:---:|:---|:---|:---|:---|:---|
| ⬜ | **Dev 3** | Code | Phát triển Giao diện Tivi & Mobile | **29/05** | Vibe code giao diện dashboard lên Smart Tivi, luồng check-in trên Mobile. |
| ⬜ | **PM** | Deploy | Deploy lên UAT | **30/05** | Gom toàn bộ code Core và UI đưa lên môi trường test. |
| ⬜ | **PM** | QC | QC bản UAT chính thức | **31/05** | Test thực tế việc đứng trước Tivi để chấm công, test luồng fail. Trả bug cho Dev. |

---

## 📅 THÁNG 6 - TUẦN 1 (02/06 - 08/06)
**Theme:** Showcase & GO-LIVE

| Trạng thái | Assignee | Loại Task | Tên Task (Backlog Item) | Deadline | Mô tả & Deliverable |
|:---:|:---|:---|:---|:---|:---|
| ⬜ | **Dev 3** | Fix bug | Polish giao diện & Fix bug UAT | **03/06** | Sửa lỗi tốc độ load, mượt mà hóa animation tivi. |
| ⬜ | **PM** | Demo | Showcase nội bộ (Demo Day) | **04/06** | Trình diễn sản phẩm trước công ty, lấy feedback nóng từ HR và nhân sự. |
| ⬜ | **PM/Dev** | Deploy | **GO-LIVE LÊN PRODUCTION** | **05/06** | **05/06/2026**: Hệ thống chính thức chạy, mọi người bắt đầu dùng X-clock-in. |
