import { LineItem } from '../types/expense';

/**
 * Calculates total amount in cents to completely prevent JavaScript floating-point errors.
 * Example: 14.00 + 6.50 + 8.00 = 28.50 without trailing 0.000000000000004
 */
export function calculateTotalAmount(items: LineItem[]): number {
  const totalCents = items.reduce((acc, item) => {
    const priceNum = typeof item.price === 'number' ? item.price : parseFloat(String(item.price)) || 0;
    const cents = Math.round(priceNum * 100);
    return acc + (isNaN(cents) ? 0 : cents);
  }, 0);

  return totalCents / 100;
}

/**
 * Formats a numeric amount to clean currency string e.g. "$28.50"
 */
export function formatCurrency(amount: number): string {
  const valid = isNaN(amount) ? 0 : amount;
  return `$${valid.toFixed(2)}`;
}

/**
 * Formats a Date object to "MMM D, YYYY" e.g. "Nov 24, 2026"
 */
export function formatDisplayDate(date: Date = new Date()): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

