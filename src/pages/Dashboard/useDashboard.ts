import { useMemo } from 'react';
import { Transaction, Account, Suggestion } from '../../types';
import { CATEGORY_COLORS } from '../../constants/colors';

/**
 * Hook to compute dashboard analytics and specific metrics.
 * Separates data calculation from the presentation layer (Dashboard component).
 * All calculations are memoized to ensure optimal performance.
 */

export const useDashboard = (transactions: Transaction[], accounts: Account[]) => {
  const todayObj = new Date();
  const today = todayObj.toISOString().split('T')[0];
  const todayDay = todayObj.getDate();

  /**
   * Summarizes net worth by subtracting today's spending from total account balances.
   */
  const todayDebits = useMemo(() => transactions
    .filter(t => t.date === today && t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0), [transactions, today]);

  const netWorth = useMemo(() => accounts.reduce((sum, acc) => sum + acc.balance, 0) - todayDebits, [accounts, todayDebits]);
  
  /**
   * Tracks overall spending for the current month.
   */
  const currentMonth = today.substring(0, 7); // "YYYY-MM"
  const monthSpending = useMemo(() => transactions
    .filter(t => t.type === 'debit' && t.date.startsWith(currentMonth))
    .reduce((sum, t) => sum + t.amount, 0), [transactions, currentMonth]);

  const budgetTotal = 5000;
  const budgetRemaining = useMemo(() => budgetTotal - monthSpending, [monthSpending]);
  const dailyAverage = useMemo(() => monthSpending / todayDay, [monthSpending, todayDay]);

  /**
   * Generates a breakdown of categorical spending for the distribution chart.
   */
  const categoryMix = useMemo(() => {
    const counts: Record<string, number> = {};
    transactions.filter(t => t.type === 'debit').forEach(t => {
      counts[t.category] = (counts[t.category] || 0) + t.amount;
    });
    return Object.entries(counts).map(([name, value]) => ({
      name,
      value: Math.round(value),
      color: CATEGORY_COLORS[name] || '#94A3B8'
    })).sort((a, b) => b.value - a.value);
  }, [transactions]);

  /**
   * Placeholder suggestions for financial health.
   * Can be replaced by real LLM-powered insights in the future.
   */
  const suggestions: Suggestion[] = [
    { id: '1', title: 'Smart Saving', description: "You've spent ₹2,400 less on Dining than average. Invest this into your Vanguard!", type: 'saving' },
    { id: '2', title: 'Budget Alert', description: "Heads up: You're at 85% of your 'Retail' budget for March.", type: 'alert' }
  ];

  return {
    netWorth,
    monthSpending,
    budgetTotal,
    budgetRemaining,
    dailyAverage,
    categoryMix,
    suggestions
  };
};
