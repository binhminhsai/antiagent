# 🗺️ Value Proposition Canvas + Feature List + UX Plan — CASERP MVP Q2/2026
> Phiên bản: v0.1 | Tháng 5/2026 | PM: MinhCQ  
> **Mục đích:** Từ Underserved Analysis → Thiết kế Value Proposition → Danh sách Feature → UX cho pilot Q3/2026

---

## PHẦN 1 — VALUE PROPOSITION CANVAS

### 1.1 Customer Profile tổng hợp

```
╔══════════════════════════════════════════════════════════════╗
║              CUSTOMER PROFILE — CASERP                       ║
╠═══════════════════╦══════════════════════════════════════════╣
║  JOBS TO BE DONE  ║  PAINS                                   ║
║                   ║                                          ║
║  • Kéo sao kê     ║  • Misa đóng kín, tính phí thêm         ║
║    tự động        ║  • Odoo vanilla phức tạp, thiếu VN-      ║
║  • Phát hành      ║    localization                          ║
║    HĐ điện tử     ║  • Không có HĐ điện tử trong Odoo       ║
║  • Báo cáo thuế   ║  • Báo cáo thuế VN không có sẵn         ║
║  • Tích hợp API   ║  • Chưa có Fintech middleware cho ERP VN ║
║    OpenBanking    ║  • Rủi ro sửa nhiều code Odoo            ║
║  • Trở thành      ║  • Chưa có proof of concept thật         ║
║    Plaid của VN   ║                                          ║
╠═══════════════════╩══════════════════════════════════════════╣
║  GAINS                                                        ║
║  • Sao kê auto → Odoo (không import thủ công)                ║
║  • Phát hành và quản lý HĐ trong 1 nơi                       ║
║  • UX quen thuộc, giống Misa                                  ║
║  • 1 connector ổn định cho đối tác ERP                        ║
║  • Module plug-and-play, không cần sửa Odoo core             ║
╚══════════════════════════════════════════════════════════════╝
```

---

### 1.2 Value Map — CASERP (Final Vision)

```
╔══════════════════════════════════════════════════════════════╗
║              VALUE MAP — CASERP                               ║
╠═══════════════════╦══════════════════════════════════════════╣
║  PRODUCTS &       ║  PAIN RELIEVERS                          ║
║  SERVICES         ║                                          ║
║                   ║  • Sync sao kê tự động qua CASSO API    ║
║  CASERP =         ║    → xóa bỏ import thủ công             ║
║  Odoo/Viindoo     ║  • Module HĐ điện tử tích hợp sẵn       ║
║  + CASSO          ║    → không cần app thứ 3                 ║
║  OpenBanking      ║  • Localization VN (thuế, báo cáo)      ║
║  APIs + VN        ║    → kế toán không cần Excel thêm       ║
║  Localization     ║  • Architecture không sửa Odoo core     ║
║                   ║    → maintain dễ, upgrade an toàn       ║
╠═══════════════════╩══════════════════════════════════════════╣
║  GAIN CREATORS                                                ║
║  • Dashboard tổng quan tài chính realtime                     ║
║  • 1 platform thay thế Misa + phần mềm HĐ riêng lẻ          ║
║  • API marketplace: đối tác ERP có thể dùng CASSO connector  ║
║  • Case study thật → CASSO pitch được cho Oris, Viindoo...   ║
╚══════════════════════════════════════════════════════════════╝
```

---

## PHẦN 2 — FEATURE LIST & PRIORITIZATION

### 2.1 Feature Mapping

