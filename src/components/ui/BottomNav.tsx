import React from 'react';
import { LayoutDashboard, History as HistoryIcon, Plus, PieChart, Wallet } from 'lucide-react';
import { cn } from '../../utils/cn';

interface NavItem {
  id: string;
  icon: React.ElementType;
  label?: string;
  isSpecial?: boolean;
}

interface BottomNavProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems: NavItem[] = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Vault' },
    { id: 'history', icon: HistoryIcon, label: 'Logs' },
    { id: 'add', icon: Plus, isSpecial: true },
    { id: 'budgets', icon: PieChart, label: 'Analytics' },
    { id: 'assets', icon: Wallet, label: 'Capital' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md nav-blur border-t border-black/5 px-4 pb-10 pt-4 flex justify-around items-center z-50">
      {navItems.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex flex-col items-center gap-1.5 transition-all duration-300 w-16",
            tab.isSpecial ? "bg-purple-600 p-4 rounded-3xl -mt-14 shadow-2xl shadow-purple-600/40 border-4 border-white shrink-0" : "opacity-30",
            activeTab === tab.id && !tab.isSpecial && "opacity-100 text-purple-600",
            activeTab === tab.id && tab.isSpecial && "scale-110 rotate-90"
          )}
        >
          <tab.icon size={tab.isSpecial ? 24 : 20} className={tab.isSpecial ? "text-white" : ""} strokeWidth={2.5} />
          {!tab.isSpecial && <span className="text-[8px] font-black uppercase tracking-[0.2em]">{tab.label}</span>}
        </button>
      ))}
    </nav>
  );
};
