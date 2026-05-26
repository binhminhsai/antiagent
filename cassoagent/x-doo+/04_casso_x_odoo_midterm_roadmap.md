# 🗺️ Roadmap Trung Hạn — CASSO × Odoo (Q2/2026 → Q1/2027)

> **Phiên bản:** v1.0 | 18/5/2026 | PM: MinhCQ

> **Status:** Living document — cập nhật sau mỗi sprint review

> **Decision đã chốt với anh Điệp:** Phương án **A (API Provider) + B (Marketplace)** — KHÔNG đi C (Odoo Partner) hay D (Standalone ERP)

> **Mục đích:** Hợp nhất Sprint Planning Q2 hiện tại với chiến lược 12 tháng để chốt phương án hợp tác CASSO × Odoo

---

## 0. Executive Summary (1 trang)

CASSO sẽ **không trở thành ERP vendor** (không đi đường Misa). CASSO trở thành **Fintech infrastructure layer** cho hệ sinh thái Odoo tại Việt Nam, hoạt động trên 2 track song song:

- **Track A — API Platform (core business):** Bán quyền truy cập CASSO API cho các Odoo implementer/partner tại VN (Portcities, Viindoo, Oris, A1…) và end-customer dùng Odoo Enterprise trực tiếp. Doanh thu recurring qua subscription/usage.
- **Track B — Module Marketplace (distribution channel):** Đóng gói các tính năng CASSO thành Odoo modules cài đặt được, publish lên `apps.odoo.com`. Vừa là kênh marketing toàn cầu, vừa là first revenue ngắn hạn.

**Cả 2 track dùng chung 1 backend duy nhất.** Modules trên marketplace gọi về CASSO API — vừa bán modules, vừa generate API traffic.

**12 tháng tới:**

| Quý | Theme | Mục tiêu chính | Deliverable bên ngoài |
|---|---|---|---|
| Q2/2026 | Foundation | CASERP go-live 30/6 nội bộ | (chưa có) |
| Q3/2026 | Stabilize + First Publish | 3 modules đầu lên apps.odoo.com | 3 modules public |
| Q4/2026 | API Platform + Commercial Prep | Developer Portal beta + 3-5 prospects | docs.casso.vn + 5 LOI |
| Q1/2027 | Launch & Validate | Free trial 3-5 customers + Marketing campaign | First paying API customers |

---

## 1. Strategic Framing — Tại sao A+B là phương án đúng

### 1.1 Loại trừ C và D

| Phương án | Lý do KHÔNG đi |
|---|---|
| **C — Odoo Official Partner** | KPI bán 10+ Enterprise users/năm để giữ Ready tier = pivot CASSO thành Odoo consulting firm. Conflict với positioning "Plaid VN". Hire 6 dev Odoo certified không phải DNA team CASSO hiện tại. |
| **D — Standalone ERP (fork Odoo CE)** | Đầu tư lớn, đánh trực diện Misa AMIS (đang dominate SME segment). Mất unfair advantage (API banking) vì tốn resource build cả ERP. 12 tháng không đủ. |

### 1.2 Vì sao A+B match GAINS của anh Điệp

| Gain (đã có trong project) | A | B | A+B |
|---|:---:|:---:|:---:|
| G1 — Fintech infra provider cho ERP VN | ✅ Core | 🟡 Visibility | ✅✅ |
| G4 — Module plug-and-play cho partner | 🟡 | ✅ Core | ✅✅ |
| G5 — Pipeline khách hàng mới | 🟡 | ✅ Channel | ✅✅ |
| Doanh thu recurring | ✅ | 🟡 | ✅ |
| Time-to-revenue Q3 2026 | 🟡 (cần selling) | ✅ (organic) | ✅ |

### 1.3 Insight: Module Marketplace là Marketing channel, không phải business model

Theo Odoo App Store policy: developer được 70% revenue, Odoo lấy 30% commission. Module bán $99-$299/copy. **Nếu mục tiêu là kiếm tiền từ module, ROI cực thấp.** Mục tiêu thật của Track B là:

1. **Marketing & SEO** — apps.odoo.com có 4,000+ partners truy cập hàng ngày
2. **Lead generation** — mỗi cài đặt = 1 lead tiềm năng cho API platform
3. **Validation** — biết tính năng nào có demand thực

