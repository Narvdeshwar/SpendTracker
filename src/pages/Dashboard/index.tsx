import React from 'react';
import { Transaction, Account } from '../../types';
import { ProCard } from '../../components/ui/ProCard';

// Sub-components - Modularity via feature breakdown
import { DashboardHeader } from './DashboardHeader';
import { SpendingStats } from './SpendingStats';

import { CategoryDistribution } from './CategoryDistribution';
import { SmartSuggestions } from './SmartSuggestions';

// Hook - Logic isolation
import { useDashboard } from './useDashboard';

/**
 * Dashboard Page Module
 * This is the landing page of PennyTrack.
 * It provides a high-level view of net worth, categorical spending, and AI insights.
 * Pure JSX approach - logic is delegated to useDashboard.
 */

interface DashboardProps {
  transactions: Transaction[];
  accounts: Account[];
  onOpenUser: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  transactions, 
  accounts, 
  onOpenUser 
}) => {
  const {
    netWorth,
    monthSpending,
    budgetTotal,
    budgetRemaining,
    dailyAverage,
    categoryMix,
    suggestions
  } = useDashboard(transactions, accounts);

  return (
    <div className="space-y-8 pb-32">
      <DashboardHeader onOpenUser={onOpenUser} />
      
      <SpendingStats 
        monthSpending={monthSpending}
        budgetTotal={budgetTotal}
        budgetRemaining={budgetRemaining}
        dailyAverage={dailyAverage}
        transactionCount={transactions.length}
      />


      <CategoryDistribution categoryMix={categoryMix} />

      <SmartSuggestions suggestions={suggestions} />
      
      <section className="px-6">
        <ProCard />
      </section>
    </div>
  );
};

export default Dashboard;
