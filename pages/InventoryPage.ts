import { Page, Locator, expect } from '@playwright/test';
import { URLS } from '../utils/constants';

/**
 * Page Object Model for the Saucedemo Inventory/Products Page
 */
export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators as getters
  get pageTitle(): Locator {
    return this.page.getByText('Products');
  }

  get inventoryItems(): Locator {
    return this.page.locator('[data-test="inventory-item"]');
  }

  get firstInventoryItem(): Locator {
    return this.inventoryItems.first();
  }

  get sortDropdown(): Locator {
    return this.page.locator('[data-test="product-sort-container"]');
  }

  get inventoryItemNames(): Locator {
    return this.page.locator('[data-test="inventory-item-name"]');
  }

  get inventoryItemPrices(): Locator {
    return this.page.locator('[data-test="inventory-item-price"]');
  }

  get footerText(): Locator {
    return this.page.locator('[data-test="footer-copy"]');
  }

  get twitterLink(): Locator {
    return this.page.locator('[data-test="social-twitter"]');
  }

  get facebookLink(): Locator {
    return this.page.locator('[data-test="social-facebook"]');
  }

  get linkedinLink(): Locator {
    return this.page.locator('[data-test="social-linkedin"]');
  }

  // Action methods

  /**
   * Navigate to the inventory page
   */
  async goto(): Promise<void> {
    await this.page.goto(URLS.INVENTORY);
  }

  /**
   * Add a product to cart by name
   */
  async addToCart(productName: string): Promise<void> {
    const item = this.page.locator('[data-test="inventory-item"]').filter({ hasText: productName });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  /**
   * Remove a product from cart by name
   */
  async removeFromCart(productName: string): Promise<void> {
    const item = this.page.locator('[data-test="inventory-item"]').filter({ hasText: productName });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  /**
   * Click on a product name to go to detail page
   */
  async clickProduct(productName: string): Promise<void> {
    await this.page.locator('[data-test="inventory-item-name"]').filter({ hasText: productName }).click();
  }

  /**
   * Select a sort option
   */
  async sortBy(option: string): Promise<void> {
    await this.sortDropdown.selectOption({ label: option });
  }

  // Assertion methods

  /**
   * Verify that the inventory page is visible
   */
  async expectToBeVisible(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Open Menu' })).toBeVisible();
  }

  /**
   * Verify the number of products displayed
   */
  async expectProductCount(count: number): Promise<void> {
    await expect(this.inventoryItems).toHaveCount(count);
  }

  /**
   * Verify a product shows the Remove button
   */
  async expectRemoveButtonVisible(productName: string): Promise<void> {
    const item = this.page.locator('[data-test="inventory-item"]').filter({ hasText: productName });
    await expect(item.getByRole('button', { name: 'Remove' })).toBeVisible();
  }

  /**
   * Verify a product shows the Add to Cart button
   */
  async expectAddToCartButtonVisible(productName: string): Promise<void> {
    const item = this.page.locator('[data-test="inventory-item"]').filter({ hasText: productName });
    await expect(item.getByRole('button', { name: 'Add to cart' })).toBeVisible();
  }

  /**
   * Verify that the page URL matches the inventory page
   */
  async expectURL(): Promise<void> {
    await expect(this.page).toHaveURL(URLS.INVENTORY);
  }
}
