import { test, expect } from '../../fixtures/page-fixtures';

test.describe('Checkout Flow', () => {
  test('Guest user can complete checkout', async ({ productListingPage, cartPage, checkoutPage, orderConfirmationPage }) => {
    await productListingPage.navigate('/products');
    await productListingPage.addProductToCart('Awesome T-Shirt');
    
    await productListingPage.navbar.goToCart();
    
    await cartPage.proceedToCheckout();
    
    await checkoutPage.fillShippingDetails('John', 'Doe', '123 QA Street');
    await checkoutPage.placeOrder();
    
    await expect(orderConfirmationPage.confirmationMessage).toBeVisible();
    
    const orderNumber = await orderConfirmationPage.getOrderNumber();
    expect(orderNumber).toBeTruthy();
    expect(orderNumber?.length).toBeGreaterThan(0);
  });
});
