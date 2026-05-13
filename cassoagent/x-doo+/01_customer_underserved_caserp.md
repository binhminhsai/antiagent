# 📋 Customer Underserved Analysis — CASERP
> Phiên bản: v0.1 | Tháng 5/2026 | PM: MinhCQ  
> **Mục đích:** Tổng hợp giả thuyết ban đầu về Underserved Needs của 2 target user chính trước khi đi phỏng vấn confirm

---

## 1. TARGET USER #1 — Anh Điệp (Nguyễn Hồng Điệp, CEO CASSO)

### 🎯 JTBD — Jobs To Be Done

| # | Job | Mô tả chi tiết | Loại |
|---|-----|----------------|------|
| J1 | Phân phối giá trị từ hạ tầng CASSO đã xây | CASSO đã đầu tư xây các API OpenBanking (kéo sao kê, kết nối ngân hàng). Anh Điệp muốn tìm thêm kênh phân phối để API này tạo ra doanh thu mới | **Functional** |
| J2 | Trở thành middleware Fintech trong hệ sinh thái ERP Việt Nam | Muốn CASSO đóng vai trò như Plaid (Mỹ) hoặc Tink (Thụy Điển) — tức là lớp kết nối giữa ngân hàng và phần mềm quản lý doanh nghiệp (ERP/Kế toán) | **Strategic** |
| J3 | Tích hợp API CASSO vào Odoo/Viindoo | Use case cụ thể: cấp API cho đối tác ERP (Oris/Viindoo) hoặc cấp thẳng cho end-user (Siêu Tốc, Skinfood...) | **Functional** |
| J4 | Giảm phụ thuộc vào một kênh doanh thu duy nhất | Hiện tại CASSO chủ yếu doanh thu từ subscription người dùng cá nhân/SME. Mở rộng sang B2B API là hướng tăng trưởng mới | **Business** |
| J5 | Chứng minh product-market fit của CASERP nhanh | Dùng CASERP như case study đầu tiên — vừa deploy cho nội bộ (CASSO), vừa là showcase cho khách hàng ERP sau | **Strategic** |

---

### 😤 PAIN POINTS — Anh Điệp

| # | Pain Point | Mức độ (1–5) | Ghi chú / Giả thuyết cần confirm |
|---|------------|:---:|---|
| P1 | **Thị trường Việt Nam chưa có middleware Fintech chuẩn cho ERP** — phải tự build từ đầu mỗi khi tích hợp | ⭐⭐⭐⭐⭐ | Tink/Plaid không hỗ trợ VN, đây là khoảng trắng rõ ràng |
| P2 | **CASSO chưa có SDK/connector chính thức cho Odoo** — mỗi tích hợp đều custom | ⭐⭐⭐⭐ | Cần confirm: dev hiện tại của CASSO có roadmap này chưa? |
| P3 | **Không chắc thị trường ERP VN đủ lớn để đầu tư** — Odoo/Viindoo còn ít thị phần so với Misa | ⭐⭐⭐ | Cần số liệu: bao nhiêu SME đang dùng Odoo/Viindoo tại VN? |
| P4 | **Rủi ro khi thay đổi quá nhiều code Odoo** — maintain khó, nâng cấp version bị vỡ | ⭐⭐⭐⭐ | Triết lý "không thay đổi code quá nhiều" — cần thiết kế theo module |
| P5 | **Kéo sao kê và hóa đơn điện tử vẫn cần manual** ở nhiều bước trong Odoo vanilla | ⭐⭐⭐⭐ | Pain mà CASERP phải giải quyết ngay từ MVP |
| P6 | **Chưa có proof of concept thực tế** — khó pitch cho đối tác ERP khác nếu chưa có case thật | ⭐⭐⭐⭐⭐ | CASERP tại CASSO chính là case đầu tiên |

---

### 🌟 GAINS — Anh Điệp muốn đạt được

| # | Gain | Mức độ mong đợi | Ghi chú |
|---|------|:---:|---|
| G1 | **CASSO được nhận diện là Fintech infra provider** cho hệ sinh thái ERP VN | ⭐⭐⭐⭐⭐ | Positioning dài hạn |
| G2 | **Có ít nhất 1 connector hoạt động ổn định** giữa CASSO API và Odoo/Viindoo trước Q3/2026 | ⭐⭐⭐⭐⭐ | MVP goal cụ thể |
| G3 | **Team nội bộ CASSO tự dùng CASERP được** — kế toán không cần quay lại Misa | ⭐⭐⭐⭐ | Pilot target |
| G4 | **Module đủ "plug-and-play"** để partner ERP khác (Oris, Viindoo) có thể adopt dễ | ⭐⭐⭐⭐ | Scalability |
| G5 | **Tạo được pipeline khách hàng mới** dùng CASERP khi thấy case CASSO thành công | ⭐⭐⭐ | Tháng 7 trở đi |

