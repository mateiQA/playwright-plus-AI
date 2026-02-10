// Authentication - Login Tests
import { test } from '../../../fixtures/pages';
import { USERS, ERROR_MESSAGES } from '../../../utils/constants';

test.describe('Authentication - Login', () => {
  test('Successful login with standard user @smoke', async ({ loginPage, inventoryPage }) => {
    // Navigate to login page
    await loginPage.goto();

    // Verify login page is displayed with all elements
    await loginPage.expectToBeVisible();
    await loginPage.expectHintsVisible();

    // Enter valid credentials
    await loginPage.fillUsername(USERS.STANDARD.username);
    await loginPage.expectUsernameValue(USERS.STANDARD.username);

    await loginPage.fillPassword(USERS.STANDARD.password);
    await loginPage.expectPasswordValue(USERS.STANDARD.password);

    // Click login button
    await loginPage.clickLogin();

    // Verify successful login
    await inventoryPage.expectURL();
    await inventoryPage.expectProductCount(6);
    await inventoryPage.expectToBeVisible();
  });

  test('Login with invalid credentials', async ({ loginPage }) => {
    // Navigate to login page
    await loginPage.goto();
    await loginPage.expectToBeVisible();

    // Enter invalid credentials
    await loginPage.fillUsername('invalid_user');
    await loginPage.expectUsernameValue('invalid_user');

    await loginPage.fillPassword('wrong_password');
    await loginPage.expectPasswordValue('wrong_password');

    // Attempt login
    await loginPage.clickLogin();

    // Verify error message and remain on login page
    await loginPage.expectErrorMessage(ERROR_MESSAGES.INVALID_CREDENTIALS);
    await loginPage.expectToBeVisible();
    await loginPage.expectErrorIconsVisible();
  });

  test('Login attempt with locked out user', async ({ loginPage }) => {
    // Navigate to login page
    await loginPage.goto();
    await loginPage.expectToBeVisible();

    // Enter locked out user credentials
    await loginPage.fillUsername(USERS.LOCKED_OUT.username);
    await loginPage.expectUsernameValue(USERS.LOCKED_OUT.username);

    await loginPage.fillPassword(USERS.LOCKED_OUT.password);
    await loginPage.expectPasswordValue(USERS.LOCKED_OUT.password);

    // Attempt login
    await loginPage.clickLogin();

    // Verify locked out error message
    await loginPage.expectErrorMessage(ERROR_MESSAGES.LOCKED_OUT);
    await loginPage.expectToBeVisible();
    await loginPage.expectErrorIconsVisible();

    // Dismiss error message
    await loginPage.dismissError();
    await loginPage.expectErrorNotVisible();
    await loginPage.expectErrorIconsNotVisible();

    // Verify user can attempt login again
    await loginPage.expectToBeVisible();
  });

  test('Login with problem user', async ({ loginPage, inventoryPage }) => {
    // Navigate to login page
    await loginPage.goto();
    await loginPage.expectToBeVisible();

    // Enter problem user credentials
    await loginPage.fillUsername(USERS.PROBLEM.username);
    await loginPage.expectUsernameValue(USERS.PROBLEM.username);

    await loginPage.fillPassword(USERS.PROBLEM.password);
    await loginPage.expectPasswordValue(USERS.PROBLEM.password);

    // Click login button
    await loginPage.clickLogin();

    // Verify login succeeds (problem_user may have visual/functional issues)
    await inventoryPage.expectToBeVisible();
  });
});
