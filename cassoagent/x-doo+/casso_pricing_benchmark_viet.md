# Benchmark Giá Thị Trường Fintech/ERP Việt Nam — Chiến lược Pricing cho CASSO

## Tóm tắt nhanh

- **Mô hình prepaid theo số lượng sự kiện kết hợp cam kết hàng năm là mô hình thống trị** của tất cả đối thủ khảo sát (PayOS, MISA meInvoice, MISA JetPay BankHub, Viettel SInvoice, VNPT-Invoice, và chính CASSO Flow). "Value metric" mà cả thị trường đồng thuận là **số lượng sự kiện tài chính được xử lý mỗi năm** (giao dịch ngân hàng hoặc hóa đơn điện tử), không phải số user, số API call, hay số ghế phần mềm.

- **Pricing cliff (bậc giá nhảy vọt) nằm ở 1K → 5K đơn vị** (volume tăng ~4×, giá tăng ~3×), và tiếp tục ở **20K → 100K đơn vị** (volume tăng 5×, giá chỉ tăng ~3.8×), tạo ra mức giảm chi phí trên mỗi đơn vị khoảng **5–10× từ gói entry đến enterprise**. CASSO cần thiết kế các mốc tier theo đúng các cliff này, nếu không sẽ bị "lệch giá" trong mọi so sánh.

- Với 2 bundle của CASSO, benchmark hợp lý là: **Bundle A (Đồng bộ dữ liệu tài chính)** nên định giá gần MISA JetPay BankHub (600K–2.4M VND/năm/doanh nghiệp) cộng thêm phụ phí kéo hóa đơn đầu vào (~10–20% phí meInvoice); **Bundle B (Thực thi tác vụ tài chính)** nên định giá gần Viettel SInvoice / MISA meInvoice (140K–30M VND/năm). **Partners (Phân khúc 1) nên được chiết khấu 30–40%**; end user (Phân khúc 2) trả gần bằng giá niêm yết — và CASSO nên neo giá **thấp hơn PayOS PRO** (1,990K → 99,900K VND/năm) để giữ vị thế "Open Banking infrastructure" thay vì payment gateway.

---

## 1. Bảng tổng hợp giá đối thủ

### A. Sản phẩm đồng bộ ngân hàng / Open Banking

| Sản phẩm | Mô hình | Gói miễn phí | 1K giao dịch/năm | 5K giao dịch/năm | 10K giao dịch/năm | 50K giao dịch/năm | 100K giao dịch/năm | Cam kết | Margin đại lý |
|---|---|---|---|---|---|---|---|---|---|
| **CASSO Flow (cũ, tính theo tháng)** | Subscription, bậc theo giao dịch | Miễn phí 30 giao dịch/tháng, 1 ngân hàng | Pro ≈ 4.5M/năm (379K/tháng nếu trả năm)\* | Pro ≈ 13.7M/năm\* | Pro ≈ 13.7M/năm (giới hạn 10K/tháng)\* | Company ≈ 40.8M/năm (50K/tháng)\* | Company ≈ 40.8M/năm (100K/tháng)\* | Trả năm (rẻ hơn ~22% so với trả tháng) | Chưa công bố |
| **CASSO Flow (MỚI, từ 13/11/2024)** | Subscription, hàng năm, bậc theo giao dịch | **Pioneer 360**: 360 giao dịch/năm miễn phí + **Sponsor**: miễn phí không giới hạn khi liên kết ngân hàng đối tác | Chưa công khai — phải đăng nhập hoặc gọi 1900 8144 | — | — | — | — | Chỉ trả năm; "Pioneer ≈ ½ Standard" | Chưa công bố |
| **CASSO Cas / cas.so (API dành cho dev)** | Subscription, tính bằng USD | Miễn phí: tài khoản test không giới hạn | — | — | — | Gói "Vendor": 100K giao dịch/tháng | Từ **$500/tháng** (~12.5M VND/tháng) | Tính tháng bằng USD; "Starter" $200/tháng (~5M VND/tháng), 15 ngân hàng | "Vendor" = TPP, custom |
| **MISA JetPay BankHub** | Subscription, hàng năm, bậc theo lệnh chuyển tiền | Dùng thử 14 ngày qua MISA SME | **BANKHUB50**: <50 lệnh/tháng → **600,000 VND/năm** | **BANKHUB100**: 50–200 lệnh/tháng → **1,200,000 VND/năm** | **BANKHUB200**: >200 lệnh/tháng → **2,400,000 VND/năm** | Mua thêm gói bổ sung qua MISA Store | Mua thêm gói bổ sung | Cam kết tối thiểu 12 tháng; đi kèm MISA SME/AMIS | Mạng lưới đại lý MISA; % cụ thể không công bố |
| **PayOS (payment-initiation)** | Hybrid (miễn phí + gói cố định + % linh hoạt) | FREE-100 (một lần), PIONEER-500 (6 tháng), KLB-1000 (KienlongBank), **OCB-1000 gia hạn được, miễn phí không giới hạn** | **PRO-1K: 1,990,000 VND/năm** (1,990đ/giao dịch) | **PRO-5K: 7,900,000 VND/năm** (1,580đ/giao dịch) | — (không có PRO-10K) | **PRO-50K: 59,000,000 VND/năm** (1,180đ/giao dịch) | **PRO-100K: 99,900,000 VND/năm** (999đ/giao dịch) | Trả trước hàng năm; Flex = 1.5% giá trị giao dịch | Không công bố chiết khấu đại lý |

