# User Stories & Acceptance Criteria — X-Clock-in (CASSO Internal)

---

Version: 1.0
Last updated: 2026-04-24
Status: Draft
Owner: PM

---

### Changelog

| Version | Date       | Author | Change summary   |
|---------|------------|--------|------------------|
| 1.0     | 2026-04-24 | PM     | Initial draft    |

---

## Bối cảnh & Vấn đề thị trường

**Identifying the Market Need**

| Insight | Ai gặp? | Pain | Desired Outcome |
|--------|---------|------|-----------------|
| Nhân viên đi trễ do thiếu Awareness, không phải cố ý chống đối | CEO (Anh Điệp) | Phải nhắc nhở miệng liên tục; không khí buổi sáng căng thẳng | Nhân viên tự giác tới trước 8h vì thích thú (Intrinsic Motivation) |
| Hệ thống chấm công truyền thống dễ lỗi với edge cases (khẩu trang, nhiều người vào cùng lúc) | PM / Kỹ thuật | Hệ thống bị bypass, cảm giác "nửa vời", đứt gãy dữ liệu | Chạy mượt mọi trường hợp, đồng bộ real-time |
| GenZ làm việc vì cảm xúc và sự tự hào, không chỉ vì lương | Nhân viên (GenZ) | Chấm công như việc hành chính vô hồn, bị kiểm soát | Buổi sáng vui vẻ, được vinh danh công khai, có "content" khoe bạn bè |

---

## Stakeholders — DACI Matrix

| Role        | Ai                       | Trách nhiệm                                         |
|-------------|--------------------------|------------------------------------------------------|
| Driver      | PM                       | Sở hữu tài liệu, dẫn dắt quyết định                |
| Approver    | CEO (Anh Điệp)           | Phê duyệt cuối cùng                                 |
| Contributor | Kỹ thuật / DevOps        | Input kỹ thuật, IoT, Lark API                       |
| Informed    | Toàn bộ nhân viên CASSO  | Người dùng cuối, không tham gia quyết định sản phẩm |

---

## EPIC & User Stories

---

### EPIC 1 — Auto Check-in qua WiFi (Zero-friction)

> **Mục tiêu:** Nhân viên được ghi nhận chấm công tự động khi bước vào vùng phủ sóng WiFi công ty, không cần thao tác thủ công.

---

#### US-01 — Tự động ghi nhận chấm công khi kết nối WiFi

**As a** nhân viên CASSO,
**I want** hệ thống tự động nhận diện và ghi nhận thời gian vào làm của tôi khi điện thoại kết nối WiFi công ty,
**So that** tôi không phải mở app hay bấm nút gì, và thời gian được ghi nhận chính xác ngay khi tôi bước vào văn phòng.

**Acceptance Criteria:**

```
Scenario 1: Nhân viên kết nối WiFi trước 8:00
Given nhân viên có điện thoại đã đăng ký trong hệ thống
When điện thoại kết nối vào BSSID WiFi của CASSO vào lúc 7:45
Then hệ thống ghi nhận timestamp check-in là 7:45 (lấy từ Local IoT Server, không phải Lark Server)
And trạng thái nhân viên đó được cập nhật là "Đúng giờ" trên Lark

Scenario 2: Nhân viên kết nối WiFi sau 8:00
Given nhân viên có điện thoại đã đăng ký trong hệ thống
When điện thoại kết nối vào WiFi CASSO lúc 8:15
Then hệ thống ghi nhận timestamp check-in là 8:15
And trạng thái là "Đi trễ" và được báo cáo trong Lark

Scenario 3: Timestamp chính xác từ Local IoT
Given Lark Server có thể bị lag 2–5 giây
When hệ thống nhận tín hiệu WiFi từ router
Then timestamp được lấy từ Local IoT Server (Smart Door / Router)
And timestamp này là giá trị gốc, không bị ghi đè bởi server time của Lark
```

---

#### US-02 — Xử lý nhiều nhân viên vào cùng lúc

**As a** kỹ sư hệ thống,
**I want** hệ thống xử lý đồng thời nhiều nhân viên bước vào trong cùng một khoảng thời gian,
**So that** không ai bị bỏ sót hoặc nhận sai timestamp khi đi cùng nhóm.

**Acceptance Criteria:**

```
Scenario 1: 3 người vào cùng lúc
Given 3 nhân viên A, B, C đều kết nối WiFi trong vòng 5 giây
When hệ thống nhận 3 tín hiệu BSSID gần như đồng thời
Then cả 3 đều được ghi nhận check-in với timestamp riêng biệt, chính xác
And không có xung đột dữ liệu hoặc mất bản ghi nào

Scenario 2: Tải cao buổi sáng (8:00 ± 5 phút)
Given đây là khung giờ cao điểm, ~80% nhân viên vào trong 10 phút
When hệ thống nhận nhiều tín hiệu đồng thời
Then queue xử lý không bị tắc nghẽn
And mọi check-in hoàn thành trong vòng 3 giây kể từ khi kết nối WiFi
```

---

### EPIC 2 — Smart Door Backup (Dự phòng)

> **Mục tiêu:** Khi WiFi lỗi hoặc điện thoại nhân viên hết pin, hệ thống quẹt thẻ từ là phương án dự phòng luôn sẵn sàng.

---

#### US-03 — Check-in bằng thẻ từ khi WiFi không hoạt động

**As a** nhân viên CASSO,
**I want** có thể quẹt thẻ từ tại cửa để được ghi nhận chấm công khi WiFi không hoạt động hoặc điện thoại hết pin,
**So that** tôi luôn được ghi nhận chính xác dù công nghệ chính gặp sự cố.

**Acceptance Criteria:**

```
Scenario 1: WiFi lỗi, nhân viên quẹt thẻ
Given hệ thống phát hiện WiFi router offline
When nhân viên quẹt thẻ tại Smart Door
Then hệ thống ghi nhận check-in bằng timestamp từ Smart Door Controller
And Smart TV cập nhật trạng thái real-time trong vòng 2 giây sau khi quẹt thẻ

Scenario 2: Điện thoại hết pin
Given điện thoại nhân viên không kết nối được WiFi
When nhân viên quẹt thẻ
Then check-in được ghi nhận, đồng bộ lên Lark khi kết nối được phục hồi
And dữ liệu không bị mất dù có delay đồng bộ

Scenario 3: Cả WiFi và Smart Door đều lỗi
Given cả hai hệ thống cùng sập
Then hệ thống log lỗi với alert gửi tới kênh Lark của kỹ thuật trong vòng 1 phút
And admin có thể nhập check-in thủ công sau đó
```

---

#### US-04 — Quẹt thẻ là trải nghiệm cảm xúc, không phải thủ tục

**As a** nhân viên CASSO,
**I want** khi quẹt thẻ được nghe âm thanh vui tai và thấy phản hồi từ Mascot,
**So that** hành động này cảm giác thú vị thay vì như đang "điểm danh" ở cơ quan nhà nước.

**Acceptance Criteria:**

```
Scenario 1: Quẹt thẻ thành công
Given nhân viên quẹt thẻ tại Smart Door
When thẻ được nhận diện hợp lệ
Then loa tại cửa phát âm thanh "Kaching!" hoặc âm thanh vui tai trong vòng 0.5 giây
And Smart TV hiển thị Mascot chị Nhã chào tên nhân viên

Scenario 2: Quẹt thẻ không hợp lệ / thẻ lạ
Given có người dùng thẻ không đăng ký
When thẻ được đưa vào đầu đọc
Then hệ thống không mở cửa, không phát âm thanh chào mừng
And log sự kiện cho admin
```

---

### EPIC 3 — Mascot Dashboard trên Smart TV

> **Mục tiêu:** Smart TV tại sảnh biến hành động chấm công thành trải nghiệm văn hóa — nhân viên được chào đón cá nhân hóa bởi Mascot chị Nhã.

---

#### US-05 — Smart TV hiển thị chào hỏi cá nhân hóa & Avatar

**As a** nhân viên CASSO,
**I want** được Smart TV chào đích danh tên mình và hiển thị hình ảnh (Avatar) của tôi cùng Mascot chị Nhã khi vào văn phòng,
**So that** tôi cảm thấy được chào đón một cách đầy tự hào thay vì bị kiểm soát.

**Acceptance Criteria:**

