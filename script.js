let expression = "";
let history = [];

const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");

// BUTTON CLICK
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => handleInput(btn.dataset.value));
});

function handleInput(value) {
  if (value === "C") {
    clearAll();
  } else if (value === "DEL") {
    deleteLast();
  } else if (value === "=") {
    calculate();
  } else {
    if (resultEl.innerText !== "0" && expression === "") {
      resultEl.innerText = "0";
    }
    expression += value;
    updateDisplay();
  }
}

function updateDisplay() {
  expressionEl.innerText = expression || "0";
}

function clearAll() {
  expression = "";
  expressionEl.innerText = "0";
  resultEl.innerText = "0";
}

function deleteLast() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
    let final = expression.replace(/%/g, "/100");
    let result = eval(final);
    history.push(expression + " = " + result);
    resultEl.innerText = result;
    expression = "";
  } catch {
    resultEl.innerText = "Error";
  }
}

// MENU
const menuBtn = document.getElementById("menuBtn");
const menuBox = document.getElementById("menuBox");

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  menuBox.style.display = menuBox.style.display === "block" ? "none" : "block";
});

menuBox.addEventListener("click", e => e.stopPropagation());

document.addEventListener("click", () => {
  menuBox.style.display = "none";
});

// MENU ACTIONS
document.getElementById("resetBtn").onclick = clearAll;

document.getElementById("themeBtn").onclick = () => {
  document.body.classList.toggle("dark");
};

document.getElementById("historyBtn").onclick = () => {
  alert(history.length ? history.join("\n") : "No history yet");
};

document.getElementById("aboutBtn").onclick = () => {
  alert("Premium Glass Calculator\nMade by Disha Waghmare 💻");
};

// KEYBOARD SUPPORT
document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key) || "+-*/.%".includes(e.key)) {
    expression += e.key;
    updateDisplay();
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    deleteLast();
  } else if (e.key === "Escape") {
    clearAll();
  }
});
