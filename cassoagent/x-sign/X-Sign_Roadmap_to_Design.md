# X-Sign Nội Bộ: ROADMAP TO DESIGN (Tháng 4/2026)

> **Mục tiêu:** Hoàn thành Blueprint (SRS + Prototype) để bàn giao Dev bắt đầu code ngày 01/05/2026.
> **Thời gian:** 13/04/2026 → 30/04/2026
> **Output cuối cùng:** (1) SRS v1.0 được BOD chốt, (2) Prototype click-through sẵn sàng Demo.

---

## ⚙️ KIẾN TRÚC HỆ THỐNG X-SIGN (Phải hiểu đúng trước khi thiết kế)

X-sign gồm **2 nền tảng** phối hợp nhau — không phải 1:

| Nền tảng | Vai trò | Người dùng chính |
|---|---|---|
| **KysoQR** | Tạo hợp đồng, cấu hình luồng ký, thiết lập các bên ký, quản lý dashboard | Chủ DN / HR (Admin) |
| **CAS ID** | Nhận yêu cầu ký, hiển thị HĐ để đọc, thực hiện ký số, lưu trữ HĐ | Tất cả người ký |

**Luồng tổng quát:**
```
[Admin] Tạo HĐ trên KysoQR → Cấu hình bên ký → Push sang CAS ID
[Người ký] Nhận thông báo CAS ID → Đọc HĐ trên CAS ID → Ký → Lưu trữ trên CAS ID
```

---

## 🚨 3 BLOCKERS BẮT BUỘC GIẢI QUYẾT TRƯỚC KHI ON AIR

> X-sign **không thể Air nội bộ** nếu chưa chốt cả 3. PM phải ưu tiên research và đưa ra phương án ngay trong tuần đầu tiên.

---

### 🔴 BLOCKER 1 — Tính Tin Cậy & Chống Chối Bỏ (Non-repudiation) Còn Thấp

**Vấn đề:** Anh Điệp yêu cầu nghiên cứu thêm mảng **Timestamp từ các nhà cung cấp CA được cấp phép** để tăng tính pháp lý và chống chối bỏ cho chữ ký.

**Tại sao quan trọng:**
- Không có Timestamp hợp lệ từ TSA (Time Stamp Authority) được cấp phép → hợp đồng có thể bị tranh chấp về thời điểm ký.
- "Chống chối bỏ" là tiêu chí pháp lý bắt buộc theo Luật GDĐT 2023.

**Câu hỏi cần chốt với Khanh + Pháp chế:**
- [ ] CASSO/Hilo đang dùng TSA nào? Có được cấp phép bởi NEAC chưa?
- [ ] Chi phí tích hợp TSA từ Viettel-CA hoặc VNPT-CA là bao nhiêu?
- [ ] Với pilot **nội bộ**, Server Timestamp của CASSO có tạm thời chấp nhận được không?

**Phương án tạm thời nếu chưa chốt được:** Ghi rõ limitation trong SRS: *"Phiên bản nội bộ dùng Server Timestamp nội bộ — chưa có giá trị pháp lý đối ngoại"*.

**Owner:** PM + Khanh + Pháp chế | **Deadline:** Thứ 3, 15/04

---

### 🔴 BLOCKER 2 — Hợp Đồng Phải Hiển Thị & Lưu Trữ Trên CAS ID

**Vấn đề:** Người ký bắt buộc phải **đọc được toàn bộ nội dung HĐ ngay trên CAS ID** trước khi ký. Sau khi ký, HĐ phải được **lưu trữ trong CAS ID** và có thể mở ra xem lại bất kỳ lúc nào.

**Tại sao quan trọng:**
- Đây là yêu cầu pháp lý (người ký phải có cơ hội đọc những gì họ ký).
- Giải quyết **Bug #1 từ meeting 07/04:** *"Ký không có an toàn → lúc ký phải thấy nội dung".*

**Câu hỏi cần chốt với Dev CAS ID:**
- [ ] CAS ID hiện tại có **PDF Viewer** nhúng inline không, hay chỉ download về?
- [ ] Flow "KysoQR push HĐ → CAS ID render PDF" đã hoạt động chưa? Lỗi gì?
- [ ] Storage trên CAS ID: Giới hạn kích thước file? Tốc độ load PDF?

**Mechanism thiết kế bắt buộc:**
```
CAS ID nhận HĐ từ KysoQR
→ Hiển thị PDF Viewer inline (không mở tab mới)
→ "Scroll to unlock": Nút Ký chỉ xuất hiện sau khi kéo đến trang cuối
→ Xác thực → Ký → HĐ lưu vào mục "Tài liệu đã ký" của CAS ID
→ Có thể mở xem lại bất kỳ lúc nào
```

