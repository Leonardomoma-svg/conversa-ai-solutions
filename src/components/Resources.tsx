import { useState } from 'react';
import { Search, Download, ArrowRight, Calendar, Tag, FileText, Video, BookOpen, Folder } from 'lucide-react';

const categories = [
  { id: 'all', label: 'Todos', icon: Folder },
  { id: 'blog', label: 'Blog', icon: FileText },
  { id: 'guides', label: 'Guías', icon: BookOpen },
  { id: 'demos', label: 'Demos', icon: Video },
  { id: 'templates', label: 'Templates', icon: Folder },
];

const popularTags = ['IA', 'Automatización', 'Chatbots', 'Productividad', 'CRM', 'WhatsApp'];

const resources = [
  {
    id: 1,
    type: 'guide',
    category: 'guides',
    title: "10 Procesos Que Puedes Automatizar Hoy",
    excerpt: "Descubre los procesos más comunes que las empresas automatizan para ahorrar tiempo y recursos.",
    date: "2026-01-15",
    tags: ['Automatización', 'Productividad'],
    downloadable: true,
    isPlaceholder: true
  },
  {
    id: 2,
    type: 'guide',
    category: 'guides',
    title: "Guía: Implementando Tu Primer Chatbot",
    excerpt: "Paso a paso para crear un chatbot efectivo que atienda a tus clientes 24/7.",
    date: "2026-01-10",
    tags: ['Chatbots', 'IA'],
    downloadable: true,
    isPlaceholder: true
  },
  {
    id: 3,
    type: 'blog',
    category: 'blog',
    title: "El Futuro de la Atención al Cliente con IA",
    excerpt: "Cómo la inteligencia artificial está transformando la manera en que las empresas atienden a sus clientes.",
    date: "2026-01-08",
    tags: ['IA', 'CRM'],
    downloadable: false,
    isPlaceholder: true
  },
  {
    id: 4,
    type: 'demo',
    category: 'demos',
    title: "Demo: Chatbot para WhatsApp Business",
    excerpt: "Ve en acción cómo un chatbot puede manejar consultas, citas y ventas automáticamente.",
    date: "2026-01-05",
    tags: ['Chatbots', 'WhatsApp'],
    downloadable: false,
    isPlaceholder: true
  },
  {
    id: 5,
    type: 'template',
    category: 'templates',
    title: "Template: Flujo de Onboarding Automatizado",
    excerpt: "Plantilla lista para usar que automatiza el proceso de bienvenida de nuevos clientes.",
    date: "2026-01-03",
    tags: ['Automatización', 'CRM'],
    downloadable: true,
    isPlaceholder: true
  },
  {
    id: 6,
    type: 'blog',
    category: 'blog',
    title: "5 Métricas Clave Para Medir Tu ROI en Automatización",
    excerpt: "Aprende a medir el impacto real de tus inversiones en automatización e IA.",
    date: "2026-01-01",
    tags: ['Productividad', 'IA'],
    downloadable: false,
    isPlaceholder: true
  }
];

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'guides': return BookOpen;
      case 'blog': return FileText;
      case 'demos': return Video;
      case 'templates': return Folder;
      default: return FileText;
    }
  };

  return (
    <section id="recursos" className="section-padding relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-4">
            Recursos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Aprende y{' '}
            <span className="gradient-text">Crece Con Nosotros</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Guías, demos y recursos gratuitos para impulsar tu transformación digital.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar recursos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm transition-all ${
                selectedCategory === category.id
                  ? 'gradient-primary text-white shadow-lg'
                  : 'bg-card border border-border text-muted-foreground hover:border-primary/30'
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.label}
            </button>
          ))}
        </div>

        {/* Popular tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {popularTags.map((tag) => (
            <button
              key={tag}
              className="px-3 py-1 rounded-full bg-muted/50 text-muted-foreground text-sm hover:bg-primary/10 hover:text-primary transition-colors"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Resources grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredResources.map((resource) => {
            const CategoryIcon = getCategoryIcon(resource.category);
            
            return (
              <article
                key={resource.id}
                className={`group bg-card rounded-2xl border border-border overflow-hidden card-hover ${
                  resource.isPlaceholder ? 'opacity-70' : ''
                }`}
              >
                {/* Thumbnail placeholder */}
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative">
                  <CategoryIcon className="w-12 h-12 text-primary/40" />
                  {resource.downloadable && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-accent text-white text-xs font-medium">
                      Descargable
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {/* Category tag */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium capitalize">
                      {resource.category === 'guides' ? 'Guía' : 
                       resource.category === 'blog' ? 'Blog' : 
                       resource.category === 'demos' ? 'Demo' : 'Template'}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(resource.date).toLocaleDateString('es-MX', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {resource.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 text-xs text-muted-foreground"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="inline-flex items-center text-primary font-medium text-sm group-hover:text-secondary transition-colors">
                    {resource.downloadable ? (
                      <>
                        <Download className="mr-2 w-4 h-4" />
                        Descargar
                      </>
                    ) : (
                      <>
                        Leer más
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Featured downloads */}
        <div className="mt-16 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-6 flex items-center gap-6">
            <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
              <Download className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-display font-bold text-foreground mb-1">
                Checklist: 10 Procesos Automatizables
              </h4>
              <p className="text-sm text-muted-foreground">
                Descarga gratis y empieza a automatizar hoy
              </p>
            </div>
            <button className="px-4 py-2 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
              Descargar
            </button>
          </div>

          <div className="glass rounded-2xl p-6 flex items-center gap-6">
            <div className="w-16 h-16 rounded-xl gradient-cta flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-display font-bold text-foreground mb-1">
                Guía: Implementando Tu Primer Chatbot
              </h4>
              <p className="text-sm text-muted-foreground">
                Paso a paso para empezar con IA
              </p>
            </div>
            <button className="px-4 py-2 rounded-xl bg-secondary text-white font-medium hover:bg-secondary/90 transition-colors">
              Descargar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
