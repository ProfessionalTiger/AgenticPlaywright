# Playwright E-commerce Automation

[![Playwright](https://img.shields.io/badge/Playwright-Test-45BA4B?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

Playwright and TypeScript automation for an e-commerce customer journey: signup,
login, product selection, cart management, checkout, and order confirmation.

## Project summary

The framework uses Page Object Model classes, reusable Playwright fixtures, unique
test accounts, semantic locators where available, and Allure reporting for
management-friendly results.

## Features

- Page Objects for login, signup, home, product, cart, and checkout workflows
- Unique test users created by the `registeredUser` fixture
- Chromium, Firefox, and WebKit project configuration
- Playwright HTML and Allure reports
- Failure screenshots, videos, and traces

## Project structure

```text
PlayWrite_AI_Agnet_Automation/
├── .github/                        # GitHub workflows and automation
├── .vscode/                       # Editor and workspace settings
├── .gitignore                     # Ignore rules for generated files
├── allure-report/                 # Generated static Allure HTML report
├── allure-results/                # Generated Allure test data
├── playwright-report/             # Generated Playwright HTML report
├── test-results/                  # Generated screenshots, videos, and traces
├── specs/
│   └── README.md                 # Scenario planning and documentation
├── tests/
│   ├── *.spec.ts                 # E-commerce scenarios
│   ├── fixtures/
│   │   └── test-fixtures.ts      # Page Objects and registered-user fixture
│   ├── pages/                    # Page Object Model classes
│   │   ├── CartPage.ts
│   │   ├── CheckoutPage.ts
│   │   ├── HomePage.ts
│   │   ├── LoginPage.ts
│   │   ├── ProductPage.ts
│   │   └── SignUpPage.ts
│   ├── utils/
│   │   └── test-data.ts          # Shared data and user generation
│   └── seed.spec.ts              # Template for new scenarios
├── package.json                   # Project configuration and dependencies
├── playwright.config.ts           # Playwright settings
├── package-lock.json              # Locked dependency versions
├── README.md                      # Project overview and usage
└── .gitignore                    # Repository ignore rules
```

## Getting started

The test suite uses Page Objects under `tests/pages`, reusable fixtures under
`tests/fixtures`, and shared data under `tests/utils`.

### Install

```bash
npm install
```

Install the required Playwright browsers if needed:

```bash
npx playwright install
```

### Run Tests

Run all configured browser projects:

```bash
npm test
```

Run only Chromium:

```bash
npm run test:chromium
```

Run the cart scenarios directly or with a visible browser:

```bash
npx playwright test tests
npx playwright test tests --headed
```

Validate TypeScript:

```bash
npm run typecheck
```

The configured `baseURL` points to the target e-commerce application. Navigation
uses `domcontentloaded`, and external certificate errors are tolerated for the
configured browser projects.

## Test Coverage

The cart scenario spec covers:

- New-user signup
- Successful login
- Invalid login error handling
- Product detail verification
- Add-to-cart behavior
- Cart product and total validation
- Product removal
- Place Order dialog visibility
- Complete login-to-order journey

Each test is independent. Tests that require authentication receive a unique
account from the `registeredUser` fixture; credentials are generated at runtime
and are not stored in the repository.

## Allure reporting

Run the full suite after clearing previous Allure results:

```bash
npm run test:allure
```

Generate the standalone HTML report:

```bash
npm run allure:generate
```

Open the report locally:

```bash
npm run allure:report
```

The generated `allure-report` directory is a static HTML artifact. Publish that
folder through CI or zip it for management sharing. The local `allure:open`
command requires Java because Allure serves the report through its CLI.

The main end-to-end test adds Allure Epic, Feature, Story, Severity, environment
metadata, and readable `test.step` entries. Playwright failure screenshots,
videos, and traces are available as test attachments.

Available reporting commands:

| Command | Purpose |
| --- | --- |
| `npm run allure:clean` | Remove previous Allure results and report |
| `npm run test:allure` | Run tests with fresh Allure results |
| `npm run allure:generate` | Build static HTML from results |
| `npm run allure:open` | Serve the generated report locally |
| `npm run allure:report` | Generate and serve the report |

## Test organization

- `tests/` contains executable scenarios, fixtures, Page Objects, and test data.
- `specs/` contains scenario planning and project documentation.
- Generated artifacts are stored in `playwright-report/`, `allure-report/`,
  `allure-results/`, and `test-results/`; these folders are ignored by Git.
