// EDITED: Import axios for making HTTP requests and useEffect for potential initial checks.
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [step, setStep] = useState(1); // 1: Info, 2: OTP
  
  // --- EDITED: Added state for all form fields, loading, and errors ---
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  // --- END EDITED SECTION ---
  
  const inputRefs = useRef([]);

  // EDITED: This function now handles the API call to request an OTP.
  const handleSubmitInfo = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setIsLoading(true);

    // This is the endpoint on your DRF backend to request an OTP.
    // It can be a single endpoint that handles both login and signup based on the data sent.
    const url = '/api/auth/otp/generate/'; 
    
    const payload = {
      phone_number: phone,
      ...(mode === 'signup' && { // Only include these fields if in signup mode
        first_name: firstName,
        last_name: lastName,
        national_id: nationalId,
      })
    };

    try {
      await axios.post(url, payload);
      setStep(2); // On success, move to the OTP step
    } catch (err) {
      // Set an error message from the backend response, or a generic one.
      setError(err.response?.data?.detail || 'An error occurred. Please check your details and try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // EDITED: Created a new async function to handle OTP verification.
  const handleVerifyOtp = async () => {
    setError('');
    setIsLoading(true);
    const otpCode = otp.join('');

    // This is the endpoint to verify the OTP and receive JWT tokens.
    const url = '/api/auth/otp/verify/';
    const payload = {
      phone_number: phone,
      otp: otpCode,
    };

    try {
      const response = await axios.post(url, payload);
      
      // On successful verification, store tokens and set auth header.
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      
      onLogin?.(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'The entered code is incorrect.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    // Only allow numeric input
    if (isNaN(value)) return;
    
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '' && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // EDITED: Added a function to reset state when switching between login/signup.
  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    // Clear form fields and errors when switching
    setError('');
    setFirstName('');
    setLastName('');
    setNationalId('');
    setPhone('');
    setOtp(['', '', '', '', '', '']);
    setStep(1);
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA] dark:bg-[#1A223E] font-['Vazirmatn'] px-4 transition-colors">
      <div className="bg-white dark:bg-[#333F4A] p-8 rounded-3xl shadow-2xl w-full max-w-md">
        
        <h2 className="text-3xl font-extrabold text-center mb-2 text-[#333F4A] dark:text-white">
          {step === 2 ? 'تایید شماره' : mode === 'login' ? 'ورود' : 'ثبت نام'}
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6 text-sm">
          {step === 2 ? `کد ۶ رقمی به ${phone} ارسال شد` : 'به پلتفرم کار اکسپرس خوش آمدید'}
        </p>
        
        {/* EDITED: Display the error message if it exists */}
        {error && <p className="text-center text-red-500 text-sm mb-4 bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">{error}</p>}

        {step === 1 ? (
          <form onSubmit={handleSubmitInfo} className="space-y-5">
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#333F4A] dark:text-gray-200 mb-1">نام</label>
                  {/* EDITED: Connected input to React state */}
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#E31837] dark:bg-[#1A223E] dark:text-white outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333F4A] dark:text-gray-200 mb-1">نام خانوادگی</label>
                  {/* EDITED: Connected input to React state */}
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#E31837] dark:bg-[#1A223E] dark:text-white outline-none" required />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-[#333F4A] dark:text-gray-200 mb-1">کد ملی</label>
                  {/* EDITED: Connected input to React state */}
                  <input type="text" value={nationalId} onChange={(e) => setNationalId(e.target.value)} className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#E31837] dark:bg-[#1A223E] dark:text-white font-['Outfit'] outline-none" required />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-[#333F4A] dark:text-gray-200 mb-1">شماره موبایل</label>
              {/* EDITED: The phone input was already correctly connected */}
              <input type="tel" dir="ltr" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#E31837] dark:bg-[#1A223E] dark:text-white font-['Outfit'] outline-none" placeholder="0912 345 6789" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            
            {/* EDITED: Disabled button during loading and changed text */}
            <button type="submit" disabled={isLoading} className="w-full bg-[#E31837] hover:bg-[#FF8C00] text-white py-3 rounded-xl transition-colors font-bold shadow-lg shadow-red-500/30 disabled:bg-gray-400 disabled:cursor-not-allowed">
              {isLoading ? 'در حال ارسال...' : 'ارسال کد تایید'}
            </button>
            
            <div className="text-center mt-4">
              {/* EDITED: Called the new switchMode function */}
              <button type="button" onClick={switchMode} className="text-sm text-[#333F4A] dark:text-gray-300 hover:text-[#E31837] dark:hover:text-[#FF8C00] transition-colors">
                {mode === 'login' ? 'حساب کاربری ندارید؟ ثبت نام کنید' : 'قبلاً ثبت نام کرده‌اید؟ وارد شوید'}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-center gap-3" dir="ltr">
              {otp.map((digit, i) => (
                <input key={i} ref={el => inputRefs.current[i] = el} type="text" inputMode="numeric" pattern="[0-9]*" maxLength="1" className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#E31837] focus:ring-0 dark:bg-[#1A223E] dark:text-white font-['Outfit'] outline-none transition-colors" value={digit} onChange={(e) => handleOtpChange(i, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(i, e)} />
              ))}
            </div>
            {/* EDITED: Changed onClick to call handleVerifyOtp and added loading state */}
            <button onClick={handleVerifyOtp} disabled={isLoading} className="w-full bg-[#E31837] hover:bg-[#FF8C00] text-white py-3 rounded-xl transition-colors font-bold shadow-lg shadow-red-500/30 disabled:bg-gray-400 disabled:cursor-not-allowed">
              {isLoading ? 'در حال بررسی...' : 'تایید و ورود به داشبورد'}
            </button>
            {/* EDITED: Disabled button during loading state */}
            <button onClick={() => { setStep(1); setError(''); }} disabled={isLoading} className="w-full text-sm text-gray-500 dark:text-gray-400 hover:text-[#333F4A] dark:hover:text-white transition-colors">
              ویرایش شماره موبایل
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
