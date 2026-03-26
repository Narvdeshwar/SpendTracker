import React from 'react';
import { Budget } from '../../types';
import { ProgressRing } from '../../components/ui/ProgressRing';

interface BudgetHeaderProps {
  totalBudget: Budget;
}

export const BudgetHeader: React.FC<BudgetHeaderProps> = ({ totalBudget }) => (
  <>
    <header className="px-6 pt-8 text-center">
      <h2 className="meta-label">Performance</h2>
      <h1 className="text-2xl font-bold tracking-tight">Budget Tracker</h1>
    </header>

    <section className="px-6 flex justify-center py-4">
      <ProgressRing 
        percentage={(totalBudget.spent / totalBudget.limit) * 100} 
        color={totalBudget.color!} 
        size={180} 
        strokeWidth={15} 
      />
    </section>
  </>
);
