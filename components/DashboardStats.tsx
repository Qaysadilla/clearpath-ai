'use client';

import { FileText, CheckSquare, Calendar, AlertTriangle } from 'lucide-react';
import { DashboardStats as Stats } from '@/lib/storage';

interface DashboardStatsProps {
  stats: Stats;
}

const statCards = (stats: Stats) => [
  {
    label: 'Saved Documents',
    value: stats.totalSaved,
    icon: FileText,
    color: 'text-primary',
    bg: 'bg-primary/10',
    description: 'Analyses saved to your library',
  },
  {
    label: 'Open Tasks',
    value: stats.openTasks,
    icon: CheckSquare,
    color: 'text-accent',
    bg: 'bg-accent/10',
    description: 'Checklist items still to complete',
  },
  {
    label: 'Upcoming Deadlines',
    value: stats.upcomingDeadlines,
    icon: Calendar,
    color: 'text-primary',
    bg: 'bg-primary/10',
    description: 'Due in the next 7 days',
  },
  {
    label: 'High Risk Items',
    value: stats.highRiskItems,
    icon: AlertTriangle,
    color: 'text-destructive',
    bg: 'bg-destructive/10',
    description: 'Documents needing urgent attention',
  },
];

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const cards = statCards(stats);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="bg-card rounded-2xl border border-border p-5 shadow-soft hover:shadow-soft-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center`}>
                <Icon className={`w-4.5 h-4.5 ${card.color}`} aria-hidden="true" />
              </div>
              <span className={`text-2xl font-serif font-bold ${card.value > 0 ? card.color : 'text-muted-foreground'}`}>
                {card.value}
              </span>
            </div>
            <div className="font-semibold text-sm text-foreground">{card.label}</div>
            <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{card.description}</div>
          </div>
        );
      })}
    </div>
  );
}

// Made with Bob