Vì vậy modules trên marketplace sẽ ở mức **freemium**: cài miễn phí, gọi API CASSO mới tính tiền.

---

## 2. Two-track Architecture

```
╔══════════════════════════════════════════════════════════════════════╗
║                    CASSO PLATFORM ARCHITECTURE                       ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║   ┌─────────────────────────┐    ┌──────────────────────────────┐   ║
║   │  TRACK A — API LAYER    │    │  TRACK B — MODULE LAYER       │   ║
║   │  (B2B Infrastructure)   │    │  (Marketplace Distribution)   │   ║
║   ├─────────────────────────┤    ├──────────────────────────────┤   ║
║   │ • api.casso.vn          │    │ apps.odoo.com/casso-modules  │   ║
║   │ • Developer Portal      │◄──►│ • casso_bank_sync             │   ║
║   │ • SDK (Python, Node)    │    │ • casso_einvoice              │   ║
║   │ • Sandbox + Pricing     │    │ • casso_tax_report            │   ║
║   │ • Subscription billing  │    │ • casso_payment_gateway       │   ║
║   └────────────┬────────────┘    └──────────────┬───────────────┘   ║
║                │                                 │                   ║
║                ▼                                 ▼                   ║
║   ┌──────────────────────────────────────────────────────────┐      ║
║   │              SHARED CORE — CASSO Banking Engine          │      ║
║   │  Bank connectors (MB, VCB, TPBank, OCB, VietinBank...)   │      ║
║   │  E-invoice providers (VNPT, Viettel, Misa meInvoice)     │      ║
║   │  GDT API, MST lookup, Digital signature (Viettel-CA, …)  │      ║
║   └──────────────────────────────────────────────────────────┘      ║
║                              │                                       ║
║                              ▼                                       ║
║   ┌──────────────────────────────────────────────────────────┐      ║
║   │   Customers using Track A directly: Portcities, Oris,    │      ║
║   │   A1, end-customers on Odoo Enterprise                    │      ║
║   │   Customers using Track B: SME tự cài Odoo CE, partners  │      ║
║   │   nhỏ chưa muốn invest CASSO subscription                 │      ║
║   └──────────────────────────────────────────────────────────┘      ║
╚══════════════════════════════════════════════════════════════════════╝
```

**Nguyên tắc:** Mọi tính năng đều phải đi qua 2 layer. Layer API là canonical, layer module chỉ là wrapper UX cho Odoo.

---

## 3. Module Map — 8 modules × 2 layer

Mỗi module có 2 thành phần: **API endpoint** (Track A) và **Odoo wrapper** (Track B). Code có thể share, nhưng release timeline khác nhau.

| # | Module | API Endpoint (Track A) | Odoo Module (Track B) | Quý ra mắt | Trạng thái hiện tại |
|---|---|---|---|:---:|---|
| **M1** | Bank Statement Sync | `GET /v2/transactions`, webhook | `casso_bank_sync` | Q2 (đã có) | ✅ Sprint 1-2 dev |
| **M2** | X-invoice Inbound (kéo HĐ đầu vào, đầu ra) | `GET /v2/xinvoice/inbound` | `casso_xinvoice_in` | Q2 (đã có) | 🟡 Sprint 1-2 dev |
| **M3** | Customer Auto-lookup | `GET /v2/partner/{mst}` | `casso_partner_mst` | Q2 (đã có) | ✅ Sprint 1 dev |
| **M4** | X-invoice Outbound (phát hành HĐ) | `POST /v2/xinvoice/issue` | `casso_xinvoice_out` | Q3 | 🔵 Chưa start |
| **M5** | Tax Report (VAT, TNDN, BCTC) | `POST /v2/tax-report/generate` | `casso_tax_report` | Q3 | 🔵 F4 trong sprint plan |
| **M6** | Digital Signature (CA) | `POST /v2/sign`, webhook | `casso_digital_sign` | Q3 | 🔵 Chưa start |
| **M7** | Payment Gateway (cổng thanh toán) | `POST /v2/payment/init`, `GET /v2/payment/status` | `casso_payment_gateway` | Q4 | 🔵 Chưa start |
| **M8** | Expense Management (chi tiêu tự động) | `POST /v2/expense/categorize` | `casso_expense_auto` | Q4 | 🔵 Chưa start |

