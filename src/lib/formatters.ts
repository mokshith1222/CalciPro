/**
 * Formats a number as Indian Rupees (₹)
 */
export const formatCurrency = (amount: number | undefined | null): string => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₹0'; // Default value for invalid numbers
  }
  return amount.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });
};

/**
 * Formats a number with Indian locale commas
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-IN');
};