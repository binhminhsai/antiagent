import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, QrCode, BellRing, BrainCircuit, CheckCircle2, Fingerprint } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-base font-sans selection:bg-casso-primary selection:text-white text-casso-dark overflow-y-auto">
      {/* Navbar */}
      <nav className="fixed w-full top-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-border">
        <div className="w-full max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/3ff4e07c-b9ca-40f9-8af9-ba3bedbd67df" alt="X-sign Logo" className="w-10 h-10 rounded-xl" />
            <span className="font-extrabold text-2xl tracking-tight text-casso-dark">X-sign</span>
          </div>
          <button onClick={() => navigate('/app/upload')} className="px-6 py-2.5 bg-casso-primary text-white rounded-full font-bold text-sm hover:bg-emerald-600 transition-all shadow-lg shadow-casso-primary/30">
             Vào trang ứng dụng
          </button>
        </div>
      </nav>

      <main className="w-full max-w-6xl mx-auto px-6 pt-32 pb-32">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8 min-h-[70vh]">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-casso-primary font-bold text-sm">
              <span className="w-2 h-2 rounded-full bg-casso-primary animate-pulse"></span>
              Xác thực một lần, dùng mọi nơi
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight text-casso-dark">
              Nền tảng ký số thông minh <span className="text-casso-primary block mt-2">thế hệ mới</span>
            </h1>
            <p className="text-lg text-muted-text max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Giải pháp toàn diện từ CAS ID, mang đến trải nghiệm làm việc vượt trội, an toàn và tối ưu cho doanh nghiệp của bạn.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
              <button onClick={() => navigate('/app/upload')} className="w-full sm:w-auto px-8 py-4 bg-casso-primary text-white rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-casso-primary/20 hover:shadow-2xl hover:-translate-y-1">
                Bắt đầu ngay
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-border text-casso-dark rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all text-center">
                Tìm hiểu thêm
              </button>
            </div>
          </div>
          
          <div className="flex-1 relative w-full flex justify-center lg:justify-end">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-transparent rounded-full blur-3xl opacity-50 -z-10"></div>
            <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/0684b918-9e9c-46ef-b87b-4c5dc2b1d86b" alt="Casso Mascot 3D" className="w-[80%] max-w-[500px] object-contain drop-shadow-2xl" />
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-20 pt-16 border-t border-slate-border text-center">
          <p className="text-sm font-bold text-muted-text uppercase tracking-widest mb-8">Được tin dùng bởi hơn 500+ doanh nghiệp</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 grayscale">
             <div className="text-2xl font-black font-sans text-slate-800">CASSO</div>
             <div className="text-2xl font-black font-serif text-slate-800">VINAMILK</div>
             <div className="text-2xl font-black font-mono tracking-widest text-slate-800">VIETTEL</div>
             <div className="text-2xl font-black font-sans text-slate-800 italic">Momo</div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-40">
          <div className="text-center md:text-left mb-16">
            <h2 className="text-casso-primary font-bold text-sm tracking-widest uppercase mb-4">Tính năng đột phá</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-casso-dark">Trải nghiệm vượt trội.</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-panel border border-slate-border p-8 rounded-3xl hover:border-casso-primary transition-colors group">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <QrCode className="w-7 h-7 text-casso-primary" />
              </div>
              <h4 className="text-xl font-bold text-casso-dark mb-4">QR Login</h4>
              <p className="text-muted-text leading-relaxed">Đăng nhập nhanh chóng và an toàn chỉ với một thao tác quét mã QR từ điện thoại.</p>
            </div>

            <div className="bg-slate-panel border border-slate-border p-8 rounded-3xl hover:border-casso-primary transition-colors group">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <BellRing className="w-7 h-7 text-casso-primary" />
              </div>
              <h4 className="text-xl font-bold text-casso-dark mb-4">Push Notification</h4>
              <p className="text-muted-text leading-relaxed">Nhận thông báo tức thì khi có tài liệu cần ký, không bỏ lỡ bất kỳ giao dịch nào.</p>
            </div>

            <div className="bg-slate-panel border border-slate-border p-8 rounded-3xl hover:border-casso-primary transition-colors group">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <BrainCircuit className="w-7 h-7 text-casso-primary" />
              </div>
              <h4 className="text-xl font-bold text-casso-dark mb-4">AI Assistant</h4>
              <p className="text-muted-text leading-relaxed">Trợ lý AI hỗ trợ rà soát nội dung và đề xuất các điều khoản quan trọng trong hợp đồng.</p>
            </div>
          </div>
        </div>

        {/* CAS ID Showcase */}
        <div className="mt-40 bg-casso-dark rounded-[3rem] p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-casso-primary/20 blur-[100px] rounded-full"></div>
          
          <div className="flex-1 space-y-8 z-10">
            <h2 className="text-casso-primary font-bold text-sm tracking-widest uppercase">Sức mạnh từ CAS ID</h2>
            <h3 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Trải nghiệm quy trình xác nhận ký mượt mà ngay trên thiết bị di động
            </h3>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3 text-slate-300 text-lg">
                <CheckCircle2 className="w-6 h-6 text-casso-primary" /> An toàn tuyệt đối với sinh trắc học
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-lg">
                <CheckCircle2 className="w-6 h-6 text-casso-primary" /> Liên kết thiết bị tức thì
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-lg">
                <CheckCircle2 className="w-6 h-6 text-casso-primary" /> Pháp lý đảm bảo bởi CA
              </li>
            </ul>
          </div>

          <div className="flex-1 w-full max-w-sm z-10 flex justify-center">
            {/* Mobile Mockup */}
            <div className="bg-white rounded-[2.5rem] p-6 shadow-2xl border-8 border-slate-800 relative w-full">
              <div className="w-24 h-6 bg-slate-800 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-2xl"></div>
              
              <div className="flex items-center justify-between border-b border-slate-border pb-4 mt-6">
                <h4 className="font-bold text-casso-dark text-lg px-2">X-sign Verify</h4>
                <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-500 font-bold flex items-center justify-center cursor-pointer">×</div>
              </div>

              <div className="py-8 flex flex-col items-center border-b border-slate-border">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-casso-primary flex items-center justify-center mb-6">
                  <Fingerprint className="w-8 h-8" />
                </div>
                <h5 className="font-bold text-2xl text-casso-dark mb-2">Xác nhận ký tên</h5>
                <p className="text-muted-text text-sm">HĐ thuê văn phòng #2024-01</p>
              </div>

              <div className="py-6 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-text">Người gửi</span>
                  <span className="font-bold text-casso-dark">Casso Co.</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-text">Thời gian</span>
                  <span className="font-bold text-casso-dark flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div> 14:30
                  </span>
                </div>
              </div>

              <button className="w-full py-4 bg-casso-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 mt-4 shadow-lg shadow-casso-primary/30">
                Xác nhận ký
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-40 text-center max-w-3xl mx-auto pb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-casso-dark mb-6 leading-tight">
            Sẵn sàng số hoá quy trình ký của bạn?
          </h2>
          <p className="text-lg text-muted-text mb-10">
            Tham gia cùng hàng ngàn doanh nghiệp đang sử dụng X-sign để tối ưu vận hành.
          </p>
          <div className="flex flex-col items-center gap-4">
            <button onClick={() => navigate('/app/upload')} className="px-10 py-5 bg-casso-primary text-white rounded-full font-bold text-xl hover:bg-emerald-600 transition-all shadow-xl shadow-casso-primary/20 hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3">
              Dùng thử miễn phí <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-sm font-medium justify-center text-muted-text flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Không yêu cầu thẻ tín dụng • Huỷ mọi lúc
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
