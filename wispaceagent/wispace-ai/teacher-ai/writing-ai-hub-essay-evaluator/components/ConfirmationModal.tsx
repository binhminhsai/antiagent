
import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onConfirmNext?: () => void;
}

const ConfirmationModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, onConfirmNext }) => {
  if (!isOpen) return null;

  const RatingScale = ({ label }: { label: string }) => (
    <div className="space-y-4">
      <p className="text-[15px] font-medium text-slate-700 leading-relaxed">{label}</p>
      <div className="flex justify-between items-center max-w-xs mx-auto">
        <span className="text-xs text-slate-400 font-medium">Thấp</span>
        <div className="flex gap-4">
          {[1, 2, 3, 4, 5].map(num => (
            <label key={num} className="flex flex-col items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name={label.slice(0, 5)} 
                className="w-5 h-5 border-slate-300 text-[#1fb2aa] focus:ring-[#1fb2aa]" 
              />
              <span className="text-xs text-slate-500 font-medium group-hover:text-[#1fb2aa]">{num}</span>
            </label>
          ))}
        </div>
        <span className="text-xs text-slate-400 font-medium">Cao</span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-800">Xác nhận bài chấm</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="p-8 space-y-10">
          <RatingScale label="1. Bạn đánh giá nội dung feedback của AI cho bài writing này đạt bao nhiêu điểm?" />
          <RatingScale label="2. Bạn hãy cho biết mức độ tự tin của bản thân đối với nội dung sửa bài chấm AI của bạn?" />
        </div>
        <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-100 transition-all"
          >
            Huỷ
          </button>
          <button 
            onClick={onConfirm}
            className="px-10 py-2.5 rounded-xl bg-[#1fb2aa] text-white font-bold text-sm hover:bg-[#1a9b94] shadow-md hover:shadow-lg transform active:scale-95 transition-all"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
