const lib = require('../lib');

describe('absolute', () => {
    it('should return a positive number in the input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });

    it('should return a positive number in the input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    it('should return a 0 in the input is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it('should return a greeting message', () => {
        const result = lib.greet('Yan');
        expect(result).toMatch(/Yan/);
        expect(result).toContain('Yan');
    })
});


describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();

        // Proper way, not ideal though
        expect(result).toContain('USD');
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');

        // Ideal way
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
    })
});

describe('getProduct', () => {
    it('shoudl return a product with the given id', () => {
        const result = lib.getProduct(1);

        // toBe will fail because it compares the references of the objects in memory
        // result is in different memory location that object under toBe it considers these objects to be different
        // expect(result).toBe({ id: 1, price: 10 });

        // this is ok, just strict check
        expect(result).toEqual({ id: 1, price: 10 });

        // this is ideal way
        // toMatchObject checks if the result object has AT LEAST given properties
        // so the result object can contain any number of properties and we don't need to write them all up here
        expect(result).toMatchObject({ id: 1, price: 10 });

        // econd ideal way but it can only check 1 property at a time
        expect(result).toHaveProperty('id', 1);
    })
})