import { ShoppingBag, Landmark, Utensils } from 'lucide-react';
import { Transaction } from '../types';

const transactions: Transaction[] = [
  {
    id: '1',
    name: 'Apple Store Soho',
    category: 'Electronics',
    date: 'Oct 24',
    amount: 1299.00,
    type: 'expense',
    icon: 'shopping-bag'
  },
  {
    id: '2',
    name: 'Monthly Salary',
    category: 'Income',
    date: 'Oct 21',
    amount: 8500.00,
    type: 'income',
    icon: 'landmark'
  },
  {
    id: '3',
    name: 'Blue Hill Savory',
    category: 'Dining',
    date: 'Oct 20',
    amount: 240.12,
    type: 'expense',
    icon: 'utensils'
  }
];

const IconMap: Record<string, any> = {
  'shopping-bag': ShoppingBag,
  'landmark': Landmark,
  'utensils': Utensils
};

export default function TransactionList() {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-xl">
      <div className="flex justify-between items-end mb-10">
        <h3 className="font-headline text-2xl">Recent Transactions</h3>
        <button className="text-primary font-bold text-sm hover:underline">View All</button>
      </div>
      <div className="space-y-2">
        {transactions.map((t) => {
          const Icon = IconMap[t.icon];
          return (
            <div key={t.id} className="flex items-center justify-between p-4 hover:bg-surface-container-low rounded-xl transition-colors group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${t.type === 'income' ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-highest text-primary'}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="font-semibold text-on-surface">{t.name}</p>
                  <p className="text-xs text-on-surface-variant font-body">{t.category} · {t.date}</p>
                </div>
              </div>
              <p className={`font-headline font-bold group-hover:scale-105 transition-transform ${t.type === 'income' ? 'text-secondary' : 'text-on-tertiary-container'}`}>
                {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
