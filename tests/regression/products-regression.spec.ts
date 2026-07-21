import { test, expect } from '../../fixtures/page-fixtures';

test.describe('Products Regression', () => {
  test('All products display correctly', async ({ productListingPage }) => {
    await productListingPage.navigate('/products');
    
    // Verify specific products exist on the page
    const products = ['Awesome T-Shirt', 'Premium Sneakers', 'Expensive Jacket', 'Luxury Watch'];
    
    for (const product of products) {
      const card = productListingPage.getProductCard(product);
      await expect(card).toBeVisible();
      
      // Verify price is visible within the card
      await expect(card.locator('.product-price')).toBeVisible();
    }
  });

  test('Adding multiple products to cart increments the badge correctly', async ({ productListingPage }) => {
    await productListingPage.navigate('/products');
    
    const cartBadge = productListingPage.navbar.cartBadge;
    
    // Initial badge count is 0 in the products HTML
    await expect(cartBadge).toHaveText('0');
    
    await productListingPage.addProductToCart('Awesome T-Shirt');
    await expect(cartBadge).toHaveText('1');

    await productListingPage.addProductToCart('Premium Sneakers');
    await expect(cartBadge).toHaveText('2');
  });
});
