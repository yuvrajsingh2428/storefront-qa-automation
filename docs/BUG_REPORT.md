# Bug Report

## Bug 01: Application URL misconfiguration causes test suite failure
- **Status:** Resolved
- **Description:** The Playwright tests defaulted to hitting `staging.example-storefront.com`. This domain does not exist, causing network resolution errors and blocking execution of all tests globally.
- **Impact:** Critical - P0. Automation suite could not execute successfully out-of-the-box.
- **Resolution:** Modified `playwright.config.ts` to default to `local` execution using `http://localhost:8080`, and properly configured Playwright's local webServer to boot up the provided `app/` directory upon execution.

## Bug 02: Flaky explicit loader waits causing intermittent test failures
- **Status:** Resolved
- **Description:** The `waitForLoaderToDisappear` function relied on `loader.isVisible()`. Due to a race condition where the loader takes a few milliseconds to attach to the DOM, the function would return `false` instantly and bypass the wait. This led to tests attempting to read DOM elements (e.g. cart badge count, total amount) before they actually rendered the new values.
- **Impact:** High - P1. Caused `Test timeout of 60000ms exceeded` and false negative test failures primarily in WebKit and Firefox engines.
- **Resolution:** Refactored the Page Object Model and tests to eliminate `waitForLoaderToDisappear` and `waitForPageLoad`. Implemented Playwright's auto-retrying web-first assertions (`toHaveText()`) which securely poll the DOM for correct values without race conditions.
