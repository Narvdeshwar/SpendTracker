import React from 'react';
import { X } from 'lucide-react';

interface ExportHeaderProps {
  onBack: () => void;
}

export const ExportHeader: React.FC<ExportHeaderProps> = ({ onBack }) => (
  <header className="px-6 pt-8 flex justify-between items-center">
    <button onClick={onBack} className="w-10 h-10 rounded-full glass flex items-center justify-center">
      <X size={20} />
    </button>
    <h1 className="text-xl font-bold tracking-tight">Export Data</h1>
    <div className="w-10" />
  </header>
);
