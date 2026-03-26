import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import { Account } from '../../types';
import { cn } from '../../utils/cn';

interface AccountCardProps {
  acc: Account;
}

export const AccountCard: React.FC<AccountCardProps> = ({ acc }) => (
  <div className="glass p-6 rounded-3xl space-y-6 group hover:border-purple-600/20 transition-all">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center text-ink/40 group-hover:bg-purple-600/10 group-hover:text-purple-600 transition-colors">
          <CreditCard size={28} />
        </div>
        <div>
          <p className="text-lg font-bold text-ink">{acc.name}</p>
          <p className="text-[10px] text-ink/40 font-bold uppercase tracking-widest">{acc.institution} • {acc.type}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold data-value text-ink">₹{acc.balance.toLocaleString()}</p>
        {acc.initialBalance && acc.initialBalance !== 0 ? (
          <p className={cn(
            "text-[10px] font-bold uppercase tracking-widest",
            acc.balance > acc.initialBalance ? "text-emerald-500" : "text-rose-500"
          )}>
            {acc.balance > acc.initialBalance ? '+' : ''}{((acc.balance - acc.initialBalance) / acc.initialBalance * 100).toFixed(1)}% Yield
          </p>
        ) : (
          <p className="text-[10px] font-bold uppercase tracking-widest text-ink/20 italic">No Yield Data</p>
        )}
      </div>
    </div>
    <div className="h-1 w-full bg-black/5 rounded-full relative overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        className="h-full bg-purple-600/20"
      />
    </div>
  </div>
);
