'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListChecks } from 'lucide-react';
import { ChecklistItem } from '@/lib/types';

interface ChecklistSectionProps {
  checklist: ChecklistItem[];
}

export default function ChecklistSection({ checklist: initialChecklist }: ChecklistSectionProps) {
  const [checklist, setChecklist] = useState(initialChecklist);

  const toggleItem = (index: number) => {
    setChecklist(prev => prev.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = checklist.filter(item => item.completed).length;
  const totalCount = checklist.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-primary" aria-hidden="true" />
          Step-by-Step Checklist
        </CardTitle>
        <div className="mt-2">
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>Progress</span>
            <span>{completedCount} of {totalCount} completed</span>
          </div>
          <div className="w-full bg-border rounded-full h-1.5" role="progressbar" aria-valuenow={completedCount} aria-valuemin={0} aria-valuemax={totalCount}>
            <div
              className="bg-primary h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {checklist.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <input
                id={`checklist-item-${index}`}
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleItem(index)}
                className="mt-0.5 w-4 h-4 rounded border-border text-primary focus:ring-primary/50 cursor-pointer accent-primary"
              />
              <div className="flex-1">
                <label
                  htmlFor={`checklist-item-${index}`}
                  className={`text-sm cursor-pointer leading-snug ${
                    item.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                  }`}
                >
                  {item.step}
                </label>
                {item.notes && (
                  <p className="text-xs text-muted-foreground mt-0.5 italic">{item.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Made with Bob
