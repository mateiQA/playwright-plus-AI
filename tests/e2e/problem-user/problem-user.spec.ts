// Problem User - Behavioral Bug Tests
import { test, expect } from '../../../fixtures/pages';
import { PRODUCTS, TEST_DATA, USERS } from '../../../utils/constants';

test.describe('Problem User - Known Issues', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.PROBLEM.username, USERS.PROBLEM.password);
  });

  test('Problem user - product images are incorrect', async ({ inventoryPage }) => {
    // Verify inventory page is visible
    await inventoryPage.expectToBeVisible();

    // Get the src attribute from the first product image
    const firstImageSrc = await inventoryPage.page
      .locator('[data-test="inventory-item"] img')
      .first()
      .getAttribute('src');

    // Get all product image srcs
    const allImageSrcs = await inventoryPage.page
      .locator('[data-test="inventory-item"] img')
      .evaluateAll((images) =>
        images.map((img) => img.getAttribute('src'))
      );

    // Known bug: all product images show the same src for problem_user
    for (const src of allImageSrcs) {
      expect(src).toBe(firstImageSrc);
    }
  });

  test('Problem user - add to cart inconsistency', async ({ inventoryPage, headerComponent }) => {
    // Known failure: problem_user has button state bugs after add/remove
    test.fail();

    // Verify inventory page is visible
    await inventoryPage.expectToBeVisible();

    // Add Sauce Labs Backpack to cart
    await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);
    await headerComponent.expectBadgeCount(1);

    // Try adding Sauce Labs Bike Light
    await inventoryPage.addToCart(PRODUCTS.BIKE_LIGHT.name);
    await headerComponent.expectBadgeCount(2);

    // Try removing Sauce Labs Backpack — for problem_user the button state
    // may not update correctly after removal
    await inventoryPage.removeFromCart(PRODUCTS.BACKPACK.name);

    // Badge should update to 1 but may not for problem_user
    await headerComponent.expectBadgeCount(1);
  });

  test('Problem user - checkout form field issues', async ({
    inventoryPage,
    headerComponent,
    cartPage,
    checkoutStepOnePage,
  }) => {
    // Known failure: problem_user has form field input bugs where the last name
    // value may end up in the wrong field
    test.fail();

    // Add an item to cart
    await inventoryPage.expectToBeVisible();
    await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);
    await headerComponent.expectBadgeCount(1);

    // Go to cart and proceed to checkout
    await headerComponent.goToCart();
    await cartPage.expectToBeVisible();
    await cartPage.clickCheckout();

    // Fill the checkout form
    await checkoutStepOnePage.expectToBeVisible();
    await checkoutStepOnePage.fillInfo(
      TEST_DATA.CHECKOUT.FIRST_NAME,
      TEST_DATA.CHECKOUT.LAST_NAME,
      TEST_DATA.CHECKOUT.ZIP_CODE,
    );

    // Verify the last name input has the correct value
    // For problem_user, the value may end up in the wrong field
    await expect(checkoutStepOnePage.lastNameInput).toHaveValue(TEST_DATA.CHECKOUT.LAST_NAME);
  });

  test('Problem user - can still complete login', async ({ inventoryPage }) => {
    // Verify inventory page is visible after login
    await inventoryPage.expectToBeVisible();

    // Verify all 6 products are displayed
    await inventoryPage.expectProductCount(6);
  });
});
