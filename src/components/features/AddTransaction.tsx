import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Coffee, ShoppingBag, Plane, Home as HomeIcon, ShoppingCart, Car, Delete, CreditCard, Users } from 'lucide-react';
import { Transaction, Category, Account, Friend } from '../../types';
import { cn } from '../../utils/cn';

interface AddTransactionProps {
  onBack: () => void;
  onSave: (tx: Transaction) => void;
  accounts: Account[];
  friends: Friend[];
  onAddFriend: (name: string) => void;
  initialCategory?: Category | null;
}

export const AddTransaction: React.FC<AddTransactionProps> = ({ 
  onBack, onSave, accounts, friends, onAddFriend, initialCategory 
}) => {
  const [amount, setAmount] = useState('0');
  const [category, setCategory] = useState<Category>(initialCategory || 'Dining');
  const [merchant, setMerchant] = useState('');
  const [accountId, setAccountId] = useState(accounts[0]?.id || '');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [isAddingFriend, setIsAddingFriend] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');

  const handleKeypad = (val: string) => {
    if (val === '.' && amount.includes('.')) return;
    if (amount === '0' && val !== '.') setAmount(val);
    else setAmount(amount + val);
  };

  const toggleFriend = (id: string) => {
    setSelectedFriends(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    const totalAmount = parseFloat(amount);
    if (totalAmount === 0 || !accountId) return;

    const splitPeopleCount = selectedFriends.length + 1;
    const splitAmount = totalAmount / splitPeopleCount;

    const tx: Transaction = {
      id: crypto.randomUUID(),
      amount: totalAmount,
      merchant: merchant || 'Unknown Merchant',
      category,
      date: new Date().toISOString().split('T')[0],
      type: 'debit' as const,
      account_id: accountId,
      splits: selectedFriends.length > 0 
        ? selectedFriends.map(fId => ({ friend_id: fId, amount: splitAmount }))
        : undefined
    };

    onSave(tx);
    if (selectedFriends.length > 0) {
      alert(`Success: Notifications sent to ${selectedFriends.length} friends!`);
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onBack}
        className="fixed inset-0 bg-black/10 backdrop-blur-xl z-60"
      />
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 sm:inset-y-12 sm:mx-auto sm:max-w-md sm:rounded-[3rem] glass z-70 flex flex-col shadow-2xl overflow-hidden"
      >
        <header className="px-6 pt-12 pb-4 flex justify-between items-center text-ink ios-divider">
          <button onClick={onBack} className="w-9 h-9 rounded-full glass flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity active:scale-90"><X size={18} /></button>
          <h2 className="text-sm font-bold uppercase tracking-widest">Entry</h2>
          <button onClick={handleSave} className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 active:scale-90 transition-all"><Send size={16} /></button>
        </header>

        <div className="flex-1 flex flex-col px-8 pt-8 space-y-8 overflow-y-auto no-scrollbar pb-32">
          {/* Amount Display */}
          <div className="text-center space-y-2">
            <p className="meta-label opacity-40">Expense Value</p>
            <div className="flex items-center justify-center gap-1">
              <span className="text-3xl font-bold text-ink/30">₹</span>
              <p className="text-7xl font-bold data-value tracking-tighter text-primary">{amount}</p>
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

          {/* Account Selection */}
          <div className="space-y-4">
            <p className="meta-label">Payment Source</p>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {accounts.map(acc => (
                <button 
                  key={acc.id}
                  onClick={() => setAccountId(acc.id)}
                  className={cn(
                    "shrink-0 glass p-4 rounded-2xl flex items-center gap-3 transition-all min-w-[140px] border-2",
                    accountId === acc.id ? "border-purple-600/40 bg-white" : "opacity-50 border-transparent"
                  )}
                >
                  <CreditCard size={18} className={accountId === acc.id ? "text-purple-600" : ""} />
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase text-ink leading-tight">{acc.name}</p>
                    <p className="text-[10px] opacity-40">₹{acc.balance.toLocaleString()}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Classification & Social Split Side-by-Side */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <p className="meta-label">Classification</p>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { cat: 'Dining', icon: Coffee },
                  { cat: 'Retail', icon: ShoppingBag },
                  { cat: 'Travel', icon: Plane },
                  { cat: 'Home', icon: HomeIcon },
                ] as any[]).map(({ cat, icon: Icon }) => (
                  <button 
                    key={cat} 
                    onClick={() => setCategory(cat)}
                    className={cn(
                      "glass py-3 rounded-xl flex flex-col items-center gap-2 transition-all border",
                      category === cat ? "border-purple-600/40 bg-white text-purple-600" : "border-transparent opacity-50 text-ink"
                    )}
                  >
                    <Icon size={14} />
                    <span className="text-[7px] font-black uppercase tracking-widest">{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="meta-label italic text-purple-600">Split Bill</p>
                <button 
                  onClick={() => setIsAddingFriend(true)}
                  className="text-[9px] font-black uppercase text-purple-600 bg-purple-600/10 px-2 py-1 rounded-lg"
                >
                  + Add
                </button>
              </div>

              <div className="glass p-3 rounded-2xl min-h-[100px] flex flex-wrap gap-2 content-start overflow-y-auto no-scrollbar">
                {friends.length === 0 && !isAddingFriend && (
                  <p className="text-[8px] opacity-30 text-center w-full mt-6">No friends added yet</p>
                )}
                
                {isAddingFriend ? (
                  <div className="w-full space-y-2">
                    <input 
                      autoFocus
                      placeholder="Name..."
                      value={newFriendName}
                      onChange={e => setNewFriendName(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          onAddFriend(newFriendName);
                          setNewFriendName('');
                          setIsAddingFriend(false);
                        }
                      }}
                      className="w-full bg-white/50 text-[10px] p-2 rounded-lg outline-none"
                    />
                    <button 
                      onClick={() => setIsAddingFriend(false)}
                      className="text-[8px] opacity-40 uppercase font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  friends.map(friend => (
                    <button
                      key={friend.id}
                      onClick={() => toggleFriend(friend.id)}
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all border-2",
                        selectedFriends.includes(friend.id) 
                          ? "bg-purple-600 text-white border-purple-600 scale-110 shadow-lg" 
                          : "glass border-transparent opacity-60"
                      )}
                    >
                      {friend.name[0]}
                    </button>
                  ))
                )}
              </div>
              {selectedFriends.length > 0 && (
                <p className="text-[9px] font-bold text-center text-purple-600">
                  You + {selectedFriends.length} split ₹{(parseFloat(amount) / (selectedFriends.length + 1)).toFixed(2)} ea.
                </p>
              )}
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
