import { Locator } from '@playwright/test';
import { BasePage } from '../base/base-page';

export class NavbarComponent extends BasePage {
  readonly searchInput: Locator = this.page.getByPlaceholder('Search products...');
  readonly searchButton: Locator = this.page.getByRole('button', { name: 'Search' });
  readonly cartBadge: Locator = this.page.getByTestId('cart-badge');
  readonly cartLink: Locator = this.page.getByRole('link', { name: 'Cart' });

  async searchFor(term: string) {
    await this.fill(this.searchInput, term);
    await this.click(this.searchButton);
  }

  async goToCart() {
    await this.click(this.cartLink);
    await this.waitForPageLoad();
  }

  async getCartCount(): Promise<number> {
    const text = await this.cartBadge.textContent();
    return text ? parseInt(text, 10) : 0;
  }
}
