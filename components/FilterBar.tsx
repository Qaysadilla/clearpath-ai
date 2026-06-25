'use client';

import { DocumentType } from '@/lib/storage';

type RiskFilter = 'all' | 'high' | 'medium' | 'low';
type DocTypeFilter = DocumentType | 'all';

interface FilterBarProps {
  activeDocType: DocTypeFilter;
  activeRisk: RiskFilter;
  onDocTypeChange: (type: DocTypeFilter) => void;
  onRiskChange: (risk: RiskFilter) => void;
}

const docTypeFilters: { value: DocTypeFilter; label: string }[] = [
  { value: 'all',        label: 'All Types' },
  { value: 'school',     label: 'School' },
  { value: 'housing',    label: 'Housing' },
  { value: 'government', label: 'Government' },
  { value: 'medical',    label: 'Medical' },
  { value: 'banking',    label: 'Banking' },
  { value: 'work',       label: 'Work' },
  { value: 'other',      label: 'Other' },
];

const riskFilters: { value: RiskFilter; label: string; color: string; activeClass: string }[] = [
  { value: 'all',    label: 'All Risk',   color: 'text-muted-foreground', activeClass: 'bg-foreground text-background border-foreground' },
  { value: 'high',   label: 'High',       color: 'text-red-600',          activeClass: 'bg-red-100 text-red-700 border-red-300' },
  { value: 'medium', label: 'Medium',     color: 'text-orange-600',       activeClass: 'bg-orange-100 text-orange-700 border-orange-300' },
  { value: 'low',    label: 'Low',        color: 'text-green-600',        activeClass: 'bg-green-100 text-green-700 border-green-300' },
];

function FilterChip({
  label,
  isActive,
  activeClass,
  onClick,
}: {
  label: string;
  isActive: boolean;
  activeClass?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150
        ${isActive
          ? activeClass || 'bg-foreground text-background border-foreground'
          : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
        }
      `}
    >
      {label}
    </button>
  );
}

export default function FilterBar({ activeDocType, activeRisk, onDocTypeChange, onRiskChange }: FilterBarProps) {
  return (
    <div className="bg-card rounded-2xl border border-border p-4 shadow-soft space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="section-label mr-2 flex-shrink-0">Document Type:</span>
        {docTypeFilters.map((f) => (
          <FilterChip
            key={f.value}
            label={f.label}
            isActive={activeDocType === f.value}
            onClick={() => onDocTypeChange(f.value)}
          />
        ))}
      </div>

      <div className="rule-line" />

      <div className="flex flex-wrap items-center gap-2">
        <span className="section-label mr-2 flex-shrink-0">Risk Level:</span>
        {riskFilters.map((f) => (
          <FilterChip
            key={f.value}
            label={f.label}
            isActive={activeRisk === f.value}
            activeClass={f.activeClass}
            onClick={() => onRiskChange(f.value)}
          />
        ))}
      </div>
    </div>
  );
}

// Made with Bob
