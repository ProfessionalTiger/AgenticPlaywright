import { test } from '../fixtures/test-fixtures';
import { testData } from '../utils/test-data';

test('user can open a product and verify its details', async ({ homePage, productPage }) => {
  await homePage.open();
  await homePage.selectProduct(testData.product.name);
  await productPage.expectProduct(testData.product.name, testData.product.price);
});
