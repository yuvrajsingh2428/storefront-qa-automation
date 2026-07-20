# AI Workflow Documentation

## Generating Page Objects
1. Use AI (e.g., Copilot) to ingest DOM snippets.
2. Request AI to generate Playwright web-first locators (`getByRole`).

## Trace Analysis
- When a test fails in CI, download the trace `.zip` file.
- Provide the trace output logs to an AI assistant to analyze why a locator failed or timed out.
