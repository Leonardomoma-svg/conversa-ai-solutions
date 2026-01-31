import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#casos', label: 'Casos de Éxito' },
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#recursos', label: 'Recursos' },
    { href: '#precios', label: 'Precios' },
  ];

  const handleCalendlyClick = () => {
    window.open('https://calendly.com/conversalab', '_blank');
  };

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">C</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-cyan rounded-full animate-pulse-glow" />
            </div>
            <span className={`font-display font-bold text-xl ${
              isScrolled ? 'text-primary' : 'text-white'
            }`}>
              Conversa<span className={isScrolled ? 'text-secondary' : 'text-cyan'}>Lab</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`font-medium transition-colors animated-underline py-1 ${
                  isScrolled 
                    ? 'text-foreground/80 hover:text-primary' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button 
              onClick={handleCalendlyClick}
              className="btn-primary"
            >
              Agenda tu Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 ${isScrolled ? 'text-foreground' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg mt-0 mx-0 overflow-hidden animate-scale-in">
            <div className="p-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="block text-foreground hover:text-primary font-medium py-3 px-4 rounded-xl hover:bg-muted transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4">
                <Button 
                  onClick={handleCalendlyClick}
                  className="btn-primary w-full"
                >
                  Agenda tu Demo
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