### 3.1 Mapping module ↔ Feature trong Value Prop Canvas hiện có

Để team không bị lẫn lộn giữa F (Feature) và M (Module), bảng chuyển đổi:

| F (cũ — trong 02_value_proposition_caserp.md) | M (mới — module marketplace-ready) | Ghi chú |
|---|---|---|
| F1 Bank sync (CASSO API → Journal) | M1 | Đổi name từ feature → module |
| F2 Phát hành HĐ điện tử | M4 | Tách rõ ra Q3, không phải Q2 |
| F3 Nhận HĐ đầu vào, đầu ra từ thuế | M2 | Sprint 1-2 đang làm |
| F4 Config UI (no-code setup) | (gộp vào mỗi M) | Mỗi module có settings page riêng |
| F5 Báo cáo thuế VAT/TNDN | M5 | F4 trong sprint plan = M5 |
| F6 Tài liệu so sánh Misa vs Odoo | (giữ nguyên doc, không phải module) | |
| F7 Dashboard công nợ & dòng tiền | (gộp vào M1) | |
| F8 Simplify Odoo menu | (gộp vào mỗi M) | |
| F9 Module đóng gói installable | ➡️ trở thành toàn bộ Track B | Promote từ "post-MVP" lên "core strategy" |
| F10 Migrate từ Misa | (giữ nguyên — utility) | One-shot tool, không phải module |
| F11 API marketplace / portal | ➡️ trở thành Track A Q4 | Promote từ "Q4+" lên "Q4 must-have" |

**Key change:** F9 và F11 từ "COULD" trong MoSCoW cũ → trở thành **core strategy**. Đây là điểm anh Điệp cần align.

---

## 4. Roadmap chi tiết 4 quý

### 🟦 Q2/2026 — Foundation (THÁNG 5-6) [TÁI XÁC NHẬN]

> **Không thay đổi gì** so với Sprint Planning hiện có. Chỉ rename F → M để chuẩn bị marketplace từ Q3.

| Sprint | Khung thời gian | Nội dung | Deliverable |
|---|---|---|---|
| **Sprint 1** | 19/05 – 01/06 | Setup webhook CASSO API → Odoo (M1), tích hợp API MST (M3), kéo thử XML HĐ đầu vào (M2) | Chị Mỹ thấy data ngân hàng real-time trong Odoo |
| **Sprint 2** | 02/06 – 15/06 | Auto-matching + Auto-Journal Entry (M1), Vendor Bill mapping (M2), Parallel Run với Misa | Chị Mỹ ấn "Khớp" → Odoo ghi sổ tự động |
| **Sprint 3** | 16/06 – 30/06 | UX polish, unhappy cases, reconciliation, FRS cho M5 (Tax Report) | **30/06 GO-LIVE.** Tắt Misa nội bộ |

**Quan trọng — phải làm trong Q2 để chuẩn bị Q3:**

- [ ] **Code refactor:** Tách logic API call ra `casso_core` (shared library), không nhúng cứng vào module. Mục đích: Q3 có thể tách module ra publish riêng.
- [ ] **Naming convention:** Đặt prefix `casso_*` cho mọi module để chuẩn bị publish.
- [ ] **Module manifest:** Mỗi module phải có đủ `name`, `description`, `screenshots/`, `category` — Odoo App Store yêu cầu.
- [ ] **License:** Quyết định license (Odoo Proprietary License v1.0 hay LGPL). Mặc định nên là **Odoo Proprietary** vì sẽ bán/freemium sau.

### 🟩 Q3/2026 — Stabilize + First Publish (THÁNG 7-9)

**Theme:** Ổn định nội bộ + Public 3 modules đầu tiên trên `apps.odoo.com` + Mở rộng modules.

#### Tháng 7 — Hyper-care + Refactor for Publish
- Hyper-care nội bộ CASERP (response < 4h cho chị Mỹ)
- Bug fix systematic, performance optimization
- **Refactor M1, M2, M3 thành standalone modules** (gỡ dependency cứng vào CASSO internal env)
- Build mock CASSO API mode cho module có thể dùng với API key bên ngoài

