import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import RequestWizard from './pages/RequestWizard';
import TrackingPage from './pages/TrackingPage';
import PaymentPage from './pages/PaymentPage';
import UserDashboard from './pages/UserDashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* صفحات اصلی و عمومی */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* صفحه احراز هویت (شامل ورود، ثبت‌نام و OTP در یک کامپوننت) */}
        <Route path="/auth" element={<AuthPage />} />
        
        {/* صفحات مرتبط با پنل کاربر و عملیات حمل و نقل */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/request" element={<RequestWizard />} />
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}