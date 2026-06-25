'use client';

import { FileSearch, LayoutDashboard } from 'lucide-react';

type View = 'analyze' | 'dashboard';

interface NavigationProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export default function Navigation({ currentView, onViewChange }: NavigationProps) {
  return (
    <nav className="flex items-center gap-2 bg-muted/50 p-1 rounded-xl border border-border">
      <button
        onClick={() => onViewChange('analyze')}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
          ${currentView === 'analyze'
            ? 'bg-card text-foreground shadow-soft'
            : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
          }
        `}
      >
        <FileSearch className="w-4 h-4" />
        <span>Analyze</span>
      </button>

      <button
        onClick={() => onViewChange('dashboard')}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
          ${currentView === 'dashboard'
            ? 'bg-card text-foreground shadow-soft'
            : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
          }
        `}
      >
        <LayoutDashboard className="w-4 h-4" />
        <span>Dashboard</span>
      </button>
    </nav>
  );
}

// Made with Bob
