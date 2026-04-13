# Yêu cầu cụ thể (Specific Requirements) cho X-sign: Phiên bản Nội bộ (Internal Pilot)

Phiên bản đầu tiên của X-sign (Pilot nội bộ) đóng vai trò là "chuột bạch" nhằm xác thực luồng ký số, trải nghiệm người dùng, và độ ổn định của hệ thống trước khi rollout cho đối tác & khách hàng đại trà. Nền tảng lõi: **KysoQR**, định danh bởi: **CAS ID**.

## 1. Mục tiêu kinh doanh & đối tượng sử dụng
* **Mục tiêu:** Mọi nhân sự CASSO và Ban Giám Đốc (BOD) có thể sử dụng X-sign để ký kết hợp đồng lao động, thỏa thuận bảo mật (NDA), và các quyết định, văn bản nội bộ.
* **Người dùng (Personas):**
  * **Nhân sự mới (New Hire):** Cần trải nghiệm mượt mà *"Chào mừng đến CASSO -> Đọc thông điệp -> Ký hợp đồng lao động điện tử"*.
  * **Nhân sự hiện tại:** Ký phụ lục, nhận và lưu trữ văn bản pháp lý cá nhân.
  * **BOD/HR:** Phát hành hợp đồng, quản lý tiến trình ký, lưu trữ tài liệu đã ký số an toàn.

## 2. Yêu cầu tính năng cốt lõi (Must-haves)
Dựa trên bối cảnh cuộc họp ngày 07/04/2026:

### a. Tài khoản & Định danh chữ ký (Tích hợp CAS ID)
* Cấp phát tự động 1 Chữ ký số cá nhân (hoặc CKS doanh nghiệp nội bộ) cho nhân viên ngay trong ngày đầu tiên làm việc.
* Quản lý định danh (Identity) và Chữ ký số hoàn toàn thông qua CAS ID.
* Hỗ trợ lưu trữ "Bút ký" hoán đổi (chữ ký tay được scan) cho các văn bản nội bộ dạng quyết định thông thường.

### b. Trải nghiệm Ký số (Signing Experience)
* **Quy trình onboarding đặc quyền:** Luồng UX dành cho nhân viên với thông điệp *"Chào CASSO -> Nhận thông điệp truyền cảm hứng -> Ký"*.
* **An toàn ký kết (Critical Bug Fix):** Khi người dùng đặt bút/chữ ký số, **hệ thống bắt buộc phải hiển thị nội dung tài liệu** đang được ký. Người ký phải đọc được họ đang ký cái gì trước khi xác thực mã OTP/PIN.
* **Remote Signing:** Yêu cầu ký trực tiếp trên thiết bị (Mobile/Web) mà không cần dùng đến USB Token truyền thống.

### c. Lưu trữ và Quản trị (Storage & Management)
* **Lưu trữ bảo mật:** Document sau khi ký thành công phải được lưu trữ chuẩn xác gắn với tài khoản cá nhân trên CAS ID (hoặc CASSO Account).
* Tracking tình trạng hợp đồng: Phân biệt rõ Nháp (Draft), Đang chờ ký (Pending), Đã ký (Signed).

### d. Yêu cầu cho giai đoạn kế tiếp (To be discussed soon)
* Luồng phê duyệt (Approval workflow) được tích hợp qua Slack, Google Workspace để BOD không phải mở app.
* Ký hàng loạt (Bulk signing) cho HR phát hành thông báo tăng lương kỳ review.

---

# Các bước thực hiện Blueprint (SRS & Prototype) cho X-sign Nội Bộ

Thiết kế Blueprint, tức là đi vào **Roadmap to Design**, yêu cầu PM cân bằng giữa sự chặt chẽ của pháp luật và tính khả dụng của phần mềm. Dưới đây là các bước để hoàn thiện SRS và Prototype chuẩn xác theo yêu cầu.

## Bước 1: Khảo sát & Thu thập Yêu cầu (Requirements Gathering) sâu
Để tài liệu tránh bị "thiếu góc nhìn", bạn cần làm việc xoay vòng với 3 stakeholders:

1. **Pháp lý (Legal Compliance):**
   * Đọc **Nghị định 337/2025** về hợp đồng lao động điện tử (deadiline 1/7/2026). Check với bộ phận pháp chế: Với nội bộ, nền tảng lưu trữ CKS hiện tại đã đủ chuẩn để coi là chữ ký hợp pháp hay chưa? (Loại chữ ký nào: cấp 1, 2, hay 3 theo Luật GDĐT 2023?).
   * Yêu cầu lưu vết thời gian (Timestamp) và tính toàn vẹn của file (không bị sửa đổi sau ký).
2. **Nhu cầu của Công Ty & BOD:**
   * Tổ chức meeting ngắn (15-30p) với HR và Sep.
   * Hỏi: Flow hiện tại ký hợp đồng lao động mất bao lâu? Điều gì cản trở BOD ký nhanh nhất? Trả lời được để tích hợp Slack/Google.
3. **Nhu cầu của Nhân Viên (End-user):**
   * Tham khảo UI/UX của các tool xịn như DocuSign, PandaDoc, kết hợp với nhận diện "CASSO Vibe". Ngôn từ cần trẻ trung, thân thiện.

## Bước 2: Thiết kế User Flows (Luồng người dùng)
* Tách bạch làm 3 luồng chính:
  1. Luồng cấp phép CKS (CAS ID API -> User).
  2. Luồng HR/BOD gửi tài liệu yêu cầu ký.
  3. Luồng Nhân viên xem ("nhận thông điệp") và ký tài liệu.
* Tạo các sơ đồ flowchart trên Miro/Figma, chốt flow với team Tech xem có vướng "Bug #1 - hiển thị an toàn" và "Bug #2 - lưu trữ CAS ID" hay không.

## Bước 3: Phát triển Wireframes & Interactive Prototypes (Làm đẹp UI/UX)
* Phối hợp cùng UI/UX Designer:
  * Từ sơ đồ khung, biến thành giao diện có tông màu chuẩn (Premium SaaS).
  * **Trick "Đẹp":** Ở bước nhân viên nhận hợp đồng thay vi hiện cái PDF khô khan, hãy thiết kế màn hình `Welcome {Name}` với avatar, lời chào từ CEO, sau đó mới đến khu vực xem nội dung PDF có chức năng "Scroll to bottom to sign".
  * Tạo prototype khả năng tương tác (Click vào được) chuyển lên cho Sep và BOD xem trước thứ 6.

## Bước 4: Soạn thảo SRS (Software Requirements Specification) Document
* Bắt đầu viết chi tiết các requirement đã thống nhất thành tài liệu chuẩn.
* **Cấu trúc SRS cơ bản cho X-sign:**
  * Giới thiệu (Scope, User roles).
  * Functional Requirements (Cấp chữ ký, Trình ký, Duyệt ký, Lưu trữ).
  * Non-Functional Requirements (Performance dưới 5 phút, Bảo mật Data encrypt, Tính tương thích thiết bị Mobile/Desktop).
  * Logic điều kiện (Vd: Không đọc hết trang cuối không cho click Ký). 
* Có SRS, lúc này mới đẩy sang **Roadmap to Develop** cho team Engineering vào Sprint.
