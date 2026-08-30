import { test, expect } from '@playwright/test';

test('add Cropped Stay Groovy off white to cart and validate price', async ({ page }) => {
  await page.goto('https://react-shopping-cart-67954.firebaseapp.com/');

  await page.getByText('Cropped Stay Groovy off white').first().click();

  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    await dialog.accept();
  });

  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  await page.locator('span', { hasText: 'Cart' }).first().click();

  const cartPanel = page.locator('div.sc-1h98xa9-4').filter({ hasText: 'Cropped Stay Groovy off white' }).first();
  await expect(cartPanel).toContainText('Cropped Stay Groovy off white');
  await expect(cartPanel).toContainText('$ 10.90');
});
