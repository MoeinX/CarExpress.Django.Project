import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Check,
  Download,
  FileText,
  MapPin,
  Search,
  ShieldCheck,
} from "lucide-react";

import api, { getApiError } from "../api";
import ThemeToggle from "../components/ThemeToggle";
import { useLanguage } from "../components/LanguageContext";

const normalizeDigits = (value = "") =>
  String(value)
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));

const fileUrl = (file) =>
  file?.startsWith("http") ? file : `${window.location.origin}${file || ""}`;

const TrackingPage = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [code, setCode] = useState("");
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = async (event) => {
    event.preventDefault();
    const normalizedCode = normalizeDigits(code).trim();
    if (!normalizedCode) return;
    setLoading(true);
    setError("");
    setShipment(null);
    try {
      const response = await api.get(
        `/tracking/${encodeURIComponent(normalizedCode)}/?lang=${language}`,
      );
      setShipment(response.data);
    } catch (requestError) {
      setError(
        requestError?.response?.status === 404
          ? t("trackingNotFound")
          : getApiError(requestError, t("generalError")),
      );
    } finally {
      setLoading(false);
    }
  };

  const steps = shipment?.steps || [];
  const documents = shipment?.documents || [];
  const vehicleName = (
    <>
      <span className="font-bold">
        {[shipment?.car_brand, shipment?.car_model].filter(Boolean).join(" ")}
      </span>
      {shipment?.customer_name && (
        <span className="mt-2 block text-sm font-bold text-slate-500 dark:text-slate-300">
          {t("customerLabel")} {shipment.customer_name}
        </span>
      )}
    </>
  );

  return (
    <main className="min-h-screen bg-[#f5f7fa] text-[#102238] dark:bg-[#091827] dark:text-white">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-5 sm:px-6 lg:px-8">
        <nav className="mb-10 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="font-outfit text-2xl font-extrabold"
          >
            Car<span className="text-[#f36b21]">Express</span>
          </button>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </nav>
        <header className="mb-7 overflow-hidden rounded-[2rem] bg-[#102238] px-6 py-9 text-white shadow-2xl sm:px-10">
          <p className="mb-4 text-xs font-bold text-[#ffb17c]">
            {t("trackingHeaderTag")}
          </p>
          <h1 className="max-w-xl text-3xl font-extrabold leading-tight sm:text-5xl">
            {t("trackingHeaderTitle1")}
            <br />
            <span className="text-[#ff8b4d]">{t("trackingHeaderTitle2")}</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
            {t("trackingHeaderSubtitle")}
          </p>
        </header>
        <form
          onSubmit={search}
          className="mb-8 flex flex-col gap-3 rounded-3xl bg-white p-3 shadow-xl dark:bg-[#12283e] sm:flex-row"
        >
          <div className="relative flex-1">
            <Search
              className="absolute end-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={19}
            />
            <input
              value={code}
              onChange={(event) => setCode(normalizeDigits(event.target.value))}
              dir="ltr"
              placeholder={t("trackingPlaceholder")}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pe-12 ps-4 font-outfit font-bold outline-none focus:border-[#f36b21] dark:border-white/10 dark:bg-[#091827]"
            />
          </div>
          <button
            disabled={loading}
            className="rounded-2xl bg-[#f36b21] px-8 py-4 text-sm font-extrabold text-white disabled:opacity-60"
          >
            {loading ? t("checking") : t("viewStatus")}
          </button>
        </form>
        {error && (
          <p className="mb-6 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-600">
            {error}
          </p>
        )}
        {shipment && (
          <div className="space-y-6">
            <section className="grid gap-6 lg:grid-cols-[1fr_280px]">
              <div className="rounded-3xl bg-white p-6 shadow-lg dark:bg-[#12283e] sm:p-8">
                <div className="mb-7 flex flex-col justify-between gap-4 border-b border-slate-100 pb-6 dark:border-white/10 sm:flex-row">
                  <div>
                    <p className="mb-2 text-xs text-slate-400">
                      {t("vehicleShipmentCase")}
                    </p>
                    <h2 className="text-2xl font-extrabold">
                      {vehicleName}
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
                      <span dir="ltr" className="font-outfit font-bold">
                        {shipment.tracking_code}
                      </span>
                      {shipment.build_year && (
                        <span>
                          {t("modelYear")} {shipment.build_year}
                        </span>
                      )}
                      {shipment.color && <span>{shipment.color}</span>}
                    </div>
                  </div>
                  <span className="flex h-fit items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                    <ShieldCheck size={16} /> {t("activeCase")}
                  </span>
                </div>
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-slate-400">{t("currentStep")}</p>
                    <strong className="mt-1 block text-lg text-[#f36b21]">
                      {shipment.current_step?.title || t("awaitingStart")}
                    </strong>
                  </div>
                  <strong className="font-outfit text-3xl">
                    {shipment.progress || 0}
                    <small className="text-base text-slate-400">%</small>
                  </strong>
                </div>
                <div className="mb-8 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-[#f36b21] transition-all"
                    style={{ width: `${shipment.progress || 0}%` }}
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`flex gap-3 rounded-2xl border p-3 ${
                        step.status === "current"
                          ? "border-[#f36b21] bg-[#f36b21]/5"
                          : "border-slate-100 dark:border-white/10"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                          step.status === "completed"
                            ? "bg-emerald-500 text-white"
                            : step.status === "current"
                            ? "bg-[#f36b21] text-white"
                            : "bg-slate-100 text-slate-400 dark:bg-white/10"
                        }`}
                      >
                        {step.status === "completed" ? (
                          <Check size={15} />
                        ) : (
                          step.position
                        )}
                      </span>
                      <div>
                        <strong className="block text-xs">{step.title}</strong>
                        <span className="mt-1 block text-[10px] text-slate-400">
                          {step.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <aside className="rounded-3xl bg-[#f36b21] p-6 text-white shadow-xl shadow-[#f36b21]/20">
                <p className="mb-7 text-xs text-white/70">{t("routeSummary")}</p>
                <div className="space-y-6">
                  <div className="flex gap-3">
                    <MapPin size={18} />
                    <div>
                      <small className="block text-[10px] text-white/70">
                        {t("origin")}
                      </small>
                      <strong className="text-sm">{shipment.origin}</strong>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <MapPin size={18} />
                    <div>
                      <small className="block text-[10px] text-white/70">
                        {t("destination")}
                      </small>
                      <strong className="text-sm">
                        {shipment.destination}
                      </strong>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CalendarDays size={18} />
                    <div>
                      <small className="block text-[10px] text-white/70">
                        {t("estimatedDelivery")}
                      </small>
                      <strong className="text-sm">
                        {shipment.estimated_arrival || t("underReview")}
                      </strong>
                    </div>
                  </div>
                </div>
              </aside>
            </section>
            <section className="rounded-3xl bg-white p-6 shadow-lg dark:bg-[#12283e] sm:p-8">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-extrabold">
                    <FileText className="text-[#f36b21]" size={20} />{" "}
                    {t("caseDocuments")}
                  </h2>
                  <p className="mt-1 text-xs text-slate-400">
                    {t("caseDocumentsSub")}
                  </p>
                </div>
                <span className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-500 dark:bg-white/10 dark:text-slate-300">
                  {documents.length} {t("filesCount")}
                </span>
              </div>
              {documents.length ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {documents.map((doc) => (
                    <a
                      key={doc.id}
                      href={fileUrl(doc.file)}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 rounded-2xl border border-slate-200 p-4 transition hover:border-[#f36b21] hover:bg-[#f36b21]/5 dark:border-white/10"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f36b21]/10 text-[#f36b21]">
                        <FileText size={19} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <strong className="block truncate text-sm">
                          {doc.title}
                        </strong>
                        <small className="mt-1 block text-[10px] text-slate-400">
                          {t("viewOrDownload")}
                        </small>
                      </span>
                      <Download
                        size={17}
                        className="text-slate-400 group-hover:text-[#f36b21]"
                      />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="rounded-2xl border border-dashed border-slate-200 p-7 text-center text-sm text-slate-400 dark:border-white/10">
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
