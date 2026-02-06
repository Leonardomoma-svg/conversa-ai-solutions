import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import CaseStudies from '@/components/CaseStudies';
import Methodology from '@/components/Methodology';
import Team from '@/components/Team';
import Pricing from '@/components/Pricing';
import Resources from '@/components/Resources';
import ContactForm from '@/components/ContactForm';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Services />
      <CaseStudies />
      <Methodology />
      <Team />
      <Pricing />
      <Resources />
      <ContactForm />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
