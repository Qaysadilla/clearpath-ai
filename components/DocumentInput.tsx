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
      <Card className="max-w-4xl mx-auto shadow-lg border-gray-200">
        <CardHeader className="space-y-3">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <FileText className="w-6 h-6 text-primary" />
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
                className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                📅 Medical Appointment
              </Button>
              <Button
                variant="outline"
                size="default"
                onClick={() => onLoadSample('housing')}
                disabled={isLoading}
                className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                🏠 Housing Notice
              </Button>
              <Button
                variant="outline"
                size="default"
                onClick={() => onLoadSample('school')}
                disabled={isLoading}
                className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
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
              className="min-h-[320px] resize-y text-base leading-relaxed"
              maxLength={maxChars}
            />
            <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-white px-2 py-1 rounded">
              {charCount} / {maxChars}
            </div>
          </div>

          {/* Analyze Button */}
          <div className="flex justify-center pt-2">
            <Button
              size="lg"
              onClick={onAnalyze}
              disabled={!documentText.trim() || isLoading}
              className="w-full sm:w-auto px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all"
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
