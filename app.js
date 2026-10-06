// UI wiring: connects the buttons to the Calculator class.
const calc = new Calculator();
const displayEl = document.getElementById("display");

function render() {
  displayEl.textContent = calc.display;
}

document.querySelector(".keys").addEventListener("click", (event) => {
  const btn = event.target.closest("button");
  if (!btn) return;

  if (btn.dataset.digit !== undefined) calc.inputDigit(btn.dataset.digit);
  else if (btn.dataset.op !== undefined) calc.chooseOperator(btn.dataset.op);
  else if (btn.dataset.action === "decimal") calc.inputDecimal();
  else if (btn.dataset.action === "equals") calc.equals();
  else if (btn.dataset.action === "clear") calc.clear();

  render();
});

render();
