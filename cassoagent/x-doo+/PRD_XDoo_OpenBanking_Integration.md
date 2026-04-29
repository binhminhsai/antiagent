# PRD: X-doo+ Open Banking & Kế Toán Tự Động Hoá

---

**Version:** 1.0  
**Last Updated:** 28/04/2026  
**Status:** Draft  
**Owner:** Product Manager  

---

### Changelog

| Version | Ngày | Tác giả | Tóm tắt thay đổi |
|---------|------|---------|-----------------|
| 1.0 | 28/04/2026 | PM | Tạo tài liệu ban đầu |

---

## DACI Matrix

| Vai trò | Người/Bộ phận | Trách nhiệm |
|---------|---------------|-------------|
| **Driver** | Product Manager – X-doo+ | Sở hữu tài liệu, thúc đẩy quyết định |
| **Approver** | CPO / CTO | Phê duyệt cuối (1 người) |
| **Contributor** | Kế toán trưởng (domain expert), Tech Lead CASSO, Backend/Frontend Dev, QA | Đóng góp ý kiến, review, đặt câu hỏi |
| **Informed** | Đội Sales, CS, Legal/Compliance | Được cập nhật, không có vai trò trực tiếp |

---

## 1. Press Release (Working Backwards)

**TIÊU ĐỀ:**  
*X-doo+ ra mắt module Open Banking & Kế Toán Tự Động — giúp kế toán SME Việt Nam đóng sổ nhanh hơn 70%, tuân thủ Thông tư 99/2025 ngay từ ngày 01/01/2026.*

**HÀ NỘI, 28/04/2026** — X-doo+ (nền tảng ERP kết hợp hệ sinh thái Open Banking của CASSO) hôm nay công bố tính năng tự động hoá kế toán tích hợp Open Banking, cho phép doanh nghiệp SME Việt Nam đồng bộ sao kê ngân hàng, hạch toán chứng từ và đối soát 3 chiều (giao dịch ↔ hoá đơn điện tử ↔ sổ kế toán) ngay trong ERP — không cần nhập liệu thủ công, không cần xuất file Excel qua lại.

**Vấn đề:** Kế toán viên tại các SME Việt Nam hiện mất 15–25 giờ/tháng chỉ để kéo sao kê, đối chiếu thủ công và nhập dữ liệu vào phần mềm kế toán. Áp lực tuân thủ Thông tư 99/2025/TT-BTC (hiệu lực 01/01/2026 thay thế TT200) và NĐ 70/2025/NĐ-CP về hoá đơn điện tử buộc doanh nghiệp phải nâng cấp quy trình. Hầu hết giải pháp hiện tại hoặc là hệ sinh thái đóng (MISA, Fast), hoặc thiếu tích hợp thực sự với ngân hàng Việt Nam.

**Giải pháp:** X-doo+ cung cấp luồng tự động hoàn chỉnh: Sao kê ngân hàng (CASSO) → Rule Engine phân loại → Chứng từ nháp → Phê duyệt → Vào sổ cái — theo đúng hệ thống tài khoản và chuẩn mực VAS của Thông tư 99/2025.

**Trích dẫn khách hàng (đại diện):**  
*"Trước đây tôi mất cả ngày thứ 6 cuối tháng để đối soát sao kê. Bây giờ hệ thống tự làm, tôi chỉ cần approve — tiết kiệm ít nhất 2 ngày làm việc mỗi tháng."* — Kế toán trưởng, công ty dịch vụ quy mô 50 nhân sự, Hà Nội.

**Bắt đầu:** Khách hàng đang dùng X-doo+ ERP có thể kích hoạt module từ Admin → Integrations → Open Banking trong vòng 15 phút.

---

## 2. Executive Summary

X-doo+ tích hợp CASSO Open Banking API vào phần mềm kế toán nội bộ (Viindoo/Odoo+) để tự động hoá 4 nhóm nghiệp vụ lặp lại cao nhất của kế toán viên SME Việt Nam, căn chỉnh theo **Thông tư 99/2025/TT-BTC**, **26 Chuẩn mực VAS** và **NĐ 70/2025/NĐ-CP**. MVP nhắm đến thời gian 4–6 tuần, ưu tiên luồng mang lại giá trị nhanh nhất cho kế toán viên.

### Kết quả kỳ vọng của PRD này
- Chốt scope MVP và thứ tự ưu tiên 4 tính năng
- Căn chỉnh kỹ thuật giữa team CASSO (Open Banking) và team Viindoo (ERP)
- Xác định metric đo lường và giả định cần kiểm chứng sau launch

---

## 3. Bối Cảnh & Cơ Hội

### 3.1 "Why Now" — Tại sao phải làm ngay

