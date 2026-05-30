# X-sign: UI chữ ký cá nhân và chữ ký doanh nghiệp

## 1. Tổng quan sản phẩm

### Mục tiêu
- Xây dựng module ký số trong X-sign cho phép người dùng ký tài liệu bằng:
  - **Chữ ký cá nhân**: chữ ký tay + signal message.
  - **Chữ ký doanh nghiệp**: chữ ký tay + con dấu đỏ tự động + signal message.
- Trải nghiệm UI phải giống với mẫu hình ảnh người dùng gửi: thanh thoát, rõ ràng, hiển thị logo/tên doanh nghiệp, con dấu đỏ và chữ ký tay.
- Quy trình phải kết nối với API `IDKit` để lấy thông tin doanh nghiệp và tạo con dấu tự động khi người dùng chọn ký doanh nghiệp.
- Phù hợp với luồng ký trên X-sign: chọn vùng ký → xác nhận ký → popup chọn loại chữ ký → cấp quyền ký CAS ID qua QR → trả về thông báo → tạo chữ ký.

### Phạm vi
- Chỉ tập trung vào phần **UI** và **logic tạo chữ ký**.
- Không bao gồm các phần mở rộng như quản lý tài liệu, export PDF, hay workflow phê duyệt nâng cao.

## 2. Business flow

### Luồng tổng quan
1. Người dùng mở tài liệu X-sign và chọn vùng ký trên màn hình và có thể điều chỉnh kích thước tổng thể của chữ ký.
2. Nhấn xác nhận ký và xệ thống hiển thị popup tạo chữ ký.
3. Trong popup, người dùng chọn:
   - **Người dùng tạo chữ ký tay trong khung hình chữ nhật**
   - **Sau đó nhấn ô Chữ ký cá nhân hoặc**
   - **Chữ ký doanh nghiệp**
4. Sau khi chọn loại chữ ký, hệ thống chuyển sang màn hình **cấp quyền ký**.
5. Người dùng sử dụng **CAS ID** để quét QR cấp quyền.
6. Hệ thống nhận được xác thực, trả về thông báo "Đã cấp quyền cho X-sign".
7. X-sign bắt đầu tạo chữ ký:
   - Nếu người dùng chọn **chữ ký doanh nghiệp**:
     - Gọi API `IDKit` để lấy thông tin doanh nghiệp dựa trên MST.
     - Tạo **con dấu đỏ** tự động với:
       - Tên doanh nghiệp ở giữa.
       - MST hiển thị nửa trên vòng tròn.
       - Tỉnh/TP của trụ sở chính hiển thị nửa dưới vòng tròn.
     - Tạo **chữ ký tay**.
     - Tạo **signal message** kèm theo (ví dụ: thông điệp xác thực, timestamp).
   - Nếu người dùng chọn **chữ ký cá nhân**:
     - Tạo **chữ ký tay**.
     - Tạo **signal message**.
8. Hiển thị bản ký thành công và trạng thái ký cho người dùng.

### Chi tiết UI flow
- Popup xác nhận ký cần có:
  - Tiêu đề rõ ràng: "Xác nhận ký tài liệu".
  - Khung trắng viền đen để người dùng vẽ chữ ký tay
  - Nút chọn loại chữ ký: "Ký cá nhân" và "Ký doanh nghiệp".
  - Nút xác nhận "Ký ngay"
  - Khi hoàn tất, hiển thị card chữ ký:
    - Với chữ ký doanh nghiệp: con dấu đỏ + chữ ký tay + tin nhắn xác nhận.
    - Với chữ ký cá nhân: chữ ký tay + tin nhắn xác nhận.

## 3. Prototype

### Dev tự làm nhanh phần này
- Nếu không có prototype sẵn, đây là hướng dẫn để dev tự làm:
  - Sử dụng layout card/stepper.
  - Màu sắc: tối giản, chuyên nghiệp, tương tự thương hiệu X-sign.
  - Icon rõ ràng cho từng bước: chọn ký, cấp quyền, tạo chữ ký.
  - Con dấu đỏ phải hiển thị tự nhiên, bo tròn, chữ trong vòng tròn đều nhau.

