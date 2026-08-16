import React, { useState } from 'react';

const RequestWizard = () => {
  const [step, setStep] = useState(1);
  const [hasDamage, setHasDamage] = useState(false);
  
  return (
    <div className="max-w-3xl mx-auto mt-24 bg-white dark:bg-[#333F4A] p-8 rounded-2xl shadow-lg font-['Vazirmatn']">
      <h2 className="text-2xl font-bold mb-6 text-[#333F4A] dark:text-white border-b border-gray-200 dark:border-gray-600 pb-4">ثبت درخواست حمل خودرو</h2>
      
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#333F4A] dark:text-gray-200">۱. مشخصات خودرو</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className="w-full px-4 py-2 border rounded-lg dark:bg-[#1A223E] dark:text-white dark:border-gray-600">
              <option>شرکت سازنده (مثلا Toyota)</option>
            </select>
            <input type="text" placeholder="مدل خودرو" className="w-full px-4 py-2 border rounded-lg dark:bg-[#1A223E] dark:text-white dark:border-gray-600" />
            <input type="number" placeholder="سال ساخت" className="w-full px-4 py-2 border rounded-lg dark:bg-[#1A223E] dark:text-white dark:border-gray-600" />
            <input type="number" placeholder="کارکرد دقیق (KM)" className="w-full px-4 py-2 border rounded-lg dark:bg-[#1A223E] dark:text-white dark:border-gray-600" />
            <select className="w-full px-4 py-2 border rounded-lg dark:bg-[#1A223E] dark:text-white dark:border-gray-600">
              <option>نوع گیربکس</option>
              <option>اتوماتیک</option>
              <option>دستی</option>
            </select>
            <input type="text" placeholder="شماره شاسی" className="w-full px-4 py-2 border rounded-lg dark:bg-[#1A223E] dark:text-white dark:border-gray-600 md:col-span-2 font-['Outfit']" />
          </div>
          
          <div className="border p-4 rounded-lg bg-[#F5F7FA] dark:bg-[#1A223E] dark:border-gray-600 mt-4">
            <label className="flex items-center space-x-2 space-x-reverse cursor-pointer">
              <input type="checkbox" checked={hasDamage} onChange={(e) => setHasDamage(e.target.checked)} className="w-5 h-5 accent-[#E31837] rounded" />
              <span className="text-[#333F4A] dark:text-gray-200 font-medium">آیا خودرو رنگ شدگی دارد؟</span>
            </label>
            {hasDamage && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="رنگ اصلی خودرو (مثلا سفید)" className="w-full px-4 py-2 border rounded-lg dark:bg-[#333F4A] dark:text-white dark:border-gray-600" />
                <select className="w-full px-4 py-2 border rounded-lg dark:bg-[#333F4A] dark:text-white dark:border-gray-600">
                  <option>یک لکه رنگ</option>
                  <option>دو لکه رنگ</option>
                  <option>دور رنگ</option>
                  <option>تمام رنگ</option>
                </select>
              </div>
            )}
          </div>
          <button onClick={() => setStep(2)} className="mt-6 w-full bg-[#E31837] hover:bg-[#FF8C00] text-white py-3 rounded-lg font-bold transition-colors">مرحله بعدی</button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#333F4A] dark:text-gray-200">۲. آپلود تصاویر خودرو</h3>
          <div className="grid grid-cols-2 gap-4">
            {['عکس روبرو', 'عکس عقب', 'عکس موتور', 'عکس کیلومتر'].map(label => (
              <div key={label} className="border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg p-6 text-center cursor-pointer hover:border-[#E31837] transition-colors">
                <p className="text-[#333F4A] dark:text-gray-300 mb-2 font-medium">{label}</p>
                <span className="text-sm bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded text-[#333F4A] dark:text-white">انتخاب فایل</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={() => setStep(1)} className="w-1/3 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-bold">بازگشت</button>
            <button onClick={() => setStep(3)} className="w-2/3 bg-[#E31837] hover:bg-[#FF8C00] text-white py-3 rounded-lg font-bold">مرحله بعدی</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#333F4A] dark:text-gray-200">۳. مدارک و پرداخت</h3>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg p-6 text-center cursor-pointer hover:border-[#E31837]">
             <p className="text-[#333F4A] dark:text-white font-bold mb-2">آپلود برگه RTA امارات</p>
             <span className="text-sm bg-gray-200 dark:bg-gray-600 px-4 py-2 rounded text-[#333F4A] dark:text-white">انتخاب PDF یا عکس</span>
          </div>
          <div className="bg-[#F5F7FA] dark:bg-[#1A223E] p-4 rounded-lg mt-4">
            <h4 className="font-bold text-[#333F4A] dark:text-white border-b border-gray-300 dark:border-gray-600 pb-2 mb-2">پیش‌فاکتور</h4>
            <ul className="text-sm space-y-2 text-[#333F4A] dark:text-gray-300 font-['Outfit']">
              <li className="flex justify-between font-['Vazirmatn']"><span>هزینه حمل تا گمرک:</span><span className="font-['Outfit']">2,500 AED</span></li>
              <li className="flex justify-between font-['Vazirmatn']"><span>هزینه عملیات:</span><span className="font-['Outfit']">500 AED</span></li>
              <li className="flex justify-between font-bold text-lg text-[#333F4A] dark:text-white border-t border-gray-300 dark:border-gray-600 pt-2 mt-2 font-['Vazirmatn']"><span>جمع کل:</span><span className="font-['Outfit']">3,000 AED</span></li>
            </ul>
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={() => setStep(2)} className="w-1/3 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-bold">بازگشت</button>
            <button onClick={() => alert('انتقال به درگاه')} className="w-2/3 bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-bold">پرداخت و ثبت</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestWizard;