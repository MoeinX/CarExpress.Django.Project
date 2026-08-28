import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FilePlus2,
  FileText,
  Link2,
  LogOut,
  Save,
  Trash2,
  Upload,
  X,
} from 'lucide-react';

import api, { getApiError } from '../api';
import ThemeToggle from '../components/ThemeToggle';
import BrandLogo from '../components/BrandLogo';
import { useLanguage } from '../components/LanguageContext';

const CAR_CATALOG = {
  Toyota: ['Land Cruiser 300', 'Land Cruiser Prado', 'Camry', 'Crown', 'RAV4', 'Hilux GR', 'Fortuner', 'Yaris', 'Supra'],
  Lexus: ['LX600', 'LX500d', 'GX550', 'RX350', 'RX500h', 'ES350', 'IS300', 'LS500', 'LM350'],
  'Mercedes-Benz': ['G63 AMG', 'S580', 'S500', 'GLS600 Maybach', 'GLE53 AMG', 'E300', 'C200', 'G500', 'V-Class'],
  BMW: ['760i', '740i', 'X7 M60i', 'X5 M', 'X6 M', '530i', '430i Gran Coupe', 'M4 Competition', 'i7'],
  Porsche: ['911 Turbo S', '911 Carrera', 'Cayenne GTS', 'Cayenne Coupe', 'Panamera 4S', 'Macan GTS', 'Taycan Turbo'],
  Audi: ['RSQ8', 'Q8', 'RS6 Avant', 'RS7', 'A8L', 'Q7', 'e-tron GT'],
  LandRover: ['Range Rover Autobiography', 'Range Rover SV', 'Range Rover Sport', 'Defender 110 V8', 'Defender 90', 'Velar'],
  Maserati: ['MC20', 'Grecale Trofeo', 'Levante Trofeo', 'Ghibli Trofeo', 'GranTurismo'],
  Bentley: ['Continental GT', 'Flying Spur', 'Bentayga Speed', 'Bentayga EWB'],
  RollsRoyce: ['Cullinan', 'Ghost', 'Phantom', 'Spectre'],
  Hyundai: ['Santa Fe 2024', 'Palisade', 'Tucson', 'Sonata', 'Azera', 'Ioniq 5', 'Elantra'],
  Kia: ['Telluride', 'Sorento', 'K5', 'Carnival Hi-Limousine', 'EV9', 'Sportage'],
  Nissan: ['Patrol NISMO', 'Patrol Titanium', 'Navara', 'X-Trail', 'Altima', 'GT-R NISMO', 'Z Performance'],
  Ford: ['F-150 Raptor R', 'Mustang Dark Horse', 'Explorer ST', 'Expedition MAX', 'Bronco Raptor'],
  Chevrolet: ['Tahoe RST', 'Suburban High Country', 'Corvette Z06', 'Silverado ZR2', 'Camaro ZL1'],
};

const EMPTY_FORM = {
  tracking_code: '',
  customer_name: '',
  car_brand: '',
  car_model: '',
  build_year: '',
  color: '',
  origin: 'پورت راشد (دبی)',
  destination: 'منطقه آزاد',
  estimated_arrival: '',
  customer_note: '',
  is_active: true,
};

const normalizeDigits = (value = '') =>
  String(value)
    .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)));

const fileUrl = (file) => (file?.startsWith('http') ? file : `${window.location.origin}${file || ''}`);

const formFromShipment = (shipment) => ({
  ...EMPTY_FORM,
  tracking_code: normalizeDigits(shipment?.tracking_code || ''),
  customer_name: shipment?.customer_name || '',
  car_brand: shipment?.car_brand || '',
  car_model: shipment?.car_model || '',
  build_year: normalizeDigits(shipment?.build_year || ''),
  color: shipment?.color || '',
  origin: shipment?.origin || 'پورت راشد (دبی)',
  destination: shipment?.destination || 'منطقه آزاد',
  estimated_arrival: normalizeDigits(shipment?.estimated_arrival || '').replace(/[^0-9]/g, ''),
  customer_note: shipment?.customer_note || '',
  is_active: shipment?.is_active ?? true,
});

