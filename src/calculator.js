#!/usr/bin/env node

/*
  Node.js CLI Calculator

  Supported operations (as requested / shown in the provided image):
  - add (+)           : addition
  - subtract (-)      : subtraction
  - multiply (x, ×, *) : multiplication
  - divide (÷, /)     : division

  Examples:
    node src/calculator.js add 2 3        -> 5
    node src/calculator.js + 2 3          -> 5
    node src/calculator.js subtract 5 2   -> 3
    node src/calculator.js - 5 2          -> 3
    node src/calculator.js multiply 4 6   -> 24
    node src/calculator.js x 4 6          -> 24
    node src/calculator.js divide 10 2    -> 5
    node src/calculator.js ÷ 10 2         -> 5

  The script accepts multiple numeric operands for add, multiply. For subtract and divide
  it applies operations left-to-right (e.g., "subtract 10 3 2" -> (10 - 3) - 2).
*/

function usage() {
  console.error('Usage: node src/calculator.js <operation> <num1> <num2> [<num3> ...]');
  console.error('Operations: add | +, subtract | - , multiply | * | x, divide | /');
  console.error('Example: node src/calculator.js add 1 2 3');
}

const { parseNumber, normalizeOp, compute, squareRoot } = require('./calculator-lib');

function parseNumbers(arr) {
  const nums = arr.map(n => {
    const v = parseNumber(n);
    if (v === null) {
      console.error(`Invalid number: ${n}`);
      process.exitCode = 1;
      throw new Error('Invalid number');
    }
    return v;
  });
  return nums;
}

function main() {
  const argv = process.argv.slice(2);
  if (argv.length < 2 && argv.length !== 0) {
    usage();
    process.exit(1);
  }

  if (argv.length === 0) {
    // interactive stdin mode kept as before
    const readline = require('readline');
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question('Enter expression (e.g. 2 + 3) or "exit": ', (line) => {
      rl.close();
      const trimmed = line.trim();
      if (!trimmed || trimmed.toLowerCase() === 'exit') process.exit(0);
      const parts = trimmed.split(/\s+/);
      if (parts.length < 3) {
        console.error('Error: expected expression like "2 + 3"');
        process.exit(1);
      }
      const a = parseNumber(parts[0]);
      const op = normalizeOp(parts[1]);
      const b = parseNumber(parts[2]);
      if (a === null || b === null) {
        console.error('Error: could not parse numbers');
        process.exit(1);
      }
      try {
        const result = compute(op, a, b);
        console.log(result);
        process.exit(0);
      } catch (err) {
        if (err.code === 'DIV_ZERO') {
          console.error('Error: division by zero');
          process.exit(2);
        }
        console.error('Error:', err.message);
        process.exit(1);
      }
    });
    return;
  }

  const rawOp = argv[0];
  const op = normalizeOp(rawOp);
  let numbers;
  try {
    numbers = parseNumbers(argv.slice(1));
  } catch (e) {
    return; // parseNumbers already set exitCode
  }

  let result;
  try {
    // Support multiple operands similarly to prior behavior
    switch (op) {
      case 'add':
      case '+':
        result = numbers.reduce((a, b) => a + b, 0);
        break;

      case 'subtract':
      case '-':
        result = numbers.slice(1).reduce((a, b) => a - b, numbers[0]);
        break;

      case 'multiply':
      case '*':
      case 'x':
      case '×':
        result = numbers.reduce((a, b) => a * b, 1);
        break;

      case 'divide':
      case '/':
      case '÷':
        result = numbers.slice(1).reduce((a, b) => {
          if (b === 0) {
            const err = new Error('Division by zero');
            err.code = 'DIV_ZERO';
            throw err;
          }
          return a / b;
        }, numbers[0]);
        break;

      case 'mod':
      case '%':
      case 'modulo':
        // modulo expects exactly two operands
        if (numbers.length !== 2) {
          console.error('Error: modulo expects exactly two operands');
          process.exit(1);
        }
        if (numbers[1] === 0) {
          console.error('Error: modulo by zero');
          process.exit(2);
        }
        result = numbers[0] % numbers[1];
        break;

      case 'pow':
      case '^':
      case '**':
      case 'power':
        if (numbers.length !== 2) {
          console.error('Error: power expects exactly two operands');
          process.exit(1);
        }
        result = Math.pow(numbers[0], numbers[1]);
        break;

      case 'sqrt':
      case 'squareroot':
        if (numbers.length !== 1) {
          console.error('Error: sqrt expects exactly one operand');
          process.exit(1);
        }
        if (numbers[0] < 0) {
          console.error('Error: square root of negative number');
          process.exit(2);
        }
        result = Math.sqrt(numbers[0]);
        break;

      case '--help':
      case '-h':
      case 'help':
        usage();
        process.exit(0);

      default:
        console.error(`Unknown operation: ${rawOp}`);
        usage();
        process.exit(1);
    }
  } catch (err) {
    if (err.code === 'DIV_ZERO') {
      console.error('Error: division by zero');
      process.exit(2);
    }
    console.error('Error:', err.message);
    process.exit(1);
  }

  console.log(result);
}

main();
