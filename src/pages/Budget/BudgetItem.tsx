import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, ShoppingBag, Home as HomeIcon, Car, ShoppingCart, Target, AlertCircle } from 'lucide-react';
import { Budget } from '../../types';

interface BudgetItemProps {
  b: Budget;
}

export const BudgetItem: React.FC<BudgetItemProps> = ({ b }) => {
  const ratio = b.spent / b.limit;
  const barColor = ratio > 0.9 ? '#EF4444' : ratio > 0.7 ? '#F59E0B' : b.color;
  
  const Icon = b.category === 'Dining' ? Coffee :
               b.category === 'Retail' ? ShoppingBag :
               b.category === 'Home' ? HomeIcon :
               b.category === 'Transport' ? Car :
               b.category === 'Groceries' ? ShoppingCart :
               Target;

  return (
    <div className="glass p-6 rounded-3xl space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: b.color + '18', color: b.color }}>
            <Icon size={16} />
          </div>
          <p className="text-sm font-bold text-ink">{b.category}</p>
        </div>
        <p className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">
          <span className="text-ink opacity-100">₹{b.spent}</span> / ₹{b.limit}
        </p>
      </div>
      <div className="h-2.5 w-full bg-black/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, (b.spent / b.limit) * 100)}%` }}
          className="h-full rounded-full transition-colors duration-500"
          style={{ backgroundColor: barColor }}
        />
      </div>
      {ratio > 0.9 && (
        <p className="text-[9px] font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1">
          <AlertCircle size={10} /> Critical Limit Reached
        </p>
      )}
    </div>
  );
};
