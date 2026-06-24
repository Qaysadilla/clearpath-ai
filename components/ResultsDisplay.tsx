import { AnalysisResult } from '@/lib/types';
import SummarySection from './SummarySection';
import DeadlinesSection from './DeadlinesSection';
import ActionsSection from './ActionsSection';
import DocumentsSection from './DocumentsSection';
import RiskBadge from './RiskBadge';
import ChecklistSection from './ChecklistSection';
import DraftReplySection from './DraftReplySection';
import SimplerExplanation from './SimplerExplanation';

interface ResultsDisplayProps {
  results: AnalysisResult;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Analysis Results</h2>
          <p className="text-gray-600">
            Here's what we found in your document. Review each section carefully and take action as needed.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Full width on mobile, 2 cols on desktop */}
          <div className="lg:col-span-2 space-y-6">
            <SummarySection summary={results.summary} />
            <DeadlinesSection deadlines={results.deadlines} />
            <ActionsSection actions={results.actions} />
            <ChecklistSection checklist={results.checklist} />
            <DraftReplySection draftReply={results.draftReply} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <RiskBadge 
              riskLevel={results.riskLevel} 
              riskExplanation={results.riskExplanation} 
            />
            <DocumentsSection documentsNeeded={results.documentsNeeded} />
          </div>
        </div>

        {/* Full Width Section at Bottom */}
        <div className="mt-6">
          <SimplerExplanation simplerExplanation={results.simplerExplanation} />
        </div>
      </div>
    </div>
  );
}

// Made with Bob
