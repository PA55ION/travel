const validateForm = require('./validateForm')
const supertest = require('supertest');
const app = require('../../server/app');

describe('should have correct date', () => {
    test('should return false if input field is empty', () => {
        expect(validateForm.validateForm('')).toBe(false);
    });
    test("it should return true if the date starts with month", () => {
        expect(validateForm.validateForm('04/04/2020')).toBe(true);
    });
    test("it should return true if the date starts with month", () => {
        expect(validateForm.validateForm('04-04-2020')).toBe(true);
    });
    test("it should return true if the date starts with month", () => {
        expect(validateForm.validateForm('2020-04-20')).toBe(false);
    });
    test("it should return true if the date starts with month", () => {
        expect(validateForm.validateForm('2020/04/20')).toBe(false);
    });  
});