### Gợi ý thiết kế UI
- Màn hình chính: 
  - Khung tài liệu có vùng chọn ký hiển thị rõ ràng.
- Popup xác nhận ký:
  - Header màu nhấn.
  - Hai button rõ ràng: "Chữ ký cá nhân" và "Chữ ký doanh nghiệp".
  - Chú thích nhỏ: "Chữ ký doanh nghiệp sẽ tạo thêm con dấu đỏ dựa trên dữ liệu công ty".
- Màn hình kết quả:
  - Card chữ ký với chữ ký tay bên trái, con dấu đỏ nằm sau chữ ký (nếu doanh nghiệp).
  - Chữ ký tay luôn ở phía trước đặt z-index cao hơn, đảm bảo chữ ký rõ, không bị con dấu đỏ che mất nét quan trọng.
  - Con dấu đỏ nằm sau chữ ký đặt z-index thấp hơn, chỉ chồng nhẹ lên phần cuối chữ ký hoặc ở phía phải/sau chữ ký, không đặt con dấu hoàn toàn trên chữ ký.
  - Tỷ lệ chồng lên con dấu chồng lên chữ ký khoảng 20–30% diện tích phần chữ ký còn lại phải rõ ràng, đặc biệt là nét mềm, nét ký.
  - Vị trí đề xuất: chữ ký tay: bên trái, nằm ngang, con dấu: hơi lệch sang trái so với chữ ký và xuống lên cao một chút, để tạo cảm giác “nằm sau”, phần lớn vòng tròn con dấu vẫn hiển thị, chỉ có một phần nhỏ bị chữ ký che ở góc phải.
  - Hiệu ứng thị giác, con dấu đỏ có thể dùng opacity nhẹ hoặc viền rõ để không làm mờ chữ ký, chữ ký tay giữ màu xanh bút bi, con dấu đỏ vẫn giữ độ đậm nhưng không cạnh tranh.
  - Dòng text hiển thị `Signal message` và `Timestamp`, layout và nội dung giống hình ảnh bên dưới.

## 4. Acceptance Criteria

### Chức năng chính
- [ ] Người dùng có thể chọn vùng ký trên tài liệu X-sign.
- [ ] Popup xác nhận ký hiển thị đúng thông tin tài liệu và yêu cầu chọn loại chữ ký.
- [ ] Người dùng có thể chọn **Chữ ký cá nhân** hoặc **Chữ ký doanh nghiệp**.
- [ ] Sau khi chọn, hệ thống chuyển sang màn hình cấp quyền CAS ID.
- [ ] CAS ID quét QR và trả về trạng thái cấp quyền thành công.
- [ ] Khi quyền được cấp, X-sign tạo chữ ký và hiển thị thành công.
- [ ] Với ký doanh nghiệp, giao diện phải hiển thị **con dấu đỏ** gồm:
  - Tên doanh nghiệp ở giữa.
  - MST ở trên vòng tròn.
  - Tỉnh/TP trụ sở ở dưới vòng tròn.
- [ ] Với ký cá nhân, chỉ hiển thị chữ ký tay và signal message.
- [ ] Luồng không được tiếp tục nếu quyền CAS ID chưa cấp.
- [ ] Trạng thái lỗi/cancel cần có: "Hủy ký", "Cấp quyền thất bại", "Đã xảy ra lỗi tạo chữ ký".

### UI / UX
- [ ] Giao diện nhất quán với phong cách X-sign (clean, chuyên nghiệp, có dấu đỏ doanh nghiệp rõ nét).
- [ ] Popup và màn hình cấp quyền phải dễ theo dõi, không gây nhầm lẫn.
- [ ] Người dùng hiểu rõ khác biệt giữa ký cá nhân và ký doanh nghiệp.
- [ ] Thông báo kết quả phải rõ ràng: tên loại ký, thời gian ký, trạng thái thành công.

## 5. Data contract

### API chính
- `POST https://cas.so/general/api/esign-sign-request`
- `POST https://cas.so/general/api/esign-get-cert`
- `POST https://cas.so/general/api/esign-sign`
- `POST https://cas.so/general/api/esign-push-sign-request`

