import { Transaction } from '../types';

export const initialTransactions: Transaction[] = [
  {
    id: '1',
    amount: 3500,
    description: 'Monthly Salary',
    category: 'Salary',
    date: '2025-04-01',
    type: 'income',
  },
  {
    id: '2',
    amount: 50,
    description: 'Dinner with friends',
    category: 'Food',
    date: '2025-04-10',
    type: 'expense',
  },
  {
    id: '3',
    amount: 100,
    description: 'Electricity bill',
    category: 'Utilities',
    date: '2025-04-15',
    type: 'expense',
  },
  {
    id: '4',
    amount: 200,
    description: 'Freelance work',
    category: 'Side Income',
    date: '2025-04-20',
    type: 'income',
  },
  {
    id: '5',
    amount: 35,
    description: 'Movie night',
    category: 'Entertainment',
    date: '2025-04-22',
    type: 'expense',
  },
];

export const categories = {
  income: ['Salary', 'Side Income', 'Investments', 'Gifts', 'Other'],
  expense: ['Food', 'Rent', 'Transportation', 'Entertainment', 'Utilities', 'Shopping', 'Healthcare', 'Other']
};