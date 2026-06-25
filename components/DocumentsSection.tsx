import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface DocumentsSectionProps {
  documentsNeeded: string[];
}

export default function DocumentsSection({ documentsNeeded }: DocumentsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" aria-hidden="true" />
          Documents Needed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {documentsNeeded.map((doc, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <FileText className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span className="text-sm text-foreground leading-relaxed">{doc}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

// Made with Bob
