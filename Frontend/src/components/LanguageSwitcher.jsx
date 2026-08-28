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
      <div className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/60">
        {SUPPORTED_LANGUAGES.map((item) => {
          const active = item.code === language;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => setLanguage(item.code)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
                active
                  ? 'bg-[#f36b21] text-white shadow-md'
                  : 'text-slate-700 hover:bg-white/40 dark:text-slate-300 dark:hover:bg-white/10'
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
        className="flex items-center gap-2 rounded-full border border-white/30 bg-slate-900/80 px-3.5 py-2 text-xs font-bold text-white shadow-xl backdrop-blur-xl transition hover:border-[#f36b21] hover:bg-slate-900"
      >
        <Globe size={15} className="text-[#f36b21]" />
        <span>{current.label}</span>
        <ChevronDown size={13} className={`text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute bottom-full mb-2 left-0 z-50 min-w-[130px] overflow-hidden rounded-2xl border border-white/20 bg-slate-900/90 p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2">
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
                className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-xs font-bold transition ${
                  active
                    ? 'bg-[#f36b21] text-white'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-[10px] opacity-70 uppercase font-outfit">{item.shortLabel}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;

