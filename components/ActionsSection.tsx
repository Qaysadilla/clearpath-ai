import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckSquare } from 'lucide-react';
import { Action } from '@/lib/types';

interface ActionsSectionProps {
  actions: Action[];
}

export default function ActionsSection({ actions }: ActionsSectionProps) {
  const getPriorityBadge = (priority: Action['priority']) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-orange-500 hover:bg-orange-600 text-white">Medium Priority</Badge>;
      case 'low':
        return <Badge variant="secondary">Low Priority</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-primary" aria-hidden="true" />
          Required Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-4">
          {actions.map((action, index) => (
            <li key={index} className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold" aria-hidden="true">
                {index + 1}
              </div>
              <div className="flex-1 space-y-1.5">
                <p className="text-foreground font-medium text-sm leading-snug">{action.action}</p>
                <div className="flex flex-wrap gap-1.5">
                  {getPriorityBadge(action.priority)}
                  {action.deadline && (
                    <Badge variant="outline" className="text-xs">
                      {action.deadline}
                    </Badge>
                  )}
                  {action.estimatedTime && (
                    <Badge variant="outline" className="text-xs">
                      {action.estimatedTime}
                    </Badge>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

// Made with Bob
