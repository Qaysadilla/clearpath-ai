import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertCircle } from 'lucide-react';
import { Deadline } from '@/lib/types';

interface DeadlinesSectionProps {
  deadlines: Deadline[];
}

export default function DeadlinesSection({ deadlines }: DeadlinesSectionProps) {
  const getImportanceBadge = (importance: Deadline['importance']) => {
    switch (importance) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'important':
        return <Badge className="bg-orange-500 hover:bg-orange-600">Important</Badge>;
      case 'normal':
        return <Badge variant="secondary">Normal</Badge>;
    }
  };

  const getDaysUntilColor = (daysUntil: number) => {
    if (daysUntil < 0) return 'text-red-600';
    if (daysUntil <= 7) return 'text-orange-600';
    if (daysUntil <= 14) return 'text-yellow-600';
    return 'text-green-600';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-600" />
          Important Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deadlines.map((deadline, index) => (
            <div key={index} className="border-l-4 border-orange-500 pl-4 py-2">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{deadline.description}</p>
                  <p className="text-sm text-gray-600 mt-1">{formatDate(deadline.date)}</p>
                </div>
                {getImportanceBadge(deadline.importance)}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <AlertCircle className={`w-4 h-4 ${getDaysUntilColor(deadline.daysUntil)}`} />
                <span className={`text-sm font-medium ${getDaysUntilColor(deadline.daysUntil)}`}>
                  {deadline.daysUntil < 0 
                    ? `${Math.abs(deadline.daysUntil)} days overdue`
                    : deadline.daysUntil === 0
                    ? 'Due today!'
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
