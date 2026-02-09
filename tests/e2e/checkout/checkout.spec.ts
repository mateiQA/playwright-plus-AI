// Checkout Tests
import { test } from '../../../fixtures/pages';
import { ERROR_MESSAGES, PRODUCTS, TEST_DATA } from '../../../utils/constants';

test.describe('Checkout', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('Complete checkout successfully', async ({
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
  }) => {
    // Add two items to the cart
    await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);
    await inventoryPage.addToCart(PRODUCTS.BIKE_LIGHT.name);
    await inventoryPage.expectBadgeCount(2);

    // Navigate to cart
    await inventoryPage.goToCart();
    await cartPage.expectToBeVisible();
    await cartPage.expectItemCount(2);

    // Proceed to checkout
    await cartPage.clickCheckout();
    await checkoutStepOnePage.expectToBeVisible();

    // Fill checkout information
    await checkoutStepOnePage.fillInfo(
      TEST_DATA.CHECKOUT.FIRST_NAME,
      TEST_DATA.CHECKOUT.LAST_NAME,
      TEST_DATA.CHECKOUT.ZIP_CODE,
    );

    // Continue to overview
    await checkoutStepOnePage.clickContinue();
    await checkoutStepTwoPage.expectToBeVisible();

    // Verify overview page details
    await checkoutStepTwoPage.expectPaymentInfo(TEST_DATA.PAYMENT_INFO);
    await checkoutStepTwoPage.expectShippingInfo(TEST_DATA.SHIPPING_INFO);
    await checkoutStepTwoPage.expectSubtotal('$39.98');
    await checkoutStepTwoPage.expectItemCount(2);

    // Finish checkout
    await checkoutStepTwoPage.clickFinish();
    await checkoutCompletePage.expectToBeVisible();
    await checkoutCompletePage.expectURL();

    // Navigate back home
    await checkoutCompletePage.clickBackHome();
    await inventoryPage.expectToBeVisible();
    await inventoryPage.expectURL();
  });

  test('Checkout with missing first name', async ({
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
  }) => {
    // Add item to cart and go to checkout
    await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);
    await inventoryPage.goToCart();
    await cartPage.clickCheckout();
    await checkoutStepOnePage.expectToBeVisible();

    // Fill only last name and zip code
    await checkoutStepOnePage.fillInfo('', TEST_DATA.CHECKOUT.LAST_NAME, TEST_DATA.CHECKOUT.ZIP_CODE);

    // Attempt to continue
    await checkoutStepOnePage.clickContinue();

    // Verify first name required error
    await checkoutStepOnePage.expectErrorMessage(ERROR_MESSAGES.FIRST_NAME_REQUIRED);
  });

  test('Checkout with missing last name', async ({
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
  }) => {
    // Add item to cart and go to checkout
    await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);
    await inventoryPage.goToCart();
    await cartPage.clickCheckout();
    await checkoutStepOnePage.expectToBeVisible();

    // Fill only first name and zip code
    await checkoutStepOnePage.fillInfo(TEST_DATA.CHECKOUT.FIRST_NAME, '', TEST_DATA.CHECKOUT.ZIP_CODE);

    // Attempt to continue
    await checkoutStepOnePage.clickContinue();

    // Verify last name required error
    await checkoutStepOnePage.expectErrorMessage(ERROR_MESSAGES.LAST_NAME_REQUIRED);
  });

  test('Checkout with missing zip code', async ({
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
  }) => {
    // Add item to cart and go to checkout
    await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);
    await inventoryPage.goToCart();
    await cartPage.clickCheckout();
    await checkoutStepOnePage.expectToBeVisible();

    // Fill only first and last name
    await checkoutStepOnePage.fillInfo(TEST_DATA.CHECKOUT.FIRST_NAME, TEST_DATA.CHECKOUT.LAST_NAME, '');

    // Attempt to continue
    await checkoutStepOnePage.clickContinue();

    // Verify postal code required error
    await checkoutStepOnePage.expectErrorMessage(ERROR_MESSAGES.POSTAL_CODE_REQUIRED);
  });

  test('Checkout with all fields empty', async ({
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
  }) => {
    // Add item to cart and go to checkout
    await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);
    await inventoryPage.goToCart();
    await cartPage.clickCheckout();
    await checkoutStepOnePage.expectToBeVisible();

    // Attempt to continue without filling any fields
    await checkoutStepOnePage.clickContinue();

    // Verify first name required error (first validation)
    await checkoutStepOnePage.expectErrorMessage(ERROR_MESSAGES.FIRST_NAME_REQUIRED);
  });

  test('Cancel checkout from step one', async ({
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
  }) => {
    // Add item to cart and go to checkout
    await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);
    await inventoryPage.goToCart();
    await cartPage.clickCheckout();
    await checkoutStepOnePage.expectToBeVisible();

    // Fill some checkout information
    await checkoutStepOnePage.fillInfo(
      TEST_DATA.CHECKOUT.FIRST_NAME,
      TEST_DATA.CHECKOUT.LAST_NAME,
      TEST_DATA.CHECKOUT.ZIP_CODE,
    );

    // Cancel checkout
    await checkoutStepOnePage.clickCancel();

    // Verify back on cart page with items
    await cartPage.expectToBeVisible();
    await cartPage.expectItemCount(1);
    await cartPage.expectBadgeCount(1);
  });

  test('Should not allow checkout with empty cart', async ({
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
  }) => {
    test.fail(); // Known bug: SauceDemo allows completing checkout with 0 items ($0.00 total)

    // Go directly to cart without adding any items
    await cartPage.goto();
    await cartPage.expectToBeVisible();
    await cartPage.expectItemCount(0);
    await cartPage.expectBadgeNotVisible();

    // Attempt to checkout with empty cart
    await cartPage.clickCheckout();
    await checkoutStepOnePage.fillInfo(
      TEST_DATA.CHECKOUT.FIRST_NAME,
      TEST_DATA.CHECKOUT.LAST_NAME,
      TEST_DATA.CHECKOUT.ZIP_CODE,
    );
    await checkoutStepOnePage.clickContinue();

    // The app should have blocked checkout before reaching the overview page
    // but it doesn't - it shows a $0.00 order that can be completed
    await checkoutStepTwoPage.expectItemCount(1);
  });

  test('Cancel checkout from step two', async ({
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
  }) => {
    // Add item to cart and go to checkout
    await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);
    await inventoryPage.goToCart();
    await cartPage.clickCheckout();

    // Complete step one
    await checkoutStepOnePage.expectToBeVisible();
    await checkoutStepOnePage.fillInfo(
      TEST_DATA.CHECKOUT.FIRST_NAME,
      TEST_DATA.CHECKOUT.LAST_NAME,
      TEST_DATA.CHECKOUT.ZIP_CODE,
    );
    await checkoutStepOnePage.clickContinue();

    // Cancel from overview page
    await checkoutStepTwoPage.expectToBeVisible();
    await checkoutStepTwoPage.clickCancel();

    // Verify back on inventory page with cart badge still showing
    await inventoryPage.expectToBeVisible();
    await inventoryPage.expectURL();
    await inventoryPage.expectBadgeCount(1);
  });
});
