import { test, expect } from '../../fixtures/page-fixtures';

test.describe('Checkout Flow - Regression', () => {
  test('Guest user can complete checkout', async ({ productListingPage, cartPage, checkoutPage, orderConfirmationPage }) => {
    await productListingPage.navigate('/products');
    await productListingPage.addProductToCart('Expensive Jacket');
    
    await productListingPage.navbar.goToCart();
    
    await cartPage.proceedToCheckout();
    
    await checkoutPage.fillShippingDetails('Jane', 'Smith', '456 QA Ave');
    await checkoutPage.placeOrder();
    
    await expect(orderConfirmationPage.confirmationMessage).toBeVisible();
    
    const orderNumber = await orderConfirmationPage.getOrderNumber();
    expect(orderNumber).toBeTruthy();
    expect(orderNumber?.length).toBeGreaterThan(0);
  });
});
