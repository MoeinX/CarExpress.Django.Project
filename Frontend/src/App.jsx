import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TrackingPage from './pages/TrackingPage';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* صفحات اصلی و عمومی */}
        <Route path="/" element={<HomePage />} />
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}
