import { test } from '../fixtures/test-fixtures';
import { createTestUser } from '../utils/test-data';

test.use({ storageState: { cookies: [], origins: [] } });

test('new user can sign up successfully', async ({ homePage, signUpPage }) => {
  const user = createTestUser();
  await homePage.open();
  await signUpPage.register(user.username, user.password);
});