```
Scenario 1: Chào theo khung giờ trước 8:00
Given nhân viên check-in trước 8:00
When hệ thống nhận sự kiện check-in
Then Smart TV hiển thị "Chào [Tên], sớm thế! Chị Nhã pha cafe chờ nãy giờ rồi!"
And màn hình nổi bật hình ảnh (Avatar) của nhân viên cùng animation Mascot trong vòng 1 giây

Scenario 2: Chào theo khung giờ sau 8:00
Given nhân viên check-in sau 8:00
When hệ thống nhận sự kiện check-in
Then Smart TV hiển thị hình ảnh của nhân viên kèm lời chào hài hước phù hợp
Ví dụ: "Ồ [Tên]! Chị Nhã tưởng hôm nay em nghỉ phép rồi chứ 😄"

Scenario 3: Lời chào random mỗi ngày
Given cùng một nhân viên check-in các ngày khác nhau
When hệ thống xử lý check-in
Then lời chào được random từ pool câu có sẵn (tối thiểu 10 câu)
And không lặp lại câu đã dùng hôm trước cho cùng một nhân viên
```

---

#### US-06 — Loading Animation khi hệ thống chờ nhận diện

**As a** nhân viên CASSO,
**I want** thấy animation vui vẻ của Mascot khi hệ thống đang xử lý,
**So that** tôi không nghĩ hệ thống bị đơ trong khoảng delay 5–10 giây từ WiFi.

**Acceptance Criteria:**

```
Scenario 1: Độ trễ WiFi (5–10 giây)
Given điện thoại vừa kết nối WiFi nhưng Lark API chưa xác nhận
When hệ thống phát hiện kết nối nhưng chưa ghi nhận check-in
Then Smart TV hiển thị animation "Chị Nhã đang pha cafe, chờ chút nha..."
And animation tiếp tục cho đến khi check-in xác nhận thành công

Scenario 2: Xác nhận thành công sau delay
Given animation loading đang chạy
When check-in được xác nhận
Then animation chuyển ngay sang màn hình chào hỏi cá nhân hóa
And transition mượt mà, không bị giật
```

---

### EPIC 4 — Streak & Leaderboard (Gamification)

> **Mục tiêu:** Biến việc đi đúng giờ thành "cuộc chơi" tự nguyện, kích thích tính thi đấu lành mạnh trong team GenZ.

---

#### US-07 — Xem bảng xếp hạng "Chiến thần đúng giờ"

**As a** nhân viên CASSO,
**I want** xem bảng xếp hạng những người đến sớm nhất trong tuần trên Smart TV,
**So that** tôi có động lực đi sớm hơn để được vinh danh trước toàn team.

**Acceptance Criteria:**

```
Scenario 1: Hiển thị leaderboard hàng tuần
Given cuối ngày thứ Sáu hàng tuần
When hệ thống tổng hợp dữ liệu check-in 5 ngày
Then Smart TV hiển thị Top 3 "Chiến thần đúng giờ tuần này"
And thứ tự dựa trên: (1) số ngày đúng giờ, (2) giờ check-in sớm nhất trung bình

Scenario 2: Tie-break
Given hai nhân viên có cùng số ngày đúng giờ
When hệ thống tính xếp hạng
Then người có giờ check-in sớm hơn (trung bình cả tuần) được xếp trên
```

---

#### US-08 — Theo dõi Streak cá nhân

**As a** nhân viên CASSO,
**I want** biết mình đang có chuỗi (streak) đi đúng giờ bao nhiêu ngày liên tiếp,
**So that** tôi không muốn "gãy chuỗi" và tiếp tục duy trì thói quen.

**Acceptance Criteria:**

```
Scenario 1: Duy trì streak
Given nhân viên đã có streak 5 ngày liên tiếp đúng giờ
When nhân viên check-in trước 8:00 ngày hôm nay
Then streak tăng lên 6
And Smart TV hiển thị "🔥 [Tên] — 6 ngày liên tiếp! Đỉnh quá!"

Scenario 2: Gãy streak
Given nhân viên có streak 7 ngày
When nhân viên check-in sau 8:00
Then streak bị reset về 0
And Smart TV hiển thị lời động viên vui vẻ: "[Tên] hôm nay trễ rồi, ngày mai bắt đầu streak mới thôi!"
And không có thông báo phạt hay chỉ trích

Scenario 3: Không check-in (nghỉ phép / làm việc ngoài)
Given nhân viên đã được admin đánh dấu "Nghỉ phép hợp lệ"
When ngày đó kết thúc
Then streak không bị reset (ngày nghỉ phép hợp lệ không tính gãy streak)
```

