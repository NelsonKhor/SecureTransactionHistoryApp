import { TransactionType } from '../components/models';
import { TransactionItemProps } from '../components/TransactionItem';

/**
 * Generate random transaction data
 * For demo purposes only
 */
export function generateTransactionData(): TransactionItemProps {
  const id = Math.floor(Math.random() * 900) + 100;
  const amount = Math.floor(Math.random() * 99) + 1;
  const date = new Date().toISOString().split('T')[0];
  const description = ['Grocery', 'Transport', 'Food', 'Clothing'][
    Math.floor(Math.random() * 5)
  ];
  const type = TransactionType.debit;
  return { id, amount, date, description, type };
}
