import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TrackingPage from './pages/TrackingPage';
import AdminPanel from './pages/AdminPanel';
import { LanguageProvider, LanguageSwitcher, useLanguage } from './components/LanguageContext';

const pageTitles = {
  '/': 'CarExpress | ترانزیت و لجستیک خودرو',
  '/tracking': 'رهگیری خودرو | CarExpress',
  '/admin-panel': 'پنل مدیریت | CarExpress',
};

const PageTitle = () => {
  const { pathname } = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const titles = {
      fa: pageTitles,
      en: { '/': 'CarExpress | Vehicle Logistics', '/tracking': 'Vehicle Tracking | CarExpress', '/admin-panel': 'Admin Panel | CarExpress' },
      ar: { '/': 'CarExpress | نقل ولوجستيات السيارات', '/tracking': 'تتبع السيارة | CarExpress', '/admin-panel': 'لوحة الإدارة | CarExpress' },
    };
    document.title = titles[language][pathname] || 'CarExpress';
  }, [language, pathname]);

  return null;
};

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <PageTitle />
        <div className="fixed bottom-4 left-4 z-[60] rounded-full border border-white/30 bg-slate-900/75 p-1 text-white shadow-xl backdrop-blur-xl">
          <LanguageSwitcher />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}
