# Tài Liệu Định Hướng Sản Phẩm (Product Strategy & Scope)
**Dự án:** Lowca Ecosystem

**Đối tượng đọc:** Team Business Analyst (BA), Team Developer

**Mục đích:** Clear Scope & Business Rules trước khi viết PRD cho 3 Use Cases mới.

---

## Use Case 1: Hệ thống Gamification (Nhiệm vụ lấy Voucher)
# Hệ thống Gamification (Lowca Quest Engine)

## 1. Tổng quan chiến lược (Product Strategy)
* **Mục tiêu:** Tăng chỉ số DAU (Daily Active Users), rút ngắn hành trình On-site Verification và điều hướng dòng tiền khách hàng.
* **Mô hình cốt lõi:** Rule-Engine (Hệ thống thực thi quy tắc).
* **Triết lý thiết kế:** **No-Code cho Admin**. Marketing/Admin có thể tự cấu hình mọi chiến dịch (Campaign) linh hoạt mà tuyệt đối không cần Developer phải hardcode mỗi khi có sự kiện mới.

---

## 2. Luồng vận hành (Operational Workflow)

### Bước 1: Quản lý Kho quà tặng (Reward Inventory)
Admin khởi tạo phần thưởng trong Dashboard trước khi tạo nhiệm vụ:
- **Quà đổi xu thường:** Chọn loại quà (`Tiết kiệm`, `Trải nghiệm`, `Đặc quyền`) + Thiết lập mức Xu.
- **Quà dịp đặc biệt:** Chọn loại `Đặc biệt` (Chỉ xuất hiện trong Quest hoặc khung giờ nhất định).

### Bước 2: Thiết lập Logic Nhiệm vụ (The Rule Engine)
Hệ thống vận hành theo cấu trúc logic **IF - THEN**:

#### **IF (Điều kiện cần - Condition Set)**
| Tham số | Lựa chọn | Ví dụ |
| :--- | :--- | :--- |
| **Action_Type** | Check-in, Payment, Review, Referral | Review quán kèm ảnh |
| **Scope** | Vendor_ID, Category_Tag, Area_ID | Quán có Tag #SàiGònXưa |
| **Value_Req** | Số lượng người, số quán, số chữ, khoảng cách | Check-in đủ 03 quán |
| **Time_Constraint** | Start/End Date, Specific Hours, Daily Loop | Diễn ra từ 28/04 - 03/05 |

#### **THEN (Phần thưởng - Reward Set)**
- **Reward_Type:** `Special_Item` (Vật phẩm ảo/thật), `Coin`, hoặc `Voucher_Code`.
- **Total_Stock:** Giới hạn tổng số lượng quà (Ví dụ: Chỉ có 100 Áo dài).
- **Winner_Selection:** `First come first served` (Ai đến trước nhận trước) hoặc `Lucky Draw`.
- **Exclusivity:** Chỉ User đạt **Level x** hoặc có **Badge y** mới được tham gia.

### Bước 3. Cấu hình hiển thị (UI/UX Configuration)
Admin có thể tùy chỉnh giao diện hiển thị cho User trên Lowca App ngay tại CMS.

#### Phần A: Visual & Header (Kích thích thị giác)
* **Hero Image:** Ảnh banner quà tặng (vd: Tượng danh lam thắng cảnh).
* **Countdown Timer:** Tự động hiển thị đồng hồ đếm ngược dựa trên thời gian sự kiện.
* **Exclusivity Badge:** Hiển thị nhãn "Dành riêng cho Thành viên Bạc/Vàng".

#### Phần B: Tracking & Progress (Theo dõi tiến độ)
* **Trang Progress:** Khi User nhấn vào Banner sẽ dẫn tới trang theo dõi nhiệm vụ cá nhân.
* **Thanh tiến độ (Progress Bar):** Hiển thị trực quan theo node. 
    * *Ví dụ: Yêu cầu 3 quán -> 3 vòng tròn check-list. Node nào xong sẽ sáng xanh.*
* **Status Label:** Text động (vd: "Bạn đã hoàn thành 1/3 quán phong cách #LịchSử").

#### Phần C: Hướng dẫn & Điều hướng (Instruction & Map)
* **Thuật toán đề xuất:** Tự động hiển thị danh sách các quán thỏa mãn `Scope` (Tag/Area) để User nhấn vào chỉ đường ngay.
* **Nút Action động:** Thay đổi theo `Action_Type` khi User ở trang Vendor:
    - `Check-in`: Hiện nút **"Chụp ảnh & Chia sẻ"**.
    - `Review`: Hiện nút **"Viết cảm nhận"**.
    - `Payment`: Hiện nút **"Đặt món ngay"**.

