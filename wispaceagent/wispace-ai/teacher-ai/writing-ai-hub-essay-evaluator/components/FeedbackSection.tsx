
import React, { useState, useRef, useEffect } from 'react';
import { ClipboardCheck, CheckCircle2, AlertTriangle, Star, Save, X, Edit2, Trash2, ListChecks } from 'lucide-react';
import { FeedbackItem, FeedbackCategory } from '../types';

interface FeedbackSectionProps {
  items: FeedbackItem[];
  editingId: string | null;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  scores: { task: number; coherence: number; lexical: number; grammar: number };
  strengths: Record<string, string[]>;
  improvements: Record<string, string[]>;
  selectedIssues: Record<string, string[]>;
  onIssuesUpdate: (cat: string, issues: string[]) => void;
  onUpdate: (id: string, text: string, example?: string, category?: 'TR' | 'CC' | 'LR' | 'GRA') => void;
  onBulkUpdate: (newItems: FeedbackItem[]) => void;
  onDelete: (id: string) => void;
  onCancelNew: (id: string) => void;
  onAddGeneralFeedback: () => void;
  onScoreUpdate: (key: any, val: number) => void;
  onStrengthsUpdate: (cat: string, val: string[]) => void;
  onImprovementsUpdate: (cat: string, val: string[]) => void;
  setEditingId: (id: string | null) => void;
  viewOnlyDetailed?: boolean;
  viewOnlyAssessment?: boolean;
  fontSizeLevel?: number;
  isEditMode?: boolean;
  selectedFilters?: string[];
  setSelectedFilters?: (filters: string[]) => void;
  recentId?: string | null;
}