---

### EPIC 5 — Quản lý & Báo cáo (Admin / CEO)

> **Mục tiêu:** CEO và HR có dashboard rõ ràng về kỷ luật giờ giấc mà không cần nhắc nhở miệng.

---

#### US-09 — Xem báo cáo chấm công tổng hợp

**As a** CEO (Anh Điệp),
**I want** xem báo cáo chấm công của toàn team theo tuần/tháng trên Lark,
**So that** tôi biết tình trạng kỷ luật mà không cần hỏi HR hay nhắc nhở trực tiếp.

**Acceptance Criteria:**

```
Scenario 1: Báo cáo tuần tự động
Given cuối ngày thứ Sáu
When hệ thống tổng hợp dữ liệu tuần
Then một báo cáo tự động được gửi vào kênh Lark của CEO
And báo cáo bao gồm: tổng số lần đúng giờ/trễ, top 3 đi sớm, danh sách đi trễ >3 lần

Scenario 2: Xem chi tiết từng nhân viên
Given CEO mở báo cáo tháng
When CEO chọn xem chi tiết một nhân viên
Then hệ thống hiển thị lịch check-in từng ngày, streak lớn nhất, số ngày đúng giờ/trễ

Scenario 3: Dữ liệu real-time
Given CEO muốn biết buổi sáng hôm nay ai đã vào
When CEO mở dashboard lúc 8:30
Then hệ thống hiển thị danh sách nhân viên đã check-in tính đến thời điểm đó, real-time
```

---

#### US-10 — Admin nhập check-in thủ công khi hệ thống lỗi

**As a** HR / Admin,
**I want** có thể nhập check-in thủ công cho nhân viên trong trường hợp hệ thống IoT gặp sự cố,
**So that** dữ liệu chấm công luôn đầy đủ và công bằng cho nhân viên.

**Acceptance Criteria:**

```
Scenario 1: Nhập check-in thủ công
Given hệ thống IoT bị lỗi trong khoảng 8:00–8:30
When admin mở giao diện quản trị và nhập check-in cho nhân viên A với timestamp 8:05
Then hệ thống ghi nhận check-in với ghi chú "Manual entry by admin"
And dữ liệu được đồng bộ lên Lark với flag "Manual"

Scenario 2: Audit trail
Given admin đã nhập một bản ghi thủ công
When CEO/HR xem lịch sử
Then mỗi bản ghi thủ công đều hiển thị tên admin đã nhập và thời điểm nhập
And không thể xóa bản ghi đã đồng bộ lên Lark, chỉ có thể chỉnh sửa với ghi chú lý do
```

---

#### US-11 — Admin quản lý hình ảnh (Avatar) nhân viên

**As a** HR / Admin,
**I want** có thể tải lên (upload) và quản lý hình ảnh chân dung của từng nhân viên trên hệ thống quản trị,
**So that** khi nhân viên check-in, Smart TV có thể hiển thị ảnh của họ cùng với lời chào, giúp tăng tính cá nhân hóa và sự thích thú.

**Acceptance Criteria:**

```
Scenario 1: Upload ảnh thành công
Given admin truy cập vào trang quản lý profile nhân viên
When admin tải lên một hình ảnh (JPG/PNG, <5MB) cho nhân viên A
Then hệ thống tự động crop ảnh theo tỷ lệ chuẩn (vuông/tròn) và lưu trữ thành công
And ảnh này lập tức khả dụng để hiển thị trên Smart TV khi nhân viên A check-in

Scenario 2: Nhân viên chưa có ảnh
Given nhân viên B chưa được admin upload ảnh
When nhân viên B check-in tại Smart TV
Then hệ thống hiển thị Avatar mặc định (Placeholder) hoặc chữ cái đầu của tên (VD: "B")
And layout màn hình không bị vỡ do thiếu ảnh
```

---

## Prioritization — RICE Scoring

