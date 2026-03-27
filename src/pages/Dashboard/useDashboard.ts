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

  /**
   * Analytics based on real data.
   */
  const budgetTotal = 25000; // This could be synced from a 'settings' table in the future
  const budgetRemaining = Math.max(0, budgetTotal - monthSpending);
  const dailyAverage = todayDay > 0 ? monthSpending / todayDay : 0;

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
   * Dynamic suggestions based on actual spending data.
   */
  const suggestions: Suggestion[] = useMemo(() => {
    const list: Suggestion[] = [];
    
    // Check if daily average is high
    if (dailyAverage > 1000) {
      list.push({ 
        id: 'burn-rate', 
        title: 'High Burn Rate', 
        description: `You're averaging ₹${Math.round(dailyAverage)}/day this month. Try to keep it under ₹800.`, 
        type: 'alert' 
      });
    } else {
      list.push({ 
        id: 'saving-pro', 
        title: 'Efficiency Pro', 
        description: `Great job! Your daily spend is ₹${Math.round(dailyAverage)}, which is well within safe limits.`, 
        type: 'saving' 
      });
    }

    // Category insight
    const topCat = categoryMix[0];
    if (topCat && topCat.value > monthSpending * 0.4) {
      list.push({
        id: 'cat-weight',
        title: 'Category Concentration',
        description: `${topCat.name} accounts for ${Math.round((topCat.value / monthSpending) * 100)}% of your monthly spend.`,
        type: 'insight'
      });
    }

    return list.length > 0 ? list : [
      { id: '1', title: 'Data Initialized', description: 'Your real-time analytics are now live and tracking your behavior.', type: 'saving' }
    ];
  }, [dailyAverage, categoryMix, monthSpending]);

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
