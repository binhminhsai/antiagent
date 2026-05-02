
export interface ScoreBreakdown {
  taskResponse: number;
  coherenceCohesion: number;
  lexicalResource: number;
  grammaticalRange: number;
}

export interface FeedbackItem {
  id: string;
  text: string;
  improvementExample?: string;
  category?: 'TR' | 'CC' | 'LR' | 'GRA';
  checked: boolean;
  isNew?: boolean; // Used for the "pending" state when adding a new comment
  isManual?: boolean; // Used to track items added via "Thêm nhận xét"
  isAiGenerated?: boolean; // Used to display AI tag
  range?: { start: number; end: number }; // To track position in essay
}

export interface CategoryFeedback {
  strengths: string[];
  improvements: string[];
  reason: string;
}

export enum FeedbackCategory {
  TASK_RESPONSE = 'Task Response',
  COHERENCE_COHESION = 'Coherence & Cohesion',
  LEXICAL_RESOURCE = 'Lexical Resource',
  GRAMMAR_ACCURACY = 'Grammar & Accuracy'
}
