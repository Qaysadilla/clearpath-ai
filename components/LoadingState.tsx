import { Loader2 } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-soft-lg">
        <div className="py-16 px-8">
          <div className="flex flex-col items-center justify-center gap-5">
            <Loader2 className="w-10 h-10 animate-spin text-primary" aria-hidden="true" />
            <div className="text-center space-y-2">
              <h3 className="text-xl font-serif font-semibold text-foreground">
                Analyzing your document…
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                Extracting key information, identifying deadlines, and preparing your action plan.
              </p>
            </div>
            <div className="flex gap-1.5 mt-1" role="status" aria-label="Loading">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
