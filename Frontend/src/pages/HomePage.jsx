import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AnalogCounter = ({ end, suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    let startTime = Date.now();
    const duration = 1000;

    const updateCounter = () => {
      let elapsed = Date.now() - startTime;
      if (elapsed < duration) {
        setDisplayValue(Math.floor(Math.random() * (end * 1.5)));
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(end);
        setIsLocked(true);
      }
    };

    updateCounter();
  }, [end]);

  return (
    <span className={`font-en transition-all duration-300 ${isLocked ? 'scale-100 opacity-100' : 'scale-95 opacity-80 blur-[0.5px]'}`}>
      {displayValue}{suffix}
    </span>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const glassStyle = "bg-white/70 dark:bg-[#333F4A]/60 backdrop-blur-xl border border-white/40 dark:border-gray-600/40 shadow-xl rounded-3xl p-8";

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-navyDeep font-['Vazirmatn'] transition-colors duration-500 overflow-x-hidden">

      {/* ----------------- نوبار رسمی با آیکون‌های Solid و دکمه پیگیری ----------------- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center px-6 py-4 rounded-2xl transition-all ${isScrolled ? 'bg-white/90 dark:bg-navyDeep/90 backdrop-blur-md shadow-lg border border-gray-200 dark:border-gray-700' : 'bg-white/10 backdrop-blur-sm border border-white/20'}`}>

            <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
              <span className={`font-['Outfit'] font-extrabold text-2xl tracking-wide ${isScrolled ? 'text-[#333F4A] dark:text-white' : 'text-white'}`}>
                Car<span className="text-[#FF8C00]">Express</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={toggleTheme} className={`p-2.5 rounded-full transition-colors ${isScrolled ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-white hover:bg-white/20'}`}>
                {isDarkMode ? '☀️' : '🌙'}
              </button>

              <button onClick={() => navigate('/tracking')} className="bg-[#FF8C00] hover:bg-[#E31837] text-white p-2.5 rounded-full transition-all shadow-md hover:scale-105" title="پیگیری خودرو">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ----------------- هیرو سکشن مینیمال با عکس PNG شناور و لایه عنوان زیر عکس ----------------- */}
      <section className="relative h-[75vh] min-h-[600px] flex items-center justify-center overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376760302-86f7b19a770a?q=80&w=2000')] bg-cover bg-center transition-all duration-700 group-hover:blur-md group-hover:scale-105"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-navyDeep/80 via-navyDeep/50 to-[#F5F7FA] dark:to-navyDeep"></div>

{/* عکس ماشین PNG شناور */ }
<div className="absolute right-[-10%] md:right-[5%] bottom-10 z-10 w-[70%] md:w-[50%] pointer-events-none transition-transform duration-700 group-hover:scale-105 opacity-90">
  <img src="https://www.pngarts.com/files/3/Luxury-Car-PNG-High-Quality-Image.png" alt="Luxury Car PNG" className="w-full object-contain drop-shadow-2xl" />
</div>

{/* متن‌ها */ }
<div className="relative z-20 text-center max-w-4xl mx-auto px-4 mt-10">
  <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight drop-shadow-2xl">
    پیشرو در ترانزیت هوشمند <br />
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-[#E31837]">خودروهای لوکس امارات</span>
  </h1>
  <p className="text-lg md:text-xl text-gray-200 max-w-xl mx-auto font-light drop-shadow-md">
    استاندارد نوین لجستیک، ترخیص تخصصی و ضمانت صددرصدی سلامت خودرو در تمامی مسیرهای دریایی.
  </p>
</div>
      </section>

      {/* ----------------- بخش آمار و ارقام (چرخش آنالوگ ۱ ثانیه‌ای) ----------------- */}
      <section className="py-16 -mt-20 relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className={`${glassStyle} text-center flex flex-col items-center justify-center`}>
        <div className="text-4xl font-extrabold text-[#333F4A] dark:text-white mb-2 text-transparent bg-clip-text bg-gradient-to-br from-[#FF8C00] to-[#E31837]">
          <AnalogCounter end={850} suffix="+" />
        </div>
        <h3 className="font-bold text-gray-500 dark:text-gray-400">خودروی ترخیص شده</h3>
      </div>
      <div className={`${glassStyle} text-center flex flex-col items-center justify-center`}>
        <div className="text-4xl font-extrabold text-[#333F4A] dark:text-white mb-2 text-transparent bg-clip-text bg-gradient-to-br from-[#FF8C00] to-[#E31837]">
          <AnalogCounter end={48} suffix="h" />
        </div>
        <h3 className="font-bold text-gray-500 dark:text-gray-400">رکورد زمانی ترخیص</h3>
      </div>
      <div className={`${glassStyle} text-center flex flex-col items-center justify-center`}>
        <div className="text-4xl font-extrabold text-[#333F4A] dark:text-white mb-2 text-transparent bg-clip-text bg-gradient-to-br from-[#FF8C00] to-[#E31837]">
          <AnalogCounter end={100} suffix="%" />
        </div>
        <h3 className="font-bold text-gray-500 dark:text-gray-400">تضمین سلامت کالا</h3>
      </div>
    </div>
      </section>

      {/* ----------------- بخش ویژگی‌ها ----------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-[#333F4A] dark:text-white mb-3">چرا کار اکسپرس؟</h2>
          <p className="text-gray-600 dark:text-gray-400">معیارهای حرفه‌ای ما در ارائه خدمات لجستیک.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`${glassStyle} flex flex-col justify-center`}>
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold text-[#333F4A] dark:text-white mb-3">بیمه تمام خطر بین‌المللی</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              از لحظه تحویل در بنادر امارات تا پارک در منطقه آزاد، سرمایه شما تحت پوشش معتبرترین بیمه‌نامه‌های دریایی قرار دارد.
            </p>
          </div>

          <div className={`${glassStyle} flex flex-col justify-center`}>
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-[#333F4A] dark:text-white mb-3">تشریفات گمرکی فوق‌سریع</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              تیم متخصص مستقر در گمرک، تمامی مراحل اداری و تاییدیه‌های RTA را در کوتاه‌ترین زمان ممکن به انجام می‌رساند.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------- پایانه‌های استراتژیک امارات ----------------- */}
      <section className="py-20 bg-white/50 dark:bg-[#333F4A]/20 border-y border-gray-200 dark:border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-[#333F4A] dark:text-white mb-3">پایانه‌های استراتژیک</h2>
        <p className="text-gray-600 dark:text-gray-400">حضور فعال در کلیدی‌ترین بنادر تجاری امارات.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className={`${glassStyle} group`}>
          <h3 className="text-xl font-bold text-[#333F4A] dark:text-white mb-1">دبی (جبل علی)</h3>
          <h4 className="text-xs font-bold text-[#FF8C00] mb-4 font-en">Jebel Ali Port</h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            بزرگترین هاب تجاری منطقه مناسب برای بارگیری ایمن کانتینری سوپرکارهای خاص.
          </p>
        </div>

        <div className={`${glassStyle} group border-[#FF8C00]/30`}>
          <h3 className="text-xl font-bold text-[#333F4A] dark:text-white mb-1">شارجه (پورت خالد)</h3>
          <h4 className="text-xs font-bold text-[#FF8C00] mb-4 font-en">Port Khalid</h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            کوتاه‌ترین مسیر دریایی تا بنادر جنوبی ایران برای کاهش چشمگیر زمان ترانزیت.
          </p>
        </div>

        <div className={`${glassStyle} group`}>
          <h3 className="text-xl font-bold text-[#333F4A] dark:text-white mb-1">ابوظبی (خلیفه)</h3>
          <h4 className="text-xs font-bold text-[#FF8C00] mb-4 font-en">Khalifa Port</h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            شاهراه کاملاً اتوماتیک و مدرن برای مدیریت هوشمند خودروهای صفر کیلومتر سفارشی.
          </p>
        </div>
      </div>
    </div>
      </section>

      {/* ----------------- نظرات کاربران ----------------- */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-[#333F4A] dark:text-white mb-3">دیدگاه مشتریان</h2>
          <p className="text-gray-600 dark:text-gray-400">تجربه همکاری با کار اکسپرس از زبان مالکان خودرو.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className={glassStyle}>
             <div className="flex gap-1 text-[#FF8C00] mb-3">★★★★★</div>
             <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 font-light">"فکر نمی‌کردم واردات ماشین تا این حد حساب‌شده و شفاف باشد. روند کار فوق‌العاده حرفه‌ای پیش رفت."</p>
             <h4 className="font-bold text-[#333F4A] dark:text-white text-sm">امیرحسین راد</h4>
             <span className="text-xs text-gray-400 font-en">Porsche Macan</span>
          </div>
          
          <div className={glassStyle}>
             <div className="flex gap-1 text-[#FF8C00] mb-3">★★★★★</div>
             <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 font-light">"تیم ترخیص بسیار سریع عمل کرد و ماشین دقیقاً در موعد مقرر تحویل داده شد. به شدت توصیه می‌کنم."</p>
             <h4 className="font-bold text-[#333F4A] dark:text-white text-sm">محمد تهرانی</h4>
             <span className="text-xs text-gray-400 font-en">BMW 7 Series</span>
          </div>
        </div>
      </section>

      {/* ----------------- فوتر رسمی و شرکتی ----------------- */}
      <footer className="bg-white dark:bg-navyDeep border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
        <div>
          <span className="font-['Outfit'] font-extrabold text-2xl tracking-wide text-[#333F4A] dark:text-white block mb-2">
            Car<span className="text-[#FF8C00]">Express</span>
          </span>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm">
            سامانه تخصصی واردات و لجستیک ایمن خودرو از امارات به مناطق آزاد.
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 font-en">
          <span>+971 50 123 4567</span>
          <span>•</span>
          <span>support@carexpress.ir</span>
        </div>
      </div>
      <div className="border-t border-gray-100 dark:border-gray-800 pt-6 text-center text-xs text-gray-400 font-['Outfit']">
        © 2026 CarExpress. All rights reserved.
      </div>
      <div className="border-t border-gray-100 dark:border-gray-800 pt-6 text-center text-xs text-gray-400 font-['Outfit']">
        Design And Develop By QuadByte
      </div>
    </div>
      </footer>

    </div>
  );
};

export default HomePage;
