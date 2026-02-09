import { Page, Locator, expect } from '@playwright/test';
import { URLS } from '../utils/constants';

/**
 * Page Object Model for the Saucedemo Checkout Complete Page
 */
export class CheckoutCompletePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators as getters
  get pageTitle(): Locator {
    return this.page.locator('[data-test="title"]');
  }

  get completeHeader(): Locator {
    return this.page.locator('[data-test="complete-header"]');
  }

  get completeText(): Locator {
    return this.page.locator('[data-test="complete-text"]');
  }

  get ponyExpressImage(): Locator {
    return this.page.locator('[data-test="pony-express"]');
  }

  get backHomeButton(): Locator {
    return this.page.locator('[data-test="back-to-products"]');
  }

  // Action methods

  /**
   * Click Back Home button
   */
  async clickBackHome(): Promise<void> {
    await this.backHomeButton.click();
  }

  // Assertion methods

  /**
   * Verify the checkout complete page is visible
   */
  async expectToBeVisible(): Promise<void> {
    await expect(this.pageTitle).toHaveText('Checkout: Complete!');
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.ponyExpressImage).toBeVisible();
    await expect(this.backHomeButton).toBeVisible();
  }

  /**
   * Verify the URL
   */
  async expectURL(): Promise<void> {
    await expect(this.page).toHaveURL(URLS.CHECKOUT_COMPLETE);
  }
}
