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
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Paste Your Document
          </CardTitle>
          <CardDescription>
            Copy and paste the text from your letter, email, or notice below. Or try one of our sample documents.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Sample Document Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onLoadSample('appointment')}
              disabled={isLoading}
            >
              📅 Medical Appointment
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onLoadSample('housing')}
              disabled={isLoading}
            >
              🏠 Housing Notice
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onLoadSample('school')}
              disabled={isLoading}
            >
              🎓 School Email
            </Button>
          </div>

          {/* Text Area */}
          <div className="relative">
            <Textarea
              placeholder="Paste your document text here... (e.g., appointment letter, eviction notice, financial aid email, etc.)"
              value={documentText}
              onChange={(e) => setDocumentText(e.target.value)}
              disabled={isLoading}
              className="min-h-[300px] resize-y"
              maxLength={maxChars}
            />
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              {charCount} / {maxChars}
            </div>
          </div>

          {/* Analyze Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={onAnalyze}
              disabled={!documentText.trim() || isLoading}
              className="w-full sm:w-auto"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isLoading ? 'Analyzing...' : 'Analyze Document'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Made with Bob
