
import { test as setup } from './fixtures/test-fixtures';

const customerUserAuthFile = 'tests/.auth/customer.json';

setup('Customer user', async ({ page, loginPage, customerUser }) => {
    await loginPage.open();
    await loginPage.login(customerUser.username, customerUser.password);
    await loginPage.expectLoggedIn(customerUser.username);

    await page.context().storageState({ path: customerUserAuthFile });
}); 