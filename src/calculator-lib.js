'use strict';

/* Calculator library
   Exports:
   - parseNumber(input) -> Number or null
   - normalizeOp(op) -> normalized operation string
   - compute(op, a, b) -> result or throws on error (e.g., division by zero)
*/

function parseNumber(input) {
  const n = Number(input);
  if (Number.isNaN(n)) return null;
  return n;
}

function normalizeOp(op) {
  if (!op) return op;
  const lower = String(op).toLowerCase();
  if (['+', '-', '*', '/', 'x', '×', '÷'].includes(op)) return op;
  if (lower === 'add' || lower === 'plus') return 'add';
  if (lower === 'subtract' || lower === 'minus') return 'subtract';
  if (lower === 'multiply' || lower === 'mul' || lower === 'times') return 'multiply';
  if (lower === 'divide' || lower === 'div') return 'divide';
  return lower;
}

function compute(op, a, b) {
  // expecting numeric a and b
  const na = parseNumber(a);
  const nb = parseNumber(b);
  if (na === null || nb === null) {
    const err = new Error('Invalid number argument');
    err.code = 'INVALID_NUMBER';
    throw err;
  }
  switch (op) {
    case 'add':
    case '+':
      return na + nb;
    case 'subtract':
    case '-':
      return na - nb;
    case 'multiply':
    case '*':
    case 'x':
    case '×':
      return na * nb;
    case 'divide':
    case '/':
    case '÷':
      if (nb === 0) {
        const err = new Error('Division by zero');
        err.code = 'DIV_ZERO';
        throw err;
      }
      return na / nb;
    default:
      const err = new Error(`Unsupported operation: ${op}`);
      err.code = 'UNSUPPORTED_OP';
      throw err;
  }
}

module.exports = {
  parseNumber,
  normalizeOp,
  compute,
};
