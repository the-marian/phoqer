import '@testing-library/react';

import * as helpers from '../helpers';

describe('Test number validations', () => {
    it('Test valid number', () => {
        expect(helpers.intNumberValidation('1')).toBe(false);
    });

    it('Test not valid number', () => {
        expect(helpers.intNumberValidation('a1')).toBe(true);
    });

    it('Test floating number', () => {
        expect(helpers.intNumberValidation('12345.123')).toBe(true);
    });

    it('Test floating number with comma', () => {
        expect(helpers.intNumberValidation('1234,1244')).toBe(true);
    });
});
