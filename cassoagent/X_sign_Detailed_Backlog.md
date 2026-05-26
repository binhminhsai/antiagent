# X-sign Detailed Backlog & Execution Plan (Q2 2026)

Dựa trên lộ trình 6 tuần (Tháng 5 Tuần 3 đến Tháng 6 Tuần 4) và Workflow "AI-First PM", dưới đây là danh sách Backlog chi tiết cho X-sign (KysoQR + CAS ID).

## 👥 Nguồn lực
- **PM (Bạn):** Phân tích, Viết Spec/FRS, Vibe UI/Prototype, Chốt luồng BAAS, QC, UAT.
- **Dev (Dev Internal / Dev 3):** Code giao diện KysoQR, Code logic CAS ID (hỗ trợ BAAS), Fix bug.
- **BAAS Team:** Phối hợp cấp quyền API, Sandbox, Review code CAS ID.

---

## 📅 THÁNG 5 - TUẦN 3 & TUẦN 4 (19/05 - 01/06)
**Theme:** Product Discovery & Spec (KysoQR & CAS ID)

| Trạng thái | Assignee | Loại Task | Tên Task (Backlog Item) | Deadline | Mô tả & Deliverable |
|:---:|:---|:---|:---|:---|:---|
| ⬜ | **PM** | Discovery | Nghiên cứu luồng Ký hàng loạt & mù| **21/05** | Phân tích bài toán HR ký hàng loạt HĐ. |
| ⬜ | **PM** | FRS | Viết Spec & Prototype: KysoQR | **23/05** | Thiết kế luồng Không login, xem/tạo hợp đồng, chọn chữ ký. Vibe giao diện. |
| ⬜ | **PM** | FRS | Viết Spec & Prototype: CAS ID | **27/05** | Thiết kế luồng mua chứng thư, bỏ ký mù, tạo mẫu chữ ký/mộc. |
| ⬜ | **PM** | Meeting | Chốt luồng với BAAS Team | **29/05** | Trình bày Prototype. Chốt phương án ISA hỗ trợ code. |

---

## 📅 THÁNG 6 - TUẦN 1 (02/06 - 08/06)
**Theme:** KysoQR UI & Chốt CAS ID Contract

| Trạng thái | Assignee | Loại Task | Tên Task (Backlog Item) | Deadline | Mô tả & Deliverable |
|:---:|:---|:---|:---|:---|:---|
| ⬜ | **PM** | Setup | Chốt API / Quyền CAS ID | **05/06** | Làm việc với BAAS để chốt API contract, xin quyền truy cập Sandbox repo. |
| ⬜ | **Dev 3** | Code | Phát triển Giao diện KysoQR | **06/06** | Dựng màn hình: upload HĐ, luồng ký cho Cá nhân/DN, tính năng ký hàng loạt. |

---

## 📅 THÁNG 6 - TUẦN 2 (09/06 - 15/06)
**Theme:** QC KysoQR & Bắt đầu code CAS ID (Tuần 1)

| Trạng thái | Assignee | Loại Task | Tên Task (Backlog Item) | Deadline | Mô tả & Deliverable |
|:---:|:---|:---|:---|:---|:---|
| ⬜ | **PM** | QC | QC Luồng KysoQR | **12/06** | Test luồng tạo HĐ, ký hàng loạt (Mock API). Đẩy bug cho Dev. |
| ⬜ | **Dev 3** | Code | Phát triển CAS ID (Tuần 1) | **15/06** | Code module xóa ký mù, tạo template chữ ký số/mộc trên Sandbox của BAAS. |

---

## 📅 THÁNG 6 - TUẦN 3 (16/06 - 22/06)
**Theme:** Fixbug KysoQR & Hoàn thiện CAS ID (Tuần 2)

| Trạng thái | Assignee | Loại Task | Tên Task (Backlog Item) | Deadline | Mô tả & Deliverable |
|:---:|:---|:---|:---|:---|:---|
| ⬜ | **Dev 3** | Fix bug | Fixbug giao diện KysoQR | **18/06** | Sửa các lỗi UI/UX và logic luồng ký từ đợt QC tuần trước. |
| ⬜ | **Dev 3** | Code | Phát triển CAS ID (Tuần 2) | **20/06** | Hoàn thiện luồng Auth & Cấp quyền ký số từ KysoQR gọi sang CAS ID. |
| ⬜ | **PM** | Testing | Ráp luồng E2E trên Sandbox | **22/06** | Đứng ở KysoQR -> Văng sang CAS ID ký -> Văng về báo thành công. |

---

## 📅 THÁNG 6 - TUẦN 4 (23/06 - 30/06)
**Theme:** UAT & GO-LIVE Ký nội bộ

| Trạng thái | Assignee | Loại Task | Tên Task (Backlog Item) | Deadline | Mô tả & Deliverable |
|:---:|:---|:---|:---|:---|:---|
| ⬜ | **PM** | Deploy | Đẩy KysoQR & CAS ID lên UAT | **24/06** | Phối hợp với DevOps/BAAS đưa tính năng lên môi trường Test. |
| ⬜ | **QA/HR**| UAT | Dùng thử UAT & QC | **26/06** | Phòng HR dùng tài khoản test tạo thử hợp đồng khoán việc hàng loạt. |
| ⬜ | **Dev 3** | Fix bug | Xử lý lỗi nóng từ UAT | **28/06** | Fix các lỗi phát sinh (chữ ký lệch, lỗi font PDF, v.v.). |
| ⬜ | **PM/Dev** | Deploy | **GO-LIVE LÊN PRODUCTION** | **30/06** | Sớm nhất 30/06, trễ nhất 04/07. HR có thể dùng chính thức để ký HĐ. |
