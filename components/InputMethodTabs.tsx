'use client';

import { FileText, Upload, ScanLine } from 'lucide-react';

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
    badge: null,
  },
  {
    id: 'upload' as InputMethod,
    icon: Upload,
    label: 'Upload PDF',
    badge: 'Coming soon',
  },
  {
    id: 'scan' as InputMethod,
    icon: ScanLine,
    label: 'Scan Image',
    badge: 'OCR — planned next',
  },
];

export default function InputMethodTabs({ activeMethod, onMethodChange }: InputMethodTabsProps) {
  return (
    <div className="space-y-3">
      <div>
        <p className="section-label text-primary mb-1">Step 3</p>
        <h3 className="text-lg font-serif font-semibold text-foreground">
          How would you like to provide your document?
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {methods.map((method) => {
          const Icon = method.icon;
          const isActive = activeMethod === method.id;
          const isAvailable = method.badge === null;

          return (
            <button
              key={method.id}
              onClick={() => isAvailable && onMethodChange(method.id)}
              disabled={!isAvailable}
              aria-pressed={isAvailable ? isActive : undefined}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
                ${isActive
                  ? 'border-primary bg-primary/5 text-foreground shadow-soft'
                  : isAvailable
                    ? 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-muted/30'
                    : 'border-border bg-muted text-muted-foreground cursor-not-allowed opacity-70'
                }
              `}
            >
              <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              <span>{method.label}</span>
              {method.badge && (
                <span className="text-[10px] font-normal tracking-wide text-muted-foreground/80 bg-muted px-1.5 py-0.5 rounded-md border border-border/60">
                  {method.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {activeMethod === 'paste' && (
        <p className="text-xs text-muted-foreground leading-relaxed">
          Copy and paste the text from your document below, or try one of the sample documents.
        </p>
      )}

      {activeMethod !== 'paste' && (
        <p className="text-xs text-muted-foreground leading-relaxed">
          Image scanning and OCR are planned for a future release. Use Paste Text for now.
        </p>
      )}
    </div>
  );
}

// Made with Bob
