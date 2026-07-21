import { test as baseTest } from '@playwright/test';
import { ProductListingPage } from '../pages/product-listing-page';
import { CartPage } from '../pages/cart-page';
import { CheckoutPage } from '../pages/checkout-page';
import { OrderConfirmationPage } from '../pages/order-confirmation-page';

type MyFixtures = {
  productListingPage: ProductListingPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  orderConfirmationPage: OrderConfirmationPage;
};

export const test = baseTest.extend<MyFixtures>({
  page: async ({ page }, use) => {
    await page.route('**/products', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: `
          <html>
            <body>
              <div class="navbar">
                <input placeholder="Search products..." />
                <button>Search</button>
                <a href="/cart" id="cart-link">Cart</a>
                <span data-testid="cart-badge">0</span>
              </div>
              <div data-testid="global-loader" style="display:none;"></div>
              <div class="product-card">
                Awesome T-Shirt
                <button>Add to Cart</button>
              </div>
              <div class="product-card">
                Expensive Jacket
                <button>Add to Cart</button>
              </div>
            </body>
            <script>
              document.querySelectorAll('.product-card button').forEach(btn => {
                btn.onclick = () => {
                  document.querySelector('[data-testid="global-loader"]').style.display = 'block';
                  setTimeout(() => {
                    document.querySelector('[data-testid="global-loader"]').style.display = 'none';
                    const badge = document.querySelector('[data-testid="cart-badge"]');
                    badge.textContent = parseInt(badge.textContent) + 1;
                  }, 500);
                };
              });
              document.getElementById('cart-link').onclick = (e) => {
                e.preventDefault();
                window.location.href = '/cart';
              };
            </script>
          </html>
        `
      });
    });

    await page.route('**/cart', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: `
          <html>
            <body>
              <span data-testid="subtotal-amount">$200.00</span>
              <span data-testid="total-amount">$200.00</span>
              <button id="checkout-btn">Proceed to Checkout</button>
              <input placeholder="Discount Code" />
              <button id="apply-btn">Apply</button>
              <div data-testid="global-loader" style="display:none;"></div>
            </body>
            <script>
              const applyBtn = document.getElementById('apply-btn');
              applyBtn.onclick = () => {
                document.querySelector('[data-testid="global-loader"]').style.display = 'block';
                setTimeout(() => {
                  document.querySelector('[data-testid="global-loader"]').style.display = 'none';
                  const input = document.querySelector('input').value;
                  if (input === 'SUMMER20') {
                    document.querySelector('[data-testid="total-amount"]').textContent = '$160.00';
                  }
                }, 500);
              };
              document.getElementById('checkout-btn').onclick = () => {
                window.location.href = '/checkout';
              };
            </script>
          </html>
        `
      });
    });

    await page.route('**/checkout', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: `
          <html>
            <body>
              <label for="first-name">First Name</label><input id="first-name" />
              <label for="last-name">Last Name</label><input id="last-name" />
              <label for="address">Address</label><input id="address" />
              <button onclick="window.location.href='/order-confirmation'">Place Order</button>
            </body>
          </html>
        `
      });
    });

    await page.route('**/order-confirmation', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: `
          <html>
            <body>
              <h1>Order Confirmed</h1>
              <span data-testid="order-number">ORD-12345</span>
            </body>
          </html>
        `
      });
    });

    await use(page);
  },
  productListingPage: async ({ page }, use) => {
    await use(new ProductListingPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  orderConfirmationPage: async ({ page }, use) => {
    await use(new OrderConfirmationPage(page));
  },
});

export { expect } from '@playwright/test';
