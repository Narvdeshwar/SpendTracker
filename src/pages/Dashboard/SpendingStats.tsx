import React from 'react';
import { Target, Activity, Wallet, BarChart2, ArrowUpRight } from 'lucide-react';

interface SpendingStatsProps {
  monthSpending: number;
  budgetTotal: number;
  budgetRemaining: number;
  dailyAverage: number;
  transactionCount: number;
}

export const SpendingStats: React.FC<SpendingStatsProps> = ({
  monthSpending,
  budgetTotal,
  budgetRemaining,
  dailyAverage,
  transactionCount
}) => (
  <section className="px-6 grid grid-cols-2 gap-4">
    <div className="col-span-2 glass p-6 rounded-3xl space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="meta-label flex items-center gap-1"><Target size={10} className="opacity-50" /> Monthly Spending</p>
          <p className="text-3xl font-bold data-value text-ink">₹{monthSpending.toLocaleString()}</p>
        </div>
        <div className="bg-purple-600/10 text-purple-600 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
          <Activity size={10} />
          {Math.round((monthSpending / budgetTotal) * 100)}% Used
        </div>
      </div>
      <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
        <div className="h-full bg-purple-600 rounded-full" style={{ width: `${(monthSpending / budgetTotal) * 100}%` }} />
      </div>
      <div className="flex justify-between text-[10px] font-bold text-ink/40 uppercase tracking-widest">
        <span className="flex items-center gap-1"><Wallet size={10} /> Left to Spend</span>
        <span className="text-ink/80 data-value">₹{budgetRemaining.toLocaleString()}</span>
      </div>
    </div>

    <div className="glass p-5 rounded-3xl space-y-1">
      <p className="meta-label flex items-center gap-1"><BarChart2 size={10} className="opacity-50" /> Daily Avg</p>
      <p className="text-xl font-bold data-value text-purple-600">₹{dailyAverage.toFixed(2)}</p>
    </div>
    <div className="glass p-5 rounded-3xl space-y-1">
      <p className="meta-label flex items-center gap-1"><ArrowUpRight size={10} className="opacity-50" /> Transactions</p>
      <p className="text-xl font-bold data-value text-ink/80">{transactionCount}</p>
    </div>
  </section>
);
