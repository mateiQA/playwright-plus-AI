import { Page, Locator, expect } from '@playwright/test';
import { URLS } from '../utils/constants';

/**
 * Page Object Model for the Saucedemo Login Page
 */
export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators as getters (computed on each access for reliability)
  get usernameInput(): Locator {
    return this.page.locator('[data-test="username"]');
  }

  get passwordInput(): Locator {
    return this.page.locator('[data-test="password"]');
  }

  get loginButton(): Locator {
    return this.page.locator('[data-test="login-button"]');
  }

  get errorMessage(): Locator {
    return this.page.locator('[data-test="error"]');
  }

  get errorCloseButton(): Locator {
    return this.page.locator('[data-test="error-button"]');
  }

  get usernameErrorIcon(): Locator {
    return this.usernameInput.locator('..').locator('.error_icon');
  }

  get passwordErrorIcon(): Locator {
    return this.passwordInput.locator('..').locator('.error_icon');
  }

  // Alternative role-based locators
  get usernameTextbox(): Locator {
    return this.page.getByRole('textbox', { name: 'Username' });
  }

  get passwordTextbox(): Locator {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  get loginButtonByRole(): Locator {
    return this.page.getByRole('button', { name: 'Login' });
  }

  get acceptedUsernamesText(): Locator {
    return this.page.getByText('Accepted usernames are:');
  }

  get passwordHintText(): Locator {
    return this.page.getByText('secret_sauce');
  }

  // Action methods

  /**
   * Navigate to the login page
   */
  async goto(): Promise<void> {
    await this.page.goto(URLS.LOGIN);
  }

  /**
   * Complete login flow (fill username, password, and click login)
   * @param username - Username to login with
   * @param password - Password to login with
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Fill the username field
   * @param username - Username to fill
   */
  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /**
   * Fill the password field
   * @param password - Password to fill
   */
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Click the login button
   */
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Dismiss the error message by clicking the close button
   */
  async dismissError(): Promise<void> {
    await this.errorCloseButton.click();
  }

  // Assertion methods

  /**
   * Verify that the login page is displayed
   */
  async expectToBeVisible(): Promise<void> {
    await expect(this.usernameTextbox).toBeVisible();
    await expect(this.passwordTextbox).toBeVisible();
    await expect(this.loginButtonByRole).toBeVisible();
  }

  /**
   * Verify error message text
   * @param message - Expected error message
   */
  async expectErrorMessage(message: string): Promise<void> {
    await expect(this.page.getByText(message)).toBeVisible();
  }

  /**
   * Verify that error icons are visible on both input fields
   */
  async expectErrorIconsVisible(): Promise<void> {
    await expect(this.usernameErrorIcon).toBeVisible();
    await expect(this.passwordErrorIcon).toBeVisible();
  }

  /**
   * Verify that error icons are not visible
   */
  async expectErrorIconsNotVisible(): Promise<void> {
    await expect(this.usernameErrorIcon).not.toBeVisible();
    await expect(this.passwordErrorIcon).not.toBeVisible();
  }

  /**
   * Verify that the error message is not visible
   */
  async expectErrorNotVisible(): Promise<void> {
    await expect(this.errorMessage).not.toBeVisible();
  }

  /**
   * Verify the username field value
   * @param value - Expected username value
   */
  async expectUsernameValue(value: string): Promise<void> {
    await expect(this.usernameInput).toHaveValue(value);
  }

  /**
   * Verify the password field value
   * @param value - Expected password value
   */
  async expectPasswordValue(value: string): Promise<void> {
    await expect(this.passwordInput).toHaveValue(value);
  }

  /**
   * Verify that username and password hints are visible
   */
  async expectHintsVisible(): Promise<void> {
    await expect(this.acceptedUsernamesText).toBeVisible();
    await expect(this.passwordHintText).toBeVisible();
  }
}
