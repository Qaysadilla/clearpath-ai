'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FileText, Sparkles, Check, CalendarDays, Home, GraduationCap } from 'lucide-react';
import UserTypeSelector from './UserTypeSelector';
import DocumentTypeSelector from './DocumentTypeSelector';
import InputMethodTabs from './InputMethodTabs';
import { UserType, DocumentType } from '@/lib/storage';

interface DocumentInputProps {
  documentText: string;
  setDocumentText: (text: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  onLoadSample: (sampleType: 'appointment' | 'housing' | 'school') => void;
  userType: UserType | null;
  setUserType: (type: UserType) => void;
  documentType: DocumentType | null;
  setDocumentType: (type: DocumentType) => void;
}

// Derive a 1-based step number (1, 2, or 3) from current state
function currentStep(userType: UserType | null, documentType: DocumentType | null): number {
  if (!userType) return 1;
  if (!documentType) return 2;
  return 3;
}

const stepConfig = [
  { number: 1, label: 'Who are you?' },
  { number: 2, label: 'Document type' },
  { number: 3, label: 'Your document' },
];

interface StepIndicatorProps {
  activeStep: number;
}

function StepIndicator({ activeStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {stepConfig.map((step, i) => {
        const isDone = step.number < activeStep;
        const isActive = step.number === activeStep;

        return (
          <div key={step.number} className="flex items-center">
            {/* Step circle */}
            <div className="flex items-center gap-2">
              <div
                className={`
                  w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0
                  transition-colors duration-200
                  ${isDone
                    ? 'bg-primary text-primary-foreground'
                    : isActive
                      ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                      : 'bg-muted text-muted-foreground border border-border'
                  }
                `}
                aria-current={isActive ? 'step' : undefined}
              >
                {isDone
                  ? <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  : <span>{step.number}</span>
                }
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line between steps */}
            {i < stepConfig.length - 1 && (
              <div
                className={`
                  h-px w-8 sm:w-12 mx-2 flex-shrink-0
                  ${step.number < activeStep ? 'bg-primary' : 'bg-border'}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

const sampleButtons = [
  { key: 'appointment' as const, icon: CalendarDays, label: 'Medical Appointment' },
  { key: 'housing' as const, icon: Home, label: 'Housing Notice' },
  { key: 'school' as const, icon: GraduationCap, label: 'School Email' },
];

export default function DocumentInput({
  documentText,
  setDocumentText,
  onAnalyze,
  isLoading,
  onLoadSample,
  userType,
  setUserType,
  documentType,
  setDocumentType,
}: DocumentInputProps) {
  const [inputMethod, setInputMethod] = useState<'paste' | 'upload' | 'scan'>('paste');
  const charCount = documentText.length;
  const maxChars = 10000;

  const canAnalyze = documentText.trim() && userType && documentType && !isLoading;
  const activeStep = currentStep(userType, documentType);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Step indicator */}
        <StepIndicator activeStep={activeStep} />

        <div className="space-y-8">
          {/* Step 1: User Type Selection */}
          <div>
            <UserTypeSelector selectedType={userType} onSelect={setUserType} />
          </div>

          {/* Step 2: Document Type Selection */}
          {userType && (
            <div>
              <div className="rule-line mb-8" />
              <DocumentTypeSelector selectedType={documentType} onSelect={setDocumentType} />
            </div>
          )}

          {/* Step 3: Input Method & Document Text */}
          {userType && documentType && (
            <div>
              <div className="rule-line mb-8" />
              <div className="max-w-4xl">
                <Card className="border shadow-soft-lg">
                  <CardHeader className="space-y-5 pb-4">
                    <InputMethodTabs activeMethod={inputMethod} onMethodChange={setInputMethod} />

                    <div className="rule-line" />

                    {/* Card title row */}
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4.5 h-4.5 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-lg font-serif font-semibold text-foreground leading-snug">
                          Paste your document
                        </h3>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          Copy and paste the text from your letter, email, or notice.
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-5">
                    {/* Sample document buttons */}
                    <div>
                      <p className="section-label mb-2.5">Try a sample document</p>
                      <div className="flex flex-wrap gap-2">
                        {sampleButtons.map(({ key, icon: Icon, label }) => (
                          <Button
                            key={key}
                            variant="outline"
                            size="sm"
                            onClick={() => onLoadSample(key)}
                            disabled={isLoading}
                            className="flex items-center gap-1.5 hover:bg-primary/5 hover:border-primary/40 text-sm"
                          >
                            <Icon className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                            {label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Textarea */}
                    <div className="relative">
                      <Textarea
                        placeholder="Paste your document text here — for example, an appointment letter, rent notice, financial aid email, or government form."
                        value={documentText}
                        onChange={(e) => setDocumentText(e.target.value)}
                        disabled={isLoading}
                        className="min-h-[300px] resize-y text-base leading-relaxed border focus:border-primary"
                        maxLength={maxChars}
                        aria-label="Document text"
                      />
                      <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-card/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-soft border border-border">
                        {charCount.toLocaleString()} / {maxChars.toLocaleString()}
                      </div>
                    </div>

                    {/* Analyze button */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                      <Button
                        size="lg"
                        onClick={onAnalyze}
                        disabled={!canAnalyze}
                        className="w-full sm:w-auto px-10 py-5 text-base font-semibold shadow-soft-md hover:shadow-soft-lg"
                      >
                        <Sparkles className="w-4.5 h-4.5 mr-2" aria-hidden="true" />
                        {isLoading ? 'Analyzing…' : 'Analyze with IBM watsonx.ai'}
                      </Button>
                    </div>

                    {!canAnalyze && !isLoading && (
                      <p className="text-center text-xs text-muted-foreground">
                        {!userType && 'Select who you are in Step 1 to continue'}
                        {userType && !documentType && 'Select a document type in Step 2 to continue'}
                        {userType && documentType && !documentText.trim() && 'Paste your document text above to continue'}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Made with Bob
