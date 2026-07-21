import { test, expect } from '../../fixtures/page-fixtures';
import { CurrencyHelper } from '../../utils/currency-helper';

test.describe('Discount Validation (Regression)', () => {
  test('Valid discount code reduces total correctly', async ({
    productListingPage,
    cartPage,
  }) => {
    await productListingPage.navigate('/products');
    await productListingPage.addProductToCart('Expensive Jacket');
    await productListingPage.navbar.goToCart();
    
    await expect(cartPage.totalText).not.toBeEmpty();
    const initialTotalText = await cartPage.totalText.textContent() || '0';
    const initialTotal = CurrencyHelper.parseCurrencyToFloat(initialTotalText);
    
    await cartPage.applyDiscount('SUMMER20');
    
    // Auto-retry until the total text changes
    await expect(cartPage.totalText).not.toHaveText(initialTotalText);
    
    const newTotalText = await cartPage.totalText.textContent() || '0';
    const newTotal = CurrencyHelper.parseCurrencyToFloat(newTotalText);
    
    expect(newTotal).toBeLessThan(initialTotal);
  });
});
