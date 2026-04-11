# Danh sách 20 Quest Mẫu - Lowca Quest Engine

Bộ 20 quest này được cấu trúc theo chuẩn Rule-Engine (IF-THEN) của Lowca Ecosystem (Use Case 1) dành cho Dev thiết lập hardcode thử nghiệm UI/UX. Các Quest được phân bổ đa dạng, lấp đầy các kịch bản Tân thủ (Onboarding), Hằng ngày (Daily), Hằng tuần (Weekly), và Dịp lễ đặc biệt (Seasonal).

---

### Quest 1: Sự kiện “Săn Quà 30/4 – Sài Gòn Xưa” (Mẫu Seasonal)
**Mục tiêu:** Thúc đẩy user khám phá quán mang phong cách cổ trong dịp lễ.
**• Điều kiện (IF)**
    ○ Loại hành động: Check-in
    ○ Phạm vi: Các quán có tag `#SàiGònXưa`
    ○ Số lượng yêu cầu: 3 quán
    ○ Thời gian: 28/04 – 03/05
**• Phần thưởng (THEN)**
    ○ Loại phần thưởng: Vật phẩm (Móc khóa Lowca phiên bản 30/4)
    ○ Tổng số lượng: 100
    ○ Cách chọn người nhận: Ai đến trước nhận trước (FCFS)
    ○ Điều kiện tham gia: User từ Level 2 trở lên
**• Hiển thị**
    ○ Ảnh banner: Tượng Bến Nhà Rồng / Background retro
    ○ Đồng hồ đếm ngược: 5 ngày 12:00:00
    ○ Thanh tiến độ: 3 vòng tròn (mỗi quán 1 vòng)
    ○ Nút hành động: “Chụp ảnh & Chia sẻ”
    ○ Nhãn FOMO: “Chỉ còn 100 phần quà”

### Quest 2: Nhiệm Vụ “Cú Đêm Bụng Đói” (Daily)
**Mục tiêu:** Tăng lượng đơn đặt hàng vào khung giờ khuya cho các quán ăn vỉa hè.
**• Điều kiện (IF)**
    ○ Loại hành động: Payment (Trạng thái đơn: Hoàn thành)
    ○ Phạm vi: Các quán có tag `#AnDem` hoặc `#MoXuyenDem`
    ○ Số lượng yêu cầu: 1 đơn
    ○ Thời gian: 22:00 – 02:00 hằng ngày
**• Phần thưởng (THEN)**
    ○ Loại phần thưởng: Tiết Kiệm (Voucher Freeship đơn vỉa hè)
    ○ Tổng số lượng: Không giới hạn
    ○ Cách chọn người nhận: Auto Apply sau khi hoàn thành
    ○ Điều kiện tham gia: Mọi Level
**• Hiển thị**
    ○ Ảnh banner: Hình tô hủ tiếu gõ hoặc bếp than bốc khói trong đêm
    ○ Đồng hồ đếm ngược: 04:00:00 (Reset mỗi ngày vào 22h)
    ○ Thanh tiến độ: 1 vòng đơn hàng
    ○ Nút hành động: “Đặt món ngay”
    ○ Nhãn FOMO: "Cứu đói đêm khuya thả ga!"

### Quest 3: Chào Sân Tân Binh (Onboarding)
**Mục tiêu:** Hướng dẫn User mới sử dụng tính năng Check-in qua GPS của Lowca.
**• Điều kiện (IF)**
    ○ Loại hành động: Check-in (GPS Verified)
    ○ Phạm vi: Bất kỳ Vendor nào trên hệ thống
    ○ Số lượng yêu cầu: 1 quán
    ○ Thời gian: Trong vòng 7 ngày kể từ lúc tạo tài khoản
**• Phần thưởng (THEN)**
    ○ Loại phần thưởng: Token (Cộng ngay 200 Xu vào ví)
    ○ Tổng số lượng: Không giới hạn
    ○ Cách chọn người nhận: Hoàn thành là nhận
    ○ Điều kiện tham gia: User Level 1 (Tài khoản mới)
