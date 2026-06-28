export type Language = 'en' | 'ar' | 'fr' | 'es';

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
  ultraSimpleExplanation?: string;
  language?: Language;
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

// API Request/Response Types
export interface ApiRequest {
  documentText: string;
}

export interface ApiResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
  metadata?: {
    model: string;
    mode: 'ai' | 'demo';
    warning?: string;
    reason?: string;
    timestamp: string;
  };
}

export interface ApiError {
  success: false;
  error: string;
}

// Translation API Types
export interface TranslateRequest {
  analysisResult: AnalysisResult;
  targetLanguage: Language;
}

export type TranslateResponse =
  | { success: true; translatedResult: AnalysisResult; language: string }
  | { success: false; error: string };

// Made with Bob
