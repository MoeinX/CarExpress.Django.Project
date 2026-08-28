import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const getStoredTheme = () => {
  const saved = localStorage.getItem('theme');
  if (saved) return saved === 'dark';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const ThemeToggle = ({ className = '', showLabel = false }) => {
  const [dark, setDark] = useState(getStoredTheme);
  const { t } = useLanguage();

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  useEffect(() => {
    const syncTheme = (event) => {
      if (event.key === 'theme') setDark(event.newValue === 'dark');
    };
    window.addEventListener('storage', syncTheme);
    return () => window.removeEventListener('storage', syncTheme);
  }, []);

  return (
    <button
      type="button"
      onClick={() => setDark((prev) => !prev)}
      className={`group relative flex items-center justify-center gap-2 rounded-2xl border border-amber-500/30 bg-white/90 px-3.5 py-2 text-xs font-black text-slate-800 shadow-lg shadow-slate-200/40 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:border-amber-400 hover:shadow-amber-500/10 dark:border-amber-500/25 dark:bg-[#08101a]/90 dark:text-amber-300 dark:shadow-black/50 dark:hover:border-amber-400/50 ${className}`}
      aria-label={dark ? t('switchToLight') : t('switchToDark')}
      title={dark ? t('switchToLight') : t('switchToDark')}
    >
      <div className="relative flex h-5 w-5 items-center justify-center">
        {dark ? (
          <Sun size={17} className="text-amber-400 transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <Moon size={17} className="text-slate-700 transition-transform duration-300 group-hover:-rotate-12" />
        )}
      </div>
      {showLabel && (
        <span className="text-[11px] font-bold">
          {dark ? t('switchToLight') : t('switchToDark')}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;