---

### 📝 Câu hỏi phỏng vấn gợi ý — Anh Điệp

> ✅ = Cần confirm ngay trước tuần 3/5  
> 🔄 = Có thể hỏi sau khi có prototype

1. ✅ Anh kỳ vọng connector CASSO–Odoo đầu tiên sẽ support những API nào? (Kéo sao kê / E-invoice / Phát hành HĐ?)
2. ✅ Với use case "CASSO cấp API cho Oris/Viindoo" — anh muốn tính phí theo model nào? (Per API call / Subscription / Revenue share?)
3. ✅ Nếu phải chọn 1 trong 2 để làm trước: kéo sao kê tự động hay tích hợp hóa đơn điện tử — anh chọn gì?
4. ✅ Anh có muốn CASERP này được đóng gói thành module Odoo community có thể install không?
5. 🔄 Anh có roadmap ra mắt thêm API mới nào trong 6 tháng tới không? (để tôi ưu tiên thiết kế mở rộng được)
6. 🔄 Anh có đối thủ cạnh tranh nào đang làm điều tương tự mà anh lo ngại?

---

## 2. TARGET USER #2 — Chị Mỹ (Kế toán viên, CASSO)

### 🎯 JTBD — Chị Mỹ

| # | Job | Mô tả chi tiết | Loại |
|---|-----|----------------|------|
| J1 | **Nhập và đối chiếu sao kê ngân hàng hàng ngày/tuần** | Kéo sao kê từ ngân hàng, so khớp với chứng từ trong phần mềm | **Core Daily** |
| J2 | **Phát hành và quản lý hóa đơn điện tử** | Xuất hóa đơn cho khách hàng, tra cứu hóa đơn đầu vào từ nhà cung cấp | **Core Daily** |
| J3 | **Lập báo cáo tài chính và khai thuế** | Tổng hợp dữ liệu để nộp báo cáo VAT, thuế TNDN hàng tháng/quý | **Periodic** |
| J4 | **Theo dõi công nợ và dòng tiền** | Biết khách nợ bao nhiêu, nhà cung cấp cần thanh toán gì | **Core Weekly** |
| J5 | **Chuyển dữ liệu từ Misa sang Odoo** | Trong giai đoạn chuyển đổi, cần export/import không mất dữ liệu | **Transition** |

---

### 😤 PAIN POINTS — Chị Mỹ

| # | Pain Point | Mức độ (1–5) | Nguồn / Giả thuyết |
|---|------------|:---:|---|
| PP1 | **Misa tốt nhưng đóng kín** — muốn thêm tính năng phải trả tiền từng module, không tự customize được | ⭐⭐⭐⭐⭐ | Quan sát từ thị trường — cần confirm với chị Mỹ |
| PP2 | **Kéo sao kê ngân hàng trong Misa phải trả phí thêm** hoặc vẫn import file thủ công | ⭐⭐⭐⭐⭐ | Đây là pain point chính CASERP cần giải |
| PP3 | **Odoo vanilla phức tạp hơn Misa** — nhiều bước, nhiều menu, không quen | ⭐⭐⭐⭐ | Cần UX simplification trong CASERP |
| PP4 | **Hóa đơn điện tử cần kết nối nhiều bên** (VNPT, Viettel, MISA Invoice...) — hiện không tích hợp trong Odoo | ⭐⭐⭐⭐⭐ | Gap rõ ràng giữa Odoo vanilla và nhu cầu VN |
| PP5 | **Sợ mất dữ liệu hoặc sai số khi chuyển từ Misa sang Odoo** | ⭐⭐⭐⭐ | Transition risk |
| PP6 | **Báo cáo thuế VN không có sẵn trong Odoo** — phải tự tạo hoặc export ra Excel | ⭐⭐⭐⭐ | Cần localization module |
| PP7 | **Không có người support kỹ thuật gần** — khi Odoo lỗi không biết hỏi ai | ⭐⭐⭐ | Process/support gap |

---

### 🌟 GAINS — Chị Mỹ muốn đạt được