**Owner:** PM + Dev CAS ID | **Deadline:** Thứ 3, 15/04

---

### 🔴 BLOCKER 3 — Giải Pháp Chữ Ký Số Khả Thi Trong Năm 2026

**Vấn đề:** Năm 2026 còn khó triển khai CKS doanh nghiệp đại trà. Chỉ có 2 phương án thực tế:

| Phương án | Ưu điểm | Nhược điểm | Khả thi nội bộ? |
|---|---|---|---|
| **USB Token** | Pháp lý cao, đúng chuẩn CA | Phải phát USB vật lý, không Remote Signing | ⚠️ Phức tạp logistics |
| **CKS nội bộ CASSO do Hilo tạo** | Deploy nhanh, không cần USB | Chỉ có giá trị nội bộ | ✅ Phù hợp nhất cho pilot nội bộ |

**Câu hỏi cần chốt với Anh Điệp + Hilo:**
- [ ] Pilot nội bộ dùng phương án nào? (Hilo CKS hay USB Token?)
- [ ] CKS nội bộ do Hilo tạo có đủ để ký HĐLĐ nội bộ về mặt pháp chế không?
- [ ] Khi ra thị trường (Q4/2026), sẽ chuyển sang CA nào? (Viettel-CA / VNPT-CA?)

**Owner:** PM + Anh Điệp + Hilo team | **Deadline:** Thứ 3, 15/04 (Ưu tiên cao nhất)

---

## ⚠️ ĐIỀU KIỆN ĐỂ BẮT ĐẦU DESIGN

> **Chỉ được vẽ User Flows khi 3 Blockers đã có phương án chốt.** Thiết kế trước khi chốt kỹ thuật = thiết kế lại từ đầu = lãng phí thời gian.

---

## TUẦN 1 (13–18/04): CHỐT BLOCKERS & THU THẬP YÊU CẦU

---

### 📌 VIỆC 0 — Meeting: Chốt 3 Blockers với Anh Điệp & Khanh
**Deadline:** Thứ 3, 15/04 | **Thời gian:** 30 phút | **Owner:** PM

Đặt meeting với Anh Điệp + Khanh, chỉ cần chốt 3 câu hỏi:
1. *"Pilot nội bộ dùng CKS Hilo hay USB Token?"* → Chốt Blocker #3
2. *"CAS ID hiện tại render PDF inline được chưa? KysoQR push sang CAS ID chạy chưa?"* → Chốt Blocker #2
3. *"Tạm thời dùng Server Timestamp CASSO được không, hay phải tích hợp TSA ngay?"* → Chốt Blocker #1

---

### 📌 VIỆC 1 — Nghiên cứu Khung Pháp lý
**Deadline:** Thứ 4, 15/04 | **Owner:** PM

| Câu hỏi | Hỏi ai | Output |
|---|---|---|
| CKS nội bộ do Hilo tạo có đủ giá trị pháp lý để ký HĐLĐ nội bộ không? | Pháp chế | Xác nhận phương án Blocker #3 |
| HĐLĐ nội bộ có cần upload lên Cổng eContract Bộ LĐ-TB-XH không? | Pháp chế | Biết có cần build API Bộ hay không |
| Timestamp Server nội bộ có chấp nhận được cho pilot nội bộ không? | Pháp chế + Khanh | Xác nhận Blocker #1 |
| Hợp đồng sau ký cần lưu trữ tối thiểu bao nhiêu năm? | Pháp chế | Xác định yêu cầu storage trên CAS ID |

---

### 📌 VIỆC 2 — Phỏng vấn HR (Chị Nhã) lấy yêu cầu nghiệp vụ
**Deadline:** Thứ 5, 17/04 | **Thời gian:** 45–60 phút | **Owner:** PM

*(Xem file `Interview_HR_Nha_Questions.md` để có bộ câu hỏi đầy đủ)*

Các thông tin **bắt buộc** phải biết sau buổi này:
- [ ] Quy trình ký HĐLĐ hiện tại từ A–Z mất bao nhiêu ngày?
- [ ] Ai tạo HĐ / Ai duyệt / Ai ký / Ai được xem?
- [ ] Loại hợp đồng nào ký nhiều nhất? (Template nào làm trước?)
- [ ] Pain point lớn nhất của HR trong quy trình hiện tại là gì?

---

### 📌 VIỆC 3 — Khảo sát nhân viên CASSO (End-user)
**Deadline:** Thứ 6, 18/04 | **Format:** Google Form (5 câu, 2 phút)

