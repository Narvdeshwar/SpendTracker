import React from 'react';
import { Search } from 'lucide-react';

export const HistoryHeader: React.FC = () => (
  <>
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
  </>
);
