import React, { useEffect, useState } from "react";
import {
  Anchor,
  ArrowLeft,
  ArrowRight,
  Check,
  Search,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useLanguage } from "../components/LanguageContext";

const ThemeAwareLogo = () => {
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <img
      src={
        darkMode
          ? "/assets/images/Logo-Dark.png"
          : "/assets/images/Logo-Light.png"
      }
      alt="CarExpress"
      className="h-9 w-auto object-contain"
    />
  );
};

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
  const glass =
    "rounded-[1.75rem] border border-white/60 bg-white/55 p-7 shadow-[0_20px_60px_rgba(38,56,75,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/45 dark:shadow-black/20";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    [850, "+", t("clearedVehicles")],
    [48, "h", t("clearanceRecord")],
    [100, "%", t("safetyGuarantee")],
  ];

  const ports = [
    {
      title: t("dubai"),
      englishTitle: "Jebel Ali Port",
      description: t("dubaiDesc"),
      image: "/assets/images/Dubai-P.jpg",
    },
    {
      title: t("sharjah"),
      englishTitle: "Port Khalid",
      description: t("sharjahDesc"),
      image: "/assets/images/Sharjah-P.jpg",
    },
    {
      title: t("abuDhabi"),
      englishTitle: "Khalifa Port",
      description: t("abuDhabiDesc"),
      image: "/assets/images/Abu Dhabi-P.jpg",
    },
  ];

  const testimonials = [
    {
      name: t("client1Name"),
      car: "Porsche Macan",
      quote: t("client1Quote"),
    },
    {
      name: t("client2Name"),
      car: "BMW 7 Series",
      quote: t("client2Quote"),
    },
  ];

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#e8eef2] text-[#1c2b38] transition-colors duration-500 dark:bg-[#101a24] dark:text-white">
      <nav
        className={`fixed inset-x-0 top-0 z-50 px-4 transition-all sm:px-8 ${scrolled ? "py-3" : "py-5"}`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 backdrop-blur-2xl sm:px-6 ${scrolled ? "border-white/70 bg-white/70 shadow-lg dark:border-white/10 dark:bg-slate-900/70" : "border-white/30 bg-white/10"}`}
        >
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3"
            aria-label={t("home")}
          >
            <ThemeAwareLogo />
          </button>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => navigate("/tracking")}
              className="flex items-center gap-2 rounded-full bg-[#e85d3f] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#e85d3f]/25 transition hover:bg-[#d94b31]"
            >
              <Search size={17} />
              <span>{t("vehicleInquiry")}</span>
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative flex min-h-[720px] items-end overflow-hidden pb-20 pt-32 sm:min-h-[790px] sm:pb-28">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/assets/images/Logo-Light.png"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/assets/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(12,29,42,.94),rgba(12,29,42,.48)_52%,rgba(12,29,42,.2))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,160,122,.3),transparent_28%)]" />
          <div className="relative z-10 mx-auto grid w-full max-w-7xl items-end gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
            <div className="max-w-2xl text-start text-white">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#ffad7a]" />{" "}
                {t("heroBadge")}
              </span>
              <h1 className="text-4xl font-extrabold leading-[1.25] tracking-tight sm:text-6xl">
                {t("heroTitle1")}
                <br />
                <span className="text-[#ffad7a]">{t("heroTitle2")}</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
                {t("heroSubtitle")}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate("/tracking")}
                  className="flex items-center gap-2 rounded-full bg-[#e85d3f] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#d94b31]"
                >
                  {t("trackShipment")} <ArrowIcon size={18} />
                </button>
                <a
                  href="#services"
                  className="rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  {t("exploreServices")}
                </a>
              </div>
            </div>
            <div className={`${glass} hidden text-white lg:block`}>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#ffbf9d]">
                {t("expressStandard")}
              </p>
              <p className="mt-5 text-2xl font-bold leading-relaxed">
                {t("expressStandardDesc")}
              </p>
              <div className="mt-7 flex items-center gap-3 border-t border-white/20 pt-5 text-sm text-white/70">
                <Check size={17} className="text-[#ffbf9d]" />{" "}
                {t("insuranceOversight")}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-20 mx-auto -mt-9 max-w-7xl px-5 sm:px-8">
          <div
            className={`${glass} grid grid-cols-1 gap-7 py-6 sm:grid-cols-3`}
          >
            {stats.map(([number, suffix, label]) => (
              <div
                key={label}
                className="border-b border-[#1c2b38]/10 text-center last:border-0 sm:border-b-0 sm:border-s sm:last:border-s-0 sm:first:border-s-0"
              >
                <strong className="font-en text-3xl font-extrabold text-[#e85d3f]">
                  <AnalogCounter end={number} suffix={suffix} />
                </strong>
                <p className="mt-1 text-sm font-bold text-[#526473] dark:text-slate-300">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="mb-12 max-w-xl">
            <span className="font-en text-xs font-bold uppercase tracking-[.2em] text-[#e85d3f]">
              {t("ourPromise")}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              {t("promiseTitle")}
            </h2>
            <p className="mt-4 leading-8 text-[#526473] dark:text-slate-400">
              {t("promiseSubtitle")}
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className={glass}>
              <ShieldCheck size={34} className="text-[#e85d3f]" />
              <h3 className="mt-6 text-xl font-extrabold">
                {t("service1Title")}
              </h3>
              <p className="mt-3 leading-8 text-[#526473] dark:text-slate-400">
                {t("service1Desc")}
              </p>
            </div>
            <div className={glass}>
              <Zap size={34} className="text-[#e85d3f]" />
              <h3 className="mt-6 text-xl font-extrabold">
                {t("service2Title")}
              </h3>
              <p className="mt-3 leading-8 text-[#526473] dark:text-slate-400">
                {t("service2Desc")}
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-white/70 bg-white/25 py-24 dark:border-white/10 dark:bg-white/[.03]">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-12 text-center">
              <span className="font-en text-xs font-bold uppercase tracking-[.2em] text-[#e85d3f]">
                {t("ourNetwork")}
              </span>
              <h2 className="mt-3 text-3xl font-extrabold">
                {t("strategicTerminals")}
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {ports.map((port) => (
                <div
                  key={port.title}
                  className={`${glass} group overflow-hidden p-0 transition hover:-translate-y-1`}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={port.image}
                      alt={port.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#102238]/70 to-transparent" />
                  </div>
                  <div className="p-7">
                    <Anchor size={24} className="text-[#e85d3f]" />
                    <h3 className="mt-6 text-xl font-extrabold">{port.title}</h3>
                    <p
                      className="mt-1 font-en text-xs font-bold text-[#e85d3f]"
                      dir="ltr"
                    >
                      {port.englishTitle}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[#526473] dark:text-slate-400">
                      {port.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold">{t("testimonialsTitle")}</h2>
          </div>
          <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
            {testimonials.map((item) => (
              <div key={item.name} className={glass}>
                <div className="mb-5 text-[#e85d3f]">★★★★★</div>
                <p className="leading-8 text-[#526473] dark:text-slate-300">
                  «{item.quote}»
                </p>
                <p className="mt-6 font-bold">{item.name}</p>
                <p className="font-en text-xs text-[#e85d3f]">{item.car}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/70 bg-white/35 py-12 dark:border-white/10 dark:bg-slate-950/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 text-sm text-[#526473] sm:px-8 md:flex-row md:items-center md:justify-between dark:text-slate-400">
          <div>
            <strong className="font-en text-xl text-[#1c2b38] dark:text-white">
              Car<span className="text-[#e85d3f]">Express</span>
            </strong>
            <p className="mt-2">{t("footerDesc")}</p>
          </div>
          <div className="font-en" dir="ltr">
            +971 50 123 4567 &nbsp; • &nbsp; support@carexpress.ir
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
