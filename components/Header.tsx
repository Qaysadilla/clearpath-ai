'use client';

import { Compass } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { Language } from '@/lib/types';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export default function Header({ currentLanguage, onLanguageChange }: HeaderProps) {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground shadow-md">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ClearPath AI</h1>
              <p className="text-sm text-gray-600">Turn confusion into clarity</p>
            </div>
          </div>
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />
        </div>
      </div>
    </header>
  );
}

// Made with Bob
