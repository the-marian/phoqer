import '@testing-library/react';

import config from '../config';

describe('Test config functions', () => {
    describe('test url formation', () => {
        it('Get site url without lags params', () => {
            expect(config.host()).toBe('/pl');
        });

        it('Get site url with pl lang', () => {
            expect(config.host('pl')).toBe('/pl');
        });

        it('Get site url with ru lang', () => {
            expect(config.host('ru')).toBe('/ru');
        });

        it('Get site url with en lang', () => {
            expect(config.host('en')).toBe('/en');
        });

        it('Get site url with ua lang', () => {
            expect(config.host('ua')).toBe('/ua');
        });
    });
});
