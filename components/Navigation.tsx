'use client';

import { FileSearch, LayoutDashboard } from 'lucide-react';

type View = 'analyze' | 'dashboard';

interface NavigationProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export default function Navigation({ currentView, onViewChange }: NavigationProps) {
  return (
    <nav className="flex items-center gap-1 bg-muted/60 p-1 rounded-full border border-border/60">
      <button
        onClick={() => onViewChange('analyze')}
        className={`
          flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150
          ${currentView === 'analyze'
            ? 'bg-card text-foreground shadow-soft border border-border/40'
            : 'text-muted-foreground hover:text-foreground'
          }
        `}
      >
        <FileSearch className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Analyze</span>
      </button>

      <button
        onClick={() => onViewChange('dashboard')}
        className={`
          flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150
          ${currentView === 'dashboard'
            ? 'bg-card text-foreground shadow-soft border border-border/40'
            : 'text-muted-foreground hover:text-foreground'
          }
        `}
      >
        <LayoutDashboard className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Dashboard</span>
      </button>
    </nav>
  );
}

// Made with Bob
