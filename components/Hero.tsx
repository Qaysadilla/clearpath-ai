import { Sparkles, ShieldCheck, LayoutDashboard, FileText, FolderCheck, MessageSquareText } from 'lucide-react';

const trustLabels = [
  { icon: Sparkles, text: 'Powered by IBM watsonx.ai' },
  { icon: LayoutDashboard, text: 'Saved locally in your browser' },
  { icon: ShieldCheck, text: 'Built for students and newcomers' },
];

const processSteps = [
  {
    number: '01',
    icon: FileText,
    label: 'Understand',
    copy: 'ClearPath explains the document in plain language and highlights exactly what matters — deadlines, risks, and requirements.',
  },
  {
    number: '02',
    icon: FolderCheck,
    label: 'Organize',
    copy: 'It extracts deadlines, tasks, documents needed, and risk level into a saved action plan you can revisit any time.',
  },
  {
    number: '03',
    icon: MessageSquareText,
    label: 'Respond',
    copy: 'It drafts a clear reply and gives you a step-by-step checklist so you can move forward with confidence.',
  },
];

export default function Hero() {
  return (
    <section className="relative bg-background py-10 md:py-14 overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232D3A31' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Audience label */}
        <div className="max-w-3xl mx-auto text-center mb-6">
          <p className="section-label text-primary tracking-widest">
            For students · newcomers · workers · families
          </p>
        </div>

        {/* Main headline */}
        <div className="max-w-3xl mx-auto text-center mb-5">
          <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-bold text-foreground leading-[1.18] tracking-tight">
            Understand the document.<br className="hidden sm:block" />
            Know the deadline.<br className="hidden sm:block" />
            Take the next step.
          </h1>
        </div>

        {/* Subheading */}
        <div className="max-w-2xl mx-auto text-center mb-9">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            ClearPath AI turns confusing school, housing, work, government, and appointment documents into plain-language summaries, deadlines, tasks, and draft replies.
          </p>
        </div>

        {/* Trust labels */}
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 mb-10">
          {trustLabels.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="w-3.5 h-3.5 text-primary flex-shrink-0" aria-hidden="true" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Thin rule divider */}
        <div className="rule-line max-w-5xl mx-auto mb-10" />

        {/* Process steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden shadow-soft divide-y divide-border md:divide-y-0">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="group bg-card hover:bg-primary/[0.03] transition-colors duration-200 p-6 flex flex-col gap-3"
                >
                  {/* Step number + icon row */}
                  <div className="flex items-center gap-3">
                    <span className="section-label text-primary">{step.number}</span>
                    {i < 2 && (
                      <div className="hidden md:block flex-1 border-t border-dashed border-border/60" />
                    )}
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-200">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>

                  {/* Label + copy */}
                  <div>
                    <h3 className="text-base font-serif font-semibold text-foreground mb-1.5">
                      {step.label}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.copy}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Made with Bob