| Yếu tố thúc đẩy | Chi tiết |
|-----------------|---------|
| **Pháp lý – Thông tư 99/2025/TT-BTC** | Hiệu lực 01/01/2026, thay thế TT200/2014. Thay đổi: TK 112 đổi tên thành "Tiền gửi không kỳ hạn", thêm yêu cầu kết nối số hoá với ngân hàng/hoá đơn điện tử. Phần mềm kế toán phải tuân thủ các yêu cầu chuyên môn nghiệp vụ mới. |
| **Pháp lý – NĐ 70/2025/NĐ-CP** | Hiệu lực 01/06/2025. Bắt buộc một số doanh nghiệp/hộ kinh doanh bán lẻ dùng hoá đơn điện tử khởi tạo từ máy tính tiền. Nhu cầu tích hợp e-invoice vào ERP tăng mạnh. |
| **Pháp lý – Thông tư 64/2024/TT-NHNN** | Hiệu lực 01/03/2025. Chính thức hợp pháp hoá Open Banking API tại Việt Nam. Ngân hàng phải publish API catalogue trước 01/07/2025. Tạo nền tảng pháp lý cho CASSO và X-doo+ hoạt động. |
| **Thị trường** | 10+ ngân hàng lớn (Vietcombank, VietinBank, MB, VPBank, Techcombank, ACB...) đã có API CASSO. Lượng giao dịch chuyển khoản tăng → nhu cầu đối soát tự động tăng tương ứng. |
| **Cạnh tranh** | MISA AMIS & Fast Accounting là closed ecosystem, giá subscription cao, API đắt và khó tuỳ biến. Đây là khoảng trống cho X-doo+ với mô hình mở hơn. |

### 3.2 Competitive Landscape

| Giải pháp hiện tại | Cách người dùng giải quyết | Điểm yếu chúng ta khai thác |
|-------------------|---------------------------|------------------------------|
| **MISA AMIS** | Dùng module ngân hàng nội bộ | Lock-in, không kết nối ngoài MISA ecosystem, phí cao |
| **Fast Accounting** | Manual import CSV từ internet banking | Thủ công, hay lỗi định dạng, không real-time |
| **Odoo gốc** | Module kế toán thiếu tích hợp VN banking | Không có CASSO/VietQR, tài khoản kế toán không chuẩn VAS/TT99 |
| **Excel + nhập tay** | ~60% SME vẫn dùng Excel | Sai sót cao, không có audit trail, không scalable |
| **Phần mềm kế toán riêng lẻ** | Dùng song song với ERP, đồng bộ tay | Trùng lặp dữ liệu, khó audit, thiếu view tổng thể |

---

## 4. Target Audience

### 4.1 ICP (Ideal Customer Profile)

- **Doanh nghiệp SME Việt Nam**, quy mô 10–200 nhân sự
- Đang dùng hoặc có kế hoạch dùng X-doo+ ERP
- Có ít nhất 1 tài khoản ngân hàng doanh nghiệp tại ngân hàng CASSO hỗ trợ
- Doanh thu 1–200 tỷ VND/năm; giao dịch ngân hàng 50–500 lần/tháng
- Ngành: dịch vụ, thương mại, SaaS, logistics — ưu tiên ngành có dòng tiền phức tạp

### 4.2 Personas

#### Persona A: Kế toán viên / Kế toán trưởng — "Bị ngập trong thao tác thủ công"

| | Chi tiết |
|-|---------|
| **Công việc hàng ngày** | Kéo sao kê từ internet banking, đối chiếu với hoá đơn, nhập liệu vào ERP, lập tờ khai thuế |
| **Pain points** | Sao kê lỗi format, mapping tài khoản kế toán cứng nhắc, lệch công nợ cuối kỳ, thiếu log audit, deadline tờ khai thuế áp lực |
| **Job-to-be-done** | "Khi tôi cần đóng sổ cuối tháng, tôi muốn có một luồng tự động từ giao dịch ngân hàng → chứng từ → sổ cái, ít thao tác và ít sai, để tôi tập trung vào phân tích thay vì nhập liệu." |
| **Thước đo thành công** | Giảm thời gian xử lý sao kê/tháng từ 15h → dưới 4h |

#### Persona B: Chủ doanh nghiệp / Giám đốc tài chính — "Mù thông tin dòng tiền"

| | Chi tiết |
|-|---------|
| **Pain points** | Thu/chi rải rác nhiều tài khoản, không dự báo được 2–4 tuần, khó chứng minh sức khoẻ tài chính khi cần vay vốn |
| **Job-to-be-done** | "Khi tôi cần quyết định chi tiêu lớn hoặc vay vốn, tôi muốn thấy dòng tiền thực tế tổng hợp từ tất cả tài khoản ngân hàng ngay trong ERP, để ra quyết định đúng lúc." |
| **Thước đo thành công** | Có dashboard dòng tiền realtime tổng hợp ≥2 tài khoản ngân hàng |

---

## 5. Problem Statement

