import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

export default function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#131b26] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1a2432] p-8 rounded-2xl shadow-neo-flat border border-slate-700/30">
        <div className="flex justify-center mb-6"><Logo /></div>
        <h2 className="text-xl font-bold text-center mb-2 text-slate-200">Password Recovery</h2>
        <p className="text-xs text-slate-400 text-center mb-6">Enter your email or phone number to reset</p>

        <form onSubmit={() => navigate('/otp')} className="space-y-4">
          <div>
            <input type="text" placeholder="Email or Phone Number" required className="w-full bg-[#131b26] border border-slate-800 rounded-xl p-3 text-sm text-slate-200 outline-none shadow-neo-pressed" />
          </div>
          <button type="submit" className="w-full py-3 rounded-xl bg-accentBlue text-slate-950 font-bold text-sm shadow-neo-btn">
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 text-center text-xs">
          <Link to="/login" className="text-slate-400 hover:text-white">Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
}