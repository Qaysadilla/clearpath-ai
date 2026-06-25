'use client';

import { useState } from 'react';
import { ChecklistItem } from '@/lib/types';
import { DocumentType, updateAnalysis, getSavedAnalyses } from '@/lib/storage';
import { CheckSquare, Square } from 'lucide-react';

interface TaskItem extends ChecklistItem {
  analysisId: string;
  documentType: DocumentType;
}

interface TaskListViewProps {
  tasks: TaskItem[];
  onTasksChange: () => void;
}

const docTypeLabelMap: Record<DocumentType, string> = {
  school: 'School',
  housing: 'Housing',
  government: 'Government',
  medical: 'Medical',
  banking: 'Banking',
  work: 'Work',
  other: 'Other',
};

const docTypeColorMap: Record<DocumentType, string> = {
  school:     'bg-blue-100 text-blue-700',
  housing:    'bg-orange-100 text-orange-700',
  government: 'bg-purple-100 text-purple-700',
  medical:    'bg-red-100 text-red-700',
  banking:    'bg-green-100 text-green-700',
  work:       'bg-indigo-100 text-indigo-700',
  other:      'bg-gray-100 text-gray-700',
};

export default function TaskListView({ tasks, onTasksChange }: TaskListViewProps) {
  const [localTasks, setLocalTasks] = useState<TaskItem[]>(tasks);

  const handleToggle = (taskIndex: number) => {
    const task = localTasks[taskIndex];
    const analyses = getSavedAnalyses();
    const analysis = analyses.find(a => a.id === task.analysisId);
    if (!analysis) return;

    // Toggle the specific checklist item
    const updatedChecklist = analysis.analysis.checklist.map((item, i) => {
      // Match by step text since we don't have stable IDs
      if (item.step === task.step) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    updateAnalysis(task.analysisId, {
      analysis: { ...analysis.analysis, checklist: updatedChecklist },
    });

    // Update local state
    const updated = [...localTasks];
    updated[taskIndex] = { ...task, completed: !task.completed };
    setLocalTasks(updated);
    onTasksChange();
  };

  if (localTasks.length === 0) {
    return (
      <div className="bg-card rounded-2xl border border-border p-8 shadow-soft text-center">
        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-3">
          <CheckSquare className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="font-serif font-semibold text-foreground mb-1">No tasks yet</h3>
        <p className="text-xs text-muted-foreground">Save an analysis to see your action checklist here</p>
      </div>
    );
  }

  const openTasks = localTasks.filter(t => !t.completed);
  const completedTasks = localTasks.filter(t => t.completed);

  return (
    <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-accent" />
          <h3 className="font-serif font-semibold text-foreground">Action Tasks</h3>
          <span className="ml-auto text-xs font-medium bg-accent/10 text-accent px-2 py-0.5 rounded-full border border-accent/20">
            {openTasks.length} open
          </span>
        </div>
      </div>

      {/* Task List */}
      <div className="divide-y divide-border">
        {/* Open tasks first */}
        {openTasks.map((task, originalIndex) => {
          const globalIndex = localTasks.findIndex(t => t.step === task.step && t.analysisId === task.analysisId);
          return (
            <TaskRow
              key={`${task.analysisId}-${task.step}`}
              task={task}
              onToggle={() => handleToggle(globalIndex)}
            />
          );
        })}

        {/* Completed tasks at bottom */}
        {completedTasks.length > 0 && (
          <>
            <div className="px-6 py-2 bg-muted/20">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Completed ({completedTasks.length})
              </span>
            </div>
            {completedTasks.map((task) => {
              const globalIndex = localTasks.findIndex(t => t.step === task.step && t.analysisId === task.analysisId);
              return (
                <TaskRow
                  key={`${task.analysisId}-${task.step}`}
                  task={task}
                  onToggle={() => handleToggle(globalIndex)}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

function TaskRow({ task, onToggle }: { task: TaskItem; onToggle: () => void }) {
  return (
    <div
      className="flex items-start gap-4 px-6 py-4 hover:bg-muted/20 transition-colors duration-150 cursor-pointer"
      onClick={onToggle}
    >
      <div className="mt-0.5 flex-shrink-0">
        {task.completed
          ? <CheckSquare className="w-5 h-5 text-primary" />
          : <Square className="w-5 h-5 text-muted-foreground hover:text-primary" />
        }
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium leading-snug ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
          {task.step}
        </p>
        {task.notes && (
          <p className="text-xs text-muted-foreground mt-0.5">{task.notes}</p>
        )}
      </div>
      <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${docTypeColorMap[task.documentType]}`}>
        {docTypeLabelMap[task.documentType]}
      </span>
    </div>
  );
}

// Made with Bob
