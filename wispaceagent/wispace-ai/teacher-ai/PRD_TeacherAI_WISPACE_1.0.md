# PRD: Teacher AI — WISPACE

---

**Version:** 1.0
**Last updated:** 23/04/2026
**Status:** Draft
**Owner:** Product Manager, WISPACE

---

### Changelog

| Version | Ngày | Tác giả | Tóm tắt thay đổi |
|---------|------------|--------|-----------------------------------|
| 1.0 | 23/04/2026 | WISPACE PM | Bản nháp đầu tiên |

---

## 1. Tóm tắt sản phẩm (Executive Summary)

**Teacher AI** là tính năng cốt lõi của nền tảng học IELTS WISPACE. Sản phẩm thay thế vai trò của giáo viên trong việc thiết kế lộ trình học cá nhân hóa, theo dõi tiến độ và tương tác chủ động với từng học sinh — 24/7, hoàn toàn tự động.

Thay vì một giáo trình cứng nhắc áp dụng cho tất cả, Teacher AI tạo ra một **lộ trình động**, thích nghi liên tục dựa trên trình độ đầu vào, mục tiêu điểm số, thời gian có sẵn và kết quả học tập thực tế của từng học sinh.

---

## 2. Bối cảnh & Vấn đề (Problem Statement)

### 2.1 Bối cảnh thị trường

Thị trường luyện thi IELTS tại Việt Nam đang phát triển mạnh, nhưng phần lớn học sinh vẫn phải lựa chọn giữa:
- **Học theo giáo trình chung** (sách, ứng dụng offline): Không có sự cá nhân hóa, học sinh không biết họ đang ở đâu và cần học gì tiếp theo.
- **Có gia sư/giáo viên riêng**: Hiệu quả cao nhưng tốn kém (chi phí 500.000 – 2.000.000 VNĐ/buổi) và phụ thuộc hoàn toàn vào lịch giáo viên.

### 2.2 Vấn đề cốt lõi

| Vấn đề | Tác động |
|--------|---------|
| Học sinh không biết nên học gì tiếp theo | Lãng phí thời gian, học không đúng điểm yếu |
| Lộ trình không thích nghi với kết quả thực tế | Học sinh tiến bộ chậm hoặc bỏ cuộc |
| Thiếu người hỗ trợ khi gặp khó khăn lúc tự học | Tỷ lệ bỏ cuộc cao |
| Chi phí gia sư cao, không tiếp cận được | Rào cản tài chính lớn cho nhiều học sinh |

### 2.3 Job Stories (Intercom format)

- **Khi** tôi bắt đầu luyện IELTS mà không biết trình độ mình đang ở đâu, **tôi muốn** được đánh giá năng lực và nhận một lộ trình cụ thể, **để** tôi không phải đoán mò và mất thời gian học sai chỗ.
- **Khi** tôi làm một bài quiz mà điểm thấp hơn kỳ vọng, **tôi muốn** hệ thống tự động điều chỉnh lộ trình của tôi, **để** tôi được củng cố đúng kiến thức cần thiết mà không cần tự quyết định.
- **Khi** tôi bị bí một bài viết hoặc không hiểu lý thuyết lúc tự học tối muộn, **tôi muốn** hỏi và nhận giải thích ngay lập tức, **để** tôi không bị mắc kẹt và có thể tiếp tục học.
- **Khi** kỳ thi đang đến gần nhưng tôi bị lỡ nhiều ngày học, **tôi muốn** hệ thống tự tính toán lại lịch học, **để** tôi vẫn kịp chuẩn bị đủ trước ngày thi.

---

## 3. Mục tiêu & Đo lường thành công (Goals & Success Metrics)

### 3.1 Mục tiêu kinh doanh

- Tăng tỷ lệ giữ chân học sinh (retention) trên nền tảng WISPACE.
- Tăng chuyển đổi từ học thử sang trả phí bằng cách chứng minh giá trị ngay từ bước đầu.
- Định vị WISPACE là nền tảng IELTS thông minh hàng đầu, khác biệt so với đối thủ.

### 3.2 Chỉ số thành công (Success Metrics)

