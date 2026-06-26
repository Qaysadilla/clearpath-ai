'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Copy, Check } from 'lucide-react';
import { DraftEmail } from '@/lib/types';

interface DraftReplySectionProps {
  draftReply: DraftEmail;
}

export default function DraftReplySection({ draftReply }: DraftReplySectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const fullEmail = `Subject: ${draftReply.subject}\n\n${draftReply.body}`;
    await navigator.clipboard.writeText(fullEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
          Draft Reply
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1 section-label">Subject</p>
          <p className="font-semibold text-foreground">{draftReply.subject}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2 section-label">Message</p>
          <div className="bg-muted/40 p-4 rounded-lg border border-border">
            <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-relaxed">
              {draftReply.body}
            </pre>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">
            Tone: <span className="capitalize font-medium">{draftReply.tone}</span>
          </p>
          <Button onClick={handleCopy} variant="outline" size="sm">
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </>
            )}
          </Button>
        </div>

        <div className="bg-muted/60 p-3 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">Tip:</strong> Review and personalize this draft before sending.
            Add specific details about your situation and adjust the tone as needed.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Made with Bob