5 câu hỏi:
1. Bạn thường nhận HĐ qua kênh nào? (Email / Bản in / Zalo?)
2. Điều bạn ghét nhất khi ký giấy tờ là gì?
3. Bạn có dùng điện thoại xử lý công việc hành chính không?
4. Bạn có thoải mái dùng Face ID / xác thực khuôn mặt để ký không?
5. Khi nhận link ký HĐ, bạn thường xử lý trong bao lâu?

---

### ✅ OUTPUT CUỐI TUẦN 1:
- [ ] 3 Blockers đã có phương án chốt (email/note xác nhận từ Anh Điệp + Khanh).
- [ ] Bảng xác nhận pháp lý từ pháp chế.
- [ ] Meeting notes phỏng vấn chị Nhã.
- [ ] Kết quả khảo sát nhân viên (≥ 10 người).

---

## TUẦN 2 (21–25/04): USER FLOWS & WIREFRAMES

---

### 📌 VIỆC 4 — Vẽ 3 User Flows
**Deadline:** Thứ 3, 22/04 | **Tool:** Miro / FigJam

**Luồng 1 — HR/Chủ DN tạo và phát hành HĐ trên KysoQR:**
```
Đăng nhập KysoQR → Chọn template HĐLĐ → Điền thông tin
→ Preview HĐ → Ký bằng CKS (Hilo hoặc USB Token)
→ Thêm danh sách người ký → Push sang CAS ID → Done
```

**Luồng 2 — Nhân viên nhận và ký HĐ trên CAS ID:**
```
Nhận Push Notification / Email từ CAS ID
→ Mở CAS ID → Thấy HĐ mới từ KysoQR
→ Đọc PDF inline (Scroll to unlock)
→ Xác thực (Face ID / CKS) → Ký
→ HĐ lưu vào "Tài liệu đã ký" → Done
```

**Luồng Fallback — Nhân viên chưa có CAS ID:**
```
Nhận Email link → Mở trình duyệt → Đăng ký CAS ID nhanh (SĐT + CCCD eKYC)
→ Tiếp tục Luồng 2 như bình thường
```

**Luồng 3 — HR theo dõi tiến trình trên KysoQR:**
```
KysoQR Dashboard → Filter HĐ theo trạng thái
(Draft / Pending / Signed / Expired)
→ Gửi Reminder thủ công → Tải PDF đã ký → Done
```

---

### 📌 VIỆC 5 — Chốt Technical Feasibility với Khanh
**Deadline:** Thứ 3, 22/04 | **Thời gian:** 45 phút

| Câu hỏi | Lý do cần chốt |
|---|---|
| Flow "KysoQR push HĐ → CAS ID render PDF" — chi tiết API và trạng thái hiện tại? | Ảnh hưởng Blocker #2 — thiết kế PDF Viewer |
| CKS Hilo tích hợp vào flow ký trên CAS ID như thế nào? | Ảnh hưởng Blocker #3 — thiết kế màn hình xác thực |
| Nhân viên chưa có CAS ID → hệ thống tự tạo được không? | Ảnh hưởng Fallback flow |

---

### 📌 VIỆC 6 — Wireframes 7 màn hình ưu tiên
**Deadline:** Thứ 6, 25/04 | **Tool:** Figma

