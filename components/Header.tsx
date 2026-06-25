'use client';

import LanguageSelector from '@/components/LanguageSelector';
import { Language } from '@/lib/types';
import Navigation from './Navigation';
import IBMBadge from './IBMBadge';

type View = 'analyze' | 'dashboard';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  currentView: View;
  onViewChange: (view: View) => void;
}

export default function Header({ currentLanguage, onLanguageChange, currentView, onViewChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[60px]">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col">
              <span className="text-lg font-serif font-bold text-foreground leading-none tracking-tight">
                ClearPath AI
              </span>
              <span className="text-[10px] text-muted-foreground leading-none mt-0.5 tracking-widest uppercase hidden sm:block">
                Document command center
              </span>
            </div>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:block">
            <Navigation currentView={currentView} onViewChange={onViewChange} />
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2.5">
            <div className="hidden lg:block">
              <IBMBadge />
            </div>
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-2.5">
          <Navigation currentView={currentView} onViewChange={onViewChange} />
        </div>
      </div>
    </header>
  );
}

// Made with Bob
