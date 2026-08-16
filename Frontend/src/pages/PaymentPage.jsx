import React, { useState } from 'react';

const PaymentPage = ({ onNavigate }) => {
  const [status, setStatus] = useState('pending'); // pending, processing, success

  const handlePayment = () => {
    setStatus('processing');
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#1A223E] py-24 px-4 font-['Vazirmatn'] transition-colors">
      <div className="max-w-2xl mx-auto bg-white dark:bg-[#333F4A] rounded-2xl shadow-xl overflow-hidden">
        
        {status === 'success' ? (
          <div className="p-10 text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✅</span>
            </div>
            <h2 className="text-3xl font-bold text-[#333F4A] dark:text-white mb-4">پرداخت با موفقیت انجام شد</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              درخواست شما ثبت شد. کارشناسان ما به زودی مدارک را بررسی کرده و نتیجه را در داشبورد اعلام می‌کنند.
            </p>
            <div className="font-['Outfit'] font-bold text-lg text-[#333F4A] dark:text-gray-200 mb-8 bg-gray-50 dark:bg-[#1A223E] py-4 rounded-lg">
              Ref ID: TXN-{Math.floor(Math.random() * 1000000)}
            </div>
            <button onClick={() => onNavigate('dashboard')} className="bg-[#E31837] hover:bg-[#FF8C00] text-white px-8 py-3 rounded-xl font-bold transition-colors">
              ورود به داشبورد
            </button>
          </div>
        ) : (
          <div className="p-8 md:p-10">
            <h2 className="text-2xl font-bold text-[#333F4A] dark:text-white border-b border-gray-200 dark:border-gray-600 pb-4 mb-8">
              تایید فاکتور و پرداخت
            </h2>
            
            <div className="bg-[#F5F7FA] dark:bg-[#1A223E] p-6 rounded-xl mb-8">
              <div className="flex justify-between items-center mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
                <span className="text-[#333F4A] dark:text-gray-300 font-medium">بابت:</span>
                <span className="font-bold text-[#333F4A] dark:text-white">حمل خودرو تویوتا کمری - TRQ-8902</span>
              </div>
              <div className="space-y-4 font-['Outfit']">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span className="font-['Vazirmatn']">هزینه حمل تا گمرک</span>
                  <span>2,500 AED</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span className="font-['Vazirmatn']">هزینه عملیات گمرکی</span>
                  <span>500 AED</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-[#333F4A] dark:text-white pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="font-['Vazirmatn']">مبلغ قابل پرداخت</span>
                  <span className="text-[#E31837]">3,000 AED</span>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400 mb-8 bg-orange-50 dark:bg-orange-900/10 p-4 rounded-lg border border-orange-100 dark:border-orange-900/30">
              <h4 className="font-bold text-[#FF8C00] mb-2">قوانین و مقررات پرداخت:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>وجه واریزی صرفاً جهت هزینه‌های لجستیک می‌باشد.</li>
                <li>در صورت لغو درخواست قبل از بارگیری، ۲۰٪ به عنوان جریمه کسر می‌گردد.</li>
                <li>تایید نهایی پرداخت ممکن است تا ۲ ساعت کاری زمان ببرد.</li>
              </ul>
            </div>

            <button 
              onClick={handlePayment} 
              disabled={status === 'processing'}
              className="w-full bg-[#E31837] hover:bg-[#FF8C00] disabled:bg-gray-400 text-white py-4 rounded-xl font-bold text-lg transition-colors flex justify-center items-center gap-2"
            >
              {status === 'processing' ? 'در حال انتقال به درگاه...' : 'پرداخت و ثبت نهایی درخواست'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;