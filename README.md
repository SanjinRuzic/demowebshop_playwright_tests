# Demo Web Shop E2E Tests

This is a small univeristy end‑to‑end test project for the Demo Web Shop site: https://demowebshop.tricentis.com

It uses Playwright Test with TypeScript. With the tests we have covered basic user journeys like browsing products, searching, cart/checkout flows, and simple auth.

## What’s inside
- Playwright Test (TypeScript)
- Simple Page Object Models in `pages/`
- Organized specs under `src/` (browsing/search, cart, checkout, reg/login)
- HTML report (auto-generated)
- Traces, screenshots, and videos on failures (configured)

## Prerequisites
- Node.js 18+ (LTS recommended)
- npm (comes with Node)
- Internet access (tests run against a public demo site)

## Install
1) Install dependencies
```bash
npm install
```

2) Install Playwright browsers
- Windows/macOS (basic):
```bash
npx playwright install
```
- Linux (system deps too):
```bash
npx playwright install --with-deps
```

## How to run tests
Run the whole suite (headless by default):
```bash
npx playwright test
```

Run in headed mode (visible browser window):
```bash
npx playwright test --headed
```

Run a single spec file:
```bash
npx playwright test src/browsing_and_search/product-browsing.spec.ts
```

Run tests that match a title (grep):
```bash
npx playwright test -g "Search for Existing Product"
```

Debug a test with the inspector:
```bash
npx playwright test --debug
```

Open the last HTML report:
```bash
npx playwright show-report
```
(Alternatively, open `playwright-report/index.html` in your browser.)

## Test data / environment notes
- Target site: `https://demowebshop.tricentis.com`
- This is a public demo app, so data may change and some flows (like checkout) may behave differently over time.
- No real transactions are made (for learning/testing only)

## Configuration
Key settings already defined:
- `testDir: ./src` and only files matching `*.spec.ts` are executed
- `fullyParallel: false`, `workers: 1` to reduce flakiness on a shared demo site
- `retries: 2` with `trace: 'on-first-retry'`
- `screenshot: 'only-on-failure'`, `video: 'retain-on-failure'`
- HTML reporter is enabled (list + html)
- Default timeouts: `timeout: 60s`, `expect: 10s`
- `baseURL: https://demowebshop.tricentis.com`

You can override these via CLI flags if needed (see Playwright docs).

## Folder structure 
```
.
├─ pages/                         # Page Objects (LoginPage, RegisterPage, ProductDetailsPage, ...)
├─ src/
│  ├─ browsing_and_search/        # search and category navigation specs
│  ├─ cart/                       # cart scenario specs 
│  ├─ checkout/                   # checkout flow specs
│  └─ reglogin/                   # registration/login specs
├─ playwright.config.ts           # playwright config
├─ tsconfig.json                  # typescript config
├─ package.json                   # deps + scripts
├─ playwright-report/             # generated HTML reports
└─ test-results/                  # artifacts (traces/screenshots/videos)
```

## Common issues
- Error about missing browsers: run `npx playwright install` (or `--with-deps` on Linux).
- Flaky network failures: the target is a public demo site; re-run or increase timeouts if needed.
- Corporate proxy/firewall: ensure access to `demowebshop.tricentis.com`.

## Tech stack
- Playwright Test `@playwright/test`
- TypeScript 5
- Node.js 18+

## License
For educational use only.