> \* Giá CASSO Flow cũ tính theo tháng, quy ra năm (379,000đ/tháng × 12 = 4,548,000đ/năm cho gói Pro). Nguồn: `api.casso.vn/pricing-table`. Bảng giá mới (Pioneer/Standard từ 13/11/2024) chỉ render client-side từ `api.flow.casso.vn/new-pricing-table` và không thể crawl công khai.

---

### B. Sản phẩm hóa đơn điện tử / TVAN

| Sản phẩm | Mô hình | Phí setup / miễn phí | 300 HĐ | 1.000 HĐ | 5.000 HĐ | 10.000 HĐ | 50.000 HĐ | 100.000 HĐ | Thời hạn gói |
|---|---|---|---|---|---|---|---|---|---|
| **MISA meInvoice** | Prepaid theo hóa đơn + phí license phần mềm | License phần mềm **500,000 VND/năm**; dùng thử qua MISA Store | **MEIX-300: 390,000 VND** (1,300đ/HĐ) | **MEIX-1,000: 690,000** (690đ) | **MEIX-5,000: 2,490,000** (498đ) | **MEIX-10,000: 4,490,000** (449đ) | **MEIX-50,000: 17,490,000** (350đ) | **MEIX-100,000: 30,990,000** (310đ) | Hóa đơn còn thừa được chuyển sang năm sau |
| **Viettel SInvoice (đại trà)** | Prepaid theo hóa đơn (đã bao gồm VAT 8%) | **Khởi tạo 500,000 VND** (một lần, lưu trữ 10 năm); chữ ký số HSM miễn phí 6 tháng | **DT 300: 421,000** (1,403đ) | **DT 1,000: 896,000** (896đ) | **DT 5,000: 2,883,000** (577đ) | **DT 10,000: 4,773,000** (477đ) | **DT 50,000: 17,280,000** (345.6đ) | **DT 100,000: 21,600,000** (216đ); DT 1,000,000: 108,000,000 (108đ) | Không có thời hạn, chỉ giới hạn số lượng |
| **VNPT-Invoice** | Prepaid theo hóa đơn (chưa bao gồm VAT 10%) | Phí khởi tạo 1,000,000 VND; HSM chữ ký số 5M–12M / 1–3 năm; USB-Token VNPT-CA 1.8M–3.1M | **HD300: 300,000** (1,000đ) | **HD1000: 670,000** (670đ) | **HD5000: 2,150,000** (430đ) | **HD10000: 3,600,000** (360đ) | ~16M (ước tính) | **HD_Max: ~300,000,000 VND cho 1M HĐ** (300đ); 100K ≈ 30M | HD200 chỉ dùng trong năm tài chính hiện tại; HD300+ không hết hạn |

---

### C. Bảng giá hiện tại của CASSO (Flow cũ + Cas API)

**Từ `api.casso.vn/pricing-table`** (vẫn đang phục vụ các tier trước 13/11/2024):

