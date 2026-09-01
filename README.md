# Agentic Playwright

[![Playwright](https://img.shields.io/badge/Playwright-Test-45BA4B?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

Reliable browser automation for UI validation, cart flows, and scenario-driven product testing.

## Project summary

Agentic Playwright is a modern automation workspace built with Playwright and TypeScript for validating real user journeys in web applications. It is designed for e-commerce-style interaction tests, product selection flows, and cart validation scenarios that require reliable UI assertions and repeatable execution.

## Features

- Browser automation powered by Playwright Test
- Structured test organization for reusable scenarios
- Reliable selectors and assertions for product and cart workflows
- Local debugging support with headed browser execution
- Easy extension for additional feature tests and validation checks

## Project structure

```text
PlayWrite_AI_Agnet_Automation/
├── .github/                        # GitHub workflows and automation
├── .vscode/                       # Editor and workspace settings
├── .gitignore                     # Ignore rules for generated files
├── node_modules/                  # Installed dependencies (generated)
├── playwright-report/             # Playwright HTML reports
├── test-results/                  # Screenshots, traces, and test output
├── specs/
│   └── README.md                 # Scenario planning and documentation
├── tests/
│   ├── demoblaze-cart.spec.ts    # DemoBlaze end-to-end coverage
│   └── seed.spec.ts              # Template for new scenarios
├── package.json                   # Project configuration and dependencies
├── playwright.config.ts           # Playwright settings
├── package-lock.json              # Locked dependency versions
├── README.md                      # Project overview and usage
└── .gitignore                    # Repository ignore rules
```

## Getting started

The DemoBlaze suite uses Page Objects under `tests/pages`, reusable fixtures under
`tests/fixtures`, and shared data under `tests/utils`.

Run the suite with `npm test`, or run TypeScript validation with `npm run typecheck`.

## Allure reporting

Run tests after clearing previous Allure results:

```bash
npm run test:allure
```

Generate and open the interactive report locally:

```bash
npm run allure:report
```

The generated `allure-report` directory is a static HTML artifact that can be
published by CI or shared as a zip archive. `allure:open` requires Java because
the Allure command-line tool serves the report locally.

### 1. Install dependencies

```bash
npm install
```

### 2. Run the full test suite

```bash
npx playwright test
```

### 3. Run a specific test file

```bash
npx playwright test tests/example.spec.ts
```

### 4. Run with a visible browser for debugging

```bash
npx playwright test --headed
```

### 5. Run a targeted browser project

```bash
npx playwright test --project=chromium
```

## Why it matters

This project provides a practical foundation for automated UI verification across interactive product flows. It helps teams move faster with deterministic browser-level testing while keeping the suite organized, readable, and easy to scale.

## Test organization

- `tests/` contains executable Playwright scenarios.
- `specs/` is used for scenario planning and project documentation.
- Generated artifacts are stored in `playwright-report/` and `test-results/`.
