import { Page, Locator, expect } from '@playwright/test';
import { URLS } from '../utils/constants';

/**
 * Page Object Model for the Saucedemo Checkout Step Two (Overview) Page
 */
export class CheckoutStepTwoPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators as getters
  get pageTitle(): Locator {
    return this.page.locator('[data-test="title"]');
  }

  get cartItems(): Locator {
    return this.page.locator('[data-test="inventory-item"]');
  }

  get paymentInfo(): Locator {
    return this.page.locator('[data-test="payment-info-value"]');
  }

  get shippingInfo(): Locator {
    return this.page.locator('[data-test="shipping-info-value"]');
  }

  get subtotalLabel(): Locator {
    return this.page.locator('[data-test="subtotal-label"]');
  }

  get taxLabel(): Locator {
    return this.page.locator('[data-test="tax-label"]');
  }

  get totalLabel(): Locator {
    return this.page.locator('[data-test="total-label"]');
  }

  get finishButton(): Locator {
    return this.page.locator('[data-test="finish"]');
  }

  get cancelButton(): Locator {
    return this.page.locator('[data-test="cancel"]');
  }

  // Action methods

  /**
   * Click Finish button to complete order
   */
  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  /**
   * Click Cancel button
   */
  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }

  // Assertion methods

  /**
   * Verify the checkout overview page is visible
   */
  async expectToBeVisible(): Promise<void> {
    await expect(this.pageTitle).toHaveText('Checkout: Overview');
    await expect(this.finishButton).toBeVisible();
    await expect(this.cancelButton).toBeVisible();
  }

  /**
   * Verify payment information
   */
  async expectPaymentInfo(info: string): Promise<void> {
    await expect(this.paymentInfo).toHaveText(info);
  }

  /**
   * Verify shipping information
   */
  async expectShippingInfo(info: string): Promise<void> {
    await expect(this.shippingInfo).toHaveText(info);
  }

  /**
   * Verify the subtotal contains expected text
   */
  async expectSubtotal(amount: string): Promise<void> {
    await expect(this.subtotalLabel).toContainText(amount);
  }

  /**
   * Verify the number of items in the overview
   */
  async expectItemCount(count: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(count);
  }

  /**
   * Verify the URL
   */
  async expectURL(): Promise<void> {
    await expect(this.page).toHaveURL(URLS.CHECKOUT_STEP_TWO);
  }
}
