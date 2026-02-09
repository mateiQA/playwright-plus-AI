import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Hamburger Menu Component
 */
export class MenuComponent {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators as getters
  get allItemsLink(): Locator {
    return this.page.getByRole('link', { name: 'All Items' });
  }

  get aboutLink(): Locator {
    return this.page.getByRole('link', { name: 'About' });
  }

  get logoutLink(): Locator {
    return this.page.getByRole('link', { name: 'Logout' });
  }

  get logoutLinkByDataTest(): Locator {
    return this.page.locator('[data-test="logout-sidebar-link"]');
  }

  get resetAppStateLink(): Locator {
    return this.page.getByRole('link', { name: 'Reset App State' });
  }

  // Action methods

  /**
   * Click the logout link
   */
  async clickLogout(): Promise<void> {
    await this.logoutLinkByDataTest.click();
  }

  /**
   * Click the All Items link
   */
  async clickAllItems(): Promise<void> {
    await this.allItemsLink.click();
  }

  /**
   * Click the About link
   */
  async clickAbout(): Promise<void> {
    await this.aboutLink.click();
  }

  /**
   * Click the Reset App State link
   */
  async clickResetAppState(): Promise<void> {
    await this.resetAppStateLink.click();
  }

  // Assertion methods

  /**
   * Verify that all menu items are visible
   */
  async expectMenuVisible(): Promise<void> {
    await expect(this.allItemsLink).toBeVisible();
    await expect(this.aboutLink).toBeVisible();
    await expect(this.logoutLink).toBeVisible();
    await expect(this.resetAppStateLink).toBeVisible();
  }
}
