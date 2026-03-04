import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   SITE MAP (Telugu) — for reference
   ──────────────────────────────────────────────
   1. హోమ్ పేజ్ (Home)
   2. మా గురించి (About Us)
   3. సేవలు (Services)
      └─ ప్రిసిషన్ డ్రోన్ స్ప్రేయింగ్
      └─ లక్ష్య సారథి – పైలట్ శిక్షణ
      └─ హార్డ్‌వేర్ & టెక్నాలజీ
   4. ప్రయోజనాలు (Benefits)
   5. ఎలా పని చేస్తుంది (How It Works)
   6. ధర వివరాలు (Pricing)
   7. సంప్రదించండి (Contact Us)
   ─────────────────────────────────────────────── */

const NAV_LINKS = [
  { te: "హోమ్", en: "Home", href: "#hero" },
  { te: "మా గురించి", en: "About", href: "#about" },
  { te: "సేవలు", en: "Services", href: "#services" },
  { te: "ప్రయోజనాలు", en: "Benefits", href: "#benefits" },
  { te: "ఎలా పని చేస్తుంది", en: "How It Works", href: "#how" },
  { te: "సంప్రదించండి", en: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: "🚁",
    te_title: "ప్రిసిషన్ డ్రోన్ స్ప్రేయింగ్",
    en_title: "Precision Drone Spraying",
    te_desc:
      "యూరియా స్ప్లిట్టింగ్, పురుగుమందుల పిచికారీ మరియు ద్రావక పోషకాల పంపిణీ – 30L హై-పేలోడ్ డ్రోన్లతో అతి తక్కువ సమయంలో ఎకరాల పొలాన్ని కవర్ చేస్తాం.",
    en_desc: "Urea splitting, pesticide & nutrient spraying with 30L drones.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: "🎓",
    te_title: "లక్ష్య సారథి – పైలట్ శిక్షణ",
    en_title: "Lakshya Saarthi – Pilot Training & Hiring",
    te_desc:
      "DGCA అనుమతి పొందిన శిక్షణ కోర్సులు. గ్రామీణ యువతకు డ్రోన్ పైలట్ అవకాశం – ఉద్యోగం మరియు స్వావలంబన రెండూ.",
    en_desc: "DGCA-approved training & employment for rural drone pilots.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: "⚙️",
    te_title: "హార్డ్‌వేర్ నిపుణత",
    en_title: "Hardware Expertise",
    te_desc:
      "JIYI K3A ఆటోపైలట్ కంట్రోలర్లు, Hobbywing X8 ప్రొపల్షన్ సిస్టమ్స్ తో అత్యాధునిక వ్యవసాయ డ్రోన్లు నిర్మించడం మరియు సర్వీసింగ్.",
    en_desc: "JIYI K3A controllers, Hobbywing X8 propulsion, drone assembly.",
    color: "from-amber-500 to-orange-600",
  },
];

const BENEFITS = [
  { num: "95%", te: "నీటి ఆదా", en: "Water Saved", icon: "💧" },
  { num: "10×", te: "వేగంగా పని పూర్తి", en: "Faster Coverage", icon: "⚡" },
  { num: "60%", te: "కూలీ ఖర్చు తగ్గింపు", en: "Labour Cost Cut", icon: "💰" },
  { num: "0", te: "రసాయన సంపర్కం లేదు", en: "Chemical Exposure", icon: "🛡️" },
];

const STEPS = [
  { num: "01", te: "యాప్ డౌన్‌లోడ్ చేయండి", en: "Download App", icon: "📱" },
  { num: "02", te: "నమోదు చేసుకోండి", en: "Register", icon: "📝" },
  { num: "03", te: "సేవ బుక్ చేయండి", en: "Book Service", icon: "📅" },
  { num: "04", te: "విశ్రాంతి తీసుకోండి!", en: "Relax & Watch", icon: "😌" },
];

