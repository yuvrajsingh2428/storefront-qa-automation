# Storefront QA Automation Framework

## Overview
This repository contains a production-quality UI automation framework designed specifically to test the Storefront application. Built using Playwright, TypeScript, and Node.js, the framework establishes a reliable, fast, and scalable testing infrastructure.

## Assessment Objective
The primary objective is to demonstrate a robust architecture for automated UI testing utilizing modern best practices, including a Component-Based Page Object Model (POM), custom fixtures, and Playwright's web-first auto-retrying assertions.

## Tech Stack
- **Engine:** [Playwright Test](https://playwright.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Runtime:** [Node.js](https://nodejs.org/)

## Architecture
The framework relies on a Component-Based Page Object Model. Rather than duplicating locators across tests or creating massive monolithic page objects, reusable components (such as navigations or modals) are abstracted and composed within page-specific classes. Playwright's native `test.extend` functionality is used to map these page objects to custom fixtures, allowing them to be automatically instantiated and injected into tests without repetitive setup blocks.

## Folder Structure
- `config/` — Environment-specific configuration variables (e.g., `.env.local`).
- `docs/` — Core testing documentation including test plans, test cases, bug reports, and workflow records.
- `fixtures/` — Playwright test extensions containing the mocked static states and page object instantiations.
- `pages/` — The Page Object Model layer. Contains the `BasePage`, shared `components/`, and standalone page definitions.
- `tests/` — Test scripts categorized by testing priority (`smoke/`, `sanity/`, `regression/`).
- `utils/` — Helper utility classes for processing common actions such as calculation logic and data validation.

## Installation
Ensure you have Node.js installed, then install the dependencies:
```bash
npm install
npx playwright install
```

## Running Tests
To run the full test suite across all configured browsers in parallel:
```bash
npx playwright test
```

### Targeted Execution
**Run Smoke Suite (P0 Critical paths):**
```bash
npx playwright test tests/smoke
```

**Run Sanity Suite (P1 Target functionality):**
```bash
npx playwright test tests/sanity
```

**Run Regression Suite (P2 Exhaustive coverage):**
```bash
npx playwright test tests/regression
```

### Cross-browser execution
By default, `npx playwright test` will execute tests across Chromium, Firefox, and WebKit as defined in `playwright.config.ts`. You can filter execution to a specific browser by using the `--project` flag:
```bash
npx playwright test --project=chromium
```

## Design Decisions

### Page Object Model
The POM is split into three layers:
1. `BasePage`: Exposes generic Playwright interactions to avoid code duplication across the framework.
2. `Components`: Modular chunks of the UI (e.g., Navbar) that appear across multiple pages.
3. `Pages`: The specific route layouts which compose components and define unique locators.

### Fixtures
Playwright fixtures (`fixtures/page-fixtures.ts`) completely replace traditional `beforeEach` hooks. They cleanly handle the instantiation of all Page Objects and seamlessly manage the application mocking state prior to any test execution.

### Utilities
Standalone stateless helper classes (e.g., `CartHelper`, `CurrencyHelper`) handle all data formatting and mathematical validation to keep assertions clean and separated from business logic.

### Locator Strategy
Locators prioritize user-facing attributes such as accessibility roles (`getByRole`), placeholders (`getByPlaceholder`), or dedicated test identifiers (`getByTestId`) to ensure tests remain resilient against arbitrary DOM changes.

### Mocking Strategy
To guarantee 100% test isolation, stability, and speed, the framework operates independently of a live backend. All critical application endpoints (`/products`, `/cart`, `/checkout`) are fully intercepted via Playwright's `page.route` and served dynamic mock HTML structures directly from the fixtures.

## Documentation Included
Comprehensive testing documentation is located in the `docs/` folder:
- **Test Plan:** `TEST_PLAN.md`
- **Test Cases:** `TEST_CASES.md`
- **Bug Report:** `BUG_REPORT.md`
- **AI Workflow:** `AI_WORKFLOW.md`

## Known Assumptions
- The application being tested is fully encapsulated inside the mock layer; therefore, network speed and server health do not impact test reliability.
- Environmental fallbacks depend on Node modules resolving natively without the requirement of a dedicated static frontend build folder.

## Future Improvements
- Externalize the hardcoded inline HTML mocks from `page-fixtures.ts` into a dedicated `test-data/` folder utilizing JSON mapping.
- Expand visual regression coverage using Playwright's native screenshot comparison functionality.

## Author
Senior QA Automation Engineer
