import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  History as HistoryIcon, 
  Plus, 
  PieChart, 
  Wallet,
  Bell,
  Search,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  ArrowDownLeft,
  User,
  Settings,
  FileDown,
  LogOut,
  Download,
  Calendar,
  CreditCard,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  Zap,
  Crown,
  X,
  Check,
  Send,
  Delete,
  PenLine,
  Coffee,
  ShoppingBag,
  Plane,
  Home as HomeIcon,
  ShoppingCart,
  Music,
  Car,
  Banknote,
  Landmark,
  BarChart2,
  Bitcoin,
  Link2,
  Target,
  SlidersHorizontal,
  Activity
} from 'lucide-react';
import { 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer 
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Transaction, Budget, Account, Category, Suggestion, Format } from './types';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helpers
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const getDayName = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

// Mock Data
const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', amount: 42.50, category: 'Dining', date: new Date().toISOString().split('T')[0], merchant: 'Blue Bottle Coffee', notes: 'Morning brew', type: 'debit' },
  { id: '2', amount: 125.00, category: 'Retail', date: '2026-03-22', merchant: 'Uniqlo', notes: 'Spring basics', type: 'debit' },
  { id: '3', amount: 850.00, category: 'Home', date: '2026-03-21', merchant: 'West Elm', notes: 'New lamp', type: 'debit' },
  { id: '4', amount: 12.00, category: 'Transport', date: '2026-03-20', merchant: 'Uber', notes: 'Late night ride', type: 'debit' },
  { id: '5', amount: 3500.00, category: 'Other', date: '2026-03-01', merchant: 'Monthly Salary', notes: 'March Pay', type: 'credit' },
];

const INITIAL_ACCOUNTS: Account[] = [
  { id: '1', name: 'Chase Private Client', institution: 'Chase', balance: 12450.80, initialBalance: 12000, type: 'checking' },
  { id: '2', name: 'Vanguard Brokerage', institution: 'Vanguard', balance: 85200.00, initialBalance: 80000, type: 'investment' },
];

const CATEGORY_COLORS: Record<string, string> = {
  Dining: '#EF4444',
  Retail: '#F59E0B',
  Travel: '#3B82F6',
  Home: '#9333EA',
  Groceries: '#10B981',
  Entertainment: '#EC4899',
  Transport: '#6366F1',
  Other: '#94A3B8',
};

// Components
const ProgressRing = ({ percentage, color, size = 120, strokeWidth = 10 }: { percentage: number, color: string, size?: number, strokeWidth?: number }) => {
  const radius = (size / 2) - (strokeWidth / 2);
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="progress-ring-container" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          className="text-black/5"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="progress-ring-circle"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset: offset }}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold data-value">{Math.round(percentage)}%</span>
        <span className="text-[10px] meta-label opacity-40">Spent</span>
      </div>
    </div>
  );
};

const ProCard = () => (
  <div className="pro-card p-6 rounded-3xl text-white space-y-4 relative">
    <div className="flex justify-between items-start relative z-10">
      <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
        <Crown size={20} className="text-yellow-400" />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest bg-yellow-400 text-ink px-2 py-0.5 rounded-full">Pro</span>
    </div>
    <div className="relative z-10">
      <h3 className="text-lg font-bold">Unlock PennyTrack Pro</h3>
      <p className="text-xs opacity-70 leading-relaxed mt-1">AI insights, multi-currency support, and unlimited exports.</p>
    </div>
    <button className="w-full py-3 bg-white text-ink text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-opacity-90 transition-all relative z-10">
      Upgrade — ₹199/mo
    </button>
  </div>
);

const SuggestionCard: React.FC<{ suggestion: Suggestion }> = ({ suggestion }) => (
  <div className="glass p-5 rounded-3xl space-y-3 relative overflow-hidden group">
    <div className="flex items-start gap-4">
      <div className={cn(
        "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0",
        suggestion.type === 'saving' ? "bg-emerald-500/10 text-emerald-500" : 
        suggestion.type === 'alert' ? "bg-rose-500/10 text-rose-500" : "bg-blue-500/10 text-blue-500"
      )}>
        {suggestion.type === 'saving' ? <TrendingDown size={20} /> : 
         suggestion.type === 'alert' ? <AlertCircle size={20} /> : <Zap size={20} />}
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-bold text-ink">{suggestion.title}</h4>
        <p className="text-xs text-ink/60 leading-relaxed">{suggestion.description}</p>
      </div>
    </div>
  </div>
);

