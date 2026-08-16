import React, { useState, useRef } from 'react';

const AuthPage = ({ onLogin }) => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [step, setStep] = useState(1); // 1: Info, 2: OTP
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleSubmitInfo = (e) => {
    e.preventDefault();
    if(phone.length > 9) setStep(2);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '' && index < 4) inputRefs.current[index + 1].focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA] dark:bg-[#1A223E] font-['Vazirmatn'] px-4 transition-colors">
      <div className="bg-white dark:bg-[#333F4A] p-8 rounded-3xl shadow-2xl w-full max-w-md">
        
        <h2 className="text-3xl font-extrabold text-center mb-2 text-[#333F4A] dark:text-white">
          {step === 2 ? 'تایید شماره' : mode === 'login' ? 'ورود' : 'ثبت نام'}
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-sm">
          {step === 2 ? `کد ۵ رقمی به ${phone} ارسال شد` : 'به پلتفرم کار اکسپرس خوش آمدید'}
        </p>

        {step === 1 ? (
          <form onSubmit={handleSubmitInfo} className="space-y-5">
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#333F4A] dark:text-gray-200 mb-1">نام</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#E31837] dark:bg-[#1A223E] dark:text-white outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333F4A] dark:text-gray-200 mb-1">نام خانوادگی</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#E31837] dark:bg-[#1A223E] dark:text-white outline-none" required />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-[#333F4A] dark:text-gray-200 mb-1">کد ملی</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#E31837] dark:bg-[#1A223E] dark:text-white font-['Outfit'] outline-none" required />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-[#333F4A] dark:text-gray-200 mb-1">شماره موبایل</label>
              <input type="tel" dir="ltr" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#E31837] dark:bg-[#1A223E] dark:text-white font-['Outfit'] outline-none" placeholder="0912 345 6789" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            
            <button type="submit" className="w-full bg-[#E31837] hover:bg-[#FF8C00] text-white py-3 rounded-xl transition-colors font-bold shadow-lg shadow-red-500/30">
              ارسال کد تایید
            </button>
            
            <div className="text-center mt-4">
              <button type="button" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-sm text-[#333F4A] dark:text-gray-300 hover:text-[#E31837] dark:hover:text-[#FF8C00] transition-colors">
                {mode === 'login' ? 'حساب کاربری ندارید؟ ثبت نام کنید' : 'قبلاً ثبت نام کرده‌اید؟ وارد شوید'}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-center gap-3" dir="ltr">
              {otp.map((digit, i) => (
                <input key={i} ref={el => inputRefs.current[i] = el} type="text" maxLength="1" className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#E31837] focus:ring-0 dark:bg-[#1A223E] dark:text-white font-['Outfit'] outline-none transition-colors" value={digit} onChange={(e) => handleOtpChange(i, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(i, e)} />
              ))}
            </div>
            <button onClick={() => onLogin(true)} className="w-full bg-[#E31837] hover:bg-[#FF8C00] text-white py-3 rounded-xl transition-colors font-bold shadow-lg shadow-red-500/30">
              تایید و ورود به داشبورد
            </button>
            <button onClick={() => setStep(1)} className="w-full text-sm text-gray-500 dark:text-gray-400 hover:text-[#333F4A] dark:hover:text-white transition-colors">
              ویرایش شماره موبایل
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;