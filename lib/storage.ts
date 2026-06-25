// ClearPath AI - localStorage Storage System
// Handles saving and retrieving analyses, tasks, and deadlines

import { AnalysisResult, Deadline, ChecklistItem } from './types';

// Storage keys
const STORAGE_KEYS = {
  ANALYSES: 'clearpath_saved_analyses',
  PREFERENCES: 'clearpath_user_preferences',
} as const;

// Maximum number of saved analyses
const MAX_SAVED_ANALYSES = 50;

// Maximum document text length to store (to avoid quota issues)
const MAX_STORED_TEXT_LENGTH = 500;

// User types
export type UserType = 
  | 'student' 
  | 'newcomer' 
  | 'worker' 
  | 'family_helper' 
  | 'general';

// Document types (extending existing)
export type DocumentType = 
  | 'school' 
  | 'housing' 
  | 'government' 
  | 'medical' 
  | 'banking' 
  | 'work' 
  | 'other';

// Saved analysis interface
export interface SavedAnalysis {
  id: string;
  timestamp: string;
  userType: UserType;
  documentType: DocumentType;
  documentText: string; // Truncated for storage
  analysis: AnalysisResult;
  metadata: {
    savedAt: string;
    lastViewed?: string;
    notes?: string;
  };
}

// User preferences
export interface UserPreferences {
  defaultUserType?: UserType;
  language?: string;
}

// Generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Truncate document text for storage
function truncateText(text: string): string {
  if (text.length <= MAX_STORED_TEXT_LENGTH) {
    return text;
  }
  return text.substring(0, MAX_STORED_TEXT_LENGTH) + '...[truncated for storage]';
}

// Check if localStorage is available
function isLocalStorageAvailable(): boolean {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

// Save a new analysis
export function saveAnalysis(
  userType: UserType,
  documentType: DocumentType,
  documentText: string,
  analysis: AnalysisResult
): SavedAnalysis | null {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage not available');
    return null;
  }

  try {
    const savedAnalysis: SavedAnalysis = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      userType,
      documentType,
      documentText: truncateText(documentText),
      analysis,
      metadata: {
        savedAt: new Date().toISOString(),
      },
    };

    const existing = getSavedAnalyses();
    
    // Add new analysis at the beginning
    const updated = [savedAnalysis, ...existing];
    
    // Limit to MAX_SAVED_ANALYSES
    const limited = updated.slice(0, MAX_SAVED_ANALYSES);
    
    localStorage.setItem(STORAGE_KEYS.ANALYSES, JSON.stringify(limited));
    
    return savedAnalysis;
  } catch (error) {
    console.error('Error saving analysis:', error);
    return null;
  }
}

// Get all saved analyses
export function getSavedAnalyses(): SavedAnalysis[] {
  if (!isLocalStorageAvailable()) {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ANALYSES);
    if (!stored) {
      return [];
    }
    return JSON.parse(stored) as SavedAnalysis[];
  } catch (error) {
    console.error('Error loading saved analyses:', error);
    return [];
  }
}

// Get a single analysis by ID
export function getAnalysisById(id: string): SavedAnalysis | null {
  const analyses = getSavedAnalyses();
  return analyses.find(a => a.id === id) || null;
}

// Delete an analysis
export function deleteAnalysis(id: string): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    const analyses = getSavedAnalyses();
    const filtered = analyses.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.ANALYSES, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting analysis:', error);
    return false;
  }
}

// Update an analysis
export function updateAnalysis(id: string, updates: Partial<SavedAnalysis>): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    const analyses = getSavedAnalyses();
    const index = analyses.findIndex(a => a.id === id);
    
    if (index === -1) {
      return false;
    }
    
    analyses[index] = { ...analyses[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.ANALYSES, JSON.stringify(analyses));
    return true;
  } catch (error) {
    console.error('Error updating analysis:', error);
    return false;
  }
}

// Mark analysis as viewed
export function markAsViewed(id: string): boolean {
  const analysis = getAnalysisById(id);
  if (!analysis) {
    return false;
  }
  
  return updateAnalysis(id, {
    metadata: {
      savedAt: analysis.metadata.savedAt,
      lastViewed: new Date().toISOString(),
      notes: analysis.metadata.notes,
    },
  });
}

// Get upcoming deadlines from all saved analyses
export function getUpcomingDeadlines(daysAhead: number = 30): Deadline[] {
  const analyses = getSavedAnalyses();
  const allDeadlines: Deadline[] = [];
  
  analyses.forEach(saved => {
    saved.analysis.deadlines.forEach(deadline => {
      allDeadlines.push(deadline);
    });
  });
  
  // Filter to upcoming deadlines only
  const upcoming = allDeadlines.filter(d => d.daysUntil >= 0 && d.daysUntil <= daysAhead);
  
  // Sort by date (soonest first)
  upcoming.sort((a, b) => a.daysUntil - b.daysUntil);
  
  return upcoming;
}

// Get all tasks from saved analyses
export function getAllTasks(): Array<ChecklistItem & { analysisId: string; documentType: DocumentType }> {
  const analyses = getSavedAnalyses();
  const allTasks: Array<ChecklistItem & { analysisId: string; documentType: DocumentType }> = [];
  
  analyses.forEach(saved => {
    saved.analysis.checklist.forEach(item => {
      allTasks.push({
        ...item,
        analysisId: saved.id,
        documentType: saved.documentType,
      });
    });
  });
  
  return allTasks;
}

// Get uncompleted tasks
export function getUncompletedTasks(): Array<ChecklistItem & { analysisId: string; documentType: DocumentType }> {
  return getAllTasks().filter(task => !task.completed);
}

// Get analyses by document type
export function getAnalysesByType(documentType: DocumentType): SavedAnalysis[] {
  return getSavedAnalyses().filter(a => a.documentType === documentType);
}

// Get analyses by risk level
export function getAnalysesByRisk(riskLevel: 'low' | 'medium' | 'high'): SavedAnalysis[] {
  return getSavedAnalyses().filter(a => a.analysis.riskLevel === riskLevel);
}

// Get dashboard stats
export interface DashboardStats {
  totalSaved: number;
  openTasks: number;
  upcomingDeadlines: number;
  highRiskItems: number;
}

export function getDashboardStats(): DashboardStats {
  const analyses = getSavedAnalyses();
  const upcomingDeadlines = getUpcomingDeadlines(7); // Next 7 days
  const openTasks = getUncompletedTasks();
  const highRiskItems = getAnalysesByRisk('high');
  
  return {
    totalSaved: analyses.length,
    openTasks: openTasks.length,
    upcomingDeadlines: upcomingDeadlines.length,
    highRiskItems: highRiskItems.length,
  };
}

// User preferences
export function saveUserPreferences(preferences: UserPreferences): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.error('Error saving preferences:', error);
    return false;
  }
}

export function getUserPreferences(): UserPreferences {
  if (!isLocalStorageAvailable()) {
    return {};
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    if (!stored) {
      return {};
    }
    return JSON.parse(stored) as UserPreferences;
  } catch (error) {
    console.error('Error loading preferences:', error);
    return {};
  }
}

// Clear all data (for testing or user request)
export function clearAllData(): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    localStorage.removeItem(STORAGE_KEYS.ANALYSES);
    localStorage.removeItem(STORAGE_KEYS.PREFERENCES);
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
}

// Made with Bob