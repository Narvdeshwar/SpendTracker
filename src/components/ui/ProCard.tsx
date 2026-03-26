import React from 'react';
import { Crown } from 'lucide-react';

export const ProCard: React.FC = () => (
  <div className="pro-card p-6 rounded-3xl text-white space-y-4 relative">
    <div className="flex justify-between items-start relative z-10">
      <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
        <Crown size={20} className="text-yellow-400" />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest bg-yellow-400 text-ink px-2 py-0.5 rounded-full">Pro</span>
    </div>
    <div className="relative z-10">
      <h3 className="text-lg font-bold">Unlock PennyTrack Pro</h3>
      <p className="text-xs opacity-70 leading-relaxed mt-1">AI insights, multi-currency support, and unlimited exports.</p>
    </div>
    <button className="w-full py-3 bg-white text-ink text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-opacity-90 transition-all relative z-10">
      Upgrade — ₹199/mo
    </button>
  </div>
);
