/**
 * URLs used throughout the test suite
 */
export const URLS = {
  BASE: 'https://www.saucedemo.com',
  LOGIN: 'https://www.saucedemo.com/',
  INVENTORY: 'https://www.saucedemo.com/inventory.html',
  CART: 'https://www.saucedemo.com/cart.html',
  CHECKOUT_STEP_ONE: 'https://www.saucedemo.com/checkout-step-one.html',
  CHECKOUT_STEP_TWO: 'https://www.saucedemo.com/checkout-step-two.html',
  CHECKOUT_COMPLETE: 'https://www.saucedemo.com/checkout-complete.html',
};

/**
 * Test user credentials
 */
export const USERS = {
  STANDARD: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  LOCKED_OUT: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  PROBLEM: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  PERFORMANCE_GLITCH: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
  ERROR: {
    username: 'error_user',
    password: 'secret_sauce',
  },
  VISUAL: {
    username: 'visual_user',
    password: 'secret_sauce',
  },
};

/**
 * Common error messages
 */
export const ERROR_MESSAGES = {
  LOCKED_OUT: 'Epic sadface: Sorry, this user has been locked out.',
  INVALID_CREDENTIALS: 'Epic sadface: Username and password do not match any user in this service',
  USERNAME_REQUIRED: 'Epic sadface: Username is required',
  PASSWORD_REQUIRED: 'Epic sadface: Password is required',
  FIRST_NAME_REQUIRED: 'Error: First Name is required',
  LAST_NAME_REQUIRED: 'Error: Last Name is required',
  POSTAL_CODE_REQUIRED: 'Error: Postal Code is required',
};

/**
 * Product catalog
 */
export const PRODUCTS = {
  BACKPACK: { name: 'Sauce Labs Backpack', price: '$29.99' },
  BIKE_LIGHT: { name: 'Sauce Labs Bike Light', price: '$9.99' },
  BOLT_TSHIRT: { name: 'Sauce Labs Bolt T-Shirt', price: '$15.99' },
  FLEECE_JACKET: { name: 'Sauce Labs Fleece Jacket', price: '$49.99' },
  ONESIE: { name: 'Sauce Labs Onesie', price: '$7.99' },
  RED_TSHIRT: { name: 'Test.allTheThings() T-Shirt (Red)', price: '$15.99' },
};

/**
 * Common test data
 */
export const TEST_DATA = {
  CHECKOUT: {
    FIRST_NAME: 'John',
    LAST_NAME: 'Doe',
    ZIP_CODE: '12345',
  },
  PAYMENT_INFO: 'SauceCard #31337',
  SHIPPING_INFO: 'Free Pony Express Delivery!',
};
