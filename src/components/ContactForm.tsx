import { useState } from 'react';
import { 
  Globe, 
  Bot, 
  Cog, 
  Headphones, 
  BarChart3, 
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  PartyPopper
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const serviceOptions = [
  { id: 'web', label: 'Páginas Web', icon: Globe },
  { id: 'chatbot', label: 'Chatbot Inteligente', icon: Bot },
  { id: 'automation', label: 'Automatizaciones', icon: Cog },
  { id: 'assistant', label: 'Asistente Virtual', icon: Headphones },
  { id: 'analytics', label: 'Análisis de Datos', icon: BarChart3 },
  { id: 'help', label: 'No estoy seguro', icon: HelpCircle },
];

const timingOptions = [
  'Inmediato',
  '1 mes',
  '2-3 meses',
  'Solo explorando'
];

const budgetOptions = [
  '< $1,000 USD',
  '$1,000 - $3,000',
  '$3,000 - $5,000',
  '$5,000+',
  'Prefiero discutirlo'
];

const ContactForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    services: [] as string[],
    timing: '',
    budget: '',
    objective: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    acceptCommunications: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const webhookUrl = 'https://n8n-n8n.cqdooi.easypanel.host/webhook/reccotiz';

  const toggleService = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1 && formData.services.length === 0) {
      newErrors.services = 'Selecciona al menos un servicio';
    }

    if (step === 2) {
      if (!formData.timing) newErrors.timing = 'Selecciona cuándo quieres comenzar';
      if (!formData.budget) newErrors.budget = 'Selecciona un rango de presupuesto';
    }

    if (step === 3) {
      if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
      if (!formData.email.trim()) {
        newErrors.email = 'El email es requerido';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Ingresa un email válido';
      }
      if (!formData.company.trim()) newErrors.company = 'El nombre de tu empresa es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    setSubmitError(null);

    try {
      const selectedServiceLabels = serviceOptions
        .filter((s) => formData.services.includes(s.id))
        .map((s) => s.label);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          services: formData.services,
          servicesLabels: selectedServiceLabels,
          submittedAt: new Date().toISOString(),
          source: 'contact_form',
        }),
      });

      if (!response.ok) {
        throw new Error('Webhook request failed');
      }

      let data: unknown = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (typeof data === 'object' && data !== null && 'success' in data && (data as { success?: boolean }).success === false) {
        throw new Error('Webhook returned success=false');
      }

      setIsSuccess(true);
    } catch {
      setSubmitError('No se pudo enviar tu solicitud. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCalendlyClick = () => {
    window.open('https://calendly.com/conversalab25/30min?back=1&month=2026-02', '_blank');
  };

  if (isSuccess) {
    return (
      <section id="contacto" className="section-padding relative">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <div className="glass rounded-3xl p-12 animate-scale-in">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-primary flex items-center justify-center">
                <PartyPopper className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                ¡Gracias por contactarnos!
              </h3>
              <p className="text-muted-foreground mb-8">
                Nos pondremos en contacto contigo en menos de 24 horas. Mientras tanto, puedes agendar tu demo directamente.
              </p>
              <Button onClick={handleCalendlyClick} className="btn-primary">
                Agendar Demo Ahora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="section-padding relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Contacto
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Cuéntanos Sobre{' '}
            <span className="gradient-text">Tu Proyecto</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Completa el formulario y te contactaremos para discutir tu solución personalizada.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12">
            {/* Progress bar */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold transition-all ${
                      currentStep >= step
                        ? 'gradient-primary text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {currentStep > step ? <Check className="w-5 h-5" /> : step}
                  </div>
                  {step < 3 && (
                    <div className="w-16 md:w-24 h-1 mx-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full gradient-primary transition-all duration-500 ${
                          currentStep > step ? 'w-full' : 'w-0'
                        }`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Services */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-up">
                  <div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">
                      ¿Qué Necesitas?
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Selecciona todos los servicios que te interesan
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {serviceOptions.map((service) => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => toggleService(service.id)}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                            formData.services.includes(service.id)
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/30'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            formData.services.includes(service.id)
                              ? 'gradient-primary'
                              : 'bg-muted'
                          }`}>
                            <service.icon className={`w-5 h-5 ${
                              formData.services.includes(service.id)
                                ? 'text-white'
                                : 'text-muted-foreground'
                            }`} />
                          </div>
                          <span className={`font-medium ${
                            formData.services.includes(service.id)
                              ? 'text-foreground'
                              : 'text-muted-foreground'
                          }`}>
                            {service.label}
                          </span>
                          {formData.services.includes(service.id) && (
                            <Check className="w-5 h-5 text-primary ml-auto" />
                          )}
                        </button>
                      ))}
                    </div>
                    {errors.services && (
                      <p className="text-destructive text-sm mt-2">{errors.services}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Project details */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-up">
                  <h3 className="text-xl font-display font-bold text-foreground mb-6">
                    Cuéntanos de Tu Proyecto
                  </h3>

                  {/* Timing */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      ¿Cuándo quieres comenzar?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {timingOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, timing: option }))}
                          className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                            formData.timing === option
                              ? 'border-primary bg-primary/5 text-foreground'
                              : 'border-border text-muted-foreground hover:border-primary/30'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {errors.timing && (
                      <p className="text-destructive text-sm mt-2">{errors.timing}</p>
                    )}
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      ¿Cuál es tu presupuesto estimado?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {budgetOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, budget: option }))}
                          className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                            formData.budget === option
                              ? 'border-primary bg-primary/5 text-foreground'
                              : 'border-border text-muted-foreground hover:border-primary/30'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {errors.budget && (
                      <p className="text-destructive text-sm mt-2">{errors.budget}</p>
                    )}
                  </div>

                  {/* Objective */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Cuéntanos brevemente tu objetivo (opcional)
                    </label>
                    <textarea
                      value={formData.objective}
                      onChange={(e) => setFormData(prev => ({ ...prev, objective: e.target.value }))}
                      placeholder="Describe qué quieres lograr con tu proyecto..."
                      className="w-full p-4 rounded-xl border border-border bg-background focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/10 resize-none h-32 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Contact info */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-up">
                  <h3 className="text-xl font-display font-bold text-foreground mb-6">
                    Información de Contacto
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className={`w-full p-4 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all ${
                          errors.name ? 'border-destructive' : 'border-border focus:border-primary/30'
                        }`}
                        placeholder="Tu nombre"
                      />
                      {errors.name && (
                        <p className="text-destructive text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className={`w-full p-4 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all ${
                          errors.email ? 'border-destructive' : 'border-border focus:border-primary/30'
                        }`}
                        placeholder="tu@email.com"
                      />
                      {errors.email && (
                        <p className="text-destructive text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Teléfono (opcional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full p-4 rounded-xl border border-border bg-background focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                        placeholder="+52 123 456 7890"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Empresa/Negocio *
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        className={`w-full p-4 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all ${
                          errors.company ? 'border-destructive' : 'border-border focus:border-primary/30'
                        }`}
                        placeholder="Nombre de tu empresa"
                      />
                      {errors.company && (
                        <p className="text-destructive text-sm mt-1">{errors.company}</p>
                      )}
                    </div>
                  </div>

                  {/* Checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.acceptCommunications}
                      onChange={(e) => setFormData(prev => ({ ...prev, acceptCommunications: e.target.checked }))}
                      className="w-5 h-5 rounded border-border text-primary focus:ring-primary/20 mt-0.5"
                    />
                    <span className="text-sm text-muted-foreground">
                      Acepto recibir comunicaciones de Conversa Lab sobre novedades, recursos y ofertas especiales.
                    </span>
                  </label>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Anterior
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary"
                  >
                    Siguiente
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Solicitud
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>

              {!!submitError && currentStep === 3 && (
                <div className="mt-4 text-sm text-destructive">{submitError}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
