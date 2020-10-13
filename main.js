import { operate } from "./maths.js";

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
  const removeLast = (numberString) => {
    return numberString.substring(0, numberString.length - 1);
  };
  if (!numberString.includes(".") && numberString.length > NUMBER_MAX_LENGTH) {
    makeOverflow();
    return "";
  }
  if (numberString.includes(".") && numberString.length > NUMBER_MAX_LENGTH) {
    numberString = numberString.substring(0, NUMBER_MAX_LENGTH);
  }
  if (numberString.includes(".")) {
    while (numberString[numberString.length - 1] === "0")
      numberString = removeLast(numberString);
    if (numberString.endsWith(".")) numberString = removeLast(numberString);
    if (Number(numberString) === 0) numberString = "0";
  }
  return numberString;
};

const makeError = () => {
  input.error = "Error";
};

const makeOverflow = () => {
  input.error = "Overflow";
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
    if (input[operand].includes(".")) return;
    if (!input[operand]) input[operand] = "0.";
    else input[operand] += ".";
  };
  if (input.error || input.result) {
    clear();
    input.operand1 = "0.";
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

const plusMinus = () => {
  const updateOperand = (index) => {
    const operand = "operand" + index;
    if (!input[operand] || input[operand] === "0") return;
    if (input[operand].startsWith("-"))
      input[operand] = input[operand].substring(1);
    else input[operand] = "-" + input[operand];
  };
  if (input.result || input.error) return;
  if (!input.operator) {
    updateOperand("1");
  } else {
    updateOperand("2");
  }
};

const handleClick = ({ target: { id } }) => {
  if (
    id === "add" ||
    id === "subtract" ||
    id === "multiply" ||
    id === "divide"
  ) {
    inputOperator(id);
  } else if (
    id === "0" ||
    id === "1" ||
    id === "2" ||
    id === "3" ||
    id === "4" ||
    id === "5" ||
    id === "6" ||
    id === "7" ||
    id === "8" ||
    id === "9"
  ) {
    inputNumber(id);
  } else if (id === "clear") {
    clear();
  } else if (id === "equals") {
    equals();
  } else if (id === "decimal") {
    addDecimal();
  } else if (id === "plus-minus") {
    plusMinus();
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

const NUMBER_MAX_LENGTH = 8;
let calculator;
let screen;
let input;

initialize();
