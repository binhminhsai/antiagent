# Sprint Planning: X-sign Platform (Q2 - 2026)
**Khung thời gian:** 19/05 - 30/06 (Sprint thực tế code từ 08/06).
**Nhân sự:** Dev Internal (Dev 3), PM (MinhCQ), Phối hợp BAAS Team.
**Mục tiêu (Go-live):** 01/07/2026 (Dùng ký hàng loạt hợp đồng khoán việc, thực tập).

---

## 🔍 Sprint 0: Đàm Phán & Thiết Kế (19/05 - 01/06)
*Mục tiêu: PM "dọn đường" cho Dev 3. Dev 3 hoàn toàn không đụng vào code X-sign trong giai đoạn này.*

**Nhiệm vụ của PM (MinhCQ):**
- Hoàn thành Figma/Wireframe cho luồng **KysoQR**: Tạo hợp đồng, xem hợp đồng (không cần login).
- Hoàn thành Figma/Wireframe cho luồng **CAS ID**: Bỏ ký mù, mua chứng thư, tạo mẫu chữ ký, dấu mộc doanh nghiệp.
- Viết Spec luồng E2E (Tạo HĐ -> Auth CAS ID -> Ký -> Trả kết quả).
- **Đàm phán BAAS Team:** Trình bày luồng, chốt API Contract, và đàm phán việc "ISA team sẽ code phụ CAS ID nếu BAAS quá tải".

## 🏃 Sprint 1: Code Core Platform & CAS ID (08/06 - 15/06)
*Mục tiêu: Dev 3 rút khỏi X-clock-in và lao vào dựng giao diện KysoQR.*

**Sprint Backlog (Cho Dev 3):**
- **[KysoQR]** Dựng giao diện xem & tạo hợp đồng (hỗ trợ cả Cá nhân & Doanh nghiệp).
- **[CAS ID Integration]** Code API gọi xác thực sang CAS ID.
- **[CAS ID Support]** Xin quyền truy cập repo BAAS để code logic xóa ký mù và tạo template chữ ký (Nếu đã chốt ở Sprint 0).
- **Deliverable:** Lên hình được giao diện KysoQR, luồng tạo hợp đồng cơ bản chạy được.

## 🏃 Sprint 2: Bulk Sign & E2E Testing (16/06 - 30/06)
*Mục tiêu: Giải quyết nghiệp vụ khó nhất (Ký hàng loạt) và test chéo với team BAAS.*

**Sprint Backlog (Cho Dev 3 & PM):**
- **[Feature]** Xây dựng luồng **Ký hàng loạt (Bulk Sign)** cho hợp đồng nhân sự/đối tác.
- **[Testing]** Ráp luồng E2E xuyên suốt 2 nền tảng: KysoQR <-> CAS ID. Đảm bảo chữ ký số hợp lệ pháp lý.
- **[UAT]** Họp test chéo cùng BAAS team để fix lỗi đồng bộ.
- **Deliverable:** **01/07 GO-LIVE X-SIGN NỘI BỘ.** HR dùng để xuất hàng loạt hợp đồng thực tập sinh.
