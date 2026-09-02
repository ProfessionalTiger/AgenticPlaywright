import { test } from './fixtures/test-fixtures';
import { createTestUser, testData } from './utils/test-data';
import { allure } from 'allure-playwright';

async function startWithEmptyCart(homePage: { open: () => Promise<void>; openCart: () => Promise<void> }, cartPage: { clear: () => Promise<void> }) {
  await homePage.open();
  await homePage.openCart();
  await cartPage.clear();
  await homePage.open();
}

test('authenticated user can successfully place an order', async ({ homePage, productPage, cartPage, checkoutPage }) => {
  await allure.epic('E-commerce');
  await allure.feature('Order management');
  await allure.story('Authenticated customer places an order');
  await allure.severity('critical');
  await allure.attachment('test-environment', JSON.stringify({ browser: test.info().project.name, baseURL: test.info().project.use.baseURL }), 'application/json');

  await startWithEmptyCart(homePage, cartPage);
  await test.step('Select product and add it to cart', async () => {
    await homePage.selectProduct(testData.product.name);
    await productPage.expectProduct(testData.product.name, testData.product.price);
    await productPage.addToCart();
  });
  await test.step('Complete checkout', async () => {
    await homePage.openCart();
    await cartPage.expectProduct(testData.product.name, testData.product.price);
    await cartPage.expectTotal(testData.product.price);
    await cartPage.placeOrder();
    await checkoutPage.completeOrder(testData.order);
    await checkoutPage.expectOrderConfirmation();
  });
});

test('new user can sign up successfully', async ({ homePage, signUpPage }) => {
  const user = createTestUser();
  await homePage.open();
  await signUpPage.register(user.username, user.password);
});

test.describe('logged-out authentication', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('invalid login credentials show an error', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.expectLoginError(testData.invalidUser.username, testData.invalidUser.password, 'User does not exist');
  });
});

test('user can open a product and verify its details', async ({ homePage, productPage }) => {
  await homePage.open();
  await homePage.selectProduct(testData.product.name);
  await productPage.expectProduct(testData.product.name, testData.product.price);
});

test('user can add a product to the cart', async ({ homePage, productPage, cartPage }) => {
  await startWithEmptyCart(homePage, cartPage);
  await homePage.open();
  await homePage.selectProduct(testData.product.name);
  await productPage.addToCart();
  await homePage.openCart();
  await cartPage.expectProduct(testData.product.name, testData.product.price);
});

test('cart total is calculated correctly', async ({ homePage, productPage, cartPage }) => {
  await startWithEmptyCart(homePage, cartPage);
  await homePage.open();
  await homePage.selectProduct(testData.product.name);
  await productPage.addToCart();
  await homePage.openCart();
  await cartPage.expectTotal(testData.product.price);
});

test('user can remove a product from the cart', async ({ homePage, productPage, cartPage }) => {
  await startWithEmptyCart(homePage, cartPage);
  await homePage.open();
  await homePage.selectProduct(testData.product.name);
  await productPage.addToCart();
  await homePage.openCart();
  await cartPage.removeProduct(testData.product.name);
  await cartPage.expectEmptyTotal();
});

test('user can open the Place Order dialog', async ({ homePage, productPage, cartPage, checkoutPage }) => {
  await startWithEmptyCart(homePage, cartPage);
  await homePage.open();
  await homePage.selectProduct(testData.product.name);
  await productPage.addToCart();
  await homePage.openCart();
  await cartPage.placeOrder();
  await checkoutPage.expectOpen();
});
