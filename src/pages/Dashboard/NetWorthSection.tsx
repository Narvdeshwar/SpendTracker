import React from 'react';
import { TrendingUp } from 'lucide-react';

interface NetWorthSectionProps {
  netWorth: number;
}

export const NetWorthSection: React.FC<NetWorthSectionProps> = ({ netWorth }) => (
  <section className="px-6">
    <div className="text-center py-4">
      <p className="text-5xl font-bold data-value text-primary tracking-tighter">
        ₹{netWorth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
      <div className="mt-2 flex items-center justify-center gap-2">
        <span className="text-[10px] font-bold uppercase text-emerald-500 flex items-center gap-1">
          <TrendingUp size={12} /> +2.4% this week
        </span>
      </div>
    </div>
  </section>
);
