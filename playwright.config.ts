import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
    }],
  ],
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    // Auth setup — runs once, saves login state for reuse
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // E2E tests that require authentication (use saved state)
    {
      name: 'e2e',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
      },
      dependencies: ['setup'],
      testDir: './tests/e2e',
      testIgnore: ['**/authentication/**', '**/problem-user/**'],
    },

    // Authentication tests — need a clean session (no saved state)
    {
      name: 'auth',
      use: { ...devices['Desktop Chrome'] },
      testDir: './tests/e2e/authentication',
    },

    // Problem user tests — log in as a different user
    {
      name: 'problem-user',
      use: { ...devices['Desktop Chrome'] },
      testDir: './tests/e2e/problem-user',
    },

    // API tests — no browser auth needed
    {
      name: 'api',
      use: { ...devices['Desktop Chrome'] },
      testDir: './tests/api',
    },
  ],
});
