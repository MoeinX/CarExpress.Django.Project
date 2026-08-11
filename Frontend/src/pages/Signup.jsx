import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#131b26] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1a2432] p-8 rounded-2xl shadow-neo-flat border border-slate-700/30">
        <div className="flex justify-center mb-6"><Logo /></div>
        <h2 className="text-xl font-bold text-center mb-6 text-slate-200">Create New Account</h2>
        
        <form onSubmit={() => navigate('/otp')} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Full Name</label>
            <input type="text" required placeholder="John Doe" className="w-full bg-[#131b26] border border-slate-800 rounded-xl p-3 text-sm text-slate-200 outline-none shadow-neo-pressed" />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Mobile Phone</label>
            <input type="tel" required placeholder="+1234567890" className="w-full bg-[#131b26] border border-slate-800 rounded-xl p-3 text-sm text-slate-200 outline-none shadow-neo-pressed" />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Password</label>
            <input type="password" required placeholder="••••••••" className="w-full bg-[#131b26] border border-slate-800 rounded-xl p-3 text-sm text-slate-200 outline-none shadow-neo-pressed" />
          </div>

          <button type="submit" className="w-full py-3 mt-2 rounded-xl bg-accentBlue text-slate-950 font-bold text-sm shadow-neo-btn">
            Send Verification Code (OTP)
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Already registered? <Link to="/login" className="text-accentBlue font-bold hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
}