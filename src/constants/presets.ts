import { Expense, ExtractedReceiptData } from '../types/expense';

export const INITIAL_RECENT_EXPENSES: Expense[] = [
  {
    id: 'exp-1',
    merchantName: 'Cafe Kumbuk',
    date: 'Today, 10:42 AM',
    category: 'Food & Dining',
    items: [
      { id: 'item-1', name: 'Avocado toast', price: 14.00 },
      { id: 'item-2', name: 'Cappuccino', price: 6.50 },
      { id: 'item-3', name: 'Banana pancakes', price: 8.00 },
    ],
    totalAmount: 28.50,
    createdAt: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
  },
  {
    id: 'exp-2',
    merchantName: 'Keells Super',
    date: 'Yesterday, 6:18 PM',
    category: 'Groceries',
    items: [
      { id: 'item-2-1', name: 'Organic Milk 1L', price: 4.50 },
      { id: 'item-2-2', name: 'Whole Wheat Bread', price: 3.70 },
      { id: 'item-2-3', name: 'Olive Oil Extra Virgin', price: 19.00 },
      { id: 'item-2-4', name: 'Free-range Eggs 12pk', price: 7.00 },
      { id: 'item-2-5', name: 'Fresh Salmon Fillet', price: 30.00 },
    ],
    totalAmount: 64.20,
    createdAt: Date.now() - 1000 * 60 * 60 * 26, // yesterday
  },
  {
    id: 'exp-3',
    merchantName: 'Uber',
    date: 'Nov 22, 2026',
    category: 'Transport',
    items: [
      { id: 'item-3-1', name: 'Ride to Colombo City Center', price: 12.80 },
    ],
    totalAmount: 12.80,
    createdAt: Date.now() - 1000 * 60 * 60 * 48,
  },
  {
    id: 'exp-4',
    merchantName: 'The Good Market',
    date: 'Nov 21, 2026',
    category: 'Shopping',
    items: [
      { id: 'item-4-1', name: 'Handmade Coconut Bowl', price: 15.00 },
      { id: 'item-4-2', name: 'Wild Flower Honey 250g', price: 20.00 },
    ],
    totalAmount: 35.00,
    createdAt: Date.now() - 1000 * 60 * 60 * 72,
  },
];

export const SAMPLE_RECEIPT_PRESETS: ExtractedReceiptData[] = [
  {
    merchantName: 'Cafe Kumbuk',
    date: 'Nov 24, 2026',
    category: 'Food & Dining',
    items: [
      { id: 'preset-1', name: 'Avocado toast', price: 14.00 },
      { id: 'preset-2', name: 'Cappuccino', price: 6.50 },
      { id: 'preset-3', name: 'Banana pancakes', price: 8.00 },
    ],
    totalAmount: 28.50,
  },
  {
    merchantName: 'Keells Super',
    date: 'Nov 24, 2026',
    category: 'Groceries',
    items: [
      { id: 'preset-4', name: 'Fresh Organic Milk', price: 4.50 },
      { id: 'preset-5', name: 'Brown Sliced Bread', price: 3.20 },
      { id: 'preset-6', name: 'Olive Oil 500ml', price: 18.50 },
      { id: 'preset-7', name: 'Fresh Strawberries', price: 8.00 },
      { id: 'preset-8', name: 'Greek Yogurt 500g', price: 6.00 },
      { id: 'preset-9', name: 'Chicken Breast 1kg', price: 24.00 },
    ],
    totalAmount: 64.20,
  },
  {
    merchantName: 'Blue Bottle Coffee',
    date: 'Nov 24, 2026',
    category: 'Food & Dining',
    items: [
      { id: 'preset-10', name: 'Hayes Valley Espresso', price: 4.75 },
      { id: 'preset-11', name: 'Almond Croissant', price: 5.50 },
      { id: 'preset-12', name: 'Cold Brew Oat Latte', price: 6.25 },
    ],
    totalAmount: 16.50,
  },
];

