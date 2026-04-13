# 📋 Meeting Notes — PM × Sep Weekly Sync

> **Date:** 07/04/2026 | **Attendees:** Sep (Head of Product), PMs (X-sign, X-invoice, Landing, Casso)
> **Facilitator:** Sep | **Note-taker:** [PM X-sign]

---

## 🎯 Agenda Overview

Buổi họp định kỳ giữa các PMs và Head of Product. Mục tiêu: align ưu tiên từng product, chốt roadmap ngắn hạn, và chuẩn bị demo nội bộ tuần tới.

---

## 1. 🔑 Product Priority Alignment

Sep chia sẻ: **Điều quan trọng nhất của mỗi PM là biết sản phẩm ưu tiên của mình.**

| PM Owner | Product | Điểm chung |
|---|---|---|
| [PM X-sign] | **X-sign** (Chữ ký số) | CASSO Account |
| [PM X-invoice] | **X-invoice** | CASSO Account |
| [PM Landing] | **Landing** (Cho vay) | CASSO Account |
| [PM Casso] | **Casso** | CASSO Account |

### 🔗 CASSO Account — Điểm chung của tất cả sản phẩm

- **Tiến độ hiện tại:** Go-live dự kiến 2–3 tuần nữa
- **Vấn đề:** 2–3 tuần hơi lâu → cần **tách phase**, ưu tiên **Must-have** trước
- **Quyết định:** Tách checkpoint rõ ràng, tập trung ra sớm nhất có thể
- **Ưu tiên #1 của CASSO Account:** Tính năng **đăng nhập** (phải có bảo mật đầy đủ)
- **Target Go-live đầu tiên:** Tích hợp với **PayOS** → kỳ vọng **cuối tuần sau**

---

## 2. ✍️ X-sign — [PM Owner: Bạn]

### 2.1 Tình trạng hiện tại & Bug cần fix

- [ ] **Bug #1:** Ký không có an toàn → lúc ký phải thấy nội dung (hỏi lại Khanh để confirm)
- [ ] **Bug #2:** Lưu trữ trên CAS ID (cần clarify flow lưu trữ)
- **Nguyên tắc:** Fix trước → cải tiến sau

### 2.2 Strategy & Pricing

- Ưu tiên **nội bộ trước** (internal rollout), song song đó **nghĩ ra pricing**
- Target pricing: **$5/user/năm** (hoặc tương đương)
- Khi ra ngoài: **Chữ ký số 3 tháng miễn phí** (voucher onboarding)

### 2.3 Demo X-sign — Thứ Sáu này, Lầu 3 🗓️

**Kịch bản demo cần chuẩn bị:**
1. Cấp chữ ký số
2. Lưu bút ký (chữ ký tay scan)
3. Ký số một tài liệu

**Flow cần re-think lại:**
> "Chào mừng đến CASSO → Nhận thông điệp → Ký một tài liệu" 

**Kế hoạch rollout:**
```
Phase 1: Triển khai nội bộ (tặng 1 chữ ký số to ngày đầu tiên)
Phase 2: Triển khai đối tác 
Phase 3: Truyền thông + bán (thông điệp: "kiếm 5$/năm")
```

### 2.4 Roadmap dài hạn X-sign (FYI / To be discussed)

- **Tầm ngắn:** Tool độc lập, dễ xài, dễ ký
- **Tầm trung:** Tích hợp luồng phê duyệt, ký trên Slack / Google Workspace
- **Tầm dài:** Ký hàng loạt (bulk signing) — **Must have**
- **Fallback:** Nếu X-sign không thành → Casso eContract

---

## 3. 🧾 X-invoice — [Note for PM Owner]

> **⚠️ Note:** Phần này dành cho PM X-invoice. Bạn care lại với PM đó.

- **Key insight từ Sep:** Quan trọng nhất không phải tính năng, mà là **biết khi nào thực hiện thông điệp nào** — đó mới là điều quan trọng
- **Target:** Revenue = **$5/tháng/user** (cùng tier với X-sign)
- **Điểm mạnh cần khai thác:** Tích hợp luồng hoá đơn → phê duyệt → ký → lưu trữ (end-to-end)

---

## 4. 🏦 Landing (Cho vay) — [Note for PM Owner]

> **⚠️ Note:** Phần này dành cho PM Landing. Bạn care lại với PM đó.

### Concept

Landing là nơi khách hàng biết được **mình được duyệt vay bao nhiêu** dựa trên hóa đơn đầu vào/đầu ra.

### Số liệu kỳ vọng

| Metric | Target |
|---|---|
| Khách hàng kéo về | 1,000 khách |
| Giải ngân trung bình | 500 triệu/người |
| Hạn mức tối đa/khách | 100–200 triệu |
| Lãi suất | ~14%/năm |
| Phần của Casso | ~10% deal (1 phần / 9 phần ngân hàng) |
| Hoa hồng đàm phán | 1.5%–2% |

### Flow người dùng (dự kiến)

