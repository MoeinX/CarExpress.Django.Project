import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

export const SUPPORTED_LANGUAGES = [
  { code: 'fa', label: 'فارسی', shortLabel: 'FA', dir: 'rtl', flag: '🇮🇷' },
  { code: 'ar', label: 'العربية', shortLabel: 'AR', dir: 'rtl', flag: '🇦🇪' },
  { code: 'en', label: 'English', shortLabel: 'EN', dir: 'ltr', flag: '🇬🇧' },
];

export const translations = {
  fa: {
    // Nav & Common
    appName: 'CarExpress',
    home: 'صفحه اصلی',
    tracking: 'سامانه رهگیری',
    adminPanel: 'پنل مدیریت',
    vehicleInquiry: 'استعلام خودرو',
    logout: 'خروج',
    themeToggle: 'تغییر پوسته',
    switchToLight: 'تغییر به حالت روز',
    switchToDark: 'تغییر به حالت شب',
    selectLanguage: 'انتخاب زبان',

    // Titles
    titleHome: 'CarExpress | ترانزیت و لجستیک ایمن خودرو',
    titleTracking: 'رهگیری محموله خودرو | CarExpress',
    titleAdmin: 'پنل مدیریت | CarExpress',

    // HomePage Hero
    heroBadge: 'ترانزیت مطمئن از امارات',
    heroTitle1: 'مسیر خودرویتان،',
    heroTitle2: 'شفاف و سریع.',
    heroSubtitle: 'کار اکسپرس، تجربه‌ای دقیق و آرام از خرید، حمل، ترخیص و تحویل خودروی شما در مناطق آزاد ایران.',
    trackShipment: 'پیگیری محموله',
    exploreServices: 'آشنایی با خدمات',
    expressStandard: 'The express standard',
    expressStandardDesc: 'هر خودرو، با یک مسیر اختصاصی و قابل پیگیری.',
    insuranceOversight: 'بیمه و نظارت در تمام مسیر',

    // HomePage Stats
    clearedVehicles: 'خودروی ترخیص شده',
    clearanceRecord: 'رکورد زمانی ترخیص',
    safetyGuarantee: 'تضمین سلامت کالا',

    // HomePage Services
    ourPromise: 'Our promise',
    promiseTitle: 'آرامش، بخشی از سرویس ماست.',
    promiseSubtitle: 'جزئیات مهم را مدیریت می‌کنیم تا شما فقط از رسیدن خودرو لذت ببرید.',
    service1Title: 'بیمه تمام‌خطر بین‌المللی',
    service1Desc: 'از لحظه تحویل در بنادر امارات تا تحویل نهایی، سرمایه شما تحت پوشش و نظارت است.',
    service2Title: 'ترخیص سریع و تخصصی',
    service2Desc: 'تیم مستقر ما تمام مراحل اداری و تاییدیه‌ها را دقیق و کوتاه انجام می‌دهد.',

    // HomePage Terminals
    ourNetwork: 'Our network',
    strategicTerminals: 'پایانه‌های استراتژیک',
    dubai: 'دبی',
    dubaiDesc: 'هاب تجاری منطقه برای بارگیری ایمن خودروهای خاص.',
    sharjah: 'شارجه',
    sharjahDesc: 'کوتاه‌ترین مسیر دریایی برای کاهش زمان ترانزیت.',
    abuDhabi: 'ابوظبی',
    abuDhabiDesc: 'شاهراه مدرن برای مدیریت هوشمند خودروهای سفارشی.',

    // HomePage Testimonials & Footer
    testimonialsTitle: 'اعتماد، از زبان مشتریان',
    client1Name: 'امیرحسین راد',
    client1Quote: 'روند کار فوق‌العاده حرفه‌ای و شفاف پیش رفت.',
    client2Name: 'محمد تهرانی',
    client2Quote: 'تیم ترخیص سریع عمل کرد و خودرو دقیقاً به‌موقع تحویل شد.',
    footerDesc: 'سامانه تخصصی واردات و لجستیک ایمن خودرو',

    // TrackingPage
    trackingHeaderTag: 'CarExpress / سامانه رهگیری',
    trackingHeaderTitle1: 'مسیر خودروی شما،',
    trackingHeaderTitle2: 'شفاف و قابل پیگیری',
    trackingHeaderSubtitle: 'کد پیگیری یا شماره شاسی را وارد کنید تا وضعیت حمل و اسناد پرونده را ببینید.',
    trackingPlaceholder: 'TRQ-8902 یا VIN',
    viewStatus: 'مشاهده وضعیت',
    checking: 'در حال استعلام...',
    trackingNotFound: 'کد پیگیری پیدا نشد یا پرونده غیرفعال است.',
    vehicleShipmentCase: 'پرونده حمل خودرو',
    customerLabel: 'مشتری:',
    activeCase: 'پرونده فعال',
    currentStep: 'مرحله فعلی',
    awaitingStart: 'در انتظار شروع',
    routeSummary: 'خلاصه مسیر',
    origin: 'مبدأ',
    destination: 'مقصد',
    estimatedDelivery: 'تخمین تحویل',
    underReview: 'در حال بررسی',
    modelYear: 'مدل',
    caseDocuments: 'اسناد پرونده',
    caseDocumentsSub: 'مدارکی که مدیر برای گیرنده ثبت کرده است',
    filesCount: 'فایل',
    viewOrDownload: 'مشاهده یا دانلود',
    noDocuments: 'هنوز فایلی برای این پرونده ثبت نشده است.',

    // AdminPanel
    adminLogin: 'ورود مدیریت',
    adminLoginSub: 'مدیریت پرونده‌های حمل خودرو',
    mobileNumber: 'شماره موبایل',
    password: 'رمز عبور',
    signIn: 'ورود به پنل',
    signingIn: 'در حال ورود...',
    loginError: 'شماره موبایل یا رمز عبور نادرست است.',
    fetchCasesFailed: 'دریافت پرونده‌ها ناموفق بود.',
    newCase: 'پرونده جدید',
    of7Steps: 'از ۷ مرحله',
    noCasesRegistered: 'پرونده‌ای ثبت نشده است.',
    editCase: 'ویرایش پرونده',
    createNewCase: 'ایجاد پرونده جدید',
    formPersistenceNote: 'اطلاعات فرم بعد از ذخیره در پرونده باقی می‌ماند.',
    delete: 'حذف',
    trackingCodeVin: 'کد پیگیری / VIN',
    customerName: 'نام مشتری',
    carBrand: 'برند خودرو',
    selectOrTypeBrand: 'انتخاب یا تایپ برند...',
    carModel: 'مدل خودرو',
    selectOrTypeModel: 'انتخاب یا تایپ مدل...',
    selectBrandFirst: 'ابتدا برند را مشخص کنید',
    buildYear: 'سال ساخت',
    color: 'رنگ خودرو',
    estimatedDeliveryDays: 'تخمین تحویل (روز)',
    customerNote: 'یادداشت مشتری',
    newFiles: 'فایل‌های جدید',
    addOneOrMoreFiles: 'یک یا چند فایل اضافه کنید.',
    addRow: '+ افزودن ردیف',
    fileTitle: 'عنوان فایل',
    chooseFile: 'انتخاب فایل',
    registeredFiles: 'فایل‌های ثبت‌شده',
    deleteFile: 'حذف فایل',
    visibleToRecipient: 'قابل نمایش برای گیرنده',
    saveCase: 'ذخیره پرونده',
    saving: 'در حال ذخیره...',
    stepsStatus: 'وضعیت مراحل',
    completed: 'تکمیل شده',
    pending: 'در انتظار',
    dateTimeFor: 'تاریخ و ساعت',
    noCaseSelected: 'پرونده‌ای انتخاب نشده',
    selectCaseFromList: 'از فهرست یک پرونده را انتخاب کنید.',
    caseUpdatedSuccess: 'پرونده با موفقیت به‌روزرسانی شد.',
    caseCreatedSuccess: 'پرونده با موفقیت ایجاد شد.',
    caseDeleted: 'پرونده حذف شد.',
    fileDeleted: 'فایل حذف شد.',
    stepsSaved: 'وضعیت مراحل ذخیره شد.',
    stageDateSaved: 'تاریخ مرحله ذخیره شد.',
    saveCaseFailed: 'ذخیره پرونده ناموفق بود.',
    deleteCaseFailed: 'حذف پرونده ناموفق بود.',
    deleteFileFailed: 'حذف فایل ناموفق بود.',
    saveStepsFailed: 'ذخیره مراحل ناموفق بود.',
    saveDateFailed: 'ذخیره تاریخ مرحله ناموفق بود.',
    rtaFileDefault: 'فایل RTA',
    newFileDefault: 'فایل جدید',
    filePrefix: 'فایل',
    confirmDeleteCase: 'پرونده {code} حذف شود؟',
    confirmDeleteDoc: 'فایل {title} حذف شود؟',
    daysSuffix: 'روز',
    generalError: 'خطایی رخ داد. دوباره تلاش کنید.',
  },

  ar: {
    // Nav & Common
    appName: 'كار إكسبريس',
    home: 'الرئيسية',
    tracking: 'مركز التتبع',
    adminPanel: 'لوحة الإدارة',
    vehicleInquiry: 'الاستعلام عن السيارة',
    logout: 'تسجيل الخروج',
    themeToggle: 'تغيير المظهر',
    switchToLight: 'التبديل إلى الوضع النهاري',
    switchToDark: 'التبديل إلى الوضع الليلي',
    selectLanguage: 'اختيار اللغة',

    // Titles
    titleHome: 'CarExpress | نقل ولوجستيات السيارات الآمنة',
    titleTracking: 'تتبع شحنة السيارة | CarExpress',
    titleAdmin: 'لوحة الإدارة | CarExpress',

    // HomePage Hero
    heroBadge: 'نقل موثوق من الإمارات',
    heroTitle1: 'رحلة سيارتكم،',
    heroTitle2: 'واضحة وسريعة.',
    heroSubtitle: 'كار إكسبريس، تجربة دقيقة وهادئة لشراء، شحن، تخليص وتسليم سيارتك في المناطق الحرة الإيرانية.',
    trackShipment: 'تتبع الشحنة',
    exploreServices: 'التعرف على الخدمات',
    expressStandard: 'The express standard',
    expressStandardDesc: 'كل سيارة، برحلة مخصصة وقابلة للتتبع.',
    insuranceOversight: 'تأمين ورقابة طوال المسار',

    // HomePage Stats
    clearedVehicles: 'سيارة تم تخليصها',
    clearanceRecord: 'أسرع وقت للتخليص',
    safetyGuarantee: 'ضمان سلامة الشحنة',

    // HomePage Services
    ourPromise: 'Our promise',
    promiseTitle: 'راحة البال، جزء من خدمتنا.',
    promiseSubtitle: 'ندير كافة التفاصيل الهامة لتستمتع فقط بلحظة وصول سيارتك.',
    service1Title: 'تأمين شامل دولي ضد المخاطر',
    service1Desc: 'من لحظة الاستلام في موانئ الإمارات حتى التسليم النهائي، استثمارك مغطى وتحت المراقبة.',
    service2Title: 'تخليص سريع واحترافي',
    service2Desc: 'فريقنا المتواجد ينجز كافة الإجراءات الإدارية والموافقات بدقة وسرعة فائقة.',

    // HomePage Terminals
    ourNetwork: 'Our network',
    strategicTerminals: 'المحطات الاستراتيجية',
    dubai: 'دبي',
    dubaiDesc: 'المركز التجاري الإقليمي للتحميل الآمن للسيارات المميزة والفاخرة.',
    sharjah: 'الشارقة',
    sharjahDesc: 'أقصر مسار بحري لتقليل وقت الترانزيت والشحن.',
    abuDhabi: 'أبوظبي',
    abuDhabiDesc: 'بوابة عصرية للإدارة الذكية للسيارات الخاصة والمعدلة.',

    // HomePage Testimonials & Footer
    testimonialsTitle: 'الثقة، بلسان عملائنا',
    client1Name: 'أمير حسين راد',
    client1Quote: 'سارت الإجراءات باحترافية وشفافية فائقة تفوق التوقعات.',
    client2Name: 'محمد طهراني',
    client2Quote: 'فريق التخليص كان سريعاً جداً وتم تسليم السيارة في الوقت المحدد تماماً.',
    footerDesc: 'المنظومة التخصصية لاستيراد ولوجستيات السيارات الآمنة',

    // TrackingPage
    trackingHeaderTag: 'CarExpress / مركز التتبع',
    trackingHeaderTitle1: 'رحلة سيارتكم،',
    trackingHeaderTitle2: 'واضحة وقابلة للتتبع',
    trackingHeaderSubtitle: 'أدخل رمز التتبع أو رقم الهيكل للاطلاع على حالة الشحن ومستندات الملف.',
    trackingPlaceholder: 'TRQ-8902 أو VIN',
    viewStatus: 'عرض الحالة',
    checking: 'جارٍ الاستعلام...',
    trackingNotFound: 'لم يتم العثور على رمز التتبع أو أن الملف غير نشط.',
    vehicleShipmentCase: 'ملف شحن السيارة',
    customerLabel: 'العميل:',
    activeCase: 'ملف نشط',
    currentStep: 'المرحلة الحالية',
    awaitingStart: 'في انتظار البدء',
    routeSummary: 'ملخص المسار',
    origin: 'المصدر',
    destination: 'الوجهة',
    estimatedDelivery: 'التسليم المتوقع',
    underReview: 'قيد المراجعة',
    modelYear: 'سنة الصنع',
    caseDocuments: 'مستندات الملف',
    caseDocumentsSub: 'المستندات التي سجلتها الإدارة للمستلم',
    filesCount: 'ملفات',
    viewOrDownload: 'عرض أو تحميل',
    noDocuments: 'لم يتم تسجيل أي مستندات لهذا الملف حتى الآن.',

    // AdminPanel
    adminLogin: 'تسجيل دخول الإدارة',
    adminLoginSub: 'إدارة ملفات شحن السيارات',
    mobileNumber: 'رقم الهاتف',
    password: 'كلمة المرور',
    signIn: 'دخول اللوحة',
    signingIn: 'جارٍ تسجيل الدخول...',
    loginError: 'رقم الهاتف أو كلمة المرور غير صحيحة.',
    fetchCasesFailed: 'فشل استرجاع الملفات.',
    newCase: 'ملف جديد',
    of7Steps: 'من 7 مراحل',
    noCasesRegistered: 'لا توجد ملفات مسجلة.',
    editCase: 'تعديل الملف',
    createNewCase: 'إنشاء ملف جديد',
    formPersistenceNote: 'ستبقى معلومات النموذج محفوظة في الملف بعد الحفظ.',
    delete: 'حذف',
    trackingCodeVin: 'رمز التتبع / VIN',
    customerName: 'اسم العميل',
    carBrand: 'ماركة السيارة',
    selectOrTypeBrand: 'اختر أو اكتب الماركة...',
    carModel: 'طراز السيارة',
    selectOrTypeModel: 'اختر أو اكتب الطراز...',
    selectBrandFirst: 'حدد الماركة أولاً',
    buildYear: 'سنة الصنع',
    color: 'لون السيارة',
    estimatedDeliveryDays: 'التسليم المتوقع (بالأيام)',
    customerNote: 'ملاحظة العميل',
    newFiles: 'ملفات جديدة',
    addOneOrMoreFiles: 'أضف ملفاً واحداً أو أكثر.',
    addRow: '+ إضافة صف',
    fileTitle: 'عنوان الملف',
    chooseFile: 'اختيار ملف',
    registeredFiles: 'الملفات المسجلة',
    deleteFile: 'حذف الملف',
    visibleToRecipient: 'مرئي للمستلم',
    saveCase: 'حفظ الملف',
    saving: 'جارٍ الحفظ...',
    stepsStatus: 'حالة المراحل',
    completed: 'مكتمل',
    pending: 'قيد الانتظار',
    dateTimeFor: 'تاريخ ووقت',
    noCaseSelected: 'لم يتم اختيار أي ملف',
    selectCaseFromList: 'اختر ملفاً من القائمة.',
    caseUpdatedSuccess: 'تم تحديث الملف بنجاح.',
    caseCreatedSuccess: 'تم إنشاء الملف بنجاح.',
    caseDeleted: 'تم حذف الملف.',
    fileDeleted: 'تم حذف الملف.',
    stepsSaved: 'تم حفظ حالة المراحل.',
    stageDateSaved: 'تم حفظ تاريخ المرحلة.',
    saveCaseFailed: 'فشل في حفظ الملف.',
    deleteCaseFailed: 'فشل في حذف الملف.',
    deleteFileFailed: 'فشل في حذف الملف.',
    saveStepsFailed: 'فشل في حفظ المراحل.',
    saveDateFailed: 'فشل في حفظ تاريخ المرحلة.',
    rtaFileDefault: 'ملف RTA',
    newFileDefault: 'ملف جديد',
    filePrefix: 'ملف',
    confirmDeleteCase: 'هل تريد حذف الملف {code}؟',
    confirmDeleteDoc: 'هل تريد حذف الملف {title}؟',
    daysSuffix: 'أيام',
    generalError: 'حدث خطأ. يرجى المحاولة مرة أخرى.',
  },

  en: {
    // Nav & Common
    appName: 'CarExpress',
    home: 'Home',
    tracking: 'Tracking',
    adminPanel: 'Admin Panel',
    vehicleInquiry: 'Vehicle Inquiry',
    logout: 'Logout',
    themeToggle: 'Toggle Theme',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    selectLanguage: 'Select language',

    // Titles
    titleHome: 'CarExpress | Secure Vehicle Transit & Logistics',
    titleTracking: 'Shipment Tracking | CarExpress',
    titleAdmin: 'Admin Panel | CarExpress',

    // HomePage Hero
    heroBadge: 'Trusted transit from the UAE',
    heroTitle1: 'Your vehicle journey,',
    heroTitle2: 'clear and fast.',
    heroSubtitle: 'CarExpress delivers a precise, seamless experience for buying, shipping, clearing, and delivering your vehicle in Iranian free zones.',
    trackShipment: 'Track shipment',
    exploreServices: 'Explore services',
    expressStandard: 'The express standard',
    expressStandardDesc: 'Every vehicle gets a dedicated, trackable journey.',
    insuranceOversight: 'Insurance and oversight throughout the journey',

    // HomePage Stats
    clearedVehicles: 'Vehicles cleared',
    clearanceRecord: 'Fastest clearance time',
    safetyGuarantee: 'Cargo safety guarantee',

    // HomePage Services
    ourPromise: 'Our promise',
    promiseTitle: 'Peace of mind is part of our service.',
    promiseSubtitle: 'We handle the important details so you can simply enjoy your vehicle arriving.',
    service1Title: 'International all-risk insurance',
    service1Desc: 'From handover at UAE ports to final delivery, your investment remains covered and monitored.',
    service2Title: 'Fast, expert clearance',
    service2Desc: 'Our on-site team handles every administrative step and approval with precision and speed.',

    // HomePage Terminals
    ourNetwork: 'Our network',
    strategicTerminals: 'Strategic terminals',
    dubai: 'Dubai',
    dubaiDesc: 'The region’s commercial hub for safe loading of special vehicles.',
    sharjah: 'Sharjah',
    sharjahDesc: 'The shortest sea route for reduced transit time.',
    abuDhabi: 'Abu Dhabi',
    abuDhabiDesc: 'A modern gateway for smart management of custom vehicles.',

    // HomePage Testimonials & Footer
    testimonialsTitle: 'Trust, in our customers’ words',
    client1Name: 'Amirhossein Rad',
    client1Quote: 'The process was remarkably professional and transparent.',
    client2Name: 'Mohammad Tehrani',
    client2Quote: 'The clearance team was fast and the vehicle arrived exactly on time.',
    footerDesc: 'Specialized vehicle import and secure logistics system',

    // TrackingPage
    trackingHeaderTag: 'CarExpress / Tracking Center',
    trackingHeaderTitle1: 'Your vehicle journey,',
    trackingHeaderTitle2: 'clear and trackable',
    trackingHeaderSubtitle: 'Enter a tracking code or VIN to view shipment status and case documents.',
    trackingPlaceholder: 'TRQ-8902 or VIN',
    viewStatus: 'View status',
    checking: 'Checking...',
    trackingNotFound: 'Tracking code not found or the case is inactive.',
    vehicleShipmentCase: 'Vehicle shipment case',
    customerLabel: 'Customer:',
    activeCase: 'Active case',
    currentStep: 'Current step',
    awaitingStart: 'Awaiting start',
    routeSummary: 'Route summary',
    origin: 'Origin',
    destination: 'Destination',
    estimatedDelivery: 'Estimated delivery',
    underReview: 'Under review',
    modelYear: 'Year',
    caseDocuments: 'Case documents',
    caseDocumentsSub: 'Documents registered by admin for recipient',
    filesCount: 'files',
    viewOrDownload: 'View or download',
    noDocuments: 'No documents registered for this case yet.',

    // AdminPanel
    adminLogin: 'Admin Login',
    adminLoginSub: 'Manage vehicle shipment cases',
    mobileNumber: 'Mobile number',
    password: 'Password',
    signIn: 'Sign In',
    signingIn: 'Signing in...',
    loginError: 'Incorrect mobile number or password.',
    fetchCasesFailed: 'Failed to fetch cases.',
    newCase: 'New case',
    of7Steps: 'of 7 steps',
    noCasesRegistered: 'No cases have been registered.',
    editCase: 'Edit case',
    createNewCase: 'Create new case',
    formPersistenceNote: 'Form information remains in the case after saving.',
    delete: 'Delete',
    trackingCodeVin: 'Tracking code / VIN',
    customerName: 'Customer name',
    carBrand: 'Vehicle brand',
    selectOrTypeBrand: 'Select or type brand...',
    carModel: 'Vehicle model',
    selectOrTypeModel: 'Select or type model...',
    selectBrandFirst: 'Select a brand first',
    buildYear: 'Build year',
    color: 'Vehicle color',
    estimatedDeliveryDays: 'Estimated delivery (days)',
    customerNote: 'Customer note',
    newFiles: 'New files',
    addOneOrMoreFiles: 'Add one or more files.',
    addRow: '+ Add row',
    fileTitle: 'File title',
    chooseFile: 'Choose file',
    registeredFiles: 'Registered files',
    deleteFile: 'Delete file',
    visibleToRecipient: 'Visible to recipient',
    saveCase: 'Save case',
    saving: 'Saving...',
    stepsStatus: 'Step status',
    completed: 'Completed',
    pending: 'Pending',
    dateTimeFor: 'Date & time for',
    noCaseSelected: 'No case selected',
    selectCaseFromList: 'Select a case from the list.',
    caseUpdatedSuccess: 'Case updated successfully.',
    caseCreatedSuccess: 'Case created successfully.',
    caseDeleted: 'Case deleted.',
    fileDeleted: 'File deleted.',
    stepsSaved: 'Step status saved.',
    stageDateSaved: 'Step date saved.',
    saveCaseFailed: 'Failed to save case.',
    deleteCaseFailed: 'Failed to delete case.',
    deleteFileFailed: 'Failed to delete file.',
    saveStepsFailed: 'Failed to save steps.',
    saveDateFailed: 'Failed to save step date.',
    rtaFileDefault: 'RTA file',
    newFileDefault: 'New file',
    filePrefix: 'File',
    confirmDeleteCase: 'Delete case {code}?',
    confirmDeleteDoc: 'Delete file {title}?',
    daysSuffix: 'days',
    generalError: 'An error occurred. Please try again.',
  },
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved && translations[saved] ? saved : 'fa';
  });

  const activeLangConfig = useMemo(
    () => SUPPORTED_LANGUAGES.find((lang) => lang.code === language) || SUPPORTED_LANGUAGES[0],
    [language]
  );

  const direction = activeLangConfig.dir;
  const isRtl = direction === 'rtl';

  const setLanguage = useCallback((newLang) => {
    if (translations[newLang]) {
      setLanguageState(newLang);
      localStorage.setItem('language', newLang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.body.dir = direction;
    document.documentElement.setAttribute('data-lang', language);
    localStorage.setItem('language', language);
  }, [language, direction]);

  const dictionary = useMemo(() => translations[language] || translations.fa, [language]);

  const t = useCallback(
    (key, params = {}) => {
      let text = dictionary[key] || translations.fa[key] || key;
      if (typeof text === 'string' && params && typeof params === 'object') {
        Object.entries(params).forEach(([paramKey, paramVal]) => {
          text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal));
        });
      }
      return text;
    },
    [dictionary]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      direction,
      isRtl,
      activeLangConfig,
      t,
      languages: SUPPORTED_LANGUAGES,
    }),
    [language, setLanguage, direction, isRtl, activeLangConfig, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageSwitcher = () => {
  const { language, setLanguage, languages } = useLanguage();
  return (
    <div className="flex items-center gap-1 p-0.5">
      {languages.map((item) => {
        const isActive = item.code === language;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLanguage(item.code)}
            className={`rounded-full px-2.5 py-1 text-xs font-extrabold transition-all ${
              isActive
                ? 'bg-[#f36b21] text-white shadow-md'
                : 'text-slate-700 hover:bg-white/40 dark:text-slate-200 dark:hover:bg-white/10'
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageContext;