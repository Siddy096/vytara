import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Users, Brain, Check, Star, ArrowRight, Menu, X, Shield, Zap, Activity, Clock, ChevronRight, Play
} from 'lucide-react';

export default function VytaraLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-slate-50 font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden">
      {/* colorful background blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute -top-20 -left-16 w-96 h-96 bg-gradient-to-tr from-sky-500/20 to-indigo-500/6 rounded-full blur-3xl mix-blend-screen" />
        <div className="absolute top-24 -right-12 w-[32rem] h-[32rem] bg-gradient-to-tr from-amber-400/18 to-orange-500/6 rounded-full blur-3xl mix-blend-screen" />
        <div className="absolute bottom-[-6rem] left-20 w-80 h-80 bg-emerald-400/8 rounded-full blur-2xl mix-blend-screen" />
      </div>

      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800 py-3' : 'bg-transparent py-5'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-6">
          <div className="flex items-center gap-3 basis-1/4">
            <button onClick={() => scrollTo('overview')} className="flex items-center gap-3 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-500/30 rounded">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-sky-500 to-sky-700 flex items-center justify-center shadow">
                <Star className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg md:text-xl font-bold tracking-tight">Vytara</span>
            </button>
          </div>

          <nav className="hidden md:flex justify-center gap-8 basis-2/4" aria-label="Primary">
            {['Mission','Features','Comparison','Pricing'].map(label => (
              <button
                key={label}
                onClick={() => scrollTo(label.toLowerCase())}
                className="text-sm text-slate-300 hover:text-slate-50 px-2 py-1 transition rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/20"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex justify-end gap-3 basis-1/4">
            <button className="text-sm text-slate-300 hover:text-slate-50 focus:outline-none px-3 py-1">Log In</button>
            <button className="px-4 py-2 rounded-full bg-amber-500 text-black font-bold shadow-md hover:scale-[1.02] transition focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/30">
              Get Started <ArrowRight className="w-4 h-4 inline ml-2" />
            </button>
          </div>

          <div className="md:hidden ml-auto">
            <button onClick={() => setIsMobileMenuOpen(v => !v)} className="p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/30">
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.2 }}
              className="md:hidden bg-neutral-900/95 border-t border-neutral-800"
            >
              <div className="px-4 py-4 space-y-3">
                {['Mission','Features','Comparison','Pricing'].map(label => (
                  <button key={label} onClick={() => scrollTo(label.toLowerCase())} className="w-full text-left py-2 text-slate-200">
                    {label}
                  </button>
                ))}
                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded text-slate-200 border border-neutral-800">Log in</button>
                  <button className="flex-1 py-2 rounded bg-amber-500 text-black font-bold">Get Started</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-28">
        {/* HERO */}
        <section id="overview" className="px-6 py-12 lg:py-20">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-4 bg-neutral-800/40 border border-neutral-700 px-4 py-2 rounded-full">
              <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse block" />
              <span className="text-sm text-slate-200 font-semibold">AI-Powered Health Companion</span>
            </div>

            <h1 className="font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-white to-amber-400"
                style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', lineHeight: 1.02 }}>
              <span className="block text-slate-50">Your Health's</span>
              <span className="block">Guiding Star</span>
            </h1>

            <p className="max-w-3xl mx-auto text-slate-300 mt-6 text-lg">
              A clear, secure dashboard for medical records + instant AI summaries. Big targets, readable text, and privacy-first design for families and elders.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold shadow-lg transform hover:scale-[1.02] transition focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/30">
                Start Free Trial <ChevronRight className="w-4 h-4 inline ml-2" />
              </button>
              <button className="w-full sm:w-auto px-6 py-3 rounded-full border border-neutral-700 text-slate-200 bg-neutral-800/60 font-semibold focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-500/20">
                <Play className="w-4 h-4 inline mr-2" /> Watch Demo
              </button>
            </div>

            {/* mockup card with colored glow */}
            <div className="mt-12">
              <div className="mx-auto max-w-4xl rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 relative">
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-sky-500/8 via-transparent to-amber-400/6 blur-[40px]" />
                <div className="w-full aspect-[16/9]">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80"
                    alt="Vytara screenshot preview"
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="absolute right-8 -bottom-12 hidden md:flex">
                  <div className="bg-white/6 border border-white/6 p-3 rounded-2xl shadow-lg backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-sky-500/20 flex items-center justify-center">
                        <Brain className="w-4 h-4 text-sky-300" />
                      </div>
                      <div className="text-sm font-semibold text-sky-200">AI Analysis</div>
                    </div>
                    <div className="text-xs text-slate-200">Instant summary ready</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS with color rings */}
        <section className="bg-neutral-900/30 border-y border-neutral-800">
          <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Active Users', value: '10k+', color: 'from-sky-400 to-indigo-500' },
              { label: 'Medical Records', value: '2.5M+', color: 'from-amber-400 to-orange-500' },
              { label: 'Uptime', value: '99.99%', color: 'from-emerald-300 to-emerald-500' },
              { label: 'Security', value: 'AES-256', color: 'from-violet-400 to-violet-600' },
            ].map((s,i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" aria-hidden>
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${s.color} text-black flex items-center justify-center shadow-inner font-bold`}>
                    <span className="text-sm">{s.value}</span>
                  </div>
                </div>
                <div className="text-xs md:text-sm text-slate-200 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* colorful features */}
        <section id="features" className="px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Complete Health OS</h2>
              <p className="text-slate-300 mt-2">Everything you need to manage your well-being.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: FileText, title: "Smart Vault", desc: "Upload reports and let AI organize them instantly.", accent: 'bg-sky-600/10 text-sky-400' },
                { icon: Zap, title: "Emergency Mode", desc: "One tap shares your location and vitals.", accent: 'bg-amber-500/10 text-amber-400' },
                { icon: Users, title: "Family Circle", desc: "Manage parents and kids in one account.", accent: 'bg-emerald-500/10 text-emerald-400' },
                { icon: Brain, title: "Dr. AI", desc: "Ask questions and get science-backed answers.", accent: 'bg-violet-400/10 text-violet-300' },
                { icon: Shield, title: "Bank-Grade Security", desc: "Encrypted for peace of mind.", accent: 'bg-cyan-400/10 text-cyan-300' },
                { icon: Clock, title: "Timeline View", desc: "Visualize your health journey.", accent: 'bg-indigo-500/10 text-indigo-300' },
              ].map((c,i) => (
                <div key={i} className="group p-6 rounded-2xl border border-neutral-700 bg-neutral-900/60 flex flex-col gap-4 hover:shadow-lg hover:scale-[1.01] transition">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${c.accent}`}>
                    <c.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-100">{c.title}</h3>
                    <p className="text-slate-300 mt-2 text-sm">{c.desc}</p>
                  </div>
                  <div><button className="text-sm text-sky-400 font-semibold">Learn more →</button></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING with accent bands */}
        <section id="pricing" className="px-6 py-12 bg-neutral-900/20">
          <div className="max-w-7xl mx-auto text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Simple Pricing</h2>
            <p className="text-slate-300 mt-2">Transparent plans — start free.</p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-700 text-center flex flex-col gap-4">
              <div className="h-1 w-12 mx-auto rounded-full bg-sky-500/60" />
              <h3 className="font-semibold text-slate-200">Basic</h3>
              <div className="text-2xl font-bold">Free</div>
              <ul className="text-sm text-slate-300 space-y-2">
                <li>50 Documents</li>
                <li>1 Profile</li>
              </ul>
              <button className="mt-auto py-2 rounded border border-neutral-700">Get Started</button>
            </div>

            <div className="relative p-6 rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-800 border border-amber-500/30 text-center transform scale-[1.02] shadow-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-3 py-1 rounded-full text-xs font-bold">Most Popular</div>
              <div className="h-1 w-16 mx-auto rounded-full bg-amber-400/80" />
              <h3 className="font-semibold text-slate-50 mt-4">Pro</h3>
              <div className="text-3xl font-bold mt-2">₹299<span className="text-sm text-slate-400">/mo</span></div>
              <ul className="text-sm text-slate-200 space-y-2 mt-3">
                <li>Unlimited storage</li>
                <li>Priority AI analysis</li>
              </ul>
              <button className="mt-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold">Start Trial</button>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-700 text-center flex flex-col gap-4">
              <div className="h-1 w-12 mx-auto rounded-full bg-emerald-400/60" />
              <h3 className="font-semibold text-slate-200">Family</h3>
              <div className="text-2xl font-bold">₹499</div>
              <ul className="text-sm text-slate-300 space-y-2">
                <li>Up to 6 profiles</li>
                <li>Shared vault</li>
              </ul>
              <button className="mt-auto py-2 rounded border border-neutral-700">Contact Sales</button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="px-6 py-10 border-t border-neutral-800">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-6 h-6 text-sky-500" />
                <span className="text-lg font-bold">Vytara</span>
              </div>
              <p className="text-slate-400 max-w-sm">Your health, illuminated. Privacy-first and family-friendly.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Product</h4>
              <ul className="text-slate-400 space-y-2 text-sm">
                <li>Features</li>
                <li>Pricing</li>
                <li>Security</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Company</h4>
              <ul className="text-slate-400 space-y-2 text-sm">
                <li>About</li>
                <li>Contact</li>
                <li>Privacy</li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-8 pt-6 text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} Vytara Health Inc.
          </div>
        </footer>
      </main>
    </div>
  );
}