SME Việt Nam đang chịu chi phí vận hành cao và rủi ro sai sót do quy trình tài chính–kế toán–thuế bị **phân mảnh** (ngân hàng / hoá đơn điện tử / ERP / cơ quan thuế), dẫn đến:

1. **Nhập liệu thủ công và trùng lặp** — kế toán nhập cùng 1 giao dịch lên 2–3 hệ thống
2. **Đối soát chậm** — lệch số liệu giữa sao kê ngân hàng ↔ TK 112 ↔ công nợ TK 131/331 gây khó khăn khi đóng sổ
3. **Rủi ro tuân thủ tăng** — Thông tư 99/2025 và NĐ 70/2025 yêu cầu độ chính xác và truy xuất cao hơn mà quy trình thủ công không đáp ứng
4. **Không có audit trail** — thiếu log giải trình khi cơ quan thuế/kiểm toán yêu cầu

**Điều này đặc biệt cấp thiết ngay bây giờ** vì: Thông tư 99/2025 có hiệu lực 01/01/2026 + NĐ 70/2025 từ 01/06/2025 tạo deadline kép. Doanh nghiệp nào chưa có hệ thống tự động sẽ chịu áp lực tuân thủ nặng nề ngay trong quý 1/2026.

---

## 6. Proposed Solution

### 6.1 Tổng quan kiến trúc nghiệp vụ

```
NGÂN HÀNG (10+ banks)
       ↓ (CASSO Open Banking API / Webhook)
[Bank Feed Module – X-doo+]
       ↓
[Rule Engine – Phân loại tự động]
  → Gợi ý: Loại giao dịch (Thu/Chi/Phí/Lương...)
  → Gợi ý: Đối tác (KH/NCC theo MST / nội dung CK)
  → Gợi ý: Bút toán Nợ/Có theo TT99 + VAS
       ↓
[Đối soát 3 chiều]
  Giao dịch NH ↔ Hoá đơn điện tử (iDOC/MEINVOICE/ViettelInvoice)
             ↔ Chứng từ kế toán GL (X-doo+ ERP)
       ↓
[Approval Workflow]
  Kế toán review → Approve/Sửa → Bulk approve
       ↓
[Vào sổ cái – GL]
  Tài khoản theo hệ thống TT99/TT133 + Audit log đầy đủ
       ↓
[Tờ khai thuế tự động]
  GTGT / TNDN / PIT → XML chuẩn TCKT → Nộp điện tử
```

### 6.2 Khung pháp lý & chuẩn mực áp dụng

| Văn bản | Phạm vi áp dụng trong sản phẩm |
|---------|--------------------------------|
| **TT 99/2025/TT-BTC** | Hệ thống tài khoản kế toán (TK 111, 112, 131, 331, 511, 333x...), biểu mẫu chứng từ (Phụ lục I), mẫu sổ kế toán |
| **TT 133/2016/TT-BTC** | Phục vụ SME nhỏ áp dụng chế độ kế toán giản lược (song song với TT99) |
| **VAS 01** | Nguyên tắc cơ sở dồn tích — ghi nhận doanh thu/chi phí đúng kỳ |
| **VAS 14** | Ghi nhận doanh thu bán hàng, trigger bút toán Nợ 131 / Có 511 + 3331 |
| **VAS 10** | Đánh giá lại ngoại tệ cuối kỳ (nếu có giao dịch USD/EUR) |
| **NĐ 70/2025/NĐ-CP** | E-invoice từ máy tính tiền, trigger luồng kết nối thuế |
| **TT 64/2024/TT-NHNN** | Khung pháp lý Open Banking — cơ sở kết nối CASSO/API ngân hàng |

---

## 7. MVP Scope (4–6 tuần)

### Tổng quan ưu tiên — WSJF Scoring

*WSJF = (Giá trị người dùng + Tính cấp thiết thời gian + Giảm rủi ro) / Nỗ lực*

| Tính năng | Giá trị (1-5) | Cấp thiết (1-5) | Giảm rủi ro (1-5) | Effort | WSJF | Ưu tiên |
|-----------|--------------|-----------------|-------------------|--------|------|---------|
| F1: MST Autofill + XML Export | 4 | 5 | 5 | S | **14/S** | 🥇 #1 |
| F2: Kéo hoá đơn điện tử từ Thuế | 5 | 5 | 4 | M | **14/M** | 🥈 #2 |
| F3: Bank Feed + Auto-Journal | 5 | 4 | 4 | L | **13/L** | 🥉 #3 |
| F4: Tờ khai thuế tự động | 4 | 3 | 4 | L | **11/L** | #4 |

---

### F1: MST Autofill & XML Export ⭐ ƯU TIÊN #1

**Mục tiêu:** Giảm thời gian nhập thông tin đối tác và rủi ro sai sót pháp lý khi xuất XML nộp thuế.

