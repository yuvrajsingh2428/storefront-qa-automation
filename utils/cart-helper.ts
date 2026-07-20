export class CartHelper {
  static calculateSubtotal(prices: number[]): number {
    return prices.reduce((acc, price) => acc + price, 0);
  }

  static calculateExpectedTotal(subtotal: number, taxRate: number, discount: number = 0): number {
    const tax = subtotal * taxRate;
    return subtotal + tax - discount;
  }
}
