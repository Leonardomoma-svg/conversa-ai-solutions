import { useState, useEffect } from 'react';
import { ArrowRight, Play, Sparkles, Bot, Zap, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const typingTexts = [
  "Automatizaciones inteligentes",
  "Chatbots que venden 24/7",
  "Webs que convierten",
  "IA que impulsa tu negocio"
];

const Hero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = typingTexts[currentTextIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex]);

  const handleCalendlyClick = () => {
    window.open('https://calendly.com/conversalab', '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" patternUnits="userSpaceOnUse" width="100" height="100">
              <circle cx="50" cy="50" r="1.5" fill="rgba(6, 182, 212, 0.5)" />
              <path d="M50 0 L50 45 M50 55 L50 100 M0 50 L45 50 M55 50 L100 50" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="2" fill="rgba(59, 130, 246, 0.3)" />
              <circle cx="100" cy="0" r="2" fill="rgba(59, 130, 246, 0.3)" />
              <circle cx="0" cy="100" r="2" fill="rgba(59, 130, 246, 0.3)" />
              <circle cx="100" cy="100" r="2" fill="rgba(59, 130, 246, 0.3)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 animate-float opacity-60">
        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <Bot className="w-8 h-8 text-cyan" />
        </div>
      </div>
      <div className="absolute top-1/3 right-20 animate-float-delayed opacity-60">
        <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <Zap className="w-7 h-7 text-blue-bright" />
        </div>
      </div>
      <div className="absolute bottom-1/3 left-1/4 animate-float opacity-50">
        <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-white space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-fade-up">
              <Sparkles className="w-4 h-4 text-cyan" />
              <span className="text-sm font-medium">Potenciado por Inteligencia Artificial</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Recupera Tu Tiempo,{' '}
              <span className="bg-gradient-to-r from-cyan via-blue-bright to-white bg-clip-text text-transparent">
                Multiplica Tus Resultados
              </span>
            </h1>

            {/* Typing text */}
            <div className="h-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-xl md:text-2xl text-white/90 font-light">
                {displayText}
                <span className="inline-block w-0.5 h-6 bg-cyan ml-1 animate-pulse" />
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button 
                onClick={handleCalendlyClick}
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 text-lg rounded-xl transition-all hover:scale-105 hover:shadow-lg"
              >
                Agenda Demo Gratis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
                onClick={() => document.getElementById('casos')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="mr-2 w-5 h-5" />
                Ver Casos de Éxito
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 pt-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-white/30 to-white/10 border-2 border-white/20 backdrop-blur-sm"
                  />
                ))}
              </div>
              <p className="text-white/80 text-sm">
                <span className="font-semibold text-white">50+</span> negocios automatizando con nosotros
              </p>
            </div>
          </div>

          {/* Right illustration */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square">
              {/* Main robot illustration placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-3xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center animate-float">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-cyan to-blue-bright flex items-center justify-center">
                      <Bot className="w-12 h-12 text-white" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-32 mx-auto rounded-full bg-white/30" />
                      <div className="h-2 w-24 mx-auto rounded-full bg-white/20" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute top-10 -left-10 animate-float-delayed">
                <div className="glass-dark rounded-2xl p-4 w-48">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs">Automatizado</p>
                      <p className="text-white font-semibold">+85% Eficiencia</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-20 -right-5 animate-float">
                <div className="glass-dark rounded-2xl p-4 w-52">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan/20 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-cyan" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs">ROI Promedio</p>
                      <p className="text-white font-semibold">300% en 6 meses</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
            fill="hsl(210 40% 99%)"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
