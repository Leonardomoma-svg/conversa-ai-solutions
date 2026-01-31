import { Check, ArrowRight, Sparkles, Crown, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Para negocios comenzando con IA',
    tagline: 'Desde soluciones simples',
    icon: Sparkles,
    features: [
      'Chatbot básico para tu sitio web',
      'Automatización de 1-2 procesos',
      'Integración con WhatsApp',
      'Soporte por email',
      'Reportes mensuales'
    ],
    cta: 'Solicitar Cotización',
    popular: false
  },
  {
    id: 'growth',
    name: 'Growth',
    description: 'Para negocios escalando operaciones',
    tagline: 'Soluciones integrales',
    icon: Crown,
    features: [
      'Chatbot avanzado con IA',
      'Automatización de múltiples procesos',
      'Integración CRM completa',
      'Análisis de datos con dashboards',
      'Soporte prioritario 24/7',
      'Capacitación del equipo'
    ],
    cta: 'Solicitar Cotización',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Para organizaciones con necesidades complejas',
    tagline: 'Todo personalizado',
    icon: Building2,
    features: [
      'Soluciones 100% personalizadas',
      'Integraciones empresariales',
      'Asistentes virtuales dedicados',
      'Análisis predictivo con IA',
      'Gerente de cuenta dedicado',
      'SLA garantizado',
      'Escalabilidad ilimitada'
    ],
    cta: 'Agendar Consultoría',
    popular: false
  }
];

const Pricing = () => {
  const handleCalendlyClick = () => {
    window.open('https://calendly.com/conversalab', '_blank');
  };

  return (
    <section id="precios" className="section-padding section-alt relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pattern-dots opacity-30" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
            Inversión
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Inversión Personalizada{' '}
            <span className="gradient-text">Para Tu Negocio</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Cada negocio es único. Por eso nuestras soluciones también lo son.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative group bg-card rounded-3xl border overflow-hidden transition-all duration-300 ${
                plan.popular
                  ? 'border-primary/30 shadow-lg scale-105 md:scale-110 z-10'
                  : 'border-border hover:border-primary/20'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 gradient-primary py-2 text-center">
                  <span className="text-white text-sm font-medium flex items-center justify-center gap-2">
                    <Crown className="w-4 h-4" />
                    Más Popular
                  </span>
                </div>
              )}

              <div className={`p-8 ${plan.popular ? 'pt-16' : ''}`}>
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  plan.popular
                    ? 'gradient-primary'
                    : 'bg-muted'
                }`}>
                  <plan.icon className={`w-7 h-7 ${
                    plan.popular ? 'text-white' : 'text-primary'
                  }`} />
                </div>

                {/* Plan name */}
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground mb-2">
                  {plan.description}
                </p>
                <p className="text-sm text-primary font-medium mb-6">
                  {plan.tagline}
                </p>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.popular
                          ? 'bg-primary/10'
                          : 'bg-muted'
                      }`}>
                        <Check className={`w-3 h-3 ${
                          plan.popular ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <span className="text-foreground/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  onClick={() => {
                    if (plan.id === 'enterprise') {
                      handleCalendlyClick();
                    } else {
                      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`w-full py-6 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? 'btn-primary'
                      : 'bg-muted text-foreground hover:bg-primary hover:text-white'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>

              {/* Hover glow for popular */}
              {plan.popular && (
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Help section */}
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            ¿No estás seguro qué necesitas?
          </p>
          <Button
            onClick={handleCalendlyClick}
            className="btn-primary text-lg px-10 py-6"
          >
            Agenda Demo Gratuita - Te Asesoramos Sin Compromiso
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