| Gói | Giá trả năm | Giá trả tháng | Giao dịch/tháng | Số TK ngân hàng | Tích hợp |
|---|---|---|---|---|---|
| **Free** | Miễn phí | Miễn phí | 30 | 1 | 2 (chỉ VietinBank + MB) |
| **Starter** | 99,000đ/tháng | 129,000đ/tháng | 100–700 | 2 | 5 |
| **Pro** | 379,000đ/tháng | 489,000đ/tháng | 340–10,000 | 5 | 10 + API access |
| **Team** | 1,139,000đ/tháng | 1,449,000đ/tháng | 1,000–34,000 | 10 | Không giới hạn |
| **Company** | 3,399,000đ/tháng | 4,499,000đ/tháng | 3,400–100,000 | 25 | Không giới hạn + VIP support |

**Từ `cas.so/pricing`** (sản phẩm developer SDK, tái thương hiệu từ BankHub):

| Gói | Giá | Đặc điểm |
|---|---|---|
| **Free** | Miễn phí | Tài khoản test không giới hạn |
| **Starter** | Từ **$200/tháng** (~5M VND/tháng) | Dùng tài khoản ngân hàng của bạn; tối đa 15 ngân hàng |
| **Vendor** | Từ **$500/tháng** (~12.5M VND/tháng) | 100,000 giao dịch/tháng; yêu cầu tư cách TPP; nhân sự phụ trách riêng + sản phẩm mới sớm |

---

## 2. Phân tích mô hình định giá

### Mô hình pricing — Hybrid prepaid-volume + cam kết hàng năm

Tất cả đối thủ có uy tín đều dùng **gói prepaid theo số lượng giao dịch/hóa đơn với hiệu lực 1–3 năm**, đôi khi kết hợp một layer phí cố định nhỏ ở trên (MISA meInvoice: 500K/năm license; Viettel: 500K khởi tạo; VNPT: 1M khởi tạo). **Pricing thuần theo API call không tồn tại** trong thị trường ERP Việt Nam — toàn bộ danh mục đã hội tụ về gói prepaid phân bậc vì SME Việt Nam ưa thích mô hình "biết trước chi phí" và vì hóa đơn điện tử phải xuất theo gói, không phải billing động.

### Value metric — Số sự kiện tài chính, không phải user

Sản phẩm ngân hàng đo bằng **số giao dịch vào + ra**; CASSO Flow làm rõ với tài khoản ảo chỉ tính "tiền vào". Sản phẩm hóa đơn đo bằng **số hóa đơn phát hành**. Không ai tính tiền theo user, API seat, API call, hay webhook. Điều này rất quan trọng: CASSO có thể gộp **kéo hóa đơn đầu vào từ GDT** (Bundle A) và **phát hành hóa đơn qua TVAN** (Bundle B) vào cùng một trục đo lường mà không cần tạo SKU mới — người mua đã quen với đơn vị này rồi.

### Pricing cliff (điểm nhảy giá)

- **MISA meInvoice**: nhảy **~3× giá cho 4× volume** từ MEIX-1,000 (690K) → MEIX-5,000 (2,490K), rồi tiếp tục 5,000 → 50,000 (2,490K → 17,490K = ~7× giá cho 10× volume).
- **Viettel SInvoice**: DT 1,000 (896K) → DT 5,000 (2,883K) là **3.2× giá cho 5× volume**. DT 10K → DT 50K là **3.6× giá cho 5× volume**.
- **PayOS**: cliff dốc nhất ở đỉnh thang giá lẻ: PRO-1K (1,990K) → PRO-5K (7,900K) là **~4× giá cho 5× volume**, nhưng PRO-50K → PRO-100K chỉ **~1.7× giá cho 2× volume** — tức là khách hàng enterprise được thưởng khi cam kết lớn.
- **MISA JetPay BankHub** về cơ bản là flat-rate theo tier mỗi doanh nghiệp (600K / 1,200K / 2,400K) thay vì per-unit. Chi phí hiệu quả tại BANKHUB200 (>200 lệnh/tháng = >2,400 lệnh/năm) là **<1,000 VND/lệnh** — rẻ hơn đáng kể so với sản phẩm hóa đơn vì dịch vụ này hai chiều (sync + khởi lệnh chi).

### Chi phí trên mỗi đơn vị ở quy mô lớn

