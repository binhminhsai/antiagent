import React from 'react';
import { DAYS } from '../utils/data';

const getHighlightClasses = (highlight) => {
  switch (highlight) {
    case 'red': 
      return 'ring-2 ring-red-500 shadow-[0_4px_15px_rgba(239,68,68,0.5)] z-40 scale-[1.02]';
    case 'yellow': 
      return 'ring-2 ring-amber-400 shadow-[0_4px_15px_rgba(251,191,36,0.5)] z-40 scale-[1.02]';
    case 'green': 
      return 'ring-2 ring-emerald-500 shadow-[0_4px_15px_rgba(16,185,129,0.5)] z-40 scale-[1.02]';
    default: 
      return '';
  }
};

export default function GanttChart({ tasks, categories, onTaskClick, fontSize = 15 }) {
  const TOTAL_DAYS = 7;
  const START_HOUR = 8;
  const END_HOUR = 24;
  const HOURS_PER_DAY = END_HOUR - START_HOUR; // 16 tiếng
  const TOTAL_HOURS = TOTAL_DAYS * HOURS_PER_DAY; // 112 tiếng

  const scrollRef = React.useRef(null);

  const scrollRight = () => scrollRef.current?.scrollBy({ left: 800, behavior: 'smooth' });
  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -800, behavior: 'smooth' });

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Nút hỗ trợ cuộn nhanh */}
      <div className="flex justify-end gap-2 px-2">
        <button onClick={scrollLeft} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold shadow-sm transition-all active:scale-95">&larr; Cuộn Trái (Đầu tuần)</button>
        <button onClick={scrollRight} className="px-4 py-2 bg-slate-800 hover:bg-black text-white rounded-xl font-bold shadow-sm transition-all active:scale-95">Cuộn Phải (Cuối tuần) &rarr;</button>
      </div>

      <div ref={scrollRef} className="w-full max-h-[75vh] overflow-auto bg-[#f6f8f9] rounded-2xl shadow-sm border border-slate-200 relative">
        <div className="min-w-[1800px] xl:min-w-[2000px] pb-6 px-6">
          
          {/* Header - Timeline - Dính chặt trên cùng (Sticky) */}
          <div className="flex sticky top-0 z-50 bg-[#f6f8f9] pt-6 pb-4 border-b-2 border-slate-200/60 drop-shadow-sm">
            <div className="w-48 sticky left-0 z-[60] bg-[#f6f8f9] flex-shrink-0 text-slate-400 font-bold text-sm tracking-widest flex items-end pb-2 border-r border-transparent">
              PROJECT / CATEGORY
            </div>
            
            <div className="flex-1 flex border border-slate-200 bg-white shadow-sm rounded-md overflow-hidden">
              {DAYS.map(day => (
                <div key={day} className="flex-1 flex items-center justify-center border-r last:border-r-0 border-slate-200 text-sm text-slate-800 font-black py-4 uppercase tracking-wider">
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Rows Container */}
          <div className="relative mt-2">
          {/* Lưới dọc (Vertical Grid Lines cho 7 ngày) */}
          <div className="absolute top-0 bottom-0 left-48 right-0 flex pointer-events-none z-0">
            {DAYS.map((d, i) => (
              <div key={i} className="flex-1 border-r-2 border-dashed border-slate-300 opacity-60 last:border-r-0"></div>
            ))}
          </div>

          {/* Dòng theo DỰ ÁN (Categories) */}
          {categories.map((cat, catIndex) => {
            
            // Lấy task của category và sort theo ngày xuất hiện sớm nhất
            const catTasks = tasks
              .filter(t => t.category === cat.id)
              .sort((a, b) => {
                 const aFirstDay = Math.min(...(Array.isArray(a.days) ? a.days : [a.day !== undefined ? a.day : 0]));
                 const bFirstDay = Math.min(...(Array.isArray(b.days) ? b.days : [b.day !== undefined ? b.day : 0]));
                 if (aFirstDay !== bFirstDay) return aFirstDay - bFirstDay;
                 return a.startHour - b.startHour;
              });

            // Stacking độc lập: Mỗi Task 1 hàng ngang rạch ròi
            const leveledTasks = catTasks.map((t, index) => ({ ...t, level: index }));

            // Chiều cao tự dãn theo số task (mỗi task là 1 bậc)
            const maxLevelCount = leveledTasks.length;
            const ROW_HEIGHT = Math.max(120, maxLevelCount * 56 + 24);

            return (
              <div key={cat.id} className="flex relative group transition-colors hover:bg-slate-50/50" style={{ height: `${ROW_HEIGHT}px` }}>
                
                {/* Tên Dự án (Trục Y) - Dính chặt bên trái */}
                <div className="w-48 sticky left-0 z-20 bg-[#f6f8f9] group-hover:bg-[#f2f4f6] flex-shrink-0 flex items-center justify-start pr-6 font-black text-slate-800 text-[15px] leading-snug">
                  <div className={`w-3 h-3 rounded-sm ${cat.color} ${cat.border} border mr-3 shadow-inner`}></div>
                  {cat.label}
                </div>
                
                {/* Vùng Timeline Ngang Của Dự Án */}
                <div className="flex-1 relative border-b-2 border-slate-200 group-last:border-b-0 z-10">
                  
                  {leveledTasks.map((task) => {
                    const daysArray = Array.isArray(task.days) && task.days.length > 0 ? task.days : (task.day !== undefined ? [task.day] : [0]);
                    const firstDay = Math.min(...daysArray);
                    const lastDay = Math.max(...daysArray);

                    const renderStart = Math.max(task.startHour, START_HOUR);
                    const renderEnd = Math.min(task.endHour, END_HOUR);
                    
                    // Xử lý loại trừ thời gian lỗi
                    if (firstDay === lastDay && renderStart >= renderEnd) return null;
                    
                    const topPos = 12 + (task.level * 56);
                    const highlightClass = getHighlightClasses(task.highlight);

                    // Trải dài duy nhất 1 khối liên tục từ firstDay tới lastDay
                    const absStart = firstDay * HOURS_PER_DAY + (renderStart - START_HOUR);
                    const absEnd = lastDay * HOURS_PER_DAY + (renderEnd - START_HOUR);
                    
                    const left = (absStart / TOTAL_HOURS) * 100;
                    const width = ((absEnd - absStart) / TOTAL_HOURS) * 100;

                    return (
                      <div
                        key={task.id}
                        onClick={() => onTaskClick(task)}
                        // Cấu hình overflow-visible để chữ tràn ra ngoài chứ không bị cắt mất
                        className={`absolute min-w-max rounded-md cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:z-50 border flex flex-col justify-center px-4 overflow-visible ${cat?.color || 'bg-slate-100'} ${cat?.border || 'border-slate-300 text-slate-700'} ${highlightClass}`}
                        style={{ left: `${left}%`, width: `${width}%`, top: `${topPos}px`, height: `${Math.max(40, fontSize * 2.8)}px` }}
                        title={`${task.title} (${DAYS[firstDay]} - ${DAYS[lastDay]} | ${Math.floor(task.startHour)}h${(task.startHour % 1)*60 || '00'} to ${Math.floor(task.endHour)}h${(task.endHour % 1)*60 || '00'})`}
                      >
                        <span 
                          // Xóa truncate, thêm whitespace-nowrap để bảo toàn nguyên chữ
                          className="font-black leading-tight tracking-normal drop-shadow-sm whitespace-nowrap z-20 pointer-events-none" 
                          style={{ fontSize: `${fontSize}px` }}
                        >
                          {task.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </div>
  );
}
