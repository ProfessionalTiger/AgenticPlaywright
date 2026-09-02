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

    const response = await cartResponse;
    await response.finished();

    const cartBody = this.page.locator('#tbodyid');
    let previousMarkup = '';
    let stablePolls = 0;

    await expect.poll(async () => {
      const markup = await cartBody.innerHTML();
      if (markup === previousMarkup) {
        stablePolls += 1;
      } else {
        previousMarkup = markup;
        stablePolls = 0;
      }
      return stablePolls;
    }, { timeout: 5000, intervals: [100, 200, 500, 1000] }).toBeGreaterThanOrEqual(3);
  }
}
