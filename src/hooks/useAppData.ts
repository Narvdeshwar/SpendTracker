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

export type SyncStatus = 'synced' | 'pending' | 'error' | 'syncing';

export const useAppData = (session: Session | null) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const local = localStorage.getItem('pnt_tx_cache');
    return local ? JSON.parse(local) : INITIAL_TRANSACTIONS;
  });
  const [accounts, setAccounts] = useState<Account[]>(INITIAL_ACCOUNTS);
  const [isLoading, setIsLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('synced');

  // Persist cache to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem('pnt_tx_cache', JSON.stringify(transactions));
  }, [transactions]);

  /**
   * Syncs any pending items from the 'Outbox' to Supabase.
   */
  const flushOutbox = async () => {
    const outbox = JSON.parse(localStorage.getItem('pnt_sync_outbox') || '[]');
    if (outbox.length === 0 || !session?.user?.id) return;

    setSyncStatus('syncing');
    
    // Process transactions in the outbox
    const pendingTxs = outbox.filter((item: any) => item.type === 'transaction');
    
    if (pendingTxs.length > 0) {
      const { error } = await supabase.from('transactions').insert(
        pendingTxs.map((t: any) => ({ ...t.data, user_id: session.user.id }))
      );

      if (!error) {
        // Success: Clear those items from outbox
        const remaining = outbox.filter((item: any) => item.type !== 'transaction');
        localStorage.setItem('pnt_sync_outbox', JSON.stringify(remaining));
        setSyncStatus('synced');
      } else {
        // Failure: Update retry count
        const updated = outbox.map((item: any) => {
          if (item.type === 'transaction') return { ...item, retries: (item.retries || 0) + 1 };
          return item;
        }).filter((item: any) => (item.retries || 0) < 10);
        
        localStorage.setItem('pnt_sync_outbox', JSON.stringify(updated));
        setSyncStatus('error');
      }
    }
  };

  /**
   * Background task: Attempt to sync outbox every 10 minutes or on app load.
   */
  useEffect(() => {
    if (session) {
      flushOutbox();
      const interval = setInterval(flushOutbox, 10 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [session]);

  const fetchData = async () => {
    if (!session?.user?.id) return;
    setIsLoading(true);
    try {
      const { data: txData } = await supabase
        .from('transactions')
        .select('id, amount, category, date, notes, merchant, type, user_id')
        .eq('user_id', session.user.id)
        .order('date', { ascending: false });

      if (txData) setTransactions(txData);

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

  const saveTransaction = async (tx: any) => {
    const newTx = { ...tx, id: crypto.randomUUID(), user_id: session?.user?.id };
    
    // 1. Immediate UI Update
    setTransactions(prev => [newTx, ...prev]);

    // 2. Queue for Background Sync
    const outbox = JSON.parse(localStorage.getItem('pnt_sync_outbox') || '[]');
    localStorage.setItem('pnt_sync_outbox', JSON.stringify([...outbox, { type: 'transaction', data: newTx, retries: 0 }]));
    
    // 3. Trigger immediate flush
    flushOutbox();
  };

  const saveAccount = async (acc: any) => {
    if (!session?.user?.id) return;
    const newAcc = { 
      id: crypto.randomUUID(),
      user_id: session.user.id,
      name: acc.name,
      institution: acc.institution,
      balance: acc.balance,
      type: acc.type
    };

    setAccounts(prev => [...prev, { ...newAcc, initialBalance: acc.balance }]);
    await supabase.from('accounts').insert(newAcc);
    fetchData();
  };

  const saveTransactionsBulk = async (txs: any[]) => {
    if (!session?.user?.id) return;
    const newTxs = txs.map(tx => ({ ...tx, user_id: session.user.id, id: crypto.randomUUID() }));
    setTransactions(prev => [...newTxs, ...prev]);

    const outbox = JSON.parse(localStorage.getItem('pnt_sync_outbox') || '[]');
    const items = newTxs.map(tx => ({ type: 'transaction', data: tx, retries: 0 }));
    localStorage.setItem('pnt_sync_outbox', JSON.stringify([...outbox, ...items]));
    
    flushOutbox();
  };

  return {
    transactions,
    accounts,
    isLoading,
    syncStatus,
    saveTransaction,
    saveTransactionsBulk,
    saveAccount,
    refresh: fetchData,
    forceSync: flushOutbox
  };
};
