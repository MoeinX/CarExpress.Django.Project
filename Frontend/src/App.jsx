import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TrackingPage from './pages/TrackingPage';
import AdminPanel from './pages/AdminPanel';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';

const PageTitle = () => {
  const { pathname } = useLocation();
  const { language, t } = useLanguage();

  useEffect(() => {
    const titles = {
      '/': t('titleHome'),
      '/tracking': t('titleTracking'),
      '/admin-panel': t('titleAdmin'),
    };
    document.title = titles[pathname] || t('titleHome');
  }, [language, pathname, t]);

  return null;
};

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <PageTitle />
        <div className="fixed bottom-5 start-5 z-[60]">
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
