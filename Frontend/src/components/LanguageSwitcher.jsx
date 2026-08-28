import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES } from './LanguageContext';

export const LanguageSwitcher = ({ variant = 'floating' }) => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = SUPPORTED_LANGUAGES.find((item) => item.code === language) || SUPPORTED_LANGUAGES[0];

  if (variant === 'pills') {
    return (
      <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white/90 p-1 shadow-lg backdrop-blur-xl dark:border-amber-500/30 dark:bg-[#08101a]/90">
        {SUPPORTED_LANGUAGES.map((item) => {
          const active = item.code === language;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => setLanguage(item.code)}
              className={`rounded-full px-3 py-1 text-xs font-black transition-all ${
                active
                  ? 'bg-gradient-to-r from-[#d4af37] via-[#e5b842] to-[#b38612] text-[#08101a] shadow-md shadow-amber-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="تغییر زبان / Change language"
        className="flex items-center gap-2 rounded-2xl border border-slate-200/90 bg-white/95 px-3.5 py-2.5 text-xs font-black text-slate-800 shadow-xl shadow-slate-300/40 backdrop-blur-2xl transition-all duration-300 hover:scale-105 hover:border-amber-400 dark:border-amber-500/30 dark:bg-[#08101a]/90 dark:text-white dark:shadow-black/70 dark:hover:border-amber-400/60 dark:hover:shadow-amber-500/10"
      >
        <Globe size={16} className="text-amber-600 dark:text-amber-400" />
        <span>{current.label}</span>
        <ChevronDown
          size={13}
          className={`text-amber-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute bottom-full mb-2 start-0 z-50 min-w-[155px] overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-1.5 shadow-2xl shadow-slate-300/60 backdrop-blur-2xl dark:border-amber-500/30 dark:bg-[#0d1b2e]/95 dark:shadow-black/90 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {SUPPORTED_LANGUAGES.map((item) => {
            const active = item.code === language;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  setLanguage(item.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-xs font-bold transition-all ${
                  active
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#e5b842] text-[#08101a] shadow-sm font-black'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-[10px] opacity-75 uppercase font-en tracking-wider">
                  {item.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;



