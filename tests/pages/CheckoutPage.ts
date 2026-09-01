import { expect, Page } from '@playwright/test';

export type OrderDetails = {
  name: string;
  country: string;
  city: string;
  creditCard: string;
  month: string;
  year: string;
};

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  private get modal() { return this.page.locator('#orderModal'); }

  async expectOpen() {
    await expect(this.modal).toBeVisible();
  }

  async completeOrder(order: OrderDetails) {
    await this.page.locator('#name').fill(order.name);
    await this.page.locator('#country').fill(order.country);
    await this.page.locator('#city').fill(order.city);
    await this.page.locator('#card').fill(order.creditCard);
    await this.page.locator('#month').fill(order.month);
    await this.page.locator('#year').fill(order.year);
    await this.modal.getByRole('button', { name: 'Purchase' }).click();
  }

  async expectOrderConfirmation() {
    await expect(this.page.getByText('Thank you for your purchase!')).toBeVisible();
  }
}