### Header chung
- `Authorization: x-client-id`
- Nếu cần thêm secret key: `x-secret-key`
- `Content-Type: application/json`
- `Accept: application/json`

### Response mẫu từ `esign-get-cert`
```json
{
  "requestId": "string",
  "cert": {
    "serialNumber": "string",
    "taxCodes": "string",
    "idNumber": "string",
    "validFrom": "string",
    "validTo": "string",
    "subject": "string",
    "certBase64": "string"
  }
}
```

### Ý nghĩa các trường
- `requestId`: ID của yêu cầu ký.
- `cert.serialNumber`: Số serial chứng thư số.
- `cert.taxCodes`: Mã số thuế doanh nghiệp.
- `cert.idNumber`: Mã định danh công dân.
- `cert.validFrom`: Thời điểm chứng thư có hiệu lực.
- `cert.validTo`: Thời hạn chứng thư.
- `cert.subject`: Thông tin chủ chứng thư.
- `cert.certBase64`: Chứng thư số được mã hoá Base64.

### Data contract trong UI
#### Request tạo chữ ký
```json
{
  "signRequestId": "<request-id>",
  "signatureType": "personal|enterprise",
  "documentId": "<document-id>",
  "userId": "<cas-id-user>",
  "metadata": {
    "companyName": "<company-name>",
    "taxCode": "<mst>",
    "companyProvince": "<province>",
    "handwrittenSign": "<base64-image-or-vector>",
    "signalMessage": "<message>"
  }
}
```

#### Response tạo chữ ký
```json
{
  "status": "success|error",
  "signatureId": "<signature-id>",
  "signatureType": "personal|enterprise",
  "seal": {
    "type": "enterprise",
    "companyName": "<company-name>",
    "taxCode": "<mst>",
    "province": "<province>",
    "sealImageBase64": "<base64>"
  },
  "handwrittenSignBase64": "<base64>",
  "signalMessage": "<message>",
  "timestamp": "<ISO-8601>",
  "documentUrl": "<signed-document-url>"
}
```

### Giao thức con dấu doanh nghiệp
- Khi `signatureType` = `enterprise`, backend phải gọi `IDKit` API để lấy dữ liệu:
  - `companyName`
  - `taxCode`
  - `companyProvince`
- Dùng dữ liệu này tạo **con dấu đỏ** theo kiểu:
  - Tên doanh nghiệp nằm ở giữa.
  - MST nằm ở nửa trên vòng tròn.
  - Tên tỉnh/TP nằm ở nửa dưới vòng tròn.

## 6. Non-functional requirement

### Hiệu năng
- Thời gian từ "xác nhận ký" tới "tạo chữ ký hoàn tất" tối đa: **< 8 giây**.
- Trạng thái cấp quyền CAS ID phải cập nhật trong vòng **10 giây**.

### Bảo mật
- Toàn bộ request chứa data chữ ký phải gửi qua **HTTPS**.
- Handwritten signature image và signed document phải mã hoá khi lưu.
- Không lưu session QR mãi mãi: QR cấp quyền chỉ tồn tại trong **60 giây**.

### Tính sẵn sàng & Tin cậy
- Hệ thống phải hiển thị fallback khi API `esign-get-cert` hoặc `IDKit` gặp lỗi.
- Nếu ký doanh nghiệp thất bại do `IDKit`, user có thể chọn lại ký cá nhân.

### Khả năng mở rộng
- Module UI phải dễ mở rộng cho:
  - Ký hàng loạt.
  - Ký nhiều người trong 1 hợp đồng.
  - Thêm loại chữ ký số khác (chữ ký cấp 3, OTP, token). 

---

## Ghi chú thêm
- Mẫu thiết kế phải tương đồng với hình ảnh chữ ký người dùng gửi: độ tin cậy của con dấu đỏ & chữ ký tay rõ rệt.
- Nếu dev cần prototype UI, có thể sử dụng Figma hoặc bản demo HTML/CSS đơn giản để minh họa layout.
- Tài liệu này là spec gửi dev UI/Frontend; phần backend cần đồng bộ thêm API contract với team backend.
