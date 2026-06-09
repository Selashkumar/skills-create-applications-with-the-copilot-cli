
'use strict';

/* Calculator library
   Exports:
   - parseNumber(input) -> Number or null
   - normalizeOp(op) -> normalized operation string
   - compute(op, a, b) -> result or throws on error (e.g., division by zero)
   - modulo(a, b)
   - power(base, exponent)
   - squareRoot(n)
*/

function parseNumber(input) {
  const n = Number(input);
  if (Number.isNaN(n)) return null;
  return n;
}

function normalizeOp(op) {
  if (!op) return op;
  const lower = String(op).toLowerCase();
  // symbol checks use the raw op to preserve symbols like '%', '^', etc.
  if (['+', '-', '*', '/', '%', '^', '**', 'x', '×', '÷'].includes(op)) return op;
  if (lower === 'add' || lower === 'plus') return 'add';
  if (lower === 'subtract' || lower === 'minus') return 'subtract';
  if (lower === 'multiply' || lower === 'mul' || lower === 'times') return 'multiply';
  if (lower === 'divide' || lower === 'div') return 'divide';
  if (lower === 'mod' || lower === 'modulo' || lower === '%') return 'mod';
  if (lower === 'pow' || lower === 'power' || lower === '^' || lower === '**') return 'pow';
  if (lower === 'sqrt' || lower === 'squareroot') return 'sqrt';
  return lower;
}

function modulo(a, b) {
  const na = parseNumber(a);
  const nb = parseNumber(b);
  if (na === null || nb === null) {
    const err = new Error('Invalid number argument');
    err.code = 'INVALID_NUMBER';
    throw err;
  }
  if (nb === 0) {
    const err = new Error('Modulo by zero');
    err.code = 'DIV_ZERO';
    throw err;
  }
  return na % nb;
}

function power(base, exponent) {
  const nb = parseNumber(base);
  const ne = parseNumber(exponent);
  if (nb === null || ne === null) {
    const err = new Error('Invalid number argument');
    err.code = 'INVALID_NUMBER';
    throw err;
  }
  return Math.pow(nb, ne);
}

function squareRoot(n) {
  const nn = parseNumber(n);
  if (nn === null) {
    const err = new Error('Invalid number argument');
    err.code = 'INVALID_NUMBER';
    throw err;
  }
  if (nn < 0) {
    const err = new Error('Square root of negative number');
    err.code = 'NEGATIVE_SQRT';
    throw err;
  }
  return Math.sqrt(nn);
}

function compute(op, a, b) {
  // For compute we accept operations that need two operands. sqrt is handled separately in CLI.
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
    case 'mod':
    case '%':
      if (nb === 0) {
        const err = new Error('Modulo by zero');
        err.code = 'DIV_ZERO';
        throw err;
      }
      return na % nb;
    case 'pow':
    case '^':
    case '**':
      return Math.pow(na, nb);
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
  modulo,
  power,
  squareRoot,
};