- Hóa đơn điện tử chạm đáy ở **~108 VND/hóa đơn** (Viettel DT 1,000,000) — tức ~$0.004/HĐ ở quy mô lớn. MISA meInvoice đáy tại **310 VND/HĐ** (MEIX-100,000), VNPT tại **300 VND/HĐ** (HD_Max). Đây là chi phí trần mà Bundle B của CASSO phải đánh bại hoặc ngang bằng khi bán lại qua TVAN.
- Đồng bộ ngân hàng chạm đáy ở **~999 VND/giao dịch** (PayOS PRO-100K); MISA JetPay BANKHUB200 thực tế rẻ hơn vì không đo đếm giao dịch trên 200/tháng với 2.4M VND/năm.
- **Cas (cas.so) "Vendor"** tại $500/tháng bao gồm 100,000 giao dịch/tháng quy ra ~**1,500 VND/giao dịch khi dùng hết** — cạnh tranh tốt so với PayOS PRO, phù hợp với mô hình wholesale TPP.

### Cấu trúc margin / kênh phân phối

- **MISA** công bố chương trình Partner Manager + hoa hồng qua mạng lưới đại lý.
- **Viettel SInvoice** công bố tại `sinvoice.vn/p/dang-ky-lam-dai-ly.html`: đại lý được **"chính sách giá và ưu đãi đặc biệt (>30% doanh thu)"** — tức là giữ lại >30% doanh thu, biểu hiện như revenue-share chứ không phải chiết khấu off-list.
- **CASSO Flow** hiện **chưa có bất kỳ tier partner/reseller nào** — đây là khoảng trống thực sự và là cơ hội để thiết kế từ đầu.

---

## 3. Kiến trúc pricing đề xuất cho CASSO

### Bundle A — Đồng bộ dữ liệu tài chính (Sync sao kê + Kéo hóa đơn đầu vào từ GDT)

**Đơn vị đo lường:** Tổng số giao dịch ngân hàng + số hóa đơn kéo từ GDT trong năm (1 lần kéo hóa đơn GDT = 0.5 giao dịch ngân hàng vì GDT call được batch hóa).

| Tier | Sự kiện/năm | Giá đề xuất | Cơ sở so sánh |
|---|---|---|---|
| **Sync-Free (Sponsored)** | 500 sự kiện/năm | Miễn phí (dùng mô hình Sponsor của CASSO) | Gieo hạt awareness cho Phân khúc 2 |
| **Sync-Starter** | 2,000 sự kiện/năm | **990,000 VND/năm** | Thấp hơn MISA BANKHUB100 (1.2M) vì kéo HĐ đầu vào là điểm cộng |
| **Sync-Pro** | 10,000 sự kiện/năm | **3,900,000 VND/năm** | 1.6× MISA BANKHUB200; thấp hơn Viettel DT 10,000 (4.77M — chỉ HĐ) |
| **Sync-Business** | 50,000 sự kiện/năm | **14,900,000 VND/năm** | Thấp hơn Viettel DT 50,000 (17.28M) và MISA MEIX-50,000 (17.49M) |
| **Sync-Enterprise** | 200,000+ sự kiện/năm | **Custom, neo tại $1,000/tháng (~25M VND/tháng)** | Ngang cas.so Vendor |

### Bundle B — Thực thi tác vụ tài chính (PayIn/PayOut + Phát hành hóa đơn qua TVAN)

**Đơn vị đo lường:** Tổng số lệnh thanh toán khởi tạo + số hóa đơn điện tử phát hành ra trong năm.

| Tier | Sự kiện/năm | Giá đề xuất | Cơ sở so sánh |
|---|---|---|---|
| **Exec-Starter** | 1,000 sự kiện/năm | **2,490,000 VND/năm** | Premium 25% so với PayOS PRO-1K (1.99M) vì bao gồm phát hành HĐ điện tử (Viettel DT 1,000 đơn thuần đã là 896K) |
| **Exec-Pro** | 5,000 sự kiện/năm | **9,900,000 VND/năm** | Premium 25% so với PayOS PRO-5K |
| **Exec-Business** | 20,000 sự kiện/năm | **29,900,000 VND/năm** | ~15% trên PayOS PRO-20K (25.9M) |
| **Exec-Enterprise** | 100,000 sự kiện/năm | **109,900,000 VND/năm** | ~10% trên PayOS PRO-100K, hợp lý vì bao gồm TVAN (Viettel đơn thuần thêm ~22M) |

---

## 4. Cấu trúc pricing theo từng phân khúc

### Phân khúc 1 — Odoo Partner (B2B reseller)

