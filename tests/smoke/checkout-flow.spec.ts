import { test, expect } from '../../fixtures/page-fixtures';

test.describe('Checkout Flow (Smoke)', () => {
  test('Guest user can successfully checkout with one item', async ({
    productListingPage,
    cartPage,
    checkoutPage,
    orderConfirmationPage,
  }) => {
    await productListingPage.navigate('/products');
    await productListingPage.addProductToCart('Awesome T-Shirt');
    
    await productListingPage.navbar.goToCart();
    
    await expect(cartPage.totalText).toBeVisible();
    await cartPage.proceedToCheckout();
    
    await expect(checkoutPage.page).toHaveURL(/.*checkout/);
    await checkoutPage.fillShippingDetails('John', 'Doe', '123 Test St');
    await checkoutPage.placeOrder();
    
    await expect(orderConfirmationPage.confirmationMessage).toBeVisible();
    const orderNum = await orderConfirmationPage.getOrderNumber();
    expect(orderNum).toBeTruthy();
  });
});