**• Hiển thị**
    ○ Ảnh banner: Linh vật Lowca đang vẫy tay chào với bản đồ
    ○ Đồng hồ đếm ngược: 7 ngày 00:00:00
    ○ Thanh tiến độ: 1 ngôi sao
    ○ Nút hành động: “Khám phá & Check-in ngay”
    ○ Nhãn FOMO: “Quà tặng tân thủ chỉ xuất hiện 1 lần!”

### Quest 4: Chiến Thần Đánh Giá (Weekly)
**Mục tiêu:** Khuyến khích User để lại review chất lượng, có hình ảnh để xây dựng niềm tin cộng đồng.
**• Điều kiện (IF)**
    ○ Loại hành động: Review (Status: Public, kèm ít nhất 1 ảnh chụp món ăn)
    ○ Phạm vi: Bất kỳ quán nào có tag `#MonAnNgon`
    ○ Số lượng yêu cầu: 3 bài review
    ○ Thời gian: Thứ Hai đến Chủ Nhật hàng tuần
**• Phần thưởng (THEN)**
    ○ Loại phần thưởng: Tiết kiệm (Thẻ "Nâng cấp Size L" trị giá 350 Xu)
    ○ Tổng số lượng: 500 thẻ/tuần
    ○ Cách chọn người nhận: FCFS (Nhanh tay nhận trước)
    ○ Điều kiện tham gia: Mọi Level
**• Hiển thị**
    ○ Ảnh banner: Một chiếc ly khổng lồ và ngón tay cái thả tim
    ○ Đồng hồ đếm ngược: Đếm đến 23:59 Chủ Nhật
    ○ Thanh tiến độ: 3 ngôi sao review
    ○ Nút hành động: “Viết cảm nhận”
    ○ Nhãn FOMO: “Chỉ 500 thẻ up-size miễn phí mỗi tuần”

### Quest 5: Cạ Cứng Trà Sữa (Weekly)
**Mục tiêu:** Thúc đẩy hành vi đặt đồ uống thường xuyên vào các buổi xế chiều của dân văn phòng.
**• Điều kiện (IF)**
    ○ Loại hành động: Payment
    ○ Phạm vi: Quán có Tag `#TraSua`
    ○ Số lượng yêu cầu: 3 đơn hàng
    ○ Thời gian: Thứ Hai đến Thứ Sáu
**• Phần thưởng (THEN)**
    ○ Loại phần thưởng: Tiết Kiệm (Voucher giảm 10k trực tiếp)
    ○ Tổng số lượng: 1000 vé/tuần
    ○ Cách chọn người nhận: Hoàn thành là nhận
    ○ Điều kiện tham gia: User từ Level 2
**• Hiển thị**
    ○ Ảnh banner: Những ly trà sữa trân châu full topping tươi mát
    ○ Đồng hồ đếm ngược: 5 ngày tiến độ (T2-T6)
    ○ Thanh tiến độ: 3 ly trà sữa (nhấp nháy khi có đơn mới)
    ○ Nút hành động: “Thèm nước? Đặt ngay!”
    ○ Nhãn FOMO: “Quét sạch kho deal trà sữa”

### Quest 6: Cuối Tuần Bùng Nổ Cùng Hội Bạn (Referral / Current Pick)
**Mục tiêu:** Khuyến khích tính năng chia sẻ link mời tham gia phòng (Current Pick).
**• Điều kiện (IF)**
    ○ Loại hành động: Referral (Bạn bè bấm vào link, tạo tài khoản và lên chung 1 đơn)
    ○ Phạm vi: Toàn hệ thống nhà hàng/quán
    ○ Số lượng yêu cầu: 2 người bạn mới
    ○ Thời gian: Thứ Sáu đến Chủ Nhật
**• Phần thưởng (THEN)**
    ○ Loại phần thưởng: Trải nghiệm (Voucher Nhóm giảm trực tiếp 30k)
    ○ Tổng số lượng: 200 voucher
    ○ Cách chọn người nhận: Lucky Draw ngẫu nhiên hoặc FCFS
    ○ Điều kiện tham gia: Tất cả User
