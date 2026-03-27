import React from 'react';
import { motion } from 'framer-motion';
import { Account } from '../../types';
import { AssetsHeader } from './AssetsHeader';
import { AccountCard } from './AccountCard';
import { useAssets } from './useAssets';
import { NetWorthSection } from '../Dashboard/NetWorthSection';

interface AssetsProps {
  accounts: Account[];
  onAddAccount: () => void;
}

const Assets: React.FC<AssetsProps> = ({ accounts, onAddAccount }) => {
  const { totalBalance } = useAssets(accounts);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-32">
      <AssetsHeader onAddAccount={onAddAccount} />
      
      <NetWorthSection netWorth={totalBalance} />

      <section className="px-6 space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="meta-label opacity-40">Liquid & Investments</h3>
          </div>

          <div className="space-y-4">
            {accounts.map((acc) => (
              <AccountCard key={acc.id} acc={acc} />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Assets;
