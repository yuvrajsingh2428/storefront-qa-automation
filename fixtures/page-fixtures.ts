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