| Chỉ số | Mục tiêu (6 tháng) | Phương pháp đo |
|--------|-------------------|----------------|
| D30 Retention (học sinh tiếp tục sau 30 ngày) | ≥ 45% | Analytics |
| % học sinh hoàn thành lộ trình Phase 1 | ≥ 60% | Tracking module |
| NPS (Net Promoter Score) | ≥ 50 | Khảo sát in-app |
| Tỷ lệ chuyển đổi free → paid | ≥ 25% | Funnel analytics |
| Số lượng tương tác với AI Tutor / học sinh / tuần | ≥ 5 lần | Chat logs |

### 3.3 Non-goals (Ngoài phạm vi)

- **Không** xây dựng nội dung học (video, bài tập) mới — Teacher AI chỉ phân bổ và điều phối nội dung đã có.
- **Không** thay thế tính năng AI Grading hiện có — Teacher AI sử dụng dữ liệu từ AI Grading, không trùng lặp.
- **Không** hỗ trợ kỳ thi khác ngoài IELTS trong phiên bản 1.0.
- **Không** cung cấp chức năng thanh toán hoặc quản lý khóa học — đây là phạm vi của module khác.

---

## 4. DACI Matrix

| Vai trò | Người/Bộ phận | Trách nhiệm |
|---------|--------------|-------------|
| Driver | Product Manager | Sở hữu tài liệu, thúc đẩy quyết định |
| Approver | CPO / CTO WISPACE | Phê duyệt cuối cùng (một người) |
| Contributor | Tech Lead, AI Engineer, UX Designer, Content Team | Góp ý, review, nêu vấn đề |
| Informed | Marketing, Sales, Customer Success | Cập nhật tiến độ, không ra quyết định |

---

## 5. Mô tả sản phẩm (Product Description)

Teacher AI bao gồm 4 module chính, hoạt động liên kết với nhau:

---

### Module A: Thu thập & Phân tích Đầu vào (Input Collection)

**Mục đích:** Thu thập đủ dữ liệu để tạo ra lộ trình chính xác cho từng học sinh.

**Dữ liệu đầu vào:**

| Nhóm | Thông tin | Cách thu thập |
|------|-----------|---------------|
| Hồ sơ học sinh | Giai đoạn (Xuất phát / Về đích), Nền tảng (Yếu / Trung bình / Khá) | Onboarding form |
| Mục tiêu | Điểm IELTS mục tiêu, Ngày thi dự kiến | Onboarding form |
| Lịch học | Tần suất học (giờ/tuần), Khung giờ học | Onboarding form |
| Điểm yếu | Ngữ pháp, Logic, Từ vựng, Tốc độ, Coherence... | Tự chọn hoặc lấy từ AI Grading |
| Phong cách học | Cần hướng dẫn chi tiết / Tập trung thực hành | Onboarding form |

**Tích hợp AI Grading:** Nếu học sinh đã sử dụng AI Grading, dữ liệu điểm yếu được tự động nhập vào, học sinh không cần tự điền.

**Acceptance Criteria:**

```
Given học sinh lần đầu vào WISPACE
When họ hoàn thành bước onboarding
Then hệ thống ghi nhận đủ 5 nhóm dữ liệu đầu vào
And Teacher AI bắt đầu tạo lộ trình trong vòng 30 giây

Given học sinh đã có lịch sử dùng AI Grading
When họ vào bước nhập điểm yếu
Then hệ thống tự động điền thông tin từ AI Grading
And học sinh có thể chỉnh sửa nếu muốn
```

---

### Module B: Engine Tạo Lộ trình Tự động (Roadmap Generation)

**Mục đích:** Xuất ra lộ trình học 2 tầng (tổng quan và chi tiết) phù hợp với từng học sinh.

**Cấu trúc lộ trình:**

**Tầng 1 – Lộ trình Tổng quan (Overview)**

Chia theo các Phase với mục tiêu và thời lượng rõ ràng. Ví dụ:

| Phase | Tên | Mục tiêu | Thời lượng điển hình |
|-------|-----|----------|----------------------|
| 1 | Foundation | Hoàn thiện ngữ pháp và từ vựng cơ bản | 2-3 tuần |
| 2 | Skill Building | Luyện 4 kỹ năng Reading, Listening, Writing, Speaking | 4-6 tuần |
| 3 | Exam Practice | Làm đề thi thực tế, tăng tốc độ và chiến thuật | 2-4 tuần |

**Tầng 2 – Lộ trình Chi tiết (Granular)**

