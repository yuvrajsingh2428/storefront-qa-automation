# Test Plan

## Overview
This document outlines the test strategy and scope for the Storefront QA Automation project.

## Scope
- Validate core user journeys including product browsing, cart updates, and checkout flows.
- Ensure discounts are applied correctly.
- Verify compatibility across Chromium, Firefox, and WebKit browsers.

## Environments
- **Local:** `http://localhost:8080` (requires `ENV=local` if fallback behavior isn't updated)
- **Staging (Default for CI):** `https://staging.example-storefront.com`

## Execution Strategy
- Automated via Playwright running in fully parallel mode (`fullyParallel: true`).
- Designed using a Component-Based Page Object Model to minimize code duplication and improve test maintainability.
- No hardcoded waits are used; synchronization relies entirely on Playwright's web-first assertions.

## Defect Management
Bugs and test flakiness encountered during script execution are documented in `BUG_REPORT.md`, with evidence provided via Playwright traces and videos configured to run `on-failure`.
