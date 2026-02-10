import { Page, Locator, expect } from '@playwright/test';

/**
 * Shared header component: cart icon, cart badge, hamburger menu.
 * Composed into page objects that display the site header.
 */
export class HeaderComponent {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get cartIcon(): Locator {
    return this.page.locator('[data-test="shopping-cart-link"]');
  }

  get cartBadge(): Locator {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  get hamburgerMenu(): Locator {
    return this.page.getByRole('button', { name: 'Open Menu' });
  }

  async goToCart(): Promise<void> {
    await this.cartIcon.click();
  }

  async openMenu(): Promise<void> {
    await this.hamburgerMenu.click();
  }

  async expectBadgeCount(count: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async expectBadgeNotVisible(): Promise<void> {
    await expect(this.cartBadge).not.toBeVisible();
  }
}
