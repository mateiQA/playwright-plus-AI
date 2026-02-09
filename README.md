# Playwright + TypeScript Test Automation Framework

A scalable test automation framework built with **Playwright** and **TypeScript**, using the **Page Object Model** pattern. Features fixture-based dependency injection, multi-project configuration with auth state reuse, centralized test data, and Allure reporting.

**Target application:** [SauceDemo](https://www.saucedemo.com/) (demo e-commerce site)

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | Browser automation, test runner, assertions |
| TypeScript | Type safety across page objects, fixtures, and tests |
| [Allure](https://allurereport.org/) | Test reporting with history and trend analysis |
| Page Object Model | Structured, reusable page interactions |

---

## Quick Start

```bash
# Install dependencies
npm install

# Install browsers
npx playwright install

# Run all tests (56 tests across 5 projects)
npm test

# Run with visible browser
npm run test:headed

# Run a specific project
npx playwright test --project=e2e
npx playwright test --project=auth
npx playwright test --project=api

# Run a specific test file
npx playwright test tests/e2e/checkout/checkout.spec.ts
```

---

## Project Structure

```
playwright/
├── pages/                              # Page Object Models
│   ├── LoginPage.ts                    # Login form interactions
│   ├── InventoryPage.ts                # Product listing, cart, sorting
│   ├── ProductDetailPage.ts            # Single product view
│   ├── CartPage.ts                     # Shopping cart management
│   ├── CheckoutStepOnePage.ts          # Checkout form (customer info)
│   ├── CheckoutStepTwoPage.ts          # Checkout overview (totals, payment)
│   ├── CheckoutCompletePage.ts         # Order confirmation
│   └── MenuComponent.ts               # Hamburger menu (shared component)
│
├── fixtures/                           # Custom Playwright fixtures
│   └── pages.ts                        # Page object dependency injection
│
├── utils/                              # Shared utilities
│   └── constants.ts                    # URLs, users, products, error messages
│
├── tests/
│   ├── setup/
│   │   └── auth.setup.ts               # One-time auth, saves session state
│   ├── e2e/
│   │   ├── authentication/             # Login, logout, validation (8 tests)
│   │   ├── product-catalog/            # Sorting, details, inventory (7 tests)
│   │   ├── shopping-cart/              # Add, remove, badge, persistence (9 tests)
│   │   ├── checkout/                   # Full flow, validation, cancel (7 tests)
│   │   ├── navigation/                 # Menu, footer, back buttons (7 tests)
│   │   └── problem-user/              # Known bug documentation (4 tests)
│   └── api/
│       └── api.spec.ts                 # HTTP-level tests (14 tests)
│
├── specs/                              # Test planning documents
│   └── saucedemo.plan.md
│
├── playwright.config.ts                # Multi-project config
├── tsconfig.json
└── package.json
```

---

## Architecture

### Page Object Model

Each page is a class with three layers: **locators** (getters), **actions** (async methods), and **assertions** (expect methods).

```typescript
export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // --- Locators as getters (static elements) ---
  get cartBadge(): Locator {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  // --- Actions (async methods) ---
  async addToCart(productName: string): Promise<void> {
    const item = this.page.locator('[data-test="inventory-item"]')
      .filter({ hasText: productName });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  // --- Assertions ---
  async expectBadgeCount(count: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(count));
  }
}
```

**Why getters for locators?** `page.locator()` returns a `Locator` object (no browser call) — the getter gives you full IDE autocomplete for `.fill()`, `.click()`, `.toBeVisible()` etc. When a method needs a parameter (e.g. which product), it uses a regular method instead since getters can't accept arguments.

### Container-Scoped Locators

Instead of building selectors from string manipulation (fragile), methods scope a role-based locator within a product's container:

```typescript
// Finds the "Add to cart" button inside the card that contains "Sauce Labs Backpack"
const item = this.page.locator('[data-test="inventory-item"]')
  .filter({ hasText: productName });
await item.getByRole('button', { name: 'Add to cart' }).click();
```

This approach doesn't break when product names contain special characters like `()` or `.`.

### Custom Fixtures

Page objects are injected into tests via Playwright's fixture system. Fixtures are **lazy** — only instantiated when a test destructures them.

```typescript
// fixtures/pages.ts
export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await page.addInitScript(() => window.localStorage.clear());
    await use(new InventoryPage(page));
  },
  // ... 6 more page objects
});
```

The `inventoryPage` fixture clears localStorage on every navigation as a defensive measure for cart state isolation.

### Centralized Test Data

All product names, prices, user credentials, URLs, and error messages live in `utils/constants.ts`:

```typescript
import { PRODUCTS, USERS, ERROR_MESSAGES } from '../../../utils/constants';

await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);
await productDetailPage.expectProductPrice(PRODUCTS.BACKPACK.price);
await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
```

No hardcoded strings in test files — if a product name or price changes, update one file.

---

## Multi-Project Configuration

The framework uses 5 Playwright projects to separate concerns:

| Project | Purpose | Auth |
|---------|---------|------|
| `setup` | Runs login once, saves session to `.auth/user.json` | Creates auth state |
| `e2e` | Main test suites (cart, checkout, catalog, navigation) | Reuses saved state |
| `auth` | Login, logout, validation tests | Fresh session (no saved state) |
| `problem-user` | Tests for `problem_user` account bugs | Logs in as problem_user |
| `api` | HTTP-level response/header/performance tests | No browser auth needed |

### Auth State Reuse

Login runs **once** in the `setup` project and saves browser state (cookies + localStorage). The `e2e` project loads this state via `storageState`, so tests start already authenticated — no login step per test.

```typescript
// tests/setup/auth.setup.ts
setup('authenticate as standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
  await page.waitForURL(URLS.INVENTORY);
  await page.context().storageState({ path: '.auth/user.json' });
});
```

```typescript
// playwright.config.ts — e2e project depends on setup
{
  name: 'e2e',
  use: { storageState: '.auth/user.json' },
  dependencies: ['setup'],
}
```

---

## Test Examples

### E2E Test (uses saved auth)

```typescript
import { test } from '../../../fixtures/pages';
import { PRODUCTS, TEST_DATA } from '../../../utils/constants';

test.describe('Checkout', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto(); // Already authenticated via storageState
  });

  test('Complete checkout successfully', async ({
    inventoryPage, cartPage, checkoutStepOnePage,
    checkoutStepTwoPage, checkoutCompletePage,
  }) => {
    await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);
    await inventoryPage.goToCart();
    await cartPage.clickCheckout();
    await checkoutStepOnePage.fillInfo(
      TEST_DATA.CHECKOUT.FIRST_NAME,
      TEST_DATA.CHECKOUT.LAST_NAME,
      TEST_DATA.CHECKOUT.ZIP_CODE,
    );
    await checkoutStepOnePage.clickContinue();
    await checkoutStepTwoPage.clickFinish();
    await checkoutCompletePage.expectToBeVisible();
  });
});
```

### Known Bug Documentation

Tests for `problem_user` use `test.fail()` to document known bugs — the test passes if the expected failure occurs, and fails if the bug gets fixed (alerting you to verify the fix):

```typescript
test('Problem user - add to cart inconsistency', async ({ inventoryPage }) => {
  test.fail(); // Known bug: button state doesn't update after remove
  await inventoryPage.addToCart(PRODUCTS.BACKPACK.name);
  await inventoryPage.removeFromCart(PRODUCTS.BACKPACK.name);
  await inventoryPage.expectBadgeCount(1); // Fails for problem_user
});
```

### API Tests

HTTP-level tests validate responses without browser rendering:

```typescript
test('Login page responds within 3 seconds', async ({ request }) => {
  const start = Date.now();
  const response = await request.get('https://www.saucedemo.com/');
  expect(response.status()).toBe(200);
  expect(Date.now() - start).toBeLessThan(3000);
});
```

---

## Playwright Tooling

### Test Generator

Use Playwright's codegen to scaffold new tests by recording browser interactions:

```bash
npx playwright codegen https://www.saucedemo.com
```

Records clicks, fills, and navigations as Playwright code — useful for quickly prototyping new test flows before refactoring into page objects.

### UI Mode

Interactive test runner with time-travel debugging, DOM snapshots, and network inspection:

```bash
npx playwright test --ui
```

### Trace Viewer

This framework has tracing enabled (`trace: 'on'` in config). After a test run, inspect traces with:

```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

Shows a timeline of every action, screenshot at each step, network requests, and console logs.

### Test Report

```bash
# Allure report (configured in this project)
npm run test:report

# Built-in Playwright HTML report
npx playwright show-report
```

---

## Adding New Tests

1. **Create a Page Object** in `pages/` — getters for locators, async methods for actions, `expect` methods for assertions
2. **Register it** in `fixtures/pages.ts` — add the type and fixture entry
3. **Write tests** in `tests/e2e/<feature>/` — import from `fixtures/pages`, use constants from `utils/constants.ts`
4. **Add constants** — new product data, URLs, or error messages go in `utils/constants.ts`

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run all 56 tests across all projects |
| `npm run test:headed` | Run with visible browser |
| `npm run allure:generate` | Generate Allure report from results |
| `npm run allure:open` | Open generated Allure report |
| `npm run allure:serve` | Serve Allure results directly |
| `npm run test:report` | Run tests + generate + open report |
