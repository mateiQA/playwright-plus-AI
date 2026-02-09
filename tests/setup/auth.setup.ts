import { test as setup } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { USERS, URLS } from '../../utils/constants';

const authFile = '.auth/user.json';

setup('authenticate as standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);

  // Wait for navigation to inventory page
  await page.waitForURL(URLS.INVENTORY);

  // Save signed-in state
  await page.context().storageState({ path: authFile });
});
