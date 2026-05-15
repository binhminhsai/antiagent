# Product Discovery: CASERP (Odoo x CASSO) - Bản Cập Nhật Đầy Đủ
**Người lập:** MinhCQ (PM)
**Mục tiêu Kép:** 
1. **(Macro - Anh Điệp):** CASSO trở thành "Plaid/Tink của Việt Nam" – lớp kết nối hạ tầng Fintech (Middleware) cho các hệ thống ERP.
2. **(Micro - Chị Mỹ/Chị Hạnh):** Trở thành Case Study (Proof of Concept) thực tế khi tự dùng CASERP cho kế toán nội bộ, từ bỏ hoàn toàn Misa.

---

## PHẦN 1: TẦM NHÌN CEO (CASSO LÀ FINTECH MIDDLEWARE)

| JTBD (Định hướng chiến lược) | Pain / Gain | Value Proposition | UX / User Flow | Cấu phần cần Build (Features) |
| :--- | :--- | :--- | :--- | :--- |
| **1. Tích hợp cho Partner (Vendor: Oris, Viindoo)** | **Pain:** Khó pitch đối tác nếu chưa có case thực tế.<br>**Gain:** Vendor có module "Plug & Play" dễ dàng cài đặt. | CASSO là "Fintech Infra Provider". Giảm rủi ro sửa code lõi của Vendor. | Kế toán dùng Viindoo -> Kết nối ngân hàng -> Màn hình Auth của CASSO (chạy ngầm) -> Done. Trả phí cho CASSO. | **Odoo module (Private):** Bank selection wizard (White-label).<br>**CASSO API:** Auth flow, Sync engine, Vendor billing dashboard. |
| **2. End-User dùng Odoo Enterprise** | **Gain:** CASERP trở thành chuẩn mực kết nối ERP ở Việt Nam. | End-user dễ dàng tự kết nối ngân hàng vào hệ thống kế toán đang có. | Add Bank Account -> Chọn Provider là CASSO -> Redirect sang CASSO Auth -> Map với Journal. | **Odoo SA Channel:** Đăng ký CASSO là official provider.<br>**CASSO API:** Signup flow, OAuth flow, Dedup logic. |
| **3. End-User dùng Odoo Open Source (Tự build)** | **Pain:** Hệ sinh thái Odoo VN chưa có chuẩn kết nối mở tốt. | Cung cấp module mã nguồn mở để cộng đồng tự cài đặt dễ dàng. | Tải module từ Github/App Store -> Nhập Client ID/Secret -> Fetch Accounts. | **Odoo module (Public MIT):** Module `account_statement_import_online_casso`. Wizard mapping. Cron job pull data. Sandbox env. |

---

## PHẦN 2: BÀI TOÁN KẾ TOÁN NỘI BỘ (CHỊ MỸ & CHỊ HẠNH)
*Team nội bộ dùng CASERP để ra "Proof of Concept" thực tế để đi Sales/Pitching đối tác.*

| JTBD (Nghiệp vụ Kế toán) | Pain (Nỗi đau hiện tại) | Gain (Kỳ vọng) | Feature (Tính năng Odoo) | UX Cải tiến (Giao diện) |
| :--- | :--- | :--- | :--- | :--- |
| **1. [Ưu tiên Cao nhất] Đối soát sao kê & Hạch toán** | Tải Excel, mở Misa dò tay mất thời gian. | Có ít nhất 1 connector API Kéo Sao Kê mượt mà trước Q3. | **Bank Feed Auto-sync:** Kéo data (delta sync), dedup logic, auto-suggest mã hạch toán, inline create Contact. | Màn hình "Sao kê ngân hàng". Giao dịch mới tự chui vào, tự gợi ý tài khoản đối ứng. Bấm bulk confirm hàng loạt. |
| **2. [Ưu tiên Cao] Xử lý Hóa đơn đầu vào** | Gõ tay từng tờ hóa đơn vào hệ thống. | Tự lấy data từ cổng thuế, tự map/tạo mới nhà cung cấp bằng MST. | **E-Invoice Inbound:** Kéo API cổng eTax/HTKK. Auto-map MST. Bulk import wizard. Tự điền TK hạch toán theo loại HH. | Menu "Hóa đơn đầu vào" -> Nút "Đồng bộ từ cổng thuế". View danh sách, điều chỉnh TK. Bấm tạo Bill hàng loạt. |
| **3. [Ưu tiên Vừa] Phát hành HĐ Đầu ra** | Lập phiếu Odoo xong qua phần mềm hóa đơn gõ lại. | Xuất HĐĐT ngay trên Odoo, tự động hạch toán. | **Q2:** Gắn module S-Invoice Viettel có sẵn. <br>**Q3:** Tự build X-Invoice gọi thẳng API Thuế, ký số CA. | Nút "Phát hành HĐ điện tử" trên Odoo Invoice. Cập nhật lại số HĐ. Không cần mở app khác. |
| **4. [BÁO ĐỘNG ĐỎ] Lập Tờ Khai Thuế & Khấu trừ** | Viindoo CHƯA CÓ. Phải xuất Excel -> làm Doc -> CSV -> HTKK -> XML -> Nộp thuế. Rất cồng kềnh. | Xem được bảng giao diện như Misa. Tự động xuất XML chuẩn để nộp. Tự hạch toán kết chuyển khấu trừ. | **Tax Reporting Automation:** Giao diện Tờ khai Thuế GTGT/TNCN/TNDN (Tháng/Quý/Năm). Nút "Export XML". Tự tạo chứng từ khấu trừ. | Menu "Tờ khai Thuế". Giao diện hiển thị các bảng giống y như Misa. Bấm nút "Lập tờ khai", "Xuất XML nộp thuế", "Kết chuyển". |
