# X-Sign: Go-to-Market Research & Revenue Projection
### Theo Product Life Cycle — Trình bày CEO

---

## PHẦN 1: XÁC ĐỊNH QUY MÔ THỊ TRƯỜNG (Market Sizing)

### Bước 1: Xác định tổng dung lượng thị trường (TAM - Total Addressable Market)

**Thị trường mục tiêu:** Doanh nghiệp Việt Nam có nhu cầu ký kết hợp đồng lao động theo Nghị định 337.

| Chỉ số | Con số | Nguồn |
|---|---|---|
| Tổng doanh nghiệp VN hoạt động | ~900.000 | GSO 2025 |
| Doanh nghiệp có nhu cầu eContract (ND 337) | ~800.000 | NEAC Sep/2025 |
| Chứng thư số đã cấp đến T9/2025 | 23.500.000 | NEAC Sep/2025 |
| Tỷ lệ tăng trưởng toàn cầu ngành ký số | 39,2%/năm | MarketsandMarkets |

> **TAM (Thị trường Tiếp Cận Tổng):** 800.000 doanh nghiệp.

---

### Bước 2: Xác định thị trường có thể phục vụ (SAM & SOM)

X-sign không thể phục vụ toàn bộ 800.000 doanh nghiệp ngay lập tức. Cần chia nhỏ theo lợi thế hiện có.

| Tầng | Định nghĩa | Số lượng | Logic |
|---|---|---|---|
| **TAM** | Tổng doanh nghiệp cần eContract | 800.000 cty | Theo ND 337 |
| **SAM** | DN SME có thể tiếp cận qua kênh online/SaaS | ~200.000 cty | 25% TAM |
| **SOM - Cơ sở (CASSO existing)** | Khách hàng CASSO hiện hữu | 20.000 cty | Tệp khách hàng hiện có |
| **SOM - Mục tiêu Year 1** | Chuyển đổi từ tệp CASSO + acquire mới | ~7.500 cty | Bài toán ở phần dưới |

---

### Bước 3: Xác định phân khúc khách hàng & nhu cầu thật

| Phân khúc | Đặc điểm | Nhu cầu thật | Mức ưu tiên |
|---|---|---|---|
| **SME 10-50 nhân viên** | Chủ DN không rành tech, không có IT team | Tuân thủ ND 337, ký HĐLĐ nhanh, không cần IT | 🔴 Cao nhất |
| **SME 50-300 nhân viên** | Có HR/kế toán riêng | Ký hàng loạt, quản lý trạng thái hợp đồng, xuất hóa đơn tự động ngay sau khi ký, tích hợp với phần mềm kế toán | 🟡 Cao |
| **Enterprise 300+ nhân viên** | Có IT, phức tạp về quy trình | Tích hợp API, audit trail, multi-office, bulk signing | 🟢 Trung bình (Giai đoạn sau) |

**→ Tập trung:** SME 10-50 nhân viên là phân khúc chinh phục trước.

---

## PHẦN 2: CHIẾN LƯỢC GIÁ (Pricing Strategy)

### Cơ sở định giá

| Đối thủ | Mô hình giá | Mức giá |
|---|---|---|
| MISA WeSign | Per-document | ~50.000 VNĐ/hợp đồng |
| FPT eContract | Gói doanh nghiệp | ~3-5 Triệu VNĐ/năm |
| DocuSign (quốc tế) | Per-user/month | $15-45/user/tháng |
| **X-sign (đề xuất)** | **Per-user/năm** | **$5/user/năm (~125.000 VNĐ)** |

### Đề xuất Cấu trúc Giá cho X-sign

| Gói | Đối tượng | Giá | Gồm |
|---|---|---|---|
| **Starter** | SME < 10 nhân viên | **$5/user/năm** | CKS cá nhân, ký không giới hạn, lưu trữ 1GB |
| **Business** | SME 10-100 nhân viên | **$8/user/năm** | Starter + Bulk signing, approval workflow |
| **Enterprise** | 100+ nhân viên | Liên hệ (~$12/user/năm) | Business + API, SSO, audit trail đầy đủ |

**Lý do đề xuất mức $5/user/năm cho Starter:**
- **Cực kỳ dễ chấp nhận:** 125.000 VNĐ/người/năm ≈ giá 1 tô phở. Không có phòng pháp chế nào từ chối ngân sách này.
- **Khuyến mãi Onboarding:** 3 tháng miễn phí (như Anh Điệp đã định hướng) → Giảm rào cản thử nghiệm xuống bằng 0.
- **Upsell path rõ ràng:** Sau 6 tháng dùng quen, upgrade lên Business ($8) hoặc Enterprise rất tự nhiên.

---

## PHẦN 3: DỰ PHÓNG DOANH THU THEO PRODUCT LIFE CYCLE

### Công thức tính doanh thu

