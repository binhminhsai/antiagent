import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Download, Receipt, FileCheck } from 'lucide-react';

const SignatureStatus: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden flex flex-col h-[650px] w-full items-center justify-center p-10 relative">
      <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-8 shadow-sm border border-emerald-100">
        <CheckCircle2 className="w-12 h-12 text-casso-primary" />
      </div>

      <h2 className="text-3xl font-extrabold text-casso-dark mb-3 tracking-tight">Ký tài liệu thành công!</h2>
      <p className="text-slate-500 font-medium text-center max-w-sm mb-10 leading-relaxed">
        Tài liệu của bạn đã được ký và xác thực thành công trên hệ thống <strong className="text-casso-dark">X-Sign</strong>.
      </p>

      <div className="w-full max-w-md bg-slate-50 border border-slate-200 rounded-3xl p-6 mb-10 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-slate-200">
               <FileCheck className="w-6 h-6 text-casso-dark" />
            </div>
            <div>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Mã xác thực</p>
               <p className="font-mono text-lg font-bold text-casso-dark">XS-9928-XQ01</p>
            </div>
         </div>
         <button className="p-3 bg-white rounded-xl border border-slate-200 text-slate-500 hover:text-casso-primary hover:border-emerald-200 hover:bg-emerald-50 transition-colors shadow-sm focus:outline-none">
            <Download className="w-5 h-5" />
         </button>
      </div>

      <div className="flex items-center gap-4">
         <button onClick={() => navigate('/app/upload')} className="px-8 py-3.5 border border-slate-200 text-slate-600 rounded-2xl font-bold text-sm bg-white hover:bg-slate-50 transition-colors shadow-sm">
           Về trang chủ
         </button>
         <button onClick={() => navigate('/app/details')} className="px-8 py-3.5 bg-casso-dark text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 flex items-center gap-2">
           <Receipt className="w-4 h-4" /> Kết quả xác minh
         </button>
      </div>
    </div>
  );
};

export default SignatureStatus;
