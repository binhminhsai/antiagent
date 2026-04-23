import React from 'react';
import { 
  BarChart, Bar, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { revenueData } from '../data/mockData';

export const Revenue: React.FC = () => {
  return (
    <div className="animate-fade-in delay-3">
      <div className="controls-bar">
        <div>
          <h2>Revenue Analytics</h2>
          <p>Phân tích Doanh thu và Tỷ lệ giữ chân người dùng trả phí</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="glass-panel stat-card">
          <div className="stat-title">Total Revenue (This Month)</div>
          <div className="stat-value">${(revenueData.reduce((acc, curr) => acc + curr.revenue, 0)).toLocaleString()}</div>
          <div className="stat-trend trend-up">↑ +15.2% from last month</div>
        </div>
        <div className="glass-panel stat-card">
          <div className="stat-title">Avg Renewal Rate</div>
          <div className="stat-value">{(revenueData.reduce((acc, curr) => acc + curr.renewal, 0) / revenueData.length).toFixed(1)}%</div>
          <div className="stat-trend trend-up">↑ +2.5% from last month</div>
        </div>
        <div className="glass-panel stat-card">
          <div className="stat-title">Avg Revenue Churn</div>
          <div className="stat-value">{(revenueData.reduce((acc, curr) => acc + curr.churn, 0) / revenueData.length).toFixed(1)}%</div>
          <div className="stat-trend trend-down">↓ -0.4% from last month</div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Revenue Overview</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fontSize: 12}} />
              <YAxis stroke="var(--text-secondary)" tick={{fontSize: 12}} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border)', borderRadius: '8px' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                cursor={{fill: 'var(--bg-panel-hover)'}}
              />
              <Legend />
              <Bar dataKey="revenue" name="Revenue ($)" fill="var(--success)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Renewal & Churn Rate</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={revenueData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fontSize: 12}} />
              <YAxis yAxisId="left" stroke="var(--text-secondary)" tick={{fontSize: 12}} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <YAxis yAxisId="right" orientation="right" stroke="var(--text-secondary)" tick={{fontSize: 12}} domain={[0, 5]} tickFormatter={(v) => `${v}%`} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border)', borderRadius: '8px' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Line yAxisId="left" type="monotone" dataKey="renewal" name="Renewal Rate (%)" stroke="var(--primary)" strokeWidth={3} dot={{ r: 5 }} />
              <Line yAxisId="right" type="monotone" dataKey="churn" name="Churn Rate (%)" stroke="var(--danger)" strokeWidth={3} dot={{ r: 5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
