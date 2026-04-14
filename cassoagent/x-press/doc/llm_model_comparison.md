# LLM Model Selection Report – Qwen 14B & DeepSeek 14B

## 1. Mục tiêu

Lựa chọn bộ model open-source để thay thế:

- Code generation: GPT-5.3-Codex
- Reasoning: GPT-5.4

Giải pháp đề xuất:

- Qwen 2.5 Coder 14B → gen code
- DeepSeek R1 Distill 14B → reasoning

---

## 2. So sánh với model hiện tại (GPT-5.3 Codex & GPT-5.4)

### 2.1 Code Generation

| Tiêu chí | GPT-5.3 Codex | Qwen 2.5 Coder 14B |
|----------|--------------|--------------------|
| Chất lượng code | 🔥🔥🔥🔥🔥 | 🔥🔥🔥🔥 |
| Hiểu context lớn | 🔥🔥🔥🔥🔥 | 🔥🔥🔥 |
| React / TS | 🔥🔥🔥🔥🔥 | 🔥🔥🔥🔥 |
| Hallucination | thấp | trung bình |
| Tốc độ | cloud-scale | nhanh (local GPU) |
| Cost | cao | rất rẻ |

👉 Kết luận:

Qwen 14B ≈ **80–90% Codex** cho code thực tế

---

### 2.2 Reasoning

| Tiêu chí | GPT-5.4 | DeepSeek 14B |
|----------|---------|--------------|
| Logic reasoning | 🔥🔥🔥🔥🔥 | 🔥🔥🔥🔥 |
| Planning | 🔥🔥🔥🔥🔥 | 🔥🔥🔥🔥 |
| Multi-step | 🔥🔥🔥🔥🔥 | 🔥🔥🔥 |
| Stability | 🔥🔥🔥🔥🔥 | 🔥🔥🔥 |
| Cost | cao | rất thấp |

👉 Kết luận:

DeepSeek 14B ≈ **75–85% GPT-5.4**

---

## 3. So sánh với model tham số lớn hơn

### 3.1 Với 32B models

| Model | Ưu điểm | Nhược điểm |
|------|--------|-----------|
| Qwen 32B | tốt hơn 14B ~15–25% | chậm hơn |
| DeepSeek 32B | reasoning sâu hơn | tốn VRAM |
| 14B | nhanh hơn | kém hơn chút |

---

### 3.2 Với 70B models

| Model | Đánh giá |
|------|---------|
| 70B | gần GPT-4 level |
| 14B | thấp hơn đáng kể |

👉 nhưng:

- 70B cần multi-GPU / A100
- không phù hợp MVP

---

## 4. So sánh với model cùng phân khúc (~14B)

### 4.1 Code models

| Model | Đánh giá |
|------|---------|
| Qwen 2.5 Coder 14B | 💥 tốt nhất |
| CodeLlama 13B | yếu hơn |
| StarCoder 15B | kém hơn |

---

### 4.2 Reasoning models

| Model | Đánh giá |
|------|---------|
| DeepSeek 14B | 💥 tốt nhất |
| Mistral 7B | yếu hơn |
| LLaMA 13B | trung bình |

---

## 5. Performance thực tế (RTX 4090)

| Model | Tokens/s | Latency |
|------|----------|--------|
| 7B | 80–120 | 1–2s |
| 14B | 40–80 | 2–4s |
| 32B | 15–30 | 5–10s |

---

## 6. Ưu điểm của combo Qwen 14B + DeepSeek 14B

- Tách rõ:
  - Code → Qwen
  - Reasoning → DeepSeek
- Tối ưu GPU 24GB
- Chi phí thấp
- Dễ deploy (vLLM)

---

## 7. Nhược điểm

- Không bằng GPT-5.x về độ ổn định
- Cần prompt tốt
- Không mạnh bằng 32B+

---

## 8. Kết luận

👉 Combo:

Qwen 14B + DeepSeek 14B

= **Giải pháp open-source tốt nhất cho MVP hiện tại**

---

## 9. Insight quan trọng

> 14B model = sweet spot giữa cost / speed / quality