#### Tháng 8 — Build M4, M5 + Submit M1 lên marketplace
- Dev M4 — E-invoice Outbound (tích hợp VNPT + Viettel Invoice + Misa meInvoice)
- Dev M5 — Tax Report (tờ khai VAT 01/GTGT, TNDN, BCTC chuẩn TT200)
- **Submit M1 (Bank Sync) lên apps.odoo.com** — module đầu tiên public
- Soạn presentation page (screenshots, video demo, pricing)

#### Tháng 9 — Build M6 + Submit M2, M3 + ROI Case Study
- Dev M6 — Digital Signature (Viettel-CA, VNPT-CA)
- **Submit M2 (E-invoice In) và M3 (MST Lookup) lên marketplace**
- Xuất bản **ROI Case Study v1** từ data CASSO nội bộ (kế toán tiết kiệm bao nhiêu giờ/tháng)
- Initial discussion với Portcities VN (Odoo Gold Partner) về thử API CASSO

**Q3 Deliverables:**
- 3 modules public: `casso_bank_sync`, `casso_einvoice_in`, `casso_partner_mst`
- 3 modules đang dev: M4, M5, M6
- ROI Case Study v1 (PDF)
- 1 outreach call với 1 Odoo VN Partner

**Q3 KPIs:**
- ≥ 50 downloads/install module M1 trên apps.odoo.com
- ≥ 3 ratings (≥ 4 sao trung bình)
- Chị Mỹ vẫn dùng CASERP 100%, không cần quay lại Misa
- ROI Case Study cho thấy ≥ 30% giảm thời gian kế toán

### 🟨 Q4/2026 — API Platform + Commercial Prep (THÁNG 10-12)

**Theme:** Build CASSO Developer Portal (Track A core) + Phát triển M7, M8 + Sales prep.

#### Tháng 10 — Build Developer Portal beta
- **Build `developers.casso.vn`** — Developer Portal (signup, API key, docs, sandbox, usage dashboard)
- SDK Python + Node.js cho 3 API đầu (M1, M2, M3)
- Public **OpenAPI/Swagger spec** đầy đủ
- Internal soft-launch — team CASSO dùng portal nội bộ

#### Tháng 11 — Pitch + Onboard first beta API customers
- Pitch deck cho Odoo VN Partners (Portcities, Oris, A1, có thể cả Viindoo nếu khôn ngoan)
- Mục tiêu: **3-5 LOI (Letter of Intent)** từ partners chấp nhận thử CASSO API beta miễn phí Q1/27
- Dev M7 — Payment Gateway (tích hợp MB Bank QR, VNPay, MoMo)
- Dev M8 — Expense Management (auto categorize từ bank transactions + receipt OCR)

#### Tháng 12 — Pricing model + Legal + Year-end review
- Workshop nội bộ về **pricing model** (3 lựa chọn: pay-per-call, subscription tier, hybrid). Đề xuất hybrid như Plaid.
- Legal framework: T&C, SLA, Data Processing Agreement cho B2B API
- Submit M4, M5, M6 lên apps.odoo.com
- Q4 retrospective + Q1/27 detailed planning
- Internal API platform alpha test với 1-2 partners

**Q4 Deliverables:**
- `developers.casso.vn` beta public
- SDK Python + Node.js
- 6 modules public trên apps.odoo.com (M1-M6)
- M7, M8 đang dev
- 3-5 LOI từ Odoo partners
- Pricing model framework đã decide
- T&C + SLA legal-reviewed

**Q4 KPIs:**
- ≥ 200 downloads tổng các modules trên apps.odoo.com
- ≥ 10 developer accounts trên developers.casso.vn (kể cả internal)
- 3-5 LOI từ external partners
- ≥ 4.0 sao trung bình các modules

### 🟧 Q1/2027 — Launch & Validate (THÁNG 1-3)

**Theme:** Free trial 3-5 customers + Marketing campaign + First paying customers.

#### Tháng 1 — Hire CMO + Marketing campaign launch
- Hire **CMO** (theo plan cũ)
- Soạn marketing materials: case study chính thức, video demo, blog series
- Launch **Free Trial program** cho API (3 tháng free, sau đó subscribe)
- Onboard 3-5 beta customers từ LOI Q4

