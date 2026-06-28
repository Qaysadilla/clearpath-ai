'use client';

import { useState } from 'react';
import { Loader2, Languages, AlertCircle } from 'lucide-react';
import { AnalysisResult, Language, TranslateResponse } from '@/lib/types';

interface TranslationPanelProps {
  originalResult: AnalysisResult;
  onTranslated: (result: AnalysisResult) => void;
  onLanguageChange: (lang: Language) => void;
}

const LANGUAGES: { code: Language; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English',  nativeLabel: 'English'  },
  { code: 'fr', label: 'French',   nativeLabel: 'Français' },
  { code: 'es', label: 'Spanish',  nativeLabel: 'Español'  },
  { code: 'ar', label: 'Arabic',   nativeLabel: 'العربية'  },
];

export default function TranslationPanel({
  originalResult,
  onTranslated,
  onLanguageChange,
}: TranslationPanelProps) {
  const [activeLanguage, setActiveLanguage] = useState<Language>('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLanguageSelect(lang: Language) {
    if (lang === activeLanguage) return;

    setError(null);

    // English: reset immediately, no API call
    if (lang === 'en') {
      setActiveLanguage('en');
      onLanguageChange('en');
      onTranslated(originalResult);
      return;
    }

    setIsTranslating(true);
    setActiveLanguage(lang);
    onLanguageChange(lang);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analysisResult: originalResult,
          targetLanguage: lang,
        }),
      });

      const data: TranslateResponse = await response.json();

      if (data.success) {
        onTranslated(data.translatedResult);
      } else {
        // Graceful fallback: keep showing original
        onTranslated(originalResult);
        setError(data.error ?? 'Translation unavailable. Showing original English result.');
      }
    } catch {
      // Network or parse error — keep original
      onTranslated(originalResult);
      setError('Translation unavailable. Showing original English result.');
    } finally {
      setIsTranslating(false);
    }
  }

  const showDisclaimer = activeLanguage !== 'en';

  return (
    <div className="mb-8">
      {/* Language selector row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Languages className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span className="font-medium">Translate</span>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Select translation language">
          {LANGUAGES.map((lang) => {
            const isActive = activeLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                disabled={isTranslating}
                aria-pressed={isActive}
                aria-label={`Translate to ${lang.label}`}
                className={[
                  'px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/60 text-foreground hover:bg-muted border border-border',
                ].join(' ')}
              >
                {lang.nativeLabel}
              </button>
            );
          })}
        </div>

        {/* Inline spinner during translation */}
        {isTranslating && (
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground" role="status" aria-live="polite">
            <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
            Translating action plan…
          </span>
        )}
      </div>

      {/* Error message — calm, non-alarming */}
      {error && !isTranslating && (
        <div
          role="alert"
          className="flex items-start gap-2.5 mt-3 px-4 py-3 rounded-xl border border-border bg-muted/60 text-sm text-muted-foreground"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-muted-foreground" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      {/* Translation disclaimer — visible only when a non-English language is active */}
      {showDisclaimer && !isTranslating && !error && (
        <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
          AI translation may contain errors. Verify important documents with a qualified person.
        </p>
      )}
    </div>
  );
}

// Made with Bob
