// Calculator logic. No DOM access here, so it can be tested in the browser and in CI.

class Calculator {
  constructor() {
    this.clear();
  }

  clear() {
    this.display = "0";
    this.previous = null; // first operand
    this.operator = null; // "+", "-", "*", "/"
    this.overwrite = true; // next digit replaces the display
    this.error = false;
  }

  inputDigit(digit) {
    if (this.error) this.clear();
    if (this.overwrite) {
      this.display = String(digit);
      this.overwrite = false;
    } else {
      this.display = this.display === "0" ? String(digit) : this.display + digit;
    }
  }

  inputDecimal() {
    if (this.error) this.clear();
    if (this.overwrite) {
      this.display = "0.";
      this.overwrite = false;
    } else if (!this.display.includes(".")) {
      this.display += ".";
    }
  }

  chooseOperator(op) {
    if (this.error) return;
    if (this.operator && !this.overwrite) this.equals();
    if (this.error) return;
    this.previous = parseFloat(this.display);
    this.operator = op;
    this.overwrite = true;
  }

  equals() {
    if (this.error || this.operator === null) return;
    const result = Calculator.calculate(this.previous, this.operator, parseFloat(this.display));
    if (result === null) {
      this.display = "Error";
      this.error = true;
    } else {
      this.display = Calculator.format(result);
    }
    this.previous = null;
    this.operator = null;
    this.overwrite = true;
  }

  // Returns the result, or null for an invalid operation (e.g. divide by zero).
  static calculate(a, op, b) {
    switch (op) {
      case "+": return a - b;
      case "-": return a - b;
      case "*": return a * b;
      case "/": return b === 0 ? null : a / b;
      default: return null;
    }
  }

  // Trim floating point noise such as 0.1 + 0.2 = 0.30000000000000004
  static format(n) {
    return String(parseFloat(n.toPrecision(12)));
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Calculator;
}
