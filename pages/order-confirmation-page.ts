import { Locator } from '@playwright/test';
import { BasePage } from './base/base-page';

export class OrderConfirmationPage extends BasePage {
  readonly confirmationMessage: Locator = this.page.getByRole('heading', { name: 'Order Confirmed' });
  readonly orderNumber: Locator = this.page.getByTestId('order-number');

  async getOrderNumber(): Promise<string | null> {
    return await this.orderNumber.textContent();
  }
}
