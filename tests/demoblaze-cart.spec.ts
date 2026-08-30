import { test, expect } from '@playwright/test';

test('add Samsung galaxy s6 to cart and validate cart price', async ({ page }) => {
  await page.goto('https://demoblaze.com/index.html');

  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();

  await expect(page.getByRole('heading', { name: 'Samsung galaxy s6' })).toBeVisible();

  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    await dialog.accept();
  });

  await page.getByRole('button', { name: 'Add to cart' }).click();

  await page.getByRole('link', { name: 'Cart' }).click();

  const productRow = page.locator('tr').filter({ hasText: 'Samsung galaxy s6' }).first();
  await expect(productRow).toContainText('Samsung galaxy s6');

  const productPriceText = await productRow.locator('td').nth(2).textContent();
  expect(productPriceText?.trim()).toBe('360');
});
