'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Languages, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface SimplerExplanationProps {
  simplerExplanation: string;
  ultraSimpleExplanation?: string;
}

export default function SimplerExplanation({ simplerExplanation, ultraSimpleExplanation }: SimplerExplanationProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showUltraSimple, setShowUltraSimple] = useState(false);

  const getUltraSimple = () => {
    if (ultraSimpleExplanation) return ultraSimpleExplanation;
    const sentences = simplerExplanation.split(/[.!?]+/).filter(s => s.trim());
    return sentences.map(s => `• ${s.trim()}`).join('\n');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-primary" aria-hidden="true" />
            Simpler Explanation
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" aria-hidden="true" />
                Hide
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" aria-hidden="true" />
                Show
              </>
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">
          Uses simple words and short sentences for easier understanding.
        </p>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-4">
          <div className="bg-muted/40 p-5 rounded-xl border border-border">
            <p className="text-foreground leading-relaxed whitespace-pre-line">
              {showUltraSimple ? getUltraSimple() : simplerExplanation}
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => setShowUltraSimple(!showUltraSimple)}
              variant="outline"
              size="sm"
              className="hover:bg-primary/5 hover:border-primary/40"
            >
              <Sparkles className="w-3.5 h-3.5 mr-2" aria-hidden="true" />
              {showUltraSimple ? 'Show regular version' : 'Simplify further'}
            </Button>
          </div>

          {showUltraSimple && (
            <p className="text-xs text-center text-muted-foreground">
              Ultra-simplified bullet-point version
            </p>
          )}
        </CardContent>
      )}
    </Card>
  );
}

// Made with Bob