**• Hiển thị**
    ○ Ảnh banner: Nhóm bạn đang cụng ly vui vẻ ở phố đi bộ
    ○ Đồng hồ đếm ngược: 48:00:00 (Cuối tuần)
    ○ Thanh tiến độ: 2 icon hình người (vắng mặt/có mặt)
    ○ Nút hành động: “Rủ rê đám bạn liền”
    ○ Nhãn FOMO: “Chỉ 200 voucher nhóm cho cuối tuần này”

### Quest 7: Đánh Thức Cơn Buồn Ngủ (Daily)
**Mục tiêu:** Khai thác tập khách hàng mua cà phê xe đẩy/take-away vào buổi sáng sớm.
**• Điều kiện (IF)**
    ○ Loại hành động: Payment
    ○ Phạm vi: Các quán có Tag `#Cafe`
    ○ Số lượng yêu cầu: 1 đơn
    ○ Thời gian: 06:00 – 09:00 hàng ngày (Daily Loop)
**• Phần thưởng (THEN)**
    ○ Loại phần thưởng: Tiết Kiệm (Thẻ "Thêm Topping miễn phí" cho trà/cafe)
    ○ Tổng số lượng: Không giới hạn
    ○ Cách chọn người nhận: Tự động phát voucher vào kho
    ○ Điều kiện tham gia: Mọi Level
**• Hiển thị**
    ○ Ảnh banner: Ly cafe đen đá / bạc xỉu vỉa hè
    ○ Đồng hồ đếm ngược: 03:00:00 (Mỗi sáng)
    ○ Thanh tiến độ: 1 hạt cafe
    ○ Nút hành động: “Đặt cafe chống gục”
    ○ Nhãn FOMO: "Refresh ngày mới với quà nhỏ"

### Quest 8: Dấu Ấn Quán Mới Nổi (Special)
**Mục tiêu:** Kéo traffic trải nghiệm cho các quán mới đăng ký lên nền tảng Lowca.
**• Điều kiện (IF)**
    ○ Loại hành động: Review (Kèm ảnh thực tế)
    ○ Phạm vi: Quán mới có thẻ Tag `#NewArrival`
    ○ Số lượng yêu cầu: 2 Quán
    ○ Thời gian: Từ 01/05 đến 31/05
**• Phần thưởng (THEN)**
    ○ Loại phần thưởng: Trải Nghiệm (Gói "Săn Quán Hot" giảm sâu trong 48h)
    ○ Tổng số lượng: 300 Gói
    ○ Cách chọn người nhận: Ai hoàn thành trước nhận trước
    ○ Điều kiện tham gia: User từ Level 5
**• Hiển thị**
    ○ Ảnh banner: Biểu tượng khánh thành khai trương sáng rực
    ○ Đồng hồ đếm ngược: Đếm thao ngày của Tháng
    ○ Thanh tiến độ: 2 icon máy ảnh
    ○ Nút hành động: “Viết cảm nhận ngay”
    ○ Nhãn FOMO: "Trở thành người thám hiểm đầu tiên!"

### Quest 9: Thánh Ăn Vặt Lề Đường (Long-term Milestone)
**Mục tiêu:** Gây dựng thói quen đi dạo và check-in các địa điểm ẩm thực lề đường.
**• Điều kiện (IF)**
    ○ Loại hành động: Check-in (GPS Verified)
    ○ Phạm vi: Quán có Tag `#AnVatStreet`
    ○ Số lượng yêu cầu: 10 Quán khác nhau
    ○ Thời gian: Diễn ra trong 30 ngày cày ải
**• Phần thưởng (THEN)**
    ○ Loại phần thưởng: Đặc Quyền (Thẻ VIP "Lowca Star" + Huy hiệu vĩnh viễn trên Profile)
    ○ Tổng số lượng: 50 suất
    ○ Cách chọn người nhận: Bảng xếp hạng, top 50 người check-in nhanh nhất
    ○ Điều kiện tham gia: Level 10 trở lên
