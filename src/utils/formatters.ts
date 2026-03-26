/**
 * Currency and Date formatting utility functions.
 * Follows Google-style documentation and clean code standards.
 */

/**
 * Formats a currency value as Indian Rupee (INR).
 * @param amount - The numeric value to format.
 * @returns A formatted string prefixed with ₹.
 */
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Standardizes a raw date string into a user-friendly "MMM D, YYYY" format.
 * @param dateStr - The ISO or date string to format.
 * @returns A human-readable date string.
 */
export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Retrieves the day of the week from a given date.
 * @param dateStr - The input date string.
 * @returns The full name of the day (e.g., "Monday").
 */
export const getDayName = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long' });
};
