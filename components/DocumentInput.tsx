'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Sparkles } from 'lucide-react';
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

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      {/* Step 1: User Type Selection */}
      <div className="max-w-6xl mx-auto">
        <UserTypeSelector selectedType={userType} onSelect={setUserType} />
      </div>

      {/* Step 2: Document Type Selection */}
      {userType && (
        <div className="max-w-6xl mx-auto">
          <DocumentTypeSelector selectedType={documentType} onSelect={setDocumentType} />
        </div>
      )}

      {/* Step 3: Input Method & Document Text */}
      {userType && documentType && (
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 shadow-soft-lg">
            <CardHeader className="space-y-4">
              <InputMethodTabs activeMethod={inputMethod} onMethodChange={setInputMethod} />
              
              <div className="rule-line my-4" />
              
              <div>
                <CardTitle className="flex items-center gap-3 text-2xl font-serif">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  Paste Your Document
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Copy and paste the text from your letter, email, or notice below. Or try one of our sample documents.
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Sample Document Buttons */}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-3 section-label">Try a sample document:</p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="default"
                    onClick={() => onLoadSample('appointment')}
                    disabled={isLoading}
                    className="hover:bg-primary/5 hover:border-primary/50"
                  >
                    📅 Medical Appointment
                  </Button>
                  <Button
                    variant="outline"
                    size="default"
                    onClick={() => onLoadSample('housing')}
                    disabled={isLoading}
                    className="hover:bg-primary/5 hover:border-primary/50"
                  >
                    🏠 Housing Notice
                  </Button>
                  <Button
                    variant="outline"
                    size="default"
                    onClick={() => onLoadSample('school')}
                    disabled={isLoading}
                    className="hover:bg-primary/5 hover:border-primary/50"
                  >
                    🎓 School Email
                  </Button>
                </div>
              </div>

              {/* Text Area */}
              <div className="relative">
                <Textarea
                  placeholder="Paste your document text here... (e.g., appointment letter, rent notice, financial aid email, etc.)"
                  value={documentText}
                  onChange={(e) => setDocumentText(e.target.value)}
                  disabled={isLoading}
                  className="min-h-[340px] resize-y text-base leading-relaxed border-2 focus:border-primary"
                  maxLength={maxChars}
                />
                <div className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-soft border border-border">
                  {charCount} / {maxChars}
                </div>
              </div>

              {/* Analyze Button */}
              <div className="flex justify-center pt-4">
                <Button
                  size="lg"
                  onClick={onAnalyze}
                  disabled={!canAnalyze}
                  className="w-full sm:w-auto px-12 py-6 text-lg font-semibold shadow-soft-lg hover:shadow-soft-xl"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  {isLoading ? 'Analyzing...' : 'Analyze Document'}
                </Button>
              </div>

              {!canAnalyze && !isLoading && (
                <div className="text-center text-sm text-muted-foreground">
                  {!userType && 'Please select who you are using ClearPath as'}
                  {userType && !documentType && 'Please select your document type'}
                  {userType && documentType && !documentText.trim() && 'Please paste your document text'}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// Made with Bob