**• Hiển thị**
    ○ Ảnh banner: Bánh tráng nướng, cá viên chiên rực rỡ dưới ánh đèn đường
    ○ Đồng hồ đếm ngược: 30 ngày 00:00:00
    ○ Thanh tiến độ: 10 chiếc xe đẩy nhỏ
    ○ Nút hành động: “Chạy vòng vòng check-in”
    ○ Nhãn FOMO: "Huy hiệu VIP đợt 1 chỉ dành cho 50 huyền thoại"

### Quest 10: Ước Gì Có Chỗ Ngồi (Weekend Event)
**Mục tiêu:** Kéo user chịu chi cho các Quán đang quá tải nhờ vào quyền lợi được đặt chỗ/giữ bàn.
**• Điều kiện (IF)**
    ○ Loại hành động: Payment (Có Value_req: Tổng bill > 150k)
    ○ Phạm vi: Quán tại `Area_ID: Quan_1` hoặc `Area_ID: Quan_3`
    ○ Số lượng yêu cầu: 1 Đơn lớn
    ○ Thời gian: Thứ Bảy và Chủ Nhật
**• Phần thưởng (THEN)**
    ○ Loại phần thưởng: Trải Nghiệm (Thẻ "Giữ chỗ đẹp")
    ○ Tổng số lượng: 20 thẻ/ngày
    ○ Cách chọn người nhận: FCFS
    ○ Điều kiện tham gia: Level 5 trở lên
**• Hiển thị**
    ○ Ảnh banner: Hai chiếc ghế êm ái nhìn ra View đẹp
    ○ Đồng hồ đếm ngược: 48:00:00
    ○ Thanh tiến độ: 1 bill tính tiền
    ○ Nút hành động: “Đặt trước món ngay”
    ○ Nhãn FOMO: "Tránh chen lấn, chiếm lấy 20 chỗ đẹp nhất!"

### Quest 11: Bữa Trưa Văn Phòng Chớp Nhoáng (Daily)
**Mục tiêu:** Phục vụ đối tượng dân văn phòng có quỹ thời gian nghỉ trưa ngắn cần được ưu tiên xử lý món.
**• Điều kiện (IF)**
    ○ Loại hành động: Payment
    ○ Phạm vi: Các quán có Tag `#ComTrua`
    ○ Số lượng yêu cầu: 2 đơn
    ○ Thời gian: 11:00 – 13:00 (Thứ Hai đến Thứ Sáu)
**• Phần thưởng (THEN)**
    ○ Loại phần thưởng: Trải nghiệm (Thẻ "Ưu tiên xử lý đơn" cho bill kế tiếp)
    ○ Tổng số lượng: 500 thẻ/tuần
    ○ Cách chọn người nhận: Auto Apply trực tiếp vào giỏ quà
    ○ Điều kiện tham gia: Level 3 trở lên
**• Hiển thị**
    ○ Ảnh banner: Hộp cơm tấm bốc khói siêu hấp dẫn
    ○ Đồng hồ đếm ngược: 02:00:00 (Khung chờ trưa)
    ○ Thanh tiến độ: 2 hộp cơm nhỏ
    ○ Nút hành động: “Chốt đơn trưa nay”
    ○ Nhãn FOMO: "Dành cho ai sợ mỏi cổ chờ đợi"

### Quest 12: Thợ Săn Giờ Vàng (Special Flash Event)
**Mục tiêu:** Kích thích hành vi đặt mua "bốc đồng" trong một khung giờ vàng siêu ngắn.
**• Điều kiện (IF)**
    ○ Loại hành động: Payment
    ○ Phạm vi: Các quán nằm trong danh mục `#FlashSale`
    ○ Số lượng yêu cầu: 1 Đơn nhanh nhất
    ○ Thời gian: 15:00 – 16:00 (Sự kiện đặc biệt)
**• Phần thưởng (THEN)**
    ○ Loại phần thưởng: Tiết Kiệm (Combo: Voucher Freeship + Voucher Trà đá miễn phí 200 Xu)
    ○ Tổng số lượng: 200 Combo
    ○ Cách chọn người nhận: Giành giật thực tế (FCFS cực gắt)
    ○ Điều kiện tham gia: Không giới hạn Level
