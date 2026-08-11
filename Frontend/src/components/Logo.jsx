import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3 no-underline">
      <div className="w-12 h-12 rounded-xl bg-[#1a2432] shadow-neo-flat flex items-center justify-center border border-slate-700/30">
        <div className="flex items-center justify-center relative font-black text-xl italic tracking-tighter">
          <span className="text-white">C</span>
          <span className="text-accentBlue -ml-1">E</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold tracking-wide text-white italic">CarExpress</span>
        <span className="text-[10px] text-slate-400">UAE Auto Import Platform</span>
      </div>
    </Link>
  );
}