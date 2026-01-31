import { useState } from 'react';
import { 
  Linkedin, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  MapPin, 
  Heart,
  ArrowRight,
  Check,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubscribing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubscribing(false);
    setIsSubscribed(true);
    setEmail('');
  };

  const serviceLinks = [
    { label: 'Desarrollo Web con IA', href: '#servicios' },
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
    { icon: Linkedin, href: 'https://linkedin.com/company/conversalab', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/conversalab', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/conversalab', label: 'Twitter' },
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
                        disabled={isSubscribing}
                        className="px-6 py-3 rounded-xl gradient-cta text-white font-medium hover:opacity-90 transition-opacity"
                      >
                        {isSubscribing ? (
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
                <div className="w-10 h-10 rounded-xl gradient-cta flex items-center justify-center">
                  <span className="text-white font-display font-bold text-lg">C</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-cyan rounded-full" />
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
                href="mailto:contacto@conversalab.com"
                className="flex items-center gap-3 text-white/60 hover:text-cyan transition-colors"
              >
                <Mail className="w-4 h-4" />
                contacto@conversalab.com
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
            © 2026 Conversa Lab. Impulsado por IA, hecho con{' '}
            <Heart className="inline w-4 h-4 text-red-500 fill-red-500" />{' '}
            en México
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
