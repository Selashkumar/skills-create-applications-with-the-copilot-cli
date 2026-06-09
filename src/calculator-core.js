// Calculator core functions
// Supported operations: addition, subtraction, multiplication, division
// These functions are intentionally pure for easy unit testing.

function add(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}

function subtract(...nums) {
  if (nums.length === 0) return 0;
  return nums.slice(1).reduce((a, b) => a - b, nums[0]);
}

function multiply(...nums) {
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => a * b, 1);
}

function divide(...nums) {
  if (nums.length === 0) throw new Error('No numbers provided');
  return nums.slice(1).reduce((a, b) => {
    if (b === 0) throw new Error('Division by zero');
    return a / b;
  }, nums[0]);
}

module.exports = { add, subtract, multiply, divide };