**Vấn đề đang giải quyết:**  
Kế toán viên phải nhập thủ công tên công ty, địa chỉ, mã số thuế từ tờ khai/hoá đơn giấy → sai sót cao, mất 2–5 phút/đối tác mới.

**Phạm vi:**

| Tính năng con | Mô tả |
|--------------|-------|
| **Tra cứu MST real-time** | Nhập MST (10 hoặc 13 số) → gọi API Tổng cục Thuế → auto-fill: Tên công ty, Địa chỉ, Trạng thái hoạt động, Người đại diện |
| **Tạo/cập nhật Vendor/Customer record** | Lưu thông tin pháp lý vào partner record trong ERP, có trạng thái "đã xác thực MST" |
| **Export XML chuẩn thuế** | Xuất file XML theo schema của Tổng cục Thuế (HTKK/iBHXH) từ dữ liệu hệ thống — không cần nhập lại |
| **Cảnh báo MST không hợp lệ / đã giải thể** | Banner warning khi trạng thái MST = "Đã giải thể" hoặc "Tạm ngừng kinh doanh" |

**User Story (Job Story):**  
*Khi tôi tạo hợp đồng mới với nhà cung cấp, tôi muốn nhập MST và hệ thống tự điền đủ thông tin pháp lý, để tôi không phải tra cứu tay và giảm rủi ro nhập sai tên/địa chỉ khi in hoá đơn.*

**Acceptance Criteria:**

```gherkin
Given kế toán viên đang tạo partner mới trong ERP
When nhập MST hợp lệ (10 hoặc 13 số)
Then hệ thống auto-fill Tên, Địa chỉ, Email (nếu có) trong vòng 2 giây
And trạng thái partner hiển thị "Đã xác thực MST ✓"

Given partner có MST đã giải thể
When kế toán viên nhập MST đó
Then hệ thống hiển thị cảnh báo rõ "MST này đã ngừng hoạt động - Xác nhận tiếp tục?"
And không tự động tạo partner cho đến khi người dùng xác nhận

Given kế toán đã có dữ liệu hoá đơn/chứng từ trong kỳ
When nhấn Export XML
Then tệp XML xuất ra đúng schema HTKK/iBHXH hiện hành
And tất cả MST trong file đã qua bước xác thực
```

**Effort estimate:** S (3–5 ngày, 1 backend dev)  
**Non-goals:** Tự động nộp tờ khai (F4), tích hợp chữ ký số (phase 2)

---

### F2: Kéo Hoá Đơn Điện Tử Từ Cơ Quan Thuế ⭐ ƯU TIÊN #2

**Mục tiêu:** Xoá bỏ bước thủ công kéo hoá đơn từ portal Tổng cục Thuế rồi nhập lại vào ERP.

**Vấn đề đang giải quyết:**  
Kế toán mất 1–3 giờ/tuần tải hoá đơn từ hoadondientu.gdt.gov.vn, kiểm tra trạng thái, rồi nhập lại vào phần mềm kế toán.

**Phạm vi:**

| Tính năng con | Mô tả |
|--------------|-------|
| **Kết nối cổng thuế** | OAuth/API kết nối với iDOC (Cổng dữ liệu hoá đơn điện tử - GDT) để kéo danh sách hoá đơn đầu vào/đầu ra theo kỳ |
| **Tự động tạo chứng từ nháp** | Mỗi hoá đơn kéo về → tự sinh draft journal entry: Nợ 156/211/641/642 + Nợ 133 / Có 331 (mua vào) hoặc Nợ 131 / Có 511 + 3331 (bán ra) |
| **Workflow phê duyệt chứng từ** | Kế toán xem danh sách chứng từ nháp → review → Approve/Sửa/Từ chối → Vào sổ cái khi approve |
| **Gửi hoá đơn điện tử lên thuế** | Từ đơn hàng/hợp đồng trong ERP → tạo XML theo chuẩn NĐ 70/2025 → gửi lên cổng thuế → nhận mã CQT (cơ quan thuế) |
| **Theo dõi trạng thái hoá đơn** | Dashboard trạng thái: Chờ cấp mã / Đã cấp mã / Đã huỷ / Điều chỉnh |

**User Story:**  
*Khi tôi muốn hạch toán chi phí mua hàng trong tháng, tôi muốn hệ thống tự kéo toàn bộ hoá đơn đầu vào đã được thuế xác nhận về và tạo chứng từ nháp, để tôi chỉ cần review và approve thay vì nhập thủ công từng hoá đơn.*

**Acceptance Criteria:**