const ExportPage = ({ transactions, accounts, onBack }: { transactions: Transaction[], accounts: Account[], onBack: () => void }) => {
  const [format, setFormat] = useState<Format>('CSV');
  const [selectedAccount, setSelectedAccount] = useState<string>('all');
  const [dateRange, setDateRange] = useState({ start: '2026-03-01', end: '2026-03-31' });

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const dateMatch = t.date >= dateRange.start && t.date <= dateRange.end;
      const accountMatch = selectedAccount === 'all'; // Simplified as we don't have accountId in Transaction yet
      return dateMatch && accountMatch;
    });
  }, [transactions, dateRange, selectedAccount]);

  const handleDownload = () => {
    if (format === 'JSON') {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredTransactions, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `pennytrack_export_${dateRange.start}.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    } else {
      const headers = ['Date', 'Day', 'Description', 'Category', 'Credit', 'Debit'];
      const rows = filteredTransactions.map(t => [
        t.date,
        getDayName(t.date),
        t.merchant,
        t.category,
        t.type === 'credit' ? t.amount.toFixed(2) : '',
        t.type === 'debit' ? t.amount.toFixed(2) : ''
      ]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `pennytrack_export_${dateRange.start}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8 pb-32"
    >
      <header className="px-6 pt-8 flex justify-between items-center">
        <button onClick={onBack} className="w-10 h-10 rounded-full glass flex items-center justify-center">
          <X size={20} />
        </button>
        <h1 className="text-xl font-bold tracking-tight">Export Data</h1>
        <div className="w-10" />
      </header>

      <section className="px-6 space-y-6">
        <div className="glass p-6 rounded-3xl space-y-4">
          <p className="meta-label">Configurations</p>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase opacity-40 ml-1">Format</label>
            <div className="flex gap-2">
              {(['CSV', 'JSON'] as Format[]).map(f => (
                <button 
                  key={f}
                  onClick={() => setFormat(f)}
                  className={cn(
                    "flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                    format === f ? "bg-purple-600 text-white" : "bg-black/5 text-ink/40"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase opacity-40 ml-1">Account</label>
            <select 
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="w-full glass p-4 rounded-xl text-sm font-medium focus:outline-none appearance-none"
            >
              <option value="all">All Accounts</option>
              {accounts.map(acc => <option key={acc.id} value={acc.id}>{acc.name}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase opacity-40 ml-1">From</label>
              <input 
                type="date" 
                value={dateRange.start}
                onChange={e => setDateRange({...dateRange, start: e.target.value})}
                className="w-full glass p-4 rounded-xl text-xs font-medium focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase opacity-40 ml-1">To</label>
              <input 
                type="date" 
                value={dateRange.end}
                onChange={e => setDateRange({...dateRange, end: e.target.value})}
                className="w-full glass p-4 rounded-xl text-xs font-medium focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="meta-label">Preview ({filteredTransactions.length} rows)</h3>
          </div>
          <div className="glass rounded-3xl overflow-hidden">
            <div className="max-h-60 overflow-y-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 glass backdrop-blur-md">
                  <tr>
                    <th className="px-4 py-3 text-[8px] font-bold uppercase tracking-widest text-ink/40">Date</th>
                    <th className="px-4 py-3 text-[8px] font-bold uppercase tracking-widest text-ink/40">Item</th>
                    <th className="px-4 py-3 text-[8px] font-bold uppercase tracking-widest text-ink/40 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {filteredTransactions.map(t => (
                    <tr key={t.id} className="text-[10px] font-medium">
                      <td className="px-4 py-3 text-ink/60">{formatDate(t.date)}</td>
                      <td className="px-4 py-3 text-ink truncate max-w-[120px]">{t.merchant}</td>
                      <td className={cn(
                        "px-4 py-3 text-right data-value",
                        t.type === 'credit' ? "text-emerald-600" : "text-ink"
                      )}>
                        {t.type === 'credit' ? '+' : '-'}${t.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <button 
          onClick={handleDownload}
          className="w-full py-5 bg-purple-600 text-white rounded-3xl font-bold uppercase tracking-widest shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <Download size={20} />
          Download {format}
        </button>
      </section>
    </motion.div>
  );
};

// Main App Screens
const Dashboard = ({ 
  transactions, 
  accounts, 
  onOpenUser 
}: { 
  transactions: Transaction[], 
  accounts: Account[], 
  onOpenUser: () => void 
}) => {
  const todayObj = new Date();
  const today = todayObj.toISOString().split('T')[0];
  const todayDay = todayObj.getDate();

  const todayDebits = transactions
    .filter(t => t.date === today && t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  const netWorth = accounts.reduce((sum, acc) => sum + acc.balance, 0) - todayDebits;
  
  const currentMonth = today.substring(0, 7); // "YYYY-MM"
  const monthSpending = transactions
    .filter(t => t.type === 'debit' && t.date.startsWith(currentMonth))
    .reduce((sum, t) => sum + t.amount, 0);

  const budgetTotal = 5000;
  const budgetRemaining = budgetTotal - monthSpending;
  const dailyAverage = monthSpending / todayDay;

  const categoryMix = useMemo(() => {
    const counts: Record<string, number> = {};
    transactions.filter(t => t.type === 'debit').forEach(t => {
      counts[t.category] = (counts[t.category] || 0) + t.amount;
    });
    return Object.entries(counts).map(([name, value]) => ({
      name,
      value: Math.round(value),
      color: CATEGORY_COLORS[name] || '#94A3B8'
    })).sort((a, b) => b.value - a.value);
  }, [transactions]);

  const suggestions: Suggestion[] = [
    { id: '1', title: 'Smart Saving', description: "You've spent ₹2,400 less on Dining than average. Invest this into your Vanguard!", type: 'saving' },
    { id: '2', title: 'Budget Alert', description: "Heads up: You're at 85% of your 'Retail' budget for March.", type: 'alert' }
  ];

  return (
    <div className="space-y-8 pb-32">
      <header className="flex justify-between items-center px-6 pt-8">
        <button 
          onClick={onOpenUser}
          className="w-10 h-10 rounded-full glass flex items-center justify-center border border-black/5 hover:border-purple-600/30 transition-all active:scale-95"
        >
          <User size={20} className="text-purple-600" />
        </button>
        <div className="text-center">
          <h2 className="meta-label">PennyTrack</h2>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Net Worth</h1>
        </div>
        <button className="w-10 h-10 rounded-full glass flex items-center justify-center">
          <Bell size={20} className="text-ink/60" />
        </button>
      </header>

      <section className="px-6">
        <div className="text-center py-4">
          <p className="text-5xl font-bold data-value text-primary tracking-tighter">
            ${netWorth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="text-[10px] font-bold uppercase text-emerald-500 flex items-center gap-1">
              <TrendingUp size={12} /> +2.4% this week
            </span>
          </div>
        </div>
      </section>

      <section className="px-6 grid grid-cols-2 gap-4">
        <div className="col-span-2 glass p-6 rounded-3xl space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="meta-label flex items-center gap-1"><Target size={10} className="opacity-50" /> Monthly Spending</p>
              <p className="text-3xl font-bold data-value text-ink">${monthSpending.toLocaleString()}</p>
            </div>
            <div className="bg-purple-600/10 text-purple-600 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
              <Activity size={10} />
              {Math.round((monthSpending/budgetTotal)*100)}% Used
            </div>
          </div>
          <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
            <div className="h-full bg-purple-600 rounded-full" style={{ width: `${(monthSpending/budgetTotal)*100}%` }} />
          </div>
          <div className="flex justify-between text-[10px] font-bold text-ink/40 uppercase tracking-widest">
            <span className="flex items-center gap-1"><Wallet size={10} /> Left to Spend</span>
            <span className="text-ink/80 data-value">${budgetRemaining.toLocaleString()}</span>
          </div>
        </div>

        <div className="glass p-5 rounded-3xl space-y-1">
          <p className="meta-label flex items-center gap-1"><BarChart2 size={10} className="opacity-50" /> Daily Avg</p>
          <p className="text-xl font-bold data-value text-purple-600">${dailyAverage.toFixed(2)}</p>
        </div>
        <div className="glass p-5 rounded-3xl space-y-1">
          <p className="meta-label flex items-center gap-1"><ArrowUpRight size={10} className="opacity-50" /> Transactions</p>
          <p className="text-xl font-bold data-value text-ink/80">{transactions.length}</p>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 space-y-4">
        <h3 className="meta-label opacity-60">Category Distribution</h3>
        <div className="glass p-6 rounded-3xl flex items-center gap-6">
          <div className="w-28 h-28">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={categoryMix}
                  innerRadius={30}
                  outerRadius={45}
                  paddingAngle={8}
                  dataKey="value"
                  strokeWidth={0}
                  cornerRadius={6}
                >
                  {categoryMix.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2">
            {categoryMix.slice(0, 4).map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] font-bold text-ink/60 uppercase tracking-wider">{item.name}</span>
                </div>
                <span className="text-[10px] font-bold data-value text-ink">${item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suggestions */}
      <section className="px-6 space-y-4">
        <h3 className="meta-label opacity-60">Smart Suggestions</h3>
        <div className="space-y-3">
          {suggestions.map(s => <SuggestionCard key={s.id} suggestion={s} />)}
        </div>
      </section>
      
      <section className="px-6">
        <ProCard />
      </section>
    </div>
  );
};

const History = () => {
  return (
    <div className="space-y-6 pb-32">
      <header className="px-6 pt-8 space-y-4 text-center">
        <h2 className="meta-label">Transaction Log</h2>
        <h1 className="text-2xl font-bold tracking-tight">Ledger</h1>
      </header>
      <div className="px-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30" size={18} />
          <input 
            type="text" 
            placeholder="Search merchants, categories..." 
            className="w-full glass py-4 pl-12 pr-4 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-purple-600/50 transition-all font-medium text-ink"
          />
        </div>
      </div>
      <section className="px-6 space-y-8">
        {[
          { date: 'Today', items: INITIAL_TRANSACTIONS.filter(t => t.date === new Date().toISOString().split('T')[0]) },
          { date: 'March 22', items: INITIAL_TRANSACTIONS.filter(t => t.date === '2026-03-22') },
          { date: 'March 21', items: INITIAL_TRANSACTIONS.filter(t => t.date === '2026-03-21') }
        ].map((group) => group.items.length > 0 && (
          <div key={group.date} className="space-y-3">
            <h3 className="meta-label">{group.date}</h3>
            <div className="space-y-3">
              {group.items.map((tx) => (
                <div key={tx.id} className="glass p-5 rounded-3xl flex items-center justify-between hover:scale-[1.01] transition-all">
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
                    {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

const Assets = ({ accounts, onAddAccount }: { accounts: Account[], onAddAccount: () => void }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-32">
      <header className="px-6 pt-8 flex justify-between items-end">
        <div>
          <h2 className="meta-label">Capital Distribution</h2>
          <h1 className="text-2xl font-bold tracking-tight">Accounts</h1>
        </div>
        <button 
          onClick={onAddAccount}
          className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/20 active:scale-95 transition-all"
        >
          <Plus size={24} />
        </button>
      </header>

      <section className="px-6 space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="meta-label opacity-40">Liquid & Investments</h3>
            <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest">Total ${accounts.reduce((s, a) => s + a.balance, 0).toLocaleString()}</span>
          </div>
          <div className="space-y-4">
            {accounts.map((acc) => (
              <div key={acc.id} className="glass p-6 rounded-3xl space-y-6 group hover:border-purple-600/20 transition-all">
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
                    <p className="text-2xl font-bold data-value text-ink">${acc.balance.toLocaleString()}</p>
                    <p className={cn(
                      "text-[10px] font-bold uppercase tracking-widest",
                      acc.balance > acc.initialBalance ? "text-emerald-500" : "text-rose-500"
                    )}>
                      {acc.balance > acc.initialBalance ? '+' : ''}{((acc.balance - acc.initialBalance)/acc.initialBalance * 100).toFixed(1)}% Yield
                    </p>
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
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const BudgetPage = () => {
  const budgets: Budget[] = [
    { category: 'Total', limit: 5000, spent: 3450, color: '#7C3AED' },
    { category: 'Dining', limit: 600, spent: 580, color: '#EF4444' },
    { category: 'Retail', limit: 1200, spent: 400, color: '#F59E0B' },
    { category: 'Home', limit: 2000, spent: 1850, color: '#9333EA' },
    { category: 'Transport', limit: 300, spent: 45, color: '#3B82F6' },
  ];

  return (
    <div className="space-y-8 pb-32">
      <header className="px-6 pt-8 text-center">
        <h2 className="meta-label">Performance</h2>
        <h1 className="text-2xl font-bold tracking-tight">Budget Tracker</h1>
      </header>

      <section className="px-6 flex justify-center py-4">
        <ProgressRing percentage={(budgets[0].spent / budgets[0].limit) * 100} color={budgets[0].color!} size={180} strokeWidth={15} />
      </section>

      <section className="px-6 space-y-4">
        <h3 className="meta-label">Categorical Breakdown</h3>
        <div className="space-y-4">
          {budgets.slice(1).map((b) => {
            const ratio = b.spent / b.limit;
            const barColor = ratio > 0.9 ? '#EF4444' : ratio > 0.7 ? '#F59E0B' : b.color;
            return (
              <div key={b.category} className="glass p-6 rounded-3xl space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: b.color + '18', color: b.color }}>
                      {b.category === 'Dining' ? <Coffee size={16} /> :
                       b.category === 'Retail' ? <ShoppingBag size={16} /> :
                       b.category === 'Home' ? <HomeIcon size={16} /> :
                       b.category === 'Transport' ? <Car size={16} /> :
                       b.category === 'Groceries' ? <ShoppingCart size={16} /> :
                       <Target size={16} />}
                    </div>
                    <p className="text-sm font-bold text-ink">{b.category}</p>
                  </div>
                  <p className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">
                    <span className="text-ink opacity-100">${b.spent}</span> / ${b.limit}
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
          })}
        </div>
      </section>
    </div>
  );
};

const AddAccount = ({ onBack, onSave }: { onBack: () => void, onSave: (account: Account) => void }) => {
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
        className="fixed inset-0 bg-black/5 backdrop-blur-md z-[55]"
      />
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        className="fixed inset-0 sm:inset-y-0 sm:right-0 sm:left-auto sm:w-[400px] glass z-[60] flex flex-col shadow-2xl overflow-hidden"
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
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-bold opacity-30">$</span>
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
                ] as const).map(({ type, icon: Icon, label }) => (
                  <button
                    key={type}
                    onClick={() => setFormData({...formData, type})}
                    className={cn(
                      "p-5 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all",
                      formData.type === type ? "bg-purple-600 text-white border-purple-600 shadow-xl shadow-purple-600/20" : "glass border-transparent opacity-40"
                    )}
                  >
                    <Icon size={22} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={handleSave}
            disabled={!formData.name || !formData.balance}
            className="w-full py-6 bg-purple-600 text-white rounded-[2rem] font-bold uppercase tracking-widest shadow-2xl shadow-purple-600/40 disabled:opacity-30 disabled:shadow-none active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <Link2 size={20} />
            Confirm Attachment
          </button>
        </div>
      </motion.div>
    </>
  );
};

const AddTransaction = ({ onBack, onSave }: { onBack: () => void, onSave: (tx: Transaction) => void }) => {
  const [amount, setAmount] = useState('0');
  const [category, setCategory] = useState<Category>('Dining');
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
              <span className="text-3xl font-bold text-ink/30">$</span>
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

const QuickAddDrawer = ({ categories, onAdd }: { categories: Category[], onAdd: (cat: Category) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Simulation: Auto-open every 90s only if we have active accounts
    const interval = setInterval(() => {
      setIsOpen(true);
    }, 90000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 floating-drawer-tab z-[40] flex flex-col items-center gap-1"
        title="Track Spend"
      >
        <PenLine size={16} />
        <span className="text-[7px] font-black uppercase tracking-widest leading-none">Log</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-80 glass z-[90] flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.2)]"
            >
              <div className="p-8 space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="meta-label">Quick Entry</h3>
                  <button onClick={() => setIsOpen(false)}><X size={20} /></button>
                </div>
                
                <p className="text-xl font-bold text-ink leading-tight">Log a recent purchase in seconds.</p>
                
                <div className="space-y-4">
                  <p className="meta-label opacity-40">Select Category</p>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => {
                          onAdd(cat);
                          setIsOpen(false);
                        }}
                        className="glass p-5 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all flex items-center justify-between group"
                      >
                        {cat}
                        <Plus size={14} className="opacity-0 group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <div className="p-6 bg-purple-600/5 rounded-3xl border border-purple-600/10 space-y-3">
                    <p className="text-xs font-medium text-ink/70 italic">"Tracking your spend daily reduces impulsive purchases by 22%."</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-purple-600">— Smart Insight</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const UserManagement = ({ onBack, onExport }: { onBack: () => void, onExport: () => void }) => {
  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onBack}
        className="fixed inset-0 bg-black/5 backdrop-blur-md z-[95]"
      />
      <motion.div 
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        className="fixed inset-0 sm:inset-y-0 sm:left-0 sm:right-auto sm:w-[400px] glass z-[100] flex flex-col shadow-2xl overflow-hidden"
      >
        <header className="px-6 pt-12 pb-4 flex justify-between items-center text-ink ios-divider">
          <button onClick={onBack} className="w-9 h-9 rounded-full glass flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity active:scale-90"><ChevronLeft size={18} /></button>
          <h2 className="text-sm font-black uppercase tracking-widest">Settings</h2>
          <div className="w-9" />
        </header>

        <div className="px-8 pt-12 space-y-10 flex-1 overflow-y-auto no-scrollbar">
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-[2rem] bg-purple-600/10 flex items-center justify-center border-2 border-purple-600/20 shadow-xl shadow-purple-600/5">
              <User size={48} className="text-purple-600" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-black text-ink">Asher Atelier</h3>
              <p className="text-[10px] font-bold text-purple-600 uppercase tracking-[0.2em] mt-1">Founding Member</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="meta-label">Core Functions</p>
            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={onExport}
                className="w-full glass p-6 rounded-[2rem] flex items-center justify-between hover:bg-white transition-all group border-transparent hover:border-purple-600/20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600/5 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all">
                    <FileDown size={22} />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-bold text-ink block">Export Warehouse</span>
                    <span className="text-[10px] opacity-40 uppercase tracking-widest font-bold">CSV / JSON Engine</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-ink/20 group-hover:text-purple-600 transition-colors" />
              </button>
              
              <button className="w-full glass p-6 rounded-[2rem] flex items-center justify-between hover:bg-white transition-all group border-transparent hover:border-purple-600/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-black/5 text-ink/40 flex items-center justify-center group-hover:bg-purple-600/10 group-hover:text-purple-600 transition-all">
                    <SlidersHorizontal size={22} />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-bold text-ink block">Preferences</span>
                    <span className="text-[10px] opacity-40 uppercase tracking-widest font-bold">System Config</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-ink/20 group-hover:text-purple-600 transition-colors" />
              </button>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[2.5rem] text-white space-y-4 relative overflow-hidden shadow-2xl shadow-purple-600/30">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                <Zap size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">PennyTrack Pro</span>
            </div>
            <div>
              <p className="text-lg font-bold">Priority Support</p>
              <p className="text-[10px] opacity-60 leading-relaxed font-medium">As a Pro member, your queries are answered within 60 minutes.</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <button className="w-full py-6 glass text-rose-500 rounded-[2rem] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-rose-50 transition-all border-transparent hover:border-rose-100 text-xs">
            <LogOut size={20} />
            Safe Logout
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAdd, setShowAdd] = useState(false);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [activeQuickCat, setActiveQuickCat] = useState<Category | null>(null);

  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [accounts, setAccounts] = useState<Account[]>(INITIAL_ACCOUNTS);

  const handleTabChange = (tab: string) => {
    if (tab === 'add') {
      setShowAdd(true);
    } else {
      setActiveTab(tab);
      setShowExport(false);
    }
  };

  const handleSaveTransaction = (tx: Transaction) => {
    setTransactions([tx, ...transactions]);
    setShowAdd(false);
    setActiveQuickCat(null);
  };

  const handleSaveAccount = (acc: Account) => {
    setAccounts([...accounts, acc]);
    setShowAddAccount(false);
  };

  const handleQuickAdd = (cat: Category) => {
    setActiveQuickCat(cat);
    setShowAdd(true);
  };

  const categories: Category[] = ['Dining', 'Retail', 'Travel', 'Home', 'Groceries', 'Entertainment', 'Transport'];

  return (
    <div className="min-h-screen bg-bg text-ink selection:bg-purple-600/10 font-sans">
      <main className="max-w-md mx-auto min-h-screen relative shadow-2xl shadow-black/5 bg-bg border-x border-black/5 overflow-hidden">
        
        <AnimatePresence mode="wait">
          {!showExport ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {activeTab === 'dashboard' && (
                <Dashboard 
                  transactions={transactions} 
                  accounts={accounts} 
                  onOpenUser={() => setShowUser(true)} 
                />
              )}
              {activeTab === 'history' && <History />}
              {activeTab === 'budgets' && <BudgetPage />}
              {activeTab === 'assets' && (
                <Assets 
                  accounts={accounts} 
                  onAddAccount={() => setShowAddAccount(true)} 
                />
              )}
            </motion.div>
          ) : (
            <ExportPage 
              transactions={transactions} 
              accounts={accounts} 
              onBack={() => {
                setShowExport(false);
                setShowUser(false);
              }} 
            />
          )}
        </AnimatePresence>

        <QuickAddDrawer 
          categories={categories} 
          onAdd={handleQuickAdd} 
        />

        <AnimatePresence>
          {showAdd && (
            <AddTransaction 
              onBack={() => {
                setShowAdd(false);
                setActiveQuickCat(null);
              }} 
              onSave={handleSaveTransaction}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAddAccount && (
            <AddAccount 
              onBack={() => setShowAddAccount(false)} 
              onSave={handleSaveAccount}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showUser && (
            <UserManagement 
              onBack={() => setShowUser(false)} 
              onExport={() => {
                setShowExport(true);
                setShowUser(false);
              }}
            />
          )}
        </AnimatePresence>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md nav-blur border-t border-black/5 px-4 pb-10 pt-4 flex justify-around items-center z-[50]">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Vault' },
            { id: 'history', icon: HistoryIcon, label: 'Logs' },
            { id: 'add', icon: Plus, isSpecial: true },
            { id: 'budgets', icon: PieChart, label: 'Analytics' },
            { id: 'assets', icon: Wallet, label: 'Capital' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1.5 transition-all duration-300 w-16",
                tab.isSpecial ? "bg-purple-600 p-4 rounded-3xl -mt-14 shadow-2xl shadow-purple-600/40 border-4 border-white flex-shrink-0" : "opacity-30",
                activeTab === tab.id && !tab.isSpecial && "opacity-100 text-purple-600",
                activeTab === tab.id && tab.isSpecial && "scale-110 rotate-90"
              )}
            >
              <tab.icon size={tab.isSpecial ? 24 : 20} className={tab.isSpecial ? "text-white" : ""} strokeWidth={2.5} />
              {!tab.isSpecial && <span className="text-[8px] font-black uppercase tracking-[0.2em]">{tab.label}</span>}
            </button>
          ))}
        </nav>
      </main>
    </div>
  );
}
