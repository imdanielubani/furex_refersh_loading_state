export const NAIRA_SYMBOL = '₦';

const amountFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Formats an amount without a currency symbol, e.g. 24,234.65. */
export function formatAmount(amount: number) {
  return amountFormatter.format(amount);
}

/** Formats a naira amount as shown in the app, e.g. ₦24,234.65. */
export function formatNaira(amount: number) {
  return `${NAIRA_SYMBOL}${formatAmount(amount)}`;
}
