# FRAMEWORK VIẾT FRS/SPEC TRONG KỶ NGUYÊN AI (AI-FIRST PM)

Trong thời đại "Vibe Coding" (sử dụng AI như Cursor, GitHub Copilot để sinh code), tư duy phân loại dự án thành Size **S - M - L** là chiến lược chia để trị cực kỳ hiệu quả nhằm tránh việc AI bị quá tải ngữ cảnh (Context Window). 

Vai trò của PM không còn là mô tả thuật toán chi tiết (vòng lặp, if/else), mà tập trung vào **Đầu vào (Prompt/Context)**, **Đầu ra (JSON Schema)**, và **Biên giới (Guardrails/Fallback)**.

---

## 🟢 1. Size S (Small) - Tính năng nhỏ / Tweak UI
*Bản chất: Không cần viết FRS formal. Việc viết FRS sẽ mất thời gian hơn cả việc Dev/AI tự code.*

* **Quy trình:** Dùng Prompt kỹ thuật + Ảnh giao diện mẫu.
* **Cấu trúc (Chỉ là 1 đoạn Prompt gửi Dev/AI):**
    1. **Context (Ngữ cảnh):** Tính năng này làm gì? *(VD: "Thêm nút 'Đồng bộ lại' ở trang Danh sách Hóa đơn").*
    2. **Reference UI:** Kèm link thiết kế Figma hoặc ảnh chụp màn hình (Screenshot).
    3. **Expected Output:** Bấm nút thì gọi API nào? Component có trạng thái Loading/Success/Error ra sao?
    4. **Guardrails (Rào chắn):** Giới hạn hành vi *(VD: "Chỉ cho bấm 1 lần mỗi phút để tránh spam API").*

---

## 🟡 2. Size M (Medium) - Module / Tính năng cốt lõi
*Bản chất: Đây là "Điểm ngọt" (Sweet spot). PM viết FRS chuẩn + UI Prototype để Dev dùng AI "Vibe code" ra ngay lập tức.*

* **Quy trình:** Viết FRS (1-2 trang) -> Vibe UI -> Chốt AC -> Dev thả file FRS vào Cursor để sinh code.
* **Cấu trúc FRS Hiện đại (Gồm 6 phần):**
    1. **Thông tin chung:** Mục đích, đặc biệt là **In/Out-scope** để AI không tự code lan man vượt quá yêu cầu.
    2. **Business Flow & UI/UX:** Sơ đồ luồng (Mermaid Flowchart) + Draft Prototype/Wireframe.
    3. **Acceptance Criteria (AC):** Bắt buộc viết theo Gherkin (`Given - When - Then`) để AI tự viết Unit Test.
    4. **Data Contract (The Shell):** Lấy dữ liệu từ bảng nào? API In/Out Payload là gì? (Tính Deterministic).
    5. **AI Component & Guardrails (The Core):** *(Dành cho tính năng có tích hợp AI)*
        * *System Prompt:* Câu lệnh mồi hướng dẫn hành vi của LLM.
        * *Expected Output:* Bắt buộc trả về Strict JSON schema.
        * *Fallback & HITL:* Luồng xử lý khi AI "ngáo" (Hallucination) hoặc khi độ tự tin thấp cần con người duyệt (Human-in-the-loop).
    6. **Non-Functional Requirements (NFR):** Tốc độ phản hồi, ghi log (Audit Log), bảo mật.

---

## 🔴 3. Size L (Large) - Epic / Phân hệ lớn
*Bản chất: Không bao giờ nhét toàn bộ 1 hệ thống lớn vào 1 file FRS, vì AI sẽ bị quá tải ngữ cảnh (Context Overflow) và sinh code lỗi. Bắt buộc phải chia nhỏ.*

* **Quy trình:** Xây dựng Kiến trúc tổng thể (Global Spec) -> Cắt nhỏ thành nhiều FRS Size M -> Giao Dev làm từng phần.
* **Cấu trúc tiếp cận:**
    * **File 1: Master Architecture (System Design):**
        * Bức tranh tổng thể (Big Picture / System Architecture).
        * Thiết kế Database (ERD) dùng chung cho toàn Epic.
        * Core API/Integration (Luồng giao tiếp với hệ thống bên ngoài).
    * **File 2, 3, 4: Sub-FRS (Chính là các FRS Size M):**
        * *Ví dụ (Phân hệ Báo cáo Thuế):* 
            * Sub-FRS 1: Bảng kê hóa đơn mua vào.
            * Sub-FRS 2: Bảng kê hóa đơn bán ra.
            * Sub-FRS 3: Logic tính tờ khai GTGT và xuất XML.
