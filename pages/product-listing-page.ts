import { Locator } from '@playwright/test';
import { BasePage } from './base/base-page';
import { NavbarComponent } from './components/navbar-component';

export class ProductListingPage extends BasePage {
  readonly navbar = new NavbarComponent(this.page);
  
  getProductCard(productName: string): Locator {
    return this.page.locator('.product-card').filter({ hasText: productName });
  }

  async addProductToCart(productName: string) {
    const card = this.getProductCard(productName);
    const addToCartBtn = card.getByRole('button', { name: 'Add to Cart' });
    await this.click(addToCartBtn);
  }
}