**• Hiển thị**
    ○ Ảnh banner: Đồng hồ cát và tia sét Flash Sale neon
    ○ Đồng hồ đếm ngược: 01:00:00 (Tích tắc từng giây)
    ○ Thanh tiến độ: 1 tia sét (Nhấp nháy đỏ khi active)
    ○ Nút hành động: “Vào săn ngay!”
    ○ Nhãn FOMO: "Nhanh tay thì còn, chậm tay thì nhịn!"

### Quest 13: Thách Thức Mùa Mưa Phố Thị (Seasonal)
**Mục tiêu:** Cứu vãn doanh số vào thời điểm mùa mưa sụt giảm cho chuỗi Lẩu/Nướng lề đường.
**• Điều kiện (IF)**
    ○ Loại hành động: Check-in
    ○ Phạm vi: Quán mang thẻ `#LauNuong`
    ○ Số lượng yêu cầu: 3 Quán đa dạng
    ○ Thời gian: 01/07 – 31/07 (Tháng cao điểm rớt mưa)
**• Phần thưởng (THEN)**
    ○ Loại phần thưởng: Vật Phẩm Tặng Kèm (Áo mưa Lowca bản giới hạn trong suốt)
    ○ Tổng số lượng: 300 cái
    ○ Cách chọn người nhận: Hoàn thành form địa chỉ sau khi Pass (FCFS)
    ○ Điều kiện tham gia: Level 8 trở lên
**• Hiển thị**
    ○ Ảnh banner: Nồi lẩu khói nghi ngút ấm áp bất chấp mưa bay
    ○ Đồng hồ đếm ngược: Đếm lùi từ 31 Ngày
    ○ Thanh tiến độ: 3 bếp than hồng
    ○ Nút hành động: “Mặc áo mưa đi check-in”
    ○ Nhãn FOMO: "Áo mưa Lowca cực chất, giới hạn 300 chiếc"

### Quest 14: Kẻ Tảo Hôn Khẩu Vị (Monthly)
**Mục tiêu:** Kích thích người dùng thử thách khẩu vị ở các gian hàng ẩm thực đường phố ngoại quốc.
**• Điều kiện (IF)**
    ○ Loại hành động: Payment
    ○ Phạm vi: Các xe đẩy/quán có Tag `#AmThucQuocTe`
    ○ Số lượng yêu cầu: 3 Đơn
    ○ Thời gian: Trong 30 ngày của tháng
**• Phần thưởng (THEN)**
    ○ Loại phần thưởng: Trải Nghiệm (Gói "Combo dùng thử món mới" - Thưởng thức miễn phí signature của 1 quán)
    ○ Tổng số lượng: 100 Gói
    ○ Cách chọn người nhận: Cấp Random mã vé sau khi qua 3 mốc (Lucky)
    ○ Điều kiện tham gia: User Level 2 trở lên
**• Hiển thị**
    ○ Ảnh banner: Xiên Odeng Hàn Quốc, Takoyaki Nhật Bản góc phố
    ○ Đồng hồ đếm ngược: 30 days
    ○ Thanh tiến độ: 3 lá cờ quốc gia mini
    ○ Nút hành động: “Nếm thử món lạ”
    ○ Nhãn FOMO: "Lọt top 100 người sành ăn nhất tháng"

### Quest 15: Bước Chân Khám Phá (Weekly)
**Mục tiêu:** Điều dẫn người dùng di chuyển sang các Quận khác nhau để kích traffic các khu vực yếu hơn.
**• Điều kiện (IF)**
    ○ Loại hành động: Check-in
    ○ Phạm vi: Quán nằm **khác** với `Area_ID` thường đặt của User (Thuật toán gợi ý)
    ○ Số lượng yêu cầu: 2 Quán
    ○ Thời gian: Trong trọn vẹn 1 tuần
**• Phần thưởng (THEN)**
    ○ Loại phần thưởng: Coin (Thưởng đậm 500 Xu vào quỹ Wallet)
    ○ Tổng số lượng: Không giới hạn
    ○ Cách chọn người nhận: Tự động phát Wallet
    ○ Điều kiện tham gia: Level 5
