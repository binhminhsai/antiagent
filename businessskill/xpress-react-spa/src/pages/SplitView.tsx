import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplitView: React.FC = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<string[]>([]);
  const [percent, setPercent] = useState(0);
  const [done, setDone] = useState(false);

  const aiLogs = [
    "[INFO] Reading current theme structure...",
    "[INFO] Parsing Header.php and Footer.php...",
    "[INFO] Extracting CSS Variables and Typography...",
    "[BUILD] Generating React Components...",
    "[BUILD] Routing configured successfully",
    "[API] Mapping REST endpoints for Products...",
    "[SUCCESS] Compilation complete. Ready for Preview."
  ];

  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < aiLogs.length) {
        setLogs((prev) => [...prev, aiLogs[currentLog]]);
        setPercent(Math.floor(((currentLog + 1) / aiLogs.length) * 100));
        currentLog++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* AI Progress Panel (Left) */}
      <section className="w-1/3 flex flex-col bg-stone-900 border-r border-outline-variant/30 text-stone-300 font-mono text-xs overflow-hidden">
        <div className="px-4 py-3 bg-stone-800 border-b border-stone-700 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${done ? 'bg-emerald-500' : 'bg-amber-400 animate-pulse'}`}></span>
            <span className="text-stone-400 uppercase tracking-widest text-[10px] font-bold">
              {done ? "Generation Complete" : "AI Agent Working"}
            </span>
          </div>
          <span className="text-stone-400 font-bold">{percent}%</span>
        </div>
        
        <div className="h-1 bg-stone-800">
          <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${percent}%` }}></div>
        </div>

        <div className="flex-1 overflow-y-auto terminal-scroll p-4 space-y-3">
          {logs.map((log, idx) => (
            <div key={idx} className="flex gap-3">
              <span className="text-stone-600">[{new Date().toLocaleTimeString('en-US', {hour12: false})}]</span>
              <span className={log.includes('[SUCCESS]') ? 'text-emerald-400 font-bold' : log.includes('[BUILD]') ? 'text-blue-400' : 'text-stone-400'}>
                {log.substring(0, log.indexOf(']') + 1)}
              </span>
              <span>{log.substring(log.indexOf(']') + 1)}</span>
            </div>
          ))}
          {!done && (
            <div className="pt-2 flex gap-2">
              <span className="text-emerald-500 animate-bounce">↓</span>
              <span className="text-stone-500 italic">Thinking...</span>
            </div>
          )}
        </div>
      </section>

      {/* Preview Panel (Right) */}
      <section className="w-2/3 bg-surface-container flex flex-col overflow-hidden relative">
        <div className="px-6 py-3 bg-white border-b border-outline-variant/30 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
            </div>
            <div className="px-4 py-1 bg-surface-container-low rounded-full text-[11px] font-label text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-xs">lock</span>
              https://preview.xpress.ai/terra-organic
            </div>
          </div>
          <div className="flex items-center gap-2">
            {done && (
              <button 
                onClick={() => navigate('/app/editor/visual')}
                className="flex items-center gap-2 bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:shadow-md transition-all animate-fade-in"
              >
                <span className="material-symbols-outlined text-sm">edit_square</span> Enter Visual Edit
              </button>
            )}
            <button className="p-1.5 hover:bg-surface-container-high rounded transition-all">
              <span className="material-symbols-outlined text-on-surface-variant text-lg">open_in_new</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-12 bg-surface flex justify-center items-start">
          <div className="bg-white shadow-2xl rounded-xl w-full max-w-4xl min-h-[800px] border border-outline-variant/30 overflow-hidden relative transition-all duration-700">
            {!done ? (
              // Skeleton Loader
              <div className="p-12 space-y-12 animate-pulse">
                <div className="flex justify-between items-center mb-8 border-b border-outline-variant/20 pb-4">
                  <div className="h-8 w-32 bg-surface-container-highest rounded-lg"></div>
                  <div className="flex gap-6">
                    <div className="h-3 w-16 bg-surface-container-highest rounded-full"></div>
                    <div className="h-3 w-16 bg-surface-container-highest rounded-full"></div>
                    <div className="h-3 w-16 bg-surface-container-highest rounded-full"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div className="h-12 w-3/4 bg-surface-container-highest rounded-lg"></div>
                    <div className="space-y-4">
                      <div className="h-4 w-full bg-surface-container-high rounded-full"></div>
                      <div className="h-4 w-full bg-surface-container-high rounded-full"></div>
                      <div className="h-4 w-2/3 bg-surface-container-high rounded-full"></div>
                    </div>
                  </div>
                  <div className="h-64 bg-surface-container-high rounded-xl"></div>
                </div>
              </div>
            ) : (
              // Live Rendered UI
              <div className="p-12 space-y-12 animate-fade-in relative group cursor-default">
                <div className="flex justify-between items-center group relative cursor-default border-b border-outline-variant/20 pb-4">
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
                          <span className="material-symbols-outlined">eco</span>
                      </div>
                      <h1 className="font-headline text-2xl font-bold text-primary">Terra Organic</h1>
                  </div>
                  <nav className="flex gap-8 text-sm font-label text-stone-600">
                      <a href="#">Shop</a>
                      <a href="#">Our Story</a>
                      <a href="#">Farms</a>
                      <a href="#">Contact</a>
                  </nav>
                </div>

                <div className="grid grid-cols-2 gap-12 items-center relative">
                    <div className="space-y-6">
                        <span className="text-tertiary font-label font-bold tracking-widest uppercase text-xs">Est. 2024</span>
                        <h2 className="font-headline text-5xl text-on-surface leading-tight">Rooted in <span className="italic text-primary font-normal">Warmth</span> & Quality</h2>
                        <p className="text-stone-600 leading-relaxed text-lg">Experience the finest organic selections directly from our local forest partners.</p>
                        <div className="flex gap-4">
                            <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-xl shadow-primary/20">Browse Shop</button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-full overflow-hidden bg-stone-200 border-8 border-white shadow-2xl rotate-3">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmh53sNF2U0WgRgW6ByXwl6vqmgPwJQtnUPuvM4asATSuOKq62ccWW9Rw6RvpmJ2qFI9DG0dzmjcjRdfswxTWjSc894OLZEO04fxOeHOQ_Hu4LyVOA3JFxR-WZKQ9TAbqD90eR4x4ac8BEt22CEzwZvHSgvlnV6CEXpVAeEmTIKJg4eqOV-ioOMQqFxhRfxytWvmLgKbqla3SvTv6OPLEN0FuuYvG1HIsoSUzT8hsW5X3TcokTALf67CVXOvBV7upCbZyTsamQKN4" alt="Fresh produce" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SplitView;
