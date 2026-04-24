import React, { useState } from 'react';
import { 
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart
} from 'recharts';
import { 
  activeUserMixDataAll, activeUserMixDataNew, 
  timeToAhaData, submitSourceData, practiceFeatureData 
} from '../data/mockData';

export const ActiveUser: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'New'>('All');
  const mixData = filter === 'All' ? activeUserMixDataAll : activeUserMixDataNew;

  return (
    <div className="animate-fade-in delay-1">
      <div className="controls-bar">
        <div>
          <h2>Active User Analytics</h2>
          <p>Monitor tình hình Active User (Ưu tiên)</p>
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

      {/* Top Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="glass-panel stat-card">
          <div className="stat-title">Qualified Users</div>
          <div className="stat-value">{mixData[mixData.length - 1].qualified.toLocaleString()}</div>
          <div className="stat-trend trend-up">↑ +{mixData[mixData.length - 1].growth}% from last week</div>
        </div>
        <div className="glass-panel stat-card">
          <div className="stat-title">Active Users</div>
          <div className="stat-value">{mixData[mixData.length - 1].active.toLocaleString()}</div>
          <div className="stat-trend trend-up">↑ +{mixData[mixData.length - 1].growth + 2}% from last week</div>
        </div>
        <div className="glass-panel stat-card">
          <div className="stat-title">Potential Users</div>
          <div className="stat-value">{mixData[mixData.length - 1].potential.toLocaleString()}</div>
          <div className="stat-trend trend-up">↑ +{mixData[mixData.length - 1].growth - 1}% from last week</div>
        </div>
      </div>

      {/* Main Mix Chart */}
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Active User Trends</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={mixData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fontSize: 12}} />
              <YAxis yAxisId="left" stroke="var(--text-secondary)" tick={{fontSize: 12}} />
              <YAxis yAxisId="right" orientation="right" stroke="var(--text-secondary)" tick={{fontSize: 12}} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border)', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--text-primary)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar yAxisId="left" dataKey="qualified" name="Qualified" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="left" dataKey="active" name="Active User" fill="var(--accent-2)" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="left" dataKey="potential" name="Potential User" fill="var(--warning)" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="growth" name="Growth (%)" stroke="var(--accent-3)" strokeWidth={3} dot={{ r: 5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        
        {/* Submit Sources */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Nguồn User Submit</h3>
          <div className="chart-wrapper" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={submitSourceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fontSize: 12}} />
                <YAxis stroke="var(--text-secondary)" tick={{fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border)', borderRadius: '8px' }}
                  cursor={{fill: 'var(--bg-panel-hover)'}}
                />
                <Legend />
                <Bar dataKey="All" stackId="a" fill="var(--primary)" radius={[0, 0, 4, 4]} />
                <Bar dataKey="New" stackId="a" fill="var(--accent-2)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Practice Features */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Nguồn Tính năng Luyện tập</h3>
          <div className="chart-wrapper" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={practiceFeatureData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fontSize: 12}} />
                <YAxis stroke="var(--text-secondary)" tick={{fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border)', borderRadius: '8px' }}
                  cursor={{fill: 'var(--bg-panel-hover)'}}
                />
                <Legend />
                <Bar dataKey="All" stackId="a" fill="var(--accent-1)" radius={[0, 0, 4, 4]} />
                <Bar dataKey="New" stackId="a" fill="var(--success)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};
