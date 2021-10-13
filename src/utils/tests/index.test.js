import { fomatCurrency } from '../index';

describe('fomatCurrency', () => {
  it('formats the amount correctly', () => {
    /**
     * NumberFormat use normal non-breaking space beforece currency (\xa0)
     */
    expect(fomatCurrency(120000, 'EUR')).toEqual('€ EUR\xa0120,000.00');
    expect(fomatCurrency(200000, 'USD')).toEqual('$ USD\xa0200,000.00');
    expect(fomatCurrency(80000, 'GBP')).toEqual('£ GBP\xa080,000.00');
    expect(fomatCurrency(3, 'USD')).toEqual('$ USD\xa03.00');
    expect(fomatCurrency(1234, 'EUR')).toEqual('€ EUR\xa01,234.00');
  });
});
