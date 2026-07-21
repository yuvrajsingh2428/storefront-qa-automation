import { test, expect } from '../../fixtures/page-fixtures';

test.describe('Cart Sanity', () => {
  test('Discount code SUMMER20 applies correctly', async ({
    productListingPage,
    cartPage,
  }) => {
    // Navigating directly to cart as static app has hardcoded items in cart
    await cartPage.navigate('/cart');
    
    // Check initial total
    await expect(cartPage.totalText).toHaveText('$200.00');

    // Apply valid discount
    await cartPage.applyDiscount('SUMMER20');

    // Verify discount applied successfully
    await expect(cartPage.page.locator('#discount-message')).toBeVisible();
    await expect(cartPage.totalText).toHaveText('$160.00');
  });

  test('Invalid discount code does not apply', async ({
    productListingPage,
    cartPage,
  }) => {
    await cartPage.navigate('/cart');
    
    // Apply invalid discount
    await cartPage.applyDiscount('INVALID');

    // Verify discount message is not visible and total is unchanged
    await expect(cartPage.page.locator('#discount-message')).not.toBeVisible();
    await expect(cartPage.totalText).toHaveText('$200.00');
  });
});
