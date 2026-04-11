import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Verified, SearchCode, FileCheck2 } from 'lucide-react';

const TransactionDetails: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden flex flex-col h-[750px] w-full relative">
      <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
        <button onClick={() => navigate('/app/status')} className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm focus:outline-none">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="font-extrabold text-xl text-casso-dark">Chi tiết giao dịch</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
         {/* Top Status */}
         <div className="flex items-center gap-5 mb-10 pb-8 border-b border-slate-100">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100 shadow-sm">
               <Verified className="w-8 h-8 text-casso-primary" />
            </div>
            <div>
               <h3 className="font-extrabold text-2xl text-casso-dark tracking-tight">Ký tài liệu X-Sign thành công</h3>
               <p className="text-sm font-medium text-slate-500 mt-1">Giao dịch pháp lý đã được ghi nhận bằng CAS ID.</p>
            </div>
         </div>

         {/* Hash details */}
         <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-5 mb-10 shadow-sm">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                   <FileCheck2 className="w-5 h-5 text-slate-400" /> Document Hash
                </div>
                <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 font-mono text-xs font-bold text-slate-600 shadow-sm">
                   0x9388...12938
                </div>
             </div>
             <div className="h-[1px] w-full bg-slate-200"></div>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                   <SearchCode className="w-5 h-5 text-slate-400" /> Transaction Hash
                </div>
                <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 font-mono text-xs font-bold text-slate-600 shadow-sm">
                   0x9330...e102
                </div>
             </div>
         </div>

         {/* History Timeline */}
         <h4 className="font-extrabold text-lg text-casso-dark mb-8 tracking-tight px-2">Lịch sử giao dịch</h4>
         <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
             
             {/* Timeline Item 1 */}
             <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                 <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-casso-primary text-slate-50 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                   <Verified className="w-4 h-4 text-white" />
                 </div>
                 <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                     <div className="flex items-center justify-between mb-2">
                         <div className="font-extrabold text-casso-dark">Ký số thành công</div>
                         <time className="font-mono text-xs text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md">14:05</time>
                     </div>
                     <div className="text-slate-500 text-sm font-medium">Bởi NGUYỄN VĂN A qua CAS ID Mobile. Vị trí thiết bị: Hồ Chí Minh, VN.</div>
                 </div>
             </div>

             {/* Timeline Item 2 */}
             <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                 <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-200 text-slate-50 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                 <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow opacity-70 group-hover:opacity-100">
                     <div className="flex items-center justify-between mb-2">
                         <div className="font-bold text-slate-700">Đã gửi yêu cầu CC/BCC</div>
                         <time className="font-mono text-xs text-slate-500 font-bold bg-slate-100 px-2.5 py-1 rounded-md">14:03</time>
                     </div>
                     <div className="text-slate-400 text-sm font-medium">Hệ thống gửi bản trích yếu email tới alexander@example.com.</div>
                 </div>
             </div>

             {/* Timeline Item 3 */}
             <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                 <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-200 text-slate-50 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                 <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow opacity-70 group-hover:opacity-100">
                     <div className="flex items-center justify-between mb-2">
                         <div className="font-bold text-slate-700">Khởi tạo giao dịch</div>
                         <time className="font-mono text-xs text-slate-500 font-bold bg-slate-100 px-2.5 py-1 rounded-md">14:02</time>
                     </div>
                     <div className="text-slate-400 text-sm font-medium">Hệ thống X-Sign tự động cấu hình matrix xác thực cho Hợp đồng #2024-001.</div>
                 </div>
             </div>

         </div>
      </div>
    </div>
  );
};
export default TransactionDetails;
