import { Sparkles } from 'lucide-react';

export default function IBMBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
      <Sparkles className="w-3.5 h-3.5 text-primary" />
      <span>Powered by <span className="font-semibold text-foreground">IBM watsonx.ai</span></span>
    </div>
  );
}

// Made with Bob