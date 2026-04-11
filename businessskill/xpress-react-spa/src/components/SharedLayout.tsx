import { NavLink, Outlet } from 'react-router-dom';

const SharedLayout = () => {
  return (
    <div className="flex bg-surface text-on-surface font-body antialiased overflow-hidden min-h-screen">
      {/* Top Navbar */}
      <header className="fixed top-0 w-full flex justify-between items-center px-6 py-3 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 z-50 shadow-sm transition-all h-16">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold text-primary font-headline italic">X-press AI</span>
          <nav className="hidden lg:flex items-center gap-6">
            <a href="#" className="text-stone-600 hover:text-primary transition-colors text-sm font-label">Projects</a>
            <a href="#" className="text-stone-600 hover:text-primary transition-colors text-sm font-label">Cloud</a>
            <a href="#" className="text-stone-600 hover:text-primary transition-colors text-sm font-label">Analytics</a>
            <a href="#" className="text-stone-600 hover:text-primary transition-colors text-sm font-label">Support</a>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-800 transition-all shadow-sm active:scale-95">
            <span className="material-symbols-outlined text-sm">rocket_launch</span> Deploy
          </button>
          <div className="h-6 w-px bg-outline-variant/30 mx-2"></div>
          <button className="p-2 hover:bg-surface-container-high rounded-lg transition-all">
            <span className="material-symbols-outlined text-stone-600">notifications</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-primary overflow-hidden border border-outline-variant/50 cursor-pointer">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNquCMiRaqjW9ZQps-IM_DXabuGUWa5xfomwd9zlIJn7NyMhcGfdKCYFCtJWfNM1zH94ZA4ylfu9E-NpBJ6cnjgIkQeyNlppuzfxcoKXDCLkNr55QMG2hN8o0i3stD84tWxv6CPjOhxCNCTCpPsHyu72rwl4y45POvfYHIrx9kfwbLravt0JpmIMr-Ky4PNBEde_d--vaoYEWCtz1ZmUP_56qT9wRvWbKM2YYGPa91v99RPbXvS8dHLGGD4jlB2yNgdM7SXTCISW8" className="w-full h-full object-cover" alt="User profile" />
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full flex flex-col pt-16 pb-6 bg-surface-container-low w-64 border-r border-outline-variant/30 z-40">
        <div className="px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-on-primary-container">
            <span className="material-symbols-outlined">rocket_launch</span>
          </div>
          <div>
            <h3 className="font-headline font-bold text-sm leading-tight">Project X</h3>
            <p className="text-[11px] text-stone-500 font-label">v1.0.4-stable</p>
          </div>
        </div>
        
        <nav className="flex-1 mt-4 px-3 space-y-1">
          <NavLink 
            to="/app/onboarding" 
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${isActive ? 'bg-primary-container/30 text-primary font-bold border-r-4 border-primary hover:pl-2' : 'text-stone-500 hover:bg-surface-container hover:text-on-surface hover:pl-2'}`
            }>
            <span className="material-symbols-outlined">power</span>
            <span className="text-[13px] font-medium">Onboarding</span>
          </NavLink>
          
          <NavLink 
            to="/app/projects" 
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${isActive ? 'bg-primary-container/30 text-primary font-bold border-r-4 border-primary hover:pl-2' : 'text-stone-500 hover:bg-surface-container hover:text-on-surface hover:pl-2'}`
            }>
            <span className="material-symbols-outlined">auto_awesome</span>
            <span className="text-[13px] font-medium">AI Editor (Chat)</span>
          </NavLink>

          <NavLink 
            to="/app/editor/split-view" 
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${isActive ? 'bg-primary-container/30 text-primary font-bold border-r-4 border-primary hover:pl-2' : 'text-stone-500 hover:bg-surface-container hover:text-on-surface hover:pl-2'}`
            }>
            <span className="material-symbols-outlined">splitscreen</span>
            <span className="text-[13px] font-medium">AI Editor (Split)</span>
          </NavLink>
          
          <NavLink 
            to="/app/editor/visual" 
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${isActive ? 'bg-primary-container/30 text-primary font-bold border-r-4 border-primary hover:pl-2' : 'text-stone-500 hover:bg-surface-container hover:text-on-surface hover:pl-2'}`
            }>
            <span className="material-symbols-outlined">layers</span>
            <span className="text-[13px] font-medium">Visual Edit</span>
          </NavLink>
          
          <NavLink 
            to="/app/deploy" 
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${isActive ? 'bg-primary-container/30 text-primary font-bold border-r-4 border-primary hover:pl-2' : 'text-stone-500 hover:bg-surface-container hover:text-on-surface hover:pl-2'}`
            }>
            <span className="material-symbols-outlined">cloud_upload</span>
            <span className="text-[13px] font-medium">Deploy / Metric</span>
          </NavLink>
        </nav>
        
        <div className="px-3 mt-auto space-y-1">
          <button className="w-full bg-primary text-white py-2 rounded-xl text-sm font-label mb-4 hover:shadow-lg transition-shadow">
            New Project
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="pl-64 pt-16 flex-1 flex flex-col h-screen overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default SharedLayout;
