import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilePlus2, FileText, Link2, LogOut, Save, Trash2, Upload, X } from 'lucide-react';

import api, { getApiError } from '../api';
import ThemeToggle from '../components/ThemeToggle';

const CAR_CATALOG = {
  Toyota: ['Camry', 'Corolla', 'Land Cruiser', 'RAV4', 'Prado', 'Hilux', 'Fortuner', 'Yaris', 'C-HR', 'Avalon', 'Supra', 'Land Cruiser 300'],
  Lexus: ['ES', 'IS', 'LS', 'LX', 'GX', 'RX', 'NX', 'UX', 'LM'],
  BMW: ['2 Series', '3 Series', '4 Series', '5 Series', '7 Series', 'X1', 'X3', 'X5', 'X6', 'X7', 'i4', 'iX'],
  'Mercedes-Benz': ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLC', 'GLE', 'GLS', 'G-Class', 'V-Class'],
  Porsche: ['911', '718 Cayman', '718 Boxster', 'Cayenne', 'Macan', 'Panamera', 'Taycan'],
  Audi: ['A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q3', 'Q5', 'Q7', 'Q8', 'e-tron'],
  Volkswagen: ['Golf', 'Passat', 'Jetta', 'Tiguan', 'Touareg', 'Atlas', 'ID.4'],
  Hyundai: ['Accent', 'Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Palisade', 'Kona', 'Ioniq 5', 'Azera'],
  Kia: ['Picanto', 'Rio', 'Cerato', 'K5', 'Sportage', 'Sorento', 'Telluride', 'Carnival', 'EV6', 'Seltos'],
  Genesis: ['G70', 'G80', 'G90', 'GV70', 'GV80'],
  Nissan: ['Sunny', 'Sentra', 'Altima', 'Maxima', 'Kicks', 'Qashqai', 'X-Trail', 'Patrol', 'Navara', 'Z'],
  Infiniti: ['Q30', 'Q50', 'QX50', 'QX55', 'QX60', 'QX80'],
  Honda: ['Civic', 'Accord', 'City', 'CR-V', 'HR-V', 'Pilot', 'Odyssey'],
  Ford: ['Focus', 'Mustang', 'Fusion', 'Taurus', 'Escape', 'Explorer', 'Expedition', 'F-150', 'Ranger'],
  Chevrolet: ['Spark', 'Malibu', 'Camaro', 'Corvette', 'Equinox', 'Traverse', 'Tahoe', 'Suburban', 'Silverado'],
  Jeep: ['Renegade', 'Compass', 'Cherokee', 'Grand Cherokee', 'Wrangler', 'Gladiator'],
  'Land Rover': ['Range Rover', 'Range Rover Sport', 'Range Rover Velar', 'Range Rover Evoque', 'Defender', 'Discovery'],
  Volvo: ['S60', 'S90', 'XC40', 'XC60', 'XC90'],
  Maserati: ['Ghibli', 'Quattroporte', 'Levante', 'Grecale', 'MC20'],
};

