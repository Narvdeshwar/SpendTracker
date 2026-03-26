import React from 'react';
import { BudgetHeader } from './BudgetHeader';
import { BudgetItem } from './BudgetItem';
import { useBudget } from './useBudget';

const BudgetPage: React.FC = () => {
  const { budgets } = useBudget();

  return (
    <div className="space-y-8 pb-32">
      <BudgetHeader totalBudget={budgets[0]} />

      <section className="px-6 space-y-4">
        <h3 className="meta-label">Categorical Breakdown</h3>
        <div className="space-y-4">
          {budgets.slice(1).map((b) => (
            <BudgetItem key={b.category} b={b} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default BudgetPage;
