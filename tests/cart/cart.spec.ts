import { test } from '../fixtures/test-fixtures';
import { testData } from '../utils/test-data';
import { startWithEmptyCart } from '../utils/cart-helpers';

test('user can add a product to the cart', async ({ homePage, productPage, cartPage }) => {
  await startWithEmptyCart(homePage, cartPage);
  await homePage.selectProduct(testData.product.name);
  await productPage.addToCart();
  await homePage.openCart();
  await cartPage.expectProduct(testData.product.name, testData.product.price);
});

test('cart total is calculated correctly', async ({ homePage, productPage, cartPage }) => {
  await startWithEmptyCart(homePage, cartPage);
  await homePage.selectProduct(testData.product.name);
  await productPage.addToCart();
  await homePage.openCart();
  await cartPage.expectTotal(testData.product.price);
});

test('user can remove a product from the cart', async ({ homePage, productPage, cartPage }) => {
  await startWithEmptyCart(homePage, cartPage);
  await homePage.selectProduct(testData.product.name);
  await productPage.addToCart();
  await homePage.openCart();
  await cartPage.removeProduct(testData.product.name);
  await cartPage.expectEmptyTotal();
});
