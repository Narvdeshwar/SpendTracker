import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Banknote, Landmark, BarChart2, Bitcoin, Link2, Coins } from 'lucide-react';
import { Account } from '../../types';
import { cn } from '../../utils/cn';

interface AddAccountProps {
  onBack: () => void;
  onSave: (account: Account) => void;
}

export const AddAccount: React.FC<AddAccountProps> = ({ onBack, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    balance: '',
    type: 'checking' as Account['type']
  });

  const handleSave = () => {
    if (!formData.name || !formData.balance) return;
    onSave({
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      institution: formData.institution || formData.name,
      balance: parseFloat(formData.balance),
      initialBalance: parseFloat(formData.balance),
      type: formData.type,
    });
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onBack}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-55"
      />
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        className="fixed inset-0 sm:inset-y-0 sm:right-0 sm:left-auto sm:w-[400px] glass z-60 flex flex-col shadow-2xl overflow-hidden"
      >
        <header className="px-6 pt-12 pb-4 flex justify-between items-center text-ink ios-divider">
          <button onClick={onBack} className="w-9 h-9 rounded-full glass flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity active:scale-90"><ChevronLeft size={18} /></button>
          <h2 className="text-sm font-bold uppercase tracking-widest">Connect Wealth</h2>
          <div className="w-9" />
        </header>

        <div className="flex-1 px-8 pt-12 space-y-10 overflow-y-auto no-scrollbar">
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="meta-label">Identity</p>
              <input 
                autoFocus
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Chase Priority"
                className="w-full glass p-6 rounded-3xl text-xl font-bold focus:outline-none focus:ring-4 focus:ring-purple-600/5 transition-all placeholder:opacity-20"
              />
            </div>

            <div className="space-y-3">
              <p className="meta-label">Current Balance</p>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-bold opacity-30">₹</span>
                <input 
                  type="number"
                  value={formData.balance}
                  onChange={e => setFormData({...formData, balance: e.target.value})}
                  placeholder="0,000.00"
                  className="w-full glass p-6 pl-12 rounded-3xl text-4xl font-bold data-value focus:outline-none focus:ring-4 focus:ring-purple-600/5 transition-all placeholder:opacity-20"
                />
              </div>
            </div>

            <div className="space-y-3">
              <p className="meta-label">Allocation Class</p>
              <div className="grid grid-cols-2 gap-4">
                {([
                  { type: 'checking', icon: Banknote, label: 'Checking' },
                  { type: 'savings', icon: Landmark, label: 'Savings' },
                  { type: 'investment', icon: BarChart2, label: 'Investment' },
                  { type: 'crypto', icon: Bitcoin, label: 'Crypto' },
                  { type: 'cash', icon: Coins, label: 'Cash' },
                ] as const).map(({ type, icon: Icon, label }) => (
                  <button
                    key={type}
                    onClick={() => setFormData({...formData, type})}
                    className={cn(
                      "p-5 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all",
                      formData.type === type ? "bg-purple-600 text-white border-purple-600 shadow-xl shadow-purple-600/20" : "glass border-transparent opacity-40"
                    )}
                  >
                    <Icon size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>


          <button 
            onClick={handleSave}
            disabled={!formData.name || !formData.balance}
            className="w-full py-5 bg-purple-600 text-white rounded-4xl font-bold uppercase tracking-widest shadow-xl shadow-purple-600/30 disabled:opacity-30 disabled:shadow-none active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <Link2 size={20} />
            Confirm Attachment
          </button>
        </div>
      </motion.div>
    </>
  );
};
