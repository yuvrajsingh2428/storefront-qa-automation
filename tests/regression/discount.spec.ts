import { test, expect } from '../../fixtures/page-fixtures';
import { CurrencyHelper } from '../../utils/currency-helper';

test.describe('Discount Feature', () => {
  test('Valid discount code reduces total', async ({ productListingPage, cartPage }) => {
    await productListingPage.navigate('/products');
    await productListingPage.addProductToCart('Luxury Watch');
    
    await productListingPage.navbar.goToCart();
    
    const subtotalText = await cartPage.subtotalText.textContent();
    const subtotal = CurrencyHelper.parseCurrencyToFloat(subtotalText || '0');
    
    // In mock app, any code might work, using a generic one
    await cartPage.applyDiscount('DISCOUNT10');
    
    const totalText = await cartPage.totalText.textContent();
    const total = CurrencyHelper.parseCurrencyToFloat(totalText || '0');
    
    expect(total).toBeLessThan(subtotal);
  });
});