const EMPTY_FORM = { tracking_code: '', car_brand: '', car_model: '', build_year: '', color: '', origin: '', destination: '', estimated_arrival: '', customer_note: '', is_active: true };
const normalizeDigits = (value = '') => String(value).replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit))).replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦۷۸۹'.indexOf(digit)));
const fileUrl = (file) => file?.startsWith('http') ? file : `${window.location.origin}${file || ''}`;
const formFromShipment = (shipment) => ({ ...EMPTY_FORM, tracking_code: normalizeDigits(shipment?.tracking_code || ''), car_brand: shipment?.car_brand || '', car_model: shipment?.car_model || '', build_year: normalizeDigits(shipment?.build_year || ''), color: shipment?.color || '', origin: shipment?.origin || '', destination: shipment?.destination || '', estimated_arrival: normalizeDigits(shipment?.estimated_arrival || '').replace(/[^0-9]/g, ''), customer_note: shipment?.customer_note || '', is_active: shipment?.is_active ?? true });
const inputClass = 'mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#f36b21] focus:ring-4 focus:ring-[#f36b21]/10 dark:border-white/10 dark:bg-[#0d2034] dark:text-white';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem('adminAccessToken'));
  const [credentials, setCredentials] = useState({ phone_number: '', password: '' });
  const [shipments, setShipments] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [newFiles, setNewFiles] = useState([{ title: 'فایل RTA', file: null }]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const selected = useMemo(() => shipments.find((item) => item.id === selectedId) || null, [shipments, selectedId]);
  
  const brands = Object.keys(CAR_CATALOG);
  const models = form.car_brand ? CAR_CATALOG[form.car_brand] || [] : [];

  const clearAlerts = () => { setMessage(''); setError(''); };
  const logout = () => { localStorage.removeItem('adminAccessToken'); localStorage.removeItem('adminRefreshToken'); setToken(null); setShipments([]); setSelectedId(null); setShowForm(false); };
  
  const loadShipments = async (preferredId = selectedId) => {
    try {
      const response = await api.get('/admin/shipments/');
      const list = Array.isArray(response.data) ? response.data : response.data.results || [];
      setShipments(list);
      if (preferredId) setSelectedId(preferredId);
    } catch (requestError) {
      if (requestError?.response?.status === 401) logout();
      setError(getApiError(requestError, 'دریافت پرونده‌ها ناموفق بود.'));
    }
  };

  useEffect(() => { if (token) loadShipments(); }, [token]);

  const openShipment = (shipment) => { clearAlerts(); setSelectedId(shipment.id); setForm(formFromShipment(shipment)); setNewFiles([{ title: 'RTA', file: null }]); setShowForm(true); };
  const startNew = () => { clearAlerts(); setSelectedId(null); setForm({ ...EMPTY_FORM }); setNewFiles([{ title: 'فایل RTA', file: null }]); setShowForm(true); };
  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: field === 'tracking_code' || field === 'build_year' ? normalizeDigits(value) : value }));
  const updateFile = (index, field, value) => setNewFiles((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item));

  const login = async (event) => {
    event.preventDefault(); clearAlerts(); setBusy(true);
    try { const response = await api.post('/auth/login/', credentials); localStorage.setItem('adminAccessToken', response.data.access); localStorage.setItem('adminRefreshToken', response.data.refresh); setToken(response.data.access); }
    catch (requestError) { setError(getApiError(requestError, 'شماره موبایل یا رمز عبور نادرست است.')); } finally { setBusy(false); }
  };

  const saveShipment = async (event) => {
    event.preventDefault(); clearAlerts(); setBusy(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, key === 'estimated_arrival' ? (value ? `${normalizeDigits(value)} روز` : '') : value ?? ''));
      newFiles.forEach((item, index) => { if (item.file) { data.append('uploaded_files', item.file); data.append('file_titles', item.title.trim() || `فایل ${index + 1}`); } });
      const response = selected ? await api.patch(`/admin/shipments/${selected.id}/`, data) : await api.post('/admin/shipments/', data);
      setMessage(selected ? 'پرونده با موفقیت به‌روزرسانی شد.' : 'پرونده با موفقیت ایجاد شد.');
      await loadShipments(response.data.id); setSelectedId(response.data.id); setShowForm(true); setNewFiles([{ title: 'فایل جدید', file: null }]);
    } catch (requestError) { setError(getApiError(requestError, 'ذخیره پرونده ناموفق بود.')); } finally { setBusy(false); }
  };

  const deleteShipment = async () => {
    if (!selected || !window.confirm(`پرونده ${selected.tracking_code} حذف شود؟`)) return;
    clearAlerts(); setBusy(true);
    try { await api.delete(`/admin/shipments/${selected.id}/`); setMessage('پرونده حذف شد.'); setSelectedId(null); setShowForm(false); await loadShipments(null); }
    catch (requestError) { setError(getApiError(requestError, 'حذف پرونده ناموفق بود.')); } finally { setBusy(false); }
  };

  const deleteDocument = async (document) => {
    if (!selected || !window.confirm(`فایل ${document.title} حذف شود؟`)) return;
    clearAlerts(); setBusy(true);
    try { await api.delete(`/admin/shipments/${selected.id}/documents/${document.id}/`); setMessage('فایل حذف شد.'); await loadShipments(selected.id); }
    catch (requestError) { setError(getApiError(requestError, 'حذف فایل ناموفق بود.')); } finally { setBusy(false); }
  };

  const setCompletedThrough = async (position) => {
    if (!selected) return;
    try { await api.patch(`/admin/shipments/${selected.id}/`, { completed_steps: position }); setMessage('وضعیت مراحل ذخیره شد.'); await loadShipments(selected.id); }
    catch (requestError) { setError(getApiError(requestError, 'ذخیره مراحل ناموفق بود.')); }
  };

  if (!token) return <main className="flex min-h-screen items-center justify-center bg-[#f4f6f8] px-4 dark:bg-[#091827]">
    <form onSubmit={login} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl dark:bg-[#12283e]">
      <div className="mb-8 flex items-center justify-between">
        <strong className="font-outfit text-2xl">Car<span className="text-[#f36b21]">Express</span></strong>
        <ThemeToggle />
      </div>
      <h1 className="text-2xl font-extrabold">ورود مدیریت</h1>
      <p className="mb-6 mt-2 text-sm text-slate-400">مدیریت پرونده‌های حمل خودرو</p>
      <input className={inputClass} dir="ltr" placeholder="شماره موبایل" value={credentials.phone_number} onChange={(event) => setCredentials({ ...credentials, phone_number: normalizeDigits(event.target.value) })} required />
      <input className={inputClass} dir="ltr" type="password" placeholder="رمز عبور" value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} required />
      {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-600">{error}</p>}
      <button disabled={busy} className="mt-5 w-full rounded-2xl bg-[#f36b21] py-3.5 font-bold text-white disabled:opacity-60">{busy ? 'در حال ورود...' : 'ورود به پنل'}</button>
    </form>
  </main>;

  return <main className="min-h-screen bg-[#f4f6f8] text-[#102238] dark:bg-[#091827] dark:text-white">
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#091827]/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <button onClick={() => navigate('/')} className="font-outfit text-xl font-extrabold">Car<span className="text-[#f36b21]">Express</span></button>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => navigate('/tracking')} className="rounded-xl border border-[#f36b21]/30 px-3 py-2 text-xs font-bold text-[#f36b21]">رهگیری</button>
          <button onClick={logout} className="flex items-center gap-1.5 rounded-xl bg-[#102238] px-3 py-2 text-xs font-bold text-white dark:bg-white/10"><LogOut size={14} /> خروج</button>
        </div>
      </div>
    </header>
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-7 sm:px-6 lg:grid-cols-[300px_1fr]">
      <aside className="h-fit rounded-3xl bg-white p-4 shadow-lg dark:bg-[#12283e]">
        <button onClick={startNew} className="mb-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#f36b21] py-3.5 text-sm font-bold text-white"><FilePlus2 size={18} /> پرونده جدید</button>
        <div className="space-y-2">{shipments.map((shipment) => <button key={shipment.id} onClick={() => openShipment(shipment)} className={`w-full rounded-2xl border p-4 text-right transition ${selectedId === shipment.id ? 'border-[#f36b21] bg-[#f36b21]/10' : 'border-slate-100 hover:border-[#f36b21]/40 dark:border-white/10'}`}>
          <div className="flex items-center justify-between">
            <span dir="ltr" className="font-outfit text-xs font-bold text-[#f36b21]">{shipment.tracking_code}</span>
            <span className={`h-2.5 w-2.5 rounded-full ${shipment.is_active ? 'bg-emerald-500' : 'bg-slate-400'}`} />
          </div>
          <strong className="mt-2 block truncate text-sm">{shipment.car_brand} {shipment.car_model}</strong>
          <span className="mt-1 block text-[11px] text-slate-400">{shipment.completed_steps} از ۷ مرحله</span>
        </button>)}{!shipments.length && <p className="p-5 text-center text-xs text-slate-400">پرونده‌ای ثبت نشده است.</p>}</div>
      </aside>
      <section className="space-y-5">
        {(message || error) && <div className={`rounded-2xl p-4 text-sm font-bold ${error ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'}`}>{error || message}</div>}
        {showForm ? <>
          <form onSubmit={saveShipment} className="rounded-3xl bg-white p-6 shadow-lg dark:bg-[#12283e] md:p-8">
            <div className="mb-7 flex items-start justify-between border-b border-slate-100 pb-5 dark:border-white/10">
              <div>
                <h1 className="text-xl font-extrabold">{selected ? 'ویرایش پرونده' : 'ایجاد پرونده جدید'}</h1>
                <p className="mt-1 text-xs text-slate-400">اطلاعات فرم بعد از ذخیره در پرونده باقی می‌ماند.</p>
              </div>
              {selected && <button type="button" onClick={deleteShipment} className="flex items-center gap-1.5 rounded-xl border border-red-200 px-3 py-2 text-xs font-bold text-red-600"><Trash2 size={14} /> حذف</button>}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-xs font-bold text-slate-500">کد پیگیری / VIN<input className={`${inputClass} font-outfit`} dir="ltr" value={form.tracking_code} onChange={(event) => updateField('tracking_code', event.target.value)} required /></label>
              
              {/* فیلد برند با قابلیت انتخاب و تایپ آزاد */}
              <label className="text-xs font-bold text-slate-500">برند خودرو
                <input 
                  className={inputClass} 
                  list="brands-list"
                  value={form.car_brand} 
                  onChange={(event) => setForm({ ...form, car_brand: event.target.value, car_model: '' })} 
                  placeholder="انتخاب یا تایپ برند..."
                  required 
                />
                <datalist id="brands-list">
                  {brands.map((brand) => <option key={brand} value={brand} />)}
                </datalist>
              </label>

              {/* فیلد مدل با قابلیت انتخاب و تایپ آزاد */}
              <label className="text-xs font-bold text-slate-500">مدل خودرو
                <input 
                  className={inputClass} 
                  list="models-list"
                  value={form.car_model} 
                  onChange={(event) => updateField('car_model', event.target.value)} 
                  placeholder={form.car_brand ? "انتخاب یا تایپ مدل..." : "ابتدا برند را مشخص کنید"}
                  required 
                />
                <datalist id="models-list">
                  {models.map((model) => <option key={model} value={model} />)}
                </datalist>
              </label>

              <label className="text-xs font-bold text-slate-500">سال ساخت<input className={inputClass} inputMode="numeric" value={form.build_year} onChange={(event) => updateField('build_year', event.target.value)} /></label>
              <label className="text-xs font-bold text-slate-500">رنگ خودرو<input className={inputClass} value={form.color} onChange={(event) => updateField('color', event.target.value)} /></label>
              <label className="text-xs font-bold text-slate-500">تخمین تحویل (روز)<input className={inputClass} inputMode="numeric" value={form.estimated_arrival} onChange={(event) => updateField('estimated_arrival', normalizeDigits(event.target.value).replace(/[^0-9]/g, ''))} /></label>
              <label className="text-xs font-bold text-slate-500">مبدأ<input className={inputClass} value={form.origin} onChange={(event) => updateField('origin', event.target.value)} required /></label>
              <label className="text-xs font-bold text-slate-500">مقصد<input className={inputClass} value={form.destination} onChange={(event) => updateField('destination', event.target.value)} required /></label>
              <label className="text-xs font-bold text-slate-500 md:col-span-2">یادداشت مشتری<textarea className={`${inputClass} min-h-24`} value={form.customer_note} onChange={(event) => updateField('customer_note', event.target.value)} /></label>
            </div>

            <div className="mt-6 rounded-2xl border border-dashed border-[#f36b21]/40 bg-[#f36b21]/5 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="flex items-center gap-2 text-sm font-extrabold"><Upload size={17} className="text-[#f36b21]" /> فایل‌های جدید</h2>
                  <p className="mt-1 text-[11px] text-slate-400">یک یا چند فایل اضافه کنید.</p>
                </div>
                <button type="button" onClick={() => setNewFiles((current) => [...current, { title: '', file: null }])} className="rounded-xl bg-[#f36b21]/10 px-3 py-2 text-xs font-bold text-[#f36b21]">+ افزودن ردیف</button>
              </div>
              <div className="space-y-3">{newFiles.map((item, index) => <div key={index} className="flex flex-col gap-2 rounded-2xl bg-white p-3 dark:bg-[#0d2034] sm:flex-row sm:items-center">
                <input className="w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-xs outline-none focus:border-[#f36b21] sm:w-1/3" placeholder="عنوان فایل" value={item.title} onChange={(event) => updateFile(index, 'title', event.target.value)} />
                <label className="flex min-w-0 flex-1 items-center gap-2 text-xs text-slate-500">
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" className="sr-only" onChange={(event) => updateFile(index, 'file', event.currentTarget.files?.[0] || null)} />
                  <span title="انتخاب فایل" className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-[#f36b21]/10 text-[#f36b21] transition hover:bg-[#f36b21]/20 focus-within:ring-4 focus-within:ring-[#f36b21]/10"><Upload size={18} /></span>
                  <span className="min-w-0 truncate">{item.file?.name || 'انتخاب فایل'}</span>
                </label>
                {newFiles.length > 1 && <button type="button" onClick={() => setNewFiles((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="self-end rounded-lg p-2 text-red-500"><X size={16} /></button>}
              </div>)}</div>
            </div>

            {selected?.documents?.length > 0 && <div className="mt-5 border-t border-slate-100 pt-5 dark:border-white/10">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-extrabold"><FileText size={17} className="text-[#f36b21]" /> فایل‌های ثبت‌شده</h2>
              <div className="flex flex-wrap gap-2">{selected.documents.map((doc) => <div key={doc.id} className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 text-xs font-bold text-[#f36b21] dark:bg-white/10">
                <a href={fileUrl(doc.file)} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-2 py-1"><Link2 size={14} />{doc.title}</a>
                <button type="button" title="حذف فایل" aria-label={`حذف فایل ${doc.title}`} onClick={() => deleteDocument(doc)} disabled={busy} className="rounded-lg p-1.5 text-red-500 transition hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-950/30"><Trash2 size={14} /></button>
              </div>)}</div>
            </div>}

            <label className="mt-5 flex items-center gap-2 text-sm font-bold">
              <input type="checkbox" checked={form.is_active} onChange={(event) => setForm({ ...form, is_active: event.target.checked })} className="h-4 w-4 accent-[#f36b21]" /> قابل نمایش برای گیرنده
            </label>
            <button disabled={busy} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#f36b21] py-4 text-sm font-extrabold text-white disabled:opacity-60"><Save size={18} />{busy ? 'در حال ذخیره...' : 'ذخیره پرونده'}</button>
          </form>

          {selected && <div className="rounded-3xl bg-white p-6 shadow-lg dark:bg-[#12283e]">
            <h2 className="mb-4 text-lg font-extrabold">وضعیت مراحل</h2>
            <div className="space-y-2">{selected.steps.map((step) => <button type="button" key={step.id} onClick={() => setCompletedThrough(step.position)} className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-right ${step.status === 'completed' ? 'border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20' : step.status === 'current' ? 'border-[#f36b21] bg-[#f36b21]/5' : 'border-slate-100 dark:border-white/10'}`}>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 font-outfit text-xs dark:bg-white/10">{step.position}</span>
              <span className="text-xs font-bold">{step.title}</span>
              <span className="mr-auto text-[10px] text-slate-400">{step.status === 'completed' ? 'تکمیل شده' : step.status === 'current' ? 'مرحله فعلی' : 'در انتظار'}</span>
            </button>)}</div>
          </div>}
        </> : <div className="flex min-h-80 items-center justify-center rounded-3xl bg-white text-center shadow-lg dark:bg-[#12283e]">
          <div>
            <FilePlus2 className="mx-auto mb-3 text-[#f36b21]" size5={42} size={42} />
            <h2 className="font-extrabold">پرونده‌ای انتخاب نشده</h2>
            <p className="mt-2 text-xs text-slate-400">از فهرست یک پرونده را انتخاب کنید.</p>
          </div>
        </div>}
      </section>
    </div>
  </main>;
};

export default AdminPanel;