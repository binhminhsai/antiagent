import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Loader2, UploadCloud } from 'lucide-react';

const DocumentUpload: React.FC = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSimulateUpload = () => {
    setIsUploading(true);
    let curr = 0;
    const interval = setInterval(() => {
      curr += 5;
      setProgress(curr);
      if (curr >= 100) {
        clearInterval(interval);
        setTimeout(() => navigate('/app/placement'), 300);
      }
    }, 150); // slower interval to show the 65% visually
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden flex flex-col h-[600px] w-full">
      <div className="px-8 py-6 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
        <div className="w-8 h-8 rounded-full bg-emerald-100 text-casso-primary flex items-center justify-center font-bold text-sm">1</div>
        <h2 className="font-exrabold text-xl text-casso-dark tracking-tight">Tải PDF</h2>
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row p-8 gap-8 relative">
        {!isUploading ? (
          <>
            <div 
              onClick={handleSimulateUpload}
              className="flex-1 border-2 border-dashed border-emerald-200 rounded-2xl bg-emerald-50/30 hover:bg-emerald-50 transition-colors flex flex-col items-center justify-center cursor-pointer group p-8 text-center"
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-md transition-all text-casso-primary border border-emerald-100">
                <UploadCloud className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-casso-dark mb-2">Tải PDF</h3>
              <p className="text-sm text-slate-500 mb-6">Chọn tệp PDF hoặc kéo thả vào đây</p>
              <div className="px-4 py-1.5 bg-slate-100 rounded-md text-[11px] font-medium text-slate-500 uppercase tracking-widest">
                Chỉ PDF - Tối đa 20 MB
              </div>
            </div>
            
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center p-8 opacity-60">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-slate-400 border border-slate-200">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-slate-700 mb-2">Xem trước & đặt vị trí chữ ký</h3>
              <p className="text-sm text-slate-500">Hãy tải PDF để xem trước và đặt vị trí chữ ký.</p>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center rounded-b-[2rem]">
            <div className="relative mb-8">
               <Loader2 className="w-16 h-16 text-emerald-200 animate-spin" />
               <div className="absolute inset-0 flex items-center justify-center">
                 <UploadCloud className="w-6 h-6 text-casso-primary" />
               </div>
            </div>
            <h3 className="text-2xl font-bold text-casso-dark mb-3">Đang tải lên...</h3>
            <p className="text-5xl font-black text-casso-primary tracking-tighter">{progress}%</p>
            
            <div className="w-80 h-3 bg-slate-100 rounded-full mt-8 overflow-hidden shadow-inner">
               <div className="h-full bg-casso-primary transition-all duration-200" style={{ width: `${progress}%` }}></div>
            </div>
            
            <button 
              onClick={(e) => { e.stopPropagation(); setIsUploading(false); setProgress(0); }} 
              className="mt-10 px-8 py-3 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-50 text-sm font-bold transition-all hover:scale-105"
            >
              Huỷ tải lên
            </button>
          </div>
        )}
      </div>

      {!isUploading && (
        <div className="px-8 py-6 border-t border-slate-100 flex justify-between items-center bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
          <div className="px-5 py-2.5 border border-slate-200 bg-slate-50 rounded-lg text-sm font-medium text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors">
            Gửi PDF đã ký qua email (tùy chọn) <span className="ml-2 text-xs">▼</span>
          </div>
          <div className="flex items-center gap-4">
             <button className="px-8 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold text-sm bg-white hover:bg-slate-50 transition-colors">
              Đặt lại
            </button>
            <button className="px-10 py-3 bg-slate-300 text-white rounded-xl font-bold text-sm cursor-not-allowed">
              Ký
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
