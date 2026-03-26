import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, User, FileDown, ChevronRight, SlidersHorizontal, Zap, LogOut, FileUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface UserManagementProps {
  onBack: () => void;
  onExport: () => void;
  onImport: (txs: any[]) => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({ onBack, onExport, onImport }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n');
      const txs = [];

      // Skip header assuming format: amount,category,merchant,date,type,notes
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const [amount, category, merchant, date, type, notes] = line.split(',');
        txs.push({
          amount: parseFloat(amount),
          category: (category || 'Other') as any,
          merchant: merchant || 'Imported Transaction',
          date: date || new Date().toISOString().split('T')[0],
          type: (type || 'debit') as any,
          notes: notes || ''
        });
      }

      if (txs.length > 0) {
        onImport(txs);
        alert(`Successfully imported ${txs.length} transactions!`);
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept=".csv" 
        onChange={handleFileChange} 
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/5 backdrop-blur-md z-95" 
        onClick={onBack} 
      />
      <motion.div 
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        className="fixed inset-0 sm:inset-y-0 sm:left-0 sm:right-auto sm:w-[400px] glass z-100 flex flex-col shadow-2xl overflow-hidden"
      >
        <header className="px-6 pt-12 pb-4 flex justify-between items-center text-ink ios-divider">
          <button onClick={onBack} className="w-9 h-9 rounded-full glass flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity active:scale-90"><ChevronLeft size={18} /></button>
          <h2 className="text-sm font-black uppercase tracking-widest">Settings</h2>
          <div className="w-9" />
        </header>

        <div className="px-8 pt-12 space-y-10 flex-1 overflow-y-auto no-scrollbar">
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-4xl bg-purple-600/10 flex items-center justify-center border-2 border-purple-600/20 shadow-xl shadow-purple-600/5">
              <User size={48} className="text-purple-600" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-black text-ink">Asher Atelier</h3>
              <p className="text-[10px] font-bold text-purple-600 uppercase tracking-[0.2em] mt-1">Founding Member</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="meta-label">Core Functions</p>
            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={onExport}
                className="w-full glass p-6 rounded-4xl flex items-center justify-between hover:bg-white transition-all group border-transparent hover:border-purple-600/20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600/5 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all">
                    <FileDown size={22} />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-bold text-ink block">Export Warehouse</span>
                    <span className="text-[10px] opacity-40 uppercase tracking-widest font-bold">CSV / JSON Engine</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-ink/20 group-hover:text-purple-600 transition-colors" />
              </button>

              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full glass p-6 rounded-4xl flex items-center justify-between hover:bg-white transition-all group border-transparent hover:border-purple-600/20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600/5 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <FileUp size={22} />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-bold text-ink block">Bulk Excel Import</span>
                    <span className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Fast Data Entry</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-ink/20 group-hover:text-purple-600 transition-colors" />
              </button>
              
              <button className="w-full glass p-6 rounded-4xl flex items-center justify-between hover:bg-white transition-all group border-transparent hover:border-purple-600/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-black/5 text-ink/40 flex items-center justify-center group-hover:bg-purple-600/10 group-hover:text-purple-600 transition-all">
                    <SlidersHorizontal size={22} />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-bold text-ink block">Preferences</span>
                    <span className="text-[10px] opacity-40 uppercase tracking-widest font-bold">System Config</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-ink/20 group-hover:text-purple-600 transition-colors" />
              </button>
            </div>
          </div>

          <div className="p-6 bg-linear-to-br from-purple-600 to-indigo-700 rounded-4xl text-white space-y-4 relative overflow-hidden shadow-2xl shadow-purple-600/30">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                <Zap size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">PennyTrack Pro</span>
            </div>
            <div>
              <p className="text-lg font-bold">Priority Support</p>
              <p className="text-[10px] opacity-60 leading-relaxed font-medium">As a Pro member, your queries are answered within 60 minutes.</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <button className="w-full py-6 glass text-rose-500 rounded-4xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-rose-50 transition-all border-transparent hover:border-rose-100 text-xs" onClick={() => supabase.auth.signOut()}>
            <LogOut size={20} />
            Safe Logout
          </button>
        </div>
      </motion.div>
    </>
  );
};
