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

function parseNumbers(arr) {
  const nums = arr.map(n => {
    const v = Number(n);
    if (Number.isNaN(v)) {
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
  if (argv.length < 2) {
    usage();
    process.exit(1);
  }

  const op = argv[0].toLowerCase();
  let numbers;
  try {
    numbers = parseNumbers(argv.slice(1));
  } catch (e) {
    return; // parseNumbers already set exitCode
  }

  let result;
  switch (op) {
    case 'add':
    case '+':
      result = numbers.reduce((a, b) => a + b, 0);
      break;

    case 'subtract':
    case '-':
      // For subtract, reduce left-to-right starting with first element
      result = numbers.slice(1).reduce((a, b) => a - b, numbers[0]);
      break;

    case 'multiply':
    case '*':
    case 'x':
      result = numbers.reduce((a, b) => a * b, 1);
      break;

    case 'divide':
    case '/':
    case 'div':
      // Division must check for divide-by-zero
      try {
        result = numbers.slice(1).reduce((a, b) => {
          if (b === 0) {
            console.error('Error: Division by zero');
            process.exit(2);
            throw new Error('Division by zero');
          }
          return a / b;
        }, numbers[0]);
      } catch (e) {
        return;
      }
      break;

    case '--help':
    case '-h':
    case 'help':
      usage();
      process.exit(0);

    default:
      console.error(`Unknown operation: ${argv[0]}`);
      usage();
      process.exit(1);
  }

  // Print the result (integer if it's whole, else full number)
  if (Number.isFinite(result) && Number.isInteger(result)) {
    console.log(result);
  } else {
    console.log(result);
  }
}

main();
