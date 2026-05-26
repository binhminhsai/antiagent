# CASERP Detailed Backlog & Execution Plan (Q2 2026)

Dựa trên lộ trình 6 tuần (Tháng 5 Tuần 3 đến Tháng 6 Tuần 4) và Workflow "AI-First PM" (Viết FRS 5 phần -> Vibe UI -> Chốt AC -> Vibe Code -> QC -> UAT -> Go-live), dưới đây là danh sách Backlog chi tiết để PM dễ dàng control tiến độ của team.

## 👥 Nguồn lực
- **PM (Bạn):** Phân tích, Viết Spec/FRS, Vibe UI/Prototype, Chốt AC với CEO/QA, QC, Deploy UAT, Demo.
- **Dev (2 Fullstack):** Nhận FRS, Vibe Code, Fix bug.
- **QA (Chị Mỹ - Kế toán):** Chốt AC, Dùng thử (Pilot), Test trên UAT, So sánh số liệu.

---

## 📅 THÁNG 5 - TUẦN 3 (19/05 - 25/05)
**Theme:** Setup nền tảng & Bank Integration

| Trạng thái | Assignee | Loại Task | Tên Task (Backlog Item) | Deadline | Mô tả & Deliverable |
|:---:|:---|:---|:---|:---|:---|
| ⬜ | **PM** | Setup | Import Data Mẫu & S-Invoice | **20/05** | Đẩy data vào Odoo localization, cấp quyền cho chị Mỹ test luồng có sẵn. |
| ⬜ | **PM** | FRS | Viết FRS: Module Bank Connect | **21/05** | Gồm 5 phần chuẩn. Vibe UI màn hình kết nối ngân hàng. Chốt với sếp. |
| ⬜ | **PM** | FRS | Viết FRS: Module Bank Feed | **23/05** | Mapping JSON schema. Vibe UI màn hình đối chiếu giao dịch. Chốt AC. |
| ⬜ | **Devs** | Code | Phát triển Bank Connect | **23/05** | Gọi API OAuth CASSO, giao diện kết nối tài khoản. |
| ⬜ | **Devs** | Code | Phát triển Bank Feed | **26/05** | Lấy giao dịch về Odoo, mapping chuẩn xác JSON payload vào bảng nháp. |

---

## 📅 THÁNG 5 - TUẦN 4 (26/05 - 01/06)
**Theme:** E-Invoice Inbound & Odoo Pilot

| Trạng thái | Assignee | Loại Task | Tên Task (Backlog Item) | Deadline | Mô tả & Deliverable |
|:---:|:---|:---|:---|:---|:---|
| ⬜ | **PM** | QC | QC Module Bank Connect & Feed | **27/05** | Đảm bảo Dev code đúng FRS, UI không bị vỡ, kéo được data thật. |
| ⬜ | **QA** | Pilot | Pilot Odoo Kế toán | **30/05** | Chị Mỹ bắt đầu dùng Odoo hạch toán các nghiệp vụ cơ bản, ghi nhận thắc mắc. |
| ⬜ | **PM** | FRS | Viết FRS: Kéo hóa đơn điện tử | **30/05** | FRS luồng kéo HĐ đầu vào. **Đặc biệt:** UI edit trực tiếp biến hóa đơn trên Grid. |
| ⬜ | **Devs** | Code | Phát triển Module Kéo hóa đơn | **02/06** | Code API tích hợp Tổng cục Thuế, tính năng bulk edit trực tiếp trên grid view. |

---

## 📅 THÁNG 6 - TUẦN 1 (02/06 - 08/06)
**Theme:** E-Invoice Outbound & QC

| Trạng thái | Assignee | Loại Task | Tên Task (Backlog Item) | Deadline | Mô tả & Deliverable |
|:---:|:---|:---|:---|:---|:---|
| ⬜ | **QA** | Review | Review trải nghiệm Odoo 1 tuần | **04/06** | Chị Mỹ gửi feedback sau 1 tuần dùng trơn tru. |
| ⬜ | **PM** | QC | QC Module Kéo hóa đơn | **04/06** | Kéo thử HĐ thật, test tính năng sửa trên grid. Báo bug cho Dev. |
| ⬜ | **PM** | FRS | Viết FRS: Phát hành HĐĐT | **06/06** | Phân tích luồng S-Invoice, viết FRS tạo HĐĐT trực tiếp từ Odoo lên Thuế. |
| ⬜ | **Devs** | Code | Phát triển Module Phát hành HĐĐT| **09/06** | Code luồng tạo XML chuẩn, ký số và gửi API lên cơ quan thuế. |