#### Tháng 2 — Pricing live + First paying customers
- Publish pricing trên `developers.casso.vn`
- Convert 1-2 beta customers thành paying
- Submit M7, M8 lên marketplace (đủ 8 modules)
- Conference/PR: speak tại Odoo Experience hoặc Vietnam Tech meetups

#### Tháng 3 — Validate + Plan Q2/27
- Measure: MRR, churn, NPS từ beta customers
- Sprint feedback từ partners → roadmap Q2/27
- Decision: scale-up team Q2/27 hay không
- Q1 retrospective + Q2/27 detailed planning

**Q1/27 Deliverables:**
- 8 modules public hoàn chỉnh
- ≥ 3 paying API customers
- ≥ 5 trial customers
- CMO onboarded
- Marketing campaign live
- Pricing public

**Q1/27 KPIs:**
- ARR ≥ 100-200 triệu VND (cần align với anh Điệp)
- ≥ 3 paying API customers (mỗi customer ≥ 5 triệu VND/tháng)
- ≥ 500 module downloads total
- NPS ≥ 30 từ beta users
- Churn rate < 10% (sau 3 tháng đầu)

---

## 5. Sprint Backlog Q3 — Chi tiết (refined từ Q2 plan)

### 🏃 Sprint 4: Hyper-care + Refactor (01/07 – 14/07)

**Mục tiêu:** Stabilize CASERP nội bộ + chuẩn bị publish.

| Task | Assignee | Output |
|---|---|---|
| Hyper-care chị Mỹ, bug triage hàng ngày | Dev1+Dev2 | Bug list zero P0 sau 2 tuần |
| Refactor M1 thành standalone module | Dev1 | `casso_bank_sync` cài được trên fresh Odoo CE |
| Build CASSO API mock + sandbox mode | Dev2 | Module dùng được với API key external |
| Soạn module manifest, screenshots, demo video M1 | MinhCQ | Marketplace listing draft |
| ROI baseline measurement | Chị Mỹ + MinhCQ | Hours saved/tuần, error rate |

### 🏃 Sprint 5: M4 E-invoice Out + Refactor M2, M3 (15/07 – 28/07)

| Task | Assignee | Output |
|---|---|---|
| Dev M4 — E-invoice Outbound | Dev2 | Phát hành HĐ từ Odoo qua VNPT/Viettel |
| Refactor M2, M3 thành standalone | Dev1 | `casso_einvoice_in`, `casso_partner_mst` |
| FRS cho M5 Tax Report | MinhCQ + Chị Mỹ | FRS Tax Report duyệt |
| Marketing prep cho M1 launch | MinhCQ | Blog post, social media draft |

### 🏃 Sprint 6: M5 Tax Report + Submit M1 (29/07 – 11/08)

| Task | Assignee | Output |
|---|---|---|
| Dev M5 — VAT/TNDN report generator | Dev1+Dev2 | Module xuất tờ khai XML chuẩn |
| **Submit `casso_bank_sync` lên apps.odoo.com** | MinhCQ | Module pending review |
| Soạn Help Center articles cho M1 | MinhCQ | Doc site mini |

### 🏃 Sprint 7: M6 Digital Sign + Submit M2 (12/08 – 25/08)

| Task | Assignee | Output |
|---|---|---|
| Dev M6 — Digital Signature integration | Dev2 | Sign workflow end-to-end |
| **Submit `casso_einvoice_in` lên apps.odoo.com** | MinhCQ | Module thứ 2 published |
| QA M5 trên data thật từ chị Mỹ | Chị Mỹ + Dev1 | Tax report khớp Misa |

### 🏃 Sprint 8: Polish + ROI Case Study (26/08 – 08/09)

| Task | Assignee | Output |
|---|---|---|
| Polish M4, M5, M6 (chuẩn bị submit Q4) | Dev1+Dev2 | 3 modules ready for marketplace |
| **Submit `casso_partner_mst` lên apps.odoo.com** | MinhCQ | Module thứ 3 published |
| Soạn ROI Case Study v1 (PDF) | MinhCQ + Chị Mỹ | Case study public |
| Outreach: contact 3 Odoo Partners VN | MinhCQ | 3 calls đặt được |

### 🏃 Sprint 9: Sprint Review Q3 + Plan Q4 (09/09 – 22/09)

