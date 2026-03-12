import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#casos', label: 'Casos de Éxito' },
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#precios', label: 'Precios' },
    { href: '#recursos', label: 'Recursos' },
    { href: '#contacto', label: 'Contacto' },
  ];

  const handleCalendlyClick = () => {
    window.open('https://calendly.com/conversalab25/30min?back=1&month=2026-02', '_blank');
  };

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-[20px] bg-[#0A0A0F]/80 border-b border-white/10'
          : 'backdrop-blur-[12px] bg-[#0A0A0F]/35'
      } py-2`}
    >
      <div className="w-full px-4 sm:px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 -ml-1" onClick={handleLogoClick}>
            <div className="relative">
              <img
                src="/LOGO-removebg-preview.png"
                alt="ConversaLab"
                className="w-20 h-20 object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)]"
              />
            </div>
            <span className="font-display font-bold text-xl text-white tracking-tight">
              Conversa<span className="text-white/80">Lab</span>
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
                className="font-display font-semibold tracking-wide transition-colors animated-underline py-1 text-white/75 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button 
              onClick={handleCalendlyClick}
              className="relative overflow-hidden px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#06B6D4] hover:from-[#06B6D4] hover:to-[#2563EB] transition-all hover:shadow-[0_14px_40px_rgba(37,99,235,0.35)]"
            >
              Agenda tu Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0A0A0F]/95 backdrop-blur-xl shadow-lg mt-0 mx-0 overflow-hidden animate-scale-in border-b border-white/10">
            <div className="p-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="block text-white font-medium py-3 px-4 rounded-xl hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4">
                <Button 
                  onClick={handleCalendlyClick}
                  className="w-full relative overflow-hidden px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#06B6D4] hover:from-[#06B6D4] hover:to-[#2563EB] transition-all hover:shadow-[0_14px_40px_rgba(37,99,235,0.35)]"
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
