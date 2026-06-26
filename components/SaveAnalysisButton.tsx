'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save, Check } from 'lucide-react';

interface SaveAnalysisButtonProps {
  onSave: () => void;
  disabled?: boolean;
}

export default function SaveAnalysisButton({ onSave, disabled }: SaveAnalysisButtonProps) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Button
      onClick={handleSave}
      disabled={disabled || saved}
      variant={saved ? 'secondary' : 'default'}
      size="lg"
      className="shadow-soft-md hover:shadow-soft-lg"
    >
      {saved ? (
        <>
          <Check className="w-4 h-4 mr-2" aria-hidden="true" />
          Saved to Dashboard
        </>
      ) : (
        <>
          <Save className="w-4 h-4 mr-2" aria-hidden="true" />
          Save this plan
        </>
      )}
    </Button>
  );
}

// Made with Bob
