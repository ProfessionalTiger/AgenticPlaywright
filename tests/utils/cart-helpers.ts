import { CartPage } from '../pages/CartPage';
import { HomePage } from '../pages/HomePage';

export async function startWithEmptyCart(homePage: HomePage, cartPage: CartPage) {
  await homePage.open();
  await homePage.openCart();
  await cartPage.clear();
  await homePage.open();
}
