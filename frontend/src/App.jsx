import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  Zap, 
  Activity, 
  Database, 
  Link as LinkIcon, 
  Wallet, 
  History, 
  CreditCard,
  RefreshCw,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Constants
const API_BASE = '/api'; // Proxied to localhost:3001 via vite.config.js
const DEFAULT_METER = 'MTR001';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bill, setBill] = useState(null);
  const [payments, setPayments] = useState([]);
  const [isPaying, setIsPaying] = useState(false);

  // Poll for data every 10s (matches ESP32 frequency)
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const fetchData = async () => {
    try {
      const resp = await axios.get(`${API_BASE}/readings?limit=50`);
      setReadings(resp.data.readings);
      
      if (activeTab === 'billing') {
        const billResp = await axios.get(`${API_BASE}/bill/${DEFAULT_METER}`);
        setBill(billResp.data);

        const payResp = await axios.get(`${API_BASE}/payment/${DEFAULT_METER}`);
        setPayments(payResp.data.payments);
      }
      
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Connection refused. Is the backend running?');
      setLoading(false);
    }
  };

  // --- Payment Handler ---
  const handlePayment = async () => {
    if (!bill) return;
    setIsPaying(true);

    try {
      // 1. Create order on backend
      const orderResp = await axios.post(`${API_BASE}/payment/order`, {
        meterId: DEFAULT_METER,
        amount:  bill.total_bill,
        month:   new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
      });

      const { order_id, amount, key } = orderResp.data;

      // 2. Configure Razorpay
      const options = {
        key: key, 
        amount: amount,
        currency: "INR",
        name: "Enargy",
        description: "Electricity Bill Payment",
        order_id: order_id,
        handler: async function (response) {
          // 3. Verify payment on backend
          try {
            await axios.post(`${API_BASE}/payment/verify`, response);
            alert("Payment Successful!");
            fetchData();
          } catch (e) {
            alert("Verification Failed!");
          }
        },
        theme: { color: "#00f2fe" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Failed to initiate payment.");
    } finally {
      setIsPaying(false);
    }
  };

  // --- Chart Configuration ---
  const chartData = {
    labels: [...readings].reverse().map(r => new Date(r.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Power (W)',
        data: [...readings].reverse().map(r => r.power),
        fill: true,
        borderColor: '#00f2fe',
        backgroundColor: 'rgba(0, 242, 254, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Voltage (V)',
        data: [...readings].reverse().map(r => r.voltage),
        borderColor: '#f72585',
        backgroundColor: 'transparent',
        type: 'line',
        yAxisID: 'y1',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#94a3b8' } },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
      y1: { position: 'right', display: false }
    }
  };

  // Latest stats
  const latest = readings[0] || { power: 0, voltage: 0, current: 0, energy_kwh: 0, meter_id: '...' };

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className="sidebar glass">
        <div className="flex-center" style={{ gap: '12px', marginBottom: '1rem' }}>
          <Zap size={32} color="#00f2fe" fill="#00f2fe" />
          <h1 className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 800 }}>ENARGY</h1>
        </div>

        <nav>
          <div className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <Activity size={20} /> Real-time
          </div>
          <div className={`nav-link ${activeTab === 'blockchain' ? 'active' : ''}`} onClick={() => setActiveTab('blockchain')}>
            <Database size={20} /> Ledger
          </div>
          <div className={`nav-link ${activeTab === 'billing' ? 'active' : ''}`} onClick={() => setActiveTab('billing')}>
            <Wallet size={20} /> Billing
          </div>
        </nav>

        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
          <div className="nav-link">
            <LinkIcon size={18} /> Meter: {DEFAULT_METER}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem' }}>Smart Energy Node</h2>
            <p style={{ color: 'var(--text-dim)' }}>Live monitoring and blockchain verification</p>
          </div>
          <button className="btn-premium" onClick={fetchData} disabled={loading}>
            <RefreshCw size={18} className={loading ? 'spinner' : ''} />
            {loading ? 'Syncing...' : 'Force Sync'}
          </button>
        </header>

        {error && (
          <div className="glass animate-fade" style={{ background: 'rgba(247, 37, 133, 0.1)', padding: '1rem', borderLeft: '4px solid var(--accent)', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <AlertCircle color="var(--accent)" />
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* --- TABS --- */}
        {activeTab === 'dashboard' && (
          <div className="animate-fade">
            {/* STATS */}
            <div className="stat-grid">
              <div className="stat-card glass card">
                <span className="stat-label">Power Consumption</span>
                <span className="stat-value text-gradient">{latest.power} <small style={{ fontSize: '1rem' }}>W</small></span>
              </div>
              <div className="stat-card glass card">
                <span className="stat-label">Active Potential</span>
                <span className="stat-value">{latest.voltage} <small style={{ fontSize: '1rem' }}>V</small></span>
              </div>
              <div className="stat-card glass card">
                <span className="stat-label">Current Flow</span>
                <span className="stat-value">{latest.current} <small style={{ fontSize: '1rem' }}>A</small></span>
              </div>
              <div className="stat-card glass card">
                <span className="stat-label">Cumulative Units</span>
                <span className="stat-value" style={{ color: 'var(--success)' }}>{latest.energy_kwh} <small style={{ fontSize: '1rem' }}>kWh</small></span>
              </div>
            </div>

            {/* CHART */}
            <div className="glass card" style={{ height: '400px', marginBottom: '24px' }}>
              <h3 style={{ marginBottom: '1rem' }}>Live Power Matrix</h3>
              <div style={{ height: '320px' }}>
                {readings.length > 0 ? (
                  <Line data={chartData} options={chartOptions} />
                ) : (
                  <div className="flex-center" style={{ height: '100%', color: 'var(--text-dim)' }}>Waiting for ESP32 data...</div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'blockchain' && (
          <div className="animate-fade glass card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3>Immutable Reading Ledger</h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Records verified by Ethereum Smart Contract</p>
              </div>
              <div className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={14} /> Synced to Chain
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th><Clock size={16} /> Time</th>
                    <th>Units (kWh)</th>
                    <th>Node Hash</th>
                    <th>Blockchain TX</th>
                  </tr>
                </thead>
                <tbody>
                  {readings.map((r, i) => (
                    <tr key={i}>
                      <td style={{ fontSize: '0.9rem' }}>{new Date(r.timestamp).toLocaleString()}</td>
                      <td style={{ fontWeight: 600 }}>{r.energy_kwh}</td>
                      <td className="tx-hash">{r.hash.substring(0, 10)}...</td>
                      <td className="tx-hash">
                        {r.blockchain_tx_hash ? (
                          <span title={r.blockchain_tx_hash}>{r.blockchain_tx_hash.substring(0, 14)}...</span>
                        ) : (
                          <span style={{ color: 'var(--accent)', fontStyle: 'italic', fontSize: '0.75rem' }}>Pending...</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="animate-fade">
            <div className="stat-grid">
              {/* CURRENT BILL */}
              <div className="glass card" style={{ gridColumn: 'span 2' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h3 style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem', color: 'var(--text-dim)' }}>Estimate Bill (Current Month)</h3>
                    <div className="stat-value text-gradient" style={{ margin: '1rem 0' }}>₹{bill?.total_bill || '0.00'}</div>
                    <p style={{ color: 'var(--text-dim)' }}>Units Consumed: <strong>{bill?.total_kwh || 0} kWh</strong></p>
                  </div>
                  <CreditCard size={40} color="var(--primary)" opacity={0.5} />
                </div>
                
                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                    <button className="btn-premium" onClick={handlePayment} disabled={isPaying || !bill?.total_bill}>
                      {isPaying ? 'Processing...' : `Pay ₹${bill?.total_bill || 0} Now`}
                    </button>
                    <div style={{ alignSelf: 'center', display: 'flex', gap: '8px', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                      <CheckCircle size={14} /> Secured by Razorpay
                    </div>
                </div>
              </div>

              {/* SLAB BREAKDOWN */}
              <div className="glass card">
                <h4 style={{ marginBottom: '1rem' }}>Tarif Slabs</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span>0–100 kWh</span>
                    <span style={{ color: 'var(--primary)' }}>₹1.5</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span>101–300 kWh</span>
                    <span style={{ color: 'var(--primary)' }}>₹3.0</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span>301–500 kWh</span>
                    <span style={{ color: 'var(--primary)' }}>₹5.0</span>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                    Calculated based on progressive slabs.
                  </div>
                </div>
              </div>
            </div>

            {/* PAYMENT HISTORY */}
            <div className="glass card animate-fade" style={{ marginTop: '24px' }}>
               <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <History size={20} /> Payment History
               </h3>
               <div className="table-container">
                 <table>
                   <thead>
                     <tr>
                       <th>Period</th>
                       <th>Amount</th>
                       <th>Payment ID</th>
                       <th>Status</th>
                     </tr>
                   </thead>
                   <tbody>
                     {payments.map((p, i) => (
                       <tr key={i}>
                         <td>{p.bill_month}</td>
                         <td>₹{p.amount}</td>
                         <td className="tx-hash">{p.razorpay_payment_id || '---'}</td>
                         <td>
                           <span className={`badge ${p.status === 'paid' ? 'badge-success' : 'badge-pending'}`}>
                             {p.status}
                           </span>
                         </td>
                       </tr>
                     ))}
                     {payments.length === 0 && (
                       <tr>
                         <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '2rem' }}>No payments recorded.</td>
                       </tr>
                     )}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
