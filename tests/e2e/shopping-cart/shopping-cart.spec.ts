// Shopping Cart Tests
import { test } from '../../../fixtures/pages';
import { PRODUCTS } from '../../../utils/constants';

test.describe('Shopping Cart', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('Add single item to cart @smoke', async ({ inventoryPage, headerComponent }) => {
    // Add Sauce Labs Backpack to cart
    await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);

    // Verify badge shows 1
    await headerComponent.expectBadgeCount(1);

    // Verify Remove button is visible for Backpack
    await inventoryPage.expectRemoveButtonVisible(PRODUCTS.BACKPACK.name);
  });

  test('Add multiple items to cart', async ({ inventoryPage, headerComponent }) => {
    // Add Backpack and verify badge count
    await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);
    await headerComponent.expectBadgeCount(1);

    // Add Bike Light and verify badge count
    await inventoryPage.addToCart(PRODUCTS.BIKE_LIGHT.name);
    await headerComponent.expectBadgeCount(2);

    // Add Bolt T-Shirt and verify badge count
    await inventoryPage.addToCart(PRODUCTS.BOLT_TSHIRT.name);
    await headerComponent.expectBadgeCount(3);
  });

  test('Remove item from inventory page', async ({ inventoryPage, headerComponent }) => {
    // Add Sauce Labs Backpack to cart
    await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);
    await headerComponent.expectBadgeCount(1);

    // Remove Sauce Labs Backpack from cart
    await inventoryPage.removeFromCart(PRODUCTS.BACKPACK.name);

    // Verify badge is no longer visible
    await headerComponent.expectBadgeNotVisible();

    // Verify Add to Cart button is visible again
    await inventoryPage.expectAddToCartButtonVisible(PRODUCTS.BACKPACK.name);
  });

  test('View cart with items @smoke', async ({ inventoryPage, headerComponent, cartPage }) => {
    // Add three items to cart
    await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);
    await inventoryPage.addToCart(PRODUCTS.BIKE_LIGHT.name);
    await inventoryPage.addToCart(PRODUCTS.BOLT_TSHIRT.name);

    // Navigate to cart
    await headerComponent.goToCart();

    // Verify cart page is visible
    await cartPage.expectToBeVisible();

    // Verify 3 items in cart
    await cartPage.expectItemCount(3);

    // Verify each item is visible by name
    await cartPage.expectItemVisible(PRODUCTS.BACKPACK.name);
    await cartPage.expectItemVisible(PRODUCTS.BIKE_LIGHT.name);
    await cartPage.expectItemVisible(PRODUCTS.BOLT_TSHIRT.name);
  });

  test('View empty cart', async ({ headerComponent, cartPage }) => {
    // Go directly to cart without adding items
    await headerComponent.goToCart();

    // Verify cart page is visible
    await cartPage.expectToBeVisible();

    // Verify 0 items in cart
    await cartPage.expectItemCount(0);
  });

  test('Remove item from cart page', async ({ inventoryPage, headerComponent, cartPage }) => {
    // Add two items to cart
    await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);
    await inventoryPage.addToCart(PRODUCTS.BIKE_LIGHT.name);

    // Navigate to cart
    await headerComponent.goToCart();

    // Remove Sauce Labs Backpack from cart page
    await cartPage.removeItem(PRODUCTS.BACKPACK.name);

    // Verify Backpack is no longer visible
    await cartPage.expectItemNotVisible(PRODUCTS.BACKPACK.name);

    // Verify Bike Light is still visible
    await cartPage.expectItemVisible(PRODUCTS.BIKE_LIGHT.name);

    // Verify badge shows 1
    await headerComponent.expectBadgeCount(1);
  });

  test('Continue shopping from cart', async ({ inventoryPage, headerComponent, cartPage }) => {
    // Add Sauce Labs Backpack to cart
    await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);

    // Navigate to cart
    await headerComponent.goToCart();

    // Click Continue Shopping
    await cartPage.clickContinueShopping();

    // Verify inventory page is visible
    await inventoryPage.expectToBeVisible();

    // Verify badge still shows 1
    await headerComponent.expectBadgeCount(1);
  });

  test('Cart badge persists across pages', async ({ inventoryPage, headerComponent, productDetailPage }) => {
    // Add two items to cart
    await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);
    await inventoryPage.addToCart(PRODUCTS.BIKE_LIGHT.name);

    // Verify badge shows 2 on inventory page
    await headerComponent.expectBadgeCount(2);

    // Click on a product to go to detail page
    await inventoryPage.clickProduct(PRODUCTS.BACKPACK.name);

    // Verify badge still shows 2 on product detail page
    await headerComponent.expectBadgeCount(2);

    // Go back to products
    await productDetailPage.goBackToProducts();

    // Verify badge still shows 2 on inventory page
    await headerComponent.expectBadgeCount(2);
  });

  test('Add all products to cart', async ({ inventoryPage, headerComponent, cartPage }) => {
    // Add all 6 products
    await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);
    await inventoryPage.addToCart(PRODUCTS.BIKE_LIGHT.name);
    await inventoryPage.addToCart(PRODUCTS.BOLT_TSHIRT.name);
    await inventoryPage.addToCart(PRODUCTS.FLEECE_JACKET.name);
    await inventoryPage.addToCart(PRODUCTS.ONESIE.name);
    await inventoryPage.addToCart(PRODUCTS.RED_TSHIRT.name);

    // Verify badge shows 6
    await headerComponent.expectBadgeCount(6);

    // Navigate to cart
    await headerComponent.goToCart();

    // Verify 6 items in cart
    await cartPage.expectItemCount(6);
  });
});
