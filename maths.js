const validateNumbers = (x, y) => {
  if (typeof x !== "number" || typeof y !== "number")
    throw new Error("Operands must be numbers.");
};

const validateDivisor = (x) => {
  if (x === 0) throw new Error("Divisor must not be zero.");
};

export const add = (x, y) => {
  validateNumbers(x, y);
  return x + y;
};

export const subtract = (x, y) => {
  validateNumbers(x, y);
  return x - y;
};

export const multiply = (x, y) => {
  validateNumbers(x, y);
  return x * y;
};

export const divide = (x, y) => {
  validateNumbers(x, y);
  validateDivisor(y);
  return x / y;
};
