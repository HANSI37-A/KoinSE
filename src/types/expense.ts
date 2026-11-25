export type ExpenseCategory =
  | 'Food & Dining'
  | 'Groceries'
  | 'Transport'
  | 'Shopping'
  | 'Entertainment'
  | 'Utilities'
  | 'Other';

export interface LineItem {
  id: string;
  name: string;
  price: number; // in dollars (e.g. 14.00)
}

export interface Expense {
  id: string;
  merchantName: string;
  date: string; // Formatted date string (e.g. 'Nov 24, 2026' or 'Today, 10:42 AM')
  rawDate?: string; // ISO date string
  category: ExpenseCategory;
  items: LineItem[];
  totalAmount: number;
  receiptImageUri?: string;
  createdAt: number;
}

export interface ExtractedReceiptData {
  merchantName: string;
  date: string;
  category: ExpenseCategory;
  items: LineItem[];
  totalAmount: number;
  receiptImageUri?: string;
}

