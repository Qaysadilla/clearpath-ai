'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getSavedAnalyses,
  deleteAnalysis,
  getDashboardStats,
  getUpcomingDeadlines,
  getAllTasks,
  SavedAnalysis,
  DocumentType,
} from '@/lib/storage';
import { Deadline } from '@/lib/types';
import DashboardStats from './DashboardStats';
import SavedDocumentsList from './SavedDocumentsList';
import MiniCalendar from './MiniCalendar';
import TaskListView from './TaskListView';
import FilterBar from './FilterBar';
import { Button } from '@/components/ui/button';
import { FileSearch, RotateCcw } from 'lucide-react';

type RiskFilter = 'all' | 'high' | 'medium' | 'low';
type DocTypeFilter = DocumentType | 'all';

interface DashboardProps {
  onAnalyzeNew: () => void;
  onViewSavedAnalysis: (analysis: SavedAnalysis) => void;
}

export default function Dashboard({ onAnalyzeNew, onViewSavedAnalysis }: DashboardProps) {
  const [analyses, setAnalyses] = useState<SavedAnalysis[]>([]);
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [activeDocType, setActiveDocType] = useState<DocTypeFilter>('all');
  const [activeRisk, setActiveRisk] = useState<RiskFilter>('all');

  const loadData = useCallback(() => {
    setAnalyses(getSavedAnalyses());
    setDeadlines(getUpcomingDeadlines(60)); // Next 60 days
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete = (id: string) => {
    deleteAnalysis(id);
    loadData();
  };

  // Filter analyses
  const filteredAnalyses = analyses.filter((a) => {
    const matchDocType = activeDocType === 'all' || a.documentType === activeDocType;
    const matchRisk    = activeRisk === 'all'    || a.analysis.riskLevel === activeRisk;
    return matchDocType && matchRisk;
  });

  const stats = getDashboardStats();
  const allTasks = getAllTasks();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="section-label mb-1">Your Command Center</p>
            <h2 className="text-4xl font-serif font-bold text-foreground">Dashboard</h2>
            <p className="text-muted-foreground mt-2">
              Your saved documents, deadlines, and tasks — all in one place.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={loadData}
              variant="outline"
              size="sm"
              className="hover:bg-primary/5 hover:border-primary/50"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Refresh
            </Button>
            <Button
              onClick={onAnalyzeNew}
              size="default"
              className="shadow-soft-md hover:shadow-soft-lg"
            >
              <FileSearch className="w-4 h-4 mr-2" />
              Analyze New Document
            </Button>
          </div>
        </div>

        <div className="rule-line" />

        {/* Stats */}
        <DashboardStats stats={stats} />

        {/* Filters */}
        <FilterBar
          activeDocType={activeDocType}
          activeRisk={activeRisk}
          onDocTypeChange={setActiveDocType}
          onRiskChange={setActiveRisk}
        />

        {/* Main Grid: Calendar + Documents */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Mini Calendar */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <p className="section-label mb-4">Upcoming Deadlines</p>
              <MiniCalendar deadlines={deadlines} />
            </div>
          </div>

          {/* Right: Saved Documents */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <p className="section-label">
                Saved Documents
                {filteredAnalyses.length !== analyses.length && (
                  <span className="ml-2 text-primary">
                    ({filteredAnalyses.length} of {analyses.length})
                  </span>
                )}
              </p>
              {(activeDocType !== 'all' || activeRisk !== 'all') && (
                <button
                  onClick={() => { setActiveDocType('all'); setActiveRisk('all'); }}
                  className="text-xs text-muted-foreground hover:text-foreground underline"
                >
                  Clear filters
                </button>
              )}
            </div>
            <SavedDocumentsList
              analyses={filteredAnalyses}
              onView={onViewSavedAnalysis}
              onDelete={handleDelete}
            />
          </div>
        </div>

        {/* Tasks Section */}
        <div>
          <p className="section-label mb-4">Action Tasks</p>
          <TaskListView
            tasks={allTasks}
            onTasksChange={loadData}
          />
        </div>

        {/* Footer note */}
        <div className="rule-line" />
        <div className="text-center text-xs text-muted-foreground py-4 space-y-1">
          <p>Saved analyses are stored locally in your browser for this demo. Nothing is sent to a server.</p>
          <p>Do not upload highly sensitive personal documents in this demo.</p>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
