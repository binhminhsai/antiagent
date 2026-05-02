
import React, { useState, useRef, useEffect } from 'react';
import { FileText, Edit2, Trash2, PlusCircle } from 'lucide-react';
import { FeedbackItem } from '../types';

interface EssayViewerProps {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAddComment: (start: number, end: number) => void;
  feedbackItems: FeedbackItem[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  fontSizeLevel?: number;
  isEditMode?: boolean;
  selectedFilters?: string[];
  recentId?: string | null;
}

const ESSAY_TEXT = `Today, technology is very popular in our life. But people have different ideas about how technology affect our communication. Some think it makes us more sociable, others think it makes us less. This essay will talk about both sides.

On the one hand, technology can help people to be more sociable. For example, with social media like Facebook or Instagram, we can talk to friends from many very easy. Also, we can see their photos and know about their life. Also, we can make new friends online from different countries. This is a good way to be more open and connect with many people.

On the other hand, technology can make people less sociable. Many people, especially young people, spend too much time on their phones. They always look at their screen and do not talk to people around them. For example, in a family, everyone is on their own device and they don't have real conversation. This can make relationships become weak.

In my opinion, I think technology can make us less sociable in real life. Because when we use technology too much, we might forget how to talk to people face-to-face. This is not good for our social skills. We should use technology in a smart way and remember to spend time with family and friends in person.

In conclusion, technology has both good and bad effects on our social life. But I believe we should not let it control our life and remember to communicate in real life.`;

const EssayViewer: React.FC<EssayViewerProps> = ({ 
  onEdit, onDelete, onAddComment, feedbackItems, selectedId, setSelectedId, 
  fontSizeLevel = 0, isEditMode = false, 
  selectedFilters = [], recentId 
}) => {
  const [activeMenu, setActiveMenu] = useState<{ id?: string, x: number, y: number, type: 'edit' | 'add', range?: { start: number, end: number } } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const essayRef = useRef<HTMLDivElement>(null);

  const getFontSizeClass = (level: number) => {
    switch(level) {
      case -2: return 'text-[10px]';
      case -1: return 'text-xs';
      case 1: return 'text-base';
      case 2: return 'text-lg';
      default: return 'text-sm';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll highlight into view when selected from outside
  useEffect(() => {
    if (selectedId) {
      const element = document.getElementById(`highlight-${selectedId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedId]);

  const getCharacterOffset = (node: Node, targetNode: Node, targetOffset: number): { offset: number, found: boolean } => {
    let offset = 0;
    if (node === targetNode) {
      return { offset: targetOffset, found: true };
    }
    
    if (node.nodeType === Node.TEXT_NODE) {
      return { offset: node.textContent?.length || 0, found: false };
    }
    
    for (let i = 0; i < node.childNodes.length; i++) {
      const result = getCharacterOffset(node.childNodes[i], targetNode, targetOffset);
      if (result.found) {
        return { offset: offset + result.offset, found: true };
      }
      offset += result.offset;
    }
    
    return { offset, found: false };
  };

  const handleMouseUp = () => {
    if (!isEditMode) return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !essayRef.current) return;

    const range = selection.getRangeAt(0);
    // Only trigger if selection is within the essay text container
    if (!essayRef.current.contains(range.commonAncestorContainer)) return;

    const startResult = getCharacterOffset(essayRef.current, range.startContainer, range.startOffset);
    const endResult = getCharacterOffset(essayRef.current, range.endContainer, range.endOffset);

    if (startResult.found && endResult.found) {
      const start = startResult.offset;
      const end = endResult.offset;
      
      // Ensure we have a valid non-zero length selection
      if (end > start) {
        onAddComment(start, end);
        // Clear selection after adding
        window.getSelection()?.removeAllRanges();
      }
    }
  };

  const handleHighlightClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedId(id);
    
    // 1. Scroll the essay so the selected text is visible with a top offset (30-40%)
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const absoluteTop = rect.top + window.scrollY;
    const viewportOffset = window.innerHeight * 0.35;
    
    window.scrollTo({
      top: absoluteTop - viewportOffset,
      behavior: 'smooth'
    });
    
    // 2. Then scroll corresponding feedback card into view in the sidebar
    // We scroll it to 'start' to keep it at the top of the sidebar viewport
    setTimeout(() => {
      const feedbackCard = document.getElementById(`feedback-item-${id}`);
      if (feedbackCard) {
        feedbackCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);

    if (isEditMode) {
      setActiveMenu({
        id,
        x: rect.left + rect.width / 2,
        y: rect.top,
        type: 'edit'
      });
    }
  };

  const renderContent = () => {
    // 1. Filter items with valid ranges
    const itemsWithRange = feedbackItems.filter(item => item.range);
    
    // 2. Identify all boundary points
    const pointsSet = new Set<number>([0, ESSAY_TEXT.length]);
    itemsWithRange.forEach(item => {
      pointsSet.add(item.range!.start);
      pointsSet.add(item.range!.end);
    });
    const sortedPoints = Array.from(pointsSet).sort((a, b) => a - b);

    // 3. Define color scales
    const COLORS: Record<string, string[]> = {
      TR: ['#ccf2ff', '#99e6ff', '#66d9ff'],
      CC: ['#dbeafe', '#bfdbfe', '#93c5fd'],
      LR: ['#e9d5ff', '#d8b4fe', '#c4b5fd'],
      GRA: ['#fef9c3', '#fef08a', '#fde68a'],
    };

    const elements: React.ReactNode[] = [];

    // 4. Render segments
    for (let i = 0; i < sortedPoints.length - 1; i++) {
      const start = sortedPoints[i];
      const end = sortedPoints[i + 1];
      const textChunk = ESSAY_TEXT.substring(start, end);
      
      if (!textChunk) continue;

      // Find all items covering this segment
      const activeItems = itemsWithRange.filter(item => 
        item.range!.start <= start && item.range!.end >= end
      );

      // Filter based on criteria
      const hasFilters = selectedFilters.length > 0;
      
      const matchingItems = hasFilters 
        ? activeItems.filter(it => it.category && selectedFilters.includes(it.category))
        : [];

      // Special case: recentId item that DOES NOT match current filter
      const specialRecentItem = (recentId || activeItems.find(it => it.isNew)?.id) 
        ? activeItems.find(it => (it.id === recentId || it.isNew) && (!hasFilters || !it.category || !selectedFilters.includes(it.category)))
        : null;

      if (matchingItems.length === 0 && !specialRecentItem) {
        elements.push(<span key={`text-${start}`}>{textChunk}</span>);
        continue;
      }

      // Group by category and count intensity
      const counts: Record<string, number> = {};
      matchingItems.forEach(item => {
        const cat = item.category || 'TR';
        counts[cat] = (counts[cat] || 0) + 1;
      });

      // Prepare background styles
      const activeCriteria = Object.keys(counts);
      let backgroundStyle: React.CSSProperties = {};
      
      if (hasFilters) {
        // Active filter mode: Show intensity
        if (activeCriteria.length === 1) {
          const cat = activeCriteria[0];
          const intensity = Math.min(counts[cat], 3);
          backgroundStyle = { backgroundColor: COLORS[cat][intensity - 1] };
        } else if (activeCriteria.length > 1) {
          const stripes = activeCriteria.map((cat, idx) => {
            const intensity = Math.min(counts[cat], 3);
            const color = COLORS[cat][intensity - 1];
            const startPct = (idx / activeCriteria.length) * 100;
            const endPct = ((idx + 1) / activeCriteria.length) * 100;
            return `${color} ${startPct}% ${endPct}%`;
          });
          backgroundStyle = { background: `linear-gradient(to bottom, ${stripes.join(', ')})` };
        }
      } else {
        // Default mode (no filter): Show all at Level 1
        if (activeCriteria.length === 1) {
          const cat = activeCriteria[0];
          backgroundStyle = { backgroundColor: COLORS[cat][0] };
        } else if (activeCriteria.length > 1) {
          const stripes = activeCriteria.map((cat, idx) => {
            const color = COLORS[cat][0];
            const startPct = (idx / activeCriteria.length) * 100;
            const endPct = ((idx + 1) / activeCriteria.length) * 100;
            return `${color} ${startPct}% ${endPct}%`;
          });
          backgroundStyle = { background: `linear-gradient(to bottom, ${stripes.join(', ')})` };
        }
      }

      // De-emphasize if it's ONLY the specialRecentItem (meaning it's not matching the filter)
      if (matchingItems.length === 0 && specialRecentItem) {
        const cat = specialRecentItem.category || 'TR';
        backgroundStyle = { backgroundColor: COLORS[cat][0], opacity: 0.4 };
      }

      const isSegmentSelected = [...matchingItems, specialRecentItem].filter(Boolean).some(item => item?.id === selectedId);
      const representId = isSegmentSelected 
        ? selectedId! 
        : (matchingItems.length > 0 ? matchingItems[0].id : specialRecentItem!.id);

      const isSelected = isSegmentSelected;
      const selectedClass = isSelected ? 'ring-2 ring-[#1fb2aa]/50 z-10 scale-[1.01] shadow-sm' : '';
      
      const representItem = [...matchingItems, specialRecentItem].filter(Boolean).find(it => it?.id === representId) || matchingItems[0] || specialRecentItem;
      const borderClass = representItem?.category === 'LR' ? 'border-purple-300' : 
                         representItem?.category === 'CC' ? 'border-blue-400' :
                         representItem?.category === 'GRA' ? 'border-yellow-400' : 'border-cyan-300';

      elements.push(
        <span
          key={`segment-${start}-${end}`}
          id={`highlight-${representId}`}
          onClick={(e) => handleHighlightClick(e, representId)}
          style={backgroundStyle}
          className={`cursor-pointer transition-all border-b-2 px-0 rounded-sm inline whitespace-pre-wrap ${borderClass} ${selectedClass} hover:opacity-90`}
        >
          {textChunk}
        </span>
      );
    }

    return elements;
  };

  return (
    <div className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm relative h-full flex flex-col">
      <h2 className="font-bold mb-4 text-slate-800">Your Essay</h2>
      <div 
        ref={containerRef}
        onMouseUp={handleMouseUp}
        className={`flex-1 rounded-xl p-6 bg-slate-50 min-h-[600px] leading-relaxed border border-slate-100 whitespace-pre-wrap select-text transition-all duration-300 ${getFontSizeClass(fontSizeLevel)}`}
      >
        {isEditMode && (
          <p className="text-xs text-slate-500 mb-6 italic select-none">
            Highlight text to automatically add feedback.
          </p>
        )}
        
        <div ref={essayRef} className="text-slate-700">
          {renderContent()}
        </div>
      </div>

      {activeMenu && activeMenu.type === 'edit' && (
        <div 
          ref={menuRef}
          style={{ top: activeMenu.y - 10, left: activeMenu.x }}
          className="fixed z-[100] bg-white border border-slate-200 rounded-lg shadow-xl py-1 w-32 overflow-hidden transform -translate-x-1/2 -translate-y-full animate-in fade-in zoom-in duration-200"
        >
          <button 
            onClick={() => { onEdit(activeMenu.id!); setActiveMenu(null); }}
            className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
          >
            <Edit2 size={12} className="text-[#1fb2aa]" /> Chỉnh sửa
          </button>
          <button 
            onClick={() => { onDelete(activeMenu.id!); setActiveMenu(null); }}
            className="w-full text-left px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors border-t border-slate-100"
          >
            <Trash2 size={12} /> Xoá
          </button>
        </div>
      )}
    </div>
  );
};

export default EssayViewer;