#### Phần D: Thông tin phần thưởng (Reward Info)
* **Stock Label:** Hiển thị số lượng còn lại theo thời gian thực (Tạo hiệu ứng FOMO).
* **Mechanism Label:** Hiển thị cơ chế nhận quà (vd: "Dành cho 100 người nhanh nhất").

### Bước 4. Kiểm soát & Phát hành (Launch Control)
1.  **Preview Mode:** Admin xem trước giao diện dưới góc nhìn User (Mobile view).
2.  **Schedule Launch:** Đặt lịch phát hành tự động.
3.  **Real-time Edit:** Cho phép chỉnh sửa nội dung/logic ngay cả khi sự kiện đang diễn ra.

---

## 3. Tài liệu tham khảo
- [Rule Engine Workflow Diagram](https://whimsical.com/minh-s-workspace7334/rule-engine-flexible-YMgf6DVnjXkeoHe8pDkEGn)

---

## 4. Socratic Gate (Các Business Rules cần làm rõ với Dev):
**Câu hỏi hay gặp**:
---
1. **Validation Trigger:** Sự kiện (Event) nào được coi là "Hoàn thành"? (Ví dụ: Nhiệm vụ "Đặt 1 đơn", thì quest hoàn thành lúc user *vừa thanh toán xong*, hay lúc *nhận hàng thành công*, hay lúc *hoàn tất review*?).
2. **Các loại quest có thể xây dựng:** Cách tạo, cách hoạt động, luồng tiếp cận các quest của user (theo dịp đặc biệt thì thường sẽ có quest như thế nào, có thể có nhiều quest cùng lúc không, hay có apply các voucher cứng user nào cũng có thể thực hiện không?)
3. **Các loại voucher user có thể dùng:** Các loại voucher người dùng thích nhất là gì, các hoạt động họ hay làm để gây nghiên "tham gia" -> "có voucher" -> lan toả Lowca

---
**Câu trả lời trước**:

### 1. Validation Trigger: Khi nào nhiệm vụ được coi là "Hoàn thành"?
Để tránh gian lận và đảm bảo tính chính xác cho On-site Verification, trạng thái "Hoàn thành" được phân tầng theo loại hành động:

* **Nhiệm vụ Check-in:** Hoàn thành ngay khi User gửi ảnh chụp tại quán + Hệ thống xác nhận GPS nằm trong bán kính cho phép (ví dụ: < 50m).
* **Nhiệm vụ Đặt đơn (Payment):** * *Trigger tạm thời:* Khi User quét QR và gửi yêu cầu Order thành công.
    * *Trigger hoàn tất:* Khi Vendor nhấn **"Xác nhận thanh toán"** trên Vendor App. Đây là điểm mấu chốt để tính Reward.
* **Nhiệm vụ Review:** Hoàn thành khi Review được đăng tải (Status: `Public`). Nếu User xóa Review ngay sau khi nhận quà, hệ thống cần có cơ chế đánh dấu (Flag) để hạn chế tham gia các Quest sau.
* **Nhiệm vụ Referral:** Hoàn thành khi "Người được mời" thực hiện xong ** đơn hàng đầu tiên** (không chỉ dừng lại ở việc tải App).

### 2. Cấu trúc Quest & Luồng tiếp cận (Quest Topology)
Hệ thống hỗ trợ đa dạng loại hình Quest để tối ưu hóa phễu người dùng:

* **Phân loại Quest:**
    * *Quest Tân thủ (Onboarding):* Lộ trình cố định trong 30 ngày đầu (Level 1 -> 4). Chỉ xuất hiện 1 lần duy nhất.
    * *Quest Sự kiện (Seasonal/Special):* Theo dịp (vd: "Săn Quà Sài Gòn Xưa" dịp 30/04). Có thời hạn và giới hạn số lượng quà. [Trước mắt build theo dạng này nha DEV]
    * *Quest Lặp lại (Daily/Weekly):* Các nhiệm vụ nhỏ như "Check-in 2 quán/tuần" để duy trì thói quen.
* **Quy tắc hiển thị:**
    * **Tính song song:** User có thể thực hiện tối đa 03 Quest cùng lúc (vd: 1 Quest Tân thủ + 1 Quest Sự kiện + 1 Quest Tuần).
    * **Quà cứng (Global Store):** Là các phần quà dành cho mọi User xuất hiện trong kho (vd: Giảm 25% cho đơn đặt qua Current Pick). Loại này không cần "nhận" Quest, chỉ cần thỏa điều kiện Action là tự động Apply.

### 3. Hệ sinh thái Voucher & Cơ chế "Gây nghiện" (Retention Mechanics)
Dựa trên hành vi của Gen Z và đặc thù F&B đường phố, các loại Voucher và hoạt động được ưu tiên:

#### QUY TẮC TÍCH LŨY XU (EARNING RULES)
*Hệ thống Rule-Engine tự động cộng Xu dựa trên các Trigger Event:*

- **Check-in tại quán (GPS Verified):** +20 xu/lần.
- **Đánh giá quán (Review):** +50 xu/bài (Cộng thêm +20 xu nếu có ảnh).
- **Đặt món thành công:** +30 xu/đơn hàng.
- **Bạn bè đặt món từ link chia sẻ:** +100 xu/lượt.
- **Hành trình tân thủ (Level 1 - 4):** Thưởng các phần quà lớn + nhiệm vụ sử dụng các tính năng trong app
- ***[Prototype](https://stitch.withgoogle.com/projects/10967230557551836373)***
- **Lên Level lẻ (Level 5 - 30):** Thưởng xu và EXP theo từng mốc nhỏ để duy trì động lực.

#### HỆ THỐNG CỬA HÀNG ĐỔI THƯỞNG (LOWCA SHOP)

##### 1. Nhóm Tiết Kiệm (200 - 500 Xu)
*Dành cho các tiện ích nhỏ hàng ngày tại các hàng quán vỉa hè.*
- **Thẻ "Thêm Topping miễn phí":** 200 Xu (Hợp tác với các xe đẩy trà sữa/bánh tráng).
- **Voucher "Trà đá/Khăn lạnh miễn phí":** 200 Xu (Áp dụng tại các quán ăn ngồi lại).
- **Freeship đơn vỉa hè:** 300 Xu (Bán kính 2km).
- **Thẻ "Nâng cấp Size L":** 350 Xu (Đổi size nước miễn phí tại các xe đẩy cafe/trà).
- **Voucher giảm 10k:** 400 Xu (Cho đơn hàng từ 50k).

##### 2. Nhóm Trải Nghiệm (600 - 1.500 Xu)
*Tăng quyền ưu tiên và khám phá các địa điểm mới.*
- **Thẻ "Ưu tiên xử lý đơn":** 600 Xu (Được phục vụ trước trong giờ cao điểm).
- **Thẻ "Giữ chỗ đẹp":** 700 Xu (Đặt trước bàn view thoáng tại quán đối tác).
- **Gói "Săn Quán Hot":** 800 Xu (Giảm giá sâu các bill trong top list cửa hàng trong 48h).
- **Gói "Combo dùng thử món mới":** 1.200 Xu (Thưởng thức món signature của quán miễn phí).
- **Voucher Nhóm 3 người:** 1.500 Xu (Giảm trực tiếp 30k).

##### 3. Nhóm Đặc Quyền & Quà Tặng (2.000 Xu trở lên)
*Khẳng định đẳng cấp User và các quà tặng hiện vật.*
- **Thẻ VIP "Lowca Star":** 2.000 Xu (Hiển thị badge đặc biệt trên profile + Ưu tiên tham gia Offline thử món mới).
- **Bộ sưu tập Sticker/Móc khóa Lowca:** 2.500 Xu (Quà tặng vật lý gửi tận nơi).
- **Thẻ "Lowca Pass - 1 tháng":** 3.500 Xu (Nhân đôi số Xu nhận được từ mọi hành động trong 30 ngày).
- **Voucher "Tiệc Sinh Nhật":** 4.500 Xu (Giảm 20% cho bill >500k kèm trang trí cơ bản).
- **Vật phẩm độc quyền (Ly/Túi tote Lowca):** 5.000 Xu.

#### CÁC QUY TẮC NGHIỆP VỤ (BUSINESS RULES)

1. **BRule001:** Xu tích lũy chỉ có giá trị đổi quà trong App, không có giá trị quy đổi thành tiền mặt.
2. **BRule002:** Các nhiệm vụ Check-in và Review bắt buộc phải qua bộ lọc AI Validation (xác thực tọa độ và tính chính xác của hình ảnh) (Phát triển trong tương lai nha).
3. **BRule003:** Khi một đơn hàng bị Hủy (Cancelled) hoặc Hoàn trả, toàn bộ Xu và EXP tương ứng sẽ bị thu hồi khỏi tài khoản User.
* **Vòng lặp gây nghiện (The Hook Loop):**
    1.  **Tham gia:** Thấy Banner Quest bắt mắt với phần quà hữu hình (Ly/Túi tote/Voucher đặc quyền).
    2.  **Hành động:** Đi khám phá quán mới thông qua gợi ý của AI (và dùng Current Pick với bạn bè).
    3.  **Nhận thưởng:** Hiệu ứng Confetti + Badge đặc quyền (vd: "Lowca Star") hiện trên Profile.
    4.  **Lan tỏa:** Nút "Khoe ngay" (Share Social) kèm ảnh món ăn đẹp mắt để nhận thêm Lowca Coin.

---
**💡 Ghi chú cho Dev:** Cần xây store riêng biệt để lưu trữ các phần quà và database trạng thái xu đang có cấp nhật theo thời gian thực (Real-time progress) thay vì chỉ lưu kết quả cuối cùng, 

---
## 5. Tham khảo UI/UX đề xuất layout:

### 5.1. ADMIN DASHBOARD (Desktop View)
**Mục tiêu:** Cấu hình hệ thống Rule-Engine theo dạng Form-Builder.

---

### A. Component: Quest Configuration Form
* **IF (Condition):**
    * `ActionSelector`: Dropdown (Check-in, Review, Payment, Referral).
    * `ScopeFilter`: Search bar tìm `Vendor_ID` hoặc Multi-select `Category_Tag`.
    * `ValueInput`: Ô nhập số lượng yêu cầu (vd: Hoàn thành 3 quán).
    * `Option đã viết trên BRQ`: ....
* **THEN (Reward):**
    * `RewardType`: Segmented Control (Voucher | Coin | Special Item).
    * `StockManager`: Ô nhập tổng số lượng quà và Toggle "Lucky Draw".
    * `Option đã viết trên BRQ`: ....

### B. Component: Live Device Preview
* **Sidebar giả lập:** Một màn hình Mobile hiển thị bên phải.
* **Dynamic Binding:** Khi Admin thay đổi `Hero_Image` hoặc `Quest_Title`, màn hình giả lập sẽ cập nhật UI ngay lập tức.

---

### 5.2. USER APP INTERFACE (Mobile View)
**Mục tiêu:** Tạo trải nghiệm Game- hóa, thúc đẩy User thực hiện nhiệm vụ.

### A. Screen: Banner thông báo nhiệm vụ

* **Hero_Banner**: Ảnh 16:9 bo góc 16px, có Gradient phủ để hiện text trắng bên trên.
* **Sticky_Countdown**: Badge đếm ngược nổi trên banner (Format: `00:00:00`).

### B. Screen: Quest Hub (Trang nhiệm vụ) - Nằm trong trang profile hoặc thanh nevigation

* **Progress_Map (Core Component)**:
    * Chuỗi các Node (Vòng tròn) kết nối với nhau.
    * **State Active**: Node nhấp nháy, có viền màu `#F26522`.
    * **State Done**: Icon Checkmark, line nối giữa các node chuyển màu cam đậm.
    * **Banner**: Về hình ảnh quà và text nhắc nhở user thực hiện thử thách
* **Vendor_Horizontal_List**: Danh sách các quán thỏa điều kiện hiện dưới dạng Card cuộn ngang.

### C. Screen: Vendor Detail (Trang chi tiết Quán)
* **Event_Notification_Bar**: Thanh thông báo nhỏ nằm dưới Header.
    * *Logic*: Chỉ hiện khi Quán này nằm trong danh sách `Scope` của một Quest đang Active.
* **Primary_CTA**: Nút hành động chính được Fixed ở dưới cùng (Bottom-fixed).
    * *Dynamic Text*: "Chụp ảnh Check-in" hoặc "Viết Review nhận quà".

---

### 5.3. FRONTEND TECHNICAL SPEC (Dành cho Dev)

### Component State Schema
| Component | Props | States |
| :--- | :--- | :--- |
| `QuestNode` | `index, status` | `locked`, `in_progress`, `completed` |
| `RewardBadge` | `type, stock_left` | `available`, `low_stock` (<10%), `out_of_stock` |
| `ActionBtn` | `action_type` | `enabled`, `disabled` (ngoài vùng định vị), `loading` |

### Hiệu ứng tương tác (Animations)
* **Confetti**: Kích hoạt hiệu ứng pháo giấy khi `current_step == total_steps`.
* **Haptic**: Rung nhẹ máy khi User hoàn thành một bước nhỏ trong chuỗi nhiệm vụ.
* **Progress Fill**: Thanh tiến độ chạy mượt (Ease-in-out) khi dữ liệu API cập nhật.

---

### 5.4. MOCK DATA
```
{
  "quest_id": "LC_SAIGON_01",
  "config": {
    "title": "Săn Quà Sài Gòn Xưa",
    "theme": "#F26522",
    "steps": 3,
    "current": 1
  },
  "display": {
    "banner": "[https://cdn.lowca.vn/banners/saigon-quest.jpg](https://cdn.lowca.vn/banners/saigon-quest.jpg)",
    "fomo_text": "Chỉ còn 15 phần quà cuối cùng!"
  }
}
```

---

# Use Case 2: Tính năng Current Pick (Đặt món nhóm)
**[💡 Core Model: Real-time Synchronized Cart & Conflict Handling]**

### 1. Product Strategy (Chiến lược sản phẩm):
- **Mục tiêu:** Tăng giá trị trung bình trên một đơn hàng (AOV), giải quyết nỗi đau "gom đơn, chia tiền, đòi tiền" của dân văn phòng hoặc nhóm bạn.
- **Cơ chế cốt lõi:** Host mở Session (Phòng) -> Bắn Link/QR -> Guest Join -> Sync Giỏ hàng Real-time -> Chia tiền -> Checkout.

### 2. Khung Requirement dành cho BA (Scope):
- **Session Management:** Vòng đời của một phòng (Bắt đầu, Timeout, Khóa phòng, Hủy phòng).
- **Cơ sở hạ tầng (Backend):** Sử dụng Web-socket hoặc Polling để giỏ hàng nhảy số trực tiếp trên máy của tất cả thành viên khi có ai đó add món.
- **UX/UI Side:** Trạng thái "Ready" (Sẵn sàng chốt), UI chia tiền Bill split (Ai ăn gì trả nấy, hoặc chia đều).

## 3. Socratic Gate (Các Business Rules BA cần làm rõ với PM):
1. **Quyền thanh toán (Payment Flow):** Có mấy luồng thanh toán? *Luồng 1:* Chỉ Host được thanh toán giùm cả nhóm. *Luồng 2:* Từng người tự nạp thanh toán phần của mình vào hệ thống, xong hết thì app mới báo cho Vendor làm món?

---

## Use Case 3: Thuật toán đấu giá Keyword (Vendor Search Ads)
**[💡 Core Model: Quality Score x Max CPC]**

### 1. Product Strategy (Chiến lược sản phẩm):
- **Mục tiêu:** Tạo nguồn doanh thu trực tiếp (Ads Monetization) cho Lowca, giúp các Vendor đường phố có cơ hội "leo top" tìm kiếm.
- **Cơ chế cốt lõi:** `Ad Rank = Bid Price (Giá tiền đấu thầu) × Quality Score (Điểm chất lượng)`.
  - *Điểm chất lượng* tính bằng: Rate sao, Khoảng cách (On-site verification), Tỉ lệ hủy đơn rác.
- **Phân phối Ads:** Ads chỉ hiển thị trên khung tỷ lệ nhất định (ví dụ: Slot thứ 2 và thứ 5 trong trang kết quả tìm kiếm).

### 2. Khung Requirement dành cho BA (Scope):
- **Vendor App Side:** Dashboard nạp tiền (Top-up balance), Chọn Keyword đấu giá, Setup Daily Budget (Ngân sách ngày), Báo cáo hiệu năng (Lượt xem, Click, Chuyển đổi).
- **End-user App:** Bắt badge "Tài trợ/Ad" để tuân thủ pháp luật về quảng cáo & UX.
- **Backend Search Engine:** API tìm kiếm bóc tách: 80% Organic Search + 20% Sponsored Search, sort theo `Ad Rank`.

### 3. Socratic Gate (Các Business Rules BA cần làm rõ với PM):
1. **Cost Model (Mô hình tốn tiền):** Vendor bị trừ tiền dựa trên Cost-Per-Click (CPC) hay Cost-Per-Mille (CPM)?
2. **Auction Logic (Cơ chế đấu giá):** Áp dụng *First-price auction* (Trừ đúng số tiền đặt cược) HAY *Second-price auction* (Trừ số tiền bằng người đứng sau + 1đ)?
3. **Keywords Exact/Broad match:** Thuật toán search quảng cáo sẽ đánh theo từ khóa chính xác (Exact match) hay mở rộng (Broad match)?