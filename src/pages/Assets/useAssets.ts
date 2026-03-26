import { useMemo } from 'react';
import { Account } from '../../types';

export const useAssets = (accounts: Account[]) => {
  const totalBalance = useMemo(() => accounts.reduce((s, a) => s + a.balance, 0), [accounts]);

  return {
    totalBalance
  };
};
