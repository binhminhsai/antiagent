
import React from 'react';
import { Info, ChevronDown } from 'lucide-react';

const AssessmentCard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">Overall Assessment:</h2>
          <span className="text-slate-400 text-xs flex items-center gap-1 italic">
            <Info size={14} /> Không thể chỉnh sửa nội dung này
          </span>
        </div>
        <div className="space-y-3">
          {['Summary', 'Specific Suggestions', 'Next Steps'].map((item) => (
            <details key={item} className="group border border-slate-100 rounded-lg">
              <summary className="p-3 cursor-pointer flex justify-between items-center text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                {item}
                <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-3 pt-0 text-sm text-slate-600 leading-relaxed">
                Detailed content for {item.toLowerCase()} will appear here after analysis.
              </div>
            </details>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-bold text-center mb-6 text-slate-800">Writing Statistic</h2>
        <div className="flex justify-around items-center">
          <div className="text-center">
            <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-semibold">Word Count</p>
            <p className="text-3xl font-bold text-slate-800">307</p>
          </div>
          <div className="w-px h-12 bg-slate-200"></div>
          <div className="text-center">
            <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-semibold">Completion Time</p>
            <p className="text-3xl font-bold text-slate-800">35:22</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentCard;
