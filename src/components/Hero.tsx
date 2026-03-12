import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Play, Sparkles, Bot, Zap, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const typingTexts = [
  "venden solos",
  "trabajan 24/7",
  "ahorran 20hrs/semana"
];

const chatScenarios = [
  [
    { from: 'user' as const, text: '¿Cuánto cuesta el servicio X?' },
    { from: 'bot' as const, text: '¡Hola! El servicio X tiene un costo de $X. ¿Te gustaría agendar una demo? 🚀' },
  ],
  [
    { from: 'user' as const, text: '¿Qué pueden automatizar en mi negocio?' },
    { from: 'bot' as const, text: 'Podemos automatizar cotizaciones, seguimiento de leads, agenda de citas y recordatorios. ¿Qué proceso te quita más tiempo hoy?' },
  ],
  [
    { from: 'user' as const, text: '¿Tienen chatbot para WhatsApp?' },
    { from: 'bot' as const, text: 'Sí. Integramos chatbots en WhatsApp para responder preguntas, calificar clientes y agendar. ¿Quieres que atienda ventas o soporte?' },
  ],
  [
    { from: 'user' as const, text: '¿En cuánto tiempo queda listo?' },
    { from: 'bot' as const, text: 'Depende del alcance, pero normalmente en semanas. Podemos empezar con un MVP rápido y luego iterar. ¿Cuándo te gustaría comenzar?' },
  ],
];

const TypingDots = () => (
  <div className="flex items-center gap-1">
    <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
    <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" style={{ animationDelay: '0.15s' }} />
    <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" style={{ animationDelay: '0.3s' }} />
  </div>
);

type ChatMsg = {
  from: 'user' | 'bot';
  text: string;
};

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

const getBotReply = (question: string) => {
  const q = normalize(question);

  const matchAny = (words: string[]) => words.some((w) => q.includes(w));

  if (matchAny(['precio', 'precios', 'costo', 'cuanto cuesta', 'cotizacion', 'cotizar', 'paquete', 'plan'])) {
    return 'Manejamos inversión personalizada según el alcance. Si me dices qué quieres automatizar o qué canal (Web/WhatsApp), te recomiendo el mejor camino y agendamos una demo.';
  }

  if (matchAny(['whatsapp', 'wa', 'wsp'])) {
    return 'Sí. Integramos chatbots en WhatsApp para responder FAQs, calificar prospectos y agendar citas. ¿Lo quieres para ventas, soporte o ambos?';
  }

  if (matchAny(['automat', 'proceso', 'workflow', 'crm', 'seguimiento', 'lead', 'cotizaciones', 'agenda', 'citas'])) {
    return 'Automatizamos procesos como seguimiento de leads, cotizaciones, agenda de citas, recordatorios y reportes. ¿Cuál es el proceso #1 que hoy te quita más tiempo?';
  }

  if (matchAny(['tiempo', 'cuando', 'plazo', 'listo', 'implementacion'])) {
    return 'Normalmente entregamos en semanas (depende del alcance). Podemos arrancar con un MVP rápido y luego iterar. ¿Cuándo te gustaría comenzar?';
  }

  if (matchAny(['web', 'pagina', 'landing', 'sitio'])) {
    return 'Creamos páginas web modernas optimizadas para convertir, con automatizaciones y chatbots integrados. ¿Tu web es para generar leads, vender o agendar?';
  }

  if (matchAny(['demo', 'agenda', 'calendly', 'reunion', 'llamada'])) {
    return 'Claro. Podemos agendar una demo de 30 minutos. Dale al botón “Agenda Demo Gratis” y listo. ¿Prefieres mañana o esta semana?';
  }

  return '¡Claro! Puedo ayudarte con chatbots, automatización y páginas web. ¿Qué quieres lograr exactamente en tu negocio?';
};

const n8nWebhookUrl = (import.meta as any).env?.VITE_N8N_CHAT_WEBHOOK_URL as string | undefined;

const parseN8nReply = async (response: Response) => {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const data = await response.json();
    const candidate =
      (data && (data.reply ?? data.answer ?? data.output ?? data.text)) as unknown;
    if (typeof candidate === 'string' && candidate.trim()) return candidate;
    return JSON.stringify(data);
  }

  const text = await response.text();
  return text;
};

