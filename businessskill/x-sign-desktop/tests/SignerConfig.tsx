import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ShieldAlert, Verified, ArrowRight, Save, UserCircle2 } from 'lucide-react';

const SignerConfig: React.FC = () => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden flex flex-col h-[650px] w-full relative">
      <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/app/placement')} className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-50 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="font-extrabold text-xl text-casso-dark">Thông tin người ký số</h2>
        </div>
        
        {/* Toggle just for presentation */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-xl border border-slate-200">
           <button onClick={() => setIsRegistered(false)} className={`px-4 py-1.5 rounded-lg text-[11px] uppercase tracking-wider font-bold transition-all ${!isRegistered ? 'bg-white shadow-sm text-casso-dark' : 'text-slate-400'}`}>Chưa đăng ký CAS ID</button>
           <button onClick={() => setIsRegistered(true)} className={`px-4 py-1.5 rounded-lg text-[11px] uppercase tracking-wider font-bold transition-all ${isRegistered ? 'bg-white shadow-sm text-casso-dark' : 'text-slate-400'}`}>Đã đăng ký</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center custom-scrollbar">
        <div className="w-full max-w-xl space-y-8">
          {/* Identity Security Block */}
          {!isRegistered ? (
            <div className="bg-orange-50 border border-orange-100 rounded-3xl p-8 flex gap-5">
              <ShieldAlert className="w-8 h-8 text-orange-500 shrink-0 mt-1" />
              <div>
                <h4 className="font-extrabold text-lg text-orange-900 mb-2">Identity Security</h4>
                <p className="text-sm text-orange-800/80 leading-relaxed mb-6 font-medium">
                  Hợp đồng này yêu cầu CAS ID để liên kết chữ ký an toàn. Người ký sẽ được yêu cầu xác thực danh tính trên ứng dụng CAS ID trước khi hoàn tất kỹ số.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-bold bg-white px-4 py-2 rounded-xl text-orange-600 border border-orange-200 shadow-sm">
                  <span className="text-orange-400 font-sans text-lg leading-none">*</span> Người nhận cần đăng ký tài khoản CAS ID
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 flex items-center justify-between">
              <div className="flex items-center gap-5">
                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-emerald-100">
                   <UserCircle2 className="w-10 h-10 text-emerald-600" />
                 </div>
                 <div>
                   <h4 className="text-[10px] text-emerald-700 font-bold tracking-widest uppercase mb-1">Tên đầy đủ</h4>
                   <p className="font-black text-2xl text-casso-dark tracking-tight">NGUYỄN VĂN A</p>
                   <p className="text-sm text-emerald-800/80 mt-1 flex items-center gap-2 font-medium">
                     CCCD: <span className="font-mono text-emerald-900 font-bold tracking-wider">012345678901</span>
                   </p>
                 </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <span className="px-4 py-1.5 bg-casso-dark text-white rounded-lg text-[10px] font-bold tracking-widest uppercase shadow-md shadow-slate-800/20">CAS ID REQUIRED</span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-white px-3 py-1 rounded-full border border-emerald-200 shadow-sm">
                   <Verified className="w-4 h-4" /> Đã có tài khoản
                </span>
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-6 pt-4 border-t border-slate-100">
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-3">Email nhận PDF đã ký</label>
               <input type="email" placeholder="alexander@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-casso-primary focus:bg-white transition-all focus:ring-4 focus:ring-emerald-50 shadow-sm" />
             </div>
             
             <div className="grid grid-cols-2 gap-6">
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">CC <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">(Tuỳ chọn)</span></label>
                 <input type="email" placeholder="Nhiều email, phân tách bằng dấu phẩy" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-casso-primary focus:bg-white transition-all focus:ring-4 focus:ring-emerald-50 shadow-sm" />
               </div>
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">BCC <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">(Tuỳ chọn)</span></label>
                 <input type="email" placeholder="Nhiều email, phân tách bằng dấu phẩy" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-casso-primary focus:bg-white transition-all focus:ring-4 focus:ring-emerald-50 shadow-sm" />
               </div>
             </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-5 border-t border-slate-100 flex justify-between items-center bg-white">
        <div className="text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-emerald-500" />
          Bảo mật cấp độ cao nhất bởi CAS ID
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-3.5 border border-slate-200 text-slate-600 rounded-2xl font-bold text-sm bg-white hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Save className="w-4 h-4 text-slate-400" /> Lưu nháp
          </button>
          <button onClick={() => navigate('/app/execute')} className="px-10 py-3.5 bg-casso-primary text-white rounded-2xl font-bold text-sm hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-200 flex items-center gap-2">
            Yêu cầu ký số <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default SignerConfig;
