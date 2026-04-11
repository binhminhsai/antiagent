# 1. Roadmap to develop AI Grading
- **AI PRODUCT LIFE CYCLE của WISPACE**
  - [Bài viết quan trọng](https://deepchecks.com/understanding-the-machine-learning-life-cycle/)
  - ![AI Product Life Cycle](https://deepchecks.com/wp-content/uploads/2022/08/post-new-1017.webp)
  - [Endpoint AI WISPACE hiện tại](https://api-ielts-writing.aihubproduction.com/docs#/)
- **Các checkpoint sơ bộ**
## Dự án được chia làm 3 giai đoạn [Introduction AI Grading - WISPACE Research](https://drive.google.com/file/d/19W7OIfcpRkBwbEqtIx7YXzUXBOugnDRD/view?usp=sharing):
- Giai đoạn 1: Prompt Engineering & tạo hệ thông collect data tự động (`tập trung vào 2 tuần đầu tháng 4`)
  - [x] Model Design reseaching [(Link tài liệu)](https://www.notion.so/Model-Design-Enhance-AI-Grading-ver2-1-30cad2bf74718021abd9c09b6f2db8ee?source=copy_link)
  - [x] Xây dựng teacher dashboard để lấy data từ giáo viên
  - [x] Xây dựng data train
  - [ ] Xây dựng data test (Kiệt hoặc Tài)
  - [ ] Develop prompt engineering and CoT structure (Hiên + 1 bạn)
  - [ ] Evaluate model performent with data test and viết report khuyến nghị (Hiên + 1 bạn)
  - [ ] Model redesign and validated (Hiên + 1 bạn)
  - [ ] Xây dựng data validate (Teacher + 1 bạn)
  - [ ] Cùng Academic viết report và review khuyến nghị (Teacher + 1 bạn)
  - [ ] Refinement và go live in prediction service for user interface (Hiên + 1 bạn)
- Giai đoạn 2: Ground truth dataset, fine-tune model và viết papar nộp nghiên cứu về hệ thống ASE
> Ground truth dataset (`tập trung vào tháng 4 này`)
- [ ] Xây dựng admin dashboard để hỗ trợ data management
- [ ] BD với teacher để lấy data
> Fine-tune model (tập trung vào cuối tháng 4 và tháng 5)
- [ ] Data processing and augument (`tập trung vào cuối tháng 4`)
- [ ] Fine-tune model (`tập trung vào tháng 5`)
- [ ] Evaluation model performance (`tập trung vào tháng 5`)
> Viết paper nộp nghiên cứu về hệ thống ASE (tập trung vào cuối tháng 4 và tháng 5)
- [ ] Tìm kiếm mentor hướng dẫn trình tự viết và nộp nghiên cứu (`tập trung vào cuối tháng 4`)
- [ ] Viết paper và ghi nhận lại quá trình fine-tuning, cải tiến và evaluate performance (`tập trung vào tháng 5`)
- [ ] Biên tập lại thành một dạng paper để nộp cho các tạp chí khoa học (`tập trung vào tháng 5`)
- Giai đoạn 3: Rebuild AI Framework (Self-hosted Llama 3 / Qwen) (`tập trung vào tháng 6`)