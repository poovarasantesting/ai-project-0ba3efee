export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: TransactionType;
}

export interface CategoryTotal {
  category: string;
  amount: number;
}

export interface MonthlyTotal {
  income: number;
  expense: number;
  balance: number;
}