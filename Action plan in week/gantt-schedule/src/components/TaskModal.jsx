import React, { useState, useEffect } from 'react';
import { DAYS } from '../utils/data';
import { X, Trash2, Save, XCircle } from 'lucide-react';

export default function TaskModal({ task, categories, onClose, onSave, onDelete }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    day: 0,
    startHour: 8,
    endHour: 10,
    highlight: 'none'
  });

  useEffect(() => {
    if (task) setFormData(task);
  }, [task]);

  if (!task) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['day', 'startHour', 'endHour'].includes(name) ? Number(value) : value
    }));
  };

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end font-sans">
      {/* Lớp nền mờ click đổi tắt Sidebar */}
      <div 
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Khung Sidebar trượt từ phải ra (Slide over) */}
      <div className="relative w-full max-w-[480px] h-full bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] flex flex-col overflow-y-auto animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-slate-100 bg-slate-50/50 sticky top-0 z-10">
          <h2 className="text-2xl font-black text-slate-800">
            {task.id.startsWith('new-') ? '✨ Thêm Task Mới' : '🛠️ Chỉnh sửa Task'}
          </h2>
          <button onClick={onClose} className="p-2.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-all">
            <X size={22} strokeWidth={3} />
          </button>
        </div>
        
        {/* Form Content */}
        <div className="p-8 space-y-7 flex-1">
          <div>
            <label className="block text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-2">Tên công việc</label>
            <input 
              type="text" name="title" value={formData.title} onChange={handleChange}
              className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all font-bold text-lg text-slate-900"
              placeholder="Nhập tên task..."
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-2">Dự án / Phân loại</label>
              <select name="category" value={formData.category} onChange={handleChange}
                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all font-bold text-slate-800">
                <option value="">Chọn dự án...</option>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-2">Highlight (Nổi bật)</label>
              <select name="highlight" value={formData.highlight || 'none'} onChange={handleChange}
                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all font-bold text-slate-800">
                <option value="none">Mặc định</option>
                <option value="red">🔥 Khẩn cấp (Đỏ)</option>
                <option value="yellow">⭐ Cần chú ý (Vàng)</option>
                <option value="green">🧠 Deep Work (Xanh)</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
            <div className="grid grid-cols-1 gap-5">
              <div>
                <label className="block text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-3">Ngày thực hiện (Chọn nhiều)</label>
                <div className="flex flex-wrap gap-2">
                  {DAYS.map((d, i) => {
                    const daysArray = Array.isArray(formData.days) ? formData.days : (formData.day !== undefined ? [formData.day] : []);
                    const isActive = daysArray.includes(i);
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          const newDays = isActive ? daysArray.filter(dayIndex => dayIndex !== i) : [...daysArray, i];
                          setFormData(prev => ({ ...prev, days: newDays }));
                        }}
                        className={`px-3 py-2 rounded-xl text-sm font-bold border-2 transition-all ${isActive ? 'bg-blue-100 border-blue-500 text-blue-700 shadow-sm scale-105' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
                      >
                        {d}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-2">Giờ bắt đầu</label>
                  <input type="number" step="0.25" min="0" max="24" name="startHour" value={formData.startHour} onChange={handleChange}
                    className="w-full border-2 border-slate-200 bg-white rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 font-bold text-slate-800 text-lg shadow-sm" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-2">Giờ kết thúc</label>
                  <input type="number" step="0.25" min="0" max="24" name="endHour" value={formData.endHour} onChange={handleChange}
                    className="w-full border-2 border-slate-200 bg-white rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 font-bold text-slate-800 text-lg shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-slate-200 bg-white flex flex-col gap-3 mt-auto sticky bottom-0 z-10">
          <button onClick={() => onSave(formData)} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2">
            <Save size={20} strokeWidth={2.5} /> Lưu toàn bộ
          </button>
          
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-3.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
              <XCircle size={18} strokeWidth={2.5} /> Bỏ qua
            </button>
            <button 
              onClick={() => onDelete(task.id)} 
              className="flex-1 py-3.5 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <Trash2 size={18} strokeWidth={2.5} /> Xóa thẻ này
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