Mỗi Phase chia thành các Chunk → Module. Mỗi module có:
- Loại: Video / Quiz (Trắc nghiệm) / Writing (Tự luận) / Mix / Virtual Exam
- Thời lượng ước tính
- **Lý do xuất hiện (Rationale):** Giải thích tại sao module này được chọn cho học sinh này

Ví dụ Rationale: *"Do bạn yếu Coherence, AI bổ sung bài luyện viết lại đoạn văn để cải thiện cấu trúc logic."*

**Acceptance Criteria:**

```
Given học sinh hoàn thành onboarding
When hệ thống sinh lộ trình
Then lộ trình được tạo trong ≤ 30 giây
And có ít nhất 2 Phase với mục tiêu cụ thể
And mỗi module có Rationale giải thích lý do xuất hiện

Given 2 học sinh có cùng mục tiêu điểm nhưng khác nền tảng và điểm yếu
When hệ thống tạo lộ trình cho cả hai
Then hai lộ trình phải khác nhau đáng kể về cấu trúc và phân bổ module
```

---

### Module C: Cơ chế Thích nghi (Adaptive Learning Engine)

**Mục đích:** "Não bộ" của sản phẩm — theo dõi tiến độ và tự động điều chỉnh lộ trình theo kết quả thực tế.

**Tracking:**
- Trạng thái hoàn thành từng module (Chưa học / Đang học / Hoàn thành)
- Điểm số và thời gian làm bài của từng module
- Lịch học thực tế (ngày nào học, bao lâu)

**Trigger logic — các điều kiện kích hoạt điều chỉnh:**

| Tình huống | Hành động của AI |
|-----------|-----------------|
| Quiz điểm thấp (< ngưỡng đặt trước) | Tự động chèn module bổ trợ kiến thức liên quan trước khi tiếp tục |
| Học nhanh, kết quả tốt liên tiếp | Rút ngắn giai đoạn lý thuyết, đẩy nhanh sang phase luyện đề |
| Nghỉ học > X ngày so với lịch | Tính toán lại lịch trình để kịp ngày thi, có thể tăng cường độ |
| Gần ngày thi (< 2 tuần) | Ưu tiên Virtual Exam và bài luyện đề, giảm lý thuyết mới |
| Điểm Writing/Speaking tệ hơn kỳ vọng | Tăng tần suất các module Writing/Speaking, thêm feedback loop |

**Acceptance Criteria:**

```
Given học sinh làm Quiz đạt dưới 60%
When kết quả được ghi nhận
Then hệ thống tự động chèn ≥ 1 module bổ trợ liên quan vào lộ trình
And học sinh nhận thông báo giải thích lý do điều chỉnh

Given học sinh không học trong 5 ngày liên tiếp
When hệ thống phát hiện khoảng trống
Then AI tính toán lại lịch học để kịp ngày thi
And hiển thị kế hoạch bù học cho học sinh xác nhận

Given học sinh đã học nhanh hơn kế hoạch 20%
When hệ thống phát hiện tốc độ cao
Then AI đề xuất tăng độ khó hoặc chuyển sớm sang phase tiếp theo
```

---

### Module D: AI Tutor & Chatbot (Tương tác chủ động)

**Mục đích:** Biến Teacher AI từ công cụ tĩnh thành "người bạn đồng hành" — tương tác chủ động, hỗ trợ học sinh trong quá trình học.

**Tính năng chính:**

**D1 – Context-Aware Chat:**
- AI biết học sinh đang học module nào, điểm số gần nhất, điểm yếu cụ thể
- Trả lời câu hỏi về ngữ pháp, từ vựng, phân tích bài IELTS
- Không trả lời chung chung — luôn liên kết với bối cảnh học tập hiện tại của học sinh

**D2 – Proactive Nudge (Thúc đẩy chủ động):**

| Tình huống | AI phản ứng |
|-----------|-------------|
| Học sinh chưa học theo lịch | Push notification / in-app message nhắc nhở học |
| Hoàn thành module | Chúc mừng, tóm tắt tiến độ, gợi ý module tiếp theo |
| Điểm thấp liên tiếp | AI chủ động mở cuộc trò chuyện, đề xuất cách cải thiện |
| Sắp đến ngày thi | Gửi lịch ôn tập cuối, động viên |

**D3 – CTA thông minh (Smart Call-to-Action):**
- Cuối mỗi phiên học, AI đề xuất hành động tiếp theo cụ thể
- Không để học sinh tự quyết định "học gì bây giờ"