// ── Utility ──────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Drone SVG ─────────────────────────────────
function DroneSVG({ className = "" }) {
  return (
    <svg viewBox="0 0 320 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Arms */}
      <line x1="160" y1="80" x2="60" y2="40" stroke="#34d399" strokeWidth="6" strokeLinecap="round"/>
      <line x1="160" y1="80" x2="260" y2="40" stroke="#34d399" strokeWidth="6" strokeLinecap="round"/>
      <line x1="160" y1="80" x2="60" y2="120" stroke="#34d399" strokeWidth="6" strokeLinecap="round"/>
      <line x1="160" y1="80" x2="260" y2="120" stroke="#34d399" strokeWidth="6" strokeLinecap="round"/>
      {/* Motors */}
      {[[50,35],[270,35],[50,125],[270,125]].map(([cx,cy],i)=>(
        <g key={i}>
          <circle cx={cx} cy={cy} r="16" fill="#0f172a" stroke="#34d399" strokeWidth="2"/>
          <ellipse cx={cx} cy={cy} rx="28" ry="6" fill="#34d399" opacity="0.25"/>
          <ellipse cx={cx} cy={cy} rx="28" ry="6" fill="none" stroke="#34d399" strokeWidth="1.5" strokeDasharray="4 4"/>
        </g>
      ))}
      {/* Body */}
      <rect x="140" y="60" width="40" height="40" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
      <rect x="148" y="68" width="24" height="14" rx="4" fill="#3b82f6" opacity="0.6"/>
      {/* Tank */}
      <rect x="150" y="85" width="20" height="12" rx="4" fill="#0ea5e9" opacity="0.8"/>
      {/* Spray */}
      {[155,160,165].map(x=>(
        <line key={x} x1={x} y1="97" x2={x-2} y2="118" stroke="#7dd3fc" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      ))}
      {/* GPS */}
      <circle cx="160" cy="62" r="4" fill="#facc15"/>
    </svg>
  );
}

