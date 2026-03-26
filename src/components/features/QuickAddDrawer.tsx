import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenLine, X, Plus } from 'lucide-react';
import { Category } from '../../types';

interface QuickAddDrawerProps {
  categories: Category[];
  onAdd: (cat: Category) => void;
}

export const QuickAddDrawer: React.FC<QuickAddDrawerProps> = ({ categories, onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Simulation: Auto-open every 90s only if we have active accounts
    const interval = setInterval(() => {
      setIsOpen(true);
    }, 90000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 floating-drawer-tab z-[40] flex flex-col items-center gap-1"
        title="Track Spend"
      >
        <PenLine size={16} />
        <span className="text-[7px] font-black uppercase tracking-widest leading-none">Log</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-80 glass z-[90] flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.2)]"
            >
              <div className="p-8 space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="meta-label">Quick Entry</h3>
                  <button onClick={() => setIsOpen(false)}><X size={20} /></button>
                </div>
                
                <p className="text-xl font-bold text-ink leading-tight">Log a recent purchase in seconds.</p>
                
                <div className="space-y-4">
                  <p className="meta-label opacity-40">Select Category</p>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => {
                          onAdd(cat);
                          setIsOpen(false);
                        }}
                        className="glass p-5 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all flex items-center justify-between group"
                      >
                        {cat}
                        <Plus size={14} className="opacity-0 group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <div className="p-6 bg-purple-600/5 rounded-3xl border border-purple-600/10 space-y-3">
                    <p className="text-xs font-medium text-ink/70 italic">"Tracking your spend daily reduces impulsive purchases by 22%."</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-purple-600">— Smart Insight</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
