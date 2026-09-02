import { test } from '../fixtures/test-fixtures';
import { testData } from '../utils/test-data';

test.describe('logged-out authentication', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('invalid login credentials show an error', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.expectLoginError(
      testData.invalidUser.username,
      testData.invalidUser.password,
      'User does not exist',
    );
  });
});