| Feature | Giải quyết Pain | Tạo Gain | Phục vụ User | MVP Q2? |
|---------|----------------|:---:|:---:|:---:|
| **F1** — Sync sao kê ngân hàng tự động (CASSO API) | PP2, PP1 | G1 | Chị Mỹ + Anh Điệp | ✅ **MUST** |
| **F2** — Tích hợp phát hành hóa đơn điện tử từ Odoo | PP4 | G2 | Chị Mỹ | ✅ **MUST** |
| **F3** — Nhận và tra cứu hóa đơn đầu vào từ thuế | PP4 | G2 | Chị Mỹ | ✅ **MUST** |
| **F4** — Cấu hình đơn giản CASSO API (no-code setup) | P4, P6 | G4 | Anh Điệp + Dev | ✅ **MUST** |
| **F5** — Báo cáo thuế VAT/TNDN chuẩn VN từ Odoo | PP6 | G4 | Chị Mỹ | 🟡 **SHOULD** |
| **F6** — Tài liệu so sánh workflow Misa vs Odoo | PP3, PP7 | G5 | Chị Mỹ | ✅ **MUST** (tài liệu) |
| **F7** — Dashboard công nợ & dòng tiền | — | G1 | Chị Mỹ + Anh Điệp | 🟡 **SHOULD** |
| **F8** — Simplify Odoo menu cho kế toán VN (UX layer) | PP3 | G3 | Chị Mỹ | 🟡 **SHOULD** |
| **F9** — Module đóng gói (installable on Viindoo/Odoo CE) | P4 | G4 | Anh Điệp + Đối tác | 🔵 **COULD** (post-MVP) |
| **F10** — Đồng bộ dữ liệu migrate từ Misa | PP5 | G1 | Chị Mỹ | 🟡 **SHOULD** |
| **F11** — API marketplace / portal cho đối tác | P3 | G5 | Anh Điệp | 🔵 **COULD** (Q4+) |

> **Chú thích:** MUST = MVP Q2, SHOULD = cần có trước Pilot Q3, COULD = roadmap sau

---

### 2.2 MoSCoW Summary cho MVP (Tháng 5–6/2026)

#### ✅ MUST HAVE (Pilot không đi được nếu thiếu)
1. **F1** — Sync sao kê tự động từ CASSO API → Odoo Journal Entries
2. **F2** — Phát hành hóa đơn điện tử trong Odoo (kết nối VNPT/Viettel/MISA Invoice)
3. **F3** — Nhận hóa đơn đầu vào từ cổng thuế / API e-invoice
4. **F4** — Giao diện cấu hình CASSO API đơn giản (nhập API key, chọn ngân hàng)
5. **F6** — Tài liệu hướng dẫn Misa vs Odoo cho chị Mỹ (kế toán)

#### 🟡 SHOULD HAVE (Hoàn thiện trước Pilot ngày 1/7)
6. **F5** — Báo cáo thuế VAT chuẩn Việt Nam
7. **F7** — Dashboard dòng tiền cơ bản (A/R, A/P, Bank balance)
8. **F8** — Simplify Odoo menu/wizard cho luồng kế toán VN
9. **F10** — Import data từ Misa (danh mục, số dư đầu kỳ)

#### 🔵 COULD HAVE (Sau Pilot, Q3–Q4)
10. **F9** — Đóng gói thành module chuẩn Odoo CE
11. **F11** — Portal API cho đối tác ERP

---

## PHẦN 3 — UX PLAN CHO PILOT Q3/2026

### 3.1 Triết lý UX — CASERP

> **"Quen như Misa, mạnh như Odoo, mở như CASSO"**

- **Nguyên tắc 1:** Không bắt kế toán học lại từ đầu — ưu tiên naming, flow giống Misa
- **Nguyên tắc 2:** Giảm click — mỗi tác vụ thường ngày phải ≤ 3 bước
- **Nguyên tắc 3:** Không sửa Odoo core — chỉ thêm module/widget/view mới
- **Nguyên tắc 4:** Mobile-friendly cho quick check (dashboard dòng tiền)

---

### 3.2 User Journey — Chị Mỹ (Kế toán) trong CASERP

#### Journey 1: Đầu ngày — Check sao kê

```
[Mở Odoo] → [Dashboard Tài Chính] → [Xem giao dịch mới từ đêm qua]
    ↓ (CASSO đã sync tự động)
[Match giao dịch với hóa đơn] → [Confirm / tạo bút toán]
    ↓
[Xong ✅] — Thay vì: Mở Excel, Download sao kê, Import thủ công
```

#### Journey 2: Phát hành hóa đơn cho khách

```
[Sales Order confirmed] → [Tạo Invoice] → [Chọn mẫu HĐ điện tử]
    ↓
[Preview HĐ] → [Ký và gửi ngay từ Odoo]
    ↓
[HĐ lưu vào hệ thống thuế tự động ✅]
```

#### Journey 3: Cuối tháng — Báo cáo thuế

```
[Menu Kế Toán] → [Báo Cáo Thuế VN] → [Chọn tháng]
    ↓
[Auto-generate bảng kê VAT, TNDN] → [Export Excel/PDF]
    ↓
[Nộp lên cổng thuế điện tử ✅]
```

