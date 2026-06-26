import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface SummarySectionProps {
  summary: string;
}

export default function SummarySection({ summary }: SummarySectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" aria-hidden="true" />
          Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground leading-relaxed">{summary}</p>
      </CardContent>
    </Card>
  );
}

// Made with Bob
