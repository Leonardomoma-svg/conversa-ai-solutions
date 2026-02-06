import { useState } from 'react';
import { 
  Linkedin, 
  Youtube, 
  Mail, 
  MapPin, 
  ArrowRight,
  Check,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;


    setIsSubmitting(true);

    try {
      const response = await fetch('https://n8n-n8n.cqdooi.easypanel.host/webhook/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email
        })
      });

      const data = await response.json();

      if (data.success) {
        setIsSubscribed(true);
        setEmail('');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceLinks = [
    { label: 'Páginas Web', href: '#servicios' },
    { label: 'Chatbots Inteligentes', href: '#servicios' },
    { label: 'Automatización de Procesos', href: '#servicios' },
    { label: 'Asistentes Virtuales', href: '#servicios' },
    { label: 'Análisis de Datos', href: '#servicios' },
  ];

  const resourceLinks = [
    { label: 'Blog', href: '#recursos' },
    { label: 'Guías', href: '#recursos' },
    { label: 'Demos', href: '#recursos' },
    { label: 'Templates', href: '#recursos' },
  ];

  const companyLinks = [
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Casos de Éxito', href: '#casos' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const legalLinks = [
    { label: 'Privacidad', href: '#' },
    { label: 'Términos', href: '#' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/leonardo-moreno-472a99332/', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com/@conversalab', label: 'YouTube' },
  ];

  return (
    <footer className="bg-foreground text-white">
      {/* Newsletter section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="glass-dark rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-display font-bold mb-2">
                    Recibe tips de automatización cada semana
                  </h3>
                  <p className="text-white/60">
                    Primer email: Checklist de 10 procesos automatizables
                  </p>
                </div>
                <form onSubmit={handleSubscribe} className="flex gap-3">
                  {isSubscribed ? (
                    <div className="flex items-center gap-3 text-cyan">
                      <Check className="w-5 h-5" />
                      <span>¡Gracias! Revisa tu email</span>
                    </div>
                  ) : (
                    <>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan transition-colors"
                        required
                      />
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 rounded-xl gradient-cta text-white font-medium hover:opacity-90 transition-opacity"
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <ArrowRight className="w-5 h-5" />
                        )}
                      </Button>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="relative">
                <img
                  src="/LOGO-removebg-preview.png"
                  alt="ConversaLab"
                  className="w-20 h-20 object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]"
                />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Conversa<span className="text-cyan">Lab</span>
              </span>
            </a>

            <p className="text-white/60 mb-6 max-w-sm">
              Impulsamos negocios con soluciones de IA personalizadas: desde páginas web inteligentes hasta automatizaciones que recuperan tiempo valioso.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <a 
                href="mailto:conversalab25@gmail.com"
                className="flex items-center gap-3 text-white/60 hover:text-cyan transition-colors"
              >
                <Mail className="w-4 h-4" />
                conversalab25@gmail.com
              </a>
              <div className="flex items-center gap-3 text-white/60">
                <MapPin className="w-4 h-4" />
                Monterrey, México
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:gradient-cta transition-all group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">Servicios</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-cyan transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">Recursos</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-cyan transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal column */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">Empresa</h4>
            <ul className="space-y-3 mb-6">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-cyan transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="font-display font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-cyan transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-white/40 text-sm">
            © 2026 Conversa Lab. Hecho en México
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
