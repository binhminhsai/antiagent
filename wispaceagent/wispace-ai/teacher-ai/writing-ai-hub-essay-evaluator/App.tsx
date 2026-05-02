
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ScoreCard from './components/ScoreCard';
import AssessmentCard from './components/AssessmentCard';
import EssayViewer from './components/EssayViewer';
import FeedbackSection from './components/FeedbackSection';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import { ChevronLeft, X } from 'lucide-react';
import { FeedbackItem, FeedbackCategory } from './types';

const INITIAL_FEEDBACK: FeedbackItem[] = [
  { id: '1', text: "The sentence is too vague and lacks development; it does not clearly address how technology affects communication, which is the main topic.", improvementExample: "For instance, social media allows people to connect instantly across continents, enhancing global interaction.", category: 'TR', checked: true, isAiGenerated: true, range: { start: 0, end: 43 } },
  { id: '2', text: "The essay mentions both views but does not fully develop or compare them in depth, and lacks a clear, balanced discussion.", improvementExample: "While digital tools offer convenience, face-to-face interactions remain essential for deep emotional connection.", category: 'CC', checked: false, isAiGenerated: true, range: { start: 190, end: 231 } },
  { id: '3', text: "The opinion is expressed, but the explanation is weak and not supported with detailed examples or analysis.", improvementExample: "In my view, technology is a double-edged sword that requires careful management to remain beneficial.", category: 'LR', checked: false, isAiGenerated: true, range: { start: 500, end: 574 } },
];

