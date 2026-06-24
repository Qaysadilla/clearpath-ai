export interface AnalysisResult {
  summary: string;
  deadlines: Deadline[];
  actions: Action[];
  documentsNeeded: string[];
  riskLevel: 'low' | 'medium' | 'high';
  riskExplanation: string;
  checklist: ChecklistItem[];
  draftReply: DraftEmail;
  simplerExplanation: string;
}

export interface Deadline {
  date: string;
  description: string;
  daysUntil: number;
  importance: 'critical' | 'important' | 'normal';
}

export interface Action {
  action: string;
  priority: 'high' | 'medium' | 'low';
  deadline?: string;
  estimatedTime?: string;
}

export interface ChecklistItem {
  step: string;
  completed: boolean;
  notes?: string;
}

export interface DraftEmail {
  subject: string;
  body: string;
  tone: 'formal' | 'professional' | 'friendly';
}

export type DocumentType = 'appointment' | 'housing' | 'school' | 'generic';

// Made with Bob