**Acceptance Criteria:**

```
Given học sinh đang trong module Writing và hỏi về Coherence
When AI nhận câu hỏi
Then AI trả lời có tham chiếu đến bài viết/điểm số gần nhất của học sinh
And đề xuất một bài luyện tập cụ thể từ lộ trình

Given học sinh chưa học trong 2 ngày
When đến giờ học theo lịch
Then hệ thống gửi thông báo nhắc nhở
And nội dung thông báo cá nhân hóa (tên học sinh, module đang học)
```

---

## 6. Luồng người dùng (User Flows)

### Luồng 1: Onboarding & Tạo lộ trình lần đầu

```
[Học sinh đăng ký] → [Onboarding: nhập thông tin] → [Kết nối AI Grading (nếu có)] 
→ [AI phân tích] → [Hiển thị lộ trình tổng quan] → [Học sinh xác nhận/chỉnh sửa] 
→ [Bắt đầu học Module 1]
```

### Luồng 2: Học sinh làm Quiz — kết quả thấp

```
[Làm Quiz] → [Điểm < ngưỡng] → [AI phân tích điểm yếu] 
→ [Chèn module bổ trợ] → [Thông báo cho học sinh] → [Học sinh học module bổ trợ] 
→ [Tiếp tục lộ trình]
```

### Luồng 3: Học sinh hỏi AI Tutor

```
[Học sinh trong module] → [Mở Chat] → [Nhập câu hỏi] 
→ [AI phân tích context + câu hỏi] → [Trả lời cá nhân hóa] 
→ [Đề xuất hành động tiếp theo]
```

### Luồng 4: Học sinh nghỉ học — AI điều chỉnh lịch

```
[Phát hiện nghỉ > X ngày] → [AI tính toán lại lịch] 
→ [Tạo kế hoạch bù] → [Thông báo + hiển thị kế hoạch mới] 
→ [Học sinh xác nhận]
```

---

## 7. Các tình huống cạnh (Edge Cases)

| Tình huống | Xử lý |
|-----------|-------|
| Học sinh đổi ngày thi | Cho phép cập nhật, AI tính toán lại toàn bộ lộ trình |
| Học sinh muốn bỏ qua một module | Cho phép skip, ghi nhận, AI điều chỉnh nhưng hiển thị cảnh báo |
| AI Grading chưa có dữ liệu | Học sinh tự nhập điểm yếu thủ công |
| Học sinh đạt mục tiêu sớm hơn kế hoạch | AI gợi ý nâng mục tiêu hoặc chuyển sang ôn luyện nâng cao |
| Không đủ nội dung để điền vào lộ trình | Hiển thị lỗi rõ ràng, đề xuất học sinh liên hệ support |

---

## 8. Bối cảnh cạnh tranh (Alternatives & Competitive Landscape)

| Giải pháp thay thế | Cách học sinh giải quyết hiện tại | Điểm yếu mà Teacher AI khai thác |
|---------------------|----------------------------------|----------------------------------|
| Giáo viên gia sư | Học 1-1, đắt tiền, phụ thuộc lịch giáo viên | Chi phí cao, không có 24/7, không scale |
| App IELTS thông thường (IELTS Prep, BC) | Luyện đề, không có lộ trình cá nhân hóa | Không thích nghi, không phân tích điểm yếu |
| YouTube / tự học | Miễn phí nhưng hoàn toàn thiếu cấu trúc | Không có phản hồi, dễ bỏ cuộc |
| Khóa học online cứng nhắc | Có cấu trúc nhưng giống nhau cho mọi học sinh | Không cá nhân hóa, không thích nghi |

---

## 9. Phân tích kỹ thuật & Phụ thuộc (Technical Considerations & Dependencies)

| Thành phần | Mô tả | Phụ thuộc |
|-----------|-------|-----------|
| Input Engine | Form onboarding + API kết nối AI Grading | AI Grading module của WISPACE |
| Roadmap Generator | LLM + rule-based logic tạo lộ trình 2 tầng | Content library (danh sách module sẵn có) |
| Adaptive Engine | Tracking + trigger logic xử lý sự kiện | Database học sinh, hệ thống module |
| AI Tutor / Chat | LLM với context injection (profile + progress học sinh) | Roadmap data, AI Grading data |
| Notification System | Push / In-app notification | Mobile/Web notification infrastructure |

---

## 10. Ước lượng phạm vi (Scope Estimation)

