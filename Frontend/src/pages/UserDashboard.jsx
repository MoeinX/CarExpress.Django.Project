import React from 'react';

const UserDashboard = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#1A223E] font-['Vazirmatn'] pb-12 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar / User Profile (Read-Only) */}
        <aside className="w-full md:w-1/3 lg:w-1/4">
          <div className="bg-white dark:bg-[#333F4A] rounded-2xl shadow-lg p-6 sticky top-28">
            <div className="flex flex-col items-center border-b border-gray-200 dark:border-gray-600 pb-6 mb-6">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-600 rounded-full mb-4 flex items-center justify-center text-4xl">👤</div>
              <h3 className="text-xl font-bold text-[#333F4A] dark:text-white">علی محمدی</h3>
              <p className="text-gray-500 dark:text-gray-400 font-['Outfit'] mt-1">0912 345 6789</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-[#F5F7FA] dark:bg-[#1A223E] p-3 rounded-lg">
                <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">کد ملی (فقط خواندنی)</span>
                <span className="font-bold text-[#333F4A] dark:text-white font-['Outfit']">0012345678</span>
              </div>
              <div className="bg-[#F5F7FA] dark:bg-[#1A223E] p-3 rounded-lg">
                <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">آدرس ایمیل</span>
                <span className="font-bold text-[#333F4A] dark:text-white font-['Outfit'] text-sm">ali.m@example.com</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content / Vehicle Showcases & Requests */}
        <main className="w-full md:w-2/3 lg:w-3/4 space-y-6">
          <div className="flex justify-between items-center bg-white dark:bg-[#333F4A] p-6 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-[#333F4A] dark:text-white">خودروهای من</h2>
            <button onClick={() => onNavigate('request')} className="bg-[#E31837] hover:bg-[#FF8C00] text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm">
              + درخواست جدید
            </button>
          </div>

          {/* Active Car Card */}
          <div className="bg-white dark:bg-[#333F4A] rounded-2xl shadow-lg p-6 border-l-4 border-[#FF8C00]">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-gray-100 dark:border-gray-700 pb-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-[#333F4A] dark:text-white font-['Outfit']">2023 Toyota Camry</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">شاسی: <span className="font-['Outfit']">TRQ-8902-DXB</span></p>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900/30 text-[#FF8C00] px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF8C00] animate-pulse"></span>
                در دست اجرا
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                وضعیت کنونی: <strong className="text-[#333F4A] dark:text-white">در مسیر دریایی</strong>
              </p>
              <button onClick={() => onNavigate('tracking')} className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 dark:bg-[#1A223E] dark:hover:bg-gray-700 text-[#333F4A] dark:text-white px-6 py-2 rounded-lg font-bold transition-colors">
                مشاهده Status Bar
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;