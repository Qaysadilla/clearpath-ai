'use client';

import { DocumentType } from '@/lib/storage';
import { GraduationCap, Home, Building2, Stethoscope, CreditCard, Briefcase, FileText, Check } from 'lucide-react';

interface DocumentTypeSelectorProps {
  selectedType: DocumentType | null;
  onSelect: (type: DocumentType) => void;
}

const documentTypes = [
  {
    type: 'school' as DocumentType,
    icon: GraduationCap,
    label: 'School / Financial Aid',
    examples: 'Tuition, scholarships, academic notices',
  },
  {
    type: 'housing' as DocumentType,
    icon: Home,
    label: 'Housing / Landlord',
    examples: 'Rent notices, lease agreements, repairs',
  },
  {
    type: 'government' as DocumentType,
    icon: Building2,
    label: 'Government / Immigration',
    examples: 'Visa, permits, tax notices, benefits',
  },
  {
    type: 'medical' as DocumentType,
    icon: Stethoscope,
    label: 'Medical Appointment',
    examples: 'Doctor appointments, test results, insurance',
  },
  {
    type: 'banking' as DocumentType,
    icon: CreditCard,
    label: 'Banking / Bills',
    examples: 'Bank statements, payment notices, utilities',
  },
  {
    type: 'work' as DocumentType,
    icon: Briefcase,
    label: 'Work / Job',
    examples: 'Employment letters, benefits, contracts',
  },
  {
    type: 'other' as DocumentType,
    icon: FileText,
    label: 'Other',
    examples: 'Any other official document',
  },
];

export default function DocumentTypeSelector({ selectedType, onSelect }: DocumentTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="section-label text-primary mb-1">Step 2</p>
        <h3 className="text-lg font-serif font-semibold text-foreground mb-1">
          What kind of document is this?
        </h3>
        <p className="text-sm text-muted-foreground">
          Select the category that best matches your document.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {documentTypes.map((docType) => {
          const Icon = docType.icon;
          const isSelected = selectedType === docType.type;

          return (
            <button
              key={docType.type}
              onClick={() => onSelect(docType.type)}
              aria-pressed={isSelected}
              className={`
                relative p-4 rounded-xl border text-left transition-all duration-150
                hover:shadow-soft-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
                ${isSelected
                  ? 'border-primary bg-primary/5 shadow-soft-md'
                  : 'border-border bg-card hover:border-primary/40 hover:bg-muted/30'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`
                  w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-150
                  ${isSelected ? 'bg-primary/10' : 'bg-muted'}
                `}>
                  <Icon className={`w-4.5 h-4.5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-foreground leading-snug mb-0.5">
                    {docType.label}
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    {docType.examples}
                  </div>
                </div>
              </div>

              {isSelected && (
                <div className="absolute top-2.5 right-2.5">
                  <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
                    <Check className="w-3 h-3" aria-hidden="true" />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Made with Bob