**• Hiển thị**
    ○ Ảnh banner: Bản đồ thành phố cùng những ghim vị trí chưa từng tới
    ○ Đồng hồ đếm ngược: Theo tiến độ cuối Tuần
    ○ Thanh tiến độ: 2 đôi giày sneaker
    ○ Nút hành động: “Khởi hành vượt biên giới quận”
    ○ Nhãn FOMO: "Đi xa một chút, thu về cả rương xu"

### Quest 16: Ông Hoàng Trải Nghiệm (Weekly Vip)
**Mục tiêu:** Vinh danh những thành viên cao cấp chịu chi cho những bữa ăn chất lượng vượt trội tại hệ thống "đường phố cao cấp".
**• Điều kiện (IF)**
    ○ Loại hành động: Payment (Kèm biến số: Giá trị đơn hàng tối thiểu > 200k)
    ○ Phạm vi: Bất cứ vendor nào
    ○ Số lượng yêu cầu: 2 Đơn
    ○ Thời gian: Trong vòng 1 Tuần lễ
**• Phần thưởng (THEN)**
    ○ Loại phần thưởng: Đặc Quyền Vip (Thẻ "Lowca Pass - 1 tháng" nhân đôi XP/Xu tạm tính)
    ○ Tổng số lượng: 10 thẻ/tuần
    ○ Cách chọn người nhận: Cuộc đua FCFS của giới siêu giàu
    ○ Điều kiện tham gia: Dành mọi đặc quyền cho User Level > 15
**• Hiển thị**
    ○ Ảnh banner: Chiếc thẻ Vàng Lowca Pass lấp lánh phản quang kim loại
    ○ Đồng hồ đếm ngược: Đếm tới chủ nhật 23:59:59
    ○ Thanh tiến độ: 2 đồng xu vàng in mệnh giá lớn
    ○ Nút hành động: “Chốt bill siêu bự”
    ○ Nhãn FOMO: "Đại chiến 10 vé x2 exp độc tôn mỗi tuần!"

### Quest 17: Đại Sứ Thương Hiệu Lowca (Quarterly Campaign)
**Mục tiêu:** Mở rộng tệp User Base mạnh mẽ qua mô hình Multi-Referral.
**• Điều kiện (IF)**
    ○ Loại hành động: Referral (Bạn bè nhập Code -> Tạo Account -> Có đơn hàng Verify)
    ○ Phạm vi: Toàn quốc, không giới hạn Geo_ID
    ○ Số lượng yêu cầu: 5 Người bạn (Valid accounts)
    ○ Thời gian: Kéo dài suốt Quý 3 (90 Ngày)
**• Phần thưởng (THEN)**
    ○ Loại phần thưởng: Vật Phẩm Premium (Túi Tote Lowca form lớn phiên bản Streetwear)
    ○ Tổng số lượng: 1000 Túi
    ○ Cách chọn người nhận: Duyệt form xác nhận địa chỉ ship thẳng (FCFS)
    ○ Điều kiện tham gia: Mọi Level
**• Hiển thị**
    ○ Ảnh banner: Mẫu Gen Z đeo túi Tote Lowca cực ngầu dạo quanh công viên
    ○ Đồng hồ đếm ngược: 90 Ngày lớn
    ○ Thanh tiến độ: 5 icon Avatar User rỗng (chờ được kích hoạt sáng)
    ○ Nút hành động: “Tạo Link Mời Của Tôi”
    ○ Nhãn FOMO: "Túi xịn không bán, phần thưởng cho đại sứ"

### Quest 18: Check-in Xuyên Không - Tháng Kiến Trúc (Special)
**Mục tiêu:** Kích thích thế hệ Z thích sống ảo tìm kiếm góc chụp hình film retro, vintage.
**• Điều kiện (IF)**
    ○ Loại hành động: Review (Đánh giá quán + ít nhất 2 ảnh màu sắc decor của Quán)
    ○ Phạm vi: Tag `#ViewDep` hoặc `#RetroStyle`
    ○ Số lượng yêu cầu: 3 Bài đánh giá
    ○ Thời gian: Theo tiến độ Tháng 9 (Mùa thu checkin)
