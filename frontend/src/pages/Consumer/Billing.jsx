import React, { useState, useEffect } from 'react';
import { CreditCard, History, TrendingDown, Receipt } from 'lucide-react';
import { getBilling } from '../../services/api';

export default function BillingModule({ user }) {
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const res = await getBilling(user.meterId);
        setBill(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Bill fetch error:', err.message);
      }
    };
    fetchBill();
  }, [user.meterId]);

  if (loading) return <div>Loading bill details...</div>;

  return (
    <div className="animate-up">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
        <div className="card">
          <h2 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Receipt className="text-primary" /> Current Bill
          </h2>
          <div style={{ background: 'var(--bg-light)', padding: '24px', borderRadius: '12px', textAlign: 'center', marginBottom: '24px' }}>
            <p className="kpi-label">Total Amount Due</p>
            <h1 style={{ fontSize: '2.5rem', margin: '10px 0', color: 'var(--primary)' }}>₹{bill.total_bill.toFixed(2)}</h1>
            <p style={{ color: 'var(--success)', fontWeight: 600, fontSize: '0.9rem' }}>Due Date: April 10, 2026</p>
          </div>
          <button className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>
            <CreditCard size={20} /> Pay Now via Razorpay
          </button>
          
          <div style={{ marginTop: '30px' }}>
            <h4 style={{ marginBottom: '15px' }}>Bill Breakdown</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {bill.breakdown.map((slab, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{slab.slab} ({slab.units}U)</span>
                  <span style={{ fontWeight: 600 }}>₹{slab.cost.toFixed(2)}</span>
                </div>
              ))}
              <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                <span>Total Amount</span>
                <span style={{ color: 'var(--accent)' }}>₹{bill.total_bill.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <History className="text-primary" /> Payment History
          </h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Date</th>
                  <th>Electricity Period</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>TXN_998122</td>
                  <td>March 15, 2026</td>
                  <td>Feb 2026</td>
                  <td>₹842.00</td>
                  <td><span className="badge badge-success">Paid</span></td>
                </tr>
                <tr>
                  <td>TXN_887102</td>
                  <td>Feb 14, 2026</td>
                  <td>Jan 2026</td>
                  <td>₹720.50</td>
                  <td><span className="badge badge-success">Paid</span></td>
                </tr>
                <tr>
                  <td>TXN_776192</td>
                  <td>Jan 12, 2026</td>
                  <td>Dec 2025</td>
                  <td>₹610.10</td>
                  <td><span className="badge badge-success">Paid</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
