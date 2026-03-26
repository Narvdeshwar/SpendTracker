import { useMemo } from 'react';
import { Budget } from '../../types';

export const useBudget = () => {
  const budgets: Budget[] = useMemo(() => [
    { category: 'Total', limit: 5000, spent: 3450, color: '#7C3AED' },
    { category: 'Dining', limit: 600, spent: 580, color: '#EF4444' },
    { category: 'Retail', limit: 1200, spent: 400, color: '#F59E0B' },
    { category: 'Home', limit: 2000, spent: 1850, color: '#9333EA' },
    { category: 'Transport', limit: 300, spent: 45, color: '#3B82F6' },
  ], []);

  return {
    budgets
  };
};
