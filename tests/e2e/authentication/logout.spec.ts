// Authentication - Logout Tests
import { test } from '../../../fixtures/pages';
import { USERS } from '../../../utils/constants';


test.describe('Authentication - Logout', () => {
  test('Successful logout', async ({ loginPage, inventoryPage, menuComponent }) => {
    // Login with standard user
    await loginPage.goto();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);

    // Verify user is on inventory page
    await inventoryPage.expectToBeVisible();

    // Open hamburger menu
    await inventoryPage.openMenu();

    // Verify menu items are visible
    await menuComponent.expectMenuVisible();

    // Click logout
    await menuComponent.clickLogout();

    // Verify user is redirected to login page
    await loginPage.expectToBeVisible();
  });
});
