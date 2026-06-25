'use client';

import { DocumentType } from '@/lib/storage';
import { GraduationCap, Home, Building2, Stethoscope, CreditCard, Briefcase, FileText } from 'lucide-react';

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
        <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
          Step 2: What kind of document is this?
        </h3>
        <p className="text-sm text-muted-foreground">
          Select the category that best matches your document.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {documentTypes.map((docType) => {
          const Icon = docType.icon;
          const isSelected = selectedType === docType.type;

          return (
            <button
              key={docType.type}
              onClick={() => onSelect(docType.type)}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-200
                hover:shadow-soft-md hover:-translate-y-0.5 text-left
                ${isSelected 
                  ? 'border-primary bg-primary/5 shadow-soft-md' 
                  : 'border-border bg-card hover:border-primary/30'
                }
              `}
            >
              <div className="flex items-start space-x-3">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                  ${isSelected ? 'bg-primary/10' : 'bg-muted'}
                `}>
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold text-sm mb-1 ${isSelected ? 'text-foreground' : 'text-foreground'}`}>
                    {docType.label}
                  </div>
                  <div className="text-xs text-muted-foreground leading-tight">
                    {docType.examples}
                  </div>
                </div>
              </div>
              
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
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