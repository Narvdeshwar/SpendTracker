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
    
    // 1. Process transactions in the outbox
    const pendingTxs = outbox.filter((item: any) => item.type === 'transaction');
    if (pendingTxs.length > 0) {
      const { error } = await supabase.from('transactions').insert(
        pendingTxs.map((t: any) => ({ ...t.data, user_id: session.user.id }))
      );
      if (!error) {
        const remaining = outbox.filter((item: any) => item.type !== 'transaction');
        localStorage.setItem('pnt_sync_outbox', JSON.stringify(remaining));
      }
    }

    // 2. Process account updates in the outbox
    const pendingAccs = outbox.filter((item: any) => item.type === 'account_update');
    for (const update of pendingAccs) {
      const { error } = await supabase.from('accounts').update(update.data).eq('id', update.account_id);
      if (!error) {
        const currentOutbox = JSON.parse(localStorage.getItem('pnt_sync_outbox') || '[]');
        const updatedOutbox = currentOutbox.filter((item: any) => !(item.type === 'account_update' && item.account_id === update.account_id));
        localStorage.setItem('pnt_sync_outbox', JSON.stringify(updatedOutbox));
      }
    }
    
    setSyncStatus('synced');
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
        .select('id, amount, category, date, notes, merchant, type, user_id, account_id')
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
    const currentAcc = accounts.find(a => a.id === tx.account_id);
    if (!currentAcc) return;

    const newBalance = currentAcc.balance - tx.amount;

    // 1. Immediate UI Updates (Double-Entry)
    setTransactions(prev => [newTx, ...prev]);
    setAccounts(prev => prev.map(acc => 
      acc.id === tx.account_id ? { ...acc, balance: newBalance } : acc
    ));

    // 2. Queue for Background Sync
    const outbox = JSON.parse(localStorage.getItem('pnt_sync_outbox') || '[]');
    const items = [
      { type: 'transaction', data: newTx, retries: 0 },
      { type: 'account_update', account_id: tx.account_id, data: { balance: newBalance }, retries: 0 }
    ];
    localStorage.setItem('pnt_sync_outbox', JSON.stringify([...outbox, ...items]));
    
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

  const deleteTransaction = async (id: string) => {
    const tx = transactions.find(t => t.id === id);
    if (!tx || !session?.user?.id) return;

    // 1. Calculate inverse balance change
    const currentAcc = accounts.find(a => a.id === tx.account_id);
    if (currentAcc) {
      const newBalance = tx.type === 'debit' ? currentAcc.balance + tx.amount : currentAcc.balance - tx.amount;
      setAccounts(prev => prev.map(acc => 
        acc.id === tx.account_id ? { ...acc, balance: newBalance } : acc
      ));
      // Update balance in Supabase
      await supabase.from('accounts').update({ balance: newBalance }).eq('id', tx.account_id);
    }

    // 2. Remove locally
    setTransactions(prev => prev.filter(t => t.id !== id));

    // 3. Remove from Supabase
    await supabase.from('transactions').delete().eq('id', id);
  };

  const updateTransaction = async (updatedTx: Transaction) => {
    const oldTx = transactions.find(t => t.id === updatedTx.id);
    if (!oldTx || !session?.user?.id) return;

    // 1. Handle balance reconciliation if amount changed
    const currentAcc = accounts.find(a => a.id === updatedTx.account_id);
    if (currentAcc && oldTx.amount !== updatedTx.amount) {
      const difference = updatedTx.amount - oldTx.amount;
      const newBalance = updatedTx.type === 'debit' ? currentAcc.balance - difference : currentAcc.balance + difference;
      
      setAccounts(prev => prev.map(acc => 
        acc.id === updatedTx.account_id ? { ...acc, balance: newBalance } : acc
      ));
      await supabase.from('accounts').update({ balance: newBalance }).eq('id', updatedTx.account_id);
    }

    // 2. Update locally
    setTransactions(prev => prev.map(t => t.id === updatedTx.id ? updatedTx : t));

    // 3. Update in Supabase
    await supabase.from('transactions').update(updatedTx).eq('id', updatedTx.id);
  };

  const updateProfile = async (name: string) => {
    if (!session?.user?.id) return;
    const { error } = await supabase.auth.updateUser({
      data: { full_name: name }
    });
    if (!error) {
      // Trigger a session refresh (handled automatically by onAuthStateChange in useApp)
      alert("Profile updated successfully!");
    } else {
      alert("Error updating profile: " + error.message);
    }
  };

  return {
    transactions,
    accounts,
    isLoading,
    syncStatus,
    saveTransaction,
    saveTransactionsBulk,
    saveAccount,
    deleteTransaction,
    updateTransaction,
    updateProfile,
    refresh: fetchData,
    forceSync: flushOutbox
  };
};