```gherkin
Given kế toán viên đã cấu hình kết nối cổng thuế
When nhấn "Sync hoá đơn" hoặc đến lịch sync tự động
Then hệ thống kéo về toàn bộ hoá đơn điện tử trong kỳ (đầu vào + đầu ra)
And tự động tạo draft journal entry theo đúng tài khoản TT99
And hiển thị số lượng hoá đơn mới / đã có / bị lỗi

Given draft journal entry được tạo cho hoá đơn mua vào
Then bút toán phải là: Nợ TK 156/211/641/642 (tuỳ loại hàng/dịch vụ) + Nợ TK 133 / Có TK 331
And số tiền khớp với hoá đơn gốc (đã trừ VAT cho TK 156/..., VAT riêng TK 133)

Given kế toán review draft và nhấn "Approve"
Then chứng từ được vào sổ cái (GL posted)
And tạo audit log: user, thời gian, action

Given hoá đơn gửi lên cổng thuế
When thuế cấp mã thành công
Then ERP tự cập nhật trạng thái "Đã cấp mã CQT" và lưu mã vào record hoá đơn
```

**Effort estimate:** M (1–2 tuần, 1 backend + 1 frontend)  
**Dependencies:** API cổng thuế (iDOC) hoặc đối tác cung cấp hoá đơn điện tử (MEINVOICE/Viettel)  
**Non-goals:** Huỷ/điều chỉnh hoá đơn (phase 2), tích hợp chữ ký số HSM (phase 2)

---

### F3: Bank Feed — Đồng Bộ Sao Kê & Hạch Toán Tự Động ⭐ ƯU TIÊN #3

**Mục tiêu:** Xoá bỏ bước kéo sao kê thủ công và nhập giao dịch vào TK 112 trong ERP.

**Vấn đề đang giải quyết:**  
Kế toán viên phải vào internet banking của từng ngân hàng, xuất CSV, format lại, rồi import/nhập tay vào phần mềm kế toán — lặp lại hàng ngày/tuần.

**Phạm vi:**

| Tính năng con | Mô tả |
|--------------|-------|
| **Kết nối tài khoản ngân hàng** | Kết nối qua CASSO API (hỗ trợ 10+ ngân hàng VN); cấu hình tài khoản, lịch sync (real-time webhook hoặc scheduled), chọn ngày bắt đầu đồng bộ |
| **Danh sách giao dịch** | Hiển thị giao dịch với filter: tài khoản / ngày / số tiền / nội dung / trạng thái (Chưa phân loại / Đã phân loại / Đã hạch toán) |
| **Dedupe & cảnh báo lỗi** | Phát hiện giao dịch trùng lặp (cùng số tiền + ngày + nội dung trong 24h), cảnh báo sync thất bại |
| **Rule Engine phân loại tự động** | Quy tắc cấu hình: nếu nội dung CK chứa "CONG TY A" → đối tác = Công ty A, loại = Thu tiền KH, bút toán = Nợ 112 / Có 131; Hỗ trợ regex và fuzzy match |
| **Gợi ý phân loại bằng AI/ML** | Dựa trên lịch sử phân loại, gợi ý category cho giao dịch mới chưa có rule |
| **Tạo chứng từ nháp tự động** | Từ giao dịch đã phân loại → tạo draft: Phiếu thu (Nợ 112 / Có 131 hoặc 511), Phiếu chi (Nợ 331 hoặc 641 / Có 112), Hoặc flag "Cần xem xét" |
| **Bulk approve + audit log** | Checkbox chọn nhiều chứng từ → Approve hàng loạt; mỗi action ghi log user + timestamp |
| **Reconciliation view** | So sánh số dư TK 112 trên ERP vs số dư sao kê ngân hàng; highlight khoản chênh lệch |

**Hệ thống tài khoản TT99 liên quan:**

| Giao dịch | Bút toán tự động |
|-----------|-----------------|
| Thu tiền từ khách hàng (KH trả nợ) | Nợ TK 112 / Có TK 131 |
| Thu tiền bán hàng trực tiếp | Nợ TK 112 / Có TK 511 + Có TK 3331 |
| Thanh toán nhà cung cấp | Nợ TK 331 / Có TK 112 |
| Chi phí ngân hàng (phí dịch vụ) | Nợ TK 635 hoặc 642 / Có TK 112 |
| Tiền nhận trước của KH | Nợ TK 112 / Có TK 131 (dư Có) |
| Nộp thuế | Nợ TK 333x / Có TK 112 |

**User Story:**  
*Khi có giao dịch mới vào tài khoản ngân hàng công ty, tôi muốn nhận thông báo và thấy giao dịch đó đã được gợi ý phân loại + tạo chứng từ nháp ngay trong ERP, để tôi không cần vào internet banking rồi nhập lại thủ công.*

**Acceptance Criteria:**

