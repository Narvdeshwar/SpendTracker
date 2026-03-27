import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Category } from '../types';
import { useAppData } from './useAppData';

/**
 * Centered application state orchestrator.
 * This hook is the 'brain' of App.tsx, handling:
 * 1. Authentication lifecycle (session tracking via Supabase).
 * 2. Navigation state (activeTab, show modals/pages).
 * 3. Feature interactions (transaction/account saves).
 * 4. Data distribution (passing transactions/accounts to components).
 */

export const useApp = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAdd, setShowAdd] = useState(false);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [activeQuickCat, setActiveQuickCat] = useState<Category | null>(null);

  /**
   * Syncs Supabase session with the internal React state.
   */
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { 
    transactions, 
    accounts,
    isLoading, 
    saveTransaction, 
    saveTransactionsBulk,
    saveAccount,
    deleteTransaction,
    updateTransaction,
    updateProfile

  } = useAppData(session);

  const [selectedTxForEdit, setSelectedTxForEdit] = useState<any>(null);

  /**
   * Proxies bulk transaction saving.
   */
  const handleSaveBulk = async (txs: any[]) => {
    await saveTransactionsBulk(txs);
  };

  /**
   * Handles tab change and resets global page states (like export view).
   */
  const handleTabChange = (tab: string) => {
    if (tab === 'add') {
      setShowAdd(true);
      setSelectedTxForEdit(null); // Ensure we're adding blank
    } else {
      setActiveTab(tab);
      setShowExport(false);
    }
  };

  /**
   * Proxies transaction saving and UI state cleanup.
   * Now handles both INSERT and UPDATE based on whether tx.id already exists.
   */
  const handleSaveTransaction = async (tx: any) => {
    if (selectedTxForEdit) {
      await updateTransaction({ ...tx, id: selectedTxForEdit.id });
    } else {
      await saveTransaction(tx);
      // Remember last payment source for next entry
      localStorage.setItem('pnt_last_account', tx.account_id);
    }
    setShowAdd(false);
    setSelectedTxForEdit(null);
    setActiveQuickCat(null);
  };

  /**
   * Opens the entry screen in 'Edit' mode.
   */
  const handleEditTransaction = (tx: any) => {
    setSelectedTxForEdit(tx);
    setShowAdd(true);
  };

  /**
   * Proxies account saving.
   */
  const handleSaveAccount = async (acc: any) => {
    await saveAccount(acc);
    setShowAddAccount(false);
  };

  /**
   * Triggers the drawer with a specific category pre-selected.
   */
  const handleQuickAdd = (cat: Category) => {
    setActiveQuickCat(cat);
    setShowAdd(true);
  };

  const categories: Category[] = ['Dining', 'Retail', 'Travel', 'Home', 'Groceries', 'Entertainment', 'Transport'];

  return {
    session,
    activeTab,
    setActiveTab,
    showAdd,
    setShowAdd,
    showAddAccount,
    setShowAddAccount,
    showUser,
    setShowUser,
    showExport,
    setShowExport,
    activeQuickCat,
    setActiveQuickCat,
    transactions,
    accounts,
    isLoading,
    handleTabChange,
    handleSaveTransaction,
    handleSaveAccount,
    handleSaveBulk,
    handleQuickAdd,
    deleteTransaction,
    handleEditTransaction,
    updateProfile,
    selectedTxForEdit,
    categories

  };
};

