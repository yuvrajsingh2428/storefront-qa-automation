import { test, expect } from '../../fixtures/page-fixtures';

test.describe('Cart Badge Updates - Regression', () => {
  test('Cart badge updates accurately', async ({ productListingPage }) => {
    await productListingPage.navigate('/products');
    
    let count = await productListingPage.navbar.getCartCount();
    expect(count).toBe(0);
    
    await productListingPage.addProductToCart('Luxury Watch');
    
    count = await productListingPage.navbar.getCartCount();
    expect(count).toBe(1);
    
    await productListingPage.addProductToCart('Expensive Jacket');
    
    count = await productListingPage.navbar.getCartCount();
    expect(count).toBe(2);
  });
});
