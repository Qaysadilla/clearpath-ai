'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface SimplerExplanationProps {
  simplerExplanation: string;
  ultraSimpleExplanation?: string;
}

export default function SimplerExplanation({ simplerExplanation, ultraSimpleExplanation }: SimplerExplanationProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showUltraSimple, setShowUltraSimple] = useState(false);

  // Generate ultra-simple version if not provided
  const getUltraSimple = () => {
    if (ultraSimpleExplanation) return ultraSimpleExplanation;
    
    // Convert to bullet points and simplify further
    const sentences = simplerExplanation.split(/[.!?]+/).filter(s => s.trim());
    return sentences.map(s => `• ${s.trim()}`).join('\n');
  };

  return (
    <Card className="border-2 border-green-200 bg-green-50 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-green-600" />
            Simpler Explanation
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-green-700 hover:text-green-800 hover:bg-green-100"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Hide
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Show
              </>
            )}
          </Button>
        </div>
        <p className="text-sm text-green-700 mt-2">
          This version uses simple words and short sentences for easier understanding.
        </p>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-4">
          <div className="bg-white p-6 rounded-xl border border-green-200 shadow-sm">
            <p className="text-gray-900 leading-relaxed text-lg whitespace-pre-line">
              {showUltraSimple ? getUltraSimple() : simplerExplanation}
            </p>
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={() => setShowUltraSimple(!showUltraSimple)}
              variant="outline"
              size="sm"
              className="border-green-300 text-green-700 hover:bg-green-100 hover:text-green-800"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {showUltraSimple ? 'Show Regular Version' : 'Simplify Further'}
            </Button>
          </div>
          
          {showUltraSimple && (
            <p className="text-xs text-center text-green-600">
              Ultra-simple version with bullet points
            </p>
          )}
        </CardContent>
      )}
    </Card>
  );
}

// Made with Bob
