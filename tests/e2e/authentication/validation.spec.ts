// Authentication - Login Field Validation Tests
import { test } from '../../../fixtures/pages';
import { USERS, ERROR_MESSAGES } from '../../../utils/constants';

test.describe('Authentication - Login Validation', () => {
  test('Login with empty username', async ({ loginPage }) => {
    // Navigate to login page
    await loginPage.goto();
    await loginPage.expectToBeVisible();

    // Verify username field is empty
    await loginPage.expectUsernameValue('');

    // Enter password only
    await loginPage.fillPassword(USERS.STANDARD.password);
    await loginPage.expectPasswordValue(USERS.STANDARD.password);

    // Attempt login
    await loginPage.clickLogin();

    // Verify username required error
    await loginPage.expectErrorMessage(ERROR_MESSAGES.USERNAME_REQUIRED);
    await loginPage.expectToBeVisible();
    await loginPage.expectErrorIconsVisible();
  });

  test('Login with empty password', async ({ loginPage }) => {
    // Navigate to login page
    await loginPage.goto();
    await loginPage.expectToBeVisible();

    // Enter username only
    await loginPage.fillUsername(USERS.STANDARD.username);
    await loginPage.expectUsernameValue(USERS.STANDARD.username);

    // Verify password field is empty
    await loginPage.expectPasswordValue('');

    // Attempt login
    await loginPage.clickLogin();

    // Verify password required error
    await loginPage.expectErrorMessage(ERROR_MESSAGES.PASSWORD_REQUIRED);
    await loginPage.expectToBeVisible();
    await loginPage.expectErrorIconsVisible();
  });

  test('Login with empty credentials', async ({ loginPage }) => {
    // Navigate to login page
    await loginPage.goto();
    await loginPage.expectToBeVisible();

    // Verify both fields are empty
    await loginPage.expectUsernameValue('');
    await loginPage.expectPasswordValue('');

    // Attempt login
    await loginPage.clickLogin();

    // Verify username required error (first validation)
    await loginPage.expectErrorMessage(ERROR_MESSAGES.USERNAME_REQUIRED);
    await loginPage.expectToBeVisible();
  });
});
