import { useMemo, useState } from 'react';
import { Search, Download, ArrowRight, Calendar, Tag, FileText, Video, BookOpen, Folder, X, Play } from 'lucide-react';

const categories = [
  { id: 'all', label: 'Todos', icon: Folder },
  { id: 'blog', label: 'Blog', icon: FileText },
  { id: 'guides', label: 'Guías', icon: BookOpen },
  { id: 'demos', label: 'Demos', icon: Video },
  { id: 'templates', label: 'Templates', icon: Folder },
];

const popularTags = ['IA', 'Automatización', 'Chatbots', 'Productividad', 'CRM', 'WhatsApp', 'Ventas', 'Cotizaciones'];

type ResourceContentBlock =
  | { type: 'h3'; text: string }
  | { type: 'h4'; text: string }
  | { type: 'p'; text: string };

type ResourceItem = {
  id: number;
  type: 'guide' | 'blog' | 'demo' | 'template';
  category: 'guides' | 'blog' | 'demos' | 'templates';
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  downloadable: boolean;
  isPlaceholder?: boolean;
  imageSrc?: string;
  externalUrl?: string;
  contentBlocks?: ResourceContentBlock[];
};

const resources: ResourceItem[] = [
  {
    id: 7,
    type: 'demo',
    category: 'demos',
    title: "Convierte cotizaciones en ventas en 5 minutos",
    excerpt: "Mira cómo automatizar cotizaciones 24/7 desde un formulario web hasta WhatsApp, con precios dinámicos y registro en Google Sheets.",
    date: "2026-02-05",
    tags: ['Automatización', 'WhatsApp', 'Ventas', 'Cotizaciones'],
    downloadable: false,
    isPlaceholder: false,
    imageSrc: "/thumb-fletes.png",
    externalUrl: "https://youtu.be/vAWa_T2MMIk",
    contentBlocks: [
      { type: 'h3', text: 'AUTOMATIZACIÓN DE COTIZACIONES' },
      { type: 'h4', text: '¿Por qué tu negocio necesita responder cotizaciones en 5 minutos?' },
      {
        type: 'p',
        text: 'En el mundo de los fletes y mudanzas, la velocidad marca la diferencia entre cerrar una venta o perderla ante la competencia. Este video te muestra cómo construir un sistema de cotizaciones automáticas que funciona 24/7: desde que un cliente llena un formulario en tu página web hasta que recibe una cotización personalizada por WhatsApp en solo 5 minutos. Sin contratar personal adicional, sin errores de cálculo, y sin importar si es fin de semana o media noche.'
      },
      { type: 'h4', text: 'Lo que aprenderás en este tutorial completo' },
      {
        type: 'p',
        text: 'Te guío paso a paso en la creación de un flujo automatizado usando n8n, WhatsApp y Google Sheets. Verás cómo calcular precios dinámicos basados en peso, volumen, tipo de carga, urgencia y distancia; cómo formatear mensajes profesionales para WhatsApp; y cómo guardar cada cotización en una base de datos para análisis posterior. Todo el sistema está diseñado para ser escalable: puede manejar desde 10 hasta 1,000 cotizaciones diarias sin ningún problema.'
      },
      { type: 'h4', text: 'El valor real de automatizar tu proceso de ventas' },
      {
        type: 'p',
        text: 'Esta automatización no solo ahorra tiempo operativo, sino que aumenta significativamente tu tasa de conversión al ser el primero en responder. Los clientes aprecian la inmediatez y profesionalismo de recibir una cotización detallada casi al instante. Además, al guardar todo en Google Sheets, podrás identificar patrones: qué rutas son más populares, cuál es tu ticket promedio, y qué días recibes más solicitudes. Esta información es oro para optimizar tu negocio y tomar decisiones basadas en datos reales.'
      }
    ]
  }
];

