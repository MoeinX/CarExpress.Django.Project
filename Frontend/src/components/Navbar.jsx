import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Car } from 'lucide-react';

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className="w-full bg-white dark:bg-navyDeep py-4 px-6 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-black italic tracking-wider text-navyDeep dark:text-white">
          <Car className="text-electricOrange" size={28} />
          <span>Car<span className="text-electricOrange">Express</span></span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/inventory" className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-electricOrange transition">
            Browse Cars
          </Link>

          {/* Theme Toggle Button */}
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-navyCard text-slate-700 dark:text-slate-300 hover:text-electricOrange border border-slate-300 dark:border-slate-700 transition"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link 
            to="/login" 
            className="px-5 py-2.5 rounded-xl bg-electricOrange text-white font-bold text-sm hover:bg-electricOrangeHover transition shadow-lg shadow-electricOrange/20"
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}