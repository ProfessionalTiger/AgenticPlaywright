import { expect, Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  private get total() { return this.page.locator('#totalp'); }

  async expectProduct(productName: string, price: number) {
    const row = this.page.locator('#tbodyid tr').filter({ hasText: productName }).first();
    await expect(row).toContainText(productName);
    await expect(row.locator('td').nth(2)).toHaveText(String(price));
  }

  async expectTotal(total: number) {
    await expect(this.total).toHaveText(String(total));
  }

  async expectEmptyTotal() {
    await expect(this.total).toBeEmpty();
  }

  async clear() {
    const rows = this.page.locator('#tbodyid tr');

    while (await rows.count() > 0) {
      const row = rows.first();
      const deleteResponse = this.page.waitForResponse(response => response.url().includes('/deleteitem'));
      const cartResponse = this.page.waitForResponse(response => response.url().includes('/viewcart'));
      await row.getByRole('link', { name: 'Delete' }).click();
      await deleteResponse;
      await cartResponse;
      await expect(row).toHaveCount(0);
    }

    await expect(this.total).toBeEmpty();
  }

  async removeProduct(productName: string) {
    const row = this.page.locator('#tbodyid tr').filter({ hasText: productName }).first();
    await row.getByRole('link', { name: 'Delete' }).click();
    await expect(row).toHaveCount(0);
  }

  async placeOrder() {
    await this.page.getByRole('button', { name: 'Place Order' }).click();
  }
}
