'use client';

import { FileText, Upload, Camera } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type InputMethod = 'paste' | 'upload' | 'scan';

interface InputMethodTabsProps {
  activeMethod: InputMethod;
  onMethodChange: (method: InputMethod) => void;
}

const methods = [
  {
    id: 'paste' as InputMethod,
    icon: FileText,
    label: 'Paste Text',
    available: true,
  },
  {
    id: 'upload' as InputMethod,
    icon: Upload,
    label: 'Upload PDF',
    available: false,
  },
  {
    id: 'scan' as InputMethod,
    icon: Camera,
    label: 'Scan Image',
    available: false,
  },
];

export default function InputMethodTabs({ activeMethod, onMethodChange }: InputMethodTabsProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
          Step 3: How would you like to provide your document?
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {methods.map((method) => {
          const Icon = method.icon;
          const isActive = activeMethod === method.id;

          return (
            <button
              key={method.id}
              onClick={() => method.available && onMethodChange(method.id)}
              disabled={!method.available}
              className={`
                relative px-6 py-3 rounded-xl border-2 transition-all duration-200
                flex items-center gap-2
                ${isActive
                  ? 'border-primary bg-primary/5 shadow-soft-md'
                  : method.available
                    ? 'border-border bg-card hover:border-primary/30 hover:shadow-soft'
                    : 'border-border bg-muted cursor-not-allowed opacity-60'
                }
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : method.available ? 'text-foreground' : 'text-muted-foreground'}`} />
              <span className={`font-semibold text-sm ${isActive ? 'text-foreground' : method.available ? 'text-foreground' : 'text-muted-foreground'}`}>
                {method.label}
              </span>
              {!method.available && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  Coming Soon
                </Badge>
              )}
              {isActive && (
                <div className="absolute -top-1 -right-1">
                  <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {activeMethod === 'paste' && (
        <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg border border-border">
          <p>Copy and paste the text from your document below. You can also try one of our sample documents.</p>
        </div>
      )}
    </div>
  );
}

// Made with Bob
