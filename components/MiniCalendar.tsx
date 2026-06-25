'use client';

import { Deadline } from '@/lib/types';
import { Calendar, AlertCircle, Clock } from 'lucide-react';

interface MiniCalendarProps {
  deadlines: Deadline[];
}

function getImportanceConfig(importance: Deadline['importance']) {
  switch (importance) {
    case 'critical':
      return {
        label: 'Critical',
        border: 'border-l-red-500',
        badge: 'bg-red-100 text-red-700 border-red-200',
        dot: 'bg-red-500',
        icon: AlertCircle,
        iconColor: 'text-red-500',
      };
    case 'important':
      return {
        label: 'Important',
        border: 'border-l-orange-400',
        badge: 'bg-orange-100 text-orange-700 border-orange-200',
        dot: 'bg-orange-400',
        icon: Clock,
        iconColor: 'text-orange-500',
      };
    default:
      return {
        label: 'Normal',
        border: 'border-l-blue-400',
        badge: 'bg-blue-100 text-blue-700 border-blue-200',
        dot: 'bg-blue-400',
        icon: Calendar,
        iconColor: 'text-blue-500',
      };
  }
}

function formatDeadlineDate(dateString: string) {
  const date = new Date(dateString);
  return {
    month: date.toLocaleDateString('en-CA', { month: 'short' }).toUpperCase(),
    day: date.toLocaleDateString('en-CA', { day: 'numeric' }),
    year: date.toLocaleDateString('en-CA', { year: 'numeric' }),
    full: date.toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
  };
}

function getDaysLabel(daysUntil: number): { text: string; urgent: boolean } {
  if (daysUntil < 0) return { text: 'Overdue', urgent: true };
  if (daysUntil === 0) return { text: 'Today', urgent: true };
  if (daysUntil === 1) return { text: 'Tomorrow', urgent: true };
  if (daysUntil <= 7) return { text: `${daysUntil} days away`, urgent: true };
  return { text: `${daysUntil} days away`, urgent: false };
}

export default function MiniCalendar({ deadlines }: MiniCalendarProps) {
  if (deadlines.length === 0) {
    return (
      <div className="bg-card rounded-2xl border border-border p-8 shadow-soft text-center">
        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-3">
          <Calendar className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="font-serif font-semibold text-foreground mb-1">No upcoming deadlines</h3>
        <p className="text-xs text-muted-foreground">Save an analysis to see deadlines here</p>
      </div>
    );
  }

  // Sort by soonest first, show all
  const sorted = [...deadlines].sort((a, b) => a.daysUntil - b.daysUntil);

  return (
    <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="font-serif font-semibold text-foreground">Upcoming Deadlines</h3>
          <span className="ml-auto text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
            {sorted.length}
          </span>
        </div>
      </div>

      {/* Deadline List */}
      <div className="divide-y divide-border">
        {sorted.map((deadline, index) => {
          const config = getImportanceConfig(deadline.importance);
          const dateFormatted = formatDeadlineDate(deadline.date);
          const daysLabel = getDaysLabel(deadline.daysUntil);
          const Icon = config.icon;

          return (
            <div
              key={index}
              className={`flex items-start gap-4 px-6 py-4 border-l-4 ${config.border} hover:bg-muted/20 transition-colors duration-150`}
            >
              {/* Date Block */}
              <div className="flex-shrink-0 w-12 text-center">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {dateFormatted.month}
                </div>
                <div className="text-2xl font-serif font-bold text-foreground leading-none">
                  {dateFormatted.day}
                </div>
                <div className="text-xs text-muted-foreground">
                  {dateFormatted.year}
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-12 bg-border flex-shrink-0 self-center" />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground leading-snug mb-1">
                  {deadline.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${config.badge}`}>
                    <Icon className={`w-3 h-3 ${config.iconColor}`} />
                    {config.label}
                  </span>
                  <span className={`text-xs font-medium ${daysLabel.urgent ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {daysLabel.text}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Made with Bob