```gherkin
Given tài khoản ngân hàng đã được kết nối qua CASSO
When có giao dịch mới (credit hoặc debit)
Then giao dịch xuất hiện trong ERP trong vòng 60 giây (webhook) hoặc 15 phút (scheduled)
And hệ thống áp dụng rule phù hợp nếu có và tạo draft journal entry
And giao dịch chưa có rule được đánh dấu "Chưa phân loại" và hiển thị gợi ý AI

Given kế toán viên nhìn vào reconciliation view
Then số dư TK 112 trên ERP phải khớp với số dư sao kê ngân hàng (±0 đồng sau khi approve toàn bộ)
And các khoản chênh được hiển thị rõ nguyên nhân

Given kế toán approve bulk 20 chứng từ
When nhấn "Approve tất cả đã chọn"
Then tất cả chứng từ được vào sổ cái
And audit log ghi đầy đủ: 20 entries với user, thời gian, journal entry số

Given giao dịch trùng lặp phát hiện
Then hệ thống hiển thị cảnh báo "Giao dịch có thể trùng lặp với [ID]"
And không tự động tạo chứng từ thứ 2 cho đến khi người dùng xác nhận
```

**Effort estimate:** L (2–3 tuần, 1 backend + 1 frontend + 1 QA)  
**Dependencies:** CASSO API credentials, cấu hình ngân hàng từ phía khách hàng  
**Non-goals:** Thanh toán outbound qua API ngân hàng (phase 3), dự báo dòng tiền ML (phase 3)

---

### F4: Tờ Khai Thuế Tự Động ⭐ ƯU TIÊN #4

**Mục tiêu:** Giảm thời gian lập tờ khai thuế GTGT hàng tháng/quý từ 4–8 giờ xuống còn 30–60 phút.

**Vấn đề đang giải quyết:**  
Kế toán phải tổng hợp số liệu từ nhiều nơi (ERP + sổ sách + sao kê) rồi nhập tay vào phần mềm HTKK, xuất XML, đối chiếu lại trước khi nộp.

**Phạm vi MVP:**

| Tính năng con | Mô tả |
|--------------|-------|
| **Tổng hợp dữ liệu tờ khai GTGT (01/GTGT)** | Tự động tổng hợp doanh thu (TK 511), thuế đầu ra (TK 3331), thuế đầu vào được khấu trừ (TK 133) từ GL trong kỳ → map vào các chỉ tiêu tờ khai 01/GTGT |
| **Đối soát số liệu** | So sánh số liệu tờ khai với sổ kế toán; highlight chênh lệch và giải thích nguyên nhân |
| **Xuất XML chuẩn HTKK** | Generate file XML theo schema Tổng cục Thuế (HTKK 4.x) từ dữ liệu đã đối soát |
| **Nộp điện tử (basic)** | Upload XML lên cổng thuế điện tử (eTax) qua API hoặc hướng dẫn thao tác tay |

**Acceptance Criteria:**

```gherkin
Given kế toán viên chọn kỳ khai thuế (tháng/quý)
When nhấn "Tạo tờ khai GTGT"
Then hệ thống tự động map dữ liệu GL vào đúng chỉ tiêu tờ khai 01/GTGT
And hiển thị preview tờ khai trước khi export
And đánh dấu các chỉ tiêu có chênh lệch so với kỳ trước (variance alert)

Given tờ khai đã được kế toán xác nhận
When nhấn "Xuất XML"
Then file XML xuất ra hợp lệ theo schema HTKK hiện hành
And tên file đặt theo chuẩn: MST_YYYYMMDD_01GTGT.xml
```

**Effort estimate:** L (2–3 tuần, 1 backend + 1 frontend)  
**Dependencies:** F1 (MST chuẩn) + F2 (hoá đơn đã vào sổ) + F3 (sao kê đã hạch toán) phải hoàn thành  
**Non-goals:** Tờ khai TNDN / PIT (phase 2), ký số điện tử (phase 2), nộp tự động 100% không cần review (phase 3)

---

## 8. Non-Goals (Những gì KHÔNG làm trong MVP)

- Thanh toán outbound qua API ngân hàng (chuyển khoản từ ERP)
- Dự báo dòng tiền và cashflow intelligence (ML/AI model)
- Tích hợp chữ ký số (HSM/token USB)
- Tờ khai thuế TNDN, Thuế Thu Nhập Cá Nhân, BHXH
- Kết nối với phần mềm POS của bên thứ 3 (Sapo, KiotViet...)
- Multi-currency accounting nâng cao (chỉ VND + gợi ý tỷ giá USD/EUR cơ bản)
- Module tín dụng / credit scoring
- Doanh nghiệp FDI, kế toán theo IFRS (chỉ tập trung VAS/TT99)

---

## 9. Success Metrics

### Primary Metrics (Đo sau 8 tuần post-launch)

