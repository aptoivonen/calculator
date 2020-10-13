import { add, subtract, multiply, divide } from "./maths.js";

const operate = (operator, x, y) => {
  const operatorLookup = {
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide,
  };

  if (operatorLookup[operator]) return operatorLookup[operator](x, y);
};

const $ = (query) => document.querySelector(query);

const updateScreen = () => {
  const { operand1, operand2, result, error } = input;
  let text;
  if (error) text = error;
  else if (result) text = result;
  else if (!operand1) text = "0";
  else if (operand1 && !operand2) text = operand1;
  else if (operand1 && operand2) text = operand2;
  screen.textContent = text;
};

const filterResult = (numberString) => {
  if (!numberString.includes(".") && numberString.length > 9) {
    makeError();
    return "";
  }
  if (numberString.includes(".") && numberString.length > 9) {
    return numberString.substring(0, 9);
  }
  return numberString;
};

const makeError = () => {
  input.error = "Error";
};

const clear = () => {
  input.operator = "";
  input.operand1 = "";
  input.operand2 = "";
  input.result = "";
  input.error = "";
};

const inputNumber = (numberString) => {
  const updateOperand = (index, numberString) => {
    const operand = "operand" + index;
    if (input[operand].length >= NUMBER_MAX_LENGTH) return;
    if (input[operand] === "0") input[operand] = numberString;
    else input[operand] += numberString;
  };
  if (input.error || input.result) {
    clear();
    input.operand1 = numberString;
  } else if (!input.operator) {
    updateOperand("1", numberString);
  } else {
    updateOperand("2", numberString);
  }
};

const inputOperator = (operatorString) => {
  const { operator, operand1, operand2 } = input;
  if (operand1 && operand2 && operator) {
    equals();
    input.operand1 = String(input.result);
    input.operator = operatorString;
    input.result = "";
  } else if (operand1) {
    input.operator = operatorString;
  }
};

const addDecimal = () => {
  const updateOperand = (index) => {
    const operand = "operand" + index;
    if (input[operand].length >= NUMBER_MAX_LENGTH) return;
    if (input[operand].endsWith(".")) return;
    input[operand] += ".";
  };
  if (input.error || input.result) {
    clear();
    input.operand1 = ".";
  } else if (!input.operator) {
    updateOperand("1");
  } else {
    updateOperand("2");
  }
};

const equals = () => {
  const { operator, operand1, operand2 } = input;
  if (!operand1 || !operand2 || !operator) return;
  const x = Number(operand1);
  const y = Number(operand2);
  if (operator === "divide" && y === 0) {
    makeError();
    return;
  }
  clear();
  input.result = filterResult(String(operate(operator, x, y)));
};

const handleClick = ({ target: { id } }) => {
  if (id === "clear") {
    clear();
  } else if (
    id === "add" ||
    id === "subtract" ||
    id === "multiply" ||
    id === "divide"
  ) {
    inputOperator(id);
  } else if (id === "equals") {
    equals();
  } else if (id === "decimal") {
    addDecimal();
  } else if (id === "zero") {
    inputNumber("0");
  } else if (id === "one") {
    inputNumber("1");
  } else if (id === "two") {
    inputNumber("2");
  } else if (id === "three") {
    inputNumber("3");
  } else if (id === "four") {
    inputNumber("4");
  } else if (id === "five") {
    inputNumber("5");
  } else if (id === "six") {
    inputNumber("6");
  } else if (id === "seven") {
    inputNumber("7");
  } else if (id === "eight") {
    inputNumber("8");
  } else if (id === "nine") {
    inputNumber("9");
  }
  updateScreen();
  console.log(input);
};

const initialize = () => {
  calculator = $("#calculator");
  calculator.addEventListener("click", handleClick);
  screen = $("#screen");
  input = { operator: "", operand1: "", operand2: "", result: "", error: "" };
  updateScreen();
};

const NUMBER_MAX_LENGTH = 9;
let calculator;
let screen;
let input;

initialize();
