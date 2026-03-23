import { ShieldCheck } from 'lucide-react';

export default function SafeToSpendCard() {
  return (
    <div className="glass p-8 rounded-2xl flex items-center justify-between card-hover">
      <div>
        <h3 className="text-xl font-semibold mb-1">Safe to Spend</h3>
        <p className="text-white/50 text-sm meta-label mb-4">Remaining for Oct</p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-accent data-value">$2,800</span>
          <span className="text-sm text-accent opacity-50 data-value">.00</span>
        </div>
      </div>
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <circle 
            className="text-white/5 stroke-current" 
            cx="18" cy="18" fill="none" r="16" strokeWidth="2.5" 
          />
          <circle 
            className="text-accent stroke-current" 
            cx="18" cy="18" fill="none" r="16" strokeWidth="2.5" 
            strokeDasharray="100" 
            strokeDashoffset="28" 
            strokeLinecap="round" 
            style={{ filter: 'drop-shadow(0 0 4px rgba(16, 185, 129, 0.4))' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-2 bg-accent/10 rounded-full">
            <ShieldCheck className="text-accent" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
