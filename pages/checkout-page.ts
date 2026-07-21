import { Locator } from '@playwright/test';
import { BasePage } from './base/base-page';

export class CheckoutPage extends BasePage {
  readonly placeOrderBtn: Locator = this.page.getByRole('button', { name: 'Place Order' });

  readonly firstNameInput: Locator = this.page.getByLabel('First Name');
  readonly lastNameInput: Locator = this.page.getByLabel('Last Name');
  readonly addressInput: Locator = this.page.getByLabel('Address');

  async fillShippingDetails(firstName: string, lastName: string, address: string) {
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.addressInput, address);
  }

  async placeOrder() {
    await this.click(this.placeOrderBtn);
  }
}
