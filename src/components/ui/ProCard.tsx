import React from 'react';
import { Crown } from 'lucide-react';

export const ProCard: React.FC = () => (
  <div className="pro-card p-6 rounded-3xl text-white space-y-4 relative">
    <div className="flex justify-between items-start relative z-10">
      <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
        <Crown size={20} className="text-yellow-400" />
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest bg-yellow-400 text-slate-950 px-2.5 py-1 rounded-full">Pro</span>
    </div>
    <div className="relative z-10">
      <h3 className="text-lg font-bold">Unlock PennyTrack Pro</h3>
      <p className="text-xs opacity-70 leading-relaxed mt-1">AI insights, multi-currency support, and unlimited exports.</p>
    </div>
    <button className="w-full py-4 bg-white text-slate-950 text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white/90 active:scale-95 transition-all relative z-10 shadow-xl shadow-black/20">
      Upgrade — ₹199/mo
    </button>
  </div>
);
