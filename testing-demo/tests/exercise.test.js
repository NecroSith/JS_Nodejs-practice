const fizzBuzz = require('../exercise1');

describe('fizzBuzz', () => {
    it('should return ex if the input is not a number', () => {
        expect(() => fizzBuzz.fizzBuzz(true)).toThrow();
        expect(() => fizzBuzz.fizzBuzz(null)).toThrow();
        expect(() => fizzBuzz.fizzBuzz(undefined)).toThrow();
        expect(() => fizzBuzz.fizzBuzz({})).toThrow();
        expect(() => fizzBuzz.fizzBuzz([])).toThrow();
        expect(() => fizzBuzz.fizzBuzz('15')).toThrow();
    });

    it('should return fizzBuzz if the number is divisible by 3 and 5', () => {
        const result = fizzBuzz.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('should return fizz if the number is divisible by 3', () => {
        const result = fizzBuzz.fizzBuzz(6);
        expect(result).toBe('Fizz');
    });

    it('should return Buzz if the number is divisible by 5', () => {
        const result = fizzBuzz.fizzBuzz(10);
        expect(result).toBe('Buzz');
    });

    it('should return number if it is not divisible by 3 or 5', () => {
        const result = fizzBuzz.fizzBuzz(7);
        expect(result).toBe(7);
    });
});