---

### 3.3 Screen Flow MVP — Các màn hình cần thiết kế

| Screen | Mô tả | Priority | Ai thiết kế |
|--------|-------|:---:|:---:|
| **S1** — Dashboard Tài Chính | Tổng quan: Bank balance, A/R, A/P, giao dịch gần nhất | MUST | MinhCQ + Dev |
| **S2** — Cấu hình CASSO API | Nhập API key, chọn tài khoản ngân hàng, test kết nối | MUST | Dev |
| **S3** — Bank Statement Auto-sync | List giao dịch sync về, trạng thái match, action | MUST | Dev + MinhCQ |
| **S4** — Wizard phát hành HĐ điện tử | Chọn template, fill thông tin, preview, ký | MUST | Dev |
| **S5** — Tra cứu HĐ đầu vào | Search, filter, import từ cổng thuế | MUST | Dev |
| **S6** — Báo cáo thuế VN | VAT, TNDN, xuất PDF/Excel | SHOULD | Dev |
| **S7** — Import từ Misa | Wizard upload file, map fields, preview, confirm | SHOULD | Dev |
| **S8** — Help & Hướng dẫn inline | Tooltip, video short, so sánh Misa→Odoo | SHOULD | MinhCQ |

---

### 3.4 UX Simplification — Odoo menu cho kế toán VN

Odoo gốc có menu rất nhiều. CASERP cần tạo **1 menu shortcut** cho kế toán chỉ gồm:

```
📊 CASERP KẾ TOÁN
├── 🏠 Dashboard Tài Chính
├── 🏦 Sao Kê Ngân Hàng
│   ├── Giao dịch mới cần xử lý
│   └── Lịch sử đồng bộ
├── 📄 Hóa Đơn
│   ├── Phát hành HĐ mới
│   ├── HĐ đầu vào
│   └── Tra cứu tất cả
├── 💰 Công Nợ
│   ├── Khách hàng nợ
│   └── Nhà cung cấp cần trả
├── 📊 Báo Cáo Thuế
│   ├── Bảng kê VAT tháng này
│   └── Báo cáo TNDN
└── ⚙️ Cài Đặt
    └── Cấu hình CASSO API
```

---

## PHẦN 4 — ROADMAP TÓM TẮT

### Timeline Q2/2026

```
THÁNG 5 (còn 2 tuần)
├── Tuần 3 (13–18/5): User research → Confirm hypotheses với anh Điệp + chị Mỹ
│                     Dev: Setup Odoo dev environment + CASSO API sandbox
└── Tuần 4 (19–25/5): Wireframe S1–S5 + Define API specs CASSO↔Odoo
                     Kế toán: Bắt đầu tài liệu so sánh Misa vs Odoo

THÁNG 6 (4 tuần)
├── Tuần 1 (26/5–1/6):  Dev F1 — Bank sync module (CASSO API → Journal)
├── Tuần 2 (2–8/6):     Dev F2+F3 — E-invoice integration
├── Tuần 3 (9–15/6):    Dev F4+F8 — Config UI + UX simplification
│                       Internal testing với chị Mỹ
└── Tuần 4 (16–22/6):   Bug fix + F5 báo cáo thuế + F10 import Misa
                        UAT với chị Mỹ + anh Điệp review

ĐẦU THÁNG 7
└── Pilot chính thức CASERP tại CASSO 🚀
```

---

### Vision 1 năm (đến Q2/2027)

| Giai đoạn | Mục tiêu | KPI |
|-----------|----------|-----|
| Q3/2026 | Pilot ổn định tại CASSO | Chị Mỹ dùng được 100% quy trình không cần Misa |
| Q4/2026 | Đóng gói module + Onboard thêm 2–3 khách hàng | 3 công ty dùng CASERP |
| Q1/2027 | CASSO API connector là sản phẩm B2B chính thức | Có đối tác ERP đầu tiên (Oris/Viindoo) integrate |
| Q2/2027 | Marketplace / Portal CASSO Fintech Infra | 10+ doanh nghiệp dùng CASERP |

---

*File này là living document — cập nhật sau mỗi sprint review.*  
*Lần cập nhật cuối: 13/5/2026 — MinhCQ*
