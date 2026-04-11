import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileSignature, GripHorizontal, FileText, ChevronLeft, ArrowRight } from 'lucide-react';

const SignaturePlacement: React.FC = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleDragEnd = (e: React.DragEvent) => {
    const parent = e.currentTarget.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y))
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden flex flex-col h-[700px] w-full relative">
      <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
        <button onClick={() => navigate('/app/upload')} className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-50 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="font-extrabold text-xl text-casso-dark">Điều chỉnh vị trí khung ký</h2>
      </div>

      <div className="flex-1 flex flex-col p-6 bg-slate-100 overflow-hidden relative items-center justify-center">
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm text-sm font-bold text-casso-dark flex items-center gap-2 border border-slate-200">
          <FileText className="w-4 h-4 text-emerald-500" />
          Hợp đồng CASSO - Bekon
          <span className="text-slate-400 font-normal ml-2">Tải PDF (2.4 MB)</span>
        </div>

        {/* PDF Mock Document */}
        <div 
          className="w-full max-w-[600px] h-[80%] bg-white shadow-md border border-slate-200 rounded-lg relative overflow-hidden"
          onDragOver={(e) => e.preventDefault()}
        >
          {/* Mock Document Content */}
          <div className="absolute inset-8 border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col gap-4 opacity-50">
             <div className="h-6 w-3/4 bg-slate-200 rounded"></div>
             <div className="h-4 w-full bg-slate-100 rounded"></div>
             <div className="h-4 w-full bg-slate-100 rounded"></div>
             <div className="h-4 w-5/6 bg-slate-100 rounded"></div>
          </div>

          {/* Draggable Signature Box */}
          <div 
            draggable
            onDragEnd={handleDragEnd}
            style={{ 
              left: `${position.x}%`, 
              top: `${position.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            className="absolute z-10 w-48 h-24 border-2 border-casso-primary border-dashed bg-emerald-50/80 rounded-lg flex flex-col items-center justify-center cursor-move shadow-lg group hover:bg-emerald-100 transition-colors"
          >
            <GripHorizontal className="w-5 h-5 text-casso-primary mb-1 opacity-50 group-hover:opacity-100" />
            <FileSignature className="w-6 h-6 text-casso-primary mb-2" />
            <span className="text-xs font-bold text-casso-dark uppercase tracking-wide">KÝ TẠI ĐÂY</span>
          </div>
        </div>
        
        <div className="absolute bottom-6 bg-casso-dark text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-casso-primary"></span>
          <span className="text-sm font-medium">Kéo thả khung để chọn vùng ký số</span>
        </div>
      </div>

      <div className="px-8 py-5 border-t border-slate-100 flex justify-end items-center bg-white">
        <div className="flex items-center gap-4">
          <button className="px-8 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold text-sm bg-white hover:bg-slate-50 transition-colors">
            Đặt lại
          </button>
          <button onClick={() => navigate('/app/config')} className="px-10 py-3 bg-casso-primary text-white rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200 flex items-center gap-2">
            Tiếp tục <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignaturePlacement;
