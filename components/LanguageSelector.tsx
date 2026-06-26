'use client';

import { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { Language } from '@/lib/types';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const languages = [
  { code: 'en' as Language, name: 'English',  nativeName: 'English'  },
  { code: 'ar' as Language, name: 'Arabic',   nativeName: 'العربية'  },
  { code: 'fr' as Language, name: 'French',   nativeName: 'Français' },
  { code: 'es' as Language, name: 'Spanish',  nativeName: 'Español'  },
];

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Language: ${currentLang?.name}. Change language`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-muted/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        <Globe className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
        <span className="text-sm font-medium text-foreground">{currentLang?.nativeName}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            className="absolute right-0 mt-1.5 w-44 bg-card rounded-xl shadow-soft-lg border border-border py-1.5 z-20"
            role="listbox"
            aria-label="Select language"
          >
            {languages.map((language) => (
              <button
                key={language.code}
                role="option"
                aria-selected={currentLanguage === language.code}
                onClick={() => {
                  onLanguageChange(language.code);
                  setIsOpen(false);
                }}
                className="w-full px-3.5 py-2 text-left hover:bg-muted/50 flex items-center justify-between transition-colors focus-visible:outline-none focus-visible:bg-muted/50"
              >
                <div>
                  <div className="text-sm font-medium text-foreground">{language.nativeName}</div>
                  <div className="text-xs text-muted-foreground">{language.name}</div>
                </div>
                {currentLanguage === language.code && (
                  <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" aria-hidden="true" />
                )}
              </button>
            ))}
            <div className="border-t border-border mt-1 pt-1.5 px-3.5 pb-1">
              <p className="text-xs text-muted-foreground">Full translation coming soon</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Made with Bob
