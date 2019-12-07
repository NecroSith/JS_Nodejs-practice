const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

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
});

describe('registerUser', () => {
    it('should throw an ex if username is falsy', () => {
        //we need to assure that function throws an exeptiob if username is
        // null
        // undefined
        // ''
        // false
        // NaN
        // 0
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(arg => {
            expect(() => { lib.registerUser(arg) }).toThrow();
        });
    });

    it('should return a user object if valid username is passed', () => {
        const result = lib.registerUser('Yan');
        expect(result).toMatchObject({ username: 'Yan' });
        expect(result.id).toBeGreaterThan(0);
    });
});


describe('applyDiscount', () => {
    it('should apply discount if objects are more that 10', () => {
        // to test this we need a mock function
        // which mocks behavoiur of a real function called in applyDiscount
        db.getCustomerSync = function(customerId) {
            console.log('fake reading customer');
            return { id: customerId, points: 20 }
        }
        const order = { customerId: 1, totalPrice: 10 }
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);

    });
});

describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {
        db.getCustomerSync = function(customerId) {
            return {
                email: 'a'
            }
        };

        let mailSent = false;
        // we do nothing with arguments here because we want to test interaction with two functions
        // we don't need to test mail.send function here
        mail.send = function(email, message) {
            mailSent = true;
        }
        lib.notifyCustomer({ customerId: 1 });
        expect(mailSent).toBe(true);
    });

    it('should send an email to the customer (with jest mock functions)', () => {
        // here we use built-in jest function to mock functions
        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' })
        mail.send = jest.fn();

        lib.notifyCustomer({ customerId: 1 });

        expect(mail.send).toHaveBeenCalled();
        // calls method keeps track of all the calls to this function
        // this is an array so we access the first element, whcih is the first call to this function
        // it returns an array of arguments so we check the first
        expect(mail.send.mock.calls[0][0]).toBe('a');
        // and the second
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
});