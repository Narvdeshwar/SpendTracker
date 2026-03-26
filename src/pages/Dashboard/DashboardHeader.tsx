import React from 'react';
import { User, Bell } from 'lucide-react';

interface DashboardHeaderProps {
  onOpenUser: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onOpenUser }) => (
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
);
