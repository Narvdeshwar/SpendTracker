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
    <nav className="w-full nav-blur border-t border-line flex justify-around items-center z-50 relative px-4 pt-4" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 24px) + 8px)' }}>
      {navItems.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex flex-col items-center justify-center transition-all duration-300 w-16 mb-1",
            tab.isSpecial 
              ? "bg-purple-600 h-14 w-14 rounded-2xl -mb-2 -translate-y-8 shadow-xl shadow-purple-600/30 border-4 border-white shrink-0 flex items-center justify-center z-10" 
              : "opacity-30 gap-1.5",
            activeTab === tab.id && !tab.isSpecial && "opacity-100 text-purple-600 translate-y-[-2px]",
            activeTab === tab.id && tab.isSpecial && "scale-105"
          )}
        >
          <tab.icon 
            size={tab.isSpecial ? 24 : 20} 
            className={tab.isSpecial ? "text-white" : ""} 
            strokeWidth={2} 
          />
          {!tab.isSpecial && (
            <span className="text-[9px] font-black uppercase tracking-[0.1em] leading-none">
              {tab.label}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
};
