import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#1A223E] font-['Vazirmatn'] pt-32 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-[#333F4A] dark:text-white mb-4">تماس با ما</h1>
          <p className="text-gray-600 dark:text-gray-400">کارشناسان ما در امارات و ایران آماده پاسخگویی به شما هستند.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Info */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-white dark:bg-[#333F4A] p-6 rounded-2xl shadow-lg border-t-4 border-[#E31837]">
              <h3 className="text-lg font-bold text-[#333F4A] dark:text-white mb-4">دفتر مرکزی (امارات)</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">شارجه، منطقه آزاد، ساختمان لجستیک</p>
              <p className="font-['Outfit'] text-[#333F4A] dark:text-white font-bold dir-ltr text-left">+971 50 123 4567</p>
            </div>
            
            <div className="bg-white dark:bg-[#333F4A] p-6 rounded-2xl shadow-lg border-t-4 border-[#FF8C00]">
              <h3 className="text-lg font-bold text-[#333F4A] dark:text-white mb-4">دفتر پشتیبانی (ایران)</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">منطقه آزاد کیش / بندرعباس</p>
              <p className="font-['Outfit'] text-[#333F4A] dark:text-white font-bold dir-ltr text-left">+98 21 8888 8888</p>
            </div>
            
            <div className="bg-white dark:bg-[#333F4A] p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-bold text-[#333F4A] dark:text-white mb-4">ایمیل ارتباطی</h3>
              <p className="font-['Outfit'] text-[#E31837] font-bold">support@carexpress.ir</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-2/3 bg-white dark:bg-[#333F4A] p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-[#333F4A] dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">ارسال پیام مستقیم</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#333F4A] dark:text-gray-200 mb-2">نام و نام خانوادگی</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl dark:bg-[#1A223E] dark:text-white focus:ring-2 focus:ring-[#E31837] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333F4A] dark:text-gray-200 mb-2">شماره تماس</label>
                  <input type="tel" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl dark:bg-[#1A223E] dark:text-white focus:ring-2 focus:ring-[#E31837] outline-none font-['Outfit']" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333F4A] dark:text-gray-200 mb-2">متن پیام</label>
                <textarea rows="5" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl dark:bg-[#1A223E] dark:text-white focus:ring-2 focus:ring-[#E31837] outline-none"></textarea>
              </div>
              <button type="button" className="bg-[#333F4A] dark:bg-gray-700 hover:bg-[#E31837] text-white px-8 py-3 rounded-xl font-bold transition-colors w-full md:w-auto">
                ارسال پیام
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;