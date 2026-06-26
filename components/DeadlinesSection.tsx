import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, AlertCircle } from 'lucide-react';
import { Deadline } from '@/lib/types';

interface DeadlinesSectionProps {
  deadlines: Deadline[];
}

function getDaysUntilColor(daysUntil: number) {
  if (daysUntil < 0) return 'text-destructive';
  if (daysUntil <= 7) return 'text-orange-600';
  if (daysUntil <= 14) return 'text-accent';
  return 'text-primary';
}

function formatDate(dateString: string) {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function DeadlinesSection({ deadlines }: DeadlinesSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-primary" aria-hidden="true" />
          Important Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deadlines.map((deadline, index) => (
            <div key={index} className="border-l-4 border-primary/40 pl-4 py-1.5">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex-1">
                  <p className="font-medium text-foreground leading-snug">{deadline.description}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{formatDate(deadline.date)}</p>
                </div>
                <div className="flex-shrink-0">
                  {deadline.importance === 'critical' && (
                    <Badge variant="destructive">Critical</Badge>
                  )}
                  {deadline.importance === 'important' && (
                    <Badge className="bg-orange-500 hover:bg-orange-600 text-white">Important</Badge>
                  )}
                  {deadline.importance === 'normal' && (
                    <Badge variant="secondary">Normal</Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <AlertCircle className={`w-3.5 h-3.5 ${getDaysUntilColor(deadline.daysUntil)}`} aria-hidden="true" />
                <span className={`text-xs font-medium ${getDaysUntilColor(deadline.daysUntil)}`}>
                  {deadline.daysUntil < 0
                    ? `${Math.abs(deadline.daysUntil)} days overdue`
                    : deadline.daysUntil === 0
                    ? 'Due today'
                    : deadline.daysUntil === 1
                    ? '1 day remaining'
                    : `${deadline.daysUntil} days remaining`
                  }
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Made with Bob
