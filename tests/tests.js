// Tests that run both in the browser (tests/tests.html) and in CI (node tests/tests.js).
// Uses a tiny home-made harness so there is nothing to install.

const isNode = typeof module !== "undefined" && module.exports;
const CalculatorUnderTest = isNode ? require("../calculator.js") : Calculator;

const results = [];

function test(name, fn) {
  try {
    fn();
    results.push({ name, ok: true });
  } catch (e) {
    results.push({ name, ok: false, message: e.message });
  }
}

function assertEqual(actual, expected) {
  if (actual !== expected) {
    throw new Error(`expected "${expected}" but got "${actual}"`);
  }
}

// Helper: type a sequence like "12+3=" into a fresh calculator and return the display.
function press(keys) {
  const c = new CalculatorUnderTest();
  for (const k of keys) {
    if (k >= "0" && k <= "9") c.inputDigit(k);
    else if (k === ".") c.inputDecimal();
    else if (k === "=") c.equals();
    else if (k === "C") c.clear();
    else c.chooseOperator(k);
  }
  return c.display;
}

// --- Arithmetic ---
test("adds", () => assertEqual(press("2+3="), "5"));
test("subtracts", () => assertEqual(press("9-4="), "5"));
test("multiplies", () => assertEqual(press("6*7="), "42"));
test("divides", () => assertEqual(press("8/2="), "4"));

// --- Input handling ---
test("multi-digit numbers", () => assertEqual(press("123+456="), "579"));
test("decimals", () => assertEqual(press("1.5+2.25="), "3.75"));
test("ignores a second decimal point", () => assertEqual(press("1.2.3"), "1.23"));
test("no leading zeros", () => assertEqual(press("007"), "7"));
test("clear resets the display", () => assertEqual(press("123C"), "0"));

// --- Edge cases ---
test("floating point noise is trimmed", () => assertEqual(press("0.1+0.2="), "0.3"));
test("division by zero shows Error", () => assertEqual(press("5/0="), "Error"));
test("chained operations", () => assertEqual(press("2+3*4="), "20"));
test("typing after Error starts fresh", () => assertEqual(press("5/0=7"), "7"));

// --- Report ---
const failed = results.filter((r) => !r.ok);

if (isNode) {
  results.forEach((r) => console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.ok ? "" : " - " + r.message}`));
  console.log(`\n${results.length - failed.length}/${results.length} tests passed`);
  process.exit(failed.length ? 1 : 0);
} else {
  const list = document.getElementById("results");
  results.forEach((r) => {
    const li = document.createElement("li");
    li.className = r.ok ? "pass" : "fail";
    li.textContent = `${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.ok ? "" : " - " + r.message}`;
    list.appendChild(li);
  });
  document.getElementById("summary").textContent =
    `${results.length - failed.length}/${results.length} tests passed`;
}