---

## 📅 THÁNG 6 - TUẦN 2 (09/06 - 15/06)
**Theme:** Payment Orders & Hạch toán nội bộ

| Trạng thái | Assignee | Loại Task | Tên Task (Backlog Item) | Deadline | Mô tả & Deliverable |
|:---:|:---|:---|:---|:---|:---|
| ⬜ | **PM** | QC | QC Module Phát hành HĐĐT | **10/06** | Ký thử bằng chứng thư số test, check XML schema trả về. |
| ⬜ | **PM** | FRS | Viết FRS: Lệnh thanh toán | **13/06** | Flow tạo lệnh chi ngay trên Odoo, tự động hạch toán đối ứng. Vibe UI & chốt AC. |
| ⬜ | **Devs** | Code | Phát triển Module Lệnh thanh toán | **16/06** | Mở form tạo lệnh, logic phê duyệt, tự sinh bút toán Nợ/Có liên quan. |

---

## 📅 THÁNG 6 - TUẦN 3 (16/06 - 22/06)
**Theme:** UAT Deployment & Tax Reporting (Giai đoạn 1)

| Trạng thái | Assignee | Loại Task | Tên Task (Backlog Item) | Deadline | Mô tả & Deliverable |
|:---:|:---|:---|:---|:---|:---|
| ⬜ | **PM** | Deploy | Đẩy toàn bộ module lên UAT | **17/06** | Gom Code: Bank, Hóa đơn (In/Out), Lệnh thanh toán lên môi trường UAT. |
| ⬜ | **QA** | UAT | Test E2E trên UAT | **20/06** | Chị Mỹ test toàn bộ luồng tích hợp, xác nhận AC. |
| ⬜ | **PM** | FRS | Viết FRS: Báo cáo thuế (Part 1) | **20/06** | Viết FRS: Bảng kê hóa đơn mua vào/bán ra & Tờ khai GTGT. |
| ⬜ | **Devs** | Code | Phát triển Báo cáo Thuế (Tuần 1) | **23/06** | Dựng Base Report, code lấy dữ liệu cho Bảng kê mua vào/bán ra. |

---

## 📅 THÁNG 6 - TUẦN 4 (23/06 - 30/06)
**Theme:** GO-LIVE & Final Polish

| Trạng thái | Assignee | Loại Task | Tên Task (Backlog Item) | Deadline | Mô tả & Deliverable |
|:---:|:---|:---|:---|:---|:---|
| ⬜ | **PM** | FRS | Viết FRS: Báo cáo thuế (Part 2) | **24/06** | Hoàn thiện FRS cho tờ khai TNDN, TNCN (nếu có). |
| ⬜ | **Devs** | Fix bug | Polish Giao diện & Fix Bug (UAT) | **25/06** | Xử lý triệt để bug từ chị Mỹ. Làm mượt UI theo feedback của PM. |
| ⬜ | **PM** | Demo | Demo cho CEO (Anh Điệp) | **26/06** | Trình bày thay đổi, chiếu video so sánh, chứng minh ROI. |
| ⬜ | **QA** | Testing | Testing so sánh Odoo vs MISA | **26/06** | Quay màn hình (Video) làm đối chứng bảng cân đối Odoo cũ, mới và MISA. |
| ⬜ | **Devs** | Code | Phát triển Báo cáo Thuế (Tuần 2) | **28/06** | Hoàn thiện tờ khai XML xuất ra để nộp mạng. |
| ⬜ | **PM/Dev**| Deploy | **GO-LIVE LÊN PRODUCTION** | **30/06** | **Deadline cứng 30/06**. Kế toán chính thức dùng CASERP từ 01/07. |
