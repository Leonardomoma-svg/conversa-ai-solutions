import { Linkedin, Sparkles, Rocket, Zap, GraduationCap, Target, Lightbulb } from 'lucide-react';

const pillars = [
  {
    icon: Sparkles,
    title: "Soluciones Personalizadas",
    description: "Cada negocio es único. Creamos soluciones a la medida de tus necesidades específicas."
  },
  {
    icon: Rocket,
    title: "Velocidad de Implementación",
    description: "Del concepto a la realidad en semanas, no meses. Resultados rápidos sin comprometer calidad."
  },
  {
    icon: Zap,
    title: "Tecnología de Punta",
    description: "Utilizamos las herramientas de IA más avanzadas para darte ventaja competitiva."
  }
];

const Team = () => {
  return (
    <section id="nosotros" className="section-padding section-alt relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Nosotros
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            El Cerebro Detrás de{' '}
            <span className="gradient-text">Conversa Lab</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Founder Card - Trading Card Style */}
          <div className="relative group">
            {/* Card glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
            
            <div className="relative glass rounded-3xl p-8 overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 gradient-hero" />
              </div>

              <div className="relative">
                {/* Avatar placeholder */}
                <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-2 border-primary/20">
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <span className="text-4xl font-display font-bold text-white">LM</span>
                  </div>
                </div>

                {/* Name & Title */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-1">
                    Leonardo Moreno Martínez
                  </h3>
                  <p className="text-secondary font-medium">Founder & CEO</p>
                </div>

                {/* Stats row */}
                <div className="flex justify-center gap-6 mb-6">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-bold text-foreground">20 años</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-secondary/10 flex items-center justify-center mb-2">
                      <GraduationCap className="w-5 h-5 text-secondary" />
                    </div>
                    <span className="text-sm font-bold text-foreground">Finanzas</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-accent/10 flex items-center justify-center mb-2">
                      <Lightbulb className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-sm font-bold text-foreground">Visión Tech</span>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative p-6 rounded-2xl bg-muted/50 mb-6">
                  <p className="text-center text-foreground/80 italic leading-relaxed">
                    "Mi misión es ayudar a negocios a recuperar tiempo valioso y enfocarse en lo que realmente importa"
                  </p>
                </div>

                {/* LinkedIn button */}
                <a
                  href="https://linkedin.com/in/leonardomoreno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#0077B5] text-white font-medium hover:bg-[#006297] transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  Conectar en LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Why Conversa Lab - Pillars */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                ¿Por Qué Conversa Lab?
              </h3>
              <p className="text-lg text-muted-foreground">
                Combinamos pasión por la tecnología con una profunda comprensión de los negocios para entregar soluciones que realmente marcan la diferencia.
              </p>
            </div>

            <div className="space-y-4">
              {pillars.map((pillar, index) => (
                <div
                  key={index}
                  className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all card-hover"
                >
                  <div className="flex gap-5">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <pillar.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-display font-bold text-foreground mb-2">
                        {pillar.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
