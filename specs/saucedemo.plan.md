# Saucedemo E-Commerce Test Plan

## Application Overview

Saucedemo is a demonstration e-commerce website (https://www.saucedemo.com/) designed for testing purposes. The application features a product catalog with 6 items, shopping cart functionality, and a multi-step checkout process. The site provides multiple test user accounts with different behaviors including standard user, locked out user, problem user, performance glitch user, error user, and visual user. All users share the password "secret_sauce". The application includes sorting capabilities, navigation menu, and order completion flow.

## Test Scenarios

### 1. Authentication

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful Login with Standard User

**File:** `tests/authentication/successful-login-standard-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
    - expect: Username and Password fields are visible
    - expect: Login button is present
    - expect: List of accepted usernames is displayed
    - expect: Password hint shows 'secret_sauce'
  2. Enter 'standard_user' in the Username field
    - expect: Username field contains 'standard_user'
  3. Enter 'secret_sauce' in the Password field
    - expect: Password field is populated (masked)
  4. Click the Login button
    - expect: User is redirected to inventory page (/inventory.html)
    - expect: Product catalog is displayed with 6 products
    - expect: Shopping cart icon is visible in header
    - expect: Hamburger menu is visible
    - expect: Page title shows 'Products'

#### 1.2. Login Attempt with Locked Out User

**File:** `tests/authentication/locked-out-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'locked_out_user' in the Username field
    - expect: Username field contains 'locked_out_user'
  3. Enter 'secret_sauce' in the Password field
    - expect: Password field is populated
  4. Click the Login button
    - expect: Error message is displayed: 'Epic sadface: Sorry, this user has been locked out.'
    - expect: User remains on login page
    - expect: Red error icon appears on both input fields
    - expect: Close button (X) is visible on error message
  5. Click the error close button (X)
    - expect: Error message is dismissed
    - expect: Red error icons are removed from input fields
    - expect: User can attempt login again

#### 1.3. Login with Invalid Credentials

**File:** `tests/authentication/invalid-credentials.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'invalid_user' in the Username field
    - expect: Username field contains 'invalid_user'
  3. Enter 'wrong_password' in the Password field
    - expect: Password field is populated
  4. Click the Login button
    - expect: Error message is displayed: 'Epic sadface: Username and password do not match any user in this service'
    - expect: User remains on login page
    - expect: Red error icons appear on both input fields

#### 1.4. Login with Empty Username

**File:** `tests/authentication/empty-username.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Leave Username field empty
    - expect: Username field is empty
  3. Enter 'secret_sauce' in the Password field
    - expect: Password field is populated
  4. Click the Login button
    - expect: Error message is displayed: 'Epic sadface: Username is required'
    - expect: User remains on login page
    - expect: Red error icons appear on input fields

#### 1.5. Login with Empty Password

**File:** `tests/authentication/empty-password.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'standard_user' in the Username field
    - expect: Username field contains 'standard_user'
  3. Leave Password field empty
    - expect: Password field is empty
  4. Click the Login button
    - expect: Error message is displayed: 'Epic sadface: Password is required'
    - expect: User remains on login page
    - expect: Red error icons appear on input fields

#### 1.6. Login with Empty Credentials

**File:** `tests/authentication/empty-credentials.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Leave both Username and Password fields empty
    - expect: Both fields are empty
  3. Click the Login button
    - expect: Error message is displayed: 'Epic sadface: Username is required'
    - expect: User remains on login page

#### 1.7. Successful Logout

**File:** `tests/authentication/successful-logout.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Click the hamburger menu button
    - expect: Side menu opens
    - expect: Menu displays: All Items, About, Logout, Reset App State
  3. Click the 'Logout' link
    - expect: User is redirected to login page
    - expect: All session data is cleared
    - expect: Login form is displayed

#### 1.8. Login with Problem User

**File:** `tests/authentication/problem-user-login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'problem_user' in the Username field
    - expect: Username field contains 'problem_user'
  3. Enter 'secret_sauce' in the Password field
    - expect: Password field is populated
  4. Click the Login button
    - expect: User is redirected to inventory page
    - expect: Products are displayed (note: problem_user may have visual/functional issues throughout the application)

### 2. Product Catalog

**Seed:** `tests/seed.spec.ts`

#### 2.1. View Product Inventory

**File:** `tests/product-catalog/view-inventory.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Verify all products are displayed
    - expect: Six products are visible: Sauce Labs Backpack ($29.99), Sauce Labs Bike Light ($9.99), Sauce Labs Bolt T-Shirt ($15.99), Sauce Labs Fleece Jacket ($49.99), Sauce Labs Onesie ($7.99), Test.allTheThings() T-Shirt (Red) ($15.99)
    - expect: Each product shows image, name, description, and price
    - expect: Each product has 'Add to cart' button

#### 2.2. View Product Details

**File:** `tests/product-catalog/view-product-details.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Click on product name 'Sauce Labs Backpack' or product image
    - expect: User is redirected to product detail page (/inventory-item.html?id=4)
    - expect: Large product image is displayed
    - expect: Product name, description, and price are shown
    - expect: 'Back to products' button is visible
    - expect: Add to cart/Remove button is visible
  3. Click 'Back to products' button
    - expect: User is redirected back to inventory page
    - expect: All products are displayed

#### 2.3. Sort Products by Name (A to Z)

**File:** `tests/product-catalog/sort-name-asc.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
    - expect: Default sorting is 'Name (A to Z)'
  2. Verify default product order
    - expect: Products are displayed alphabetically: Sauce Labs Backpack, Sauce Labs Bike Light, Sauce Labs Bolt T-Shirt, Sauce Labs Fleece Jacket, Sauce Labs Onesie, Test.allTheThings() T-Shirt (Red)

#### 2.4. Sort Products by Name (Z to A)

**File:** `tests/product-catalog/sort-name-desc.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Click on the sort dropdown
    - expect: Sort options are displayed
  3. Select 'Name (Z to A)' from dropdown
    - expect: Products are re-ordered in reverse alphabetical order: Test.allTheThings() T-Shirt (Red), Sauce Labs Onesie, Sauce Labs Fleece Jacket, Sauce Labs Bolt T-Shirt, Sauce Labs Bike Light, Sauce Labs Backpack
    - expect: Dropdown shows 'Name (Z to A)' as selected

#### 2.5. Sort Products by Price (Low to High)

**File:** `tests/product-catalog/sort-price-asc.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Click on the sort dropdown
    - expect: Sort options are displayed
  3. Select 'Price (low to high)' from dropdown
    - expect: Products are re-ordered by price ascending: Sauce Labs Onesie ($7.99), Sauce Labs Bike Light ($9.99), Sauce Labs Bolt T-Shirt ($15.99), Test.allTheThings() T-Shirt (Red) ($15.99), Sauce Labs Backpack ($29.99), Sauce Labs Fleece Jacket ($49.99)
    - expect: Dropdown shows 'Price (low to high)' as selected

#### 2.6. Sort Products by Price (High to Low)

**File:** `tests/product-catalog/sort-price-desc.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Click on the sort dropdown
    - expect: Sort options are displayed
  3. Select 'Price (high to low)' from dropdown
    - expect: Products are re-ordered by price descending: Sauce Labs Fleece Jacket ($49.99), Sauce Labs Backpack ($29.99), Sauce Labs Bolt T-Shirt ($15.99), Test.allTheThings() T-Shirt (Red) ($15.99), Sauce Labs Bike Light ($9.99), Sauce Labs Onesie ($7.99)
    - expect: Dropdown shows 'Price (high to low)' as selected

#### 2.7. Sorting Persists After Navigation

**File:** `tests/product-catalog/sort-persistence.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Select 'Price (low to high)' from sort dropdown
    - expect: Products are sorted by price ascending
  3. Click on a product to view details
    - expect: Product detail page is displayed
  4. Click 'Back to products'
    - expect: User returns to inventory page
    - expect: Products maintain 'Price (low to high)' sorting

### 3. Shopping Cart

**Seed:** `tests/seed.spec.ts`

#### 3.1. Add Single Item to Cart from Inventory

**File:** `tests/shopping-cart/add-single-item.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
    - expect: Cart badge is not visible (empty cart)
  2. Click 'Add to cart' button for 'Sauce Labs Backpack'
    - expect: Button text changes to 'Remove'
    - expect: Cart badge appears showing '1'
    - expect: Product remains on inventory page

#### 3.2. Add Multiple Items to Cart

**File:** `tests/shopping-cart/add-multiple-items.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Click 'Add to cart' for 'Sauce Labs Backpack'
    - expect: Cart badge shows '1'
  3. Click 'Add to cart' for 'Sauce Labs Bike Light'
    - expect: Cart badge shows '2'
  4. Click 'Add to cart' for 'Sauce Labs Bolt T-Shirt'
    - expect: Cart badge shows '3'
    - expect: All three products show 'Remove' button

#### 3.3. Add Item from Product Detail Page

**File:** `tests/shopping-cart/add-from-detail-page.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Click on 'Sauce Labs Backpack' product name
    - expect: Product detail page is displayed
  3. Click 'Add to cart' button on detail page
    - expect: Button changes to 'Remove'
    - expect: Cart badge shows '1'
  4. Click 'Back to products'
    - expect: User returns to inventory page
    - expect: Sauce Labs Backpack shows 'Remove' button
    - expect: Cart badge still shows '1'

#### 3.4. Remove Item from Inventory Page

**File:** `tests/shopping-cart/remove-from-inventory.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Click 'Add to cart' for 'Sauce Labs Backpack'
    - expect: Cart badge shows '1'
    - expect: Button changes to 'Remove'
  3. Click 'Remove' button
    - expect: Button changes back to 'Add to cart'
    - expect: Cart badge disappears (cart is empty)

#### 3.5. View Cart with Items

**File:** `tests/shopping-cart/view-cart-with-items.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Add 'Sauce Labs Backpack', 'Sauce Labs Bike Light', and 'Sauce Labs Bolt T-Shirt' to cart
    - expect: Cart badge shows '3'
  3. Click on shopping cart icon
    - expect: User is redirected to cart page (/cart.html)
    - expect: Page title shows 'Your Cart'
    - expect: All three items are displayed with quantity, description, and price
    - expect: Each item has a 'Remove' button
    - expect: 'Continue Shopping' button is visible
    - expect: 'Checkout' button is visible

#### 3.6. View Empty Cart

**File:** `tests/shopping-cart/view-empty-cart.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
    - expect: Cart is empty
  2. Click on shopping cart icon
    - expect: User is redirected to cart page
    - expect: No items are displayed
    - expect: 'Continue Shopping' and 'Checkout' buttons are visible

#### 3.7. Remove Item from Cart Page

**File:** `tests/shopping-cart/remove-from-cart-page.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Add 'Sauce Labs Backpack' and 'Sauce Labs Bike Light' to cart
    - expect: Cart badge shows '2'
  3. Navigate to cart page
    - expect: Both items are displayed
  4. Click 'Remove' button for 'Sauce Labs Backpack'
    - expect: Sauce Labs Backpack is removed from cart
    - expect: Cart badge updates to '1'
    - expect: Only Sauce Labs Bike Light remains in cart

#### 3.8. Continue Shopping from Cart

**File:** `tests/shopping-cart/continue-shopping.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Add items to cart and navigate to cart page
    - expect: Cart page is displayed with items
  3. Click 'Continue Shopping' button
    - expect: User is redirected back to inventory page
    - expect: Cart badge still displays correct item count
    - expect: Previously added items still show 'Remove' buttons

#### 3.9. Cart Badge Updates Across Pages

**File:** `tests/shopping-cart/cart-badge-persistence.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Add 2 items to cart
    - expect: Cart badge shows '2'
  3. Navigate to product detail page
    - expect: Cart badge still shows '2'
  4. Navigate to cart page
    - expect: Cart badge still shows '2'
  5. Navigate back to inventory
    - expect: Cart badge still shows '2'

#### 3.10. Add All Products to Cart

**File:** `tests/shopping-cart/add-all-products.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Add all 6 products to cart
    - expect: Cart badge shows '6'
    - expect: All products show 'Remove' button
  3. Navigate to cart page
    - expect: All 6 products are displayed in cart
    - expect: Total quantity is 6 items

### 4. Checkout Process

**Seed:** `tests/seed.spec.ts`

#### 4.1. Complete Checkout Successfully

**File:** `tests/checkout/successful-checkout.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Add 'Sauce Labs Backpack' and 'Sauce Labs Bike Light' to cart
    - expect: Cart badge shows '2'
  3. Navigate to cart page and click 'Checkout'
    - expect: User is redirected to checkout step 1 (/checkout-step-one.html)
    - expect: Page title shows 'Checkout: Your Information'
    - expect: First Name, Last Name, and Zip/Postal Code fields are visible
    - expect: 'Cancel' and 'Continue' buttons are visible
  4. Enter 'John' in First Name field
    - expect: First Name field contains 'John'
  5. Enter 'Doe' in Last Name field
    - expect: Last Name field contains 'Doe'
  6. Enter '12345' in Zip/Postal Code field
    - expect: Zip/Postal Code field contains '12345'
  7. Click 'Continue' button
    - expect: User is redirected to checkout step 2 (/checkout-step-two.html)
    - expect: Page title shows 'Checkout: Overview'
    - expect: All cart items are displayed with quantities and prices
    - expect: Payment Information shows 'SauceCard #31337'
    - expect: Shipping Information shows 'Free Pony Express Delivery!'
    - expect: Item total, tax, and total are calculated correctly
    - expect: 'Cancel' and 'Finish' buttons are visible
  8. Verify order totals (Item total: $39.98, Tax: $3.20, Total: $43.18)
    - expect: Calculations are correct
  9. Click 'Finish' button
    - expect: User is redirected to checkout complete page (/checkout-complete.html)
    - expect: Page title shows 'Checkout: Complete!'
    - expect: Success message 'Thank you for your order!' is displayed
    - expect: Pony Express image is shown
    - expect: Message states 'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    - expect: 'Back Home' button is visible
    - expect: Cart badge disappears (cart is empty)
  10. Click 'Back Home' button
    - expect: User is redirected to inventory page
    - expect: Cart is empty
    - expect: All products show 'Add to cart' buttons

#### 4.2. Checkout with Missing First Name

**File:** `tests/checkout/missing-first-name.spec.ts`

**Steps:**
  1. Login with standard_user credentials and add items to cart
    - expect: Cart has items
  2. Navigate to checkout step 1
    - expect: Checkout information form is displayed
  3. Leave First Name field empty
    - expect: First Name field is empty
  4. Enter 'Doe' in Last Name and '12345' in Zip/Postal Code
    - expect: Last Name and Zip fields are populated
  5. Click 'Continue' button
    - expect: Error message is displayed: 'Error: First Name is required'
    - expect: User remains on checkout step 1
    - expect: Red error icons appear on form fields

#### 4.3. Checkout with Missing Last Name

**File:** `tests/checkout/missing-last-name.spec.ts`

**Steps:**
  1. Login with standard_user credentials and add items to cart
    - expect: Cart has items
  2. Navigate to checkout step 1
    - expect: Checkout information form is displayed
  3. Enter 'John' in First Name field
    - expect: First Name field contains 'John'
  4. Leave Last Name field empty
    - expect: Last Name field is empty
  5. Enter '12345' in Zip/Postal Code field
    - expect: Zip field is populated
  6. Click 'Continue' button
    - expect: Error message is displayed: 'Error: Last Name is required'
    - expect: User remains on checkout step 1
    - expect: Red error icons appear on form fields

#### 4.4. Checkout with Missing Zip Code

**File:** `tests/checkout/missing-zip-code.spec.ts`

**Steps:**
  1. Login with standard_user credentials and add items to cart
    - expect: Cart has items
  2. Navigate to checkout step 1
    - expect: Checkout information form is displayed
  3. Enter 'John' in First Name and 'Doe' in Last Name
    - expect: Both name fields are populated
  4. Leave Zip/Postal Code field empty
    - expect: Zip field is empty
  5. Click 'Continue' button
    - expect: Error message is displayed: 'Error: Postal Code is required'
    - expect: User remains on checkout step 1
    - expect: Red error icons appear on form fields

#### 4.5. Checkout with All Fields Empty

**File:** `tests/checkout/all-fields-empty.spec.ts`

**Steps:**
  1. Login with standard_user credentials and add items to cart
    - expect: Cart has items
  2. Navigate to checkout step 1
    - expect: Checkout information form is displayed
  3. Leave all fields empty
    - expect: All fields are empty
  4. Click 'Continue' button
    - expect: Error message is displayed: 'Error: First Name is required'
    - expect: User remains on checkout step 1

#### 4.6. Cancel Checkout from Step 1

**File:** `tests/checkout/cancel-step-one.spec.ts`

**Steps:**
  1. Login with standard_user credentials and add items to cart
    - expect: Cart badge shows item count
  2. Navigate to checkout step 1
    - expect: Checkout information form is displayed
  3. Enter some information in the fields
    - expect: Fields contain data
  4. Click 'Cancel' button
    - expect: User is redirected back to cart page
    - expect: Cart still contains all items
    - expect: Entered information is not saved

#### 4.7. Cancel Checkout from Step 2

**File:** `tests/checkout/cancel-step-two.spec.ts`

**Steps:**
  1. Login with standard_user credentials and add items to cart
    - expect: Cart has items
  2. Complete checkout step 1 with valid information
    - expect: User is on checkout step 2 (overview)
  3. Click 'Cancel' button
    - expect: User is redirected back to inventory page
    - expect: Cart still contains all items
    - expect: Cart badge shows correct count

#### 4.8. Checkout with Single Item

**File:** `tests/checkout/single-item-checkout.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Add only 'Sauce Labs Onesie' ($7.99) to cart
    - expect: Cart badge shows '1'
  3. Complete checkout process with valid information
    - expect: Checkout overview shows: Item total: $7.99, Tax calculated correctly, Total amount calculated correctly
    - expect: Order completes successfully

#### 4.9. Checkout with Maximum Items

**File:** `tests/checkout/maximum-items-checkout.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Add all 6 products to cart
    - expect: Cart badge shows '6'
  3. Complete checkout process
    - expect: Checkout overview displays all 6 items
    - expect: Item total: $129.94
    - expect: Tax calculated correctly
    - expect: Total calculated correctly
    - expect: Order completes successfully

#### 4.10. Verify Payment and Shipping Information

**File:** `tests/checkout/verify-payment-shipping.spec.ts`

**Steps:**
  1. Login with standard_user credentials and add items to cart
    - expect: Cart has items
  2. Complete checkout step 1 and proceed to overview
    - expect: User is on checkout overview page
  3. Verify Payment Information section
    - expect: Payment Information label is displayed
    - expect: SauceCard #31337 is shown
  4. Verify Shipping Information section
    - expect: Shipping Information label is displayed
    - expect: Free Pony Express Delivery! is shown

#### 4.11. Direct URL Access to Checkout Without Items

**File:** `tests/checkout/direct-url-checkout-empty.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
    - expect: Cart is empty
  2. Navigate directly to /checkout-step-one.html URL
    - expect: User can access checkout page
    - expect: Checkout form is displayed
    - expect: Cart badge shows no items
  3. Fill in checkout information and continue
    - expect: Can proceed to checkout overview
    - expect: Overview shows no items
    - expect: Item total is $0.00

### 5. Navigation

**Seed:** `tests/seed.spec.ts`

#### 5.1. Hamburger Menu - All Items

**File:** `tests/navigation/menu-all-items.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Navigate to cart page
    - expect: User is on cart page
  3. Click hamburger menu button
    - expect: Side menu opens with options: All Items, About, Logout, Reset App State
  4. Click 'All Items' link
    - expect: User is redirected to inventory page
    - expect: Menu closes
    - expect: All products are displayed

#### 5.2. Hamburger Menu - About Link

**File:** `tests/navigation/menu-about.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Click hamburger menu button
    - expect: Side menu opens
  3. Click 'About' link
    - expect: User is redirected to https://saucelabs.com/ (external website)
    - expect: User leaves the Saucedemo application

#### 5.3. Hamburger Menu - Reset App State

**File:** `tests/navigation/menu-reset-app-state.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Add multiple items to cart
    - expect: Cart badge shows item count
  3. Click hamburger menu button
    - expect: Side menu opens
  4. Click 'Reset App State' link
    - expect: Cart is cleared
    - expect: Cart badge disappears
    - expect: All 'Remove' buttons change back to 'Add to cart'
    - expect: User remains on current page
    - expect: Menu closes

#### 5.4. Close Hamburger Menu

**File:** `tests/navigation/close-menu.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Click hamburger menu button
    - expect: Side menu opens
  3. Click the 'X' close button
    - expect: Side menu closes
    - expect: User remains on inventory page
    - expect: Menu overlay disappears

#### 5.5. Shopping Cart Icon Navigation

**File:** `tests/navigation/cart-icon-navigation.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Click shopping cart icon (with or without items)
    - expect: User is redirected to cart page
    - expect: Cart contents are displayed

#### 5.6. Back Button in Product Detail

**File:** `tests/navigation/back-from-product-detail.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Click on any product
    - expect: Product detail page is displayed
  3. Click 'Back to products' button
    - expect: User is redirected to inventory page
    - expect: Previous scroll position and sort order are maintained

#### 5.7. Footer Social Media Links

**File:** `tests/navigation/footer-social-links.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Scroll to footer
    - expect: Footer displays Twitter, Facebook, and LinkedIn icons
    - expect: Copyright text is visible: '© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy'
  3. Verify social media links are present
    - expect: Twitter link points to https://twitter.com/saucelabs
    - expect: Facebook link points to https://www.facebook.com/saucelabs
    - expect: LinkedIn link points to https://www.linkedin.com/company/sauce-labs/

### 6. Problem User Specific Tests

**Seed:** `tests/seed.spec.ts`

#### 6.1. Problem User - Cart Badge Issue

**File:** `tests/problem-user/cart-badge-bug.spec.ts`

**Steps:**
  1. Login with problem_user credentials
    - expect: User is on inventory page
  2. Add an item to cart
    - expect: Cart badge shows '1'
  3. Remove the item from inventory page
    - expect: Bug: Cart badge may not update correctly
    - expect: Button may not change back to 'Add to cart' properly
  4. Verify cart badge persistence issue
    - expect: Badge may still show count even after items are removed

#### 6.2. Problem User - Checkout Form Field Swap

**File:** `tests/problem-user/checkout-field-swap.spec.ts`

**Steps:**
  1. Login with problem_user credentials
    - expect: User is on inventory page
  2. Add items to cart and proceed to checkout
    - expect: Checkout form is displayed
  3. Enter 'John' in First Name field
    - expect: Bug: Text may appear in wrong field (Last Name)
  4. Attempt to fill all fields correctly
    - expect: Form inputs may have incorrect behavior
    - expect: Values may appear in wrong fields

#### 6.3. Problem User - Product Images

**File:** `tests/problem-user/product-images-bug.spec.ts`

**Steps:**
  1. Login with problem_user credentials
    - expect: User is on inventory page
  2. Verify product images
    - expect: Bug: All product images may display the same image
    - expect: Images may not correspond to actual products
  3. Navigate to product detail page
    - expect: Bug: Product image may be incorrect

#### 6.4. Problem User - Complete Flow with Workarounds

**File:** `tests/problem-user/complete-flow-workaround.spec.ts`

**Steps:**
  1. Login with problem_user credentials
    - expect: User is on inventory page with potential visual issues
  2. Add items to cart (noting any badge issues)
    - expect: Items are added despite UI bugs
  3. Navigate to cart and verify items are actually present
    - expect: Cart shows correct items regardless of badge display
  4. Proceed to checkout and work around form field issues
    - expect: May need to use alternative methods to enter information
  5. Attempt to complete checkout
    - expect: Verify if order can be completed despite UI issues

### 7. Edge Cases and Boundary Conditions

**Seed:** `tests/seed.spec.ts`

#### 7.1. Session Persistence

**File:** `tests/edge-cases/session-persistence.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Add items to cart
    - expect: Cart badge shows item count
  3. Refresh the page
    - expect: User remains logged in
    - expect: Cart items persist
    - expect: Cart badge shows correct count

#### 7.2. Browser Back Button After Checkout

**File:** `tests/edge-cases/back-button-after-checkout.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Complete full checkout process
    - expect: Order complete page is displayed
    - expect: Cart is empty
  3. Click browser back button
    - expect: Verify application behavior
    - expect: Cart should remain empty
    - expect: User should not be able to re-submit order

#### 7.3. Multiple Add/Remove Cycles

**File:** `tests/edge-cases/multiple-add-remove-cycles.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Add 'Sauce Labs Backpack' to cart
    - expect: Cart badge shows '1'
  3. Remove 'Sauce Labs Backpack' from cart
    - expect: Cart badge disappears
  4. Add 'Sauce Labs Backpack' again
    - expect: Cart badge shows '1'
  5. Repeat add/remove cycle 5 times
    - expect: Each cycle works correctly
    - expect: Cart badge updates accurately
    - expect: No errors occur

#### 7.4. Rapid Button Clicking

**File:** `tests/edge-cases/rapid-clicking.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Rapidly click 'Add to cart' button multiple times for same product
    - expect: Product is only added once
    - expect: Cart badge shows '1' not multiple additions
    - expect: Button changes to 'Remove' after first click

#### 7.5. Direct URL Access Without Login

**File:** `tests/edge-cases/direct-url-no-login.spec.ts`

**Steps:**
  1. Without logging in, navigate directly to /inventory.html
    - expect: User is redirected to login page
    - expect: Error message may appear: 'Epic sadface: You can only access '/inventory.html' when you are logged in.'
  2. Without logging in, navigate directly to /cart.html
    - expect: User is redirected to login page
  3. Without logging in, navigate directly to /checkout-step-one.html
    - expect: User is redirected to login page

#### 7.6. Special Characters in Checkout Form

**File:** `tests/edge-cases/special-characters-checkout.spec.ts`

**Steps:**
  1. Login with standard_user credentials and add items to cart
    - expect: Cart has items
  2. Navigate to checkout step 1
    - expect: Checkout form is displayed
  3. Enter special characters in First Name: 'John@#$%'
    - expect: Characters are accepted or rejected based on validation
  4. Enter special characters in Last Name: 'Doe!@#'
    - expect: Characters are accepted or rejected
  5. Enter letters in Zip Code: 'ABCDE'
    - expect: Verify if letters are accepted in postal code field
  6. Attempt to continue
    - expect: Verify validation behavior with special characters

#### 7.7. Very Long Input in Checkout Fields

**File:** `tests/edge-cases/long-input-checkout.spec.ts`

**Steps:**
  1. Login with standard_user credentials and proceed to checkout
    - expect: Checkout form is displayed
  2. Enter very long string (500+ characters) in First Name field
    - expect: Verify field handling: truncation, rejection, or acceptance
    - expect: UI should not break
  3. Enter very long string in Last Name and Zip Code fields
    - expect: Verify application handles long inputs gracefully

#### 7.8. Checkout Calculation Accuracy

**File:** `tests/edge-cases/checkout-calculation-accuracy.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Add specific items to cart: Sauce Labs Onesie ($7.99) and Sauce Labs Bike Light ($9.99)
    - expect: Cart badge shows '2'
  3. Complete checkout to overview page
    - expect: Item total: $17.98
    - expect: Tax is calculated correctly (verify tax rate)
    - expect: Total = Item total + Tax
  4. Verify all decimal calculations are accurate
    - expect: No rounding errors
    - expect: All amounts display with 2 decimal places

#### 7.9. Product Link Accessibility

**File:** `tests/edge-cases/product-link-types.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Click on product image
    - expect: Product detail page opens
  3. Go back and click on product name link
    - expect: Product detail page opens for same product
  4. Verify both navigation methods work consistently
    - expect: Same product details are shown regardless of link clicked

#### 7.10. Sorting After Adding Items to Cart

**File:** `tests/edge-cases/sort-with-cart-items.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is on inventory page
  2. Add 'Sauce Labs Backpack' and 'Sauce Labs Onesie' to cart
    - expect: Cart badge shows '2'
    - expect: Both show 'Remove' buttons
  3. Change sort to 'Price (low to high)'
    - expect: Products reorder
    - expect: Added items still show 'Remove' buttons in their new positions
    - expect: Cart badge still shows '2'
  4. Verify cart integrity after multiple sort changes
    - expect: Cart maintains correct items regardless of sort order