| Task | Assignee | Output |
|---|---|---|
| Q3 retrospective | All | Lessons learned |
| Q4 detailed sprint plan | MinhCQ | Sprint 10-15 backlog |
| Initial pitch deck for Odoo Partners | MinhCQ | Deck v0.1 |
| Decision review với anh Điệp | MinhCQ + anh Điệp | Q4 approved |

> **Sprint 10-15 (Q4)** sẽ được detail sau Q3 retrospective. Outline trong section 4 (Q4 monthly plan).

---

## 6. KPIs Master Sheet (theo quý)

| KPI | Q2/26 | Q3/26 | Q4/26 | Q1/27 |
|---|:---:|:---:|:---:|:---:|
| **Internal adoption** | | | | |
| Chị Mỹ dùng CASERP (% workflow) | 100% by 30/6 | 100% | 100% | 100% |
| Hours saved/tuần (vs Misa) | baseline | ≥ 5h | ≥ 8h | ≥ 10h |
| **Track B — Marketplace** | | | | |
| Modules published | 0 | 3 | 6 | 8 |
| Total downloads | 0 | 50 | 200 | 500 |
| Avg rating | — | 4.0 | 4.0 | 4.2 |
| **Track A — API Platform** | | | | |
| Developer Portal status | — | — | Beta | Live |
| Developer accounts | 0 | 0 | 10 | 30 |
| Beta API customers | 0 | 0 | 1-2 | 5 |
| Paying API customers | 0 | 0 | 0 | 3 |
| **Business** | | | | |
| LOI signed | — | — | 3-5 | 5+ |
| ARR (triệu VND) | 0 | 0 | 0 | 100-200 |
| ROI Case Study published | — | v1 | v2 | v3 |

---

## 7. Resource Plan (refine từ CASSO_ERP_Plan slide 10)

| Role | Q2/26 | Q3/26 | Q4/26 | Q1/27 |
|---|---|---|---|---|
| PM (Minh) | 30-40h/tuần | 30-35h/tuần | 30-35h/tuần | 30-40h/tuần |
| Lead Dev / Solutions Architect | 30h/tuần | 25-30h/tuần | 25-30h/tuần | 25-30h/tuần |
| Developer (2 → 3 người) | 2 dev × 40h | 2 dev × 35h | **3 dev × 35h** | 3 dev × 35h |
| BA / QA | 15-20h/tuần | 15-20h/tuần | 20-25h/tuần | 25-30h/tuần |
| Chị Mỹ (Kế toán Champion) | 10h/tuần | 5-8h/tuần | 5h/tuần | 5h/tuần |
| Sales / BD | — | — | **10-15h/tuần** | 20-25h/tuần |
| **CMO / Marketing** | — | — | — | **Hire T1/27** ⚠️ sớm hơn plan cũ 1 tháng |
| Backend Dev (cho API Portal) | — | — | **+1 hire T10/26** | 1 dev × 35h |

### Hires cần align với anh Điệp

1. **Backend dev cho API Portal — Q4** (cần 1 người chuyên build developer experience, OAuth, billing, không phải Odoo dev)
2. **Sales/BD — T10/26** (sớm hơn để pitch LOI Q4)
3. **CMO — T1/27** (sớm hơn plan cũ vì cần marketing campaign cho free trial launch)

---

## 8. Open Decisions & Risks

### 8.1 Decisions cần align với anh Điệp trong tháng 5-6

| # | Decision | Deadline | Owner |
|---|---|---|---|
| D1 | Confirm phương án A+B (vs A standalone hoặc A+C) | T5 tuần 4 | Anh Điệp |
| D2 | Approve refactor codebase Q2 để ready cho marketplace | T5 tuần 4 | Anh Điệp + Dev Lead |
| D3 | Module license: Odoo Proprietary v1.0 hay LGPL? | T6 tuần 2 | Anh Điệp + Legal |
| D4 | Approve hire Backend dev cho API Portal (Q4) | T9 | Anh Điệp |
| D5 | Approve hire Sales/BD T10/26 + CMO T1/27 (sớm hơn plan cũ) | T8 | Anh Điệp |
| D6 | Budget cho `developers.casso.vn` infra (Q4) | T8 | Anh Điệp |
| D7 | Pricing model framework (pay-per-call vs subscription vs hybrid) | T11 | Anh Điệp + MinhCQ |