const inputClass =
  'mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 placeholder-slate-400 dark:border-white/10 dark:bg-[#08101a]/90 dark:text-white dark:placeholder-slate-500';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [token, setToken] = useState(() => localStorage.getItem('adminAccessToken'));
  const [credentials, setCredentials] = useState({ phone_number: '', password: '' });
  const [shipments, setShipments] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [stageDates, setStageDates] = useState({});
  const [newFiles, setNewFiles] = useState([{ title: t('rtaFileDefault'), file: null }]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const selected = useMemo(() => shipments.find((item) => item.id === selectedId) || null, [shipments, selectedId]);

  const brands = Object.keys(CAR_CATALOG);
  const models = form.car_brand ? CAR_CATALOG[form.car_brand] || [] : [];

  const clearAlerts = useCallback(() => {
    setMessage('');
    setError('');
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('adminAccessToken');
    localStorage.removeItem('adminRefreshToken');
    setToken(null);
    setShipments([]);
    setSelectedId(null);
    setShowForm(false);
  }, []);

  const loadShipments = useCallback(
    async (preferredId = selectedId) => {
      try {
        const response = await api.get(`/admin/shipments/?lang=${language}`);
        const list = Array.isArray(response.data) ? response.data : response.data.results || [];
        setShipments(list);
        if (preferredId) setSelectedId(preferredId);
      } catch (requestError) {
        if (requestError?.response?.status === 401) logout();
        setError(getApiError(requestError, t('fetchCasesFailed')));
      }
    },
    [selectedId, language, logout, t]
  );

  useEffect(() => {
    if (token) loadShipments();
  }, [token, loadShipments]);

  const openShipment = (shipment) => {
    clearAlerts();
    setSelectedId(shipment.id);
    setForm(formFromShipment(shipment));
    setStageDates(Object.fromEntries((shipment.steps || []).map((step) => [step.position, step.date || ''])));
    setNewFiles([{ title: t('rtaFileDefault'), file: null }]);
    setShowForm(true);
  };

  const startNew = () => {
    clearAlerts();
    setSelectedId(null);
    setStageDates({});
    setForm({ ...EMPTY_FORM });
    setNewFiles([{ title: t('rtaFileDefault'), file: null }]);
    setShowForm(true);
  };

  const updateField = (field, value) =>
    setForm((current) => ({
      ...current,
      [field]: field === 'tracking_code' || field === 'build_year' ? normalizeDigits(value) : value,
    }));

  const updateFile = (index, field, value) =>
    setNewFiles((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item))
    );

  const login = async (event) => {
    event.preventDefault();
    clearAlerts();
    setBusy(true);
    try {
      const response = await api.post('/auth/login/', credentials);
      localStorage.setItem('adminAccessToken', response.data.access);
      localStorage.setItem('adminRefreshToken', response.data.refresh);
      setToken(response.data.access);
    } catch (requestError) {
      setError(getApiError(requestError, t('loginError')));
    } finally {
      setBusy(false);
    }
  };

  const saveShipment = async (event) => {
    event.preventDefault();
    clearAlerts();
    setBusy(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        data.append(
          key,
          key === 'estimated_arrival'
            ? value
              ? `${normalizeDigits(value)} ${t('daysSuffix')}`
              : ''
            : value ?? ''
        )
      );
      newFiles.forEach((item, index) => {
        if (item.file) {
          data.append('uploaded_files', item.file);
          data.append('file_titles', item.title.trim() || `${t('filePrefix')} ${index + 1}`);
        }
      });
      const response = selected
        ? await api.patch(`/admin/shipments/${selected.id}/?lang=${language}`, data)
        : await api.post(`/admin/shipments/?lang=${language}`, data);
      setMessage(selected ? t('caseUpdatedSuccess') : t('caseCreatedSuccess'));
      await loadShipments(response.data.id);
      setSelectedId(response.data.id);
      setShowForm(true);
      setNewFiles([{ title: t('newFileDefault'), file: null }]);
    } catch (requestError) {
      setError(getApiError(requestError, t('saveCaseFailed')));
    } finally {
      setBusy(false);
    }
  };

  const deleteShipment = async () => {
    if (!selected || !window.confirm(t('confirmDeleteCase', { code: selected.tracking_code }))) return;
    clearAlerts();
    setBusy(true);
    try {
      await api.delete(`/admin/shipments/${selected.id}/`);
      setMessage(t('caseDeleted'));
      setSelectedId(null);
      setShowForm(false);
      await loadShipments(null);
    } catch (requestError) {
      setError(getApiError(requestError, t('deleteCaseFailed')));
    } finally {
      setBusy(false);
    }
  };

  const deleteDocument = async (document) => {
    if (!selected || !window.confirm(t('confirmDeleteDoc', { title: document.title }))) return;
    clearAlerts();
    setBusy(true);
    try {
      await api.delete(`/admin/shipments/${selected.id}/documents/${document.id}/`);
      setMessage(t('fileDeleted'));
      await loadShipments(selected.id);
    } catch (requestError) {
      setError(getApiError(requestError, t('deleteFileFailed')));
    } finally {
      setBusy(false);
    }
  };

  const setCompletedThrough = async (position) => {
    if (!selected) return;
    try {
      await api.patch(`/admin/shipments/${selected.id}/?lang=${language}`, { completed_steps: position });
      setMessage(t('stepsSaved'));
      await loadShipments(selected.id);
    } catch (requestError) {
      setError(getApiError(requestError, t('saveStepsFailed')));
    }
  };

  const setStageDate = async (position, value) => {
    if (!selected) return;
    const nextDates = { ...stageDates, [position]: value };
    setStageDates(nextDates);
    try {
      await api.patch(`/admin/shipments/${selected.id}/?lang=${language}`, { stage_dates: nextDates });
      setMessage(t('stageDateSaved'));
      await loadShipments(selected.id);
    } catch (requestError) {
      setError(getApiError(requestError, t('saveDateFailed')));
    }
  };

  if (!token)
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f7fb] text-slate-800 dark:bg-[#08101a] dark:text-slate-100 px-4">
        <form
          onSubmit={login}
          className="w-full max-w-md rounded-[2.5rem] border border-slate-200 bg-white p-8 sm:p-10 shadow-2xl shadow-slate-200/60 dark:border-amber-500/30 dark:bg-[#0d1b2e]/95 dark:shadow-black/80 backdrop-blur-2xl text-start"
        >
          <div className="mb-8 flex items-center justify-between">
            <BrandLogo />
            <ThemeToggle />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">{t('adminLogin')}</h1>
          <p className="mb-6 mt-1.5 text-xs text-slate-500 dark:text-slate-400">{t('adminLoginSub')}</p>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {t('mobileNumber')}
            <input
              className={inputClass}
              dir="ltr"
              placeholder="0912..."
              value={credentials.phone_number}
              onChange={(event) =>
                setCredentials({ ...credentials, phone_number: normalizeDigits(event.target.value) })
              }
              required
            />
          </label>
          <label className="mt-4 block text-xs font-bold text-slate-700 dark:text-slate-300">
            {t('password')}
            <input
              className={inputClass}
              dir="ltr"
              type="password"
              placeholder="••••••••"
              value={credentials.password}
              onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
              required
            />
          </label>
          {error && <p className="mt-4 rounded-2xl bg-red-50 border border-red-500/30 p-3.5 text-xs font-bold text-red-700 dark:bg-red-950/50 dark:text-red-300">{error}</p>}
          <button
            disabled={busy}
            className="mt-6 w-full rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5b842] to-[#b38612] py-4 text-sm font-black text-[#08101a] shadow-lg shadow-amber-500/25 transition hover:scale-[1.02] disabled:opacity-60"
          >
            {busy ? t('signingIn') : t('signIn')}
          </button>
        </form>
      </main>
    );

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-800 dark:bg-[#08101a] dark:text-slate-100 pb-16 overflow-x-hidden">
      <header className="sticky top-0 z-30 border-b border-slate-200/90 bg-white/90 backdrop-blur-2xl shadow-md shadow-slate-200/40 dark:border-amber-500/20 dark:bg-[#08101a]/90 dark:shadow-black/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <button onClick={() => navigate('/')} className="flex items-center text-start" aria-label={t('home')}>
            <BrandLogo />
          </button>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <button
              onClick={() => navigate('/tracking')}
              className="rounded-xl border border-amber-400/50 bg-amber-50 px-3 py-1.5 text-xs font-black text-amber-800 transition hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-400/20"
            >
              {t('tracking')}
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/15"
            >
              <LogOut size={14} /> {t('logout')}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[300px_1fr]">
        {/* Sidebar Cases List */}
        <aside className="h-fit rounded-[2rem] border border-slate-200 bg-white p-4 sm:p-5 shadow-xl shadow-slate-200/50 backdrop-blur-2xl dark:border-amber-500/20 dark:bg-[#0d1b2e]/80 dark:shadow-2xl">
          <button
            onClick={startNew}
            className="mb-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5b842] to-[#b38612] py-3.5 text-xs sm:text-sm font-black text-[#08101a] shadow-lg shadow-amber-500/25 transition hover:scale-[1.02]"
          >
            <FilePlus2 size={18} /> {t('newCase')}
          </button>
          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pe-1">
            {shipments.map((shipment) => (
              <button
                key={shipment.id}
                onClick={() => openShipment(shipment)}
                className={`w-full rounded-2xl border p-4 text-start transition duration-200 ${
                  selectedId === shipment.id
                    ? 'border-amber-400/80 bg-amber-50/80 shadow-md dark:border-amber-400/60 dark:bg-amber-500/15 dark:shadow-amber-500/10'
                    : 'border-slate-200 bg-slate-50/70 hover:border-amber-400/50 dark:border-white/10 dark:bg-[#08101a]/50 dark:hover:border-amber-400/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span dir="ltr" className="font-en text-xs font-black text-amber-700 dark:text-amber-300">
                    {shipment.tracking_code}
                  </span>
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      shipment.is_active ? 'bg-emerald-500 ring-4 ring-emerald-500/20' : 'bg-slate-400'
                    }`}
                  />
                </div>
                <strong className="mt-2 block truncate text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                  {shipment.car_brand} {shipment.car_model}
                </strong>
                <span className="mt-1 block text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  {shipment.completed_steps} {t('of7Steps')}
                </span>
              </button>
            ))}
            {!shipments.length && <p className="p-6 text-center text-xs text-slate-400">{t('noCasesRegistered')}</p>}
          </div>
        </aside>

        {/* Main Panel Content */}
        <section className="space-y-6 text-start">
          {(message || error) && (
            <div
              className={`rounded-2xl border p-4 text-xs sm:text-sm font-bold backdrop-blur-xl ${
                error
                  ? 'border-red-500/30 bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300'
                  : 'border-emerald-500/30 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
              }`}
            >
              {error || message}
            </div>
          )}

          {showForm ? (
            <>
              {/* Manifest Edit/Create Form */}
              <form
                onSubmit={saveShipment}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/50 backdrop-blur-2xl dark:border-amber-500/25 dark:bg-[#0d1b2e]/80 dark:shadow-2xl"
              >
                <div className="mb-7 flex items-start justify-between border-b border-slate-100 dark:border-white/10 pb-5">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      {selected ? t('editCase') : t('createNewCase')}
                    </h1>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t('formPersistenceNote')}</p>
                  </div>
                  {selected && (
                    <button
                      type="button"
                      onClick={deleteShipment}
                      className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-50 px-3.5 py-2 text-xs font-bold text-red-600 hover:bg-red-100 transition dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/60"
                    >
                      <Trash2 size={15} /> {t('delete')}
                    </button>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {t('trackingCodeVin')}
                    <input
                      className={`${inputClass} font-en`}
                      dir="ltr"
                      value={form.tracking_code}
                      onChange={(event) => updateField('tracking_code', event.target.value)}
                      required
                    />
                  </label>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {t('customerName')}
                    <input
                      className={inputClass}
                      value={form.customer_name}
                      onChange={(event) => updateField('customer_name', event.target.value)}
                    />
                  </label>

                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {t('carBrand')}
                    <input
                      className={inputClass}
                      list="brands-list"
                      value={form.car_brand}
                      onChange={(event) => setForm({ ...form, car_brand: event.target.value, car_model: '' })}
                      placeholder={t('selectOrTypeBrand')}
                      required
                    />
                    <datalist id="brands-list">
                      {brands.map((brand) => (
                        <option key={brand} value={brand} />
                      ))}
                    </datalist>
                  </label>

                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {t('carModel')}
                    <input
                      className={inputClass}
                      list="models-list"
                      value={form.car_model}
                      onChange={(event) => updateField('car_model', event.target.value)}
                      placeholder={form.car_brand ? t('selectOrTypeModel') : t('selectBrandFirst')}
                      required
                    />
                    <datalist id="models-list">
                      {models.map((model) => (
                        <option key={model} value={model} />
                      ))}
                    </datalist>
                  </label>

                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {t('buildYear')}
                    <input
                      className={`${inputClass} font-en`}
                      inputMode="numeric"
                      value={form.build_year}
                      onChange={(event) => updateField('build_year', event.target.value)}
                    />
                  </label>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {t('color')}
                    <input
                      className={inputClass}
                      value={form.color}
                      onChange={(event) => updateField('color', event.target.value)}
                    />
                  </label>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {t('estimatedDeliveryDays')}
                    <input
                      className={`${inputClass} font-en`}
                      inputMode="numeric"
                      value={form.estimated_arrival}
                      onChange={(event) =>
                        updateField('estimated_arrival', normalizeDigits(event.target.value).replace(/[^0-9]/g, ''))
                      }
                    />
                  </label>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {t('origin')}
                    <input
                      className={inputClass}
                      value={form.origin}
                      onChange={(event) => updateField('origin', event.target.value)}
                      required
                    />
                  </label>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {t('destination')}
                    <input
                      className={inputClass}
                      value={form.destination}
                      onChange={(event) => updateField('destination', event.target.value)}
                      required
                    />
                  </label>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 md:col-span-2">
                    {t('customerNote')}
                    <textarea
                      className={`${inputClass} min-h-24`}
                      value={form.customer_note}
                      onChange={(event) => updateField('customer_note', event.target.value)}
                    />
                  </label>
                </div>

                {/* Upload Manifest Documents */}
                <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-5 dark:border-amber-500/30 dark:bg-[#08101a]/60">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="flex items-center gap-2 text-sm font-black text-amber-700 dark:text-amber-300">
                        <Upload size={18} /> {t('newFiles')}
                      </h2>
                      <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">{t('addOneOrMoreFiles')}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNewFiles((current) => [...current, { title: '', file: null }])}
                      className="rounded-xl border border-amber-400/40 bg-amber-50 px-3.5 py-1.5 text-xs font-black text-amber-800 hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-400/20"
                    >
                      {t('addRow')}
                    </button>
                  </div>
                  <div className="space-y-3">
                    {newFiles.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-[#0d1b2e] sm:flex-row sm:items-center"
                      >
                        <input
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-amber-400 dark:border-white/10 dark:bg-[#08101a] dark:text-white sm:w-1/3"
                          placeholder={t('fileTitle')}
                          value={item.title}
                          onChange={(event) => updateFile(index, 'title', event.target.value)}
                        />
                        <label className="flex min-w-0 flex-1 items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                            className="sr-only"
                            onChange={(event) => updateFile(index, 'file', event.currentTarget.files?.[0] || null)}
                          />
                          <span className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 transition hover:bg-amber-400 hover:text-[#08101a]">
                            <Upload size={18} />
                          </span>
                          <span className="min-w-0 truncate text-slate-700 dark:text-slate-300">{item.file?.name || t('chooseFile')}</span>
                        </label>
                        {newFiles.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setNewFiles((current) => current.filter((_, itemIndex) => itemIndex !== index))}
                            className="self-end rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Existing Registered Files */}
                {selected?.documents?.length > 0 && (
                  <div className="mt-5 border-t border-slate-100 dark:border-white/10 pt-5">
                    <h2 className="mb-3 flex items-center gap-2 text-sm font-black text-amber-700 dark:text-amber-300">
                      <FileText size={17} /> {t('registeredFiles')}
                    </h2>
                    <div className="flex flex-wrap gap-2.5">
                      {selected.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-1.5 text-xs font-bold text-amber-800 dark:border-amber-500/20 dark:bg-[#08101a] dark:text-amber-300"
                        >
                          <a
                            href={fileUrl(doc.file)}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 px-2 py-1 text-slate-700 hover:text-amber-700 dark:text-slate-200 dark:hover:text-amber-300"
                          >
                            <Link2 size={14} className="text-amber-500 dark:text-amber-400" />
                            {doc.title}
                          </a>
                          <button
                            type="button"
                            title={t('deleteFile')}
                            aria-label={`${t('deleteFile')} ${doc.title}`}
                            onClick={() => deleteDocument(doc)}
                            disabled={busy}
                            className="rounded-lg p-1.5 text-red-500 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40 disabled:opacity-50"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <label className="mt-6 flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(event) => setForm({ ...form, is_active: event.target.checked })}
                    className="h-4 w-4 accent-amber-400 rounded cursor-pointer"
                  />
                  {t('visibleToRecipient')}
                </label>

                <button
                  disabled={busy}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5b842] to-[#b38612] py-4 text-sm font-black text-[#08101a] shadow-lg shadow-amber-500/25 transition hover:scale-[1.01] disabled:opacity-60"
                >
                  <Save size={18} />
                  {busy ? t('saving') : t('saveCase')}
                </button>
              </form>

              {/* 5-Step Milestone Status Manager */}
              {selected && (
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/50 backdrop-blur-2xl dark:border-amber-500/25 dark:bg-[#0d1b2e]/80 dark:shadow-2xl">
                  <h2 className="mb-5 text-lg font-black text-slate-900 dark:text-white">{t('stepsStatus')}</h2>
                  <div className="space-y-3">
                    {selected.steps.map((step) => (
                      <div
                        key={step.id}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border p-4 transition duration-200 ${
                          step.status === 'completed'
                            ? 'border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-950/20'
                            : step.status === 'current'
                            ? 'border-amber-400/80 bg-amber-50/80 dark:border-amber-400/50 dark:bg-amber-500/10'
                            : 'border-slate-200 bg-slate-50/60 dark:border-white/10 dark:bg-[#08101a]/50'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setCompletedThrough(step.position)}
                          className="flex min-w-0 flex-1 items-center gap-3.5 text-start"
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-en text-xs font-black ${
                              step.status === 'completed'
                                ? 'bg-emerald-500 text-white'
                                : step.status === 'current'
                                ? 'bg-amber-400 text-[#08101a]'
                                : 'bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-slate-400'
                            }`}
                          >
                            {step.position}
                          </span>
                          <div>
                            <span className="block text-xs sm:text-sm font-black text-slate-900 dark:text-white">{step.title}</span>
                            <span className="mt-0.5 block text-[11px] text-slate-500 dark:text-slate-400">{step.description}</span>
                          </div>
                          <span
                            className={`ms-auto rounded-full px-2.5 py-0.5 text-[10px] font-black ${
                              step.status === 'completed'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300'
                                : step.status === 'current'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-400/20 dark:text-amber-300'
                                : 'bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-slate-400'
                            }`}
                          >
                            {step.status === 'completed'
                              ? t('completed')
                              : step.status === 'current'
                              ? t('currentStep')
                              : t('pending')}
                          </span>
                        </button>
                        <input
                          type="datetime-local"
                          value={stageDates[step.position] || ''}
                          onChange={(event) => setStageDate(step.position, event.target.value)}
                          aria-label={`${t('dateTimeFor')} ${step.title}`}
                          className="w-full sm:w-48 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none focus:border-amber-400 dark:border-white/10 dark:bg-[#08101a] dark:text-white font-en"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex min-h-80 items-center justify-center rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/50 backdrop-blur-xl dark:border-amber-500/20 dark:bg-[#0d1b2e]/60 dark:shadow-2xl">
              <div>
                <FilePlus2 className="mx-auto mb-3 text-amber-500 dark:text-amber-400" size={44} />
                <h2 className="text-lg font-black text-slate-900 dark:text-white">{t('noCaseSelected')}</h2>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{t('selectCaseFromList')}</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default AdminPanel;