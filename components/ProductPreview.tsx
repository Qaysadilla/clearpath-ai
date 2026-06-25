import { CalendarDays, CheckCircle2, AlertCircle, FileText, Sparkles, Save } from 'lucide-react';

const previewDeadlines = [
  {
    date: 'Aug 12',
    daysLeft: 8,
    description: 'Submit consent form and student ID photo',
    importance: 'critical' as const,
  },
  {
    date: 'Aug 20',
    daysLeft: 16,
    description: 'Confirm workshop attendance with coordinator',
    importance: 'important' as const,
  },
];

const previewTasks = [
  { text: 'Download and complete consent form', done: true },
  { text: 'Prepare student ID photo (passport size)', done: false },
  { text: 'Email completed form to registration office', done: false },
];

const importanceStyles = {
  critical: 'text-destructive bg-destructive/8 border-destructive/20',
  important: 'text-orange-600 bg-orange-50 border-orange-200',
  normal: 'text-muted-foreground bg-muted border-border',
};

export default function ProductPreview() {
  return (
    <section className="bg-muted/40 border-y border-border py-14 md:py-16">
      <div className="container mx-auto px-4">
        {/* Section label */}
        <div className="text-center mb-8">
          <p className="section-label text-primary mb-2">See what ClearPath produces</p>
          <p className="text-sm text-muted-foreground">
            A sample analysis result — not a real AI call
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-2xl shadow-soft-lg overflow-hidden">
            {/* Card header */}
            <div className="px-6 pt-6 pb-4 border-b border-border">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4.5 h-4.5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="section-label mb-0.5">Workshop Registration</p>
                    <h3 className="text-base font-serif font-semibold text-foreground truncate">
                      Registration incomplete — action required
                    </h3>
                  </div>
                </div>
                {/* Risk badge */}
                <div className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-semibold text-orange-600">
                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  Medium Risk
                </div>
              </div>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Summary */}
              <div>
                <p className="section-label mb-2">Summary</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your workshop registration is incomplete. You must submit a signed consent form and a student ID photo before Aug 12 to secure your spot. Missing this deadline may result in your place being given to another student.
                </p>
              </div>

              {/* Deadlines */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CalendarDays className="w-4 h-4 text-primary" aria-hidden="true" />
                  <p className="section-label mb-0">Deadlines</p>
                </div>
                <div className="space-y-2">
                  {previewDeadlines.map((d) => (
                    <div
                      key={d.date}
                      className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg border text-sm ${importanceStyles[d.importance]}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-semibold flex-shrink-0">{d.date}</span>
                        <span className="text-foreground/80 truncate">{d.description}</span>
                      </div>
                      <span className="flex-shrink-0 font-medium">{d.daysLeft}d</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Task list */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-primary" aria-hidden="true" />
                  <p className="section-label mb-0">Your checklist</p>
                </div>
                <div className="space-y-1.5">
                  {previewTasks.map((task) => (
                    <div key={task.text} className="flex items-center gap-2.5 text-sm py-1">
                      <div
                        className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border ${
                          task.done
                            ? 'bg-primary border-primary'
                            : 'bg-card border-border'
                        }`}
                        aria-hidden="true"
                      >
                        {task.done && (
                          <svg className="w-2.5 h-2.5 text-primary-foreground" viewBox="0 0 10 8" fill="currentColor">
                            <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span className={task.done ? 'line-through text-muted-foreground' : 'text-foreground'}>
                        {task.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card footer */}
            <div className="px-6 py-4 bg-muted/40 border-t border-border flex items-center justify-between gap-4 flex-wrap">
              {/* IBM badge */}
              <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Sparkles className="w-3 h-3 text-primary" aria-hidden="true" />
                <span>Analyzed with <span className="font-semibold text-foreground">IBM watsonx.ai</span></span>
              </div>
              {/* Greyed-out save button */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium text-muted-foreground cursor-default select-none opacity-60"
                aria-hidden="true"
              >
                <Save className="w-3.5 h-3.5" />
                Save this plan
              </div>
            </div>
          </div>

          {/* Below-card note */}
          <p className="text-center text-xs text-muted-foreground mt-4">
            This is a static preview. Analyze your own document below to get a real result.
          </p>
        </div>
      </div>
    </section>
  );
}

// Made with Bob
