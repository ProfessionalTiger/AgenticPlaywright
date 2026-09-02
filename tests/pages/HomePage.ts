import { expect, Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  async selectProduct(productName: string) {
    await this.page.getByRole('link', { name: productName }).click();
    await expect(this.page).toHaveURL(/prod\.html\?idp_=/);
  }

  async openCart() {
    const cartResponse = this.page.waitForResponse(response => response.url().includes('/viewcart'));
    await this.page.getByRole('link', { name: 'Cart', exact: true }).click();
    await expect(this.page).toHaveURL(/cart\.html/);
    await cartResponse;
  }
}
