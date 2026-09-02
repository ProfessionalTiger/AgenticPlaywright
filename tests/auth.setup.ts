
import { test as setup} from './fixtures/test-fixtures';

const customerUserAuthFile = 'tests/.auth/customer.json';

setup('Customer user', async ({ page, loginPage, registeredUser }) => {
   await loginPage.open();
    await loginPage.login(registeredUser.username, registeredUser.password);
    await loginPage.expectLoggedIn(registeredUser.username);

    await page.context().storageState({ path: customerUserAuthFile });
}); 