import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Receipt, MessageCircle, Shield, Activity, Menu, X, LogOut, Search, Database } from 'lucide-react';

// Pages
import LoginPage from './pages/Login';
import ConsumerDashboard from './pages/Consumer/Dashboard';
import BillingModule from './pages/Consumer/Billing';
import ComplaintModule from './pages/Consumer/Complaints';
import AdminDashboard from './pages/Admin/Dashboard';
import BlockchainMonitoring from './pages/Admin/Blockchain';

const Sidebar = ({ role, user, logout }) => {
  const commonLinks = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: role === 'admin' ? '/admin' : '/consumer' },
    { title: 'Billing', icon: <Receipt size={20} />, path: '/billing' },
    { title: 'Complaints', icon: <MessageCircle size={20} />, path: '/complaints' },
  ];

  const adminLinks = [
    { title: 'Blockchain Logs', icon: <Shield size={20} />, path: '/admin/blockchain' },
    { title: 'Live Monitoring', icon: <Activity size={20} />, path: '/admin/monitoring' },
  ];

  const links = role === 'admin' ? [...commonLinks, ...adminLinks] : commonLinks;

  return (
    <aside className="sidebar">
      <div className="logo-section">
        <div className="logo-icon">E</div>
        <h2 style={{ fontSize: '1.25rem', color: '#fff' }}>Enargy</h2>
      </div>
      <nav className="nav-links">
        {links.map((link) => (
          <Link key={link.path} to={link.path} className="nav-link">
            {link.icon}
            <span>{link.title}</span>
          </Link>
        ))}
      </nav>
      <div style={{ marginTop: 'auto' }}>
        <button onClick={logout} className="btn nav-link" style={{ width: '100%', background: 'transparent' }}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

const Header = ({ title, user }) => (
  <header className="header">
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      <button className="btn" style={{ padding: '8px', background: '#f8f9fa', display: 'none' }}>
        <Menu size={20} />
      </button>
      <h3 style={{ color: 'var(--primary)', letterSpacing: '-0.5px' }}>{title}</h3>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user?.name || 'Authorized'}</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.meterId || 'EB-ADMIN'}</span>
      </div>
      <div style={{ width: '40px', height: '40px', background: '#F1F2F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', border: '2px solid var(--primary)' }}>
        <img src={`https://ui-avatars.com/api/?name=${user?.name || 'A'}&background=0A3D62&color=fff`} alt="user" style={{ borderRadius: '50%' }} />
      </div>
    </div>
  </header>
);

const AppLayout = ({ children, role, user, logout }) => {
  const location = useLocation();
  const getPageTitle = () => {
    if (location.pathname.includes('billing')) return 'Billing Module';
    if (location.pathname.includes('complaints')) return 'Consumer Complaints';
    if (location.pathname.includes('blockchain')) return 'Blockchain Transparency Records';
    if (location.pathname.includes('admin')) return 'Admin Authority Dashboard';
    return 'Dashboard Overview';
  };

  return (
    <div className="app-container">
      <Sidebar role={role} user={user} logout={logout} />
      <main className="main-layout">
        <Header title={getPageTitle()} user={user} />
        <div className="content-wrapper">{children}</div>
      </main>
    </div>
  );
};

export default function App() {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem('auth');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (role, user) => {
    const authData = { role, user };
    setAuth(authData);
    localStorage.setItem('auth', JSON.stringify(authData));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('auth');
  };

  if (!auth) return <LoginPage onLogin={login} />;

  return (
    <Router>
      <AppLayout role={auth.role} user={auth.user} logout={logout}>
        <Routes>
          {auth.role === 'consumer' ? (
            <>
              <Route path="/consumer" element={<ConsumerDashboard user={auth.user} />} />
              <Route path="/billing" element={<BillingModule user={auth.user} />} />
              <Route path="/complaints" element={<ComplaintModule user={auth.user} />} />
              <Route path="*" element={<Navigate to="/consumer" />} />
            </>
          ) : (
            <>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/blockchain" element={<BlockchainMonitoring />} />
              <Route path="*" element={<Navigate to="/admin" />} />
            </>
          )}
        </Routes>
      </AppLayout>
    </Router>
  );
}
