import { useState } from 'react';
import { Search, FileText, Code, TrendingUp, ChevronDown } from 'lucide-react';

const phases = [
  {
    id: 1,
    title: "Descubrimiento",
    description: "Entendemos tu negocio y objetivos",
    fullDescription: "Analizamos a fondo tu negocio, identificamos oportunidades de automatización y definimos los objetivos claros que queremos alcanzar juntos.",
    icon: Search,
    details: [
      "Análisis de procesos actuales",
      "Identificación de cuellos de botella",
      "Definición de KPIs",
      "Mapeo de herramientas existentes"
    ]
  },
  {
    id: 2,
    title: "Diseño de Solución",
    description: "Creamos la estrategia perfecta para ti",
    fullDescription: "Diseñamos una solución personalizada que se adapta exactamente a tus necesidades, considerando tu presupuesto y timeline.",
    icon: FileText,
    details: [
      "Arquitectura de la solución",
      "Selección de tecnologías",
      "Plan de implementación",
      "Estimación de ROI"
    ]
  },
  {
    id: 3,
    title: "Implementación",
    description: "Desarrollamos y configuramos todo",
    fullDescription: "Construimos, probamos y desplegamos tu solución con los más altos estándares de calidad y seguridad.",
    icon: Code,
    details: [
      "Desarrollo ágil",
      "Testing riguroso",
      "Integración con sistemas",
      "Capacitación del equipo"
    ]
  },
  {
    id: 4,
    title: "Optimización",
    description: "Mejoramos continuamente los resultados",
    fullDescription: "Monitoreamos el rendimiento, analizamos métricas y realizamos mejoras continuas para maximizar tu ROI.",
    icon: TrendingUp,
    details: [
      "Monitoreo 24/7",
      "Análisis de métricas",
      "Mejoras iterativas",
      "Soporte continuo"
    ]
  }
];

const Methodology = () => {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pattern-grid opacity-50" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
            Nuestra Metodología
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Cómo Lo Hacemos{' '}
            <span className="gradient-text">Posible</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Un proceso probado que garantiza resultados excepcionales en cada proyecto.
          </p>
        </div>

        {/* Progress tracker */}
        <div className="hidden md:flex justify-between items-center max-w-4xl mx-auto mb-12 px-8">
          {phases.map((phase, index) => (
            <div key={phase.id} className="flex items-center">
              {/* Step indicator */}
              <div 
                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-lg transition-all cursor-pointer ${
                  expandedPhase === phase.id
                    ? 'gradient-primary text-white shadow-lg scale-110'
                    : expandedPhase && expandedPhase > phase.id
                    ? 'bg-green-500 text-white'
                    : 'bg-muted text-muted-foreground hover:bg-primary/10'
                }`}
                onClick={() => setExpandedPhase(phase.id)}
              >
                {phase.id}
              </div>
              
              {/* Connector line */}
              {index < phases.length - 1 && (
                <div className="flex-1 h-1 mx-4 rounded-full bg-muted overflow-hidden min-w-[60px]">
                  <div 
                    className={`h-full gradient-primary transition-all duration-500 ${
                      expandedPhase && expandedPhase > phase.id ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Timeline cards */}
        <div className="max-w-4xl mx-auto space-y-4">
          {phases.map((phase) => (
            <div
              key={phase.id}
              className={`bg-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                expandedPhase === phase.id
                  ? 'border-primary/30 shadow-lg'
                  : 'border-border hover:border-primary/20'
              }`}
            >
              {/* Header */}
              <button
                className="w-full p-6 flex items-center gap-6 text-left"
                onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
              >
                {/* Number & Icon */}
                <div className="flex items-center gap-4">
                  <div 
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                      expandedPhase === phase.id
                        ? 'gradient-primary'
                        : 'bg-muted'
                    }`}
                  >
                    <phase.icon className={`w-6 h-6 ${
                      expandedPhase === phase.id ? 'text-white' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <span className={`text-3xl font-display font-bold ${
                    expandedPhase === phase.id ? 'gradient-text' : 'text-muted-foreground/30'
                  }`}>
                    0{phase.id}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="flex-1">
                  <h3 className="text-xl font-display font-bold text-foreground mb-1">
                    {phase.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {phase.description}
                  </p>
                </div>

                {/* Expand icon */}
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${
                  expandedPhase === phase.id ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Expanded content */}
              {expandedPhase === phase.id && (
                <div className="px-6 pb-6 animate-fade-up">
                  <div className="pl-[88px] md:pl-[104px]">
                    <p className="text-foreground/80 mb-6 leading-relaxed">
                      {phase.fullDescription}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {phase.details.map((detail, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
                        >
                          <div className="w-2 h-2 rounded-full gradient-primary" />
                          <span className="text-sm text-foreground">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Methodology;
