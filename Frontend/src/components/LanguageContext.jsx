import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const translations = {
  en: {
    'تغییر پوسته': 'Change theme', 'تغییر به حالت روز': 'Switch to light mode', 'تغییر به حالت شب': 'Switch to dark mode',
    'استعلام خودرو': 'Vehicle inquiry', 'پیگیری محموله': 'Track shipment', 'آشنایی با خدمات': 'Explore services',
    'ترانزیت مطمئن از امارات': 'Trusted transit from the UAE', 'مطمئن از امارات': 'trusted from the UAE',
    'مسیر خودرویتان،': 'Your vehicle journey,', 'شفاف و سریع.': 'clear and fast.',
    'کار اکسپرس، تجربه‌ای دقیق و آرام از خرید، حمل، ترخیص و تحویل خودروی شما در مناطق آزاد ایران.': 'CarExpress delivers a precise, calm experience for buying, shipping, clearing, and delivering your vehicle in Iranian free zones.',
    'هر خودرو، با یک مسیر اختصاصی و قابل پیگیری.': 'Every vehicle gets a dedicated, trackable journey.', 'بیمه و نظارت در تمام مسیر': 'Insurance and oversight throughout the journey',
    'خودروی ترخیص شده': 'Vehicles cleared', 'رکورد زمانی ترخیص': 'Fastest clearance time', 'تضمین سلامت کالا': 'Cargo safety guarantee',
    'آرامش، بخشی از سرویس ماست.': 'Peace of mind is part of our service.', 'جزئیات مهم را مدیریت می‌کنیم تا شما فقط از رسیدن خودرو لذت ببرید.': 'We handle the important details so you can simply enjoy your vehicle arriving.',
    'بیمه تمام‌خطر بین‌المللی': 'International all-risk insurance', 'ترخیص سریع و تخصصی': 'Fast, expert clearance',
    'از لحظه تحویل در بنادر امارات تا تحویل نهایی، سرمایه شما تحت پوشش و نظارت است.': 'From handover at UAE ports to final delivery, your investment remains covered and monitored.',
    'تیم مستقر ما تمام مراحل اداری و تاییدیه‌ها را دقیق و کوتاه انجام می‌دهد.': 'Our on-site team handles every administrative step and approval with precision and speed.',
    'پایانه‌های استراتژیک': 'Strategic terminals', 'دبی': 'Dubai', 'شارجه': 'Sharjah', 'ابوظبی': 'Abu Dhabi',
    'هاب تجاری منطقه برای بارگیری ایمن خودروهای خاص.': 'The region’s commercial hub for safe loading of special vehicles.', 'کوتاه‌ترین مسیر دریایی برای کاهش زمان ترانزیت.': 'The shortest sea route for reduced transit time.', 'شاهراه مدرن برای مدیریت هوشمند خودروهای سفارشی.': 'A modern gateway for smart management of custom vehicles.',
    'اعتماد، از زبان مشتریان': 'Trust, in our customers’ words', 'روند کار فوق‌العاده حرفه‌ای و شفاف پیش رفت.': 'The process was remarkably professional and transparent.', 'تیم ترخیص سریع عمل کرد و خودرو دقیقاً به‌موقع تحویل شد.': 'The clearance team was fast and the vehicle arrived exactly on time.',
    'صفحه اصلی': 'Home', 'پنل مدیریت': 'Admin panel', 'سامانه رهگیری': 'Tracking center', 'مسیر خودروی شما،': 'Your vehicle journey,', 'شفاف و قابل پیگیری': 'clear and trackable',
    'کد پیگیری یا شماره شاسی را وارد کنید تا وضعیت حمل و اسناد پرونده را ببینید.': 'Enter a tracking code or VIN to view shipment status and case documents.', 'مشاهده وضعیت': 'View status', 'در حال استعلام...': 'Checking...', 'کد پیگیری پیدا نشد یا پرونده غیرفعال است.': 'Tracking code not found or the case is inactive.',
    'پرونده حمل خودرو': 'Vehicle shipment case', 'مشتری:': 'Customer:', 'پرونده فعال': 'Active case', 'مدل': 'Year', 'رهگیری': 'Tracking',
    'ورود مدیریت': 'Admin login', 'مدیریت پرونده‌های حمل خودرو': 'Manage vehicle shipment cases', 'شماره موبایل': 'Mobile number', 'رمز عبور': 'Password', 'ورود به پنل': 'Sign in', 'در حال ورود...': 'Signing in...', 'شماره موبایل یا رمز عبور نادرست است.': 'Incorrect mobile number or password.',
    'پرونده جدید': 'New case', 'فایل RTA': 'RTA file', 'فایل جدید': 'New file', 'دریافت پرونده‌ها ناموفق بود.': 'Could not load cases.', 'ذخیره پرونده': 'Save case', 'در حال ذخیره...': 'Saving...', 'حذف': 'Delete', 'حذف پرونده': 'Delete case', 'ویرایش پرونده': 'Edit case', 'ایجاد پرونده جدید': 'Create new case', 'اطلاعات فرم بعد از ذخیره در پرونده باقی می‌ماند.': 'Form information remains in the case after saving.', 'نام مشتری': 'Customer name', 'برند خودرو': 'Vehicle brand', 'مدل خودرو': 'Vehicle model', 'سال ساخت': 'Build year', 'رنگ خودرو': 'Vehicle color', 'تخمین تحویل (روز)': 'Estimated delivery (days)', 'مبدأ': 'Origin', 'مقصد': 'Destination', 'یادداشت مشتری': 'Customer note', 'فایل‌های جدید': 'New files', 'یک یا چند فایل اضافه کنید.': 'Add one or more files.', 'افزودن ردیف': 'Add row', 'عنوان فایل': 'File title', 'انتخاب فایل': 'Choose file', 'انتخاب یا تایپ برند...': 'Select or type a brand...', 'انتخاب یا تایپ مدل...': 'Select or type a model...', 'ابتدا برند را مشخص کنید': 'Select a brand first', 'فایل ثبت‌شده': 'Registered files', 'فایل‌های ثبت‌شده': 'Registered files', 'قابل نمایش برای گیرنده': 'Visible to recipient', 'پرونده‌ای انتخاب نشده': 'No case selected', 'از فهرست یک پرونده را انتخاب کنید.': 'Select a case from the list.', 'پرونده‌ای ثبت نشده است.': 'No cases have been registered.', 'از ۷ مرحله': 'of 7 steps', 'وضعیت مراحل': 'Step status', 'تکمیل شده': 'Completed', 'مرحله فعلی': 'Current step', 'در انتظار': 'Pending', 'وضعیت مراحل ذخیره شد.': 'Step status saved.', 'پرونده با موفقیت به‌روزرسانی شد.': 'Case updated successfully.', 'پرونده با موفقیت ایجاد شد.': 'Case created successfully.', 'پرونده حذف شد.': 'Case deleted.', 'فایل حذف شد.': 'File deleted.', 'حذف فایل': 'Delete file', 'ذخیره مراحل ناموفق بود.': 'Could not save steps.', 'ذخیره پرونده ناموفق بود.': 'Could not save the case.', 'حذف پرونده ناموفق بود.': 'Could not delete the case.', 'حذف فایل ناموفق بود.': 'Could not delete the file.',
  },
  ar: {
    'تغییر پوسته': 'تغيير المظهر', 'تغییر به حالت روز': 'التبديل إلى الوضع النهاري', 'تغییر به حالت شب': 'التبديل إلى الوضع الليلي',
    'استعلام خودرو': 'الاستعلام عن السيارة', 'پیگیری محموله': 'تتبع الشحنة', 'آشنایی با خدمات': 'تعرّف على خدماتنا', 'ترانزیت مطمئن از امارات': 'نقل موثوق من الإمارات', 'مسیر خودرویتان،': 'رحلة سيارتكم،', 'شفاف و سریع.': 'واضحة وسريعة.',
    'خودروی ترخیص شده': 'السيارات المخلّصة', 'رکورد زمانی ترخیص': 'أسرع وقت للتخليص', 'تضمین سلامت کالا': 'ضمان سلامة الشحنة', 'آرامش، بخشی از سرویس ماست.': 'راحة البال جزء من خدمتنا.', 'پایانه‌های استراتژیک': 'المحطات الاستراتيجية', 'دبی': 'دبي', 'شارجه': 'الشارقة', 'ابوظبی': 'أبوظبي', 'اعتماد، از زبان مشتریان': 'الثقة بلسان عملائنا',
    'سامانه رهگیری': 'مركز التتبع', 'پنل مدیریت': 'لوحة الإدارة', 'پرونده فعال': 'ملف نشط', 'مشتری:': 'العميل:', 'مشاهده وضعیت': 'عرض الحالة', 'در حال استعلام...': 'جارٍ الاستعلام...', 'رهگیری': 'التتبع', 'ورود مدیریت': 'تسجيل دخول الإدارة', 'مدیریت پرونده‌های حمل خودرو': 'إدارة ملفات شحن السيارات', 'شماره موبایل': 'رقم الهاتف', 'رمز عبور': 'كلمة المرور', 'ورود به پنل': 'دخول اللوحة', 'در حال ورود...': 'جارٍ تسجيل الدخول...', 'پرونده جدید': 'ملف جديد', 'ذخیره پرونده': 'حفظ الملف', 'در حال ذخیره...': 'جارٍ الحفظ...', 'حذف': 'حذف', 'حذف پرونده': 'حذف الملف', 'ویرایش پرونده': 'تعديل الملف', 'ایجاد پرونده جدید': 'إنشاء ملف جديد', 'نام مشتری': 'اسم العميل', 'برند خودرو': 'ماركة السيارة', 'مدل خودرو': 'طراز السيارة', 'سال ساخت': 'سنة الصنع', 'رنگ خودرو': 'لون السيارة', 'تخمین تحویل (روز)': 'التسليم المتوقع (بالأيام)', 'مبدأ': 'المصدر', 'مقصد': 'الوجهة', 'یادداشت مشتری': 'ملاحظة العميل', 'فایل‌های جدید': 'ملفات جديدة', 'یک یا چند فایل اضافه کنید.': 'أضف ملفاً واحداً أو أكثر.', 'افزودن ردیف': 'إضافة صف', 'عنوان فایل': 'عنوان الملف', 'انتخاب فایل': 'اختيار ملف', 'پرونده‌ای ثبت نشده است.': 'لا توجد ملفات مسجلة.', 'از ۷ مرحله': 'من 7 مراحل', 'پرونده‌ای انتخاب نشده': 'لم يتم اختيار ملف', 'از فهرست یک پرونده را انتخاب کنید.': 'اختر ملفاً من القائمة.', 'وضعیت مراحل': 'حالة المراحل', 'تکمیل شده': 'مكتمل', 'مرحله فعلی': 'المرحلة الحالية', 'در انتظار': 'قيد الانتظار', 'قابل نمایش برای گیرنده': 'مرئي للمستلم', 'حذف فایل': 'حذف الملف',
  },
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'fa');
  const dictionary = useMemo(() => translations[language] || {}, [language]);

  useEffect(() => {
    const allSources = [...new Set(Object.keys(translations.en).concat(Object.keys(translations.ar)))].sort((left, right) => right.length - left.length);
    const translateValue = (value) => {
      if (!value) return value;
      return allSources.reduce((result, source) => {
        const translated = dictionary[source] || source;
        const candidates = [source, translations.en[source], translations.ar[source]].filter(Boolean);
        const candidate = candidates.find((item) => result.includes(item));
        return candidate ? result.split(candidate).join(translated) : result;
      }, value);
    };
    const translate = () => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const textNodes = [];
      while (walker.nextNode()) textNodes.push(walker.currentNode);
      textNodes.forEach((node) => {
        const translated = translateValue(node.nodeValue);
        if (translated !== node.nodeValue) node.nodeValue = translated;
      });
      document.querySelectorAll('input[placeholder], textarea[placeholder], [title]').forEach((element) => {
        ['placeholder', 'title'].forEach((attribute) => {
          const current = element.getAttribute(attribute);
          const translated = translateValue(current);
          if (translated !== current) element.setAttribute(attribute, translated);
        });
      });
    };
    translate();
    const observer = new MutationObserver(translate);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [dictionary]);

  useEffect(() => {
    const direction = language === 'en' ? 'ltr' : 'rtl';
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.body.dir = direction;
    localStorage.setItem('language', language);
    window.dispatchEvent(new Event('languagechange'));
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t: (text) => dictionary[text] || text }), [language, dictionary]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="انتخاب زبان" className="rounded-full border border-white/30 bg-white/15 px-3 py-2 text-xs font-bold text-current outline-none backdrop-blur-md">
      <option value="fa">فارسی</option>
      <option value="en">English</option>
      <option value="ar">العربية</option>
    </select>
  );
};