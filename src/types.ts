export type Category = 'Dining' | 'Retail' | 'Travel' | 'Home' | 'Groceries' | 'Entertainment' | 'Transport' | 'Other';
export type Format = 'CSV' | 'JSON';


export interface Transaction {
  id: string;
  amount: number;
  category: Category;
  date: string;
  notes?: string;
  merchant: string;
  type: 'debit' | 'credit';
  account_id: string;
}

export interface Budget {
  category: Category | 'Total';
  limit: number;
  spent: number;
  color?: string;
}

export interface Account {
  id: string;
  name: string;
  institution: string;
  balance: number;
  initialBalance?: number;
  type: 'checking' | 'savings' | 'investment' | 'crypto' | 'cash';
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  type: 'saving' | 'insight' | 'alert';
}
