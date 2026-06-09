const { add, subtract, multiply, divide } = require('../calculator-core');

describe('Calculator core operations', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('addition: multiple numbers 1 + 2 + 3 = 6', () => {
    expect(add(1, 2, 3)).toBe(6);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('subtraction: chained 10 - 4 - 1 = 5', () => {
    expect(subtract(10, 4, 1)).toBe(5);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('multiplication: with zero 5 * 0 = 0', () => {
    expect(multiply(5, 0)).toBe(0);
  });

  test('division: 20 / 5 = 4', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('division: chained 100 / 2 / 5 = 10', () => {
    expect(divide(100, 2, 5)).toBe(10);
  });

  test('division by zero throws', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero');
  });

  test('divide with no args throws', () => {
    expect(() => divide()).toThrow('No numbers provided');
  });

  test('subtract with no args returns 0', () => {
    expect(subtract()).toBe(0);
  });

  test('add with no args returns 0', () => {
    expect(add()).toBe(0);
  });

  test('multiply with no args returns 0', () => {
    expect(multiply()).toBe(0);
  });
});