### 8.2 Risks (top 5)

| # | Risk | Mức độ | Mitigation |
|---|---|:---:|---|
| R1 | Module trên apps.odoo.com bị reject vì không đạt presentation standard | ⭐⭐⭐ | Soạn presentation page kỹ trước submit; tham khảo Portcities, Viindoo |
| R2 | Viindoo từ chối cộng tác, thậm chí block CASSO API trong fork của họ | ⭐⭐⭐⭐ | Q3: outreach Portcities/Oris trước, không phụ thuộc Viindoo |
| R3 | Misa launch open-banking miễn phí trong 2026 → đánh moat CASSO | ⭐⭐⭐⭐⭐ | Monitor Misa quarterly; build switching cost qua API depth + 24/7 support |
| R4 | Team không đủ skill build developer portal (OAuth, billing, rate limit) | ⭐⭐⭐⭐ | Hire backend dev T10/26; consider Stripe Connect/Auth0 thay vì self-build |
| R5 | Anh Điệp đổi ý sang phương án D (standalone ERP) giữa Q3/Q4 | ⭐⭐⭐ | Có ROI Case Study + LOI để show traction concrete |

---

## 9. Mapping với artifacts hiện có trong project

| File project | Cập nhật cần làm |
|---|---|
| `CASSO_ERP_Plan_for_Anh_Diep.pdf` slide "Decision Points" | Bổ sung D1-D7 ở section 8.1 |
| `CASSO_ERP_Plan_for_Anh_Diep.pdf` Q3 page "Viindoo Partnership Decision" | Cập nhật: KHÔNG đi Viindoo Partner — đi A+B model |
| `01_customer_underserved_caserp.md` GAINS table anh Điệp | Mark G4 (module plug-and-play) và G5 (pipeline khách hàng) lên ⭐⭐⭐⭐⭐ |
| `02_value_proposition_caserp.md` Feature Mapping | Rename F → M; promote F9, F11 từ COULD lên MUST cho Q3+ |
| `03_caserp_sprint_kanban.html` | Bổ sung Sprint 4-9 (Q3) backlog |
| `CASERP_Sprint_Planning.md` (Q2) | KHÔNG đổi — vẫn đúng cho Q2 |

---

## 10. Visualizing the path

```
T5     T6     T7     T8     T9    T10    T11    T12    T1/27   T2/27   T3/27
 │      │      │      │      │      │      │      │      │       │       │
 ●──────●──────●──────●──────●──────●──────●──────●──────●───────●───────●
 │ Q2 Foundation│ Q3 Stabilize+    │ Q4 Platform+   │ Q1/27 Launch &      │
 │              │   First Publish  │   Commercial   │       Validate      │
 │              │                  │                │                     │
 │ M1, M2, M3   │ Submit M1, M2, M3│ Dev Portal beta│ Free trial launch   │
 │ dev          │ Dev M4, M5, M6   │ Dev M7, M8     │ First paying        │
 │ Go-live 30/6 │ ROI Case Study v1│ 3-5 LOI signed │ ARR 100-200M VND    │
 │              │                  │                │                     │
 └──TRACK A: ────────────────────────►●─────────────►●────────────────────►
    setup base                       Portal beta     Portal live
                                                      
 └──TRACK B: ────────────────►●──────────────►●──────────────►●───────────►
              First publish    3 modules live   6 modules     8 modules
```

---

## 11. Next steps ngay tuần này (tuần 4 tháng 5)

1. **Share roadmap này với anh Điệp** — book 60 phút meeting tuần này
2. **Confirm D1, D2** (phương án A+B + refactor codebase)
3. **Dev team kick-off:** Refactor naming `casso_*` trong Sprint 1-3 hiện tại
4. **MinhCQ chuẩn bị buổi User Research GAINS** với anh Điệp (đã có framework ở document trước)
5. **Update artifacts:** Apply mapping ở section 9

---

*Cuối file. Tài liệu này sẽ được review sau mỗi sprint và update mỗi 4 tuần.*
*Lần cập nhật cuối: 18/5/2026 — MinhCQ*
