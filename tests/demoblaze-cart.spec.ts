import { test, expect } from '@playwright/test';

test('add Samsung galaxy s6 to cart and validate cart price', async ({ page }) => {
  await page.goto('https://demoblaze.com/prod.html?idp_=1', { waitUntil: 'domcontentloaded' });

  await expect(page.getByRole('heading', { name: 'Samsung galaxy s6' })).toBeVisible({ timeout: 30000 });

  const addToCartLink = page.getByRole('link', { name: /^Add to cart$/i }).first();
  await expect(addToCartLink).toBeVisible({ timeout: 30000 });

  const dialogPromise = page.waitForEvent('dialog');
  await addToCartLink.click();

  const dialog = await dialogPromise;
  expect(dialog.type()).toBe('alert');
  await dialog.accept();

  const cartLink = page.locator('#cartur');
  await expect(cartLink).toBeVisible({ timeout: 20000 });
  await cartLink.click();

  const cartRow = page.locator('#tbodyid tr').filter({ hasText: 'Samsung galaxy s6' }).first();
  await expect(cartRow).toContainText('Samsung galaxy s6', { timeout: 30000 });

  const priceCell = cartRow.locator('td').nth(2);
  await expect(priceCell).toContainText('360', { timeout: 30000 });
});
