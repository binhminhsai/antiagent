import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';

const WizardLayout: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  let currentStep = 1;
  if (path.includes('execute')) currentStep = 2;
  if (path.includes('status') || path.includes('details')) currentStep = 3;

  return (
    <div className="min-h-screen bg-slate-panel font-sans text-casso-dark flex flex-col items-center">
      {/* Top Banner & Header */}
      <header className="w-full bg-white border-b border-slate-200 flex flex-col items-center shadow-sm">
        <div className="w-full py-2 flex justify-center border-b border-emerald-50 bg-emerald-50/30">
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold tracking-wide uppercase">
            <Shield className="w-4 h-4" /> Ký số an toàn cho tài liệu của bạn
          </div>
        </div>
        <div className="py-4 px-6 flex items-center justify-between w-full max-w-6xl">
          <div className="flex items-center gap-3">
             <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/3ff4e07c-b9ca-40f9-8af9-ba3bedbd67df" alt="Logo" className="w-10 h-10 rounded-xl" />
             <div>
               <h1 className="font-extrabold text-xl leading-tight text-casso-dark">Casso X-Sign</h1>
               <p className="text-xs text-muted-text font-medium">Tải lên PDF và ký.</p>
             </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-muted-text">
            <span className="text-casso-primary border-b-[3px] border-casso-primary pb-1 pt-1">Tải tài liệu</span>
            <span className="hover:text-casso-dark cursor-pointer transition-colors">Xác minh</span>
            <span className="hover:text-casso-dark cursor-pointer transition-colors">Tổng quan kỹ thuật</span>
            <div className="flex items-center gap-1 text-[10px] bg-slate-100 p-1 rounded-full border border-slate-200">
               <span className="bg-emerald-600 text-white rounded-full px-2.5 py-1">VI</span>
               <span className="px-2.5 py-1 hover:text-casso-dark cursor-pointer transition-colors">EN</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="w-full max-w-4xl mx-auto mt-16 mb-24 flex flex-col items-center px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-5xl font-black text-slate-800 mb-2 tracking-tight">X-Sign</h2>
          <p className="text-slate-500 font-bold text-sm tracking-wide">TẢI LÊN PDF VÀ KÝ.</p>
        </div>

        {/* CSS Stepper from image */}
        <div className="w-full max-w-3xl bg-white border border-slate-border rounded-2xl p-8 mb-10 shadow-sm">
          <div className="flex justify-between items-center mb-8 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <span>Bắt đầu bằng cách tải PDF lên và chuẩn bị yêu cầu ký.</span>
            <span className="text-casso-primary">BƯỚC {currentStep}/3</span>
          </div>
          <div className="relative flex justify-between items-center px-4">
             <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[2px] bg-slate-100 z-0"></div>
             
             {/* Progress Bar */}
             <div className="absolute left-4 top-1/2 -translate-y-1/2 h-[3px] bg-emerald-500 transition-all duration-500 ease-out z-0" style={{ width: currentStep === 1 ? '10%' : currentStep === 2 ? '50%' : '90%' }}></div>
             
             {[
               { num: 1, label: 'Tải PDF & yêu cầu quyền' },
               { num: 2, label: 'Quét QR' },
               { num: 3, label: 'Tài liệu đã ký' }
             ].map((step) => (
                <div key={step.num} className="relative z-10 flex flex-col items-center justify-center w-32">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ring-4 ring-white shadow-sm
                    ${currentStep >= step.num ? 'bg-emerald-500 text-white' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>
                    {step.num}
                  </div>
                  <span className={`text-[11px] font-bold mt-4 text-center transition-colors
                    ${currentStep >= step.num ? 'text-slate-700' : 'text-slate-400'}`}>
                    {step.label}
                  </span>
                </div>
             ))}
          </div>
        </div>

        {/* Content Outlet */}
        <div className="w-full max-w-3xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default WizardLayout;