const checklistDocUrl = '/10procesos.docx';

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeResource, setActiveResource] = useState<ResourceItem | null>(null);

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           resource.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

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
            const hasReadMore = Boolean(resource.contentBlocks && resource.contentBlocks.length > 0);
            const isCtaDisabled = Boolean(resource.isPlaceholder) || (resource.downloadable && !resource.externalUrl);
            
            return (
              <article
                key={resource.id}
                className={`group bg-card rounded-2xl border border-border overflow-hidden card-hover ${
                  resource.isPlaceholder ? 'opacity-70' : ''
                }`}
              >
                {/* Thumbnail placeholder */}
                {resource.externalUrl ? (
                  <a
                    href={resource.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block aspect-video relative overflow-hidden"
                    aria-label={resource.title}
                  >
                    {resource.imageSrc ? (
                      <img
                        src={resource.imageSrc}
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <CategoryIcon className="w-12 h-12 text-primary/40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <Play className="w-6 h-6 text-primary ml-0.5" />
                      </div>
                    </div>
                    {resource.downloadable && (
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-accent text-white text-xs font-medium">
                        Descargable
                      </div>
                    )}
                  </a>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative">
                    {resource.imageSrc ? (
                      <img
                        src={resource.imageSrc}
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <CategoryIcon className="w-12 h-12 text-primary/40" />
                    )}
                    {resource.downloadable && (
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-accent text-white text-xs font-medium">
                        Descargable
                      </div>
                    )}
                  </div>
                )}

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
                  <button
                    disabled={isCtaDisabled}
                    className={`inline-flex items-center font-medium text-sm transition-colors ${
                      isCtaDisabled
                        ? 'text-muted-foreground/60 cursor-not-allowed'
                        : 'text-primary group-hover:text-secondary'
                    }`}
                    onClick={() => {
                      if (isCtaDisabled) return;
                      if (resource.downloadable && resource.externalUrl) {
                        window.open(resource.externalUrl, '_blank');
                        return;
                      }

                      if (hasReadMore) {
                        setActiveResource(resource);
                        return;
                      }

                      if (resource.externalUrl) window.open(resource.externalUrl, '_blank');
                    }}
                  >
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

        {activeResource && (
          <div
            className="fixed inset-0 z-[60]"
            role="dialog"
            aria-modal="true"
            aria-label={activeResource.title}
          >
            <button
              className="absolute inset-0 bg-black/50"
              onClick={() => setActiveResource(null)}
            />
            <div className="relative mx-auto mt-24 w-[min(920px,calc(100%-2rem))] rounded-3xl bg-card border border-border shadow-2xl overflow-hidden">
              <div className="flex items-start justify-between gap-4 p-6 border-b border-border">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium capitalize">
                      {activeResource.category === 'guides' ? 'Guía' :
                       activeResource.category === 'blog' ? 'Blog' :
                       activeResource.category === 'demos' ? 'Demo' : 'Template'}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(activeResource.date).toLocaleDateString('es-MX', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                    {activeResource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {activeResource.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {activeResource.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground"
                  onClick={() => setActiveResource(null)}
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 max-h-[70vh] overflow-auto">
                {activeResource.externalUrl && (
                  <a
                    href={activeResource.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                  >
                    Ver video en YouTube
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}

                <div className="mt-6 space-y-4">
                  {activeResource.contentBlocks?.map((block, idx) => {
                    if (block.type === 'h3') {
                      return (
                        <h4 key={idx} className="text-xl md:text-2xl font-display font-bold text-foreground">
                          {block.text}
                        </h4>
                      );
                    }

                    if (block.type === 'h4') {
                      return (
                        <h5 key={idx} className="text-lg font-display font-bold text-foreground">
                          {block.text}
                        </h5>
                      );
                    }

                    return (
                      <p key={idx} className="text-muted-foreground leading-relaxed">
                        {block.text}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

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
            <a
              href={checklistDocUrl}
              download
              className="px-4 py-2 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
            >
              Descargar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
