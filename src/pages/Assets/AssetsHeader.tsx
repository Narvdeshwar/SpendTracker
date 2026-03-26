import React from 'react';
import { Plus } from 'lucide-react';

interface AssetsHeaderProps {
  onAddAccount: () => void;
}

export const AssetsHeader: React.FC<AssetsHeaderProps> = ({ onAddAccount }) => (
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
);
