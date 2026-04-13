import React, { useState } from 'react';
import GanttChart from './components/GanttChart';
import TaskModal from './components/TaskModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { initialTasks, INITIAL_CATEGORIES } from './utils/data';
import { Plus } from 'lucide-react';

function App() {
  const [categories, setCategories] = useLocalStorage('casso-categories-v2', INITIAL_CATEGORIES);
  const [visibleCats, setVisibleCats] = useLocalStorage('casso-visible-cats-v2', INITIAL_CATEGORIES.map(c => c.id));
  
  const [tasks, setTasks] = useLocalStorage('casso-schedule-tasks-v4', initialTasks);
  const [fontSize, setFontSize] = useLocalStorage('casso-gantt-font-size', 15);
  const [editingTask, setEditingTask] = useState(null);

  const handleSave = (taskData) => {
    if (taskData.id.startsWith('new-')) {
      setTasks([...tasks, { ...taskData, id: Date.now().toString() }]);
    } else {
      setTasks(tasks.map(t => t.id === taskData.id ? taskData : t));
    }
    setEditingTask(null);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    setEditingTask(null);
  };

  const handleAddNew = () => {
    setEditingTask({
      id: `new-${Date.now()}`,
      title: '',
      category: categories[0]?.id || '',
      days: [0], // Default là Thứ 2
      startHour: 8,
      endHour: 10,
      highlight: 'none',
      notes: '',
      fileUrl: ''
    });
  };

  const toggleFilter = (catId) => {
    setVisibleCats(prev => 
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    );
  };

  const handleAddCategory = () => {
    const name = window.prompt("Nhập tên Phân loại/Dự án mới:");
    if (!name || name.trim() === '') return;
    
    // Chọn random 1 hệ màu pastel
    const colors = [
      { c: 'bg-rose-100/80', b: 'border-rose-400 text-rose-900' },
      { c: 'bg-cyan-100/80', b: 'border-cyan-400 text-cyan-900' },
      { c: 'bg-fuchsia-100/80', b: 'border-fuchsia-400 text-fuchsia-900' },
      { c: 'bg-lime-100/80', b: 'border-lime-400 text-lime-900' }
    ];
    const colorTheme = colors[Math.floor(Math.random() * colors.length)];
    
    const newId = `cat-${Date.now()}`;
    setCategories([...categories, { id: newId, label: name.trim(), color: colorTheme.c, border: colorTheme.b }]);
    setVisibleCats([...visibleCats, newId]);
  };

  const filteredTasks = tasks.filter(t => visibleCats.includes(t.category));

  return (
    <div className="min-h-screen bg-[#f1f4f6] flex flex-col items-center py-10 px-4 sm:px-10 font-sans">
      <div className="w-full max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Time Matrix ⏱️</h1>
            <p className="text-slate-500 font-medium mt-1">Bản đồ phân bổ quỹ thời gian theo khung 8H-24H</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white pl-4 pr-2 py-1.5 rounded-2xl shadow-[4px_4px_15px_-5px_rgba(0,0,0,0.05)] border border-slate-100">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest mr-1">Chữ:</span>
              <button onClick={() => setFontSize(f => Math.max(10, f - 1))} className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-200 flex items-center justify-center font-black text-slate-600 transition-colors">-</button>
              <span className="font-black w-6 text-center text-slate-800 text-lg">{fontSize}</span>
              <button onClick={() => setFontSize(f => Math.min(24, f + 1))} className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-200 flex items-center justify-center font-black text-slate-600 transition-colors">+</button>
            </div>

            <button 
              onClick={handleAddCategory}
              className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-800 px-5 py-2.5 rounded-2xl font-bold transition-all active:scale-95"
            >
              <Plus size={20} strokeWidth={3} /> Dự Án
            </button>

            <button 
              onClick={handleAddNew}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-2xl font-bold shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 active:scale-95"
            >
              <Plus size={20} strokeWidth={3} /> Thêm Task
            </button>
          </div>
        </div>

        <GanttChart tasks={tasks} categories={categories} onTaskClick={setEditingTask} fontSize={fontSize} />
        
        <p className="text-center text-sm font-medium text-slate-400 mt-10">
          Dữ liệu được lưu trữ an toàn bằng LocalStorage tại trình duyệt của bạn (F5 không mất đồ).
        </p>

        {editingTask && (
          <TaskModal 
            task={editingTask} 
            categories={categories}
            onClose={() => setEditingTask(null)}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default App;
