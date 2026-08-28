import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Anchor,
  CalendarDays,
  Check,
  Compass,
  Download,
  FileCheck2,
  FileText,
  MapPin,
  Search,
  ShieldCheck,
  Ship,
  Sparkles,
  Truck,
  X,
} from "lucide-react";

import api, { getApiError } from "../api";
import ThemeToggle from "../components/ThemeToggle";
import BrandLogo from "../components/BrandLogo";
import { useLanguage } from "../components/LanguageContext";

const normalizeDigits = (value = "") =>
  String(value)
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));

const fileUrl = (file) =>
  file?.startsWith("http") ? file : `${window.location.origin}${file || ""}`;

const STEP_ICONS = [Anchor, Compass, Ship, FileCheck2, Truck];

const TrackingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t, language, isRtl } = useLanguage();
  const [code, setCode] = useState(() => searchParams.get("code") || "");
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const executeSearch = useCallback(
    async (searchCode) => {
      const normalizedCode = normalizeDigits(searchCode).trim();
      if (!normalizedCode) return;
      setLoading(true);
      setError("");
      setShipment(null);
      try {
        const response = await api.get(
          `/tracking/${encodeURIComponent(normalizedCode)}/?lang=${language}`
        );
        setShipment(response.data);
      } catch (requestError) {
        setError(
          requestError?.response?.status === 404
            ? t("trackingNotFound")
            : getApiError(requestError, t("generalError"))
        );
      } finally {
        setLoading(false);
      }
    },
    [language, t]
  );

  useEffect(() => {
    const urlCode = searchParams.get("code");
    if (urlCode) {
      setCode(urlCode);
      executeSearch(urlCode);
    }
  }, [searchParams, executeSearch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    executeSearch(code);
  };

  const steps = shipment?.steps || [];
  const documents = shipment?.documents || [];

  const vehicleName = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
        {[shipment?.car_brand, shipment?.car_model].filter(Boolean).join(" ")}
      </h2>
      {shipment?.customer_name && (
        <span className="mt-2 block text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-300/90">
          {t("customerLabel")} {shipment.customer_name}
        </span>
      )}
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-800 transition-colors duration-300 dark:bg-[#08101a] dark:text-slate-100 pb-16 overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-3.5 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* Luxury Topbar */}
        <nav className="mb-6 flex items-center justify-between rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white/85 px-4 sm:px-6 py-3 backdrop-blur-2xl shadow-xl shadow-slate-200/40 dark:border-amber-500/20 dark:bg-[#0d1b2e]/70 dark:shadow-black/40">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-start"
            aria-label={t("home")}
          >
            <BrandLogo />
          </button>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <button
              onClick={() => navigate("/")}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
            >
              {t("home")}
            </button>
          </div>
        </nav>

        {/* Hero Header Banner */}
        <header className="relative mb-6 overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-amber-500/30 bg-gradient-to-br from-[#132742] via-[#0d1b2e] to-[#08101a] px-5 py-7 sm:px-10 sm:py-9 text-start text-white shadow-xl dark:shadow-black/60">
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-black text-amber-300 backdrop-blur-md">
              <Sparkles size={14} className="text-amber-400" />
              {t("trackingHeaderTag")}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight text-white">
              {t("trackingHeaderTitle1")}{" "}
              <span className="text-gold-gradient">{t("trackingHeaderTitle2")}</span>
            </h1>
            <p className="mt-3 text-xs sm:text-sm leading-6 sm:leading-7 text-slate-200">
              {t("trackingHeaderSubtitle")}
            </p>
          </div>
        </header>

        {/* Search Console Input with RTL/LTR responsive placeholder */}
        <form
          onSubmit={handleSubmit}
          className="mb-8 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/50 backdrop-blur-2xl dark:border-amber-500/30 dark:bg-[#0d1b2e]/90 dark:shadow-2xl sm:flex-row"
        >
          <div className="relative flex-1">
            <Search
              className={`absolute top-1/2 -translate-y-1/2 text-amber-500 dark:text-amber-400/80 ${
                isRtl ? "right-4" : "left-4"
              }`}
              size={20}
            />
            <input
              value={code}
              onChange={(event) => setCode(normalizeDigits(event.target.value))}
              dir={isRtl ? "rtl" : "ltr"}
              placeholder={t("trackingPlaceholder")}
              className={`w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-4 text-sm font-bold text-slate-900 placeholder-slate-400 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 dark:border-white/10 dark:bg-[#08101a]/90 dark:text-white dark:placeholder-slate-500 ${
                isRtl
                  ? "pr-12 pl-12 text-right placeholder:text-right"
                  : "pl-12 pr-12 text-left placeholder:text-left font-en"
              }`}
            />
            {code && (
              <button
                type="button"
                onClick={() => setCode("")}
                className={`absolute top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white ${
                  isRtl ? "left-4" : "right-4"
                }`}
              >
                <X size={15} />
              </button>
            )}
          </div>
          <button
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5b842] to-[#b38612] px-8 py-4 text-sm font-black text-[#08101a] shadow-lg shadow-amber-500/25 transition hover:scale-[1.02] disabled:opacity-50"
          >
            <Search size={17} />
            <span>{loading ? t("checking") : t("viewStatus")}</span>
          </button>
        </form>

        {/* Error Alert */}
        {error && (
          <div className="mb-8 flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-50 p-4 text-xs sm:text-sm font-bold text-red-700 dark:bg-red-950/40 dark:text-red-300 backdrop-blur-md">
            <span>{error}</span>
          </div>
        )}

        {/* Active Shipment Results */}
        {shipment && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Manifest Overview Card */}
            <section className="grid gap-6 lg:grid-cols-[1fr_300px]">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-8 backdrop-blur-2xl shadow-xl shadow-slate-200/50 dark:border-amber-500/25 dark:bg-[#0d1b2e]/80 dark:shadow-2xl text-start">
                <div className="mb-7 flex flex-col justify-between gap-4 border-b border-slate-100 dark:border-white/10 pb-6 sm:flex-row sm:items-center">
                  <div>
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                      {t("vehicleShipmentCase")}
                    </span>
                    {vehicleName}
                    <div className="mt-4 flex flex-wrap gap-2.5 text-xs">
                      <span
                        dir="ltr"
                        className="rounded-xl border border-amber-400/40 bg-amber-50 px-3 py-1 font-en font-black text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"
                      >
                        {shipment.tracking_code}
                      </span>
                      {shipment.build_year && (
                        <span className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 font-en font-bold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                          {t("modelYear")} {shipment.build_year}
                        </span>
                      )}
                      {shipment.color && (
                        <span className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 font-bold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                          {t("colorLabel")}: {shipment.color}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="inline-flex h-fit items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-50 px-4 py-2 text-xs font-black text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 shadow-md">
                    <ShieldCheck size={16} /> {t("activeCase")}
                  </span>
                </div>

                {/* Progress Metric */}
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t("currentStep")}
                    </span>
                    <strong className="mt-1.5 block text-lg sm:text-xl font-black text-gold-gradient">
                      {shipment.current_step?.title || t("awaitingStart")}
                    </strong>
                  </div>
                  <div className="text-end">
                    <strong className="font-en text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                      {shipment.progress || 0}
                      <small className="text-base text-amber-500 dark:text-amber-400 font-bold">%</small>
                    </strong>
                  </div>
                </div>

                {/* Shimmering Progress Bar */}
                <div className="mb-8 h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-[#08101a] border border-slate-200 dark:border-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5b842] to-emerald-400 transition-all duration-700 shadow-lg shadow-amber-500/30"
                    style={{ width: `${shipment.progress || 0}%` }}
                  />
                </div>

                {/* 5-Step Timeline Grid */}
                <div className="grid gap-3.5 sm:grid-cols-1">
                  {steps.map((step, idx) => {
                    const StepIcon = STEP_ICONS[idx] || Anchor;
                    const isCompleted = step.status === "completed";
                    const isCurrent = step.status === "current";

                    return (
                      <div
                        key={step.id}
                        className={`flex items-start gap-4 rounded-2xl border p-4 transition-all duration-300 ${
                          isCurrent
                            ? "border-amber-400/80 bg-amber-50/70 dark:border-amber-400/60 dark:bg-amber-500/10 shadow-lg shadow-amber-500/10"
                            : isCompleted
                            ? "border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-950/20"
                            : "border-slate-200 bg-slate-50/60 dark:border-white/10 dark:bg-[#08101a]/50 opacity-75"
                        }`}
                      >
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-xs font-black shadow-md ${
                            isCompleted
                              ? "bg-emerald-500 text-white shadow-emerald-500/20"
                              : isCurrent
                              ? "bg-gradient-to-r from-[#d4af37] to-[#e5b842] text-[#08101a] shadow-amber-500/30 animate-pulse"
                              : "bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400"
                          }`}
                        >
                          {isCompleted ? <Check size={18} /> : <StepIcon size={18} />}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <strong className="text-sm font-black text-slate-900 dark:text-white">
                              {step.title}
                            </strong>
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[10px] font-black ${
                                isCompleted
                                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300"
                                  : isCurrent
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-400/20 dark:text-amber-300"
                                  : "bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-slate-400"
                              }`}
                            >
                              {isCompleted
                                ? t("completed")
                                : isCurrent
                                ? t("currentStep")
                                : t("pending")}
                            </span>
                          </div>
                          <span className="mt-1 block text-xs text-slate-600 dark:text-slate-300">
                            {step.description}
                          </span>
                          {step.date && (
                            <span className="mt-1.5 inline-block font-en text-[11px] font-bold text-amber-700 dark:text-amber-300/80" dir="ltr">
                              {step.date}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar Route Summary */}
              <aside className="flex flex-col justify-between rounded-[2rem] border border-amber-500/30 bg-gradient-to-br from-[#132742] via-[#0d1b2e] to-[#08101a] p-6 sm:p-7 text-white shadow-2xl text-start">
                <div>
                  <span className="mb-6 block text-xs font-black uppercase tracking-wider text-amber-400">
                    {t("routeSummary")}
                  </span>
                  <div className="space-y-6">
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <small className="block text-[11px] font-bold text-slate-300">
                          {t("origin")}
                        </small>
                        <strong className="mt-0.5 block text-sm font-black text-white">
                          {shipment.origin}
                        </strong>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <small className="block text-[11px] font-bold text-slate-300">
                          {t("destination")}
                        </small>
                        <strong className="mt-0.5 block text-sm font-black text-white">
                          {shipment.destination}
                        </strong>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                        <CalendarDays size={18} />
                      </div>
                      <div>
                        <small className="block text-[11px] font-bold text-slate-300">
                          {t("estimatedDelivery")}
                        </small>
                        <strong className="mt-0.5 block text-sm font-black text-gold-gradient">
                          {shipment.estimated_arrival || t("underReview")}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs leading-6 text-amber-200/90">
                  {t("expressStandardDesc")}
                </div>
              </aside>
            </section>

            {/* Official Registered Documents */}
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-8 backdrop-blur-2xl shadow-xl shadow-slate-200/50 dark:border-amber-500/25 dark:bg-[#0d1b2e]/80 dark:shadow-2xl text-start">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="flex items-center gap-2 text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                    <FileText className="text-amber-500 dark:text-amber-400" size={22} />
                    {t("caseDocuments")}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {t("caseDocumentsSub")}
                  </p>
                </div>
                <span className="rounded-xl border border-amber-400/40 bg-amber-50 px-3 py-1.5 text-xs font-black text-amber-700 dark:bg-amber-500/10 dark:text-amber-300 font-en">
                  {documents.length} {t("filesCount")}
                </span>
              </div>

              {documents.length ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {documents.map((doc) => (
                    <a
                      key={doc.id}
                      href={fileUrl(doc.file)}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:border-amber-400 hover:bg-amber-50/70 hover:shadow-md dark:border-amber-500/20 dark:bg-[#08101a]/70 dark:hover:border-amber-400 dark:hover:bg-amber-500/10 dark:hover:shadow-amber-500/10"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 group-hover:bg-amber-400 group-hover:text-[#08101a] transition-all">
                          <FileText size={20} />
                        </span>
                        <div className="min-w-0 truncate">
                          <strong className="block truncate text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                            {doc.title}
                          </strong>
                          <span className="mt-0.5 block text-[11px] text-slate-500 dark:text-slate-400">
                            {t("viewOrDownload")}
                          </span>
                        </div>
                      </div>
                      <Download
                        size={18}
                        className="shrink-0 text-slate-400 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors"
                      />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-xs sm:text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
                  {t("noDocuments")}
                </p>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
};

export default TrackingPage;


