import { Sparkles, Shield, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/10 py-16 md:py-24 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232D3A31' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
            Turn Confusing Documents into Clear Next Steps
          </h1>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Your AI-powered life-admin command center for students, newcomers, immigrants, workers, and families.
          </p>

          {/* Trust Elements */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span>Powered by IBM watsonx.ai</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-accent" />
              </div>
              <span>Private & Secure</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-8 h-8 rounded-lg bg-secondary/30 flex items-center justify-center">
                <Clock className="w-4 h-4 text-foreground" />
              </div>
              <span>Results in Seconds</span>
            </div>
          </div>

          {/* Value Props */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-3">📄</div>
              <h3 className="text-base font-serif font-semibold text-foreground mb-2">Understand</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Get plain-language summaries and simpler explanations of complex documents
              </p>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-3">✅</div>
              <h3 className="text-base font-serif font-semibold text-foreground mb-2">Organize</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Track deadlines, save analyses, and manage tasks in one place
              </p>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="text-base font-serif font-semibold text-foreground mb-2">Respond</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Get draft replies and action checklists to respond with confidence
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Made with Bob
