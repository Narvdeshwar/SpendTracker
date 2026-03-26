import React from 'react';
import { Transaction } from '../../types';
import { HistoryHeader } from './HistoryHeader';
import { TransactionItem } from './TransactionItem';
import { useHistory } from './useHistory';

interface HistoryProps {
  transactions: Transaction[];
}

const History: React.FC<HistoryProps> = ({ transactions }) => {
  const { groupedTransactions } = useHistory(transactions);

  return (
    <div className="space-y-6 pb-32">
      <HistoryHeader />
      <section className="px-6 space-y-8">
        {groupedTransactions.map((group) => group.items.length > 0 && (
          <div key={group.date} className="space-y-3">
            <h3 className="meta-label">{group.date}</h3>
            <div className="space-y-3">
              {group.items.map((tx) => (
                <TransactionItem key={tx.id} tx={tx} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default History;
