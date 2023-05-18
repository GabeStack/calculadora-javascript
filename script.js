const previewText = document.querySelector("#previuw-operacao");
const currentText = document.querySelector("#operacao-atual");
const btn = document.querySelectorAll("#botao-container button");

class Calculator {
  constructor(previewText, currentText) {
    this.previewText = previewText;
    this.currentText = currentText;
    this.currentOperation = "";
  }
  addDigit(digit) {
    if (digit === "." && this.currentText.innerText.includes(".")) {
      return;
    }
    this.currentOperation = digit;
    this.updateScreen();
  }

  processOperations(operation) {
    if (this.currentText.innerText === "" && operation !== "C") {
      if (this.previewText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }
    let operationValue;
    let previous = +this.previewText.innerText.split(" ")[0];
    let current = +this.currentText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperat();
        break;
        case "CE":
          this.processClearOperetion();
          break;
          case "C":
            this.processClearAllOperetion();
            break;
            case "=":
              this.processEqualOperetion();
              break;
      default:
        return;
    }
  }

  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentText.innerText += this.currentOperation;
    } else {
      if (previous === 0) {
        operationValue = current;
      }
      this.previewText.innerText = `${operationValue} ${operation}`;
      this.currentText.innerText = "";
    }
  }
  changeOperation(operation) {
    const mathOperation = ["*", "/", "+", "-"];
    if (!mathOperation.includes(operation)) {
      return;
    }
    this.previewText.innerText =
      this.previewText.innerText.slice(0, -1) + operation;
  }
  processDelOperat(){
    this.currentText.innerText = this.currentText.innerText.slice(0, -1);
  }
  processClearOperetion(){
    this.currentText.innerText = '';
  }
  processClearAllOperetion(){
    this.currentText.innerText = '';
    this.previewText.innerText = '';
  }
  processEqualOperetion(){
    const operation = previewText.innerHTML.split(" ")[1];

    this.processOperations(operation);
  }
}

const calc = new Calculator(previewText, currentText);

btn.forEach((item) => {
  item.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperations(value);
    }
  });
});
