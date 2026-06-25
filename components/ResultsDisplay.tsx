'use client';

import { AnalysisResult } from '@/lib/types';
import { UserType, DocumentType } from '@/lib/storage';
import SummarySection from './SummarySection';
import DeadlinesSection from './DeadlinesSection';
import ActionsSection from './ActionsSection';
import DocumentsSection from './DocumentsSection';
import RiskBadge from './RiskBadge';
import ChecklistSection from './ChecklistSection';
import DraftReplySection from './DraftReplySection';
import SimplerExplanation from './SimplerExplanation';
import SaveAnalysisButton from './SaveAnalysisButton';
import IBMBadge from './IBMBadge';
import { LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResultsDisplayProps {
  results: AnalysisResult;
  userType: UserType | null;
  documentType: DocumentType | null;
  onSave: () => void;
  onViewDashboard: () => void;
}

export default function ResultsDisplay({ results, userType, documentType, onSave, onViewDashboard }: ResultsDisplayProps) {
  const documentTypeLabel: Record<DocumentType, string> = {
    school: 'School / Financial Aid',
    housing: 'Housing / Landlord',
    government: 'Government / Immigration',
    medical: 'Medical Appointment',
    banking: 'Banking / Bills',
    work: 'Work / Job',
    other: 'Other',
  };

  const userTypeLabel: Record<UserType, string> = {
    student: 'Student',
    newcomer: 'Newcomer / Immigrant',
    worker: 'Worker',
    family_helper: 'Family Helper',
    general: 'General User',
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">

        {/* Results Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <p className="section-label mb-2">Analysis Complete</p>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-3">Your Document Decoded</h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              Here's what we found. Review each section carefully and take action as needed.
            </p>
            {/* Context tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {userType && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  {userTypeLabel[userType]}
                </span>
              )}
              {documentType && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/60 text-foreground border border-border">
                  {documentTypeLabel[documentType]}
                </span>
              )}
            </div>
          </div>

          {/* Save + Dashboard Actions */}
          <div className="flex flex-col sm:items-end gap-3">
            <div className="flex flex-wrap gap-3">
              <SaveAnalysisButton onSave={onSave} />
              <Button
                variant="outline"
                size="lg"
                onClick={onViewDashboard}
                className="hover:bg-primary/5 hover:border-primary/50"
              >
                <LayoutDashboard className="w-5 h-5 mr-2" />
                View Dashboard
              </Button>
            </div>
            <div className="sm:self-end">
              <IBMBadge />
            </div>
          </div>
        </div>

        <div className="rule-line mb-8" />

        {/* Grouped Result Sections */}

        {/* Understand Group */}
        <div className="mb-10">
          <p className="section-label mb-4">Understand</p>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SummarySection summary={results.summary} />
            </div>
            <div>
              <RiskBadge riskLevel={results.riskLevel} riskExplanation={results.riskExplanation} />
            </div>
          </div>
        </div>

        {/* Act Group */}
        <div className="mb-10">
          <p className="section-label mb-4">Act</p>
          <div className="grid lg:grid-cols-2 gap-6">
            <ActionsSection actions={results.actions} />
            <DeadlinesSection deadlines={results.deadlines} />
          </div>
        </div>

        {/* Prepare Group */}
        <div className="mb-10">
          <p className="section-label mb-4">Prepare</p>
          <div className="grid lg:grid-cols-2 gap-6">
            <ChecklistSection checklist={results.checklist} />
            <DocumentsSection documentsNeeded={results.documentsNeeded} />
          </div>
        </div>

        {/* Reply Group */}
        <div className="mb-10">
          <p className="section-label mb-4">Reply</p>
          <DraftReplySection draftReply={results.draftReply} />
        </div>

        {/* Simpler Explanation at Bottom */}
        <div className="mb-8">
          <p className="section-label mb-4">Simplify</p>
          <SimplerExplanation
            simplerExplanation={results.simplerExplanation}
            ultraSimpleExplanation={results.ultraSimpleExplanation}
          />
        </div>

        {/* Bottom Save CTA */}
        <div className="rule-line mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Save this analysis to track deadlines and tasks in your dashboard.
          </p>
          <div className="flex gap-3">
            <SaveAnalysisButton onSave={onSave} />
            <Button
              variant="outline"
              size="lg"
              onClick={onViewDashboard}
              className="hover:bg-primary/5 hover:border-primary/50"
            >
              <LayoutDashboard className="w-5 h-5 mr-2" />
              View Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
