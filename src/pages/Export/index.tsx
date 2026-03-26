import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Transaction, Account, Format } from '../../types';
import { cn } from '../../utils/cn';

// Sub-components
import { ExportHeader } from './ExportHeader';
import { ExportPreview } from './ExportPreview';
import { useExport } from './useExport';

interface ExportPageProps {
  transactions: Transaction[];
  accounts: Account[];
  onBack: () => void;
}

const ExportPage: React.FC<ExportPageProps> = ({ transactions, accounts, onBack }) => {
  const {
    format,
    setFormat,
    selectedAccount,
    setSelectedAccount,
    dateRange,
    setDateRange,
    filteredTransactions,
    handleDownload
  } = useExport(transactions);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8 pb-32"
    >
      <ExportHeader onBack={onBack} />

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

        <ExportPreview transactions={filteredTransactions} />

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

export default ExportPage;
