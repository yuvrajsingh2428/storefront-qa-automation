import { test, expect } from '../../fixtures/page-fixtures';

test.describe('Cart Updates (Sanity)', () => {
  test('Cart badge updates accurately when adding products', async ({
    productListingPage,
  }) => {
    await productListingPage.navigate('/products');
    
    // Initially 0
    await expect(productListingPage.navbar.cartBadge).toHaveText('0');
    
    await productListingPage.addProductToCart('Awesome T-Shirt');
    
    // Should be 1
    await expect(productListingPage.navbar.cartBadge).toHaveText('1');
  });
});
