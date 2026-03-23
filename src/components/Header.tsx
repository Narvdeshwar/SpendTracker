import { Bell, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <div className="text-xl font-extrabold tracking-tighter text-primary font-headline">
          Financial Atelier
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-6">
            <a className="text-primary font-bold font-body" href="#">Dashboard</a>
            <a className="text-on-surface-variant hover:bg-surface-container-low transition-colors font-body px-3 py-1 rounded-lg" href="#">History</a>
            <a className="text-on-surface-variant hover:bg-surface-container-low transition-colors font-body px-3 py-1 rounded-lg" href="#">Budgets</a>
          </nav>
          
          <div className="flex items-center gap-3">
            <button className="p-2 text-primary hover:bg-surface-container-low transition-colors rounded-full">
              <Bell size={20} />
            </button>
            <button className="p-2 text-primary hover:bg-surface-container-low transition-colors rounded-full">
              <User size={20} />
            </button>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <Bell size={20} className="text-primary" />
          <User size={20} className="text-primary" />
        </div>
      </div>
    </header>
  );
}
