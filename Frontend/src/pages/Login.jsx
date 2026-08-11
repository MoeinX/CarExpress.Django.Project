import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

export default function OTP() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#131b26] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1a2432] p-8 rounded-2xl shadow-neo-flat border border-slate-700/30 text-center">
        <div className="flex justify-center mb-6"><Logo /></div>
        <h2 className="text-xl font-bold mb-2 text-slate-200">Verify Verification Code</h2>
        <p className="text-xs text-slate-400 mb-6">Enter the 4-digit code sent to your phone</p>

        <div className="flex justify-center gap-3 mb-6">
          {[1, 2, 3, 4].map((_, i) => (
            <input 
              key={i} 
              type="text" 
              maxLength="1" 
              className="w-12 h-12 text-center text-xl font-bold bg-[#131b26] border border-slate-800 rounded-xl shadow-neo-pressed text-accentBlue outline-none focus:border-accentBlue"
            />
          ))}
        </div>

        <button onClick={() => navigate('/')} className="w-full py-3 rounded-xl bg-accentBlue text-slate-950 font-bold text-sm shadow-neo-btn">
          Verify & Continue
        </button>
      </div>
    </div>
  );
}