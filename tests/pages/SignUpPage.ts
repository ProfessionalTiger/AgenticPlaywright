import { expect, Page } from '@playwright/test';

export class SignUpPage {
  constructor(private readonly page: Page) {}

  private get modal() { return this.page.locator('#signInModal'); }
  private get usernameInput() { return this.page.locator('#sign-username'); }
  private get passwordInput() { return this.page.locator('#sign-password'); }

  async register(username: string, password: string) {
    await this.page.getByRole('link', { name: 'Sign up' }).click();
    await expect(this.modal).toBeVisible();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    const dialogPromise = this.page.waitForEvent('dialog');
    await this.modal.getByRole('button', { name: 'Sign up' }).click();
    const dialog = await dialogPromise;
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('Sign up successful.');
    await dialog.accept();
    await expect(this.modal).toBeHidden();
  }
}
