import { motion } from 'framer-motion';

export default function DocumentViewer() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-4xl h-full bg-slate-panel border-raw p-8 flex flex-col relative shadow-[0_0_40px_rgba(0,0,0,0.5)]"
    >
      <div className="absolute top-0 left-0 right-0 h-10 border-b border-raw flex items-center px-6 bg-slate-base/80 backdrop-blur-sm">
        <div className="flex gap-2 items-center">
            <div className="w-2 h-2 bg-acid-green opacity-80"></div>
            <div className="text-[10px] text-muted-text font-mono tracking-[0.2em]">CASSO_X-SIGN // VIEWER_A01</div>
        </div>
      </div>
      
      <div className="mt-12 flex-1 border border-dashed border-slate-border/50 flex items-center justify-center">
        <p className="text-muted-text font-mono text-xs uppercase tracking-widest opacity-50">Awaiting Document Matrix</p>
      </div>
    </motion.div>
  );
}
