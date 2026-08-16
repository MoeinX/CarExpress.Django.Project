import React, { useEffect, useState } from 'react';

const ThemeToggle = ({ className = '' }) => {
  const [dark, setDark] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((value) => !value)}
      className={`rounded-xl border border-gray-200 bg-white/70 px-3 py-2 text-sm text-slate-700 transition hover:border-[#FF8C00] dark:border-gray-700 dark:bg-[#333F4A]/60 dark:text-white ${className}`}
      aria-label="تغییر پوسته"
    >
      {dark ? '☀️ روشن' : '🌙 تیره'}
    </button>
  );
};

export default ThemeToggle;
