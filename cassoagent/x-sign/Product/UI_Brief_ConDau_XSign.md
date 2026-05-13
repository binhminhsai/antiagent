# UI Brief: Con Dấu Doanh Nghiệp & Signature Block — X-sign

---

**Version:** 1.0  
**Ngày:** 2026-05-08  
**Dùng cho:** Designer thiết kế component con dấu và signature block trên X-sign / CAS ID  
**Đọc nhanh trong:** ~10 phút

---

## 1. Bức Tranh Tổng Thể

Khi một doanh nghiệp ký hợp đồng trên X-sign, tài liệu PDF sẽ hiển thị một **Signature Block** hình chữ nhật chứa:

```
┌─────────────────────────────────────────────────────────────┐
│                           │                                  │
│   [KHU VỰC CHỮ KÝ]       │   [KHU VỰC THÔNG TIN PHÁP LÝ]  │
│   Chữ ký tay handwriting  │   Tên dịch vụ CA                │
│   + Con dấu tròn (DN)     │   Ngày giờ ký                   │
│                           │   Serial number                  │
│                           │   Trạng thái hợp lệ             │
│                           │                                  │
└─────────────────────────────────────────────────────────────┘
```

Component này xuất hiện ở **2 bối cảnh:**
1. **Trên PDF** sau khi ký (embedded, permanent)
2. **Preview trong app** khi user chuẩn bị ký (interactive, draggable)

---

## 2. Anatomy of the Signature Block

### 2.1 Khu vực trái — Visual Signature

#### A. Chữ ký tay (Handwriting Signature)

**Nguồn dữ liệu:** Image từ CAS ID (do user tạo: vẽ tay, upload, hoặc type font)

| Thuộc tính | Spec |
|-----------|------|
| Chiều cao | ~60–80px (tỷ lệ thực tế trên PDF A4) |
| Background | Trong suốt (transparent PNG) |
| Màu nét | Đen hoặc xanh đậm (tuỳ user chọn khi tạo) |
| Căn | Căn trái, padding 8–12px |

**Label "by [Tên người ký]" — bên dưới chữ ký:**

```
Quy tắc wrap tên:
  2–3 chữ  → cùng 1 dòng: "by Nguyễn Văn A"
  >3 chữ   → xuống dòng ở chữ thứ 3:
                "by Nguyễn Văn"
                "Trần Linh"

Font: Regular, 8–9pt (trên PDF), sans-serif
Màu: #374151 (gray-700)
```

#### B. Con Dấu Tròn Doanh Nghiệp (Company Seal)

**Vị trí:** Bên dưới chữ ký tay, trong cùng khu vực trái. Có thể chồng nhẹ lên góc chữ ký (kiểu đóng dấu vật lý truyền thống).

---

## 3. Thiết Kế Chi Tiết: Con Dấu Tròn (Company Seal)

### 3.1 Cấu trúc hình học

```
         ╔══════════════════╗
       ╔═╝    VÒNG NGOÀI   ╚═╗
      ║   ┌──────────────┐    ║
      ║   │    VÙNG      │    ║  ← Vòng ngoài: Tên công ty (chạy cong theo vòng tròn)
      ║   │   TRUNG TÂM  │    ║
      ║   │  [Logo/Icon] │    ║  ← Trung tâm: Logo công ty HOẶC ngôi sao 5 cánh
      ║   │              │    ║
      ║   └──────────────┘    ║
      ║   MST: 0316794479     ║  ← Vòng trong/đáy: MST hoặc tên viết tắt
       ╚═╗                 ╔═╝
         ╚══════════════════╝
```

**Kích thước:**
- Trên PDF A4: đường kính 48–60px (khoảng 1.5–2cm thực tế)
- Preview trong app: đường kính 80–100px
- Tỷ lệ vòng ngoài text so với đường kính: ~85%

### 3.2 Chi tiết các vùng

#### Vòng ngoài — Tên công ty

