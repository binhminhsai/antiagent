import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { funnelDataAll, funnelDataNew } from '../data/mockData';

export const AARRRFunnel: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'New'>('All');
  const data = filter === 'All' ? funnelDataAll : funnelDataNew;

  return (
    <div className="animate-fade-in delay-1">
      <div className="controls-bar">
        <div>
          <h2>AARRR Funnel Analysis</h2>
          <p>Phân tích tỷ lệ chuyển đổi qua các giai đoạn</p>
        </div>
        <div className="btn-group">
          <button 
            className={`btn-toggle ${filter === 'All' ? 'active' : ''}`}
            onClick={() => setFilter('All')}
          >
            All Users
          </button>
          <button 
            className={`btn-toggle ${filter === 'New' ? 'active' : ''}`}
            onClick={() => setFilter('New')}
          >
            New Users
          </button>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Funnel Drop-off</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="step" stroke="var(--text-secondary)" tick={{fontSize: 12}} />
              <YAxis stroke="var(--text-secondary)" tick={{fontSize: 12}} />
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border)', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--text-primary)' }}
              />
              <Area type="monotone" dataKey="value" stroke="var(--primary)" fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-panel table-container">
        <table>
          <thead>
            <tr>
              <th>Giai đoạn (Stage)</th>
              <th>Metric Trigger</th>
              <th>Số lượng</th>
              <th>Tỷ lệ Drop-off</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const dropOff = index === 0 ? '100%' : `${((item.value / data[index - 1].value) * 100).toFixed(1)}%`;
              return (
                <tr key={item.step}>
                  <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.step}</td>
                  <td>{item.label}</td>
                  <td style={{ fontWeight: 700 }}>{item.value.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${index === 0 ? 'primary' : parseFloat(dropOff) < 50 ? 'danger' : 'success'}`}>
                      {dropOff}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