| Module | Kích thước | Nhân lực | Thời gian ước tính |
|--------|-----------|---------|-------------------|
| A – Input Collection | M | 1 BE + 1 FE + 1 Designer | 2-3 tuần |
| B – Roadmap Generation | XL | 1 AI Engineer + 1 BE + 1 FE | 4-6 tuần |
| C – Adaptive Engine | XL | 1 AI Engineer + 1 BE | 4-6 tuần |
| D – AI Tutor & Chat | L | 1 AI Engineer + 1 FE | 3-4 tuần |
| Integration & Testing | M | Toàn team | 2-3 tuần |
| **Tổng** | | | **15-22 tuần (MVP)** |

> **Lưu ý:** Có thể rút ngắn xuống 10-14 tuần nếu Module A và B được làm song song với thiết lập hạ tầng.

---

## 11. Lộ trình Phát hành (Release Roadmap)

### Now — MVP (0-3 tháng)
| Tính năng | Ưu tiên | Mục tiêu |
|-----------|---------|---------|
| Onboarding & Input Collection | P0 | Thu thập dữ liệu đủ để tạo lộ trình |
| Roadmap Generation (tầng 1 + 2) | P0 | Tạo lộ trình cá nhân hóa cơ bản |
| Tracking trạng thái module | P0 | Biết học sinh đang ở đâu |
| AI Chat cơ bản (context-aware) | P1 | Học sinh có người hỏi khi cần |

### Next — Adaptive & Proactive (3-6 tháng)
| Tính năng | Ưu tiên | Ghi chú |
|-----------|---------|---------|
| Adaptive trigger (quiz thấp → bổ trợ) | P0 | Cốt lõi của adaptive learning |
| Adaptive trigger (nghỉ học → tính lại lịch) | P1 | |
| Proactive Nudge (notification) | P1 | Tăng retention |
| CTA thông minh sau mỗi phiên | P2 | |

### Later — Tối ưu & mở rộng (6+ tháng)
- Phân tích nâng cao: dự báo điểm thi dựa trên tiến độ học
- Hỗ trợ kỳ thi khác (TOEIC, SAT...)
- Giao diện cho phụ huynh theo dõi tiến độ
- A/B testing lộ trình để tối ưu tỷ lệ hoàn thành

---

## 12. Câu hỏi mở (Open Questions)

| # | Câu hỏi | Người phụ trách | Hạn trả lời |
|---|---------|----------------|------------|
| 1 | Content library hiện có bao nhiêu module? Đủ để phủ tất cả loại lộ trình? | Content Team | Trước Sprint 1 |
| 2 | Ngưỡng điểm Quiz để trigger bổ trợ là bao nhiêu % — cần A/B test? | AI Engineer + PM | Sprint 2 |
| 3 | Model LLM nào được dùng cho Roadmap Generator và Chat? Giới hạn chi phí mỗi cuộc gọi? | Tech Lead | Trước Sprint 1 |
| 4 | Dữ liệu từ AI Grading được đồng bộ theo real-time hay batch? | BE Lead | Sprint 1 |
| 5 | Học sinh có thể tự điều chỉnh lộ trình thủ công không? Đến mức độ nào? | PM + UX | Trước Design Sprint |
| 6 | KPI retention D30 = 45% — đây là baseline hay target mới? Cần số liệu hiện tại | Data/Analytics | Ngay lập tức |

---

## 13. Rủi ro (Risks)

| Rủi ro | Mức độ | Kế hoạch giảm thiểu |
|--------|--------|---------------------|
| Content library không đủ phong phú để tạo lộ trình đa dạng | Cao | Audit content trước khi build engine |
| Chi phí LLM vượt ngân sách tại scale lớn | Trung bình | Caching lộ trình, giới hạn re-generation |
| Học sinh không tin tưởng lộ trình AI đề xuất | Trung bình | Hiển thị Rationale rõ ràng, cho phép học sinh chỉnh |
| Adaptive logic quá nhạy — thay đổi lộ trình liên tục gây rối | Trung bình | Đặt ngưỡng trigger rõ ràng, giới hạn tần suất điều chỉnh |
| Tích hợp với AI Grading bị delay | Thấp | Cho phép nhập thủ công làm fallback |

---

*Tài liệu này là bản sống — cần được cập nhật sau mỗi design review, sprint scoping, và sau khi ra mắt.*
