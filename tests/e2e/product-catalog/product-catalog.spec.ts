// Product Catalog Tests
import { test, expect } from '../../../fixtures/pages';
import { PRODUCTS } from '../../../utils/constants';

test.describe('Product Catalog', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('View product inventory', async ({ inventoryPage }) => {
    // Verify inventory page is visible
    await inventoryPage.expectToBeVisible();

    // Verify 6 products are displayed
    await inventoryPage.expectProductCount(6);

    // Verify all expected product names exist
    const productNames = await inventoryPage.inventoryItemNames.allTextContents();
    expect(productNames).toContain(PRODUCTS.BACKPACK.name);
    expect(productNames).toContain(PRODUCTS.BIKE_LIGHT.name);
    expect(productNames).toContain(PRODUCTS.BOLT_TSHIRT.name);
    expect(productNames).toContain(PRODUCTS.FLEECE_JACKET.name);
    expect(productNames).toContain(PRODUCTS.ONESIE.name);
    expect(productNames).toContain(PRODUCTS.RED_TSHIRT.name);
  });

  test('View product details', async ({ inventoryPage, productDetailPage }) => {
    // Click on Sauce Labs Backpack
    await inventoryPage.clickProduct(PRODUCTS.BACKPACK.name);

    // Verify detail page is visible
    await productDetailPage.expectToBeVisible();

    // Verify product name and price
    await productDetailPage.expectProductName(PRODUCTS.BACKPACK.name);
    await productDetailPage.expectProductPrice(PRODUCTS.BACKPACK.price);

    // Verify back button works
    await productDetailPage.goBackToProducts();
    await inventoryPage.expectToBeVisible();
  });

  test('Sort products by name A to Z', async ({ inventoryPage }) => {
    // Verify default sort (A to Z)
    const productNames = await inventoryPage.inventoryItemNames.allTextContents();
    expect(productNames[0]).toBe(PRODUCTS.BACKPACK.name);
    expect(productNames[productNames.length - 1]).toBe(PRODUCTS.RED_TSHIRT.name);
  });

  test('Sort products by name Z to A', async ({ inventoryPage }) => {
    // Sort by Name (Z to A)
    await inventoryPage.sortBy('Name (Z to A)');

    // Verify sort order
    const productNames = await inventoryPage.inventoryItemNames.allTextContents();
    expect(productNames[0]).toBe(PRODUCTS.RED_TSHIRT.name);
    expect(productNames[productNames.length - 1]).toBe(PRODUCTS.BACKPACK.name);
  });

  test('Sort products by price low to high', async ({ inventoryPage }) => {
    // Sort by Price (low to high)
    await inventoryPage.sortBy('Price (low to high)');

    // Verify sort order
    const productPrices = await inventoryPage.inventoryItemPrices.allTextContents();
    expect(productPrices[0]).toBe(PRODUCTS.ONESIE.price);
    expect(productPrices[productPrices.length - 1]).toBe(PRODUCTS.FLEECE_JACKET.price);
  });

  test('Sort products by price high to low', async ({ inventoryPage }) => {
    // Sort by Price (high to low)
    await inventoryPage.sortBy('Price (high to low)');

    // Verify sort order
    const productPrices = await inventoryPage.inventoryItemPrices.allTextContents();
    expect(productPrices[0]).toBe(PRODUCTS.FLEECE_JACKET.price);
    expect(productPrices[productPrices.length - 1]).toBe(PRODUCTS.ONESIE.price);
  });

  test('Add to cart from product detail page', async ({ inventoryPage, productDetailPage }) => {
    // Click on Sauce Labs Backpack
    await inventoryPage.clickProduct(PRODUCTS.BACKPACK.name);

    // Add to cart from detail page
    await productDetailPage.addToCart();

    // Verify Remove button is visible on detail page
    await productDetailPage.expectRemoveVisible();

    // Go back to inventory
    await productDetailPage.goBackToProducts();

    // Verify inventory page shows Remove button for Backpack
    await inventoryPage.expectRemoveButtonVisible(PRODUCTS.BACKPACK.name);
  });
});