| # | Gain | Mức độ mong đợi | Ghi chú |
|---|------|:---:|---|
| G1 | **Sao kê ngân hàng tự động vào Odoo** — không cần import file thủ công | ⭐⭐⭐⭐⭐ | Killer feature #1 |
| G2 | **Phát hành hóa đơn điện tử ngay trong Odoo** — không cần chuyển sang app khác | ⭐⭐⭐⭐⭐ | Killer feature #2 |
| G3 | **Giao diện tương tự Misa** — workflow quen thuộc, learning curve thấp | ⭐⭐⭐⭐ | UX priority |
| G4 | **Báo cáo thuế VAT/TNDN xuất được từ Odoo** mà không cần Excel | ⭐⭐⭐⭐ | Compliance feature |
| G5 | **Có tài liệu hướng dẫn so sánh Misa vs Odoo** để học nhanh | ⭐⭐⭐⭐ | Onboarding material — chị Mỹ sẽ làm cùng team |
| G6 | **Support nhanh khi có vấn đề** — có người nhắn là được hỗ trợ | ⭐⭐⭐ | Support SLA |

---

### 📝 Câu hỏi phỏng vấn gợi ý — Chị Mỹ

> ✅ = Cần confirm ngay  
> 🔄 = Có thể hỏi khi demo prototype

1. ✅ Hiện tại chị kéo sao kê ngân hàng bằng cách nào? (Import file / Tự động qua Misa / Nhập tay?)
2. ✅ Chị đang dùng phần mềm xuất hóa đơn điện tử nào? Có hay gặp vấn đề gì không?
3. ✅ Trong 1 ngày làm việc của chị, 3 việc nào tốn thời gian nhất?
4. ✅ Nếu Odoo có thể làm được tất cả những gì Misa làm — chị thấy khó nhất khi chuyển sang Odoo là gì?
5. ✅ Chị thường làm báo cáo thuế hàng tháng như thế nào? Dữ liệu lấy từ đâu?
6. 🔄 Khi demo Odoo, tính năng nào chị thấy "ồ cái này Misa không có" và tính năng nào chị thấy "cái này Misa làm tốt hơn"?

---

## 3. Sơ đồ Underserved tổng quan

```
┌─────────────────────────────────────────────────────────────┐
│                    CASERP — User Underserved Map             │
├───────────────────────┬─────────────────────────────────────┤
│   Anh Điệp (CEO)      │        Chị Mỹ (Kế toán)            │
├───────────────────────┼─────────────────────────────────────┤
│ JTBD:                 │ JTBD:                               │
│ • Phân phối API       │ • Đối chiếu sao kê hàng ngày       │
│ • Trở thành Plaid VN  │ • Phát hành hóa đơn điện tử        │
│ • Prove CASERP works  │ • Báo cáo thuế                     │
├───────────────────────┼─────────────────────────────────────┤
│ PAIN:                 │ PAIN:                               │
│ • Chưa có Fintech     │ • Misa đóng kín, tính phí extra    │
│   middleware cho ERP  │ • Odoo vanilla quá phức tạp        │
│ • Chưa có case thật   │ • HĐ điện tử không tích hợp sẵn   │
│ • Risk code quá nhiều │ • Báo cáo thuế VN không có         │
├───────────────────────┼─────────────────────────────────────┤
│ GAIN:                 │ GAIN:                               │
│ • 1 connector ổn định │ • Sao kê auto → Odoo               │
│ • Plug-and-play module│ • Phát hành HĐ trong Odoo          │
│ • Pipeline B2B mới    │ • UX giống Misa                    │
└───────────────────────┴─────────────────────────────────────┘
```

---

## 4. Hypotheses cần validate — Bảng theo dõi

| Hypothesis | Phương pháp validate | Người phỏng vấn | Deadline | Trạng thái |
|------------|---------------------|:---:|:---:|:---:|
| Anh Điệp ưu tiên kéo sao kê hơn HĐ điện tử | Phỏng vấn trực tiếp | MinhCQ | 16/5 | ⬜ Chưa làm |
| Chị Mỹ import sao kê thủ công hiện tại | Observation / Interview | MinhCQ | 16/5 | ⬜ Chưa làm |
| Odoo quá phức tạp so với Misa với chị Mỹ | Demo & observe | MinhCQ | 19/5 | ⬜ Chưa làm |
| Anh Điệp muốn module plug-and-play cho đối tác | Phỏng vấn trực tiếp | MinhCQ | 16/5 | ⬜ Chưa làm |
| Chị Mỹ cần báo cáo thuế VN từ Odoo | Phỏng vấn + xem workflow | MinhCQ | 19/5 | ⬜ Chưa làm |
| Team dev đã rành code Odoo đủ để không cần sửa core | Technical review | Dev Lead | 20/5 | ⬜ Chưa làm |

---

*File này là giả thuyết ban đầu. Cập nhật sau mỗi buổi phỏng vấn.*  
*Lần cập nhật cuối: 13/5/2026 — MinhCQ*
