import { Page, Locator, expect } from '@playwright/test';
import { URLS } from '../utils/constants';

/**
 * Page Object Model for the Saucedemo Checkout Step One Page
 */
export class CheckoutStepOnePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators as getters
  get pageTitle(): Locator {
    return this.page.locator('[data-test="title"]');
  }

  get firstNameInput(): Locator {
    return this.page.locator('[data-test="firstName"]');
  }

  get lastNameInput(): Locator {
    return this.page.locator('[data-test="lastName"]');
  }

  get postalCodeInput(): Locator {
    return this.page.locator('[data-test="postalCode"]');
  }

  get continueButton(): Locator {
    return this.page.locator('[data-test="continue"]');
  }

  get cancelButton(): Locator {
    return this.page.locator('[data-test="cancel"]');
  }

  get errorMessage(): Locator {
    return this.page.locator('[data-test="error"]');
  }

  // Action methods

  /**
   * Navigate directly to checkout step one
   */
  async goto(): Promise<void> {
    await this.page.goto(URLS.CHECKOUT_STEP_ONE);
  }

  /**
   * Fill checkout information
   */
  async fillInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Click Continue button
   */
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  /**
   * Click Cancel button
   */
  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }

  // Assertion methods

  /**
   * Verify the checkout step one page is visible
   */
  async expectToBeVisible(): Promise<void> {
    await expect(this.pageTitle).toHaveText('Checkout: Your Information');
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.postalCodeInput).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.cancelButton).toBeVisible();
  }

  /**
   * Verify error message text
   */
  async expectErrorMessage(message: string): Promise<void> {
    await expect(this.page.getByText(message)).toBeVisible();
  }

  /**
   * Verify the URL
   */
  async expectURL(): Promise<void> {
    await expect(this.page).toHaveURL(URLS.CHECKOUT_STEP_ONE);
  }
}
