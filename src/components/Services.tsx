import { useState } from 'react';
import { 
  Laptop, 
  Bot, 
  Cog, 
  Headphones, 
  BarChart3, 
  Globe,
  ArrowRight,
  X,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    id: 1,
    icon: Laptop,
    title: "Desarrollo Web con IA",
    description: "Sitios web modernos optimizados con inteligencia artificial",
    fullDescription: "Creamos sitios web que no solo lucen increíbles, sino que están potenciados con IA para ofrecer experiencias personalizadas a cada visitante.",
    benefits: [
      "Diseño responsivo y moderno",
      "Optimización SEO automática",
      "Chatbots integrados",
      "Analytics avanzados con IA"
    ],
    examples: "E-commerce, landing pages, portales corporativos"
  },
  {
    id: 2,
    icon: Bot,
    title: "Chatbots Inteligentes",
    description: "Atiende clientes 24/7, responde FAQs y agenda citas automáticamente",
    fullDescription: "Nuestros chatbots entienden el contexto, aprenden de cada conversación y se integran perfectamente con tus sistemas existentes.",
    benefits: [
      "Atención 24/7 sin interrupciones",
      "Integración con WhatsApp, Web y más",
      "Aprendizaje continuo",
      "Escalamiento a humanos cuando necesario"
    ],
    examples: "Soporte al cliente, ventas, reservaciones"
  },
  {
    id: 3,
    icon: Cog,
    title: "Automatización de Procesos",
    description: "CRM, email marketing, workflows - todo en piloto automático",
    fullDescription: "Automatizamos los procesos repetitivos de tu negocio para que puedas enfocarte en lo que realmente importa: crecer.",
    benefits: [
      "Flujos de trabajo automatizados",
      "Integración con 500+ apps",
      "Notificaciones inteligentes",
      "Reportes automáticos"
    ],
    examples: "Email marketing, CRM, facturación, inventarios"
  },
  {
    id: 4,
    icon: Headphones,
    title: "Asistentes Virtuales",
    description: "Asistentes personalizados que se integran a tu negocio",
    fullDescription: "Asistentes de IA entrenados específicamente para tu negocio, capaces de manejar tareas complejas y tomar decisiones.",
    benefits: [
      "Entrenamiento personalizado",
      "Voz y personalidad únicas",
      "Integración con herramientas",
      "Escalable según necesidades"
    ],
    examples: "Asistentes de ventas, soporte técnico, onboarding"
  },
  {
    id: 5,
    icon: BarChart3,
    title: "Análisis de Datos con IA",
    description: "Insights accionables de tus datos en tiempo real",
    fullDescription: "Transformamos tus datos en decisiones inteligentes con dashboards en tiempo real y predicciones basadas en IA.",
    benefits: [
      "Dashboards interactivos",
      "Predicciones de tendencias",
      "Alertas automáticas",
      "Reportes ejecutivos"
    ],
    examples: "Ventas, inventarios, comportamiento de clientes"
  },
  {
    id: 6,
    icon: Globe,
    title: "Webs + Automatizaciones",
    description: "Solución completa: sitio web + automatizaciones integradas",
    fullDescription: "El paquete completo: un sitio web profesional con todas las automatizaciones necesarias para que funcione en piloto automático.",
    benefits: [
      "Sitio web profesional",
      "Chatbot integrado",
      "CRM automatizado",
      "Email marketing configurado"
    ],
    examples: "Startups, negocios en crecimiento, renovaciones digitales"
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <section id="servicios" className="section-padding pattern-dots relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Soluciones Que{' '}
            <span className="gradient-text">Transforman Tu Negocio</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Desde chatbots inteligentes hasta automatizaciones completas, tenemos la solución perfecta para impulsar tu crecimiento.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative bg-card rounded-2xl p-8 border border-border card-hover cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-display font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {service.description}
              </p>

              {/* CTA */}
              <button className="inline-flex items-center text-primary font-medium group-hover:text-secondary transition-colors">
                Conocer más
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-card rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center">
                    <selectedService.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground">
                    {selectedService.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Description */}
              <p className="text-lg text-muted-foreground mb-8">
                {selectedService.fullDescription}
              </p>

              {/* Benefits */}
              <div className="mb-8">
                <h4 className="font-display font-semibold text-foreground mb-4">
                  Beneficios
                </h4>
                <ul className="space-y-3">
                  {selectedService.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Examples */}
              <div className="mb-8">
                <h4 className="font-display font-semibold text-foreground mb-2">
                  Ejemplos de uso
                </h4>
                <p className="text-muted-foreground">{selectedService.examples}</p>
              </div>

              {/* CTA */}
              <Button 
                className="btn-primary w-full"
                onClick={() => {
                  setSelectedService(null);
                  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Solicitar Cotización
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
