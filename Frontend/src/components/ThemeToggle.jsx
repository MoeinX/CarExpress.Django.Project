import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const getStoredTheme = () => localStorage.getItem('theme') === 'dark';

const ThemeToggle = ({ className = '' }) => {
  const [dark, setDark] = useState(getStoredTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const syncTheme = (event) => {
      if (event.key === 'theme') setDark(event.newValue === 'dark');
    };
    window.addEventListener('storage', syncTheme);
    return () => window.removeEventListener('storage', syncTheme);
  }, []);

  if (window.location.pathname === '/tracking') return null;

  return (
    <button
      type="button"
      onClick={() => setDark((value) => !value)}
      className={`rounded-full bg-[#f36b21] p-2.5 text-white shadow-md transition-all hover:scale-105 hover:bg-[#d94b31] ${className}`}
      aria-label="تغییر پوسته"
      title={dark ? 'تغییر به حالت روز' : 'تغییر به حالت شب'}
    >
      {dark ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
};

export default ThemeToggle;