const COMMON_ISSUES = [
  "Cấu trúc, bố cục bài viết không phù hợp",
  "Stance thiếu rõ ràng, cụ thể",
  "Luận điểm không thống nhất",
  "Luận điểm không phù hợp (lạc đề)",
  "Luận điểm mắc lỗi phản biện (Overgeneralization, Either/Or fallacy, Slippery Slope, Strawman)",
  "Không xử lý đầy đủ các yêu cầu của bài",
  "Lập luận thiếu thuyết phục (Không giải thích rõ mối quan hệ nhân quả hoặc nêu các vấn đề trừu tượng mà không có ví dụ)"
];

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ 
  items, editingId, selectedId, setSelectedId, scores, strengths, improvements,
  selectedIssues, onIssuesUpdate,
  onUpdate, onBulkUpdate, onDelete, onCancelNew, onAddGeneralFeedback,
  onScoreUpdate, onStrengthsUpdate, onImprovementsUpdate, setEditingId,
  viewOnlyDetailed, viewOnlyAssessment, fontSizeLevel = 0, isEditMode = false,
  selectedFilters = [], setSelectedFilters, recentId
}) => {
  const [activeTab, setActiveTab] = useState<FeedbackCategory>(FeedbackCategory.TASK_RESPONSE);

  const getFontSizeClass = (level: number) => {
    switch(level) {
      case -2: return 'text-[10px]';
      case -1: return 'text-xs';
      case 1: return 'text-base';
      case 2: return 'text-lg';
      default: return 'text-sm';
    }
  };

  const [isBulkEditing, setIsBulkEditing] = useState(false);
  const [bulkDrafts, setBulkDrafts] = useState<{ [key: string]: { text: string, example: string, category?: 'TR' | 'CC' | 'LR' | 'GRA' } }>({});
  const [editDraft, setEditDraft] = useState<{ text: string, example: string, category?: 'TR' | 'CC' | 'LR' | 'GRA' }>({ text: "", example: "", category: undefined });
  const [contextMenu, setContextMenu] = useState<{ id: string, x: number, y: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // States for category-wide editing
  const [isEditingStrengths, setIsEditingStrengths] = useState<string | null>(null);
  const [strengthsDraft, setStrengthsDraft] = useState("");
  
  const [isEditingReason, setIsEditingReason] = useState<FeedbackCategory | null>(null);
  const [reasonScoreDraft, setReasonScoreDraft] = useState(0);
  
  const [isAddingOtherIssue, setIsAddingOtherIssue] = useState<string | null>(null);
  const [otherIssueText, setOtherIssueText] = useState("");
  
  const categories = [
    FeedbackCategory.TASK_RESPONSE, 
    FeedbackCategory.COHERENCE_COHESION, 
    FeedbackCategory.LEXICAL_RESOURCE, 
    FeedbackCategory.GRAMMAR_ACCURACY
  ];

  const catCodeMap: Record<string, 'TR' | 'CC' | 'LR' | 'GRA'> = {
    [FeedbackCategory.TASK_RESPONSE]: 'TR',
    [FeedbackCategory.COHERENCE_COHESION]: 'CC',
    [FeedbackCategory.LEXICAL_RESOURCE]: 'LR',
    [FeedbackCategory.GRAMMAR_ACCURACY]: 'GRA'
  };

  const getScoreKey = (cat: FeedbackCategory) => {
    switch (cat) {
      case FeedbackCategory.TASK_RESPONSE: return 'task';
      case FeedbackCategory.COHERENCE_COHESION: return 'coherence';
      case FeedbackCategory.LEXICAL_RESOURCE: return 'lexical';
      case FeedbackCategory.GRAMMAR_ACCURACY: return 'grammar';
      default: return 'task';
    }
  };

  // Logic to map scores to descriptions
  const getReasonText = (score: number) => {
    if (score >= 9) return "Exceptional performance. The response is highly developed, fully addressing the task with deep insights and sophisticated support.";
    if (score >= 8) return "Very strong performance. All parts of the task are well-covered with clear development and relevant supporting evidence.";
    if (score >= 7) return "Main ideas are presented but lack sufficient development, explanation, and supporting evidence, leading to a limited response to the task.";
    if (score >= 6) return "The requirements of the task are addressed generally, but the response is repetitive or lacks focus in several areas.";
    if (score >= 5) return "The response addresses the task only partially and lacks a coherent structure or development of ideas.";
    return "The response barely addresses the prompt and contains significant inaccuracies.";
  };

  const getCategoryColor = (cat?: string) => {
    switch (cat) {
      case 'TR': return { bg: 'bg-[#ccf2ff]', text: 'text-[#004d66]', border: 'border-[#b3e0ff]', accent: 'bg-[#00bfff]' };
      case 'CC': return { bg: 'bg-[#dbeafe]', text: 'text-[#1e40af]', border: 'border-[#bfdbfe]', accent: 'bg-[#3b82f6]' };
      case 'LR': return { bg: 'bg-[#e9d5ff]', text: 'text-[#581c87]', border: 'border-[#d8b4fe]', accent: 'bg-[#a855f7]' };
      case 'GRA': return { bg: 'bg-[#fef9c3]', text: 'text-[#713f12]', border: 'border-[#fde68a]', accent: 'bg-[#eab308]' };
      default: return { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200', accent: 'bg-slate-400' };
    }
  };

  const toggleFilter = (cat: string) => {
    if (!setSelectedFilters) return;
    if (selectedFilters.includes(cat)) {
      setSelectedFilters(selectedFilters.filter(f => f !== cat));
    } else {
      setSelectedFilters([...selectedFilters, cat]);
    }
  };

  const filteredItems = items.filter(item => {
    // Priority: Newly created feedback (recentId) must not disappear
    if (item.id === recentId || item.isNew) return true;
    
    // If no filter, show none (except recent/new)
    if (selectedFilters.length === 0) return false;
    
    // Show if matches filter
    return item.category && selectedFilters.includes(item.category);
  });

  // Sort: recent items at the top
  const sortedFilteredItems = [...filteredItems].sort((a, b) => {
    if (a.id === recentId) return -1;
    if (b.id === recentId) return 1;
    return 0;
  });

  const currentScoreKey = activeTab === FeedbackCategory.TASK_RESPONSE ? 'task' :
                         activeTab === FeedbackCategory.COHERENCE_COHESION ? 'coherence' :
                         activeTab === FeedbackCategory.LEXICAL_RESOURCE ? 'lexical' : 'grammar';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setContextMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll card into view when selected from outside
  useEffect(() => {
    if (selectedId) {
      const element = document.getElementById(`feedback-item-${selectedId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedId]);

  useEffect(() => {
    if (editingId) {
      const item = items.find(i => i.id === editingId);
      if (item) {
        setEditDraft({ text: item.text, example: item.improvementExample || "", category: item.category });
      }
    }
  }, [editingId, items]);

  const startBulkEdit = () => {
    const drafts: { [key: string]: { text: string, example: string, category?: 'TR' | 'CC' | 'LR' | 'GRA' } } = {};
    items.forEach(item => {
      drafts[item.id] = { text: item.text, example: item.improvementExample || "", category: item.category };
    });
    setBulkDrafts(drafts);
    setIsBulkEditing(true);
  };

  const cancelBulkEdit = () => {
    setIsBulkEditing(false);
    setBulkDrafts({});
    setEditingId(null);
  };

  const saveBulkEdit = () => {
    // Validation: ensure all items have a category
    const allHaveCategory = items.every(item => {
      const cat = bulkDrafts[item.id]?.category || item.category;
      return !!cat;
    });

    if (!allHaveCategory) {
      alert("Vui lòng chọn tiêu chí cho tất cả các nhận xét.");
      return;
    }

    const updatedItems = items.map(item => {
      const draft = bulkDrafts[item.id];
      const hasChanged = draft && (
        draft.text !== item.text || 
        draft.example !== (item.improvementExample || "") || 
        draft.category !== item.category
      );

      return {
        ...item,
        text: draft?.text || item.text,
        improvementExample: draft?.example || item.improvementExample,
        category: draft?.category || item.category,
        checked: true,
        isAiGenerated: hasChanged ? false : item.isAiGenerated
      };
    });
    onBulkUpdate(updatedItems);
    setIsBulkEditing(false);
  };

  const handleCardClick = (e: React.MouseEvent, id: string) => {
    if (isBulkEditing) return;
    const item = items.find(i => i.id === id);
    if (item?.isNew) return;
    e.stopPropagation();
    
    setSelectedId(id);

    // 1. Scroll corresponding highlight into view within the essay (page scroll)
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

    // 2. Then scroll the card itself within the sidebar container to the top
    setTimeout(() => {
      const cardElement = document.getElementById(`feedback-item-${id}`);
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);

    if (isEditMode) {
      setContextMenu({ id, x: e.clientX, y: e.clientY });
    }
  };

  const handleSingleSave = (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    const text = isBulkEditing ? bulkDrafts[id]?.text : editDraft.text;
    const example = isBulkEditing ? bulkDrafts[id]?.example : editDraft.example;
    const category = isBulkEditing ? bulkDrafts[id]?.category : editDraft.category;

    // Validation
    const isGeneral = !item.range;
    const isNewError = item.isNew && item.range;
    const isEditingExisting = !item.isNew;

    if (!category) {
      alert("Vui lòng chọn một tiêu chí (TR, CC, LR, GRA).");
      return;
    }

    if (isEditingExisting) {
      if (!text.trim() || !example.trim()) {
        alert("Cả hai trường 'Nhận xét' và 'Ví dụ cải thiện' đều là bắt buộc.");
        return;
      }
    } else if (isNewError) {
      if (!text.trim()) {
        alert("Trường 'Nhận xét' là bắt buộc.");
        return;
      }
    } else if (isGeneral) {
      if (!text.trim()) {
        alert("Trường 'Nhận xét' là bắt buộc.");
        return;
      }
    }

    onUpdate(id, text, example, category);
  };

  const startStrengthsEdit = (catCode: string) => {
    setStrengthsDraft((strengths[catCode] || []).join('\n'));
    setIsEditingStrengths(catCode);
  };

  const saveStrengths = (catCode: string) => {
    onStrengthsUpdate(catCode, strengthsDraft.split('\n').filter(s => s.trim() !== ""));
    setIsEditingStrengths(null);
  };

  const handleTabClick = (cat: FeedbackCategory) => {
    setActiveTab(cat);
    const id = cat.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const startReasonEdit = (cat: FeedbackCategory) => {
    const scoreKey = getScoreKey(cat);
    setReasonScoreDraft(scores[scoreKey]);
    setIsEditingReason(cat);
  };

  const saveReason = () => {
    setIsEditingReason(null);
  };

  const saveOtherIssue = (catCode: string) => {
    if (otherIssueText.trim()) {
      const current = selectedIssues[catCode] || [];
      if (!current.includes(otherIssueText.trim())) {
        onIssuesUpdate(catCode, [...current, otherIssueText.trim()]);
      }
    }
    setOtherIssueText("");
    setIsAddingOtherIssue(null);
  };

  const cancelOtherIssue = () => {
    setOtherIssueText("");
    setIsAddingOtherIssue(null);
  };

  const handleReasonScoreChange = (e: React.ChangeEvent<HTMLInputElement>, cat: FeedbackCategory) => {
    const rawVal = e.target.value;
    const scoreKey = getScoreKey(cat);
    if (rawVal === '') {
      setReasonScoreDraft(0);
      onScoreUpdate(scoreKey, 0);
      return;
    }
    let val = parseInt(rawVal, 10);
    if (isNaN(val)) return;
    val = Math.max(0, Math.min(9, Math.floor(val)));
    setReasonScoreDraft(val);
    onScoreUpdate(scoreKey, val);
  };

  useEffect(() => {
    if (isEditingReason) {
      const scoreKey = getScoreKey(isEditingReason);
      setReasonScoreDraft(scores[scoreKey]);
    }
  }, [scores, isEditingReason]);

  const handleKeyDown = (e: React.KeyboardEvent, id: string, onSave: (id: string) => void) => {
    const isModifierKey = e.metaKey || e.ctrlKey;
    const isEnter = e.key === 'Enter';
    const isTextArea = (e.target as HTMLElement).tagName === 'TEXTAREA';

    if (isEnter) {
      if (isTextArea) {
        // In textarea: Enter = New Line, Ctrl/Cmd + Enter = Save
        if (isModifierKey) {
          e.preventDefault();
          onSave(id);
        }
      } else {
        // Outside textarea (e.g. on radio button or container): Enter = Save
        e.preventDefault();
        onSave(id);
      }
    }
  };

  return (
    <div className="space-y-8 h-full">
      {!viewOnlyAssessment && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-[#1fb2aa] font-bold">
              <ClipboardCheck size={20} />
              Detailed Feedback
            </div>
            <div className="flex items-center gap-2">
              {isEditMode && (
                <>
                  {!isBulkEditing ? (
                    <>
                      <button 
                        onClick={onAddGeneralFeedback}
                        className="bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-500 px-3 py-1 rounded-md text-[10px] font-bold transition-all"
                      >
                        Nhận xét cả bài
                      </button>
                      <button 
                        onClick={startBulkEdit}
                        className="text-[#1fb2aa] hover:bg-teal-50 border border-[#1fb2aa] px-3 py-1 rounded-md text-[10px] font-bold transition-all"
                      >
                        Chỉnh sửa
                      </button>
                    </>
                  ) : (
                    <div className="flex gap-2">
                      <button 
                        onClick={cancelBulkEdit}
                        className="text-slate-500 hover:bg-slate-50 border border-slate-200 px-3 py-1 rounded-md text-[10px] font-bold transition-all flex items-center gap-1.5"
                      >
                        <X size={14} /> Huỷ
                      </button>
                      <button 
                        onClick={saveBulkEdit}
                        className="bg-[#1fb2aa] hover:bg-[#1a9b94] text-white px-3 py-1 rounded-md text-[10px] font-bold transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <Save size={14} /> Lưu
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {!viewOnlyAssessment && (
            <div className="flex flex-wrap items-center gap-2 mb-6 animate-in fade-in slide-in-from-left-2 duration-500">
              {['TR', 'CC', 'LR', 'GRA'].map(cat => {
                const isSelected = selectedFilters.includes(cat);
                const colors = getCategoryColor(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleFilter(cat)}
                    className={`px-4 py-1 rounded-full text-xs font-bold transition-all border ${
                      isSelected 
                      ? `${colors.bg} ${colors.text} ${colors.border} shadow-sm scale-105` 
                      : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
              {selectedFilters.length > 0 && (
                <button 
                  onClick={() => setSelectedFilters?.([])}
                  className="text-[10px] text-slate-400 hover:text-red-500 font-medium ml-2 transition-colors uppercase tracking-wider h-7 flex items-center"
                >
                  Xoá lọc
                </button>
              )}
            </div>
          )}

          <div className="space-y-6 flex-1 overflow-y-auto pr-1 no-scrollbar">
            {sortedFilteredItems.length === 0 ? (
              <p className="text-sm text-slate-400 italic text-center py-8 px-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200 mt-4">
                {selectedFilters.length === 0 
                  ? "Chọn ít nhất một tiêu chí bên trên để xem nhận xét chi tiết."
                  : "Không có nhận xét nào phù hợp với bộ lọc đã chọn."}
              </p>
            ) : (
              sortedFilteredItems.map(item => (
                <div 
                  key={item.id} 
                  id={`feedback-item-${item.id}`}
                  onClick={(e) => handleCardClick(e, item.id)}
                  className={`bg-white relative p-5 rounded-lg border transition-all flex flex-col scroll-mt-2 ${
                    (isBulkEditing || editingId === item.id || item.isNew || selectedId === item.id)
                    ? `border-[#1fb2aa] shadow-lg ${selectedId === item.id && !editingId && !isBulkEditing ? 'ring-4 ring-teal-100 z-10' : 'ring-4 ring-teal-50'}` 
                    : `border-slate-100 hover:border-teal-200 cursor-pointer`
                  } ${item.id === recentId ? 'ring-2 ring-amber-400/30' : ''}`}
                >
                  <div className="flex-1">
                    {(item.category || (item.isAiGenerated && !isBulkEditing && editingId !== item.id && !item.isNew)) && (
                      <div className="flex items-center gap-2 mb-3">
                        {item.category && (
                          <div className={`px-2.5 py-0.5 rounded-full border ${getCategoryColor(item.category).bg} ${getCategoryColor(item.category).text} ${getCategoryColor(item.category).border} text-[10px] font-black uppercase tracking-wider shadow-sm shrink-0`}>
                            {item.category}
                          </div>
                        )}
                        {item.isAiGenerated && !isBulkEditing && editingId !== item.id && !item.isNew && (
                          <div className="px-2.5 py-0.5 rounded-full border border-teal-200 bg-[#ccfbf1] text-[#0f766e] text-[10px] font-bold uppercase tracking-wider shadow-sm shrink-0">
                            AI
                          </div>
                        )}
                      </div>
                    )}

                    {(isBulkEditing || editingId === item.id || item.isNew) ? (
                      <div 
                        className="space-y-4"
                        onKeyDown={(e) => handleKeyDown(e, item.id, handleSingleSave)}
                      >
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nhận xét</label>
                          <textarea
                            autoFocus={editingId === item.id || item.isNew}
                            value={isBulkEditing ? (bulkDrafts[item.id]?.text ?? item.text) : editDraft.text}
                            onChange={(e) => {
                              if (isBulkEditing) {
                                setBulkDrafts(prev => ({ ...prev, [item.id]: { ...prev[item.id], text: e.target.value } }));
                              } else {
                                setEditDraft(prev => ({ ...prev, text: e.target.value }));
                              }
                            }}
                            onKeyDown={(e) => {
                              // We use the container-level listener, but we need to stop Enter here 
                              // unless it's a modifier key to avoid default behavior if we were using inputs.
                              // Textarea already handles Enter for new line.
                            }}
                            className="w-full min-h-[60px] text-sm text-slate-700 bg-transparent focus:outline-none resize-none border-b border-slate-200 p-0 pb-1"
                            placeholder="Nhập nội dung nhận xét..."
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>

                        {item.range && (
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ví dụ cải thiện</label>
                            <textarea
                              value={isBulkEditing ? (bulkDrafts[item.id]?.example ?? item.improvementExample ?? "") : editDraft.example}
                              onChange={(e) => {
                                if (isBulkEditing) {
                                  setBulkDrafts(prev => ({ ...prev, [item.id]: { ...prev[item.id], example: e.target.value } }));
                                } else {
                                  setEditDraft(prev => ({ ...prev, example: e.target.value }));
                                }
                              }}
                              onKeyDown={(e) => {}}
                              className="w-full min-h-[40px] text-sm text-slate-700 bg-transparent focus:outline-none resize-none border-b border-slate-200 p-0 pb-1"
                              placeholder="should/can/might..."
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        )}

                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tiêu chí</label>
                          <div className="flex gap-4">
                            {(['TR', 'CC', 'LR', 'GRA'] as const).map((cat) => {
                              const colors = getCategoryColor(cat);
                              const isSelected = (isBulkEditing ? bulkDrafts[item.id]?.category : editDraft.category) === cat;
                              return (
                                <label key={cat} className="flex items-center gap-1.5 cursor-pointer group">
                                  <input 
                                    type="radio"
                                    name={`category-${item.id}`}
                                    checked={isSelected}
                                    onChange={() => {
                                      if (isBulkEditing) {
                                        setBulkDrafts(prev => ({ ...prev, [item.id]: { ...prev[item.id], category: cat } }));
                                      } else {
                                        setEditDraft(prev => ({ ...prev, category: cat }));
                                      }
                                    }}
                                    className={`w-3.5 h-3.5 ${colors.text} focus:ring-[#1fb2aa] border-slate-300`}
                                  />
                                  <span className={`text-xs font-medium transition-colors ${isSelected ? colors.text : 'text-slate-600 group-hover:' + colors.text}`}>{cat}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        {(editingId === item.id || item.isNew) && !isBulkEditing && (
                          <div className="flex justify-end gap-2 pt-2 border-t border-slate-50">
                            <button 
                              onClick={(e) => { e.stopPropagation(); item.isNew ? onCancelNew(item.id) : setEditingId(null); }}
                              className="text-slate-500 hover:bg-slate-50 border border-slate-200 px-3 py-1 rounded-md text-xs font-bold transition-all"
                            >
                              Huỷ
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleSingleSave(item.id); }}
                              className="bg-[#1fb2aa] hover:bg-[#1a9b94] text-white px-3 py-1 rounded-md text-xs font-bold transition-all"
                            >
                              Lưu
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className={`space-y-2 transition-all duration-300 ${getFontSizeClass(fontSizeLevel)}`}>
                        <p className="text-slate-700 leading-relaxed">{item.text}</p>
                        {item.improvementExample && (
                          <p className="text-slate-600 opacity-80 italic leading-relaxed">
                            <span className="font-semibold not-italic">Ví dụ cải thiện:</span> {item.improvementExample}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {contextMenu && (
        <div 
          ref={menuRef}
          style={{ top: contextMenu.y - 10, left: contextMenu.x }}
          className="fixed z-[120] bg-white border border-slate-200 rounded-lg shadow-xl py-1 w-32 overflow-hidden transform -translate-x-1/2 -translate-y-full animate-in fade-in zoom-in duration-150"
        >
          <button 
            onClick={() => { setEditingId(contextMenu.id); setContextMenu(null); }}
            className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
          >
            <Edit2 size={12} className="text-[#1fb2aa]" /> Chỉnh sửa
          </button>
          <button 
            onClick={() => { onDelete(contextMenu.id); setContextMenu(null); }}
            className="w-full text-left px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors border-t border-slate-100"
          >
            <Trash2 size={12} /> Xoá
          </button>
        </div>
      )}

      {!viewOnlyDetailed && (
        <div className="space-y-12">
          {/* Tabs moved here */}
          <div className="sticky top-[148px] z-20 bg-[#f8fafc] py-4 -mx-4 px-4 mb-4 shadow-sm border-b border-slate-100">
            <div className="flex flex-nowrap gap-2 overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleTabClick(cat)}
                  className={`flex-1 min-w-fit px-6 py-3 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                    activeTab === cat 
                    ? 'bg-[#1fb2aa] text-white shadow-md' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Criteria Sections */}
          <div className="space-y-16">
            {categories.map((cat) => {
              const scoreKey = getScoreKey(cat);
              const catCode = catCodeMap[cat];
              const colors = getCategoryColor(catCode);
              const sectionId = cat.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');
              
              const catStrengths = strengths[catCode] || [];
              const catIssues = selectedIssues[catCode] || [];

               return (
                <div key={cat} id={sectionId} className="scroll-mt-64 space-y-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`h-10 w-2 rounded-full ${colors.accent}`} />
                    <h2 className="text-2xl font-bold text-slate-800">{cat}</h2>
                  </div>

                  {/* Strengths Section */}
                  <div className="bg-green-50/50 border border-green-200 rounded-xl p-6 relative shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2 text-green-600 font-bold">
                        <CheckCircle2 size={20} />
                        Strengths
                      </div>
                    </div>
                    {isEditMode ? (
                      <textarea
                        value={isEditingStrengths === catCode ? strengthsDraft : strengths[catCode].join('\n')}
                        onFocus={() => {
                          if (isEditingStrengths !== catCode) {
                            startStrengthsEdit(catCode);
                          }
                        }}
                        onChange={(e) => setStrengthsDraft(e.target.value)}
                        onBlur={() => saveStrengths(catCode)}
                        className="w-full min-h-[100px] text-sm text-slate-700 bg-white border border-green-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-100"
                        placeholder="Mỗi dòng một điểm mạnh..."
                      />
                    ) : (
                      <ul className={`list-disc list-inside text-slate-700 space-y-3 transition-all duration-300 ${getFontSizeClass(fontSizeLevel)}`}>
                        {catStrengths.map((s, i) => <li key={i}>{s}</li>)}
                        {catStrengths.length === 0 && <li className="italic text-slate-400">No strengths added yet.</li>}
                      </ul>
                    )}
                  </div>

                  {/* Weaknesses Section */}
                  <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-6 relative shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-2 text-amber-600 font-bold">
                        <AlertTriangle size={20} />
                        Weaknesses
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[...COMMON_ISSUES, ...((selectedIssues[catCode] || []).filter(i => !COMMON_ISSUES.includes(i)))].map((issue, index) => {
                        const isSelected = catIssues.includes(issue);
                        return (
                          <label 
                            key={index}
                            className="flex items-start gap-3 transition-all cursor-pointer group"
                          >
                            <div className="pt-0.5">
                              <input 
                                type="checkbox"
                                checked={isSelected}
                                disabled={!isEditMode}
                                onChange={() => {
                                  if (isSelected) {
                                    onIssuesUpdate(catCode, catIssues.filter(i => i !== issue));
                                  } else {
                                    onIssuesUpdate(catCode, [...catIssues, issue]);
                                  }
                                }}
                                className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                              />
                            </div>
                            <span className={`leading-relaxed transition-all duration-300 ${getFontSizeClass(fontSizeLevel)} ${isSelected ? 'text-amber-600 font-medium' : 'text-slate-700 group-hover:text-slate-900'}`}>{issue}</span>
                          </label>
                        );
                      })}

                      {/* "Khác" option */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center flex-wrap gap-4">
                          <label className="flex items-center gap-3 cursor-pointer group shrink-0">
                            <div className="pt-0.5">
                              <input 
                                type="checkbox"
                                checked={isAddingOtherIssue === catCode}
                                disabled={!isEditMode}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setIsAddingOtherIssue(catCode);
                                  } else {
                                    cancelOtherIssue();
                                  }
                                }}
                                className={`h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500 ${!isEditMode ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                              />
                            </div>
                            <span className={`transition-all duration-300 ${getFontSizeClass(fontSizeLevel)} text-slate-700 ${isEditMode ? 'group-hover:text-slate-900' : ''} transition-colors`}>Khác</span>
                          </label>

                          {isAddingOtherIssue === catCode && (
                            <div className="flex-1 min-w-[200px] flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-200">
                              <input 
                                autoFocus
                                type="text"
                                value={otherIssueText}
                                onChange={(e) => setOtherIssueText(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') saveOtherIssue(catCode);
                                  if (e.key === 'Escape') cancelOtherIssue();
                                }}
                                placeholder="Nhập lý do khác..."
                                className="flex-1 bg-white border border-amber-200 rounded-lg px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-amber-500/20"
                              />
                              <div className="flex gap-1 shrink-0">
                                <button 
                                  onClick={() => saveOtherIssue(catCode)}
                                  className="bg-[#1fb2aa] text-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm hover:bg-[#1a9b94] transition-all"
                                >
                                  Lưu
                                </button>
                                <button 
                                  onClick={cancelOtherIssue}
                                  className="bg-white border border-slate-200 text-slate-500 px-3 py-1 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all"
                                >
                                  Huỷ
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2 text-blue-600 font-bold">
                        <Star size={20} />
                        Reason for Band {isEditMode ? (
                          <input 
                            type="number" step="1" min="0" max="9"
                            value={isEditingReason === cat ? reasonScoreDraft : scores[scoreKey]}
                            onFocus={() => {
                              if (isEditingReason !== cat) startReasonEdit(cat);
                            }}
                            onBlur={() => setIsEditingReason(null)}
                            onChange={(e) => handleReasonScoreChange(e, cat)}
                            className="w-14 px-1 bg-white border border-blue-300 rounded text-center text-blue-600 font-bold outline-none ring-2 ring-blue-100"
                          />
                        ) : scores[scoreKey].toFixed(0)}
                      </div>
                    </div>
                    <p className={`leading-relaxed italic transition-all duration-300 ${getFontSizeClass(fontSizeLevel)} text-slate-700`}>
                      {isEditingReason === cat ? getReasonText(reasonScoreDraft) : getReasonText(scores[scoreKey])}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackSection;
