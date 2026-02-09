// HTTP-level API Tests for SauceDemo
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';

test.describe('API Tests - Page Responses', () => {
  test('Login page returns 200', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/`);

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/html');
  });

  test('SPA routes return 404 without client-side rendering', async ({ request }) => {
    // SauceDemo is a React SPA — internal routes are handled client-side
    // Direct HTTP requests to these paths return 404 from the server
    const routes = [
      '/inventory.html',
      '/cart.html',
      '/checkout-step-one.html',
      '/checkout-step-two.html',
      '/checkout-complete.html',
    ];

    for (const route of routes) {
      const response = await request.get(`${BASE_URL}${route}`);
      expect(response.status()).toBe(404);
    }
  });

  test('Non-existent page returns 404', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/does-not-exist.html`);

    expect(response.status()).toBe(404);
  });
});

test.describe('API Tests - Response Headers', () => {
  test('Login page has correct content type', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/`);

    const headers = response.headers();
    expect(headers['content-type']).toContain('text/html');
  });

  test('Response includes standard headers', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/`);

    const headers = response.headers();
    expect(headers).toHaveProperty('content-type');
    expect(headers).toHaveProperty('content-length');
  });

  test('Response body is non-empty HTML', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/`);
    const body = await response.text();

    expect(body.length).toBeGreaterThan(0);
    expect(body).toContain('<!doctype html>');
    expect(body).toContain('<div id="root">');
  });
});

test.describe('API Tests - Static Assets', () => {
  test('Favicon is accessible', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/favicon.ico`);

    expect(response.status()).toBe(200);
  });

  test('Manifest file is accessible', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/manifest.json`);

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
  });
});

test.describe('API Tests - HTTP Methods', () => {
  test('HEAD request returns headers without body', async ({ request }) => {
    const response = await request.head(`${BASE_URL}/`);

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/html');
  });

  test('OPTIONS request is handled', async ({ request }) => {
    const response = await request.fetch(`${BASE_URL}/`, {
      method: 'OPTIONS',
    });

    expect([200, 204, 405]).toContain(response.status());
  });

  test('POST to root is rejected or returns non-200', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/`, {
      data: { username: 'test', password: 'test' },
    });

    // Static site should not accept POST
    expect(response.status()).not.toBe(200);
  });
});

test.describe('API Tests - Performance', () => {
  test('Login page responds within 3 seconds', async ({ request }) => {
    const start = Date.now();
    const response = await request.get(`${BASE_URL}/`);
    const duration = Date.now() - start;

    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(3000);
  });

  test('Multiple concurrent requests succeed', async ({ request }) => {
    const requests = Array.from({ length: 5 }, () =>
      request.get(`${BASE_URL}/`)
    );

    const responses = await Promise.all(requests);

    for (const response of responses) {
      expect(response.status()).toBe(200);
    }
  });
});
