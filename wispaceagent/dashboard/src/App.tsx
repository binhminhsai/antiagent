import React, { useState } from 'react';
import { AARRRFunnel } from './views/AARRRFunnel';
import { ActiveUser } from './views/ActiveUser';
import { Retention } from './views/Retention';
import { Revenue } from './views/Revenue';
import { LayoutDashboard, Users, Activity, CreditCard } from 'lucide-react';
import './index.css';

type ViewType = 'funnel' | 'active' | 'retention' | 'revenue';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('active');

  const renderView = () => {
    switch (currentView) {
      case 'funnel': return <AARRRFunnel />;
      case 'active': return <ActiveUser />;
      case 'retention': return <Retention />;
      case 'revenue': return <Revenue />;
      default: return <ActiveUser />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div style={{ marginBottom: '2rem', padding: '0.5rem 1rem' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem', background: 'linear-gradient(90deg, var(--primary), var(--accent-1))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            WISPACE
          </h1>
          <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>Analytics Dashboard</p>
        </div>

        <nav>
          <a 
            className={`nav-item ${currentView === 'funnel' ? 'active' : ''}`}
            onClick={() => setCurrentView('funnel')}
          >
            <LayoutDashboard size={20} />
            AARRR Funnel
          </a>
          <a 
            className={`nav-item ${currentView === 'active' ? 'active' : ''}`}
            onClick={() => setCurrentView('active')}
          >
            <Users size={20} />
            Active Users
          </a>
          <a 
            className={`nav-item ${currentView === 'retention' ? 'active' : ''}`}
            onClick={() => setCurrentView('retention')}
          >
            <Activity size={20} />
            Retention
          </a>
          <a 
            className={`nav-item ${currentView === 'revenue' ? 'active' : ''}`}
            onClick={() => setCurrentView('revenue')}
          >
            <CreditCard size={20} />
            Revenue
          </a>
        </nav>
        
        <div style={{ marginTop: 'auto', padding: '1rem', background: 'var(--bg-panel)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Data is currently simulated for preview purposes.
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Admin User</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--primary)' }}>
              A
            </div>
          </div>
        </header>
        
        {renderView()}
      </main>
    </div>
  );
}

export default App;
