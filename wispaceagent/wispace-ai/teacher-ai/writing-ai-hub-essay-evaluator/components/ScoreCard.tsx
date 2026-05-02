
import React, { useState } from 'react';

interface ScoreItemProps {
  label: string;
  score: number;
  isEditing: boolean;
  onScoreChange: (val: number) => void;
}

const ScoreItem: React.FC<ScoreItemProps> = ({ label, score, isEditing, onScoreChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    if (rawVal === '') return;
    
    // Prevent decimal input by parsing as Int and checking if it matches string
    if (rawVal.includes('.')) return;

    let val = parseInt(rawVal, 10);
    if (isNaN(val)) return;
    
    // Enforce range 0-9 and whole numbers
    val = Math.max(0, Math.min(9, Math.floor(val)));
    onScoreChange(val);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-sm text-slate-700">{label}</span>
        {isEditing ? (
          <div className="flex flex-col items-end">
            <input
              type="number"
              step="1"
              min="0"
              max="9"
              value={score}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === '.' || e.key === ',') e.preventDefault();
              }}
              className="w-16 h-8 text-center text-[#1fb2aa] font-bold border border-slate-200 rounded-md focus:ring-1 focus:ring-[#1fb2aa] outline-none"
            />
          </div>
        ) : (
          <span className="text-[#1fb2aa] font-bold">{score.toFixed(0)}</span>
        )}
      </div>
      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#1fb2aa] transition-all duration-500 ease-out" 
          style={{ width: `${(score / 9) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

interface ScoreCardProps {
  scores: {
    task: number;
    coherence: number;
    lexical: number;
    grammar: number;
  };
  onScoreUpdate: (key: any, val: number) => void;
  isEditMode?: boolean;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ scores, onScoreUpdate, isEditMode = false }) => {
  const calculateOverall = () => {
    const avg = (scores.task + scores.coherence + scores.lexical + scores.grammar) / 4;
    const floor = Math.floor(avg);
    const fraction = avg - floor;

    // IELTS Rounding Logic:
    // x.00 - x.24 -> x.0
    // x.25 - x.74 -> x.5
    // x.75 - x.99 -> x+1.0
    if (fraction < 0.25) return floor;
    if (fraction < 0.75) return floor + 0.5;
    return floor + 1;
  };

  const overall = calculateOverall();

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-800">Score Breakdown</h2>
      </div>
      <div className="space-y-6">
        <ScoreItem label="Task Response" score={scores.task} isEditing={isEditMode} onScoreChange={(v) => onScoreUpdate('task', v)} />
        <ScoreItem label="Coherence & Cohesion" score={scores.coherence} isEditing={isEditMode} onScoreChange={(v) => onScoreUpdate('coherence', v)} />
        <ScoreItem label="Lexical Resource" score={scores.lexical} isEditing={isEditMode} onScoreChange={(v) => onScoreUpdate('lexical', v)} />
        <ScoreItem label="Grammatical Range & Accuracy" score={scores.grammar} isEditing={isEditMode} onScoreChange={(v) => onScoreUpdate('grammar', v)} />
      </div>
      <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xl font-bold text-slate-800">Overall Band Score</span>
          <span className="text-[10px] text-slate-400 uppercase font-semibold">IELTS Rounding Applied</span>
        </div>
        <span className="text-4xl font-extrabold text-[#1fb2aa]">{overall.toFixed(1)}</span>
      </div>
    </div>
  );
};

export default ScoreCard;
