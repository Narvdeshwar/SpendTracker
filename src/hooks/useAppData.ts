import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Transaction, Account } from '../types';
import { INITIAL_TRANSACTIONS, INITIAL_ACCOUNTS } from '../constants/mockData';

/**
 * Persistent Data Synchronization Hook.
 * Manages fetching from and pushing to Supabase.
 * Includes 'Optimistic UI' patterns where local state updates immediately for a smooth experience.
 */

export const useAppData = (session: Session | null) => {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [accounts, setAccounts] = useState<Account[]>(INITIAL_ACCOUNTS);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetches user-specific data from Supabase backend.
   */
  const fetchData = async () => {
    if (!session?.user?.id) return;
    
    setIsLoading(true);
    try {
      // Fetch Transactions (Explicit column selection)
      const { data: txData } = await supabase
        .from('transactions')
        .select('id, amount, category, date, notes, merchant, type, user_id')
        .eq('user_id', session.user.id)
        .order('date', { ascending: false });

      if (txData) setTransactions(txData);

      // Fetch Accounts (Explicit column selection to avoid column-not-found errors)
      const { data: accData } = await supabase
        .from('accounts')
        .select('id, name, institution, balance, type, user_id')
        .eq('user_id', session.user.id);

      if (accData) setAccounts(accData as Account[]);
    } catch (err) {
      console.error('Core sync failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) fetchData();
  }, [session]);

  /**
   * Persists a transaction and optimistically updates the local list.
   */
  const saveTransaction = async (tx: any) => {
    if (!session?.user?.id) return;

    const newTx = { ...tx, user_id: session.user.id, id: crypto.randomUUID() };
    
    // Optimistic Update
    setTransactions(prev => [newTx, ...prev]);

    await supabase.from('transactions').insert(newTx);
    // Silent background fetch for final consistency
    fetchData();
  };

  /**
   * Persists a new financial account.
   */
  const saveAccount = async (acc: any) => {
    if (!session?.user?.id) return;

    // We explicitly exclude 'initialBalance' because the Supabase schema doesn't have it
    const newAcc = { 
      id: crypto.randomUUID(),
      user_id: session.user.id,
      name: acc.name,
      institution: acc.institution,
      balance: acc.balance,
      type: acc.type
    };

    // Optimistic Update
    setAccounts(prev => [...prev, { ...newAcc, initialBalance: acc.balance }]);

    await supabase.from('accounts').insert(newAcc);
    fetchData();
  };

  return {
    transactions,
    accounts,
    isLoading,
    saveTransaction,
    saveAccount,
    refresh: fetchData
  };
};
