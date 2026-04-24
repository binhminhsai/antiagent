import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  rollingRetentionData, d7RetentionData, d30RetentionData 
} from '../data/mockData';

export const Retention: React.FC = () => {
  return (
    <div className="animate-fade-in delay-2">
      <div className="controls-bar">
        <div>
          <h2>Retention Analytics</h2>
          <p>Tỷ lệ giữ chân người dùng (D7, D30)</p>
        </div>
      </div>

      {/* Rolling Retention Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {rollingRetentionData.map((item, index) => (
          <div key={index} className="glass-panel stat-card">
            <div className="stat-title">{item.label}</div>
            <div className="stat-value">{item.count.toLocaleString()}</div>
            <div className="stat-trend trend-up">↑ {item.trend} so với kỳ trước</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>
        
        {/* D7 Line Chart */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Tỷ lệ Active D7</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={d7RetentionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fontSize: 12}} />
                <YAxis stroke="var(--text-secondary)" tick={{fontSize: 12}} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border)', borderRadius: '8px' }}
                  formatter={(value: number) => [`${value}%`, undefined]}
                />
                <Legend />
                <Line type="monotone" dataKey="All" name="All Users" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="New" name="New Users" stroke="var(--accent-2)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="table-container" style={{ marginTop: '1.5rem' }}>
            <table>
              <thead>
                <tr>
                  <th>Thời gian</th>
                  <th>All (Tỷ lệ D7)</th>
                  <th>New (Tỷ lệ D7)</th>
                </tr>
              </thead>
              <tbody>
                {d7RetentionData.map((item) => (
                  <tr key={item.name}>
                    <td style={{ fontWeight: 500 }}>{item.name}</td>
                    <td>{item.All}%</td>
                    <td style={{ color: 'var(--accent-2)', fontWeight: 600 }}>{item.New}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* D30 Line Chart */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Tỷ lệ Active D30</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={d30RetentionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fontSize: 12}} />
                <YAxis stroke="var(--text-secondary)" tick={{fontSize: 12}} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border)', borderRadius: '8px' }}
                  formatter={(value: number) => [`${value}%`, undefined]}
                />
                <Legend />
                <Line type="monotone" dataKey="All" name="All Users" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="New" name="New Users" stroke="var(--accent-2)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="table-container" style={{ marginTop: '1.5rem' }}>
            <table>
              <thead>
                <tr>
                  <th>Thời gian</th>
                  <th>All (Tỷ lệ D30)</th>
                  <th>New (Tỷ lệ D30)</th>
                </tr>
              </thead>
              <tbody>
                {d30RetentionData.map((item) => (
                  <tr key={item.name}>
                    <td style={{ fontWeight: 500 }}>{item.name}</td>
                    <td>{item.All}%</td>
                    <td style={{ color: 'var(--accent-2)', fontWeight: 600 }}>{item.New}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
