# Playwright Storefront Framework

This is a production-quality UI automation framework built with Playwright, designed using a Component-Based Page Object Model and Custom Fixtures.

## Setup
1. `npm install`
2. `npx playwright install`

## Test Organization
- **Smoke** (`tests/smoke`): P0 Critical paths.
- **Sanity** (`tests/sanity`): P1 Target functionality checks.
- **Regression** (`tests/regression`): P2 Exhaustive coverage.

## Execution
Run all tests:
```bash
npx playwright test
```

Run specific suite:
```bash
npx playwright test tests/smoke
```

Run with specific environment (default is staging):
```bash
ENV=qa npx playwright test
```