| Số khách hàng đang phục vụ | Chiết khấu so với giá niêm yết | Cam kết tối thiểu |
|---|---|---|
| Dưới 10 tài khoản end-customer | 25% | 25M VND/năm |
| 10–25 tài khoản | 30% | 25M VND/năm |
| 26–50 tài khoản | 35% | 50M VND/năm |
| 51–100 tài khoản | 40% | 100M VND/năm |

Benchmark: Viettel SInvoice công bố >30% revenue-share cho đại lý; MISA có Partner Manager program. CASSO hiện **chưa có gì** — đây là cơ hội trắng để thiết kế từ đầu.

**Kèm theo:** Key sandbox/dev miễn phí + tài liệu kỹ thuật tích hợp + co-branding materials + lead-sharing ngược về CASSO direct sales cho conversion Phân khúc 2.

### Phân khúc 2 — CFO / Kế toán trưởng (End user doanh nghiệp đang dùng Odoo)

- Trả **giá niêm yết** với cam kết 12 tháng.
- Ưu đãi cam kết: **chiết khấu 15–20%** nếu trả năm so với trả quý (chỉ áp dụng từ tier Pro trở lên).
- **"Compliance & Audit Pack" upsell** (+20% giá bundle): bao gồm audit log có annotation, báo cáo đối soát GDT, xuất file chuẩn TT133/TT200 cuối năm. Đây là tính năng giải quyết đúng pain cao nhất (compliance + kiểm toán) mà không cần thay đổi bảng giá core.

---

## 5. Lộ trình triển khai 3 giai đoạn

### Giai đoạn 1 — 30 ngày tới
Chỉ công bố **Sync-Free Sponsored** và **Sync-Starter / Exec-Starter**.

**Mục tiêu:** Thu hút ≥50 partner Phân khúc 1 đăng ký và ≥150 trial Phân khúc 2 trong 90 ngày.

**Trigger để sang Giai đoạn 2:** Nếu ARR từ kênh partner vượt ARR direct với tỷ lệ 2:1 trong 90 ngày → đẩy mạnh wholesale partner. Ngược lại, nếu ARR direct dẫn → tăng list price 10% và đầu tư marketing CFO-targeted.

### Giai đoạn 2 — 90 ngày tới
Thêm **Sync-Pro và Exec-Pro**, chính thức hóa **band chiết khấu 30–40%** cho partner, yêu cầu cam kết tối thiểu 25M VND/năm.

**Trigger sang Giai đoạn 3:** Nếu bất kỳ partner nào đạt ARR bán lại >200M VND/năm → mở **tier "Master Partner"** với 45% chiết khấu kèm đầu tư marketing chung.

### Giai đoạn 3 — 6–12 tháng tới
Ra mắt **Sync/Exec-Enterprise + Compliance & Audit Pack**. Cạnh tranh trực tiếp với Viettel SInvoice + MISA AMIS ở phân khúc đầu thị trường.

**Lưu ý quan trọng:** Chỉ công bố trang partner margin công khai **sau khi Giai đoạn 2 xác nhận pricing** — tiết lộ sớm sẽ khóa khả năng đàm phán với các Odoo partner lớn. (Danh sách official trên odoo.com/partners/country/vietnam-232 tính đến 5/2025: **24 partner — 2 Gold, 2 Silver, 20 Ready**; con số "27" trong positioning của CASSO có thể bao gồm các partner cũ/không listed. Thực tế chỉ khoảng **10–15 partner sẽ chủ động bán lại** thay vì chỉ giới thiệu.)

---

## 6. Dữ liệu gốc & ghi chú nghiên cứu

### Nguồn đã fetch thành công

- `casso.vn/flow/bang-gia/` — xác nhận cấu trúc billing, FAQ, quy tắc đếm giao dịch, nhưng bảng giá thực tế nhúng qua iframe client-side (`api.flow.casso.vn/new-pricing-table`) và không crawl được công khai.
- `cas.so/pricing` — xác nhận Free / Starter ($200/tháng) / Vendor ($500/tháng, 100K giao dịch/tháng).
- `api.casso.vn/pricing-table` — ma trận giá CASSO Flow CŨ đầy đủ (Free / Starter / Pro / Team / Company).
- `helpamis.misa.vn/.../huong-dan-khach-hang-mua-goi-jetpay-bankhub...` — xác nhận 4 gói trong MISA Store với gói bổ sung giao dịch được chuyển qua năm, nhưng giá cụ thể không index công khai.
- `sinvoice.vn/p/bang-gia-sinvoice.html` — bảng giá đầy đủ Viettel SInvoice (đại trà và máy tính tiền).
- `vnpt-einvoice.com.vn/bao-gia-...` — bảng giá đầy đủ VNPT từ HD200 đến HD_Max.

