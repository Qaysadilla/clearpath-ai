import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export default function Disclaimer() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Alert variant="destructive" className="max-w-4xl mx-auto">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="ml-2">
          <strong>Important Disclaimer:</strong> ClearPath AI does not provide legal, immigration, financial, or medical advice. 
          This tool helps you understand documents and organize next steps. Always consult qualified professionals 
          (lawyers, accountants, doctors, immigration consultants) for specific guidance on your situation.
        </AlertDescription>
      </Alert>
    </div>
  );
}

// Made with Bob
