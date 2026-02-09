// Navigation Tests
import { test, expect } from '../../../fixtures/pages';
import { PRODUCTS } from '../../../utils/constants';

test.describe('Navigation', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('Menu - All Items link navigates back to inventory', async ({ inventoryPage, menuComponent, cartPage }) => {
    // Navigate to cart page first
    await inventoryPage.goToCart();
    await cartPage.expectToBeVisible();

    // Open menu and verify it is visible
    await inventoryPage.openMenu();
    await menuComponent.expectMenuVisible();

    // Click All Items link
    await menuComponent.clickAllItems();

    // Verify back on inventory page
    await inventoryPage.expectToBeVisible();
    await inventoryPage.expectURL();
  });

  test('Menu - About link navigates to Sauce Labs', async ({ inventoryPage, menuComponent, page }) => {
    // Open menu
    await inventoryPage.openMenu();

    // Click About link
    await menuComponent.clickAbout();

    // Verify URL contains saucelabs.com
    await expect(page).toHaveURL(/saucelabs\.com/);
  });

  test('Menu - Reset App State clears cart badge', async ({ inventoryPage, menuComponent }) => {
    // Add 2 items to cart
    await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);
    await inventoryPage.addToCart(PRODUCTS.BIKE_LIGHT.name);

    // Verify badge count is 2
    await inventoryPage.expectBadgeCount(2);

    // Open menu and click Reset App State
    await inventoryPage.openMenu();
    await menuComponent.clickResetAppState();

    // Verify badge disappears
    await inventoryPage.expectBadgeNotVisible();
  });

  test('Close menu hides menu items', async ({ inventoryPage, menuComponent, page }) => {
    // Open menu and verify it is visible
    await inventoryPage.openMenu();
    await menuComponent.expectMenuVisible();

    // Click close button
    await page.locator('#react-burger-cross-btn').click();

    // Verify menu items are hidden
    await expect(page.getByRole('link', { name: 'All Items' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'About' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Logout' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Reset App State' })).not.toBeVisible();
  });

  test('Shopping cart icon navigates to cart page', async ({ inventoryPage, cartPage }) => {
    // Click cart icon
    await inventoryPage.goToCart();

    // Verify cart page URL
    await cartPage.expectURL();
  });

  test('Back button in product detail returns to inventory', async ({ inventoryPage, productDetailPage }) => {
    // Click on Sauce Labs Backpack product
    await inventoryPage.clickProduct(PRODUCTS.BACKPACK.name);

    // Verify detail page is visible
    await productDetailPage.expectToBeVisible();

    // Click back to products
    await productDetailPage.goBackToProducts();

    // Verify inventory page is visible
    await inventoryPage.expectToBeVisible();
  });

  test('Footer social media links are visible', async ({ inventoryPage }) => {
    // Verify social media links are visible
    await expect(inventoryPage.twitterLink).toBeVisible();
    await expect(inventoryPage.facebookLink).toBeVisible();
    await expect(inventoryPage.linkedinLink).toBeVisible();

    // Verify footer text contains Sauce Labs
    await expect(inventoryPage.footerText).toContainText('Sauce Labs');
  });
});
