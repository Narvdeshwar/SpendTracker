import React from 'react';
import { ArrowDownLeft, ArrowUpRight, Pencil, Trash2 } from 'lucide-react';
import { Transaction } from '../../types';
import { cn } from '../../utils/cn';

interface TransactionItemProps {
  tx: Transaction;
  onEdit?: (tx: Transaction) => void;
  onDelete?: (id: string) => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ tx, onEdit, onDelete }) => (
  <div className="bg-surface/80 border border-black/5 p-5 rounded-3xl flex items-center justify-between active:bg-purple-600/5 transition-all group">
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
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-end">
        <p className={cn(
          "text-lg font-bold data-value",
          tx.type === 'credit' ? "text-emerald-600" : "text-ink"
        )}>
          {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toFixed(2)}
        </p>
      </div>
      
      {/* Quick Actions (visible on hover or focus) */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => onEdit?.(tx)}
          className="p-2 rounded-xl bg-purple-600/5 text-purple-600 hover:bg-purple-600 hover:text-white transition-all"
        >
          <Pencil size={14} />
        </button>
        <button 
          onClick={() => {
            if (confirm('Delete this transaction?')) onDelete?.(tx.id);
          }}
          className="p-2 rounded-xl bg-rose-500/5 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  </div>
);

