# Playwright Automation Task — POM Refactoring & End-to-End Coverage

Act as a **Senior SDET / Playwright Automation Architect** and modify my existing Playwright + TypeScript automation project.

## Objective

Refactor the existing test:

* `demoblaze-cart.spec.ts`

to follow a clean and maintainable **Page Object Model (POM)** design pattern.

Use **Playwright Agents** where appropriate to explore the application, understand the existing UI behavior, identify reliable locators, and generate/validate the automation flow.

The target application is:

**https://demoblaze.com/**

The final automation should cover the complete customer journey from **login → product selection → cart → checkout → successful order placement**.

Also remove the obsolete test:

* `react-shopping-cart.spec.ts`

---

## 1. First Analyze the Existing Project

Before making changes:

1. Inspect the complete repository structure.
2. Identify:

   * Playwright configuration
   * Existing test files
   * Existing fixtures
   * Existing utilities/helpers
   * Existing Page Objects, if any
   * `package.json`
   * TypeScript configuration
3. Read and understand:

   * `demoblaze-cart.spec.ts`
   * `react-shopping-cart.spec.ts`
4. Do not unnecessarily change existing project configuration.
5. Preserve the current Playwright/TypeScript conventions where they are reasonable.

---

# 2. Explore DemoBlaze Using Playwright Agents

Use Playwright Agents to explore:

https://demoblaze.com/

Understand the actual application behavior before implementing tests.

Identify the following flows:

### Authentication

* Open DemoBlaze
* Open Log in
* Enter username
* Enter password
* Submit login
* Verify successful login

### Product Browsing

* Navigate to product categories
* Select a product
* Open product details
* Verify product information
* Add product to cart

### Shopping Cart

* Open Cart
* Verify selected product
* Verify product price
* Verify cart total
* Remove product if required
* Add another product if useful for coverage

### Checkout

* Click Place Order
* Enter:

  * Name
  * Country
  * City
  * Credit Card
  * Month
  * Year
* Submit the order
* Verify successful order confirmation

Use the application's **actual DOM, accessible roles, labels, text, and behavior** to determine reliable locators.

Do NOT invent selectors.

---

# 3. Create a Proper POM Architecture

Refactor the test into Page Objects.

Use a structure similar to:

```text
tests/
├── pages/
│   ├── LoginPage.ts
│   ├── HomePage.ts
│   ├── ProductPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── tests/
│   └── demoblaze-cart.spec.ts
│
├── fixtures/
│   └── test-fixtures.ts
│
├── utils/
│   └── test-data.ts
│
└── playwright.config.ts
```

Adapt this structure to the existing repository if a different structure is already established.

---

# 4. Page Object Requirements

Each Page Object should:

* Encapsulate page-specific locators.
* Encapsulate page-specific actions.
* Avoid putting business assertions everywhere.
* Use TypeScript.
* Use Playwright's `Page`, `Locator`, and recommended APIs.
* Prefer semantic locators:

  * `getByRole`
  * `getByLabel`
  * `getByText`
  * `getByPlaceholder`
* Use CSS/XPath only when necessary.
* Avoid brittle selectors such as deeply nested CSS selectors.
* Avoid unnecessary `waitForTimeout()`.
* Use proper Playwright auto-waiting and explicit waits only when justified.

Example design:

```typescript
export class LoginPage {
  constructor(private readonly page: Page) {}

  async login(username: string, password: string) {
    // implementation
  }

  async expectLoggedIn(username: string) {
    // implementation
  }
}
```

Keep Page Objects focused on **UI interaction**, while tests should describe the business scenario.

---

# 5. Test Data

Do not hard-code test data throughout the test.

Create a test-data structure such as:

```typescript
export const testData = {
  user: {
    username: '...',
    password: '...',
  },

  order: {
    name: 'Test User',
    country: 'Pakistan',
    city: 'Lahore',
    creditCard: '4111111111111111',
    month: '12',
    year: '2030',
  },
};
```

If DemoBlaze requires a pre-existing user and the repository already contains credentials, reuse the existing test data.

If credentials are not available, identify the application's registration flow and implement test setup appropriately rather than assuming credentials.

**Do not commit real credentials or secrets.**

Prefer environment variables for sensitive values.

---

# 6. Implement End-to-End Test Coverage

Create a complete happy-path test:

### Test: User can login and successfully place an order

Expected flow:

```text
Launch application
       ↓
Login
       ↓
Verify logged-in user
       ↓
Browse products
       ↓
Select product
       ↓
Verify product details
       ↓
Add product to cart
       ↓
Open cart
       ↓
Verify product exists
       ↓
Verify cart total
       ↓
Place order
       ↓
Fill customer information
       ↓
Submit order
       ↓
Verify successful order confirmation
```

The test should be readable at the business level.

For example:

```typescript
test('user can login and successfully place an order', async ({
  loginPage,
  homePage,
  productPage,
  cartPage,
  checkoutPage,
}) => {
  await loginPage.login(...);

  await homePage.selectProduct(...);

  await productPage.addToCart();

  await cartPage.verifyProduct(...);

  await cartPage.placeOrder();

  await checkoutPage.completeOrder(...);

  await checkoutPage.verifyOrderConfirmation();
});
```

