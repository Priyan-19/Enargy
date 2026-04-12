import React, { useState } from 'react';
import { ShieldCheck, User, Lock } from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [activeTab, setActiveTab] = useState('consumer');
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple validation for Demo
    if (activeTab === 'admin') {
      if (formData.username === 'EB-Admin' && formData.password === 'TNEB@ADMIN') {
        onLogin('admin', { name: 'Energy Board Admin', role: 'admin' });
      } else {
        alert('Invalid Admin credentials');
      }
    } else {
      // For consumer: Password must be TNEB@ + MeterID
      if (formData.password === `TNEB@${formData.username}`) {
        onLogin('consumer', { name: 'Priyan', meterId: formData.username, role: 'consumer' });
      } else {
        alert('Incorrect format. Password must be TNEB@{{meter_id}}');
      }
    }
  };

  return (
    <div className="login-page" style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'var(--bg-light)' 
    }}>
      <div className="card animate-up" style={{ width: '420px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            background: 'var(--primary)', 
            borderRadius: '12px', 
            color: 'white', 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <ShieldCheck size={32} />
          </div>
          <h1>Enargy</h1>
          <p style={{ color: 'var(--text-muted)' }}>Secure Blockchain Energy System</p>
        </div>

        <div style={{ 
          display: 'flex', 
          background: '#f1f2f6', 
          borderRadius: '8px', 
          padding: '4px',
          marginBottom: '20px'
        }}>
          <button 
            type="button" 
            onClick={() => setActiveTab('consumer')}
            className="btn"
            style={{ 
              flex: 1, 
              background: activeTab === 'consumer' ? 'white' : 'transparent',
              boxShadow: activeTab === 'consumer' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
              color: activeTab === 'consumer' ? 'var(--primary)' : 'var(--text-muted)'
            }}
          >
            Consumer
          </button>
          <button 
            type="button" 
            onClick={() => setActiveTab('admin')}
            className="btn"
            style={{ 
              flex: 1, 
              background: activeTab === 'admin' ? 'white' : 'transparent',
              boxShadow: activeTab === 'admin' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
              color: activeTab === 'admin' ? 'var(--primary)' : 'var(--text-muted)'
            }}
          >
            EB Admin
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>{activeTab === 'consumer' ? 'Meter ID' : 'Username'}</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '12px', top: '15px', color: '#B2BEC3' }} />
              <input 
                type="text" 
                placeholder={activeTab === 'consumer' ? 'e.g., MTR001' : 'EB-Admin'} 
                style={{ paddingLeft: '40px' }}
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '15px', color: '#B2BEC3' }} />
              <input 
                type="password" 
                placeholder="••••••••" 
                style={{ paddingLeft: '40px' }}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Login to System
          </button>
        </form>
        
        <p style={{ 
          marginTop: '20px', 
          fontSize: '0.8rem', 
          color: 'var(--text-muted)', 
          textAlign: 'center',
          lineHeight: '1.4'
        }}>
          {activeTab === 'consumer' 
            ? 'Format: TNEB@{{meter_id}}' 
            : 'Authorized Energy Board Access Only'}
        </p>
      </div>
    </div>
  );
}
