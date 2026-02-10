// Checkout Tests
import { test } from '../../../fixtures/pages';
import { ERROR_MESSAGES, PRODUCTS, TEST_DATA } from '../../../utils/constants';

test.describe('Checkout', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('Complete checkout successfully @smoke', async ({
    inventoryPage,
    headerComponent,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
  }) => {
    // Add two items to the cart
    await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);
    await inventoryPage.addToCart(PRODUCTS.BIKE_LIGHT.name);
    await headerComponent.expectBadgeCount(2);

    // Navigate to cart
    await headerComponent.goToCart();
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

  const validationScenarios = [
    {
      name: 'missing first name',
      firstName: '',
      lastName: TEST_DATA.CHECKOUT.LAST_NAME,
      zipCode: TEST_DATA.CHECKOUT.ZIP_CODE,
      expectedError: ERROR_MESSAGES.FIRST_NAME_REQUIRED,
    },
    {
      name: 'missing last name',
      firstName: TEST_DATA.CHECKOUT.FIRST_NAME,
      lastName: '',
      zipCode: TEST_DATA.CHECKOUT.ZIP_CODE,
      expectedError: ERROR_MESSAGES.LAST_NAME_REQUIRED,
    },
    {
      name: 'missing zip code',
      firstName: TEST_DATA.CHECKOUT.FIRST_NAME,
      lastName: TEST_DATA.CHECKOUT.LAST_NAME,
      zipCode: '',
      expectedError: ERROR_MESSAGES.POSTAL_CODE_REQUIRED,
    },
    {
      name: 'all fields empty',
      firstName: '',
      lastName: '',
      zipCode: '',
      expectedError: ERROR_MESSAGES.FIRST_NAME_REQUIRED,
    },
  ];

  for (const { name, firstName, lastName, zipCode, expectedError } of validationScenarios) {
    test(`Checkout validation - ${name}`, async ({
      inventoryPage,
      headerComponent,
      cartPage,
      checkoutStepOnePage,
    }) => {
      // Add item to cart and go to checkout
      await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);
      await headerComponent.goToCart();
      await cartPage.clickCheckout();
      await checkoutStepOnePage.expectToBeVisible();

      // Fill form with scenario data
      await checkoutStepOnePage.fillInfo(firstName, lastName, zipCode);

      // Attempt to continue
      await checkoutStepOnePage.clickContinue();

      // Verify expected error message
      await checkoutStepOnePage.expectErrorMessage(expectedError);
    });
  }

  test('Cancel checkout from step one', async ({
    inventoryPage,
    headerComponent,
    cartPage,
    checkoutStepOnePage,
  }) => {
    // Add item to cart and go to checkout
    await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);
    await headerComponent.goToCart();
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
    await headerComponent.expectBadgeCount(1);
  });

  test('Should not allow checkout with empty cart', async ({
    headerComponent,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
  }) => {
    test.fail(); // Known bug: SauceDemo allows completing checkout with 0 items ($0.00 total)

    // Go directly to cart without adding any items
    await cartPage.goto();
    await cartPage.expectToBeVisible();
    await cartPage.expectItemCount(0);
    await headerComponent.expectBadgeNotVisible();

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
    headerComponent,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
  }) => {
    // Add item to cart and go to checkout
    await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);
    await headerComponent.goToCart();
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
    await headerComponent.expectBadgeCount(1);
  });
});
