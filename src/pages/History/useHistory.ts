import { useMemo } from 'react';
import { Transaction } from '../../types';

export const useHistory = (transactions: Transaction[]) => {
  const groupedTransactions = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    
    return [
      { date: 'Today', items: transactions.filter(t => t.date === today) },
      { date: 'March 22', items: transactions.filter(t => t.date === '2026-03-22') },
      { date: 'March 21', items: transactions.filter(t => t.date === '2026-03-21') }
    ];
  }, [transactions]);

  return {
    groupedTransactions
  };
};