| # | Nền tảng | Màn hình | Mô tả |
|---|---|---|---|
| 1 | CAS ID | Onboarding Welcome | "Chào [Tên] đến với CASSO" — Lời nhắn CEO |
| 2 | CAS ID | Trang nhận HĐ mới | Thẻ HĐ với thông tin cơ bản + CTA "Xem & Ký" |
| 3 | CAS ID | **PDF Viewer** | Inline PDF với progress bar + Scroll-to-unlock **(Blocker #2)** |
| 4 | CAS ID | Màn hình xác thực | Face ID / CKS prompt (thiết kế linh hoạt cho cả Hilo và USB Token) **(Blocker #3)** |
| 5 | CAS ID | Ký thành công | Confetti + "HĐ đã lưu vào CAS ID của bạn" |
| 6 | KysoQR | Dashboard HR | Bảng HĐ + trạng thái + nút Reminder |
| 7 | KysoQR | Tạo HĐ | Template picker + Form điền + Preview |

---

### ✅ OUTPUT CUỐI TUẦN 2:
- [ ] 3 User Flows hoàn chỉnh (Happy path + Error path) đã review với Khanh.
- [ ] Technical Feasibility đã chốt với Dev.
- [ ] 7 Wireframes trên Figma.

---

## TUẦN 3 (28–30/04): PROTOTYPE & CHỐT SRS

---

### 📌 VIỆC 7 — Nâng cấp lên Interactive Prototype
**Deadline:** Thứ 4, 29/04 | **Tool:** Figma

**Yêu cầu Prototype:**
- Click được qua kịch bản Demo 3 bước: **Cấp CKS → Lưu bút ký → Ký số tài liệu**.
- Phải có màn hình PDF Viewer với cơ chế Scroll-to-unlock (Blocker #2 phải được thể hiện rõ).
- Màn hình xác thực phải có 2 variant: Hilo CKS và USB Token (Blocker #3).
- Tông màu và font chuẩn Brand CASSO.

---

### 📌 VIỆC 8 — Viết SRS Document
**Deadline:** Thứ 4, 29/04

**Cấu trúc SRS:**
```
1. GIỚI THIỆU
   - Scope: Nội bộ CASSO, không bán ra ngoài
   - Kiến trúc: KysoQR (tạo HĐ) + CAS ID (ký & lưu trữ)
   - Loại CKS: [Điền kết quả Blocker #3]

2. FUNCTIONAL REQUIREMENTS
   - FR-01: Tạo HĐ từ template trên KysoQR
   - FR-02: Push HĐ từ KysoQR sang CAS ID
   - FR-03: PDF Viewer inline trên CAS ID (Scroll-to-unlock)
   - FR-04: Ký số bằng CKS Hilo / USB Token
   - FR-05: Lưu trữ HĐ đã ký trên CAS ID (có thể xem lại)
   - FR-06: Dashboard trạng thái HĐ trên KysoQR
   - FR-07: Gửi Reminder thủ công
   - FR-08: Fallback ký qua link cho người chưa có CAS ID

3. NON-FUNCTIONAL REQUIREMENTS
   - NFR-01: Hoàn thành 1 luồng ký < 5 phút
   - NFR-02: Mobile (iOS + Android) + Desktop
   - NFR-03: File sau ký không thể chỉnh sửa (PDF/A)
   - NFR-04: Timestamp [TSA hoặc Server — tùy kết quả Blocker #1]
   - NFR-05: Lưu vết đầy đủ (IP, device, thời gian, phương thức xác thực)

4. OUT OF SCOPE (Phiên bản nội bộ — làm sau)
   - Bulk signing → T7/2026
   - Slack/Google Workspace integration → T7/2026
   - API cho bên thứ 3 → T10/2026
   - TSA bên ngoài được cấp phép → cần xác nhận timeline
```

---

### 📌 VIỆC 9 — Demo & Chốt với BOD
**Deadline:** Thứ 5, 30/04 | **Thời gian:** 45 phút

**Checklist buổi review:**
- [ ] Demo Prototype 3 bước cho Anh Điệp.
- [ ] Trình bày SRS: Tính năng đã chốt + OUT OF SCOPE (và lý do).
- [ ] Báo cáo kết quả giải quyết 3 Blockers.
- [ ] Xin sign-off: *"Anh đồng ý cho Dev bắt đầu code từ 01/05 không?"*

---

### ✅ OUTPUT CUỐI THÁNG 4 = HOÀN TẤT ROADMAP TO DESIGN:
- [ ] **SRS v1.0** được BOD sign-off.
- [ ] **Prototype v1.0** click-through — sẵn sàng bàn giao Dev.
- [ ] **3 Blockers** đã có phương án rõ ràng, ghi vào SRS.
- [ ] **Kickoff meeting Dev** đã lên lịch cho ngày 01/05/2026.

---

## TỔNG HỢP TIMELINE

| Tuần | Ngày | Việc | Deadline | Output |
|---|---|---|---|---|
| **Tuần 1** | 13–18/04 | ⚡ Chốt 3 Blockers với Anh Điệp + Khanh | **T3, 15/04** | Phương án chốt bằng văn bản |
| | | Nghiên cứu pháp lý | T4, 16/04 | Bảng xác nhận pháp lý |
| | | Phỏng vấn HR chị Nhã | T5, 17/04 | Meeting notes nghiệp vụ |
| | | Khảo sát nhân viên | T6, 18/04 | Kết quả survey ≥ 10 người |
| **Tuần 2** | 21–25/04 | Vẽ 3 User Flows | T3, 22/04 | Flows trên Miro/FigJam |
| | | Chốt Tech Feasibility với Khanh | T3, 22/04 | 3 câu hỏi kỹ thuật được giải đáp |
| | | Wireframes 7 màn hình | T6, 25/04 | Figma wireframe |
| **Tuần 3** | 28–30/04 | Interactive Prototype | T4, 29/04 | Figma prototype click-through |
| | | SRS Document | T4, 29/04 | SRS v1.0 draft |
| | | **Demo & Chốt BOD** | **T5, 30/04** | **Sign-off → Bàn giao Dev 01/05** |
