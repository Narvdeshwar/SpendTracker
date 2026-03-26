import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Coffee, ShoppingBag, Plane, Home as HomeIcon, ShoppingCart, Car, Delete } from 'lucide-react';
import { Transaction, Category } from '../../types';
import { cn } from '../../utils/cn';

interface AddTransactionProps {
  onBack: () => void;
  onSave: (tx: Transaction) => void;
  initialCategory?: Category | null;
}

export const AddTransaction: React.FC<AddTransactionProps> = ({ onBack, onSave, initialCategory }) => {
  const [amount, setAmount] = useState('0');
  const [category, setCategory] = useState<Category>(initialCategory || 'Dining');
  const [merchant, setMerchant] = useState('');
  
  const handleKeypad = (val: string) => {
    if (val === '.' && amount.includes('.')) return;
    if (amount === '0' && val !== '.') setAmount(val);
    else setAmount(amount + val);
  };

  const handleSave = () => {
    if (parseFloat(amount) === 0) return;
    onSave({
      id: Math.random().toString(36).substr(2, 9),
      amount: parseFloat(amount),
      merchant: merchant || 'Unknown Merchant',
      category,
      date: new Date().toISOString().split('T')[0],
      type: 'debit',
      notes: ''
    });
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onBack}
        className="fixed inset-0 bg-black/10 backdrop-blur-xl z-[65]"
      />
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 sm:inset-y-12 sm:mx-auto sm:max-w-md sm:rounded-[3rem] glass z-[70] flex flex-col shadow-2xl overflow-hidden"
      >
        <header className="px-6 pt-12 pb-4 flex justify-between items-center text-ink ios-divider">
          <button onClick={onBack} className="w-9 h-9 rounded-full glass flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity active:scale-90"><X size={18} /></button>
          <h2 className="text-sm font-bold uppercase tracking-widest">Entry</h2>
          <button onClick={handleSave} className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 active:scale-90 transition-all"><Send size={16} /></button>
        </header>

        <div className="flex-1 flex flex-col px-8 pt-8 space-y-8 overflow-y-auto no-scrollbar pb-32">
          <div className="text-center space-y-2">
            <p className="meta-label opacity-40">Expense Value</p>
            <div className="flex items-center justify-center gap-1">
              <span className="text-3xl font-bold text-ink/30">₹</span>
              <p className="text-7xl font-bold data-value tracking-tighter text-primary">{amount}</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="meta-label">Merchant / Description</p>
            <input 
              value={merchant}
              onChange={e => setMerchant(e.target.value)}
              placeholder="Search or type name..."
              className="w-full glass p-5 rounded-2xl text-lg font-bold focus:outline-none focus:ring-2 focus:ring-purple-600/10 transition-all placeholder:opacity-20"
            />
          </div>

          <div className="space-y-4">
            <p className="meta-label">Classification</p>
            <div className="grid grid-cols-4 gap-3">
              {([
                { cat: 'Dining', icon: Coffee },
                { cat: 'Retail', icon: ShoppingBag },
                { cat: 'Travel', icon: Plane },
                { cat: 'Home', icon: HomeIcon },
                { cat: 'Groceries', icon: ShoppingCart },
                { cat: 'Transport', icon: Car },
              ] as { cat: Category, icon: React.ElementType }[]).map(({ cat, icon: Icon }) => (
                <button 
                  key={cat} 
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "glass py-4 rounded-xl flex flex-col items-center gap-2 transition-all border-2",
                    category === cat ? "border-purple-600/40 bg-white text-purple-600" : "border-transparent opacity-50 text-ink"
                  )}
                >
                  <Icon size={18} />
                  <span className="text-[8px] font-black uppercase tracking-widest">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {([1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'DEL'] as (number | string)[]).map((key) => (
              <button 
                key={key}
                onClick={() => {
                  if (key === 'DEL') setAmount(amount.length > 1 ? amount.slice(0, -1) : '0');
                  else handleKeypad(key.toString());
                }}
                className="h-16 glass rounded-2xl text-2xl font-bold data-value flex items-center justify-center active:bg-purple-600 text-ink active:text-white transition-all"
              >
                {key === 'DEL' ? <Delete size={22} /> : key}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};
