import { test } from '../fixtures/test-fixtures';
import { allure } from 'allure-playwright';
import { testData } from '../utils/test-data';
import { startWithEmptyCart } from '../utils/cart-helpers';

test('authenticated user can successfully place an order', async ({ homePage, productPage, cartPage, checkoutPage }) => {
  await allure.epic('E-commerce');
  await allure.feature('Order management');
  await allure.story('Authenticated customer places an order');
  await allure.severity('critical');
  await allure.attachment(
    'test-environment',
    JSON.stringify({ browser: test.info().project.name, baseURL: test.info().project.use.baseURL }),
    'application/json',
  );

  await startWithEmptyCart(homePage, cartPage);
  await homePage.selectProduct(testData.product.name);
  await productPage.expectProduct(testData.product.name, testData.product.price);
  await productPage.addToCart();
  await homePage.openCart();
  await cartPage.expectProduct(testData.product.name, testData.product.price);
  await cartPage.expectTotal(testData.product.price);
  await cartPage.placeOrder();
  await checkoutPage.completeOrder(testData.order);
  await checkoutPage.expectOrderConfirmation();
});

test('user can open the Place Order dialog', async ({ homePage, productPage, cartPage, checkoutPage }) => {
  await startWithEmptyCart(homePage, cartPage);
  await homePage.selectProduct(testData.product.name);
  await productPage.addToCart();
  await homePage.openCart();
  await cartPage.placeOrder();
  await checkoutPage.expectOpen();
});
