import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, RotateCw } from 'lucide-react';

const ExecutionGate: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate automatically to status after 4 seconds logic
    const timer = setTimeout(() => {
      navigate('/app/status');
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden flex flex-col h-[500px] w-full items-center justify-center relative">
      <div className="absolute top-0 w-full h-1 bg-slate-100">
         <div className="h-full bg-casso-primary w-full origin-left" style={{ animation: 'progress 4s linear' }}></div>
      </div>
      
      <div className="relative flex items-center justify-center w-40 h-40 mb-10">
        <div className="absolute inset-0 bg-casso-primary opacity-20 rounded-full animate-ping"></div>
        <div className="absolute inset-4 bg-casso-primary opacity-30 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
        <div className="relative z-10 w-24 h-24 bg-white shadow-2xl shadow-emerald-200/50 rounded-full flex items-center justify-center border-4 border-emerald-50">
           <Smartphone className="w-10 h-10 text-casso-primary" />
        </div>
      </div>

      <h2 className="text-3xl font-extrabold text-casso-dark mb-4 tracking-tight">Xác thực trên thiết bị của bạn</h2>
      <p className="text-slate-500 max-w-sm text-center font-medium leading-relaxed">
        Vui lòng mở ứng dụng <strong className="text-casso-dark font-black">CAS ID</strong> trên thiết bị di động để cung cấp sinh trắc học và xác nhận giao dịch.
      </p>

      <div className="mt-12 flex items-center gap-3 text-sm font-bold text-casso-primary bg-emerald-50 px-8 py-3 rounded-full border border-emerald-100 shadow-sm">
        <RotateCw className="w-5 h-5 animate-spin" style={{ animationDuration: '2s' }} />
        Đang quét tín hiệu CAS ID...
      </div>
    </div>
  );
};

export default ExecutionGate;