| User Story | Reach | Impact | Confidence | Effort (người-tuần) | RICE Score | Priority |
|------------|-------|--------|------------|---------------------|------------|----------|
| US-01 Auto WiFi check-in | 30 | 3 | 80% | 2 | 36 | P0 |
| US-05 Mascot chào cá nhân hóa | 30 | 2 | 90% | 1 | 54 | P0 |
| US-03 Smart Door backup | 30 | 3 | 90% | 1.5 | 54 | P0 |
| US-06 Loading animation | 30 | 2 | 80% | 0.5 | 96 | P0 |
| US-07 Leaderboard | 30 | 2 | 70% | 1 | 42 | P1 |
| US-08 Streak cá nhân | 30 | 2 | 80% | 1 | 48 | P1 |
| US-09 Báo cáo CEO | 5 | 3 | 80% | 1.5 | 8 | P2 |
| US-10 Manual check-in | 3 | 3 | 100% | 1 | 9 | P2 |
| US-02 Concurrent users | 30 | 3 | 90% | 2 | 40.5 | P0 |
| US-04 Quẹt thẻ vui | 30 | 2 | 70% | 0.5 | 84 | P1 |
| US-11 Quản lý Avatar | 30 | 2 | 90% | 0.5 | 108 | P1 |

> **Ghi chú:** RICE Score = (Reach × Impact × Confidence) / Effort. Effort tính bằng người-tuần toàn hàm (PM + Design + Eng).

---

## Roadmap — Now / Next / Later

**Theme Q2-2026:** Zero-friction Check-in + Culture Experience
**OKR link:** Cải thiện tỷ lệ đúng giờ từ ~40% lên 75% trong 60 ngày mà không dùng cơ chế phạt tiền.

### Now (đang triển khai)

| Initiative | Owner | Success metric | Status |
|------------|-------|----------------|--------|
| US-01 Auto WiFi check-in | Kỹ thuật | 95% nhân viên được ghi nhận tự động | Backlog |
| US-03 Smart Door backup | Kỹ thuật | 0 mất bản ghi khi WiFi lỗi | Backlog |
| US-05 Mascot chào & hiển thị Avatar | Design + Dev | 100% check-in có animation và Avatar trong <1s | Backlog |
| US-06 Loading animation | Design | Không ai phản hồi hệ thống "bị đơ" | Backlog |
| US-11 Quản lý Avatar | Kỹ thuật | CMS hoạt động mượt mà cho HR tải ảnh | Backlog |

### Next (sẵn sàng sau Phase 1 ổn định)

| Initiative | Why now | OKR link | Dependency |
|------------|---------|----------|------------|
| US-07 Leaderboard | Kích thích thi đấu sau khi data đủ 2 tuần | OKR đúng giờ | US-01 live |
| US-08 Streak | Tạo habit loop dài hạn | OKR đúng giờ | US-01 live |
| US-04 Quẹt thẻ vui | Nâng trải nghiệm dự phòng | Culture OKR | US-03 live |

### Later (định hướng, chưa cam kết)

- Camera AI nhận diện khuôn mặt (xử lý edge case khẩu trang)
- Mobile app nhân viên xem streak và leaderboard cá nhân
- Tích hợp cảm xúc check-in ("Hôm nay bạn đến với mood gì?")
- Phiên bản External — bán giải pháp cho công ty GenZ khác

---

## Non-Goals (Không thuộc phạm vi Phase 1)

- **Không có cơ chế phạt tiền** — hệ thống không tự động trừ lương hay thưởng dựa trên check-in
- **Không có camera AI nhận diện khuôn mặt** — Phase 1 dùng WiFi BSSID + Smart Door card
- **Không có app mobile riêng** — trải nghiệm chính là Smart TV + Lark
- **Không public ra ngoài** — chỉ nội bộ CASSO, không white-label trong Phase 1

---

## Open Questions

| # | Câu hỏi | Owner | Deadline |
|---|---------|-------|----------|
| 1 | WiFi BSSID có đủ chính xác để phân biệt "đã vào văn phòng" vs "đứng ngoài hành lang"? | Kỹ thuật | Tuần 1 |
| 2 | Pool lời chào Mascot (10+ câu) — ai viết content? PM hay CEO duyệt tone? | PM + CEO | Tuần 1 |
| 3 | Nghỉ phép hợp lệ được nhập từ đâu? HR nhập thủ công hay sync từ Lark Leave? | HR + Kỹ thuật | Tuần 2 |
| 4 | Leaderboard có hiển thị tên thật hay nickname? (Privacy consideration cho người hay đi trễ) | CEO | Tuần 2 |
| 5 | Smart TV dùng hệ điều hành gì? Cần biết để chọn tech stack hiển thị | Kỹ thuật | Tuần 1 |
