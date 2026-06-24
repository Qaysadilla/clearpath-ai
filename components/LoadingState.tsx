import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function LoadingState() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">
                Analyzing Your Document...
              </h3>
              <p className="text-sm text-gray-600">
                This will take just a few seconds. We're extracting key information, 
                identifying deadlines, and preparing your personalized action plan.
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Made with Bob