| Metric | Baseline (hiện tại) | Target | Cách đo |
|--------|---------------------|--------|---------|
| Thời gian xử lý sao kê/tháng (Persona A) | 15 giờ/tháng | ≤ 4 giờ/tháng (-73%) | In-app time tracking + user survey |
| Tỷ lệ chứng từ tạo tự động / tổng chứng từ | 0% | ≥ 60% | ERP analytics |
| Số giao dịch ngân hàng được phân loại đúng tự động | N/A | ≥ 75% (không cần sửa) | Rule engine accuracy log |
| Tỷ lệ hoá đơn điện tử kéo về thành công | N/A | ≥ 95% | API success rate |
| Thời gian đóng sổ cuối tháng | 3–5 ngày | ≤ 1,5 ngày | Monthly close date log |

### Secondary Metrics

| Metric | Target |
|--------|--------|
| Tỷ lệ adoption (% user kích hoạt bank feed trong 30 ngày) | ≥ 40% của khách hàng X-doo+ active |
| NPS của kế toán viên sau 8 tuần | ≥ 35 |
| Tỷ lệ lỗi sai sót khi vào sổ (audit finding) | Giảm ≥ 50% so với quy trình thủ công |
| Số MST tra cứu thành công / tổng request | ≥ 99% (API GDT uptime) |

### Guardrail Metrics (Không được vi phạm)

- Audit trail phải đầy đủ 100% cho mọi chứng từ được tạo/sửa/approve
- Không có giao dịch nào bị vào sổ mà không qua bước approval của kế toán
- Dữ liệu ngân hàng phải được mã hoá trong transit (TLS 1.3) và at rest (AES-256)

---

## 10. Technical Considerations & Assumptions

### Giả định cần kiểm chứng

| # | Giả định | Rủi ro nếu sai | Cách kiểm chứng |
|---|----------|----------------|-----------------|
| A1 | CASSO API có uptime ≥99.5% cho 10+ ngân hàng | Bank feed không reliable → mất trust | Xem SLA contract CASSO, pilot 2 tuần với 1 bank |
| A2 | API cổng thuế (iDOC) ổn định đủ để kéo hoá đơn realtime | F2 phải fallback sang upload tay | Spike test với test account GDT trong sprint 1 |
| A3 | Kế toán viên sẵn sàng thay đổi workflow sang approve-based | Change resistance → adoption thấp | Thực hiện 5 user interviews với kế toán trưởng trước launch |
| A4 | Rule engine 75%+ accuracy đủ để giảm workload | Nếu <60%, kế toán vẫn phải làm tay nhiều → không đủ value | Backtest với dữ liệu lịch sử thực tế từ 2–3 khách hàng pilot |
| A5 | Schema XML HTKK/iDOC không thay đổi trong Q1/2026 | Phải update parser → regression risk | Đăng ký nhận thông báo thay đổi từ GDT, có versioning cho XML parser |

### Phụ thuộc kỹ thuật

| Phụ thuộc | Owner | Rủi ro |
|-----------|-------|--------|
| CASSO API key & contract | Business Dev | Cần ký SLA trước sprint 2 |
| iDOC/GDT API credentials | Compliance team | Cần tài khoản doanh nghiệp, xử lý 2–4 tuần |
| Hệ thống tài khoản TT99 trong Viindoo | Dev Lead | Cần update chart of accounts trước F3 |
| Infrastructure security audit | DevOps | Audit trước khi lưu token ngân hàng |

### Security & Compliance Requirements

- Token CASSO và credentials ngân hàng phải lưu trong encrypted vault (không plain text trong DB)
- Mỗi API call đến cổng thuế phải có logging đầy đủ (request/response, timestamp, user)
- Quyền truy cập bank feed phân tầng: Admin (cấu hình) / Accountant (sync + approve) / Viewer (xem report)
- Tuân thủ Luật An toàn Thông tin mạng 2015 và Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân

---

## 11. Roadmap

### Now (Sprint 1–2, tuần 1–3)

| Tính năng | Owner | Metric thành công |
|-----------|-------|-------------------|
| F1: MST Autofill & XML Export | Backend dev A | 100% form có thể tra cứu MST + XML export hợp lệ |
| Cấu hình hệ thống tài khoản TT99 trong Viindoo | Dev Lead | Chart of accounts update xong |
| Spike: Test API CASSO + API GDT | Backend dev B | Xác nhận feasibility + uptime |

### Next (Sprint 3–4, tuần 4–6)

| Tính năng | Phụ thuộc | Metric thành công |
|-----------|-----------|-------------------|
| F2: Kéo hoá đơn điện tử + Approval workflow | F1 hoàn thành + API GDT confirmed | ≥90% hoá đơn kéo về tạo đúng draft journal entry |
| F3: Bank Feed + Rule Engine + Auto-Journal | CASSO contract ký + TK TT99 setup | ≥75% giao dịch được phân loại đúng tự động |

### Later (tuần 7+, directional)

