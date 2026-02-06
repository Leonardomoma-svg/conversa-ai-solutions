import { ArrowRight, Calendar, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  const handleCalendlyClick = () => {
    window.open('https://calendly.com/conversalab25/30min?back=1&month=2026-02', '_blank');
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-pattern" patternUnits="userSpaceOnUse" width="60" height="60">
              <circle cx="30" cy="30" r="1" fill="rgba(255,255,255,0.5)" />
              <path d="M30 0 L30 25 M30 35 L30 60 M0 30 L25 30 M35 30 L60 30" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-pattern)" />
        </svg>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 animate-float opacity-40">
        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <Calendar className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="absolute bottom-1/4 right-10 animate-float-delayed opacity-40">
        <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <Clock className="w-7 h-7 text-cyan" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 animate-fade-up">
            ¿Listo Para{' '}
            <span className="bg-gradient-to-r from-cyan via-white to-blue-bright bg-clip-text text-transparent">
              Recuperar Tu Tiempo
            </span>?
          </h2>

          {/* Subheading */}
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Agenda una demo de 30 minutos y descubre cómo la IA puede transformar tu negocio
          </p>

          {/* CTA Button */}
          <Button
            onClick={handleCalendlyClick}
            className="bg-white text-primary hover:bg-white/90 font-semibold px-10 py-7 text-lg rounded-xl transition-all hover:scale-105 hover:shadow-2xl animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            Agendar Demo Ahora
            <ArrowRight className="ml-3 w-5 h-5" />
          </Button>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-4 mt-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
              <Users className="w-4 h-4 text-cyan" />
              <span className="text-sm text-white/80">
                <span className="font-semibold text-white">3</span> negocios automatizados
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