const ChatMock = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [isInteractive, setIsInteractive] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  const activateInteractive = () => {
    if (!isInteractive) {
      setIsInteractive(true);
      setVisibleCount(0);
      setScenarioIndex(0);
    }
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const suggestedQuestions = [
    '¿Tienen chatbot para WhatsApp?',
    '¿Qué pueden automatizar en mi negocio?',
    '¿Cómo funcionan los precios?',
  ];

  useEffect(() => {
    let cancelled = false;

    const run = async (index: number) => {
      const scenario = chatScenarios[index] ?? chatScenarios[0];

      if (isInteractive) return;

      setVisibleCount(0);
      setIsBotTyping(false);

      for (let i = 0; i < scenario.length; i += 1) {
        const msg = scenario[i];
        if (msg.from === 'bot') {
          setIsBotTyping(true);
          await new Promise((r) => setTimeout(r, 1200));
          if (cancelled) return;
          setIsBotTyping(false);
        }

        setVisibleCount((prev) => prev + 1);
        await new Promise((r) => setTimeout(r, msg.from === 'user' ? 1600 : 5200));
        if (cancelled || isInteractive) return;
      }

      await new Promise((r) => setTimeout(r, 1200));
      if (cancelled || isInteractive) return;

      const next = (index + 1) % chatScenarios.length;
      setScenarioIndex(next);
      run(next);
    };

    setScenarioIndex(0);
    run(0);
    return () => {
      cancelled = true;
    };
  }, [isInteractive]);

  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isBotTyping, visibleCount, scenarioIndex, isInteractive]);

  const handleSend = async () => {
    const text = draft.trim();
    if (!text) return;

    if (!isInteractive) {
      setIsInteractive(true);
      setVisibleCount(0);
      setScenarioIndex(0);
    }

    setDraft('');
    setMessages((prev) => [...prev, { from: 'user', text }]);
    setIsBotTyping(true);

    try {
      if (n8nWebhookUrl) {
        const res = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: text,
            source: 'conversalab-landing',
            page: 'home',
            ts: new Date().toISOString(),
          }),
        });

        const reply = await parseN8nReply(res);
        setIsBotTyping(false);
        setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
        return;
      }
    } catch {
      // fall back below
    }

    await new Promise((r) => setTimeout(r, 500));
    const fallback = getBotReply(text);
    setIsBotTyping(false);
    setMessages((prev) => [...prev, { from: 'bot', text: fallback }]);
  };

  return (
    <div className="relative w-[420px] max-w-full">
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.45)] flex flex-col h-[560px] max-h-[75vh]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2563EB]/60 to-[#06B6D4]/40 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-white font-semibold">ConversaLab Assistant</p>
              <p className="text-white/60 text-xs">Respondiendo en segundos</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white/25" />
            <span className="w-2 h-2 rounded-full bg-white/25" />
            <span className="w-2 h-2 rounded-full bg-white/25" />
          </div>
        </div>

        <div ref={messagesRef} className="px-5 py-5 space-y-3 flex-1 overflow-y-auto">
          {(isInteractive ? messages : (chatScenarios[scenarioIndex] ?? chatScenarios[0]).slice(0, visibleCount)).map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'} animate-fade-up`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  m.from === 'user'
                    ? 'bg-gradient-to-r from-[#2563EB]/85 to-[#06B6D4]/75 text-white'
                    : 'bg-white/10 text-white/90 border border-white/10'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isBotTyping && (
            <div className="flex justify-start animate-fade-up">
              <div className="rounded-2xl px-4 py-3 text-sm bg-white/10 text-white/90 border border-white/10">
                <TypingDots />
              </div>
            </div>
          )}
        </div>

        <div className="px-5 pb-5 shrink-0">
          <div className="flex flex-col gap-3 mb-3">
            <button
              type="button"
              onClick={activateInteractive}
              className="relative overflow-hidden rounded-2xl px-4 py-3 text-left border border-white/15 bg-white/[0.06] hover:bg-white/[0.10] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#2563EB]/70 to-[#06B6D4]/55 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="leading-tight">
                  <p className="text-white font-semibold">Haz una pregunta al asistente</p>
                  <p className="text-white/60 text-xs">Ej: precios, WhatsApp, automatización, tiempos</p>
                </div>
              </div>
              <div className="pointer-events-none absolute -inset-x-10 -bottom-8 h-20 bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-6" />
            </button>

            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => {
                    activateInteractive();
                    setDraft(q);
                  }}
                  className="rounded-full px-3 py-1.5 text-xs font-medium border border-white/15 bg-white/[0.04] text-white/80 hover:text-white hover:bg-white/[0.10] transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3"
          >
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white/80 text-sm placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/30"
              placeholder="Escribe tu pregunta..."
              aria-label="Escribe tu pregunta"
            />
            <button
              type="submit"
              className="shrink-0 rounded-2xl px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#2563EB]/90 to-[#06B6D4]/80 hover:from-[#06B6D4]/90 hover:to-[#2563EB]/85 transition-all"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const showSocialProof = false;
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = typingTexts[currentTextIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex]);

  const handleCalendlyClick = () => {
    window.open('https://calendly.com/conversalab25/30min?back=1&month=2026-02', '_blank');
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0C1220]" />

      {/* Lift overlay (keeps premium but less dark) */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(1200px 700px at 20% 30%, rgba(255,255,255,0.06), transparent 60%)' }} />

      {/* Aurora */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full aurora-blob aurora-blob-a" style={{ background: 'rgba(37, 99, 235, 0.42)' }} />
        <div className="absolute top-16 -right-24 w-[560px] h-[560px] rounded-full aurora-blob aurora-blob-b" style={{ background: 'rgba(6, 182, 212, 0.38)' }} />
        <div className="absolute -bottom-32 left-1/3 w-[620px] h-[620px] rounded-full aurora-blob aurora-blob-a" style={{ background: 'rgba(124, 58, 237, 0.26)' }} />
      </div>
      
      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid-very-soft" />

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 animate-float opacity-60">
        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <Bot className="w-8 h-8 text-cyan" />
        </div>
      </div>
      <div className="absolute top-1/3 right-20 animate-float-delayed opacity-60">
        <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <Zap className="w-7 h-7 text-blue-bright" />
        </div>
      </div>
      <div className="absolute bottom-1/3 left-1/4 animate-float opacity-50">
        <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-white space-y-8">
            {/* Main heading */}
            <h1 className="font-display font-bold leading-[1.05]" aria-label="Recupera Tu Tiempo, Multiplica Tus Resultados">
              <span
                className="block text-white text-5xl md:text-6xl lg:text-[72px] opacity-0 animate-fade-up"
                style={{ animationDelay: '0.1s' }}
              >
                Recupera Tu Tiempo,
              </span>
              <span
                className="block text-5xl md:text-6xl lg:text-[72px] bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent opacity-0 animate-fade-up"
                style={{ animationDelay: '0.25s' }}
              >
                Multiplica Tus Resultados
              </span>
            </h1>

            {/* Typing text */}
            <div className="h-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-xl md:text-2xl text-white/90 font-light">
                {displayText}
                <span className="inline-block w-0.5 h-6 bg-[#06B6D4] ml-1 opacity-90" style={{ animation: 'blink 1s step-end infinite' }} />
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button 
                onClick={handleCalendlyClick}
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 text-lg rounded-xl transition-all hover:scale-105 hover:shadow-lg"
              >
                Agenda Demo Gratis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-white/40 text-white bg-white/10 hover:bg-white/20 font-semibold px-8 py-6 text-lg rounded-xl backdrop-blur-sm shadow-lg shadow-black/20"
                onClick={() => document.getElementById('casos')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="mr-2 w-5 h-5" />
                Ver Casos de Éxito
              </Button>
            </div>

            {/* Social proof */}
            {showSocialProof && (
              <div className="flex items-center gap-4 pt-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 backdrop-blur-sm bg-white/10">
                    <img
                      src="/barberpaolo.webp"
                      alt="Cliente"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-white/30 to-white/10 border-2 border-white/20 backdrop-blur-sm"
                    />
                  ))}
                </div>
                <p className="text-white/80 text-sm">
                  <span className="font-semibold text-white">3</span> negocios automatizando con nosotros
                </p>
              </div>
            )}
          </div>

          {/* Right illustration */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square">
              {/* Chat mock */}
              <div className="absolute inset-0 flex items-center justify-center -translate-x-32">
                <ChatMock />
              </div>

              {/* Floating cards */}
              <div className="absolute top-10 -left-24 float-soft-delayed">
                <div className="rounded-2xl p-4 w-48 bg-white/[0.08] backdrop-blur-[12px] border border-white/[0.15] shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs">Automatizado</p>
                      <p className="text-white font-semibold">+85% Eficiencia</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-20 -right-5 float-soft">
                <div className="rounded-2xl p-4 w-52 bg-white/[0.08] backdrop-blur-[12px] border border-white/[0.15] shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan/20 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-cyan" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs">ROI Promedio</p>
                      <p className="text-white font-semibold">300% en 6 meses</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
            fill="hsl(210 40% 99%)"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
