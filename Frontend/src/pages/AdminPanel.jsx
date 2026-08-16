import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api, { getApiError } from '../api';
import ThemeToggle from '../components/ThemeToggle';

const emptyShipment = {
  tracking_code: '',
  car_model: '',
  color: '',
  origin: '',
  destination: '',
  estimated_arrival: '',
  customer_note: '',
  completed_steps: 0,
  is_active: true,
};

const inputClass = 'w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 dark:border-gray-600 dark:bg-navyDeep/70 dark:text-white';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem('adminAccessToken'));
  const [credentials, setCredentials] = useState({ phone_number: '', password: '' });
  const [shipments, setShipments] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [shipmentForm, setShipmentForm] = useState(emptyShipment);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const selected = useMemo(
    () => shipments.find((shipment) => shipment.id === selectedId) || null,
    [shipments, selectedId]
  );

  const clearAlerts = () => {
    setMessage('');
    setError('');
  };

  const logout = () => {
    localStorage.removeItem('adminAccessToken');
    localStorage.removeItem('adminRefreshToken');
    setToken(null);
    setShipments([]);
    setSelectedId(null);
  };

  const loadShipments = async (preferredId = selectedId) => {
    try {
      const response = await api.get('/admin/shipments/');
      const list = Array.isArray(response.data) ? response.data : response.data.results || [];
      setShipments(list);
      if (preferredId && list.some((item) => item.id === preferredId)) {
        setSelectedId(preferredId);
      } else {
        setSelectedId(list[0]?.id || null);
      }
    } catch (requestError) {
      if (requestError?.response?.status === 401) logout();
      setError(getApiError(requestError, 'دریافت پرونده‌ها ناموفق بود.'));
    }
  };

  useEffect(() => {
    if (token) loadShipments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (!selected) return;
    setShipmentForm({
      tracking_code: selected.tracking_code,
      car_model: selected.car_model,
      color: selected.color,
      origin: selected.origin,
      destination: selected.destination,
      estimated_arrival: selected.estimated_arrival,
      customer_note: selected.customer_note,
      completed_steps: selected.completed_steps,
      is_active: selected.is_active,
    });
  }, [selected]);

  const login = async (event) => {
    event.preventDefault();
    clearAlerts();
    setLoading(true);
    try {
      const response = await api.post('/auth/login/', credentials);
      localStorage.setItem('adminAccessToken', response.data.access);
      localStorage.setItem('adminRefreshToken', response.data.refresh);
      setToken(response.data.access);
    } catch (requestError) {
      setError(getApiError(requestError, 'شماره موبایل یا رمز عبور نادرست است.'));
    } finally {
      setLoading(false);
    }
  };

  const startNewShipment = () => {
    clearAlerts();
    setSelectedId(null);
    setShipmentForm(emptyShipment);
  };

  const saveShipment = async (event) => {
    event.preventDefault();
    clearAlerts();
    setLoading(true);
    try {
      const response = selected
        ? await api.patch(`/admin/shipments/${selected.id}/`, shipmentForm)
        : await api.post('/admin/shipments/', shipmentForm);
      setMessage(selected ? 'پرونده به‌روزرسانی شد.' : 'پرونده با مراحل استاندارد ایجاد شد.');
      await loadShipments(response.data.id);
    } catch (requestError) {
      setError(getApiError(requestError, 'ذخیره پرونده ناموفق بود.'));
    } finally {
      setLoading(false);
    }
  };

  const setCompletedThrough = async (position) => {
    if (!selected) return;
    clearAlerts();
    const completedSteps = position <= selected.completed_steps ? position - 1 : position;
    try {
      await api.patch(`/admin/shipments/${selected.id}/`, {
        completed_steps: completedSteps,
      });
      setMessage('مراحل تکمیل‌شده به‌روزرسانی شدند.');
      await loadShipments(selected.id);
    } catch (requestError) {
      setError(getApiError(requestError, 'به‌روزرسانی مراحل ناموفق بود.'));
    }
  };

  const deleteShipment = async () => {
    if (!selected || !window.confirm(`پرونده ${selected.tracking_code} حذف شود؟`)) return;
    clearAlerts();
    try {
      await api.delete(`/admin/shipments/${selected.id}/`);
      setMessage('پرونده حذف شد.');
      setShipmentForm(emptyShipment);
      await loadShipments(null);
    } catch (requestError) {
      setError(getApiError(requestError, 'حذف پرونده ناموفق بود.'));
    }
  };

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F7FA] px-4 dark:bg-navyDeep">
        <section className="w-full max-w-md rounded-3xl border border-white/50 bg-white/80 p-8 shadow-2xl backdrop-blur-2xl dark:border-gray-600/40 dark:bg-[#333F4A]/70">
          <div className="mb-8 flex items-center justify-between">
            <button onClick={() => navigate('/')} className="font-outfit text-2xl font-extrabold text-[#333F4A] dark:text-white">
              Car<span className="text-[#FF8C00]">Express</span>
            </button>
            <ThemeToggle />
          </div>
          <h1 className="mb-2 text-2xl font-extrabold text-[#333F4A] dark:text-white">ورود مدیریت</h1>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-300">مدیریت پرونده‌ها و مراحل تکمیل‌شده خودروها</p>
          <form onSubmit={login} className="space-y-4">
            <input className={inputClass} dir="ltr" placeholder="شماره موبایل مدیر" value={credentials.phone_number} onChange={(event) => setCredentials({ ...credentials, phone_number: event.target.value })} required />
            <input className={inputClass} dir="ltr" type="password" placeholder="رمز عبور" value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} required />
            {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30">{error}</p>}
            <button disabled={loading} className="w-full rounded-xl bg-gradient-to-l from-[#FF8C00] to-[#E31837] py-3 font-bold text-white shadow-lg disabled:opacity-60">
              {loading ? 'در حال ورود...' : 'ورود به پنل'}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F7FA] text-slate-800 transition-colors dark:bg-navyDeep dark:text-white">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/85 backdrop-blur-xl dark:border-gray-700 dark:bg-navyDeep/85">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <button onClick={() => navigate('/')} className="font-outfit text-xl font-extrabold">Car<span className="text-[#FF8C00]">Express</span></button>
            <span className="mr-3 text-xs text-gray-400">مدیریت رهگیری خودرو</span>
          </div>
          <div className="flex gap-2">
            <ThemeToggle />
            <button onClick={() => navigate('/tracking')} className="rounded-xl border border-[#FF8C00]/30 px-3 py-2 text-sm font-bold text-[#FF8C00]">رهگیری</button>
            <button onClick={logout} className="rounded-xl bg-[#333F4A] px-3 py-2 text-sm font-bold text-white">خروج</button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[320px_1fr]">
        <aside className="h-fit rounded-3xl border border-white/50 bg-white/80 p-4 shadow-xl dark:border-gray-600/40 dark:bg-[#333F4A]/60">
          <button onClick={startNewShipment} className="mb-4 w-full rounded-2xl bg-[#FF8C00] py-3 font-bold text-white transition hover:bg-[#E31837]">+ پرونده جدید</button>
          <div className="space-y-2">
            {shipments.map((shipment) => (
              <button key={shipment.id} onClick={() => setSelectedId(shipment.id)} className={`w-full rounded-2xl border p-4 text-right transition ${selectedId === shipment.id ? 'border-[#FF8C00] bg-[#FF8C00]/10' : 'border-gray-100 bg-white/60 hover:border-[#FF8C00]/40 dark:border-gray-700 dark:bg-navyDeep/30'}`}>
                <div className="flex items-center justify-between gap-2">
                  <strong className="font-outfit text-sm">{shipment.tracking_code}</strong>
                  <span className={`h-2.5 w-2.5 rounded-full ${shipment.is_active ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                </div>
                <p className="mt-1 truncate text-sm font-bold">{shipment.car_model}</p>
                <p className="mt-1 text-xs text-gray-400">{shipment.completed_steps} از ۷ مرحله تکمیل شده</p>
              </button>
            ))}
            {!shipments.length && <p className="p-6 text-center text-sm text-gray-400">هنوز پرونده‌ای ثبت نشده است.</p>}
          </div>
        </aside>

        <div className="space-y-6">
          {(message || error) && <div className={`rounded-2xl px-5 py-4 text-sm font-bold ${error ? 'bg-red-50 text-red-600 dark:bg-red-950/30' : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30'}`}>{error || message}</div>}

          <section className="rounded-3xl border border-white/50 bg-white/80 p-6 shadow-xl dark:border-gray-600/40 dark:bg-[#333F4A]/60">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-extrabold">{selected ? 'ویرایش پرونده' : 'ایجاد پرونده جدید'}</h1>
                <p className="mt-1 text-xs text-gray-400">تمام پرونده‌ها به‌صورت خودکار دارای هفت مرحله یکسان هستند.</p>
              </div>
              {selected && <button onClick={deleteShipment} className="rounded-xl border border-red-200 px-3 py-2 text-xs font-bold text-red-600">حذف پرونده</button>}
            </div>
            <form onSubmit={saveShipment} className="grid gap-4 md:grid-cols-2">
              <label className="text-xs text-gray-500">کد پیگیری / VIN<input className={`${inputClass} mt-2 font-outfit`} dir="ltr" value={shipmentForm.tracking_code} onChange={(event) => setShipmentForm({ ...shipmentForm, tracking_code: event.target.value })} required /></label>
              <label className="text-xs text-gray-500">مدل خودرو<input className={`${inputClass} mt-2`} value={shipmentForm.car_model} onChange={(event) => setShipmentForm({ ...shipmentForm, car_model: event.target.value })} required /></label>
              <label className="text-xs text-gray-500">رنگ<input className={`${inputClass} mt-2`} value={shipmentForm.color} onChange={(event) => setShipmentForm({ ...shipmentForm, color: event.target.value })} /></label>
              <label className="text-xs text-gray-500">زمان تخمینی تحویل<input className={`${inputClass} mt-2`} value={shipmentForm.estimated_arrival} onChange={(event) => setShipmentForm({ ...shipmentForm, estimated_arrival: event.target.value })} /></label>
              <label className="text-xs text-gray-500">مبدأ<input className={`${inputClass} mt-2`} value={shipmentForm.origin} onChange={(event) => setShipmentForm({ ...shipmentForm, origin: event.target.value })} required /></label>
              <label className="text-xs text-gray-500">مقصد<input className={`${inputClass} mt-2`} value={shipmentForm.destination} onChange={(event) => setShipmentForm({ ...shipmentForm, destination: event.target.value })} required /></label>
              <label className="text-xs text-gray-500 md:col-span-2">یادداشت مشتری<textarea className={`${inputClass} mt-2 min-h-24`} value={shipmentForm.customer_note} onChange={(event) => setShipmentForm({ ...shipmentForm, customer_note: event.target.value })} /></label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={shipmentForm.is_active} onChange={(event) => setShipmentForm({ ...shipmentForm, is_active: event.target.checked })} /> قابل نمایش برای مشتری</label>
              <button disabled={loading} className="rounded-xl bg-[#FF8C00] px-6 py-3 font-bold text-white md:justify-self-end">{loading ? 'در حال ذخیره...' : 'ذخیره پرونده'}</button>
            </form>
          </section>

          {selected && (
            <section className="rounded-3xl border border-white/50 bg-white/80 p-6 shadow-xl dark:border-gray-600/40 dark:bg-[#333F4A]/60">
              <div className="mb-5">
                <h2 className="text-lg font-extrabold">انتخاب مراحل تکمیل‌شده</h2>
                <p className="mt-1 text-xs text-gray-400">روی هر مرحله بزنید؛ مراحل قبل از آن نیز تکمیل می‌شوند. برای بازگشت دوباره روی آخرین مرحله تکمیل‌شده بزنید.</p>
              </div>
              <div className="space-y-3">
                {selected.steps.map((step) => {
                  const completed = step.status === 'completed';
                  const current = step.status === 'current';
                  return (
                    <button key={step.id} type="button" onClick={() => setCompletedThrough(step.position)} className={`grid w-full items-center gap-3 rounded-2xl border p-4 text-right transition md:grid-cols-[50px_1fr_130px] ${completed ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/20' : current ? 'border-[#FF8C00] bg-[#FF8C00]/10' : 'border-gray-100 bg-white/70 dark:border-gray-700 dark:bg-navyDeep/30'}`}>
                      <span className={`flex h-10 w-10 items-center justify-center rounded-full font-outfit font-bold ${completed ? 'bg-emerald-500 text-white' : current ? 'bg-[#FF8C00] text-white' : 'bg-gray-100 text-gray-400 dark:bg-gray-700'}`}>{completed ? '✓' : step.position}</span>
                      <div><strong className="text-sm">{step.title}</strong><p className="mt-1 text-xs text-gray-400">{step.description}</p></div>
                      <span className={`text-xs font-bold ${completed ? 'text-emerald-600' : current ? 'text-[#FF8C00]' : 'text-gray-400'}`}>{completed ? 'تکمیل شده' : current ? 'مرحله فعلی' : 'در انتظار'}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminPanel;
