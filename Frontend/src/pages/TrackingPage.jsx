import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api, { getApiError } from '../api';
import ThemeToggle from '../components/ThemeToggle';

const TrackingPage = () => {
  const navigate = useNavigate();
  const [trackingCode, setTrackingCode] = useState('');
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    const code = trackingCode.trim();
    if (!code) return;

    setLoading(true);
    setError('');
    setShipment(null);
    try {
      const response = await api.get(`/tracking/${encodeURIComponent(code)}/`);
      setShipment(response.data);
    } catch (requestError) {
      if (requestError?.response?.status === 404) {
        setError('کد پیگیری پیدا نشد یا پرونده غیرفعال است.');
      } else {
        setError(getApiError(requestError));
      }
    } finally {
      setLoading(false);
    }
  };

  const steps = shipment?.steps || [];
  const currentIndex = steps.findIndex((step) => step.status === 'current');
  const lastCompletedIndex = steps.reduce(
    (lastIndex, step, index) => step.status === 'completed' ? index : lastIndex,
    -1
  );
  const displayIndex = currentIndex >= 0 ? currentIndex : lastCompletedIndex;
  const progressWidth = steps.length > 1
    ? `${(Math.max(displayIndex, 0) / (steps.length - 1)) * 92}%`
    : displayIndex === 0 ? '92%' : '0%';
  const glass = 'rounded-3xl border border-white/50 bg-white/80 p-6 shadow-2xl backdrop-blur-2xl transition dark:border-gray-600/40 dark:bg-[#333F4A]/70 md:p-8';

  return (
    <main className="min-h-screen bg-[#F5F7FA] px-4 pb-20 pt-8 transition-colors duration-500 dark:bg-navyDeep sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="font-outfit text-2xl font-extrabold text-[#333F4A] dark:text-white">
            Car<span className="text-[#FF8C00]">Express</span>
          </button>
          <div className="flex gap-2">
            <ThemeToggle />
            <button onClick={() => navigate('/admin-panel')} className="rounded-xl bg-[#333F4A] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#E31837]">
              پنل مدیریت
            </button>
          </div>
        </div>

        <header className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF8C00]/20 bg-[#FF8C00]/10 px-4 py-1.5 text-xs font-bold text-[#FF8C00]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#FF8C00]" />
            سامانه رهگیری لحظه‌ای کار اکسپرس
          </div>
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-[#333F4A] dark:text-white md:text-5xl">
            پیگیری <span className="bg-gradient-to-r from-[#FF8C00] to-[#E31837] bg-clip-text text-transparent">حمل خودرو</span>
          </h1>
          <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">
            شماره شاسی یا کد پیگیری پرونده را وارد کنید تا آخرین مراحل ثبت‌شده توسط مدیریت را ببینید.
          </p>
        </header>

        <section className={`${glass} mx-auto mb-10 max-w-2xl !p-4 md:!p-6`}>
          <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
            <input
              value={trackingCode}
              onChange={(event) => setTrackingCode(event.target.value)}
              dir="ltr"
              placeholder="TRQ-8902 یا VIN"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3.5 font-outfit text-lg font-bold tracking-wider text-slate-800 outline-none transition focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 dark:border-gray-600 dark:bg-navyDeep/80 dark:text-white"
            />
            <button disabled={loading} className="shrink-0 rounded-2xl bg-[#FF8C00] px-8 py-3.5 font-bold text-white shadow-lg shadow-[#FF8C00]/30 transition hover:bg-[#E31837] disabled:opacity-60">
              {loading ? 'در حال بررسی...' : 'استعلام وضعیت'}
            </button>
          </form>
          {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 dark:bg-red-950/30">{error}</p>}
        </section>

        {shipment && (
          <section className={glass}>
            <div className="mb-8 flex flex-col justify-between gap-4 border-b border-gray-200 pb-6 dark:border-gray-700 md:flex-row md:items-center">
              <div>
                <span className="mb-1 block text-xs text-gray-400">خودروی در حال ترانزیت</span>
                <h2 className="font-outfit text-2xl font-extrabold text-[#333F4A] dark:text-white">{shipment.car_model}</h2>
                <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span>کد پیگیری: <strong className="font-outfit text-slate-800 dark:text-gray-200">{shipment.tracking_code}</strong></span>
                  {shipment.color && <span>رنگ: <strong className="text-slate-800 dark:text-gray-200">{shipment.color}</strong></span>}
                </div>
              </div>
              <div className="rounded-2xl border border-[#FF8C00]/30 bg-[#FF8C00]/10 px-5 py-3">
                <span className="mb-1 block text-xs text-gray-500 dark:text-gray-400">وضعیت کنونی</span>
                <strong className="text-[#FF8C00]">{shipment.current_step?.title || 'هنوز مرحله‌ای ثبت نشده'}</strong>
              </div>
            </div>

            {steps.length > 0 ? (
              <div className="my-4 overflow-x-auto py-8">
                <div className="relative min-w-[650px] px-4">
                  <div className="absolute left-8 right-8 top-7 z-0 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div className="absolute right-8 top-7 z-0 h-1.5 rounded-full bg-gradient-to-l from-[#FF8C00] to-[#E31837] transition-all duration-700" style={{ width: progressWidth }} />
                  <div className="relative z-10 flex justify-between">
                    {steps.map((step, index) => {
                      const completed = step.status === 'completed';
                      const current = step.status === 'current';
                      return (
                        <div key={step.id} className="flex w-24 flex-col items-center text-center">
                          <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full font-outfit text-sm font-bold transition ${
                            current ? 'scale-110 bg-[#FF8C00] text-white ring-4 ring-[#FF8C00]/30' :
                            completed ? 'bg-[#E31837] text-white' :
                            'border-2 border-gray-200 bg-white text-gray-400 dark:border-gray-700 dark:bg-gray-800'
                          }`}>
                            {completed ? '✓' : index + 1}
                          </div>
                          <h3 className={`mb-1 text-xs font-bold ${current ? 'text-[#FF8C00]' : completed ? 'text-[#333F4A] dark:text-white' : 'text-gray-400'}`}>{step.title}</h3>
                          <span className="text-[10px] text-gray-400">{step.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <p className="rounded-2xl bg-gray-50 p-6 text-center text-sm text-gray-500 dark:bg-navyDeep/40">هنوز مرحله‌ای برای این پرونده ثبت نشده است.</p>
            )}

            <div className="mt-8 grid gap-4 rounded-2xl bg-gray-50/70 p-6 dark:bg-navyDeep/40 md:grid-cols-3">
              <div><span className="mb-1 block text-xs text-gray-400">مبدأ</span><strong className="text-sm text-[#333F4A] dark:text-white">{shipment.origin}</strong></div>
              <div><span className="mb-1 block text-xs text-gray-400">مقصد</span><strong className="text-sm text-[#333F4A] dark:text-white">{shipment.destination}</strong></div>
              <div><span className="mb-1 block text-xs text-gray-400">تخمین تحویل</span><strong className="text-sm text-[#FF8C00]">{shipment.estimated_arrival || 'در حال بررسی'}</strong></div>
            </div>
            {shipment.customer_note && <p className="mt-4 rounded-2xl border border-[#FF8C00]/20 bg-[#FF8C00]/5 p-4 text-sm text-gray-600 dark:text-gray-300">{shipment.customer_note}</p>}
          </section>
        )}
      </div>
    </main>
  );
};

export default TrackingPage;