// ── NAVBAR ────────────────────────────────────
function Navbar({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-slate-900/95 shadow-lg backdrop-blur-md" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-lg leading-none">L</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-white font-bold text-sm leading-tight tracking-wide" style={{fontFamily:"'Noto Serif Telugu', serif"}}>లక్ష్య రైతు డ్రోన్స్</div>
            <div className="text-emerald-400 text-[10px] tracking-widest uppercase font-medium">& Technologies Pvt Ltd</div>
          </div>
        </a>
        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(l => (
            <a key={l.en} href={l.href}
              className="px-3 py-1.5 text-slate-300 hover:text-emerald-400 transition-colors text-sm font-medium rounded-lg hover:bg-white/5"
              style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>
              {lang === "te" ? l.te : l.en}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {/* Lang toggle */}
          <button onClick={() => setLang(l => l === "te" ? "en" : "te")}
            className="px-3 py-1 rounded-full border border-emerald-500/50 text-emerald-400 text-xs font-bold hover:bg-emerald-500/10 transition-colors">
            {lang === "te" ? "EN" : "తె"}
          </button>
          <a href="#contact"
            className="hidden sm:flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:shadow-emerald-500/30 hover:shadow-lg transition-all"
            style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>
            {lang === "te" ? "బుక్ చేయండి" : "Book Now"}
          </a>
          <button className="lg:hidden text-white p-1" onClick={() => setMobileOpen(o => !o)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-slate-900/98 backdrop-blur-md border-t border-white/10 px-4 py-3 space-y-1">
          {NAV_LINKS.map(l => (
            <a key={l.en} href={l.href} onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-slate-300 hover:text-emerald-400 rounded-lg hover:bg-white/5 text-sm"
              style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>
              {lang === "te" ? l.te : l.en}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── HERO ──────────────────────────────────────
function Hero({ lang }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setCount(1), 400);
    return () => clearTimeout(t);
  }, []);
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* BG gradient mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl"/>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl"/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-900/10 rounded-full blur-3xl"/>
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage:"linear-gradient(#34d39933 1px,transparent 1px),linear-gradient(90deg,#34d39933 1px,transparent 1px)",backgroundSize:"60px 60px"}}/>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-32 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className={`transition-all duration-1000 ${count ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"/>
            <span className="text-emerald-400 text-xs font-semibold tracking-widest uppercase">Andhra Pradesh & Telangana</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4"
            style={{fontFamily:"'Noto Serif Telugu', serif"}}>
            {lang === "te" ? (
              <>లక్ష్య డ్రోన్‌తో <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">స్మార్ట్ వ్యవసాయం</span> చేయండి</>
            ) : (
              <>Farm Smarter with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Lakshya Drones</span></>
            )}
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl"
            style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>
            {lang === "te"
              ? "మీ పొలంలో 95% నీరు ఆదా చేస్తూ, కూలీ ఖర్చు తగ్గిస్తూ, రసాయనాల సంపర్కం లేకుండా – ఆధునిక డ్రోన్ సాంకేతిక పరిజ్ఞానంతో రైతుల జీవితాన్ని మెరుగుపరుద్దాం."
              : "Cut costs, save water, and protect yourself from chemicals — with precision drone spraying across AP & Telangana."}
          </p>

          <div className="flex flex-wrap gap-3">
            <a href="#contact"
              className="group flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-7 py-3.5 rounded-full text-base font-bold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/50 hover:scale-105 transition-all"
              style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>
              {lang === "te" ? "స్ప్రేయింగ్ బుక్ చేయండి" : "Book Spraying Now"}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            <a href="#how"
              className="flex items-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-full text-base font-semibold hover:bg-white/5 transition-all"
              style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>
              {lang === "te" ? "ఎలా పని చేస్తుంది?" : "How It Works"}
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-12 flex flex-wrap gap-6">
            {[["500+", lang==="te"?"ఎకరాల సేవ":"Acres Served"], ["30L", lang==="te"?"హై-పేలోడ్ డ్రోన్":"Hi-Payload Drone"], ["DGCA", lang==="te"?"సర్టిఫైడ్":"Certified"]].map(([v,l]) => (
              <div key={v} className="text-center">
                <div className="text-2xl font-black text-emerald-400">{v}</div>
                <div className="text-xs text-slate-400 mt-0.5" style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Drone visual */}
        <div className={`relative flex items-center justify-center transition-all duration-1000 delay-300 ${count ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <div className="relative w-full max-w-md">
            {/* Glow ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 rounded-full border border-emerald-500/20 animate-ping" style={{animationDuration:"3s"}}/>
              <div className="absolute w-56 h-56 rounded-full border border-teal-500/30"/>
              <div className="absolute w-40 h-40 rounded-full bg-emerald-900/20"/>
            </div>
            {/* Drone SVG */}
            <div className="relative z-10 animate-bounce" style={{animationDuration:"4s"}}>
              <DroneSVG className="w-full h-56 drop-shadow-2xl"/>
            </div>
            {/* Floating badges */}
            <div className="absolute top-4 -right-4 bg-slate-800 border border-emerald-500/40 rounded-2xl p-3 shadow-xl animate-float">
              <div className="text-emerald-400 font-black text-xl">95%</div>
              <div className="text-slate-400 text-xs" style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>నీటి ఆదా</div>
            </div>
            <div className="absolute bottom-8 -left-4 bg-slate-800 border border-blue-500/40 rounded-2xl p-3 shadow-xl">
              <div className="text-blue-400 font-black text-xl">10×</div>
              <div className="text-slate-400 text-xs" style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>వేగంగా</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs animate-bounce">
        <span style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>{lang==="te"?"కింద చూడండి":"Scroll"}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </section>
  );
}

// ── ABOUT ─────────────────────────────────────
function About({ lang }) {
  const [ref, inView] = useInView();
  return (
    <section id="about" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-72 h-72 bg-teal-900/20 rounded-full blur-3xl pointer-events-none"/>
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-12"}`}>
        {/* Image placeholder */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 h-80 lg:h-96 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 to-blue-900/20"/>
          <div className="relative text-center p-8">
            <DroneSVG className="w-64 h-32 mx-auto mb-4 opacity-80"/>
            <div className="text-emerald-400 font-bold text-sm tracking-widest uppercase">Est. 2023 · Andhra Pradesh</div>
          </div>
          {/* Corner badge */}
          <div className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">DaaS Model</div>
        </div>

        {/* Text */}
        <div>
          <div className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">మా గురించి · About Us</div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight"
            style={{fontFamily:"'Noto Serif Telugu', serif"}}>
            {lang === "te" ? <>ధనలక్ష్మి అగ్రీడ్రోన్ నుండి <span className="text-emerald-400">లక్ష్య రైతు డ్రోన్స్</span> వరకు</> : <>From DaaS to <span className="text-emerald-400">Lakshya Rythu Drones</span></>}
          </h2>
          <div className="space-y-4 text-slate-300 leading-relaxed" style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>
            <p>
              {lang === "te"
                ? "మేము ప్రారంభించినది Dhanalakshmi Agridrone Services (DaaS) పేరుతో – ఒక చిన్న కల, పెద్ద సంకల్పంతో. ఆంధ్రప్రదేశ్ మరియు తెలంగాణ రైతులకు ఆధునిక వ్యవసాయ సాంకేతిక పరిజ్ఞానాన్ని అందుబాటులోకి తీసుకురావాలని."
                : "We started as Dhanalakshmi Agridrone Services (DaaS) — a small dream with a big mission: to bring precision agriculture technology to the farmers of Andhra Pradesh and Telangana."}
            </p>
            <p>
              {lang === "te"
                ? "నేడు మేము Lakshya Rythu Drones and Technologies Pvt Ltd గా విస్తరించాం. JIYI K3A ఆటోపైలట్ కంట్రోలర్లు మరియు Hobbywing X8 ప్రొపల్షన్ సిస్టమ్స్‌తో తయారుచేసిన 30L హై-పేలోడ్ డ్రోన్లు – ఇవి మా సాంకేతిక శక్తి."
                : "Today, as Lakshya Rythu Drones & Technologies Pvt Ltd, we operate high-payload 30L drones powered by JIYI K3A autopilot systems and Hobbywing X8 propulsion — purpose-built for Indian farmlands."}
            </p>
            <p>
              {lang === "te"
                ? "మా లక్ష్యం: ప్రతి రైతు చేతిలో సాంకేతిక పరిజ్ఞానం పెట్టడం. ప్రతి పంట పొలాన్ని స్మార్ట్‌గా నిర్వహించడం."
                : "Our mission: Put technology in every farmer's hands. Make every acre smarter."}
            </p>
          </div>
          {/* Values pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {(lang==="te"?["రైతు కేంద్రిత","స్వావలంబన","పర్యావరణ హితకరం","నవీన సాంకేతిక"]:["Farmer-First","Self-Reliant","Eco-Friendly","Tech-Driven"]).map(v => (
              <span key={v} className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium px-3 py-1 rounded-full"
                style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>{v}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SERVICES ──────────────────────────────────
function Services({ lang }) {
  const [ref, inView] = useInView();
  return (
    <section id="services" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-blue-900/15 rounded-full blur-3xl pointer-events-none"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={ref} className={`text-center mb-14 transition-all duration-700 ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          <div className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">సేవలు · Services</div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4"
            style={{fontFamily:"'Noto Serif Telugu', serif"}}>
            {lang==="te"?"మేము ఏ సేవలు అందిస్తాం?":"What We Offer"}
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto" style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>
            {lang==="te"?"వ్యవసాయ డ్రోన్ సేవల్లో సంపూర్ణ పరిష్కారం – పిచికారీ నుండి శిక్షణ వరకు.":"Complete agri-drone solutions — from spraying to training to hardware."}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <div key={i}
              className={`group relative bg-slate-900 border border-white/8 rounded-3xl p-7 hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-500 cursor-pointer overflow-hidden ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-12"}`}
              style={{transitionDelay:`${i*150}ms`}}>
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-5 transition-opacity rounded-3xl`}/>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl mb-5 shadow-lg`}>
                {s.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2" style={{fontFamily:"'Noto Serif Telugu', serif"}}>
                {lang==="te"?s.te_title:s.en_title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed" style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>
                {lang==="te"?s.te_desc:s.en_desc}
              </p>
              <div className="mt-5 flex items-center gap-1 text-emerald-400 text-sm font-semibold group-hover:gap-2 transition-all">
                {lang==="te"?"మరింత తెలుసుకోండి":"Learn More"}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── BENEFITS ──────────────────────────────────
function Benefits({ lang }) {
  const [ref, inView] = useInView();
  return (
    <section id="benefits" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-3xl"/>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={ref} className={`text-center mb-14 transition-all duration-700 ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          <div className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">ప్రయోజనాలు · Benefits</div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4"
            style={{fontFamily:"'Noto Serif Telugu', serif"}}>
            {lang==="te"?"డ్రోన్ స్ప్రేయింగ్ ఎందుకు ఎంచుకోవాలి?":"Why Choose Drone Spraying?"}
          </h2>
        </div>

        {/* Big stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {BENEFITS.map((b, i) => (
            <div key={i}
              className={`relative text-center bg-slate-800/60 border border-white/8 rounded-3xl p-6 hover:border-emerald-500/40 transition-all duration-500 ${inView?"opacity-100 scale-100":"opacity-0 scale-95"}`}
              style={{transitionDelay:`${i*100}ms`}}>
              <div className="text-4xl mb-3">{b.icon}</div>
              <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-teal-600 mb-2">{b.num}</div>
              <div className="text-white font-semibold text-sm" style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>{lang==="te"?b.te:b.en}</div>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className={`bg-slate-800/40 border border-white/8 rounded-3xl overflow-hidden transition-all duration-700 delay-300 ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          <div className="grid grid-cols-3 bg-slate-800 px-6 py-4">
            <div className="text-slate-400 text-sm font-medium" style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>{lang==="te"?"అంశం":"Factor"}</div>
            <div className="text-center">
              <span className="bg-red-900/40 text-red-400 text-xs font-bold px-3 py-1 rounded-full" style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>{lang==="te"?"సాంప్రదాయ పద్ధతి":"Traditional"}</span>
            </div>
            <div className="text-center">
              <span className="bg-emerald-900/40 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full" style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>{lang==="te"?"లక్ష్య డ్రోన్":"Lakshya Drone"}</span>
            </div>
          </div>
          {(lang==="te"?[
            ["నీటి వినియోగం","200 లీటర్లు/ఎకరం","8–10 లీటర్లు/ఎకరం"],
            ["సమయం","2–3 గంటలు/ఎకరం","10–15 నిమిషాలు/ఎకరం"],
            ["కూలీ ఖర్చు","₹800–1200/ఎకరం","₹300–450/ఎకరం"],
            ["రసాయన సంపర్కం","అధికం","సున్నా"],
          ]:[
            ["Water Usage","200 L/acre","8–10 L/acre"],
            ["Time","6–8 hrs/acre","10–15 min/acre"],
            ["Labour Cost","₹800–1200/acre","₹300–450/acre"],
            ["Chemical Exposure","High","Zero"],
          ]).map(([f, old, neo], i) => (
            <div key={i} className={`grid grid-cols-3 px-6 py-4 border-t border-white/5 ${i%2===0?"bg-slate-900/30":""}`}>
              <div className="text-slate-300 text-sm font-medium" style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>{f}</div>
              <div className="text-center text-red-400 text-sm">{old}</div>
              <div className="text-center text-emerald-400 text-sm font-bold">{neo}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── HOW IT WORKS ──────────────────────────────
function HowItWorks({ lang }) {
  const [ref, inView] = useInView();
  return (
    <section id="how" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute right-0 top-1/4 w-64 h-64 bg-teal-900/15 rounded-full blur-3xl pointer-events-none"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={ref} className={`text-center mb-14 transition-all duration-700 ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          <div className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">ప్రక్రియ · Process</div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4"
            style={{fontFamily:"'Noto Serif Telugu', serif"}}>
            {lang==="te"?"కేవలం 4 అడుగులు":"Just 4 Simple Steps"}
          </h2>
          <p className="text-slate-400" style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>
            {lang==="te"?"మీ పొలం సేవ పొందడం ఇంత సులభం.":"Getting your farm serviced is this easy."}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent hidden lg:block"/>
          {STEPS.map((s, i) => (
            <div key={i}
              className={`relative text-center bg-slate-900 border border-white/8 rounded-3xl p-7 hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-500 ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-12"}`}
              style={{transitionDelay:`${i*150}ms`}}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xs font-black shadow-lg shadow-emerald-500/30">
                {s.num}
              </div>
              <div className="text-5xl mt-4 mb-4">{s.icon}</div>
              <h3 className="text-white font-bold mb-1" style={{fontFamily:"'Noto Serif Telugu', serif"}}>{lang==="te"?s.te:s.en}</h3>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a href="#contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-full text-base font-bold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/50 hover:scale-105 transition-all"
            style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>
            {lang==="te"?"ఇప్పుడే ప్రారంభించండి →":"Get Started Now →"}
          </a>
        </div>
      </div>
    </section>
  );
}

// ── CONTACT / FOOTER ──────────────────────────
function Contact({ lang }) {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({name:"", phone:"", acres:"", msg:""});
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <section id="contact" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-emerald-900/15 rounded-full blur-3xl pointer-events-none"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={ref} className={`text-center mb-14 transition-all duration-700 ${inView?"opacity-100":"opacity-0"}`}>
          <div className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">సంప్రదించండి · Contact Us</div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4"
            style={{fontFamily:"'Noto Serif Telugu', serif"}}>
            {lang==="te"?"మీ పొలం సేవ బుక్ చేయండి":"Book Your Farm Service"}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div className={`bg-slate-800/60 border border-white/8 rounded-3xl p-8 transition-all duration-700 ${inView?"opacity-100 translate-x-0":"opacity-0 -translate-x-8"}`}>
            {sent ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-white text-xl font-bold mb-2" style={{fontFamily:"'Noto Serif Telugu', serif"}}>
                  {lang==="te"?"ధన్యవాదాలు!":"Thank You!"}
                </h3>
                <p className="text-slate-400" style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>
                  {lang==="te"?"మేము త్వరలో మిమ్మల్ని సంప్రదిస్తాం.":"We'll reach out to you soon."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  {id:"name", te:"మీ పేరు", en:"Your Name", type:"text"},
                  {id:"phone", te:"ఫోన్ నంబర్", en:"Phone Number", type:"tel"},
                  {id:"acres", te:"ఎకరాల సంఖ్య", en:"Number of Acres", type:"number"},
                ].map(f => (
                  <div key={f.id}>
                    <label className="text-slate-400 text-sm block mb-1" style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>{lang==="te"?f.te:f.en}</label>
                    <input type={f.type} value={form[f.id]}
                      onChange={e => setForm(p => ({...p, [f.id]: e.target.value}))}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/60 transition-colors"/>
                  </div>
                ))}
                <div>
                  <label className="text-slate-400 text-sm block mb-1" style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>{lang==="te"?"సందేశం (ఐచ్ఛికం)":"Message (Optional)"}</label>
                  <textarea rows={3} value={form.msg} onChange={e => setForm(p => ({...p, msg: e.target.value}))}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/60 transition-colors resize-none"/>
                </div>
                <button onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3.5 rounded-xl font-bold text-base hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all"
                  style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>
                  {lang==="te"?"సేవ బుక్ చేయండి ✈️":"Book Service ✈️"}
                </button>
              </div>
            )}
          </div>

          {/* Info */}
          <div className={`space-y-6 transition-all duration-700 delay-200 ${inView?"opacity-100 translate-x-0":"opacity-0 translate-x-8"}`}>
            <div className="bg-slate-800/40 border border-white/8 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2" style={{fontFamily:"'Noto Serif Telugu', serif"}}>
                <span className="text-emerald-400">📍</span>
                {lang==="te"?"కార్యాలయ వివరాలు":"Office Details"}
              </h3>
              <div className="space-y-2 text-slate-400 text-sm" style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>
                <p className="text-white font-semibold">Lakshya Rythu Drones and Technologies Pvt Ltd</p>
                <p>{lang==="te"?"ఆంధ్రప్రదేశ్, భారతదేశం":"Andhra Pradesh, India"}</p>
                <p className="text-emerald-400">📞 +91 9010616529</p>
                <p className="text-emerald-400">✉️ info@lakshyadrones.in</p>
              </div>
            </div>

            <div className="bg-slate-800/40 border border-white/8 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4" style={{fontFamily:"'Noto Serif Telugu', serif"}}>
                {lang==="te"?"మాతో అనుసరించండి":"Follow Us"}
              </h3>
              <div className="flex gap-3">
                {[
  {name:"LinkedIn", color:"bg-blue-600 hover:bg-blue-500", icon:"in", url:"https://www.linkedin.com/company/112710025/"},
  {name:"Instagram", color:"bg-gradient-to-br from-pink-500 to-orange-500 hover:from-pink-400 hover:to-orange-400", icon:"📸", url:"https://www.instagram.com/lakshya_rythu_drones/"},
  {name:"WhatsApp", color:"bg-green-600 hover:bg-green-500", icon:"💬", url:"https://wa.me/919010616529"},
].map(s => (
  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
    className={`${s.color} text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2`}>
    <span>{s.icon}</span>{s.name}
  </a>
))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/20 border border-emerald-500/20 rounded-2xl p-6 text-center">
              <div className="text-3xl mb-2">🌾</div>
              <p className="text-emerald-300 font-semibold" style={{fontFamily:"'Noto Serif Telugu', serif"}}>
                {lang==="te"?"మీ పంట మా బాధ్యత":"Your Crop, Our Responsibility"}
              </p>
              <p className="text-slate-400 text-sm mt-1" style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>
                {lang==="te"?"AP & Telangana అంతటా సేవలు":"Serving all of AP & Telangana"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────
function Footer({ lang }) {
  return (
    <footer className="bg-slate-950 border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
            <span className="text-white font-black">L</span>
          </div>
          <div>
            <div className="text-white font-bold text-sm" style={{fontFamily:"'Noto Serif Telugu', serif"}}>లక్ష్య రైతు డ్రోన్స్ & టెక్నాలజీస్</div>
            <div className="text-slate-500 text-xs">Pvt Ltd · Andhra Pradesh</div>
          </div>
        </div>
        <div className="text-slate-500 text-xs text-center" style={{fontFamily:"'Noto Sans Telugu', sans-serif"}}>
          {lang==="te"?"© 2025 లక్ష్య రైతు డ్రోన్స్. అన్ని హక్కులు సంరక్షితం.":"© 2025 Lakshya Rythu Drones. All rights reserved."}
        </div>
        <div className="text-slate-600 text-xs">DGCA Certified · Made in India 🇮🇳</div>
      </div>
    </footer>
  );
}

// ── APP ROOT ──────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("te");
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;600;700&family=Noto+Serif+Telugu:wght@700;900&display=swap" rel="stylesheet"/>
      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>

      <Navbar lang={lang} setLang={setLang}/>
      <Hero lang={lang}/>
      <About lang={lang}/>
      <Services lang={lang}/>
      <Benefits lang={lang}/>
      <HowItWorks lang={lang}/>
      <Contact lang={lang}/>
      <Footer lang={lang}/>
    </div>
  );
}
