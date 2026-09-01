import { expect, Page } from '@playwright/test';

export class ProductPage {
  constructor(private readonly page: Page) {}

  private get productName() { return this.page.getByRole('heading', { level: 2 }); }
  private get productPrice() { return this.page.getByRole('heading', { level: 3 }); }
  private get productDescription() { return this.page.locator('#more-information'); }

  async expectProduct(name: string, price: number) {
    await expect(this.productName).toHaveText(name);
    await expect(this.productPrice).toContainText(`$${price}`);
    await expect(this.productDescription).toBeVisible();
  }

  async addToCart() {
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.page.getByRole('link', { name: 'Add to cart' }).click();
    const dialog = await dialogPromise;
    expect(dialog.type()).toBe('alert');
    await dialog.accept();
  }
}
