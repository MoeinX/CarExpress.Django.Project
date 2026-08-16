import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#1A223E] font-['Vazirmatn'] pt-32 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-[#333F4A] dark:text-white mb-12">
          درباره <span className="text-[#E31837] font-['Outfit']">CarExpress</span>
        </h1>
        
        <div className="bg-white dark:bg-[#333F4A] rounded-3xl p-8 md:p-12 shadow-xl mb-8 leading-loose text-gray-700 dark:text-gray-200">
          <p className="mb-6">
            شرکت <strong>کار اکسپرس</strong> با بیش از یک دهه تجربه در زمینه لجستیک و واردات خودرو، پل ارتباطی مطمئنی میان بازار خودروی امارات متحده عربی و مناطق آزاد ایران ایجاد کرده است.
          </p>
          <p className="mb-6">
            هدف ما ساده‌سازی فرآیند پیچیده خرید، ترخیص و حمل‌ونقل خودرو است. با استفاده از پلتفرم یکپارچه ما، مشتریان می‌توانند از لحظه ثبت درخواست تا زمان دریافت خودرو در پارکینگ منطقه آزاد، وضعیت لجستیکی خودروی خود را به صورت لحظه‌ای پیگیری کنند.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
            <div className="p-6 bg-[#F5F7FA] dark:bg-[#1A223E] rounded-2xl">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="font-bold text-[#333F4A] dark:text-white mb-2">سرعت در انتقال</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">بهینه‌ترین مسیرهای دریایی و زمینی</p>
            </div>
            <div className="p-6 bg-[#F5F7FA] dark:bg-[#1A223E] rounded-2xl">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="font-bold text-[#333F4A] dark:text-white mb-2">امنیت و ضمانت</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">بیمه کامل خودرو در طول مسیر</p>
            </div>
            <div className="p-6 bg-[#F5F7FA] dark:bg-[#1A223E] rounded-2xl">
              <div className="text-3xl mb-4">شفافیت</div>
              <h3 className="font-bold text-[#333F4A] dark:text-white mb-2">رهگیری لحظه‌ای</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">استاتوس بار هوشمند و دقیق</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;