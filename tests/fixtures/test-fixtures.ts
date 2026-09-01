import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { SignUpPage } from '../pages/SignUpPage';
import { createTestUser, User } from '../utils/test-data';

export const test = base.extend<{
  homePage: HomePage;
  loginPage: LoginPage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  signUpPage: SignUpPage;
  registeredUser: User;
}>({
  homePage: async ({ page }, use) => await use(new HomePage(page)),
  loginPage: async ({ page }, use) => await use(new LoginPage(page)),
  productPage: async ({ page }, use) => await use(new ProductPage(page)),
  cartPage: async ({ page }, use) => await use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => await use(new CheckoutPage(page)),
  signUpPage: async ({ page }, use) => await use(new SignUpPage(page)),
  registeredUser: async ({ homePage, signUpPage }, use, testInfo) => {
    const user = createTestUser();
    user.username += `_${testInfo.workerIndex}`;
    await homePage.open();
    await signUpPage.register(user.username, user.password);
    await use(user);
  },
});

export { expect } from '@playwright/test';