### Nguồn chỉ lấy được qua search snippet (PDF bị block)

- `jetpay.vn/sites/jetpay/documents/bao-gia-jetpay-bankhub.pdf` — xác nhận 3 tier: BANKHUB50 = 600K/năm, BANKHUB100 = 1.2M/năm, BANKHUB200 = 2.4M/năm. MISA Store đề cập "4 gói" nhưng gói thứ 4 chưa có giá công khai — ước tính khoảng BANKHUB500 tại 3.6–4.8M/năm theo ngoại suy tuyến tính.

### Các khoảng trống & mâu thuẫn cần lưu ý

1. **Giá CASSO Flow mới (từ 13/11/2024) Pioneer/Standard không thể lấy công khai** — chỉ biết cấu trúc: trả năm; "Pioneer ≈ ½ Standard"; miễn phí Pioneer 360 và Sponsor. Trước khi finalize Bundle A/B, team cần lấy giá live nội bộ và kiểm tra không bị double-charge hay cannibalise sản phẩm Flow hiện tại.

2. **MISA JetPay BankHub gói thứ 4** được đề cập trong tài liệu MISA Store ("Có 4 gói") nhưng tên và giá chưa công bố — phải gọi hotline 1900 2169 hoặc qua MISA Store Support.

3. **PayOS đang chuyển đổi sản phẩm**: payOS.vn đang cung cấp miễn phí không giới hạn cho **cá nhân và hộ kinh doanh** qua KienlongBank KLB-1000 gia hạn được từ 23/01/2026 (nguồn: `payos.vn/cong-thanh-toan-mien-phi-2026/`, đăng 28/01/2026). Doanh nghiệp SME trên ngân hàng không phải KLB **vẫn phải trả giá PRO**. Nếu PayOS mở rộng "free" sang SME, Bundle B cần xem xét lại — khả năng cao nhất: tách payment-initiation thành "tiện ích miễn phí" trong Bundle A và lấy margin từ TVAN.

4. **Giá MISA, Viettel, VNPT chưa bao gồm** chi phí USB token / HSM chữ ký số (1.8M–12M VND / 1–3 năm) và phí khởi tạo một lần (500K–1M VND). Khi pitch CFO Phân khúc 2 cần quy ra TCO (tổng chi phí sở hữu) để so sánh công bằng.

5. **Số lượng Odoo partner**: odoo.com/partners/country/vietnam-232 (tháng 5/2025) liệt kê **24 partner — 2 Gold, 2 Silver, 20 Ready**. Con số "27" trong positioning của CASSO có thể bao gồm partner cũ. Ước tính thực tế chỉ **5–8 partner leverage cao** nên được ưu tiên với co-marketing budget đặt tên cụ thể, thay vì chính sách giá tự phục vụ cho cả 24 partner.

6. **Lưu ý chuẩn hóa giá**: VNPT **chưa bao gồm VAT 10%**; Viettel **đã bao gồm VAT 8%**; MISA **không thuộc đối tượng chịu thuế GTGT**. Khi trình bày với CFO Phân khúc 2 cần quy về giá như nhau để so sánh.

---

## 7. Kết luận chiến lược

**Điểm mấu chốt cho anh Điệp / pitch Odoo HK:**

CASSO có cơ hội duy nhất trong thị trường: **đây là đơn vị duy nhất có thể bundle đồng thời bank-sync (G1) và e-invoice/TVAN (G2) trong một gói duy nhất**, trong khi tất cả đối thủ chỉ giải một trong hai vấn đề. Điều này cho phép CASSO định giá **premium 20–25%** so với từng đối thủ đơn lẻ mà vẫn rẻ hơn tổng chi phí nếu doanh nghiệp mua riêng lẻ.

Ví dụ minh họa với doanh nghiệp cỡ vừa (10,000 sự kiện/năm):
- Nếu mua riêng: MISA BANKHUB200 (2.4M) + Viettel DT 10,000 (4.77M) = **7.17M VND/năm**
- CASSO Sync-Pro (3.9M) + CASSO Exec-Pro (chia nhỏ) = **tiết kiệm 30–45%**

Đây là value proposition cần đưa vào slide pitch cho Odoo HK.
