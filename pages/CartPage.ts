import { Page, Locator, expect } from '@playwright/test';
import { URLS } from '../utils/constants';

/**
 * Page Object Model for the Saucedemo Cart Page
 */
export class CartPage {
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

  get cartBadge(): Locator {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  get continueShoppingButton(): Locator {
    return this.page.locator('[data-test="continue-shopping"]');
  }

  get checkoutButton(): Locator {
    return this.page.locator('[data-test="checkout"]');
  }

  get cartIcon(): Locator {
    return this.page.locator('[data-test="shopping-cart-link"]');
  }

  // Action methods

  /**
   * Navigate to the cart page
   */
  async goto(): Promise<void> {
    await this.page.goto(URLS.CART);
  }

  /**
   * Click the cart icon to navigate to cart
   */
  async clickCartIcon(): Promise<void> {
    await this.cartIcon.click();
  }

  /**
   * Click Continue Shopping button
   */
  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  /**
   * Click Checkout button
   */
  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  /**
   * Remove an item from cart by its name
   */
  async removeItem(itemName: string): Promise<void> {
    const item = this.page.locator('[data-test="inventory-item"]').filter({ hasText: itemName });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  // Assertion methods

  /**
   * Verify the cart page is visible
   */
  async expectToBeVisible(): Promise<void> {
    await expect(this.pageTitle).toHaveText('Your Cart');
    await expect(this.continueShoppingButton).toBeVisible();
    await expect(this.checkoutButton).toBeVisible();
  }

  /**
   * Verify the number of items in cart
   */
  async expectItemCount(count: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(count);
  }

  /**
   * Verify the cart badge count
   */
  async expectBadgeCount(count: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  /**
   * Verify the cart badge is not visible (empty cart)
   */
  async expectBadgeNotVisible(): Promise<void> {
    await expect(this.cartBadge).not.toBeVisible();
  }

  /**
   * Verify that a specific item is in the cart
   */
  async expectItemVisible(itemName: string): Promise<void> {
    await expect(this.page.locator('[data-test="inventory-item"]').filter({ hasText: itemName })).toBeVisible();
  }

  /**
   * Verify that a specific item is not in the cart
   */
  async expectItemNotVisible(itemName: string): Promise<void> {
    await expect(this.page.locator('[data-test="inventory-item"]').filter({ hasText: itemName })).not.toBeVisible();
  }

  /**
   * Verify the cart page URL
   */
  async expectURL(): Promise<void> {
    await expect(this.page).toHaveURL(URLS.CART);
  }
}