```
Vào app → Nhấn "Vay" 
→ CAS ID đọc thông tin (báo cáo tài chính, hóa đơn) 
→ AI chọn 3 hóa đơn tốt nhất 
→ Hiển thị: "80% bạn có khả năng được duyệt vay VP Bank"
→ Submit → Duyệt 15–20 phút (có double check)
→ Giải ngân
```

### Key notes

- Hóa đơn = **cách để user biết mình được vay bao nhiêu**
- Phát triển giao diện để người dùng nhập thông tin, AI xử lý
- Học hỏi flow từ **CASH** (app vay hiện có)
- Mục tiêu: Kéo những người chưa xài VP Bank → onboard vào VP Bank
- **Bất kỳ đối tác nào cũng có thể làm luồng landing này** → potential white-label

---

## 5. 🏢 Casso Account — [Note for PM Casso]

> **⚠️ Note:** Phần này dành cho PM Casso. Bạn care lại với PM đó.

- **Backbone của tất cả sản phẩm** — cần go-live sớm
- Target tích hợp đầu tiên: **PayOS** (cuối tuần sau)
- Cần **tách phase** rõ ràng: Must-have → Should-have → Nice-to-have
- **Tính năng #1 cần có trước:** Đăng nhập có bảo mật

---

## 6. 🔭 Vision dài hạn (Sep sharing)

> Phần này Sep chia sẻ định hướng lớn — để team có context

- **Mục tiêu:** Robot thay thế tài chính kế toán doanh nghiệp
- **Hệ sinh thái:** Tích hợp với **Windoo** (và các sản phẩm tương tự như Odoo ERP)
- **Benchmark:** Odoo — phần mềm ERP số 1 thế giới (hitlet)
- **Nỗ lực:** POS làm giải pháp kế toán tài chính tổng thể
- **Mở rộng:** Tích hợp tất cả sản phẩm Casso vào hệ sinh thái mở (Windoo, etc.)

---

## ✅ Action Items — Tuần này (7–11/04)

> Starred ⭐ = X-sign (của bạn)

| # | Action | Owner | Deadline | Status |
|---|---|---|---|---|
| ⭐ 1 | Fix Bug chữ ký không an toàn (hỏi Khanh confirm spec) | PM X-sign | **Thứ 4, 09/04** | 🔲 |
| ⭐ 2 | Fix Bug lưu trữ trên CAS ID | PM X-sign | **Thứ 4, 09/04** | 🔲 |
| ⭐ 3 | Chuẩn bị kịch bản demo X-sign (3 bước: cấp ký, lưu bút, ký số) | PM X-sign | **Thứ 5, 10/04** | 🔲 |
| ⭐ 4 | Re-think lại user flow demo — "Chào CASSO → Nhận thông điệp → Ký" | PM X-sign | **Thứ 5, 10/04** | 🔲 |
| ⭐ 5 | **Demo X-sign** tại Lầu 3 vào Thứ Sáu | PM X-sign | **Thứ 6, 11/04** | 🔲 |
| ⭐ 6 | Draft pricing plan: $5/user + voucher 3 tháng miễn phí | PM X-sign | **Thứ 6, 11/04** | 🔲 |
| 7 | Tách phase CASSO Account + xác định Must-have Go-live | PM Casso | **Thứ 3, 08/04** | 🔲 |
| 8 | Confirm tiến độ tích hợp PayOS với CASSO Account | PM Casso | **Thứ 6, 11/04** | 🔲 |

---

## 📅 Action Items — Tuần sau (14–18/04)

| # | Action | Owner | Deadline | Status |
|---|---|---|---|---|
| ⭐ 1 | Triển khai X-sign nội bộ (Group IT): tặng 1 chữ ký số ngày đầu | PM X-sign | Tuần sau | 🔲 |
| ⭐ 2 | Nghĩ lại flow tích hợp phê duyệt (Slack / Google) | PM X-sign | Tuần sau | 🔲 |
| ⭐ 3 | Viết spec tính năng ký hàng loạt (bulk signing) | PM X-sign | Tuần sau | 🔲 |
| 4 | CASSO Account go-live với PayOS | PM Casso | Tuần sau | 🔲 |
| 5 | Landing: Prototype flow UI cho người dùng nhập thông tin vay | PM Landing | Tuần sau | 🔲 |
| 6 | X-invoice: Research thông điệp bán hàng theo giai đoạn | PM X-invoice | Tuần sau | 🔲 |

---

## 💬 Open Questions / Cần làm rõ

- [ ] **[X-sign]** Bug "ký không có an toàn" → spec chính xác là gì? (hỏi Khanh)
- [ ] **[X-sign]** Lưu trữ trên CAS ID — flow cụ thể như thế nào?
- [ ] **[Casso Account]** Tách phase cụ thể ra sao? Checkpoint nào để go-live?
- [ ] **[Landing]** Nguồn dữ liệu AI để chọn 3 hóa đơn tốt nhất — từ đâu?

---

*Generated: 07/04/2026 | Format: PM Weekly Sync Note*
