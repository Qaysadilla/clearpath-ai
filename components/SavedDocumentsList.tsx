'use client';

import { SavedAnalysis, DocumentType } from '@/lib/storage';
import { Trash2, Eye, AlertTriangle, GraduationCap, Home, Building2, Stethoscope, CreditCard, Briefcase, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SavedDocumentsListProps {
  analyses: SavedAnalysis[];
  onView: (analysis: SavedAnalysis) => void;
  onDelete: (id: string) => void;
}

const docTypeConfig: Record<DocumentType, { icon: React.ElementType; label: string; color: string; bg: string }> = {
  school:     { icon: GraduationCap, label: 'School / Financial Aid',     color: 'text-blue-600',   bg: 'bg-blue-50'   },
  housing:    { icon: Home,          label: 'Housing / Landlord',          color: 'text-orange-600', bg: 'bg-orange-50' },
  government: { icon: Building2,     label: 'Government / Immigration',    color: 'text-purple-600', bg: 'bg-purple-50' },
  medical:    { icon: Stethoscope,   label: 'Medical Appointment',         color: 'text-red-600',    bg: 'bg-red-50'    },
  banking:    { icon: CreditCard,    label: 'Banking / Bills',             color: 'text-green-600',  bg: 'bg-green-50'  },
  work:       { icon: Briefcase,     label: 'Work / Job',                  color: 'text-indigo-600', bg: 'bg-indigo-50' },
  other:      { icon: FileText,      label: 'Other',                       color: 'text-gray-600',   bg: 'bg-gray-50'   },
};

const riskConfig = {
  high:   { label: 'High Risk',   class: 'bg-red-100 text-red-700 border-red-200' },
  medium: { label: 'Medium Risk', class: 'bg-orange-100 text-orange-700 border-orange-200' },
  low:    { label: 'Low Risk',    class: 'bg-green-100 text-green-700 border-green-200' },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-CA', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

export default function SavedDocumentsList({ analyses, onView, onDelete }: SavedDocumentsListProps) {
  if (analyses.length === 0) {
    return (
      <div className="bg-card rounded-2xl border border-border p-12 text-center shadow-soft">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-serif font-semibold text-foreground text-lg mb-2">No saved analyses yet</h3>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          Analyze a document and save it to see it here. Your analyses are stored privately on this device.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {analyses.map((saved) => {
        const config = docTypeConfig[saved.documentType];
        const Icon = config.icon;
        const risk = riskConfig[saved.analysis.riskLevel];
        const preview = saved.documentText.replace(/\s+/g, ' ').trim().substring(0, 120);

        return (
          <div
            key={saved.id}
            className="bg-card rounded-2xl border border-border p-5 shadow-soft hover:shadow-soft-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="flex items-start gap-4">
              {/* Doc type icon */}
              <div className={`w-11 h-11 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${config.color}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-foreground">{config.label}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${risk.class}`}>
                    {saved.analysis.riskLevel === 'high' && <AlertTriangle className="w-3 h-3 mr-1" />}
                    {risk.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2">
                  {preview}…
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span>Saved {formatDate(saved.metadata.savedAt)}</span>
                  {saved.analysis.deadlines.length > 0 && (
                    <span>{saved.analysis.deadlines.length} deadline{saved.analysis.deadlines.length !== 1 ? 's' : ''}</span>
                  )}
                  {saved.analysis.checklist.length > 0 && (
                    <span>{saved.analysis.checklist.filter(i => !i.completed).length}/{saved.analysis.checklist.length} tasks open</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(saved)}
                  className="hover:bg-primary/5 hover:border-primary/50"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(saved.id)}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Made with Bob
