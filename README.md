# Simple Calculator

A tiny calculator built with plain HTML, CSS and JavaScript. Used to demo Git, GitHub and CI with GitHub Actions.

## Run it

Clone the repo and double-click `index.html`. No installs, no server.

## Run the tests (in the browser)

Open `tests/tests.html`. It shows PASS/FAIL for each test.

## Continuous Integration

`.github/workflows/ci.yml` runs on every push and pull request. It:

1. Checks out the code
2. Verifies the required files exist
3. Runs `node tests/tests.js` (Node is preinstalled on GitHub's runners, so you do not need it locally)

## Demo idea: watch CI fail, then pass

1. Create a branch, e.g. `git checkout -b break-it`
2. In `calculator.js`, change `case "+": return a + b;` to `return a - b;`
3. Push and open a pull request. The CI check turns red and names the failing tests.
4. Revert the change, push again. CI turns green.

## Project layout

| File | Purpose |
| --- | --- |
| `index.html`, `style.css` | The UI |
| `calculator.js` | Calculator logic (no DOM, so it is testable) |
| `app.js` | Connects the buttons to the logic |
| `tests/tests.js` | Unit tests, shared by browser and CI |
| `tests/tests.html` | Runs the tests in a browser |
| `.github/workflows/ci.yml` | The CI pipeline |