Adapt the implementation to the actual application behavior.

---

# 7. Add Additional Useful Test Cases

Besides the main happy-path scenario, add meaningful tests that improve coverage.

At minimum consider:

### Authentication

1. Successful login.
2. Invalid login credentials.
3. Login validation/error handling.

### Product

4. User can open a product.
5. User can add a product to the cart.

### Cart

6. Added product appears in cart.
7. Cart total is calculated correctly.
8. User can remove a product from cart.

### Checkout

9. User can open Place Order dialog.
10. User can successfully place an order.

Avoid creating duplicate tests that only repeat the same happy path.

---

# 8. Handle DemoBlaze-Specific Behavior

DemoBlaze may use JavaScript dialogs/modals and asynchronous UI behavior.

Investigate the actual application behavior and handle:

* Login modal
* Add-to-cart confirmation
* Place-order modal
* Successful order confirmation
* Product navigation
* Cart updates

Use Playwright event handling where required.

For example, if the application uses a browser dialog:

```typescript
page.on('dialog', async dialog => {
  await dialog.accept();
});
```

But only implement this if the actual application requires it.

Do not blindly add dialog handlers.

---

# 9. Assertions

Use meaningful assertions.

Examples:

```typescript
await expect(page.getByRole('link', { name: username })).toBeVisible();
```

```typescript
await expect(productName).toContainText(expectedProduct);
```

```typescript
await expect(orderConfirmation).toBeVisible();
```

Assertions should verify business outcomes rather than implementation details.

---

# 10. Test Independence

Each test should be independently executable.

Do not make tests dependent on the execution order of other tests.

If user registration is required:

* Prefer a setup mechanism or fixture.
* Avoid creating the same account unnecessarily for every test.
* Make test data configurable.

Do not use one test's state as another test's prerequisite.

---

# 11. Playwright Best Practices

Follow these rules:

* Use `async/await`.
* Use Playwright's built-in auto-waiting.
* Avoid `waitForTimeout()` unless there is a documented reason.
* Prefer `getByRole()` and other semantic locators.
* Avoid fragile XPath.
* Keep selectors inside Page Objects.
* Keep assertions in tests where practical.
* Keep business workflows readable.
* Use fixtures where they improve maintainability.
* Avoid duplicated code.
* Use reusable methods for common operations.
* Keep methods small and focused.
* Use strong TypeScript typing.
* Do not introduce unnecessary frameworks or dependencies.

---

# 12. Remove Obsolete Test

Delete:

```text
react-shopping-cart.spec.ts
```

After deleting it:

1. Search the entire repository for references to this test.
2. Remove obsolete references if any exist.
3. Make sure no configuration or documentation depends on it.
4. Do not delete unrelated files.

---

# 13. Validate the Implementation

After implementation:

### Run TypeScript validation

```bash
npx tsc --noEmit
```

### Run Playwright tests

```bash
npx playwright test
```

### Run the DemoBlaze test specifically

```bash
npx playwright test demoblaze-cart.spec.ts --headed
```

Also run:

```bash
npx playwright test --project=chromium
```

Fix all failures caused by the refactoring.

Do not simply skip or disable failing tests.

---

# 14. Review the Final Architecture

After implementation, review the project as a Senior SDET.

Verify:

* POM separation is correct.
* Page Objects do not contain excessive business logic.
* Tests are readable.
* Locators are stable.
* No unnecessary waits exist.
* No duplicated code exists.
* Test data is separated.
* Tests are independent.
* Error handling is appropriate.
* The deleted `react-shopping-cart.spec.ts` is no longer referenced.
* The complete login-to-order journey works.

---

# 15. Final Deliverable

When finished, provide a concise summary containing:

### Files Created

List all new Page Objects, fixtures, utilities, etc.

### Files Modified

List modified files.

### Files Deleted

Confirm:

```text
react-shopping-cart.spec.ts
```

was removed.

### Test Coverage

Provide a table:

| Test              | Coverage                  |
| ----------------- | ------------------------- |
| Successful Login  | Authentication            |
| Invalid Login     | Authentication validation |
| Product Selection | Product                   |
| Add to Cart       | Cart                      |
| Cart Verification | Cart                      |
| Remove Product    | Cart                      |
| Place Order       | Checkout                  |
| Successful Order  | End-to-End                |

### Validation

Report the result of:

```text
TypeScript compilation
Playwright test execution
Chromium execution
```

If any test cannot be executed because of an application/environment limitation, clearly explain the limitation instead of claiming it passed.

---

## Important Constraints

1. **Do not invent application behavior.**
2. Explore the real DemoBlaze application before creating locators.
3. Do not invent selectors.
4. Do not use arbitrary `waitForTimeout()` calls.
5. Do not use XPath unless there is no reliable semantic alternative.
6. Do not expose or commit credentials.
7. Do not change unrelated project files.
8. Preserve existing Playwright configuration unless a change is genuinely required.
9. Do not simply wrap the existing test in Page Objects; improve the architecture.
10. The final result must be maintainable as a real-world enterprise Playwright automation framework.
11. Use **Playwright Agents** to explore and validate the application wherever supported by the current Copilot/Playwright setup.
12. Before finishing, inspect the Git diff and ensure only intended changes are present.
