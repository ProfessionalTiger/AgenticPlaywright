import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  private get modal() { return this.page.locator('#logInModal'); }
  private get usernameInput() { return this.page.locator('#loginusername'); }
  private get passwordInput() { return this.page.locator('#loginpassword'); }

  async open() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await this.page.getByRole('link', { name: 'Log in' }).click();
    await expect(this.modal).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.modal.getByRole('button', { name: 'Log in' }).click();
  }

  async expectLoggedIn(username: string) {
    await expect(this.page.locator('#nameofuser')).toContainText(username);
  }

  async expectLoginError(username: string, password: string, message: string) {
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.login(username, password);
    const dialog = await dialogPromise;
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toContain(message);
    await dialog.accept();
  }
}
