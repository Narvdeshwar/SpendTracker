import React from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Transaction } from '../../types';
import { cn } from '../../utils/cn';

interface TransactionItemProps {
  tx: Transaction;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ tx }) => (
  <div className="glass p-5 rounded-3xl flex items-center justify-between hover:scale-[1.01] transition-all">
    <div className="flex items-center gap-4">
      <div className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
        tx.type === 'credit' ? "bg-emerald-500/10 text-emerald-500" : "bg-purple-600/5 text-purple-600"
      )}>
        {tx.type === 'credit' ? <ArrowDownLeft size={22} /> : <ArrowUpRight size={22} />}
      </div>
      <div>
        <p className="text-sm font-bold text-ink">{tx.merchant}</p>
        <p className="text-[10px] text-ink/40 font-bold uppercase tracking-wider">{tx.category} • {tx.notes}</p>
      </div>
    </div>
    <p className={cn(
      "text-lg font-bold data-value",
      tx.type === 'credit' ? "text-emerald-600" : "text-ink"
    )}>
      {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toFixed(2)}
    </p>
  </div>
);
