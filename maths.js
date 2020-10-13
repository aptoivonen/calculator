const validateNumbers = (x, y) => {
  if (typeof x !== "number" || typeof y !== "number")
    throw new Error("Operands must be numbers.");
};

const validateDivisor = (x) => {
  if (x === 0) throw new Error("Divisor must not be zero.");
};

const add = (x, y) => {
  validateNumbers(x, y);
  return x + y;
};

const subtract = (x, y) => {
  validateNumbers(x, y);
  return x - y;
};

const multiply = (x, y) => {
  validateNumbers(x, y);
  return x * y;
};

const divide = (x, y) => {
  validateNumbers(x, y);
  validateDivisor(y);
  return x / y;
};

export const operate = (operator, x, y) => {
  const operatorLookup = {
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide,
  };

  if (operatorLookup[operator]) return operatorLookup[operator](x, y);
};
