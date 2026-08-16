import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TrackingPage = () => {
  const navigate = useNavigate();
  const [vinQuery, setVinQuery] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // مراحل استاندارد استاتوس بار
  const steps = [
    { title: "تایید مدارک و RTA", desc: "دفتر امارات" },
    { title: "ورود به بندر مبدأ", desc: "شارجه / دبی" },
    { title: "ترخیص و بارگیری", desc: "کشتی و لنج" },
    { title: "در مسیر دریایی", desc: "خلیج فارس" },
    { title: "ورود به گمرک", desc: "بندرعباس / لنگه" },
    { title: "انتقال با خودروبر", desc: "به سمت منطقه آزاد" },
    { title: "پارک در پارکینگ", desc: "تحویل نهایی" }
  ];

  // دیتای تستی برای شبیه‌سازی استعلام شماره شاسی
  const mockVehicles = {
    'TRQ-8902': {
      carModel: 'Toyota Camry 2024',
      color: 'سفید صدفی',
      origin: 'بندر شارجه (پورت خالد)',
      destination: 'منطقه آزاد کیش',
      currentStep: 3, // در مسیر دریایی
      estimatedArrival: '۴۸ ساعت کاری دیگر',
      lastUpdate: 'امروز، ساعت ۱۴:۳۰'
    },
    'FER-1090': {
      carModel: 'Ferrari SF90 Stradale',
      color: 'قرمز متالیک',
      origin: 'دبی (جبل علی)',
      destination: 'تهران (گمرک غرب)',
      currentStep: 1, // ورود به بندر مبدأ
      estimatedArrival: '۵ روز کاری دیگر',
      lastUpdate: 'امروز، ساعت ۱۱:۰۰'
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!vinQuery.trim()) return;

    setIsLoading(true);
    setErrorMsg('');
    setTrackingData(null);

    // شبیه‌سازی دریافت دیتا از بک‌اند جنگو
    setTimeout(() => {
      setIsLoading(false);
      const formattedVin = vinQuery.trim().toUpperCase();
      if (mockVehicles[formattedVin]) {
        setTrackingData({ vin: formattedVin, ...mockVehicles[formattedVin] });
      } else {
        // برای هر شماره شاسی جدیدی که تست کنید یک وضعیت رندوم و پیش‌فرض لود می‌کند
        setTrackingData({
          vin: formattedVin,
          carModel: 'Mercedes-Benz S500',
          color: 'مشکی متالیک',
          origin: 'بندر شارجه',
          destination: 'منطقه آزاد انزلی',
          currentStep: 2,
          estimatedArrival: '۳ روز دیگر',
          lastUpdate: 'یک ساعت پیش'
        });
      }
    }, 700);
  };

  const glassStyle = "bg-white/80 dark:bg-[#333F4A]/70 backdrop-blur-2xl border border-white/50 dark:border-gray-600/40 shadow-2xl rounded-3xl p-8 transition-all duration-500";

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-navyDeep font-['Vazirmatn'] transition-colors duration-500 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* هدر صفحه */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF8C00]/10 border border-[#FF8C00]/20 text-[#FF8C00] font-bold text-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FF8C00] animate-pulse"></span>
            سامانه رهگیری لحظه‌ای کار اکسپرس
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#333F4A] dark:text-white tracking-tight mb-4">
            استعلام و پیگیری <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-[#E31837]">وضعیت حمل خودرو</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            شماره شاسی (VIN) یا کد پیگیری اختصاصی پرونده خود را جهت مشاهده نوار وضعیت بارگیری، ترخیص و انتقال وارد کنید.
          </p>
        </div>

        {/* باکس ورودی شماره شاسی (Glassmorphic Search Bar) */}
        <div className={`${glassStyle} max-w-2xl mx-auto mb-12 !p-4 md:!p-6`}>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full">
              <input
                type="text"
                dir="ltr"
                placeholder="مثال: TRQ-8902 یا کد VIN"
                value={vinQuery}
                onChange={(e) => setVinQuery(e.target.value)}
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-navyDeep/80 border border-gray-200 dark:border-gray-600 rounded-2xl text-slate-800 dark:text-white font-['Outfit'] font-bold text-lg tracking-wider placeholder:font-['Vazirmatn'] placeholder:text-sm placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto shrink-0 bg-[#FF8C00] hover:bg-[#E31837] text-white px-8 py-3.5 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#FF8C00]/30 hover:shadow-[#E31837]/40"
            >
              {isLoading ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <span>استعلام وضعیت</span>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
          </form>
          
          <div className="flex justify-center gap-4 mt-3 text-xs text-gray-400">
            <span>شماره‌های تستی:</span>
            <button type="button" onClick={() => setVinQuery('TRQ-8902')} className="text-[#FF8C00] font-['Outfit'] underline hover:text-[#E31837]">TRQ-8902</button>
            <button type="button" onClick={() => setVinQuery('FER-1090')} className="text-[#FF8C00] font-['Outfit'] underline hover:text-[#E31837]">FER-1090</button>
          </div>
        </div>

        {/* کارت نمایش Status Bar و جزئیات */}
        {trackingData && (
          <div className={`${glassStyle} animate-fadeIn`}>
            
            {/* اطلاعات خلاصه بالای کارت */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-6 mb-8">
              <div>
                <span className="text-xs text-gray-400 block mb-1">خودروی در حال ترانزیت:</span>
                <h2 className="text-2xl font-extrabold text-[#333F4A] dark:text-white font-['Outfit']">
                  {trackingData.carModel}
                </h2>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>شماره شاسی: <strong className="font-['Outfit'] text-slate-800 dark:text-gray-200">{trackingData.vin}</strong></span>
                  <span>•</span>
                  <span>رنگ: <strong className="text-slate-800 dark:text-gray-200">{trackingData.color}</strong></span>
                </div>
              </div>

              <div className="bg-[#FF8C00]/10 border border-[#FF8C00]/30 rounded-2xl px-5 py-3 text-right">
                <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">وضعیت کنونی:</span>
                <div className="text-base font-bold text-[#FF8C00] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF8C00] animate-ping"></span>
                  {steps[trackingData.currentStep].title}
                </div>
              </div>
            </div>

            {/* نوار پیشرفت افقی (Status Bar) */}
            <div className="relative py-8 my-4 overflow-x-auto">
              <div className="min-w-[650px] relative px-4">
                
                {/* خط خاکستری پس‌زمینه */}
                <div className="absolute top-7 right-8 left-8 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full z-0"></div>
                
                {/* خط رنگی پیشرفت */}
                <div 
                  className="absolute top-7 right-8 h-1.5 bg-gradient-to-l from-[#FF8C00] to-[#E31837] rounded-full z-0 transition-all duration-1000 ease-out shadow-md shadow-[#FF8C00]/40"
                  style={{ width: `${(trackingData.currentStep / (steps.length - 1)) * 92}%` }}
                ></div>

                {/* دایره‌ها و مراحل */}
                <div className="relative z-10 flex justify-between">
                  {steps.map((step, index) => {
                    const isCompleted = index < trackingData.currentStep;
                    const isCurrent = index === trackingData.currentStep;

                    return (
                      <div key={index} className="flex flex-col items-center text-center w-24">
                        <div 
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm font-['Outfit'] transition-all duration-500 mb-3 ${
                            isCurrent
                              ? 'bg-[#FF8C00] text-white ring-4 ring-[#FF8C00]/30 scale-110 shadow-lg shadow-[#FF8C00]/50'
                              : isCompleted
                              ? 'bg-[#E31837] text-white'
                              : 'bg-white dark:bg-gray-800 text-gray-400 border-2 border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          {isCompleted ? '✓' : index + 1}
                        </div>

                        <h4 className={`text-xs font-bold mb-1 ${
                          isCurrent ? 'text-[#FF8C00]' : isCompleted ? 'text-[#333F4A] dark:text-white' : 'text-gray-400'
                        }`}>
                          {step.title}
                        </h4>
                        <span className="text-[10px] text-gray-400">{step.desc}</span>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

            {/* کارت اطلاعات زمان‌بندی و موقعیت لحظه‌ای */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-navyDeep/40 p-6 rounded-2xl">
              <div>
                <span className="text-xs text-gray-400 block mb-1">مبدأ و مقصد:</span>
                <p className="text-sm font-bold text-[#333F4A] dark:text-white">
                  از {trackingData.origin} به مقصد {trackingData.destination}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-400 block mb-1">تخمین تحویل نهایی:</span>
                <p className="text-sm font-bold text-[#FF8C00] font-['Outfit']">
                  {trackingData.estimatedArrival}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-400 block mb-1">آخرین به‌روزرسانی سیستم:</span>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300">
                  {trackingData.lastUpdate}
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default TrackingPage;