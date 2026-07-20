export class CurrencyHelper {
  static parseCurrencyToFloat(currencyString: string): number {
    const cleanString = currencyString.replace(/[^0-9.-]+/g, '');
    return parseFloat(cleanString);
  }

  static formatFloatToCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }
}
