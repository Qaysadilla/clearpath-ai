'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, ChevronDown, ChevronUp } from 'lucide-react';

interface SimplerExplanationProps {
  simplerExplanation: string;
}

export default function SimplerExplanation({ simplerExplanation }: SimplerExplanationProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="border-2 border-green-200 bg-green-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-green-600" />
            Simpler Explanation (ESL-Friendly)
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
        <CardContent>
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <p className="text-gray-900 leading-relaxed text-lg">
              {simplerExplanation}
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

// Made with Bob