| Thuộc tính | Spec |
|-----------|------|
| Vị trí text | Chạy cong theo đường tròn (arc text), nửa trên |
| Font | Uppercase, bold, 6–8pt (PDF) |
| Spacing | Letter-spacing rộng hơn bình thường (tracked) |
| Màu | Đỏ (#CC0000 hoặc #B91C1C) — chuẩn con dấu VN |
| Độ dài tối đa | Nếu tên quá dài → font nhỏ hơn để fit vào arc |

**Ví dụ:** `CÔNG TY TNHH CASSO`

#### Trung tâm

| Loại | Khi nào dùng | Mô tả |
|------|-------------|-------|
| Ngôi sao 5 cánh | Mặc định — khi không có logo | Ngôi sao chuẩn VN, đặc, màu đỏ |
| Logo công ty | Khi công ty upload logo lên CAS ID | PNG transparent, fit trong circle 40% đường kính |

#### Đáy — MST / Tên viết tắt

| Thuộc tính | Spec |
|-----------|------|
| Nội dung | `MST: [Mã số thuế]` hoặc tên viết tắt công ty |
| Vị trí | Nửa dưới, text cong theo vòng tròn (ngược với phần trên) |
| Font | Regular, 5–6pt (PDF) |
| Màu | Đỏ (#CC0000) |

#### Đường viền

| Thuộc tính | Spec |
|-----------|------|
| Vòng ngoài | Stroke 1.5–2px, màu đỏ #CC0000 |
| Vòng trong | Stroke 0.75–1px, màu đỏ #CC0000 (cách vòng ngoài ~4–6px) |
| Vòng trong cùng (nếu có) | Stroke 0.5px — optional, dùng cho dấu 3 vòng |

### 3.3 Màu sắc

| Biến thể | Màu chính | Khi nào dùng |
|---------|----------|-------------|
| **Đỏ (mặc định)** | #CC0000 / #B91C1C | Tất cả doanh nghiệp (chuẩn VN) |
| **Xanh navy** | #1E3A8A | Variant cho ngành tài chính/ngân hàng (nếu được phê duyệt) |
| **Xám (disabled)** | #9CA3AF | Khi chứng thư hết hạn hoặc bị thu hồi |

**Opacity trên PDF:** 85–90% — không đục hoàn toàn để giữ được chất "đóng dấu thực"

### 3.4 States của con dấu

| State | Visual | Mô tả |
|-------|--------|-------|
| **Valid** | Màu đỏ đầy đủ, opacity 90% | Chứng thư còn hiệu lực, chữ ký hợp lệ |
| **Preview** | Màu đỏ, opacity 60%, dashed border | Đang trong quá trình drag & drop placement |
| **Expired** | Màu xám, icon ⚠ nhỏ ở góc | Chứng thư đã hết hạn |
| **Revoked** | Màu xám + gạch chéo mờ | Chứng thư bị thu hồi |

---

## 4. Khu Vực Phải — Thông Tin Pháp Lý (Metadata Section)

### 4.1 Divider (Vách ngăn)

```
Đường kẻ dọc:
  Màu: #000000 hoặc màu chữ ký
  Opacity: 20–30%
  Width: 0.5–1px
  Chiều cao: 90% của block (padding top/bottom)
```

### 4.2 Nội dung (theo thứ tự từ trên xuống)

```
CAS Digital Signature Service        ← Cố định, không đổi
──────────────────────────────
2026.05.08                           ← Date: YYYY.MM.DD
14:32:07                             ← Time: HH:mm:ss (server time GMT+7)
──────────────────────────────
SN: VN-CAS-2026-ABC123456           ← Serial number chứng thư
──────────────────────────────
✓ Đã ký số                          ← Trạng thái (VN)
  Digitally Signed                   ← hoặc EN (tùy ngôn ngữ user)
```

**Typography:**
- Service name: Bold, 6–7pt
- Date/Time: Regular, 6pt, monospace
- Serial: Regular, 5–6pt, monospace, màu #6B7280
- Trạng thái: Bold, 7pt, màu #00A85E (xanh lá khi hợp lệ)

### 4.3 Bilingual — Chuyển đổi Anh/Việt

| Field | Tiếng Việt | Tiếng Anh |
|-------|-----------|-----------|
| Service name | CAS Digital Signature Service | CAS Digital Signature Service |
| Date label | Ngày | Date |
| Trạng thái hợp lệ | ✓ Đã ký số | ✓ Digitally Signed |
| Trạng thái không hợp lệ | ⚠ Chữ ký không hợp lệ | ⚠ Signature Invalid |
| By label | bởi | by |

---

## 5. Signature Block — Tổng hợp Layout

### 5.1 Cá nhân (Personal)

```
┌─────────────────────────────────────────────────────────────┐
│                           ┊                                  │
│  [Chữ ký tay image]       ┊  CAS Digital Signature Service  │
│                           ┊  2026.05.08  14:32:07           │
│  ────────────────         ┊  SN: VN-CAS-2026-XXXXX         │
│  by Nguyễn Văn A          ┊                                  │
│                           ┊  ✓ Đã ký số                     │
│                           ┊                                  │
└─────────────────────────────────────────────────────────────┘

Kích thước: ~280 × 80px (trên PDF A4)
Tỷ lệ trái/phải: 55% / 45%
```

### 5.2 Doanh nghiệp (Enterprise)

```
┌─────────────────────────────────────────────────────────────┐
│                           ┊                                  │
│  [Chữ ký tay image]       ┊  CAS Digital Signature Service  │
│                           ┊  2026.05.08  14:32:07           │
│  ────────────────         ┊  SN: VN-CAS-2026-XXXXX         │
│  by Nguyễn Văn             ┊                                  │
│  Trần Linh                ┊  ✓ Đã ký số                     │
│                           ┊                                  │
│    [CON DẤU TRÒN]         ┊                                  │
│  (đặt chồng góc trái dưới)┊                                  │
└─────────────────────────────────────────────────────────────┘

Kích thước: ~280 × 110px (cao hơn cá nhân để chứa con dấu)
Con dấu: đường kính ~60px, đặt tại góc dưới-trái, chồng nhẹ lên chữ ký
```

---

## 6. Quy Tắc Responsive & Kích Thước

### 6.1 Trên PDF (embedded — không thay đổi sau khi ký)

| Tài liệu | Kích thước block | Con dấu |
|---------|-----------------|---------|
| A4 | 280 × 80px (cá nhân) / 280 × 110px (DN) | 60px diameter |
| Letter | 265 × 76px / 265 × 105px | 57px |

### 6.2 Preview trong app (interactive)

| Màn hình | Kích thước block | Con dấu |
|---------|-----------------|---------|
| Desktop (≥1280px) | 320 × 100px / 320 × 140px | 80px |
| Tablet (768–1279px) | 280 × 88px / 280 × 120px | 70px |
| Mobile (<768px) | Full width / 240 × 130px | 60px |

**Resize handles:** Góc + cạnh (giữ tỷ lệ khi resize)  
**Minimum size:** 200 × 60px (cá nhân) / 200 × 90px (DN)  
**Maximum size:** 400 × 160px

---

## 7. Micro-interactions & States trong App

### 7.1 Signature Block trong app (trước khi ký)

| State | Visual behavior |
|-------|----------------|
| **Idle** | Hiển thị preview với border xanh #00A85E dashed |
| **Hover** | Border chuyển solid, shadow nhẹ, cursor "move" |
| **Dragging** | Opacity 70%, border dashed, ghost image theo cursor |
| **Dropped** | Snap vào vị trí, bounce nhẹ 0.2s, border solid |
| **Selected** | Hiện resize handles (8 điểm), border xanh solid 2px |
| **Confirming** | Pulse animation, loading spinner overlay mờ |
| **Signed** | Checkmark animation, border đổi thành #00A85E solid, opacity 100% |

### 7.2 Con dấu rendering (khi load từ API)

```
Loading state: Skeleton hình tròn placeholder (pulse animation)
     ↓
Loaded: Con dấu fade-in 0.3s ease
     ↓
Error: Icon "?" placeholder màu #9CA3AF + tooltip "Không tải được con dấu"
```

---

## 8. Con Dấu — Quy Tắc Thiết Kế Nhanh (Checklist cho Designer)

### ✅ Bắt buộc

- [ ] Hình tròn — không oval, không vuông
- [ ] Màu đỏ chính (#CC0000) — không thay đổi mặc định
- [ ] 2 vòng đồng tâm (vòng ngoài và vòng trong)
- [ ] Tên công ty UPPERCASE, chạy cong phần nửa trên
- [ ] MST ở nửa dưới
- [ ] Ngôi sao 5 cánh ở trung tâm (nếu không có logo)
- [ ] Opacity 85–90% (không đục 100%)
- [ ] Export dưới dạng SVG (scalable) — không PNG cho con dấu

### ⚠️ Cần chú ý

- [ ] Tên công ty dài → giảm font-size, giữ letter-spacing tối thiểu
- [ ] Test ở kích thước nhỏ nhất (48px diameter trên PDF) — text phải đọc được
- [ ] Đảm bảo text arc không bị cắt ở 2 đầu vòng tròn
- [ ] Con dấu không được chồng lên chữ ký tay quá 30% diện tích

### ❌ Không làm

- [ ] Không dùng hình vuông hay hình khác
- [ ] Không dùng màu xanh, vàng, đen cho con dấu mặc định
- [ ] Không để text chạy thẳng ngang trong con dấu tròn
- [ ] Không scale non-uniform (chỉ scale đều)

---

## 9. File Output Cần Thiết từ Designer

| File | Format | Mô tả |
|------|--------|-------|
| `seal-enterprise-default.svg` | SVG | Con dấu mặc định (placeholder tên, MST) |
| `seal-enterprise-example.svg` | SVG | Ví dụ có tên công ty thật |
| `signature-block-personal.svg` | SVG / Figma component | Block cá nhân (empty state + filled state) |
| `signature-block-enterprise.svg` | SVG / Figma component | Block doanh nghiệp (với con dấu) |
| `signature-block-states.fig` | Figma | Tất cả states (idle, hover, dragging, signed, invalid) |
| `seal-states.fig` | Figma | Con dấu các states (valid, preview, expired, revoked) |

---

## 10. Tham Khảo Visual

### Sản phẩm để nhìn vào

| Sản phẩm | Điểm học | Link |
|---------|---------|------|
| **Viindoo Sign** | Cách layout signature block trong Odoo PDF | viindoo.com/apps/app/17.0/viin_sign |
| **DocuSign Enterprise** | Company stamp placement + resize UX | docusign.com |
| **Adobe Acrobat Sign** | Visual signature block layout, chain of trust panel | acrobat.adobe.com |
| **VNPT eContract** | Vietnamese CA signature block chuẩn pháp lý VN | econtract-premium-docs.vnpt.vn |
| **Viettel CA** | Con dấu doanh nghiệp VN visual reference | viettelca.com.vn |

### Con dấu VN thực tế

Cấu trúc chuẩn con dấu tròn theo Nghị định 99/2016/NĐ-CP:
- Tên doanh nghiệp (tiếng Việt, đầy đủ)
- Hình thức pháp lý (TNHH, Cổ phần, v.v.)
- Hình tròn, đường kính không quá 36mm (vật lý)
- Màu mực: tùy doanh nghiệp (đỏ phổ biến nhất)

→ Trong X-sign: giữ tròn, đỏ, 2 vòng — đủ để người nhận nhận ra ngay "đây là con dấu công ty"
