# Automation Exercise Playwright

End-to-end UI automation project for [automationexercise.com](https://automationexercise.com/) using Playwright and TypeScript.

## Overview

This repository contains a Playwright test suite that validates core user flows on the Automation Exercise website.  
The project uses:

- Playwright Test runner
- Page Object Model (POM)
- Custom fixtures for reusable page objects and test data
- GitHub Actions for CI execution

## Test Coverage

The current suite includes:

1. Register User
2. Login User with correct email and password
3. Login User with incorrect email and password
4. Logout User
5. Register User with existing email
6. Contact Us Form

## Project Structure

```text
.
├── tests
│   ├── automation-exercise.spec.ts
│   ├── fixtures
│   │   └── pages.fixture.ts
│   ├── helpers
│   │   └── auth.helper.ts
│   ├── pages
│   │   ├── contact-us.page.ts
│   │   ├── home.page.ts
│   │   ├── signup-login.page.ts
│   │   └── signup.page.ts
│   └── utils
│       ├── sample.txt
│       └── user-data.factory.ts
├── playwright.config.ts
└── .github/workflows/playwright.yml
```

## Prerequisites

- Node.js (LTS recommended)
- npm

## Installation

```bash
npm ci
npx playwright install --with-deps
```

## Run Tests

Run all tests:

```bash
npx playwright test
```

Run a specific spec file:

```bash
npx playwright test tests/automation-exercise.spec.ts
```

Run in headed mode:

```bash
npx playwright test --headed
```

Open Playwright UI mode:

```bash
npx playwright test --ui
```

## Reporting and Debugging

- HTML report is generated after test execution.
- Trace collection is enabled on first retry (`trace: "on-first-retry"`).

Open the HTML report:

```bash
npx playwright show-report
```

## CI

GitHub Actions workflow: `.github/workflows/playwright.yml`

It runs on:

- push to `main` or `master`
- pull request to `main` or `master`

CI steps:

1. Checkout repository
2. Setup Node.js (LTS)
3. Install dependencies
4. Install Playwright browsers
5. Run tests
6. Upload `playwright-report` artifact

## Notes

- Tests use randomly generated user data (`tests/utils/user-data.factory.ts`) to avoid conflicts.
- `testIdAttribute` is configured as `data-qa` in `playwright.config.ts`.
