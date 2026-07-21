import { test, expect } from '../../fixtures/page-fixtures';

test.describe('Navigation Sanity', () => {
  test('User can navigate between Home, Cart, and Checkout', async ({
    productListingPage,
    cartPage,
    checkoutPage,
  }) => {
    // Start at Home
    await productListingPage.navigate('/');
    
    // Go to Cart
    await productListingPage.navbar.goToCart();
    await expect(cartPage.page).toHaveURL(/.*cart/);

    // Go to Checkout
    await cartPage.proceedToCheckout();
    await expect(checkoutPage.page).toHaveURL(/.*checkout/);

    // Go back to Home via Logo (testing the link in checkout page)
    await checkoutPage.page.locator('.logo').click();
    await expect(productListingPage.page).toHaveURL(/.*\//);
  });
});
