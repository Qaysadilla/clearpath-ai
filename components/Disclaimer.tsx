import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function Disclaimer() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Alert className="max-w-4xl mx-auto bg-blue-50 border-blue-200 text-blue-900">
        <Info className="h-5 w-5 text-blue-600" />
        <AlertDescription className="ml-2 text-sm leading-relaxed">
          <strong className="font-semibold">Important Notice:</strong> ClearPath AI is a document analysis tool designed to help you understand complex documents. 
          This tool does not provide legal, immigration, financial, or medical advice. 
          Always consult qualified professionals (lawyers, accountants, doctors, immigration consultants) for specific guidance on your situation. 
          All sample documents shown are fictional and for demonstration purposes only.
        </AlertDescription>
      </Alert>
    </div>
  );
}

// Made with Bob
