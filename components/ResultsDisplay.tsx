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
import { LayoutDashboard, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResultsDisplayProps {
  results: AnalysisResult;
  userType: UserType | null;
  documentType: DocumentType | null;
  onSave: () => void;
  onViewDashboard: () => void;
  isDemo?: boolean;
}

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

export default function ResultsDisplay({ results, userType, documentType, onSave, onViewDashboard, isDemo }: ResultsDisplayProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">

        {/* Demo mode banner */}
        {isDemo && (
          <div role="alert" className="flex items-center gap-2.5 px-4 py-3 mb-6 rounded-xl border border-border bg-muted/60 text-sm text-muted-foreground">
            <Info className="w-4 h-4 flex-shrink-0 text-accent" aria-hidden="true" />
            <span>
              <span className="font-medium text-foreground">Demo mode</span> — IBM watsonx.ai is not connected.
              This result uses sample data. Connect your API key to analyze with real AI.
            </span>
          </div>
        )}

        {/* Results Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <p className="section-label mb-2">Analysis complete</p>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-2 leading-snug">Your Document Analysis</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Review each section and take action where needed.
            </p>
            {/* Context tags */}
            <div className="flex flex-wrap gap-2 mt-3">
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

          {/* Save + Dashboard actions */}
          <div className="flex flex-col sm:items-end gap-3">
            <div className="flex flex-wrap gap-2.5">
              <SaveAnalysisButton onSave={onSave} />
              <Button
                variant="outline"
                size="lg"
                onClick={onViewDashboard}
                className="hover:bg-primary/5 hover:border-primary/40"
              >
                <LayoutDashboard className="w-4 h-4 mr-2" aria-hidden="true" />
                View Dashboard
              </Button>
            </div>
            <div className="sm:self-end">
              <IBMBadge />
            </div>
          </div>
        </div>

        <div className="rule-line mb-10" />

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

        {/* Simplify Group */}
        <div className="mb-10">
          <p className="section-label mb-4">Simplify</p>
          <SimplerExplanation
            simplerExplanation={results.simplerExplanation}
            ultraSimpleExplanation={results.ultraSimpleExplanation}
          />
        </div>

        {/* Bottom CTA */}
        <div className="rule-line mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Save this analysis to track its deadlines and tasks in your dashboard.
          </p>
          <div className="flex gap-2.5">
            <SaveAnalysisButton onSave={onSave} />
            <Button
              variant="outline"
              size="lg"
              onClick={onViewDashboard}
              className="hover:bg-primary/5 hover:border-primary/40"
            >
              <LayoutDashboard className="w-4 h-4 mr-2" aria-hidden="true" />
              View Dashboard
            </Button>
          </div>
        </div>

        {/* Disclaimer — calm, muted, at the bottom */}
        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl">
            <strong className="font-medium text-foreground">Note:</strong> ClearPath AI does not provide legal, immigration, financial, or medical advice.
            Always consult qualified professionals — lawyers, accountants, doctors, or immigration consultants — for guidance specific to your situation.
            Sample documents shown are fictional and for demonstration purposes only.
          </p>
        </div>

      </div>
    </div>
  );
}

// Made with Bob
