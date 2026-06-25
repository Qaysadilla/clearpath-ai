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
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-blue-600" />
          Step-by-Step Checklist
        </CardTitle>
        <div className="mt-2">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{completedCount} of {totalCount} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {checklist.map((item, index) => (
            <div key={index} className="flex items-start gap-3 group">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleItem(index)}
                className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <div className="flex-1">
                <label 
                  className={`cursor-pointer ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}
                  onClick={() => toggleItem(index)}
                >
                  {item.step}
                </label>
                {item.notes && (
                  <p className="text-xs text-muted-foreground mt-1 italic">{item.notes}</p>
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
