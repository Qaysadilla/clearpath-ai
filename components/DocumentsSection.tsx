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
          <FileText className="w-5 h-5 text-purple-600" />
          Documents Needed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {documentsNeeded.map((doc, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">📄</span>
              <span className="text-gray-700">{doc}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

// Made with Bob
