import { test, expect } from '../../fixtures/page-fixtures';

test.describe('Checkout Regression', () => {
  test('User can place order without filling fields (Bug discovery)', async ({
    checkoutPage,
    orderConfirmationPage,
  }) => {
    // Navigating directly to checkout
    await checkoutPage.navigate('/checkout');
    
    // We do NOT fill the shipping details, testing if validation exists
    // The static app currently doesn't have validation, so this will pass the UI layer
    // but in a real app, we'd expect validation messages.
    await checkoutPage.placeOrder();
    
    // Since it's a static mock, it proceeds. 
    await expect(orderConfirmationPage.confirmationMessage).toBeVisible();
  });
});
