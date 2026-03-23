import { LayoutDashboard, ReceiptText, PlusCircle, PieChart } from 'lucide-react';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-white/80 backdrop-blur-xl rounded-t-3xl shadow-[0_-4px_24px_-4px_rgba(25,28,30,0.06)] md:hidden">
      <a className="flex flex-col items-center justify-center bg-primary text-white rounded-2xl px-5 py-2 transition-all" href="#">
        <LayoutDashboard size={20} />
        <span className="font-headline text-[10px] font-semibold uppercase tracking-widest mt-1">Dashboard</span>
      </a>
      <a className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-2 hover:text-primary transition-transform active:scale-90 duration-150" href="#">
        <ReceiptText size={20} />
        <span className="font-headline text-[10px] font-semibold uppercase tracking-widest mt-1">History</span>
      </a>
      <a className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-2 hover:text-primary transition-transform active:scale-90 duration-150" href="#">
        <PlusCircle size={20} />
        <span className="font-headline text-[10px] font-semibold uppercase tracking-widest mt-1">Add</span>
      </a>
      <a className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-2 hover:text-primary transition-transform active:scale-90 duration-150" href="#">
        <PieChart size={20} />
        <span className="font-headline text-[10px] font-semibold uppercase tracking-widest mt-1">Budgets</span>
      </a>
    </nav>
  );
}