const App: React.FC = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>(INITIAL_FEEDBACK);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [fontSizeLevel, setFontSizeLevel] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [recentId, setRecentId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  // Clear recentId after a while
  useEffect(() => {
    if (recentId) {
      const timer = setTimeout(() => setRecentId(null), 10000); // Keep it visible for 10s as "recent"
      return () => clearTimeout(timer);
    }
  }, [recentId]);

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 4000);
  };

  // Lifted state for scores - Initialized to whole numbers as per requirements
  const [scores, setScores] = useState({
    task: 7,
    coherence: 8,
    lexical: 7,
    grammar: 7
  });

  // Lifted state for category assessments - now per category
  const [strengths, setStrengths] = useState<Record<string, string[]>>({
    TR: ["The essay addresses both views of the topic as required."],
    CC: ["Some examples like Facebook and Instagram are provided to illustrate points."],
    LR: [],
    GRA: []
  });
  const [improvements, setImprovements] = useState<Record<string, string[]>>({
    TR: ["The essay lacks detailed development of each view, with explanations too brief."],
    CC: ["The conclusion does not effectively summarize or synthesize the discussion."],
    LR: ["Main ideas are not clearly presented with topic sentences."],
    GRA: []
  });
  const [selectedIssues, setSelectedIssues] = useState<Record<string, string[]>>({
    TR: [],
    CC: [],
    LR: [],
    GRA: []
  });

  const handleStrengthsUpdate = (cat: string, val: string[]) => {
    setStrengths(prev => ({ ...prev, [cat]: val }));
  };

  const handleImprovementsUpdate = (cat: string, val: string[]) => {
    setImprovements(prev => ({ ...prev, [cat]: val }));
  };

  const handleIssuesUpdate = (cat: string, val: string[]) => {
    setSelectedIssues(prev => ({ ...prev, [cat]: val }));
  };

  const handleEditRequest = (id: string) => {
    setEditingId(id);
    setSelectedId(id);
    
    // 1. Scroll the highlight into view in essay first
    const highlightElement = document.getElementById(`highlight-${id}`);
    if (highlightElement) {
      const rect = highlightElement.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      const viewportOffset = window.innerHeight * 0.35;
      
      window.scrollTo({
        top: absoluteTop - viewportOffset,
        behavior: 'smooth'
      });
    }

    // 2. Then scroll corresponding card into view in the sidebar
    setTimeout(() => {
      const element = document.getElementById(`feedback-item-${id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleDeleteRequest = (id: string) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setFeedbackItems(prev => prev.filter(item => item.id !== itemToDelete));
      if (selectedId === itemToDelete) setSelectedId(null);
      if (editingId === itemToDelete) setEditingId(null);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleUpdateFeedback = (id: string, newText: string, newExample?: string, newCategory?: 'TR' | 'CC' | 'LR' | 'GRA') => {
    setFeedbackItems(prev => prev.map(item => 
      item.id === id ? { ...item, text: newText, improvementExample: newExample, category: newCategory, isNew: false, checked: true, isAiGenerated: false } : item
    ));
    setEditingId(null);
    
    // Logic for Options A: If newly saved category doesn't match active filter
    if (newCategory && selectedFilters.length > 0 && !selectedFilters.includes(newCategory)) {
      setRecentId(id);
      showToast(`Nhận xét này thuộc tiêu chí ${newCategory}. Hãy điều chỉnh bộ lọc để xem tất cả các mục liên quan.`);
    }
  };

  const handleBulkUpdateFeedback = (newItems: FeedbackItem[]) => {
    // When bulk editing, we assume any item edited loses its AI tag
    // However, the current bulk edit logic in FeedbackSection might need to track which ones were actually changed.
    // Simplifying: if they saved bulk edits, we consider them "reviewed/edited" if they were part of the edit draft.
    setFeedbackItems(newItems);
  };

  const handleAddNewFeedback = (start: number, end: number) => {
    const newId = `new-${Date.now()}`;
    const newItem: FeedbackItem = {
      id: newId,
      text: "",
      checked: false,
      isNew: true,
      isManual: true, // Mark as manual so the highlight color #DDF6F3 persists
      isAiGenerated: false,
      range: { start, end }
    };

    setFeedbackItems(prev => {
      const items = [...prev, newItem];
      return items.sort((a, b) => (a.range?.start || 0) - (b.range?.start || 0));
    });
    setEditingId(newId);
    setSelectedId(newId);
    
    setTimeout(() => {
      // 1. Scroll the highlight into view in essay first
      const highlightElement = document.getElementById(`highlight-${newId}`);
      if (highlightElement) {
        const rect = highlightElement.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        const viewportOffset = window.innerHeight * 0.35;
        
        window.scrollTo({
          top: absoluteTop - viewportOffset,
          behavior: 'smooth'
        });
      }

      // 2. Then scroll corresponding card into view in the sidebar
      const element = document.getElementById(`feedback-item-${newId}`);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleCancelNewFeedback = (id: string) => {
    setFeedbackItems(prev => prev.filter(item => item.id !== id));
    setEditingId(null);
    if (selectedId === id) setSelectedId(null);
  };

  const handleAddGeneralFeedback = () => {
    const newId = `gen-${Date.now()}`;
    const newItem: FeedbackItem = {
      id: newId,
      text: "",
      checked: false,
      isNew: true,
      isManual: true,
      isAiGenerated: false,
    };

    setFeedbackItems(prev => [newItem, ...prev]);
    setEditingId(newId);
    setSelectedId(newId);
    
    // General feedback has no highlight to scroll to, so we only scroll the sidebar card
    setTimeout(() => {
      const element = document.getElementById(`feedback-item-${newId}`);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSubmission = (mode: 'normal' | 'prev' | 'next') => {
    if (mode === 'prev') {
      alert('Evaluation submitted successfully! Loading previous essay...');
    } else if (mode === 'next') {
      alert('Evaluation submitted successfully! Loading next essay...');
    } else {
      alert('Evaluation submitted successfully!');
    }
  };

  const handleFontSizeChange = (delta: number) => {
    setFontSizeLevel(prev => Math.max(-2, Math.min(2, prev + delta)));
  };

  const handleScoreUpdate = (key: keyof typeof scores, value: number) => {
    // Key ensures synchronization across the entire app
    setScores(prev => ({ ...prev, [key]: Math.floor(value) }));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-32">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <button className="flex items-center gap-2 text-slate-500 hover:text-[#1fb2aa] mb-6 transition-colors group">
          <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Trở lại</span>
        </button>

        {/* Sticky Student Information Section */}
        <div className="sticky top-[72px] z-30 mb-8 -mx-4 px-4 py-2 bg-[#f8fafc]/80 backdrop-blur-md">
          <div className="bg-white rounded-xl shadow-sm border border-[#1fb2aa]/20 p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-medium text-sm">Tên học viên:</span>
                <span className="text-[#004d4d] font-bold text-sm">[Student Name]</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-medium text-sm">Lớp:</span>
                <span className="text-[#004d4d] font-bold text-sm">[Class Name]</span>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-medium text-sm">Ngày nộp:</span>
                <span className="text-slate-700 font-semibold text-sm">20:30 14/05/2026</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-medium text-sm">Hình thức:</span>
                <span className="text-slate-700 font-semibold text-sm">Bài tập</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-10 text-slate-800 leading-tight">
            Your essay has been evaluated based on the IELTS Task 2 criteria!
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <ScoreCard scores={scores} onScoreUpdate={handleScoreUpdate} isEditMode={isEditMode} />
            <AssessmentCard />
          </div>

          <div className="bg-teal-50 border border-[#1fb2aa]/30 rounded-xl p-6 mb-12">
            <h3 className="text-[#1fb2aa] font-bold text-sm mb-2 uppercase tracking-wide">IELTS Writing Task 2:</h3>
            <p className="text-sm text-slate-700 italic leading-relaxed">
              Today, technology is very popular in our life. But people have different ideas about how technology affect our communication. 
              Some think it makes us more sociable, others think it makes us less. This essay will talk about both sides.
            </p>
          </div>

          <div className="mb-6 flex items-center justify-start gap-3 p-1">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Điều chỉnh cỡ chữ:</span>
            <div className="flex gap-2">
              <button 
                onClick={() => handleFontSizeChange(-1)}
                disabled={fontSizeLevel <= -2}
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all border ${
                  fontSizeLevel <= -2 
                  ? 'bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-[#1fb2aa] hover:text-[#1fb2aa] shadow-sm active:scale-95'
                }`}
                title="Giảm cỡ chữ"
              >
                A-
              </button>
              <button 
                onClick={() => handleFontSizeChange(1)}
                disabled={fontSizeLevel >= 2}
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all border ${
                  fontSizeLevel >= 2 
                  ? 'bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-[#1fb2aa] hover:text-[#1fb2aa] shadow-sm active:scale-95'
                }`}
                title="Tăng cỡ chữ"
              >
                A+
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12 items-stretch">
            <div className="lg:col-span-3">
              <EssayViewer 
                onEdit={handleEditRequest} 
                onDelete={handleDeleteRequest} 
                onAddComment={handleAddNewFeedback}
                feedbackItems={feedbackItems}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                fontSizeLevel={fontSizeLevel}
                isEditMode={isEditMode}
                selectedFilters={selectedFilters}
                recentId={recentId}
              />
            </div>
            <div className="lg:col-span-2">
              <FeedbackSection 
                items={feedbackItems} 
                editingId={editingId}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                scores={scores}
                strengths={strengths}
                improvements={improvements}
                selectedIssues={selectedIssues}
                onIssuesUpdate={handleIssuesUpdate}
                onUpdate={handleUpdateFeedback}
                onBulkUpdate={handleBulkUpdateFeedback}
                onDelete={handleDeleteRequest}
                onCancelNew={handleCancelNewFeedback}
                onAddGeneralFeedback={handleAddGeneralFeedback}
                onScoreUpdate={handleScoreUpdate}
                onStrengthsUpdate={handleStrengthsUpdate}
                onImprovementsUpdate={handleImprovementsUpdate}
                setEditingId={setEditingId}
                viewOnlyDetailed={true}
                fontSizeLevel={fontSizeLevel}
                isEditMode={isEditMode}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                recentId={recentId}
              />
            </div>
          </div>

          <div className="mt-12 border-t border-slate-100 pt-12">
            <FeedbackSection 
              items={feedbackItems} 
              editingId={editingId}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              scores={scores}
              strengths={strengths}
              improvements={improvements}
              selectedIssues={selectedIssues}
              onIssuesUpdate={handleIssuesUpdate}
              onUpdate={handleUpdateFeedback}
              onBulkUpdate={handleBulkUpdateFeedback}
              onDelete={handleDeleteRequest}
              onCancelNew={handleCancelNewFeedback}
              onAddGeneralFeedback={handleAddGeneralFeedback}
              onScoreUpdate={handleScoreUpdate}
              onStrengthsUpdate={handleStrengthsUpdate}
              onImprovementsUpdate={handleImprovementsUpdate}
              setEditingId={setEditingId}
              viewOnlyAssessment={true}
              fontSizeLevel={fontSizeLevel}
              isEditMode={isEditMode}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              recentId={recentId}
            />
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-6 border-t border-slate-100 pt-10">
            <button 
              onClick={() => handleSubmission('prev')}
              className="px-8 py-4 rounded-xl border-2 border-[#1fb2aa] text-[#1fb2aa] hover:bg-teal-50 font-bold text-lg transition-all"
            >
              Gửi & Bài trước đó
            </button>
            <button 
              onClick={() => handleSubmission('normal')}
              className="px-16 py-4 rounded-xl bg-[#1fb2aa] text-white hover:bg-[#1a9b94] font-bold text-xl shadow-lg hover:shadow-xl transform active:scale-95 transition-all"
            >
              Hoàn thành
            </button>
            <button 
              onClick={() => handleSubmission('next')}
              className="px-8 py-4 rounded-xl border-2 border-[#1fb2aa] text-[#1fb2aa] hover:bg-teal-50 font-bold text-lg transition-all"
            >
              Gửi & Bài kế tiếp
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-[#004d4d] text-slate-300 py-8 px-6 mt-12 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p>© 2025 Writing AI-Hub. Developed by <span className="font-bold text-white">INNOVO Team</span>. All rights reserved.</p>
          <div className="flex gap-8">
            <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-white transition-colors" href="#">Support</a>
          </div>
        </div>
      </footer>

      {/* Sticky Mode Control Bar */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex items-center bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl rounded-full px-5 py-2.5 hover:shadow-2xl transition-shadow duration-300 group">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full ${isEditMode ? 'bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-[#1fb2aa] shadow-[0_0_8px_rgba(31,178,170,0.5)]'}`} />
            <span className="text-sm font-medium text-slate-600 whitespace-nowrap">
              Bạn đang ở chế độ <span className={isEditMode ? 'text-amber-600 font-bold' : 'text-[#1fb2aa] font-bold'}>{isEditMode ? 'chỉnh sửa' : 'xem'}</span>
            </span>
          </div>
          
          <div className="h-5 w-px bg-slate-200 group-hover:bg-slate-300 transition-colors" />
          
          <div className="flex items-center gap-2">
            {!isEditMode ? (
              <button 
                onClick={() => setIsEditMode(true)}
                className="px-5 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs transition-all active:scale-95 whitespace-nowrap shadow-sm"
              >
                Sửa
              </button>
            ) : (
              <button 
                onClick={() => setIsEditMode(false)}
                className="px-5 py-1.5 rounded-full bg-[#1fb2aa] text-white hover:bg-[#1a9b94] font-bold text-xs shadow-md transition-all active:scale-95 whitespace-nowrap"
              >
                Lưu
              </button>
            )}
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />

      {/* Toast Notification */}
      {toast.visible && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[150] bg-slate-800 text-white px-6 py-3 rounded-xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 flex items-center gap-3 border border-slate-700/50 backdrop-blur-sm pointer-events-auto">
          <div className="w-2 h-2 rounded-full bg-[#1fb2aa] shadow-[0_0_8px_rgba(31,178,170,1)]" />
          <p className="text-sm font-medium">{toast.message}</p>
          <button onClick={() => setToast(prev => ({ ...prev, visible: false }))} className="ml-2 hover:text-slate-300 transition-colors">
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
