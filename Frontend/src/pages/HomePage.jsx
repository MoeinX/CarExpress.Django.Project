import React, { useEffect, useState, useRef } from "react";
import {
  Anchor,
  ArrowLeft,
  ArrowRight,
  Check,
  Compass,
  FileCheck2,
  Search,
  ShieldCheck,
  Ship,
  Sparkles,
  Truck,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import BrandLogo from "../components/BrandLogo";
import { useLanguage } from "../components/LanguageContext";

const AnalogCounter = ({ end, suffix = "" }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();
    let frameId;
    const tick = () => {
      const progress = Math.min((Date.now() - startedAt) / 900, 1);
      setValue(Math.floor(end * progress));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [end]);

  return (
    <span className="font-en">
      {value}
      {suffix}
    </span>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const { t, isRtl } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const videoRef = useRef(null);
  const cardClass =
    "rounded-[2rem] border border-slate-200/80 bg-white/90 p-5 sm:p-7 shadow-xl shadow-slate-200/50 backdrop-blur-2xl transition-all duration-300 hover:border-amber-400/60 dark:border-amber-500/20 dark:bg-[#0d1b2e]/70 dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)] dark:hover:border-amber-400/40";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    [1250, "+", t("clearedVehicles")],
    [36, "h", t("clearanceRecord")],
    [100, "%", t("safetyGuarantee")],
  ];

  const stepsList = [
    {
      num: "01",
      title: t("step1Title"),
      desc: t("step1Desc"),
      icon: Anchor,
    },
    {
      num: "02",
      title: t("step2Title"),
      desc: t("step2Desc"),
      icon: Compass,
    },
    {
      num: "03",
      title: t("step3Title"),
      desc: t("step3Desc"),
      icon: Ship,
    },
    {
      num: "04",
      title: t("step4Title"),
      desc: t("step4Desc"),
      icon: FileCheck2,
    },
    {
      num: "05",
      title: t("step5Title"),
      desc: t("step5Desc"),
      icon: Truck,
    },
  ];

  const ports = [
    {
      title: t("dubai"),
      englishTitle: "Port Rashid, Dubai (Main Hub)",
      description: t("dubaiDesc"),
      image: "/assets/images/Dubai-P.jpg",
      highlight: true,
    },
    {
      title: t("sharjah"),
      englishTitle: "Sharjah & Jebel Ali Ports",
      description: t("sharjahDesc"),
      image: "/assets/images/Sharjah-P.jpg",
      highlight: false,
    },
    {
      title: t("abuDhabi"),
      englishTitle: "Destination Customs & Yards",
      description: t("abuDhabiDesc"),
      image: "/assets/images/Abu Dhabi-P.jpg",
      highlight: false,
    },
  ];

  const testimonials = [
    {
      name: t("client1Name"),
      car: "Porsche Macan GTS & Cayenne",
      quote: t("client1Quote"),
    },
    {
      name: t("client2Name"),
      car: "Mercedes-Benz G63 AMG",
      quote: t("client2Quote"),
    },
  ];

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-800 transition-colors duration-300 dark:bg-[#08101a] dark:text-slate-100 selection:bg-amber-500/30 selection:text-amber-700 dark:selection:text-amber-200 overflow-x-hidden">
      {/* Floating Header */}
      <header
        className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-2xl sm:rounded-3xl transition-all duration-300 ${
          scrolled
            ? "border border-slate-200/90 bg-white/95 py-2.5 sm:py-3 shadow-xl shadow-slate-200/50 backdrop-blur-2xl dark:border-amber-500/25 dark:bg-[#08101a]/90 dark:shadow-black/60"
            : "border border-slate-200/60 bg-white/80 py-3 sm:py-3.5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-[#08101a]/70"
        }`}
      >
        <div className="flex items-center justify-between px-3.5 sm:px-6">
          <BrandLogo />
          <nav className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <button
              onClick={() => navigate("/tracking")}
              className="flex items-center gap-1.5 sm:gap-2 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5b842] to-[#b38612] px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-black text-[#08101a] shadow-lg shadow-amber-500/20 transition-all duration-300 hover:scale-[1.03]"
            >
              <Search size={15} />
              <span className="hidden sm:inline">{t("tracking")}</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[75vh] sm:min-h-[85vh] flex items-center justify-center pt-20 sm:pt-28 pb-8 sm:pb-16 px-3 sm:px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-90 dark:opacity-80 scale-105 filter brightness-100 contrast-105 transition-opacity duration-700"
          >
            <source src="/assets/videos/hero.mp4" type="video/mp4" />
          </video>
          {/* Edge Vignette Overlays for smooth header/footer transition while keeping center 100% visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#f4f7fb]/60 via-transparent to-[#f4f7fb] dark:from-[#08101a]/60 dark:via-black/20 dark:to-[#08101a] pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[350px] w-[350px] rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center rounded-2xl sm:rounded-[2.5rem] border border-white/80 bg-white/65 sm:bg-white/75 p-4 sm:p-8 lg:p-10 shadow-2xl shadow-slate-900/10 backdrop-blur-md dark:border-amber-500/25 dark:bg-[#08101a]/65 sm:dark:bg-[#08101a]/75 dark:shadow-black/80">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-amber-500/40 bg-amber-50/90 dark:bg-amber-500/10 px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold text-amber-800 dark:text-amber-300 backdrop-blur-md mb-2.5 sm:mb-4 shadow-md">
            <Sparkles size={13} className="text-amber-600 dark:text-amber-400" />
            <span>{t("heroBadge")}</span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-black leading-tight sm:leading-[1.25] text-slate-900 dark:text-white tracking-tight">
            {t("heroTitle1")}
            <br />
            <span className="text-gold-gradient">{t("heroTitle2")}</span>
          </h1>

          <p className="mt-2.5 sm:mt-5 text-xs sm:text-base leading-6 sm:leading-8 text-slate-700 dark:text-slate-200 max-w-2xl font-medium">
            {t("heroSubtitle")}
          </p>

          <p className="mt-1.5 sm:mt-3 text-[11px] sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl font-medium hidden sm:block">
            {t("heroDirectDesc")}
          </p>

          {/* Hero Action CTA Buttons */}
          <div className="mt-4 sm:mt-8 flex flex-row items-center gap-2.5 sm:gap-3.5 w-full max-w-md justify-center">
            <button
              onClick={() => navigate("/tracking")}
              className="flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5b842] to-[#b38612] px-4 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-black text-[#08101a] shadow-xl shadow-amber-500/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-amber-500/40"
            >
              <Search size={16} />
              <span>{t("goToTracking")}</span>
              <ArrowIcon size={15} />
            </button>

            <a
              href="#process"
              className="flex flex-1 sm:flex-initial items-center justify-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl border border-slate-300 bg-white/90 dark:border-amber-500/30 dark:bg-[#0d1b2e]/90 px-3.5 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-bold text-slate-800 dark:text-white shadow-md backdrop-blur-xl transition-all duration-300 hover:border-amber-400 hover:bg-slate-50 dark:hover:bg-[#08101a]"
            >
              <Anchor size={15} className="text-amber-600 dark:text-amber-400" />
              <span>{t("exploreProcess")}</span>
            </a>
          </div>

          {/* Live Trust Notice */}
          <div className="mt-3.5 sm:mt-6 flex flex-wrap items-center justify-center gap-3 text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-amber-500 dark:text-amber-400" />
              {t("insuranceOversight")}
            </span>
          </div>
        </div>
      </section>

      {/* 5-Step Process Section */}
      <section id="process" className="relative py-12 sm:py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-800 dark:text-amber-300 mb-2.5">
            <Zap size={14} className="text-amber-600 dark:text-amber-400" />
            {t("processHeading")}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {t("processSub")}
          </h2>
        </div>

        {/* 5 Milestones Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {stepsList.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl border border-slate-200/80 bg-white/90 p-5 sm:p-6 shadow-xl shadow-slate-200/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-2xl dark:border-amber-500/20 dark:bg-[#0d1b2e]/70 dark:shadow-black/40 dark:hover:shadow-amber-500/10 text-start flex flex-col justify-between min-h-[220px] sm:min-h-[250px]"
              >
                <div className="absolute top-4 end-4 text-2xl sm:text-3xl font-black font-en text-slate-200 dark:text-white/5 group-hover:text-amber-500/30 transition-colors">
                  {step.num}
                </div>
                <div>
                  <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-gradient-to-br group-hover:from-[#d4af37] group-hover:to-[#b38612] group-hover:text-[#08101a] transition-all duration-300">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white leading-snug">
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs leading-5 sm:leading-6 text-slate-600 dark:text-slate-400 mt-2.5 font-medium">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Metrics & Counter Section */}
      <section className="relative py-8 sm:py-10 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {stats.map(([num, suf, label], i) => (
            <div
              key={i}
              className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-8 shadow-xl shadow-slate-200/40 backdrop-blur-xl text-center dark:border-amber-500/20 dark:bg-[#0d1b2e]/60 dark:shadow-black/40"
            >
              <div className="text-3xl sm:text-5xl font-black text-gold-gradient">
                <AnalogCounter end={num} suffix={suf} />
              </div>
              <p className="mt-2.5 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Hubs / Port Rashid Spotlight */}
      <section className="relative py-10 sm:py-14 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
            {t("ourNetwork")}
          </span>
          <h2 className="mt-1.5 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {t("strategicTerminals")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {ports.map((port, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-3xl border transition-all duration-300 hover:scale-[1.02] text-start ${
                port.highlight
                  ? "border-amber-400/80 shadow-2xl shadow-amber-500/10 bg-white dark:bg-[#0d1b2e]"
                  : "border-slate-200/80 bg-white/90 shadow-xl shadow-slate-200/40 dark:border-white/10 dark:bg-[#0d1b2e]/60 dark:shadow-black/30"
              }`}
            >
              <div className="relative h-44 sm:h-48 w-full overflow-hidden">
                <img
                  src={port.image}
                  alt={port.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-3 start-4 text-xs font-bold text-white font-en">
                  {port.englishTitle}
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {port.title}
                </h3>
                <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-300">
                  {port.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Commitments */}
      <section className="relative py-10 sm:py-14 px-4 max-w-7xl mx-auto">
        <div className={cardClass}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center text-start">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {t("ourPromise")}
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {t("promiseTitle")}
              </h2>
              <p className="mt-3 text-xs sm:text-sm leading-7 text-slate-600 dark:text-slate-300">
                {t("promiseSubtitle")}
              </p>
            </div>
            <div className="space-y-3.5">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 sm:p-5 dark:border-white/10 dark:bg-[#08101a]/70">
                <h4 className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white">
                  <Check size={18} className="text-amber-500 dark:text-amber-400 shrink-0" />
                  {t("service1Title")}
                </h4>
                <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-6">
                  {t("service1Desc")}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 sm:p-5 dark:border-white/10 dark:bg-[#08101a]/70">
                <h4 className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white">
                  <Check size={18} className="text-amber-500 dark:text-amber-400 shrink-0" />
                  {t("service2Title")}
                </h4>
                <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-6">
                  {t("service2Desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-10 sm:py-14 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {t("testimonialsTitle")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 sm:p-7 shadow-xl shadow-slate-200/40 backdrop-blur-xl text-start dark:border-amber-500/20 dark:bg-[#0d1b2e]/60 dark:shadow-black/30"
            >
              <p className="text-xs sm:text-sm leading-7 text-slate-700 dark:text-slate-200 italic font-medium">
                "{item.quote}"
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 dark:border-white/10 pt-4">
                <strong className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                  {item.name}
                </strong>
                <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 font-en">
                  {item.car}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative mt-12 border-t border-slate-200 bg-slate-100/90 text-slate-700 py-10 px-4 transition-colors duration-300 dark:border-amber-500/20 dark:bg-[#04080e] dark:text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-start">
          <div>
            <BrandLogo />
            <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-400 max-w-md">
              {t("footerDesc")}
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-1.5 text-xs font-bold">
            <span
              dangerouslySetInnerHTML={{ __html: t("contactPhone") }}
              dir="ltr"
              className="font-en text-amber-700 dark:text-amber-300"
            />
            <span dir="ltr" className="font-en text-slate-600 dark:text-slate-400">
              {t("contactEmail")}
            </span>
          </div>
        </div>
        <div className="mt-6 border-t border-slate-200 dark:border-white/5 pt-5 text-center text-[11px] text-slate-500 dark:text-slate-500">
          {t("allRightsReserved")}
        </div>
      </footer>
    </main>
  );
};

export default HomePage;

