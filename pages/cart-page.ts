import { Locator } from '@playwright/test';
import { BasePage } from './base/base-page';
import { NavbarComponent } from './components/navbar-component';

export class CartPage extends BasePage {
  readonly navbar = new NavbarComponent(this.page);
  readonly proceedToCheckoutBtn: Locator = this.page.getByRole('button', { name: 'Proceed to Checkout' });
  readonly discountInput: Locator = this.page.getByPlaceholder('Discount Code');
  readonly applyDiscountBtn: Locator = this.page.getByRole('button', { name: 'Apply' });
  
  readonly subtotalText: Locator = this.page.getByTestId('subtotal-amount');
  readonly totalText: Locator = this.page.getByTestId('total-amount');

  async proceedToCheckout() {
    await this.click(this.proceedToCheckoutBtn);
  }

  async applyDiscount(code: string) {
    await this.fill(this.discountInput, code);
    await this.click(this.applyDiscountBtn);
  }
}
