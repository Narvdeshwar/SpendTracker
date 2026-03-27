import React, { useState } from 'react';
import { X, Send, Coffee, ShoppingBag, Plane, Home as HomeIcon, ShoppingCart, Car, Delete, CreditCard, Coins } from 'lucide-react';
import { Transaction, Category, Account } from '../../types';
import { cn } from '../../utils/cn';

interface AddTransactionProps {
  onBack: () => void;
  onSave: (tx: Transaction) => void;
  accounts: Account[];
  initialCategory?: Category | null;
  editData?: Transaction | null;
}

export const AddTransaction: React.FC<AddTransactionProps> = ({ 
  onBack, onSave, accounts, initialCategory, editData 
}) => {
  const sortedAccounts = React.useMemo(() => 
    [...accounts].sort((a, b) => (a.type === 'cash' ? -1 : (b.type === 'cash' ? 1 : 0))), 
    [accounts]
  );

  // Persistence: Load last used account from localStorage
  const lastUsedAccountId = localStorage.getItem('pnt_last_account');
  const defaultAccountId = editData?.account_id || lastUsedAccountId || sortedAccounts[0]?.id || '';

  const [amount, setAmount] = useState(editData?.amount?.toString() || '0');
  const [category, setCategory] = useState<Category>(editData?.category || initialCategory || 'Dining');
  const [merchant, setMerchant] = useState(editData?.merchant || '');
  const [accountId, setAccountId] = useState(defaultAccountId);
  
  // New: Pay Mode Toggle logic
  const initialType = accounts.find(a => a.id === defaultAccountId)?.type || 'checking';
  const [payMode, setPayMode] = useState<'online' | 'cash'>(initialType === 'cash' ? 'cash' : 'online');

  const filteredAccounts = sortedAccounts.filter(acc => 
    payMode === 'cash' ? acc.type === 'cash' : acc.type !== 'cash'
  );

  const handleSave = () => {
    const totalAmount = parseFloat(amount);
    if (totalAmount === 0 || !accountId) return;

    const tx: Transaction = {
      id: crypto.randomUUID(),
      amount: totalAmount,
      merchant: merchant || 'Unknown Merchant',
      category,
      date: new Date().toISOString().split('T')[0],
      type: 'debit' as const,
      account_id: accountId,
    };

    onSave(tx);
  };

  return (
    <div className="flex-1 flex flex-col bg-bg h-full">
      <header className="px-6 pt-12 pb-4 flex justify-between items-center text-ink ios-divider">
        <button onClick={onBack} className="w-9 h-9 rounded-full glass flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity active:scale-90"><X size={18} /></button>
        <h2 className="text-sm font-bold uppercase tracking-widest">{editData ? 'Update' : 'Entry'}</h2>
        <button onClick={handleSave} className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 active:scale-90 transition-all"><Send size={16} /></button>
      </header>

      <div className="flex-1 flex flex-col px-8 pt-8 space-y-8 overflow-y-auto no-scrollbar pb-32">
        {/* Amount Display */}
        <div className="text-center space-y-2">
          <p className="meta-label opacity-40">Expense Value</p>
          <div className="flex items-center justify-center gap-1">
            <span className="text-3xl font-bold text-ink/30">₹</span>
            <input 
              type="number"
              inputMode="decimal"
              step="0.01"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              autoFocus
              className="text-7xl font-bold data-value bg-transparent border-none text-center focus:outline-none w-full tracking-tighter text-primary placeholder:text-primary/10"
            />
          </div>
        </div>

        {/* New Pay Mode Toggle */}
        <div className="space-y-3">
          <p className="meta-label">Payment Mode</p>
          <div className="flex gap-2 p-1 glass rounded-2xl">
            {(['online', 'cash'] as const).map(mode => (
              <button 
                key={mode}
                onClick={() => {
                  setPayMode(mode);
                  const firstOfMode = sortedAccounts.find(a => mode === 'cash' ? a.type === 'cash' : a.type !== 'cash');
                  if (firstOfMode) setAccountId(firstOfMode.id);
                }}
                className={cn(
                  "flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  payMode === mode ? "bg-purple-600 text-white shadow-lg" : "text-ink/40"
                )}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Merchant Input */}
        <div className="space-y-3">
          <p className="meta-label">Merchant / Description</p>
          <input 
            value={merchant}
            onChange={e => setMerchant(e.target.value)}
            placeholder="Search or type name..."
            className="w-full glass p-5 rounded-2xl text-lg font-bold focus:outline-none focus:ring-2 focus:ring-purple-600/10 transition-all placeholder:opacity-20"
          />
        </div>

        {/* Filtered Account Selection */}
        <div className="space-y-4">
          <p className="meta-label">{payMode === 'online' ? 'Source Bank' : 'Source Wallet'}</p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {filteredAccounts.map(acc => (
              <button 
                key={acc.id}
                onClick={() => setAccountId(acc.id)}
                className={cn(
                  "shrink-0 glass p-4 rounded-2xl flex items-center gap-3 transition-all min-w-[140px] border-2",
                  accountId === acc.id ? "border-purple-600/40 bg-surface" : "opacity-50 border-transparent"
                )}
              >
                {acc.type === 'cash' ? <Coins size={18} className={accountId === acc.id ? "text-purple-600" : ""} /> : <CreditCard size={18} className={accountId === acc.id ? "text-purple-600" : ""} />}
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase text-ink leading-tight">{acc.name}</p>
                  <p className="text-[10px] opacity-40">₹{acc.balance.toLocaleString()}</p>
                </div>
              </button>
            ))}
            {filteredAccounts.length === 0 && (
              <p className="text-[10px] opacity-30 py-4 italic">No {payMode} accounts available.</p>
            )}
          </div>
        </div>

        {/* Classification */}
        <div className="space-y-4">
          <p className="meta-label">Classification</p>
          <div className="grid grid-cols-3 gap-2">
            {([
              { cat: 'Dining', icon: Coffee },
              { cat: 'Retail', icon: ShoppingBag },
              { cat: 'Travel', icon: Plane },
              { cat: 'Home', icon: HomeIcon },
              { cat: 'Groceries', icon: ShoppingCart },
              { cat: 'Transport', icon: Car },
            ] as any[]).map(({ cat, icon: Icon }) => (
              <button 
                key={cat} 
                onClick={() => setCategory(cat)}
                className={cn(
                  "glass py-4 rounded-2xl flex flex-col items-center gap-2 transition-all border",
                  category === cat ? "border-purple-600/40 bg-surface text-purple-600" : "border-transparent opacity-50 text-ink"
                )}
              >
                <Icon size={16} />
                <span className="text-[8px] font-black uppercase tracking-widest">{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>



  );
};
