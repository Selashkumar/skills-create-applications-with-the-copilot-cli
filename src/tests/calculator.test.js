const { compute } = require('../calculator-lib');

describe('Calculator library', () => {
  describe('Basic operations', () => {
    test('addition 2 + 3 => 5', () => {
      expect(compute('+', 2, 3)).toBe(5);
      expect(compute('add', 2, 3)).toBe(5);
    });

    test('subtraction 10 - 4 => 6', () => {
      expect(compute('-', 10, 4)).toBe(6);
      expect(compute('subtract', 10, 4)).toBe(6);
    });

    test('multiplication 45 * 2 => 90', () => {
      expect(compute('*', 45, 2)).toBe(90);
      expect(compute('multiply', 45, 2)).toBe(90);
    });

    test('division 20 / 5 => 4', () => {
      expect(compute('/', 20, 5)).toBe(4);
      expect(compute('divide', 20, 5)).toBe(4);
    });
  });

  describe('Advanced operations', () => {
    const { modulo, power, squareRoot } = require('../calculator-lib');

    test('modulo 10 % 3 => 1', () => {
      expect(modulo(10, 3)).toBe(1);
    });

    test('power 2 ** 8 => 256', () => {
      expect(power(2, 8)).toBe(256);
    });

    test('squareRoot 16 => 4', () => {
      expect(squareRoot(16)).toBe(4);
    });
  });

  describe('Edge cases', () => {
    test('division by zero should throw with DIV_ZERO code', () => {
      expect(() => compute('/', 5, 0)).toThrow('Division by zero');
      try {
        compute('/', 5, 0);
      } catch (e) {
        expect(e.code).toBe('DIV_ZERO');
      }
    });

    test('modulo by zero should throw with DIV_ZERO code', () => {
      const { modulo } = require('../calculator-lib');
      expect(() => modulo(5, 0)).toThrow('Modulo by zero');
      try {
        modulo(5, 0);
      } catch (e) {
        expect(e.code).toBe('DIV_ZERO');
      }
    });

    test('squareRoot of negative should throw NEGATIVE_SQRT', () => {
      const { squareRoot } = require('../calculator-lib');
      expect(() => squareRoot(-4)).toThrow('Square root of negative number');
      try {
        squareRoot(-4);
      } catch (e) {
        expect(e.code).toBe('NEGATIVE_SQRT');
      }
    });

    test('invalid numbers throw INVALID_NUMBER', () => {
      expect(() => compute('+', 'a', 1)).toThrow();
      try {
        compute('+', 'a', 1);
      } catch (e) {
        expect(e.code).toBe('INVALID_NUMBER');
      }
    });

    test('unsupported operation throws UNSUPPORTED_OP', () => {
      expect(() => compute('unknownop', 2, 3)).toThrow('Unsupported operation');
      try {
        compute('unknownop', 2, 3);
      } catch (e) {
        expect(e.code).toBe('UNSUPPORTED_OP');
      }
    });
  });
});