- F4: Tờ khai thuế tự động (01/GTGT)
- Cashflow dashboard (tổng hợp multi-account)
- Tích hợp chữ ký số cho e-invoice
- Tờ khai TNDN, PIT, BHXH
- Dự báo dòng tiền AI (Persona B use case)
- Kết nối POS bên thứ 3 (Sapo, KiotViet)

---

## 12. Open Questions

| # | Câu hỏi | Owner | Deadline |
|---|---------|-------|----------|
| OQ1 | CASSO có SDK embedded (Plaid Link-style) để user tự link ngân hàng trong ERP UI không, hay vẫn cần user login portal CASSO riêng? | Business Dev + CASSO team | Sprint 1 |
| OQ2 | Đối với TT133 (doanh nghiệp siêu nhỏ), có cần chart of accounts riêng hay dùng chung TT99 với filter? | Dev Lead + Domain Expert | Sprint 1 |
| OQ3 | iDOC API hỗ trợ kéo hoá đơn đầu vào (mua) real-time hay chỉ batch theo ngày? Rate limit là bao nhiêu? | Backend dev B | Sprint 1 |
| OQ4 | Ai là người approval final trong workflow (kế toán viên hay kế toán trưởng)? Có cần multi-level approval không? | UX Research | Sprint 2 |
| OQ5 | Willingness-to-pay: Kế toán SME sẵn sàng trả thêm bao nhiêu/tháng cho tính năng bank feed? (Cần user interview) | PM | Trước Sprint 3 |
| OQ6 | CASSO Hub hay CASSO API thuần? Licensing model cho enterprise customer của X-doo+? | Business Dev | Sprint 2 |

---

## Phụ lục A: Mapping Nghiệp Vụ Kế Toán → Tính Năng Sản Phẩm

| Nghiệp vụ kế toán (TT99/VAS) | Tính năng X-doo+ |
|------------------------------|-----------------|
| Ghi nhận tiền gửi không kỳ hạn (TK 112) | F3: Bank Feed sync |
| Đối chiếu sổ kế toán vs sao kê ngân hàng | F3: Reconciliation view |
| Hạch toán khoản phải thu (TK 131) từ thu tiền NH | F3: Rule Engine → Nợ 112 / Có 131 |
| Hạch toán khoản phải trả (TK 331) khi thanh toán | F3: Rule Engine → Nợ 331 / Có 112 |
| Ghi nhận hoá đơn mua vào (Nợ 133 + 156/642 / Có 331) | F2: E-invoice auto-journal |
| Ghi nhận hoá đơn bán ra (Nợ 131 / Có 511 + 3331) | F2: E-invoice auto-journal |
| Kiểm tra thông tin pháp lý đối tác (MST) | F1: MST Autofill |
| Xuất số liệu nộp thuế GTGT (Chỉ tiêu 01/GTGT) | F1: XML Export + F4: Tờ khai tự động |
| Đánh giá lại ngoại tệ TK 112 cuối kỳ (VAS 10) | Phase 2 |
| Lập dự phòng phải thu khó đòi (TK 2293) | Phase 2 |

---

## Phụ lục B: Glossary

| Thuật ngữ | Định nghĩa |
|-----------|-----------|
| **Bank Feed** | Luồng dữ liệu giao dịch ngân hàng được đồng bộ real-time vào phần mềm kế toán |
| **Rule Engine** | Công cụ áp dụng quy tắc phân loại giao dịch tự động dựa trên nội dung chuyển khoản, số tiền, đối tác |
| **3-Way Matching** | Đối soát 3 chiều giữa: (1) giao dịch ngân hàng ↔ (2) hoá đơn điện tử ↔ (3) chứng từ kế toán |
| **Draft Journal Entry** | Bút toán kế toán nháp, chưa được vào sổ cái, chờ kế toán review và approve |
| **MST** | Mã số thuế — định danh pháp lý của doanh nghiệp/cá nhân kinh doanh tại Việt Nam |
| **TK (Tài khoản)** | Tài khoản kế toán trong hệ thống tài khoản theo Thông tư 99/2025/TT-BTC |
| **VAS** | Vietnamese Accounting Standards — 26 Chuẩn mực Kế toán Việt Nam |
| **TT99** | Thông tư 99/2025/TT-BTC — Chế độ kế toán doanh nghiệp mới, hiệu lực 01/01/2026 |
| **CASSO** | Fintech Việt Nam cung cấp Open Banking middleware kết nối 10+ ngân hàng VN |
| **iDOC** | Cổng dữ liệu hoá đơn điện tử của Tổng cục Thuế Việt Nam |
| **HTKK** | Hỗ trợ kê khai thuế — phần mềm và schema XML chuẩn của Tổng cục Thuế |
| **GL** | General Ledger — Sổ cái kế toán |
| **AR/AP** | Accounts Receivable / Accounts Payable — Phải thu / Phải trả |
| **Audit Log** | Nhật ký kiểm toán — ghi lại mọi thao tác thay đổi dữ liệu |
