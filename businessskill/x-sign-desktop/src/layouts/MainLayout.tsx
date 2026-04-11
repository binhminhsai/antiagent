import { Outlet } from 'react-router-dom';
import DocumentViewer from '../components/DocumentViewer';

export default function MainLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-base font-sans selection:bg-acid-green selection:text-slate-base">
      {/* 80% Document Viewport - Asymmetric Layout */}
      <div className="w-[80%] h-full flex flex-col items-center justify-center p-8 border-r border-raw">
        <DocumentViewer />
      </div>

      {/* 20% Dense Control Panel */}
      <div className="w-[20%] h-full bg-slate-panel flex flex-col relative border-l border-raw shadow-2xl z-10">
        {/* Top edge glowing accent pattern */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-acid-green to-transparent opacity-50"></div>
        
        <div className="flex-1 overflow-y-auto p-8 relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
