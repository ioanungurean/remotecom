export const fomatCurrency = (amount, currency) => {
  const formattedCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'code',
    minimumFractionDigits: 2,
  }).format(amount);

  const symbol = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
  })
    .formatToParts(amount)
    .filter(({ type }) => type === 'currency')
    .map(({ value }) => value)
    .toString();

  return `${symbol} ${formattedCurrency}`;
};