**• Phần thưởng (THEN)**
    ○ Loại phần thưởng: Quà Tặng Bộ Sưu Tập (Trọn bộ 4 Sticker/Móc khóa Lowca siêu hiếm)
    ○ Tổng số lượng: 50 Set
    ○ Cách chọn người nhận: Admin chọn lọc Manual (Ảnh có tâm và xịn xò)
    ○ Điều kiện tham gia: Level 5
**• Hiển thị**
    ○ Ảnh banner: Một chiếc máy film Polaroid thả hờ trên chiếc bàn gỗ xưa
    ○ Đồng hồ đếm ngược: 30 ngày theo chu kì tháng
    ○ Thanh tiến độ: 3 cuộn phim ảnh
    ○ Nút hành động: “Đăng tải kiệt tác”
    ○ Nhãn FOMO: "Top 50 review lung linh sẽ có quà cực độc"

### Quest 19: Nét Đẹp Quen Thuộc (Retention Monthly)
**Mục tiêu:** Tăng giá trị Life Time Value (LTV) và tạo mức độ trung thành vào riêng 1 vendor nhất định.
**• Điều kiện (IF)**
    ○ Loại hành động: Payment
    ○ Phạm vi: Chuyên biệt tại 1 `Vendor_ID` cũ (Nơi User từng thanh toán ít nhất 1 lần)
    ○ Số lượng yêu cầu: 3 Đơn/Vendor cũ đó
    ○ Thời gian: Kéo dài 30 Ngày
**• Phần thưởng (THEN)**
    ○ Loại phần thưởng: Token Bonus (Lãnh đậm 1000 Xu tích lũy khi hoàn thành)
    ○ Tổng số lượng: Không giới hạn
    ○ Cách chọn người nhận: Auto Apply Credit
    ○ Điều kiện tham gia: Mọi Level
**• Hiển thị**
    ○ Ảnh banner: Hình bóng dáng cô/chú chủ quán tươi cười vẫy tay
    ○ Đồng hồ đếm ngược: Đếm chu kì 30 ngày từ ngày bắt đầu Quest
    ○ Thanh tiến độ: 3 mái lá nhà
    ○ Nút hành động: “Trở lại quán thân quen”
    ○ Nhãn FOMO: "Trân trọng quán quen, ví xu no đủ"

### Quest 20: Bữa Tối Tình Yêu (Valentine Special)
**Mục tiêu:** Đồng bộ chiến dịch booking đôi dịp Lễ, điều hướng khách tới Vendor có trang bị nhẹ không gian.
**• Điều kiện (IF)**
    ○ Loại hành động: Check-in (GPS Verified)
    ○ Phạm vi: Quán gắn thẻ `#Date` hoặc `#LangMan` (Mô hình ăn vặt rooftop hoặc trà bánh)
    ○ Số lượng yêu cầu: 1 Quán
    ○ Thời gian: Đúng dịp Lễ 13/02 – 15/02 (3 Ngày)
**• Phần thưởng (THEN)**
    ○ Loại phần thưởng: Đặc Quyền Đổi Quà (Voucher "Tiệc Sinh Nhật" được phép Covert sang Giảm 20% bill Tình Nhân)
    ○ Tổng số lượng: Không giới hạn
    ○ Cách chọn người nhận: Hoàn tất chặng Checkin là nhận quà Code
    ○ Điều kiện tham gia: Level 2
**• Hiển thị**
    ○ Ảnh banner: Cảnh tay trong tay nhâm nhi cafe rooftop dưới ánh hoàng hôn
    ○ Đồng hồ đếm ngược: Đếm ngược 72:00:00 mùa yêu
    ○ Thanh tiến độ: 1 trái tim bự đập thình thịch
    ○ Nút hành động: “Khoác tay Gấu tới quán liền”
    ○ Nhãn FOMO: "Tạo kỷ niệm xịn xò với Lowca dịp Valentine!"
