import React from 'react';
import { Receipt, Users, Activity, Wallet, MessageSquare } from 'lucide-react';

const AdminKPICard = ({ title, value, icon, variant = 'primary' }) => (
  <div className={`card kpi-card kpi-${variant} animate-up`}>
    <div className="kpi-icon">{icon}</div>
    <div>
      <p className="kpi-label">{title}</p>
      <h2 className="kpi-value">{value}</h2>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Updated just now</p>
    </div>
  </div>
);

export default function AdminBilling() {
  return (
    <div className="animate-up">
      <div className="kpi-grid">
        <AdminKPICard 
          title="Total Consumers" 
          value="1,284" 
          icon={<Users size={24} />} 
        />
        <AdminKPICard 
          title="Total Energy Usage" 
          value="48.2 MWh" 
          icon={<Activity size={24} />} 
          variant="accent"
        />
        <AdminKPICard 
          title="Total Revenue" 
          value="₹14.2 L" 
          icon={<Wallet size={24} />} 
          variant="success"
        />
        <AdminKPICard 
          title="Active Complaints" 
          value="12" 
          icon={<MessageSquare size={24} />} 
          variant="warning"
        />
      </div>

      <div className="card" style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Receipt className="text-primary" /> Authority Billing Details
          </h2>
          <button className="btn btn-primary">Download Statements</button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Consumer Meter ID</th>
                <th>Amount Due</th>
                <th>Due Date</th>
                <th style={{ textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span style={{ fontWeight: 600 }}>INV-26-4401</span></td>
                <td>MTR001</td>
                <td>₹450.00</td>
                <td>April 10, 2026</td>
                <td style={{ textAlign: 'right' }}><span className="badge badge-success">Paid</span></td>
              </tr>
              <tr>
                <td><span style={{ fontWeight: 600 }}>INV-26-4402</span></td>
                <td>MTR002</td>
                <td>₹1,120.50</td>
                <td>April 10, 2026</td>
                <td style={{ textAlign: 'right' }}><span className="badge" style={{ background: '#FEF3C7', color: '#92400E' }}>Pending</span></td>
              </tr>
              <tr>
                <td><span style={{ fontWeight: 600 }}>INV-26-4403</span></td>
                <td>MTR003</td>
                <td>₹890.00</td>
                <td>April 10, 2026</td>
                <td style={{ textAlign: 'right' }}><span className="badge badge-success">Paid</span></td>
              </tr>
               <tr>
                <td><span style={{ fontWeight: 600 }}>INV-26-4404</span></td>
                <td>MTR004</td>
                <td>₹2,340.20</td>
                <td>April 10, 2026</td>
                <td style={{ textAlign: 'right' }}><span className="badge" style={{ background: '#FEE2E2', color: '#991B1B' }}>Overdue</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
