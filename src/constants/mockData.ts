import { Transaction, Account } from '../types';

/**
 * Static dummy data for initial hydration when backend is unreachable or new session starts.
 * These are the baseline snapshots for UI previews.
 */

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', amount: 450, category: 'Dining', date: '2026-03-22', merchant: 'Blue Tokai Coffee', type: 'debit', notes: 'Lunch', account_id: '1' },
  { id: '2', amount: 1200, category: 'Retail', date: '2026-03-21', merchant: 'ZARA India', type: 'debit', notes: 'Wardrobe update', account_id: '1' },
  { id: '3', amount: 24000, category: 'Home', date: '2026-03-15', merchant: 'DLF Rent', type: 'debit', notes: 'Monthly rent', account_id: '1' },
];

export const INITIAL_ACCOUNTS: Account[] = [
  { id: '1', name: 'Primary HDFC', institution: 'HDFC Bank', balance: 145000, initialBalance: 120000, type: 'checking' },
  { id: '2', name: 'Groww Investments', institution: 'Groww', balance: 450000, initialBalance: 380000, type: 'investment' },
  { id: '3', name: 'Cash Wallet', institution: 'Physical Cash', balance: 5000, initialBalance: 5000, type: 'cash' },
];
