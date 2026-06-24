'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Sparkles } from 'lucide-react';

interface DocumentInputProps {
  documentText: string;
  setDocumentText: (text: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  onLoadSample: (sampleType: 'appointment' | 'housing' | 'school') => void;
}

export default function DocumentInput({
  documentText,
  setDocumentText,
  onAnalyze,
  isLoading,
  onLoadSample
}: DocumentInputProps) {
  const charCount = documentText.length;
  const maxChars = 10000;

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="space-y-3">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 rounded-xl bg-primary/10">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            Paste Your Document
          </CardTitle>
          <CardDescription className="text-base">
            Copy and paste the text from your letter, email, or notice below. Or try one of our sample documents.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sample Document Buttons */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Try a sample document:</p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="default"
                onClick={() => onLoadSample('appointment')}
                disabled={isLoading}
                className="hover:bg-blue-50 hover:border-blue-300"
              >
                📅 Medical Appointment
              </Button>
              <Button
                variant="outline"
                size="default"
                onClick={() => onLoadSample('housing')}
                disabled={isLoading}
                className="hover:bg-blue-50 hover:border-blue-300"
              >
                🏠 Housing Notice
              </Button>
              <Button
                variant="outline"
                size="default"
                onClick={() => onLoadSample('school')}
                disabled={isLoading}
                className="hover:bg-blue-50 hover:border-blue-300"
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
              className="min-h-[340px] resize-y text-base leading-relaxed"
              maxLength={maxChars}
            />
            <div className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-gray-200">
              {charCount} / {maxChars}
            </div>
          </div>

          {/* Analyze Button */}
          <div className="flex justify-center pt-4">
            <Button
              size="lg"
              onClick={onAnalyze}
              disabled={!documentText.trim() || isLoading}
              className="w-full sm:w-auto px-10 py-6 text-lg font-semibold"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {isLoading ? 'Analyzing...' : 'Analyze Document'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Made with Bob
