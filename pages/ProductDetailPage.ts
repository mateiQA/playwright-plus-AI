import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Saucedemo Product Detail Page
 */
export class ProductDetailPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators as getters
  get productName(): Locator {
    return this.page.locator('[data-test="inventory-item-name"]');
  }

  get productDescription(): Locator {
    return this.page.locator('[data-test="inventory-item-desc"]');
  }

  get productPrice(): Locator {
    return this.page.locator('[data-test="inventory-item-price"]');
  }

  get productImage(): Locator {
    return this.page.locator('img.inventory_details_img');
  }

  get addToCartButton(): Locator {
    return this.page.locator('[data-test^="add-to-cart"]');
  }

  get removeButton(): Locator {
    return this.page.locator('[data-test^="remove"]');
  }

  get backButton(): Locator {
    return this.page.locator('[data-test="back-to-products"]');
  }

  // Action methods

  /**
   * Click Add to Cart button
   */
  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  /**
   * Click Remove button
   */
  async removeFromCart(): Promise<void> {
    await this.removeButton.click();
  }

  /**
   * Click Back to Products button
   */
  async goBackToProducts(): Promise<void> {
    await this.backButton.click();
  }

  // Assertion methods

  /**
   * Verify the product detail page is visible
   */
  async expectToBeVisible(): Promise<void> {
    await expect(this.productName).toBeVisible();
    await expect(this.productDescription).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productImage).toBeVisible();
    await expect(this.backButton).toBeVisible();
  }

  /**
   * Verify the product name
   */
  async expectProductName(name: string): Promise<void> {
    await expect(this.productName).toHaveText(name);
  }

  /**
   * Verify the product price
   */
  async expectProductPrice(price: string): Promise<void> {
    await expect(this.productPrice).toHaveText(price);
  }

  /**
   * Verify Add to Cart button is visible
   */
  async expectAddToCartVisible(): Promise<void> {
    await expect(this.addToCartButton).toBeVisible();
  }

  /**
   * Verify Remove button is visible
   */
  async expectRemoveVisible(): Promise<void> {
    await expect(this.removeButton).toBeVisible();
  }
}
