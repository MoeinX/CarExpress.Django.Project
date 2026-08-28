import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

export const SUPPORTED_LANGUAGES = [
  { code: 'fa', label: 'فارسی', shortLabel: 'FA', dir: 'rtl', flag: '🇮🇷' },
  { code: 'ar', label: 'العربية', shortLabel: 'AR', dir: 'rtl', flag: '🇦🇪' },
  { code: 'en', label: 'English', shortLabel: 'EN', dir: 'ltr', flag: '🇬🇧' },
];

export const translations = {
  fa: {
    // Nav & Brand
    appName: 'زمین دریا ترابر کیان',
    brandSub: 'ترانزیت و لجستیک بین‌المللی خودرو',
    home: 'صفحه اصلی',
    tracking: 'سامانه رهگیری محموله',
    adminPanel: 'کنسول مدیریت',
    vehicleInquiry: 'استعلام خودرو',
    logout: 'خروج از حساب',
    themeToggle: 'تغییر حالت نور',
    switchToLight: 'حالت روز',
    switchToDark: 'حالت شب',
    selectLanguage: 'انتخاب زبان',

    // Titles
    titleHome: 'زمین دریا ترابر کیان | ترانزیت دریایی و زمینی خودرو',
    titleTracking: 'رهگیری وضعیت خودرو | زمین دریا ترابر کیان',
    titleAdmin: 'پنل مدیریت | زمین دریا ترابر کیان',

    // HomePage Hero
    heroBadge: 'هاب اختصاصی ترانزیت خودرو از پورت راشد دبی',
    heroTitle1: 'لجستیک هوشمند و مطمئن،',
    heroTitle2: 'از دریا تا مقصد نهایی.',
    heroSubtitle: 'شرکت زمین دریا ترابر کیان؛ ارائه‌دهنده خدمات ترانزیت دریایی خودرو از امارات، ترخیص گمرکی و حمل با ناوگان خودروبَر به سراسر کشور.',
    trackShipment: 'رهگیری محموله',
    exploreServices: 'خدمات ترابری',
    goToTracking: 'ورود به سامانه رهگیری خودرو',
    exploreProcess: 'مشاهده فرآیند ترانزیت',
    heroDirectDesc: 'جهت پیگیری وضعیت لحظه‌ای خودرو، اسناد بارنامه و مراحل ترخیص، وارد سامانه رهگیری تخصصی کیان ترابر شوید.',
    quickVinPlaceholder: 'شماره شاسی (VIN) یا کد پیگیری...',
    quickInquiryBtn: 'استعلام وضعیت',
    expressStandard: 'استاندارد خدمات کیان ترابر',
    expressStandardDesc: 'پیگیری دقیق مرحله به مرحله و صدور بارنامه رسمی در تمام مسیر.',
    insuranceOversight: 'بیمه معتبر باربری بین‌المللی و نظارت تیم ترخیص مستقر در بندر',

    // HomePage Stats
    clearedVehicles: 'خودروی ترخیص شده',
    clearanceRecord: 'ساعت میانگین ترخیص و بارگیری',
    safetyGuarantee: 'تضمین اصالت و سلامت بار',

    // 5-Step Process Section
    processHeading: 'فرآیند ۵ مرحله‌ای ترانزیت خودرو',
    processSub: 'مسیر مشخص و استاندارد خودروی شما از لحظه تحویل تا تحویل سوییچ',
    step1Title: '۱. تحویل و بارگیری پورت راشد',
    step1Desc: 'تحویل خودرو در بندر راشد دبی، بازرسی اولیه و بارگیری استاندارد بر شناورهای ترابری',
    step2Title: '۲. در مسیر ترانزیت دریایی',
    step2Desc: 'حمل دریایی ایمن تحت پوشش بیمه باربری با هماهنگی مستمر کاپیتان و نماینده شرکت در بندر',
    step3Title: '۳. ورود به بندر مقصد (تخلیه نشده)',
    step3Desc: 'پهلودهی شناور در اسکله و لنگرگاه مقصد جهت آغاز تشریفات و هماهنگی ترخیص',
    step4Title: '۴. تخلیه کامل و ترخیص از شناور',
    step4Desc: 'تخلیه استاندارد در محوطه بارانداز و انجام امور اداری و ترخیص گمرکی',
    step5Title: '۵. بارگیری و انتقال با خودروبَر به مقصد',
    step5Desc: 'بارگیری بر ناوگان خودروبَر و اعزام مستقیم تا محل تحویل مشتری',

    // HomePage Services
    ourPromise: 'تعهد کیان ترابر',
    promiseTitle: 'دقت، سرعت و شفافیت در ارائه خدمات.',
    promiseSubtitle: 'ما تمامی مراحل بارگیری دریایی، اسناد ترخیص و هماهنگی حمل زمینی را با دقت مدیریت می‌کنیم.',
    service1Title: 'بیمه معتبر باربری بین‌المللی',
    service1Desc: 'از زمان تحویل در پورت راشد تا مقصد نهایی، محموله تحت پوشش بیمه باربری رسمی و بارنامه معتبر قرار دارد.',
    service2Title: 'ترخیص تخصصی و هماهنگی بندری',
    service2Desc: 'تیم مقیم ما در گمرکات و بنادر، با پیگیری مستمر امور اداری را با سرعت و نظم به انجام می‌رساند.',

    // HomePage Terminals
    ourNetwork: 'پایانه‌های فعالیت',
    strategicTerminals: 'پایانه‌ها و هاب‌های اصلی بارگیری',
    dubai: 'پورت راشد دبی',
    dubaiDesc: 'هاب اصلی بارگیری ایمن خودروهای خریداری‌شده از امارات.',
    sharjah: 'بندر شارجه و جبل‌علی',
    sharjahDesc: 'مسیرهای پشتیبان دریایی برای مدیریت منعطف زمان ترانزیت.',
    abuDhabi: 'گمرکات و بنادر مقصد',
    abuDhabiDesc: 'پایانه‌های گمرکی مقصد برای ترخیص و انتقال فوری روی خودروبَر.',

    // HomePage Testimonials & Footer
    testimonialsTitle: 'رضایت مشتریان و همکاران تجاری',
    client1Name: 'امیرحسین راد',
    client1Quote: 'دقت در زمان‌بندی و حفظ سلامت خودرو در حمل دریایی از پورت راشد بسیار رضایت‌بخش بود.',
    client2Name: 'محمد تهرانی',
    client2Quote: 'تیم ترخیص کیان ترابر با هماهنگی مناسب، خودرو را در موعد مقرر تحویل دادند.',
    footerDesc: 'شرکت زمین دریا ترابر کیان - خدمات تخصصی ترانزیت دریایی، ترخیص و حمل زمینی خودرو.',
    contactPhone: '+971 4 399 8877 &nbsp; • &nbsp; +98 21 8899 0000',
    contactEmail: 'info@kian-transport.com',
    allRightsReserved: 'تمامی حقوق برای شرکت زمین دریا ترابر کیان محفوظ است.',

    // TrackingPage
    trackingHeaderTag: 'زمین دریا ترابر کیان / سامانه رهگیری',
    trackingHeaderTitle1: 'رهگیری مسیر خودرو،',
    trackingHeaderTitle2: 'دقیق، شفاف و لحظه‌ای',
    trackingHeaderSubtitle: 'کد پیگیری یا شماره شاسی (VIN) را وارد نمایید تا وضعیت ترانزیت، مرحله فعلی و مدارک پرونده نمایش داده شود.',
    trackingPlaceholder: 'شماره شاسی (VIN) یا کد پیگیری (مثال: TRQ-8902)',
    viewStatus: 'استعلام پرونده',
    checking: 'در حال دریافت اطلاعات...',
    trackingNotFound: 'پرونده‌ای با این کد رهگیری پیدا نشد یا پرونده غیرفعال است.',
    vehicleShipmentCase: 'پرونده ترانزیت خودرو',
    customerLabel: 'مشتری:',
    activeCase: 'پرونده فعال',
    currentStep: 'موقعیت فعلی محموله',
    awaitingStart: 'در انتظار شروع فرآیند',
    routeSummary: 'مشخصات و خلاصه مسیر',
    origin: 'مبدأ بارگیری',
    destination: 'مقصد نهایی',
    estimatedDelivery: 'تخمین زمان تحویل',
    underReview: 'بر اساس برنامه شناور',
    modelYear: 'سال ساخت',
    colorLabel: 'رنگ خودرو',
    caseDocuments: 'اسناد و گواهی‌های پرونده',
    caseDocumentsSub: 'مدارک بازرسی، بارنامه دریایی و گواهی‌های ثبت‌شده',
    filesCount: 'مدرک رسمی',
    viewOrDownload: 'مشاهده و دانلود سند',
    noDocuments: 'هنوز سندی برای این پرونده بارگذاری نشده است.',

    // AdminPanel
    adminLogin: 'ورود به پنل مدیریت کیان',
    adminLoginSub: 'سامانه مدیریت پرونده‌های ترانزیت زمین دریا ترابر کیان',
    mobileNumber: 'شماره موبایل مدیر',
    password: 'رمز عبور',
    signIn: 'ورود به کنسول',
    signingIn: 'در حال ورود...',
    loginError: 'شماره موبایل یا رمز عبور نامعتبر است.',
    fetchCasesFailed: 'خطا در بارگذاری پرونده‌ها.',
    newCase: 'ثبت پرونده جدید',
    of7Steps: 'از ۵ مرحله',
    noCasesRegistered: 'پرونده‌ای ثبت نشده است.',
    editCase: 'ویرایش پرونده ترانزیت',
    createNewCase: 'ثبت پرونده ترانزیت جدید',
    formPersistenceNote: 'اطلاعات پس از ثبت، مستقیماً در پایگاه داده و سامانه رهگیری فعال خواهد شد.',
    delete: 'حذف پرونده',
    trackingCodeVin: 'کد پیگیری / شماره شاسی (VIN)',
    customerName: 'نام مشتری',
    carBrand: 'برند خودرو',
    selectOrTypeBrand: 'انتخاب یا تایپ برند (Toyota, Lexus, BMW...)',
    carModel: 'مدل خودرو',
    selectOrTypeModel: 'انتخاب یا تایپ مدل...',
    selectBrandFirst: 'ابتدا برند خودرو را مشخص فرمایید',
    buildYear: 'سال ساخت (میلادی)',
    color: 'رنگ بدنه',
    estimatedDeliveryDays: 'مدت تخمینی تحویل (روز)',
    customerNote: 'یادداشت / توضیحات مشتری',
    newFiles: 'افزودن مدارک و اسناد جدید (RTA / بارنامه / عکس)',
    addOneOrMoreFiles: 'امکان پیوست یک یا چند فایل مجاز.',
    addRow: '+ افزودن سطر فایل',
    fileTitle: 'عنوان سند (مثال: بارنامه دریایی)',
    chooseFile: 'انتخاب فایل',
    registeredFiles: 'اسناد بارگذاری‌شده در پرونده',
    deleteFile: 'حذف سند',
    visibleToRecipient: 'پرونده فعال و قابل استعلام برای مشتری',
    saveCase: 'ذخیره پرونده',
    saving: 'در حال ذخیره‌سازی...',
    stepsStatus: 'مدیریت و ثبت پیشرفت ۵ مرحله‌ای',
    completed: 'تکمیل شده',
    pending: 'در صف اقدام',
    dateTimeFor: 'تاریخ و زمان وقوع',
    noCaseSelected: 'پرونده‌ای انتخاب نشده است',
    selectCaseFromList: 'لطفاً از لیست یک پرونده را انتخاب فرمایید.',
    caseUpdatedSuccess: 'اطلاعات پرونده با موفقیت به‌روزرسانی شد.',
    caseCreatedSuccess: 'پرونده جدید با موفقیت در سامانه ایجاد شد.',
    caseDeleted: 'پرونده مورد نظر با موفقیت حذف گردید.',
    fileDeleted: 'فایل سند حذف شد.',
    stepsSaved: 'وضعیت مراحل رهگیری ذخیره شد.',
    stageDateSaved: 'تاریخ و زمان مرحله ثبت شد.',
    saveCaseFailed: 'خطا در ذخیره پرونده.',
    deleteCaseFailed: 'خطا در حذف پرونده.',
    deleteFileFailed: 'خطا در حذف فایل.',
    saveStepsFailed: 'خطا در ذخیره وضعیت مراحل.',
    saveDateFailed: 'خطا در ذخیره تاریخ مرحله.',
    rtaFileDefault: 'سند RTA / بارنامه',
    newFileDefault: 'فایل ضمیمه',
    filePrefix: 'سند',
    confirmDeleteCase: 'آیا از حذف پرونده ترانزیت {code} اطمینان دارید؟',
    confirmDeleteDoc: 'آیا از حذف سند {title} اطمینان دارید؟',
    daysSuffix: 'روز کاری',
    generalError: 'خطایی رخ داد. لطفاً مجدداً تلاش نمایید.',
  },

  ar: {
    // Nav & Brand
    appName: 'شركة كيان للنقل البري والبحري',
    brandSub: 'الخدمات اللوجستية والترانزيت الدولي للسيارات',
    home: 'الرئيسية',
    tracking: 'نظام تتبع الشحنات',
    adminPanel: 'لوحة التحكم',
    vehicleInquiry: 'الاستعلام عن السيارة',
    logout: 'تسجيل الخروج',
    themeToggle: 'تبديل وضع الإضاءة',
    switchToLight: 'الوضع النهاري',
    switchToDark: 'الوضع الليلي',
    selectLanguage: 'اختيار اللغة',

    // Titles
    titleHome: 'شركة كيان للنقل البري والبحري | اللوجستيات وترانزيت السيارات',
    titleTracking: 'تتبع مسار السيارة | كيان ترابر',
    titleAdmin: 'لوحة الإدارة | كيان ترابر',

    // HomePage Hero
    heroBadge: 'المركز الرئيسي لترانزيت السيارات من ميناء راشد دبي',
    heroTitle1: 'لوجستيات موثوقة ودقيقة،',
    heroTitle2: 'من البحر حتى وجهتك النهائية.',
    heroSubtitle: 'شركة كيان للنقل البري والبحري؛ نوفر خدمات الترانزيت البحري، التخليص الجمركي ونقل السيارات بالسطحات إلى مختلف الوجهات.',
    trackShipment: 'تتبع الشحنة',
    exploreServices: 'خدمات الترانزيت',
    goToTracking: 'الدخول إلى نظام تتبع السيارات',
    exploreProcess: 'استعراض مراحل الترانزيت',
    heroDirectDesc: 'لمتابعة الحالة المباشرة لسيارتك ووثائق الشحن وإجراءات التخليص، تفضل بالدخول إلى نظام التتبع المخصص.',
    quickVinPlaceholder: 'رقم الهيكل (VIN) أو رمز التتبع...',
    quickInquiryBtn: 'استعلام الحالة',
    expressStandard: 'معيار خدمات شركة كيان',
    expressStandardDesc: 'متابعة دقيقة مرحلة بمرحلة وإصدار بوليصة شحن رسمية.',
    insuranceOversight: 'تأمين نقل بحري وبري معتمد وإشراف مباشر من فريق الميناء',

    // HomePage Stats
    clearedVehicles: 'سيارة تم تخليصها',
    clearanceRecord: 'ساعة متوسط التخليص والتحميل',
    safetyGuarantee: 'ضمان سلامة وأمان الشحنة',

    // 5-Step Process Section
    processHeading: 'مراحل الترانزيت الخمس المتكاملة',
    processSub: 'مسار واضح ومنظم لسيارتك من الاستلام حتى التسليم',
    step1Title: '١. الاستلام والتحميل في ميناء راشد (دبي)',
    step1Desc: 'استلام السيارة في ميناء راشد دبي، الفحص الأولي والتحميل الآمن على سفن الشحن',
    step2Title: '٢. في مسار الترانزيت البحري',
    step2Desc: 'نقل بحري آمن ومغطى بالتأمين المعتمد بالتنسيق المستمر مع ممثلينا في الموانئ',
    step3Title: '٣. الوصول إلى ميناء الوجهة (بانتظار التفريغ)',
    step3Desc: 'رسو السفينة في المرفأ الجمركي للبدء في إجراءات ومناولة الشحنة',
    step4Title: '٤. اكتمال التفريغ والتخليص من السفينة',
    step4Desc: 'تفريغ آمن في ساحة الميناء وإنجاز كافة المعاملات الجمركية',
    step5Title: '٥. التحميل والانطلاق بالسطحة نحو الوجهة',
    step5Desc: 'التحميل على شاحنات النقل والانطلاق المباشر حتى موقع العميل',

    // HomePage Services
    ourPromise: 'التزام شركة كيان',
    promiseTitle: 'الدقة، السرعة والشفافية التامة.',
    promiseSubtitle: 'ندير كافة تفاصيل الشحن البحري، وثائق التخليص والنقل البري بكل عناية.',
    service1Title: 'تأمين نقل بحري وبري معتمد',
    service1Desc: 'منذ الاستلام في ميناء راشد وحتى الوجهة، شحنتك مغطاة بوثيقة تأمين بضائع رسمية.',
    service2Title: 'تخليص جمركي ومتابعة مباشرة في الميناء',
    service2Desc: 'فريقنا المتواجد في الموانئ ينجز المعاملات الجمركية والإدارية بدقة وسرعة.',

    // HomePage Terminals
    ourNetwork: 'محطاتنا اللوجستية',
    strategicTerminals: 'المحطات والموانئ الرئيسية',
    dubai: 'ميناء راشد - دبي',
    dubaiDesc: 'المركز الرئيسي لتحميل السيارات الآمن من دولة الإمارات.',
    sharjah: 'موانئ الشارقة وجبل علي',
    sharjahDesc: 'مسارات بحرية داعمة لإدارة مرنة لزمن الترانزيت.',
    abuDhabi: 'الموانئ والمنافذ الجمركية للوجهة',
    abuDhabiDesc: 'ساحات جمركية مجهزة لسرعة التخليص والتحميل المباشر على السطحات.',

    // HomePage Testimonials & Footer
    testimonialsTitle: 'ثقة عملائنا وشركائنا',
    client1Name: 'أمير حسين راد',
    client1Quote: 'الدقة في المواعيد والحفاظ على سلامة السيارة خلال الشحن البحري كانت ممتازة.',
    client2Name: 'محمد طهراني',
    client2Quote: 'سرعة فريق التخليص واحترافية النقل بالسطحة جعلت التجربة مريحة وموثوقة.',
    footerDesc: 'شركة كيان للنقل البري والبحري - خدمات الترانزيت البحري والبري والتخليص اللوجستي للسيارات.',
    contactPhone: '+971 4 399 8877 &nbsp; • &nbsp; +98 21 8899 0000',
    contactEmail: 'info@kian-transport.com',
    allRightsReserved: 'جميع الحقوق محفوظة لشركة كيان للنقل البري والبحري.',

    // TrackingPage
    trackingHeaderTag: 'شركة كيان للنقل / نظام التتبع',
    trackingHeaderTitle1: 'تتبع مسار سيارتك،',
    trackingHeaderTitle2: 'بدقة وشفافية مستمرة',
    trackingHeaderSubtitle: 'أدخل رمز التتبع أو رقم الهيكل (VIN) للاطلاع على تفاصيل الرحلة، المرحلة الحالية والمستندات.',
    trackingPlaceholder: 'رقم الهيكل (VIN) أو رمز التتبع (مثال: TRQ-8902)',
    viewStatus: 'استعلام الملف',
    checking: 'جارٍ جلب البيانات...',
    trackingNotFound: 'لم يتم العثور على ملف بهذا الرمز أو أن الملف غير نشط حالياً.',
    vehicleShipmentCase: 'ملف ترانزيت السيارة',
    customerLabel: 'العميل:',
    activeCase: 'ملف نشط',
    currentStep: 'الموقع الحالي للشحنة',
    awaitingStart: 'في انتظار بدء الإجراءات',
    routeSummary: 'ملخص المسار والمحطات',
    origin: 'ميناء التحميل',
    destination: 'الوجهة النهائية',
    estimatedDelivery: 'التسليم التقديري',
    underReview: 'حسب جدول إبحار السفينة',
    modelYear: 'سنة الصنع',
    colorLabel: 'لون السيارة',
    caseDocuments: 'المستندات وشهادات الملف',
    caseDocumentsSub: 'أوراق الفحص، البوليصة البحرية والبيانات الجمركية المسجلة',
    filesCount: 'مستند رسمي',
    viewOrDownload: 'عرض وتحميل المستند',
    noDocuments: 'لم يتم إرفاق أي مستندات لهذا الملف بعد.',

    // AdminPanel
    adminLogin: 'دخول لوحة تحكم كيان ترابر',
    adminLoginSub: 'نظام إدارة ملفات الترانزيت لشركة كيان للنقل البري والبحري',
    mobileNumber: 'رقم هاتف المدير',
    password: 'كلمة المرور',
    signIn: 'دخول اللوحة',
    signingIn: 'جارٍ التحقق...',
    loginError: 'رقم الهاتف أو كلمة المرور غير صحيحة.',
    fetchCasesFailed: 'فشل استرجاع الملفات.',
    newCase: 'إنشاء ملف جديد',
    of7Steps: 'من 5 مراحل',
    noCasesRegistered: 'لا توجد ملفات مسجلة حالياً.',
    editCase: 'تعديل ملف الترانزيت',
    createNewCase: 'إنشاء ملف ترانزيت جديد',
    formPersistenceNote: 'سيتم تفعيل المعلومات مباشرة في قاعدة البيانات ونظام التتبع الفوري.',
    delete: 'حذف الملف',
    trackingCodeVin: 'رمز التتبع / رقم الهيكل (VIN)',
    customerName: 'اسم العميل بالكامل',
    carBrand: 'ماركة السيارة',
    selectOrTypeBrand: 'اختر أو اكتب الماركة (Toyota, Lexus, BMW...)',
    carModel: 'طراز السيارة',
    selectOrTypeModel: 'اختر أو اكتب الطراز...',
    selectBrandFirst: 'يرجى تحديد الماركة أولاً',
    buildYear: 'سنة الصنع',
    color: 'لون الهيكل',
    estimatedDeliveryDays: 'المدة التقديرية (بالأيام)',
    customerNote: 'ملاحظات وتفاصيل العميل',
    newFiles: 'إضافة مستندات جديدة (RTA / بوليصة الشحن / صور)',
    addOneOrMoreFiles: 'إمكانية إرفاق ملف واحد أو أكثر.',
    addRow: '+ إضافة صف جديد',
    fileTitle: 'عنوان المستند (مثال: بوليصة الشحن البحرية)',
    chooseFile: 'اختيار ملف',
    registeredFiles: 'المستندات المرفقة بالملف',
    deleteFile: 'حذف المستند',
    visibleToRecipient: 'الملف نشط ومتاح لاستعلام العميل',
    saveCase: 'حفظ الملف',
    saving: 'جارٍ الحفظ...',
    stepsStatus: 'إدارة وتحديث المراحل الخمس',
    completed: 'مكتمل',
    pending: 'قيد الانتظار',
    dateTimeFor: 'تاريخ ووقت الإجراء',
    noCaseSelected: 'لم يتم اختيار أي ملف',
    selectCaseFromList: 'يرجى اختيار ملف من القائمة الجانبية.',
    caseUpdatedSuccess: 'تم تحديث بيانات الملف بنجاح.',
    caseCreatedSuccess: 'تم إنشاء الملف الجديد بنجاح.',
    caseDeleted: 'تم حذف الملف المحدد بنجاح.',
    fileDeleted: 'تم حذف المستند بنجاح.',
    stepsSaved: 'تم حفظ حالة المراحل بنجاح.',
    stageDateSaved: 'تم حفظ تاريخ ووقت المرحلة.',
    saveCaseFailed: 'فشل في حفظ الملف.',
    deleteCaseFailed: 'فشل في حذف الملف.',
    deleteFileFailed: 'فشل في حذف المستند.',
    saveStepsFailed: 'فشل في حفظ المراحل.',
    saveDateFailed: 'فشل في حفظ تاريخ المرحلة.',
    rtaFileDefault: 'بوليصة الشحن / RTA',
    newFileDefault: 'ملف مرفق',
    filePrefix: 'مستند',
    confirmDeleteCase: 'هل أنت متأكد من حذف الملف {code}؟',
    confirmDeleteDoc: 'هل أنت متأكد من حذف المستند {title}؟',
    daysSuffix: 'أيام عمل',
    generalError: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
  },

  en: {
    // Nav & Brand
    appName: 'Kian Land & Sea Logistics',
    brandSub: 'International Automotive Transit & Logistics',
    home: 'Home',
    tracking: 'Shipment Tracking',
    adminPanel: 'Admin Console',
    vehicleInquiry: 'Vehicle Inquiry',
    logout: 'Sign Out',
    themeToggle: 'Toggle Theme',
    switchToLight: 'Light Mode',
    switchToDark: 'Dark Mode',
    selectLanguage: 'Language',

    // Titles
    titleHome: 'Kian Land & Sea Logistics | Marine & Land Automotive Transport',
    titleTracking: 'Vehicle Tracking Console | Kian Logistics',
    titleAdmin: 'Management Portal | Kian Logistics',

    // HomePage Hero
    heroBadge: 'Dedicated Automotive Transit from Port Rashid, Dubai',
    heroTitle1: 'Reliable Vehicle Logistics,',
    heroTitle2: 'from sea to final delivery.',
    heroSubtitle: 'Zamin Darya Tarabar Kian (Kian Logistics); providing full maritime transit from UAE, expert customs clearance, and dedicated car carrier transport.',
    trackShipment: 'Tracking Terminal',
    exploreServices: 'Transit Services',
    goToTracking: 'Access Tracking Terminal',
    exploreProcess: 'Explore Transit Cycle',
    heroDirectDesc: 'To monitor real-time shipment milestones, official bills of lading, and port clearance updates, access the Kian Tracking Terminal directly.',
    quickVinPlaceholder: 'Chassis VIN or Tracking Code...',
    quickInquiryBtn: 'Inquire Now',
    expressStandard: 'The Kian Service Standard',
    expressStandardDesc: 'Precise milestone tracking and official bill of lading documentation across the transit corridor.',
    insuranceOversight: 'Valid International Cargo Insurance & On-Site Port Coordination',

    // HomePage Stats
    clearedVehicles: 'Vehicles Cleared',
    clearanceRecord: 'Hours Avg Clearance & Loading',
    safetyGuarantee: 'Cargo Integrity & Safety Guarantee',

    // 5-Step Process Section
    processHeading: 'Our 5-Step Transit Cycle',
    processSub: 'A transparent, structured path for your vehicle from receipt to key handover',
    step1Title: '1. Port Rashid Handover & Loading',
    step1Desc: 'Vehicle reception at Port Rashid Dubai, initial technical inspection, and secure loading onto transport vessels',
    step2Title: '2. Maritime Transit across Persian Gulf',
    step2Desc: 'Secure maritime voyage covered by marine cargo insurance with direct harbor liaison coordination',
    step3Title: '3. Destination Port Arrival (Pending Discharge)',
    step3Desc: 'Vessel berthing at destination port dock to initiate customs clearance protocol',
    step4Title: '4. Complete Discharge & Customs Clearance',
    step4Desc: 'Careful unloading into the port yard and expedited regulatory & duty finalization',
    step5Title: '5. Loaded on Car Carrier for Final Delivery',
    step5Desc: 'Mounted on car haulers for secure overland dispatch directly to the client destination',

    // HomePage Services
    ourPromise: 'The Kian Commitment',
    promiseTitle: 'Precision, speed & clarity in every step.',
    promiseSubtitle: 'We handle every detail of marine transport, customs clearance, and overland haulage.',
    service1Title: 'Comprehensive Cargo Insurance',
    service1Desc: 'From handover at Port Rashid to final delivery, your vehicle is covered under verified transit cargo policies.',
    service2Title: 'Expert Clearance & Port Coordination',
    service2Desc: 'Our dedicated on-site port liaisons manage customs documentation and regulatory clearance efficiently.',

    // HomePage Terminals
    ourNetwork: 'Our Operational Network',
    strategicTerminals: 'Primary Loading & Discharge Hubs',
    dubai: 'Port Rashid, Dubai',
    dubaiDesc: 'The primary hub for safe vehicle loading from the UAE.',
    sharjah: 'Sharjah & Jebel Ali Ports',
    sharjahDesc: 'Redundant maritime corridors to maintain agile transit scheduling.',
    abuDhabi: 'Destination Ports & Customs Yards',
    abuDhabiDesc: 'Modern receiving terminals for swift duty processing and instant car carrier dispatch.',

    // HomePage Testimonials & Footer
    testimonialsTitle: 'Client & Partner Endorsements',
    client1Name: 'Amirhossein Rad',
    client1Quote: 'The timing precision and care taken during maritime transit from Port Rashid were highly dependable.',
    client2Name: 'Mohammad Tehrani',
    client2Quote: 'Kian Logistics coordinated the port clearance and delivered the car carrier on schedule.',
    footerDesc: 'Zamin Darya Tarabar Kian (Kian Logistics) - Specialized maritime automotive transit, customs clearance, and overland vehicle transport.',
    contactPhone: '+971 4 399 8877 &nbsp; • &nbsp; +98 21 8899 0000',
    contactEmail: 'info@kian-transport.com',
    allRightsReserved: 'All rights reserved by Zamin Darya Tarabar Kian.',

    // TrackingPage
    trackingHeaderTag: 'Kian Logistics / Tracking Terminal',
    trackingHeaderTitle1: 'Live Vehicle Transit Status,',
    trackingHeaderTitle2: 'precise, transparent & real-time',
    trackingHeaderSubtitle: 'Enter your tracking code or VIN to view transit milestones and verified case documents.',
    trackingPlaceholder: 'Chassis VIN or Tracking Code (e.g. TRQ-8902)',
    viewStatus: 'Inquire Shipment',
    checking: 'Fetching data...',
    trackingNotFound: 'No active shipment found matching this tracking code or VIN.',
    vehicleShipmentCase: 'Vehicle Transit Manifest',
    customerLabel: 'Client:',
    activeCase: 'Active Case',
    currentStep: 'Current Shipment Milestone',
    awaitingStart: 'Awaiting Transit Initialization',
    routeSummary: 'Route & Corridor Overview',
    origin: 'Port of Loading',
    destination: 'Final Destination',
    estimatedDelivery: 'Estimated Handover',
    underReview: 'Scheduled per vessel timetable',
    modelYear: 'Model Year',
    colorLabel: 'Exterior Color',
    caseDocuments: 'Clearance Certificates & Documents',
    caseDocumentsSub: 'Official inspection reports, maritime bill of lading, and customs manifests',
    filesCount: 'verified documents',
    viewOrDownload: 'Inspect & Download',
    noDocuments: 'No documentation has been uploaded for this shipment yet.',

    // AdminPanel
    adminLogin: 'Kian Management Portal',
    adminLoginSub: 'Consolidated Transit Administration Platform for Zamin Darya Tarabar Kian',
    mobileNumber: 'Authorized Mobile',
    password: 'Password',
    signIn: 'Access Portal',
    signingIn: 'Authenticating...',
    loginError: 'Invalid mobile number or credentials.',
    fetchCasesFailed: 'Failed to retrieve shipment records.',
    newCase: 'New Shipment Case',
    of7Steps: 'of 5 steps',
    noCasesRegistered: 'No shipment manifests registered.',
    editCase: 'Edit Transit Case',
    createNewCase: 'Register New Transit Case',
    formPersistenceNote: 'Changes are automatically synchronized with the live tracking database.',
    delete: 'Delete Manifest',
    trackingCodeVin: 'Tracking Code / Chassis VIN',
    customerName: 'Customer Full Name',
    carBrand: 'Vehicle Make',
    selectOrTypeBrand: 'Select or type brand (Toyota, Lexus, BMW...)',
    carModel: 'Vehicle Model',
    selectOrTypeModel: 'Select or type model...',
    selectBrandFirst: 'Please select vehicle make first',
    buildYear: 'Build Year',
    color: 'Vehicle Color',
    estimatedDeliveryDays: 'Estimated Transit (Days)',
    customerNote: 'Customer Notes & Special Instructions',
    newFiles: 'Attach Manifest Documents (RTA / Ocean B/L / Photos)',
    addOneOrMoreFiles: 'Upload one or multiple official files.',
    addRow: '+ Add File Row',
    fileTitle: 'Document Title (e.g. Ocean Bill of Lading)',
    chooseFile: 'Select File',
    registeredFiles: 'Registered Shipment Documents',
    deleteFile: 'Delete Document',
    visibleToRecipient: 'Active & searchable by client on public tracking',
    saveCase: 'Save Manifest',
    saving: 'Persisting changes...',
    stepsStatus: '5-Milestone Workflow Progression',
    completed: 'Completed',
    pending: 'Pending',
    dateTimeFor: 'Timestamp for',
    noCaseSelected: 'No Manifest Selected',
    selectCaseFromList: 'Select a shipment manifest from the sidebar to inspect or modify.',
    caseUpdatedSuccess: 'Shipment manifest updated successfully.',
    caseCreatedSuccess: 'New shipment manifest registered successfully.',
    caseDeleted: 'Shipment manifest deleted successfully.',
    fileDeleted: 'Document deleted successfully.',
    stepsSaved: 'Milestone status updated successfully.',
    stageDateSaved: 'Milestone timestamp recorded.',
    saveCaseFailed: 'Failed to save shipment manifest.',
    deleteCaseFailed: 'Failed to delete shipment manifest.',
    deleteFileFailed: 'Failed to delete document.',
    saveStepsFailed: 'Failed to update milestones.',
    saveDateFailed: 'Failed to save milestone timestamp.',
    rtaFileDefault: 'Ocean B/L / RTA Certificate',
    newFileDefault: 'Attachment',
    filePrefix: 'Doc',
    confirmDeleteCase: 'Are you sure you want to delete shipment manifest {code}?',
    confirmDeleteDoc: 'Are you sure you want to delete document {title}?',
    daysSuffix: 'business days',
    generalError: 'An unexpected error occurred. Please try again.',
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
                ? 'bg-gradient-to-r from-[#d4af37] to-[#e5b842] text-[#08101a] shadow-md font-bold'
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