> **Doanh thu = Số doanh nghiệp (Cty) × Số nhân viên trung bình/Cty × Giá/user/năm**

**Giả định chuẩn:**
- Giá trung bình: **$7/user/năm** (blended giữa Starter $5 và Business $8) = **175.000 VNĐ/user/năm**
- Số nhân viên trung bình mỗi SME sử dụng X-sign: **10 users/cty**
- ARPU (Revenue trung bình mỗi cty): 10 × 175.000 = **1.750.000 VNĐ/cty/năm**

---

### Giai đoạn 0: BUILD — Thiết kế & Phát triển (Q2/2026: T4–T6/2026)

**Đặc điểm:** Giai đoạn nội bộ hoàn toàn. Không có doanh thu. Mục tiêu duy nhất là ra sản phẩm đúng deadline T6/2026.

| Tháng | Hoạt động | Output |
|---|---|---|
| **T4/2026** | Design Blueprint | SRS document, Wireframe, Prototype hoàn chỉnh |
| **T5/2026** | Develop MVP | Tích hợp CAS ID, KysoQR, luồng ký cơ bản |
| **T6/2026** | Air nội bộ (CASSO) | ~50 users nội bộ dùng thật, thu thập bug & feedback |

**→ Điều kiện để qua Phase tiếp theo:** Luồng ký hoàn chỉnh, không có lỗi nghiêm trọng, được BOD CASSO chấp thuận.

---

### Giai đoạn 1: PILOT — Công ty bạn bè & Đối tác (Q3/2026: T7–T9/2026)

**Đặc điểm:** Mở rộng có kiểm soát ra ngoài nội bộ. Vẫn chưa thu tiền, tập trung validate product-market fit.

| Mốc quan trọng | Thời gian | Khách hàng | Doanh thu |
|---|---|---|---|
| Mời công ty bạn bè dùng thử | T7/2026 | 5–10 cty đối tác thân thiết | Miễn phí |
| Thu thập feedback, tối ưu UX | T8/2026 | Tăng lên ~20–30 cty | Miễn phí |
| Chốt danh sách tính năng cho bản chính thức | T9/2026 | ~50 cty pilots | Miễn phí / Beta deal |

**→ KPI cần đạt cuối Q3:** ≥ 80% cty pilot đánh giá sẽ tiếp tục dùng khi ra bản chính thức.

---

### Giai đoạn 2: INTRODUCTION — Ra mắt thị trường (Q4/2026: T10–T12/2026)

**Đặc điểm:** Lần đầu tiên bán hàng ra thị trường. Doanh số thấp, tăng trưởng chậm — đây là bước đầu chiếm thị phần.

| Mốc quan trọng | Thời gian | Khách hàng tích lũy | Doanh thu (MRR ước tính) |
|---|---|---|---|
| Soft launch chính thức | T10/2026 | ~200 cty (từ tệp CASSO) | Voucher 3 tháng miễn phí |
| Bắt đầu thu phí (hết voucher) | T11/2026 | ~400 cty | ~120 Triệu VNĐ/tháng |
| Đóng năm 2026 | T12/2026 | ~700 cty | **~245 Triệu VNĐ/tháng** |

**→ Thị phần cuối Q4/2026:** 700 cty / 200.000 SAM = **~0,35% SAM**

> **Ghi chú chiến lược:** Q4/2026 là giai đoạn gieo hạt. Mỗi khách hàng ở đây là ambassador tiềm năng cho giai đoạn Growth năm 2027.

---

### Giai đoạn 3: GROWTH — Tăng trưởng nhanh (2027)

**Đặc điểm:** Sản phẩm đã được market validate. Word-of-mouth + kênh phân phối CASSO kéo doanh số tăng nhanh.

**Kịch bản tăng trưởng (Target):**

| Quý | Cty mới/quý | Tổng cty tích lũy | MRR ước tính |
|---|---|---|---|
| Q1/2027 | +800 | 1.500 | ~525 Triệu VNĐ/tháng |
| Q2/2027 | +1.200 | 2.700 | ~945 Triệu VNĐ/tháng |
| Q3/2027 | +1.800 | 4.500 | ~1,58 Tỷ VNĐ/tháng |
| **Q4/2027** | +2.500 | **7.000** | **~2,45 Tỷ VNĐ/tháng** |

**→ ARR cuối 2027:** ~**29 Tỷ VNĐ/năm**
**→ Thị phần cuối 2027:** 7.000 / 200.000 SAM = **~3,5% SAM**

> **Driver tăng trưởng chính:** Tích hợp luồng PayOS → Sign → X Invoice tạo ra hiệu ứng network, khiến khách hàng CASSO hiện hữu tự nhiên chuyển sang dùng X-sign mà không cần paid marketing.

---

### Giai đoạn 4: MATURITY — Trưởng thành (2028+)

**Đặc điểm:** Doanh số ổn định ở mức cao. Tăng trưởng chậm lại. Tập trung Retention, Upsell lên Business/Enterprise, và mở rộng sang Đông Nam Á.

| Năm | Tổng cty sử dụng | Thị phần SAM | MRR | ARR |
|---|---|---|---|---|
| 2028 | ~15.000 cty | 7,5% SAM | ~2,6 Tỷ VNĐ | **~31 Tỷ VNĐ** |
| 2029 | ~30.000 cty | 15% SAM | ~5,25 Tỷ VNĐ | **~63 Tỷ VNĐ** |

> **Quy mô thị trường khi trưởng thành:** ~**60 Tỷ VNĐ/năm** chỉ tính riêng phí CKS — chưa tính platform fee ký kết và doanh thu từ hệ sinh thái X Invoice/PayOS.

---

## PHẦN 4: STRATEGIC PRODUCT ROADMAP & LIFE CYCLE

```
                R E V E N U E
                    ▲
    63 Tỷ/năm       │                                    ╭─── MATURITY (2028+)
                    │                              ╭─────╯
    29 Tỷ/năm       │                        ╭────╯
                    │                   ╭────╯  GROWTH (2027)
     3 Tỷ/năm       │              ╭────╯
                    │         ╭────╯  INTRODUCTION (Q4/2026)
       ~0           │   ──────╯  BUILD + PILOT (Q2–Q3/2026)
                    │
                    └────────────────────────────────────────►  THỜI GIAN
                   T4'26  T6'26  T10'26 T12'26  Q2'27  Q4'27  Q4'28  Q4'29
```

| # | Milestone | Thời gian | Số cty | MRR | % SAM | Chiến lược chính |
|---|---|---|---|---|---|---|
| **M0** | Design Blueprint | T4/2026 | Nội bộ | — | — | SRS, Wireframe, Prototype |
| **M1** | MVP Develop xong | T5/2026 | Nội bộ | — | — | Tích hợp CAS ID, fix lỗi |
| **M2** | Air nội bộ CASSO | T6/2026 | ~50 users | — | — | Validate UX thực tế |
| **M3** | Pilot đối tác | Q3/2026 | ~50 cty | Miễn phí | — | Thu feedback, hoàn thiện |
| **M4** | Soft Launch | T10/2026 | ~200 cty | Voucher | 0,1% | Marketing ND 337 compliance |
| **M5** | Đóng năm 2026 | T12/2026 | ~700 cty | ~245M/tháng | 0,35% | Upsell từ tệp CASSO |
| **M6** | Growth 7K | Q4/2027 | ~7.000 cty | ~2,45 Tỷ/tháng | 3,5% | API, White-label, referral |
| **M7** | Maturity 30K | Q4/2029 | ~30.000 cty | ~5,25 Tỷ/tháng | 15% | M&A, mở rộng Đông Nam Á |

---

## PHẦN 5: TÓM TẮT CHO CEO (1 TRANG)

### Thị trường
- **TAM:** 800.000 doanh nghiệp cần eContract.
- **SAM:** 200.000 doanh nghiệp SME tiếp cận được qua SaaS online.
- **Lợi thế bất đối xứng:** CASSO đang nắm sẵn 20.000 khách hàng — lợi thế mà MISA, FPT không có.

### Giá
- **$5/user/năm** (Starter) — Rào cản bằng 0. Mỗi doanh nghiệp 10 người chỉ tốn **1,25 Triệu VNĐ/năm**.
- Voucher miễn phí 3 tháng → Convert thành trả phí sau khi họ "nghiện" luồng.

### Doanh thu mục tiêu theo từng cột mốc

| Cột mốc | Thời gian | Số cty | MRR |
|---|---|---|---|
| Air nội bộ xong | T6/2026 | ~50 users nội bộ | 0 đồng |
| Pilot đối tác xong | T9/2026 | ~50 cty beta | 0 đồng |
| Soft Launch + Voucher | T10/2026 | ~200 cty | 0 đồng |
| Bắt đầu thu tiền | T11–T12/2026 | ~700 cty | **~245 Triệu/tháng** |
| Đỉnh Growth | Q4/2027 | ~7.000 cty | **~2,45 Tỷ/tháng** |
| Trưởng thành | Q4/2029 | ~30.000 cty | **~5,25 Tỷ/tháng** |

### Điều kiện thành công
1. **Hoàn thành Design & Dev đúng Q2/2026** — Trễ deadline = mất cửa sổ ND 337.
2. **Pilot đối tác Q3 phải đạt ≥ 80% retention ý muốn dùng tiếp** — Đây là tín hiệu xanh để launch.
3. **Tích hợp sâu CASSO ecosystem** — X Invoice + PayOS là moat không đối thủ nào sao chép được.
4. **Giữ chân khách hàng 85%+ sau tháng thứ 2** — Chỉ số sống còn của mọi SaaS.
