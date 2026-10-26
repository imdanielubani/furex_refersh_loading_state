const amountFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Formats a naira amount as shown in the app, e.g. ₦24,234.65. */
export function formatNaira(amount: number) {
  return `₦${amountFormatter.format(amount)}`;
}
