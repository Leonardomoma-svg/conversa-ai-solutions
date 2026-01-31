import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, TrendingUp, Clock } from 'lucide-react';

const placeholderCases = [
  {
    id: 1,
    company: "Próximamente",
    industry: "Retail",
    metric: "300%",
    metricLabel: "ROI",
    quote: "Historias de éxito que pronto compartiremos contigo.",
    isPlaceholder: true
  },
  {
    id: 2,
    company: "Próximamente",
    industry: "Servicios",
    metric: "85%",
    metricLabel: "Tiempo Ahorrado",
    quote: "Automatizaciones que transformarán negocios como el tuyo.",
    isPlaceholder: true
  },
  {
    id: 3,
    company: "Próximamente",
    industry: "Startups",
    metric: "24/7",
    metricLabel: "Atención",
    quote: "Chatbots que nunca duermen, clientes siempre satisfechos.",
    isPlaceholder: true
  },
  {
    id: 4,
    company: "Próximamente",
    industry: "E-commerce",
    metric: "+50%",
    metricLabel: "Conversiones",
    quote: "Webs inteligentes que convierten visitantes en clientes.",
    isPlaceholder: true
  }
];

const industries = ["Todos", "Retail", "Servicios", "Startups", "E-commerce"];

const CaseStudies = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndustry, setSelectedIndustry] = useState("Todos");

  const filteredCases = selectedIndustry === "Todos" 
    ? placeholderCases 
    : placeholderCases.filter(c => c.industry === selectedIndustry);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredCases.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredCases.length) % filteredCases.length);
  };

  return (
    <section id="casos" className="section-padding section-alt relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-4">
            Casos de Éxito
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Resultados Reales,{' '}
            <span className="gradient-text">Clientes Felices</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Descubre cómo hemos ayudado a negocios como el tuyo a automatizar y crecer.
          </p>
        </div>

        {/* Industry filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => {
                setSelectedIndustry(industry);
                setCurrentIndex(0);
              }}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
                selectedIndustry === industry
                  ? 'gradient-primary text-white shadow-lg'
                  : 'bg-card border border-border text-muted-foreground hover:border-primary/30'
              }`}
            >
              {industry}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:border-primary/30 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:border-primary/30 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>

          {/* Cards container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {filteredCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className={`glass rounded-3xl p-8 md:p-12 ${caseItem.isPlaceholder ? 'opacity-60' : ''}`}>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      {/* Left - Metric */}
                      <div className="text-center md:text-left">
                        <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6">
                          {caseItem.industry}
                        </div>
                        
                        {/* Logo placeholder */}
                        <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-6">
                          <span className="text-3xl font-display font-bold text-muted-foreground/30">
                            {caseItem.company[0]}
                          </span>
                        </div>

                        <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                          {caseItem.company}
                        </h3>

                        {/* Animated metric */}
                        <div className="flex items-baseline gap-2 mt-6">
                          <span className="text-5xl md:text-6xl font-display font-bold gradient-text">
                            {caseItem.metric}
                          </span>
                          <span className="text-lg text-muted-foreground font-medium">
                            {caseItem.metricLabel}
                          </span>
                        </div>
                      </div>

                      {/* Right - Quote */}
                      <div>
                        <Quote className="w-10 h-10 text-primary/20 mb-4" />
                        <p className="text-xl text-foreground/80 italic leading-relaxed mb-6">
                          "{caseItem.quote}"
                        </p>

                        {caseItem.isPlaceholder ? (
                          <div className="inline-flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">Casos de éxito próximamente</span>
                          </div>
                        ) : (
                          <button className="inline-flex items-center text-primary font-medium hover:text-secondary transition-colors">
                            Ver caso completo
                            <TrendingUp className="ml-2 w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {filteredCases.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'gradient-primary w-8'
                    : 'bg-border hover:bg-primary/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
