import '@testing-library/react';

import { authCookies, catList, dropValue, siteCookies, siteCookiesReverse } from '../__mocks__/config.mock';
import * as helpers from '../helpers';

describe('1. Validation', () => {
    describe('Number', () => {
        it('Test valid number', () => {
            expect(helpers.numberValidation('1')).toBe(false);
            expect(helpers.numberValidation('a1')).toBe(true);
            expect(helpers.numberValidation('12345.123')).toBe(false);
            expect(helpers.numberValidation('1234,1244')).toBe(true);
            expect(helpers.numberValidation('234,124.4')).toBe(true);
            expect(helpers.numberValidation('234e12')).toBe(true);
        });
    });

    it('Test object is empty', () => {
        const mockObj1 = { one: 'test' };
        expect(helpers.isEmpty(mockObj1)).toStrictEqual([]);

        const mockObj2 = { one: 'test', two: '' };
        expect(helpers.isEmpty(mockObj2)).toStrictEqual([['two', '']]);
    });
});

describe('2. Value formatting - 2.1 Number formatting', () => {
    describe('addZeroToNumber', () => {
        it('addZeroToNumber', () => {
            expect(helpers.addZeroToNumber(4)).toBe('04');
            expect(helpers.addZeroToNumber(41)).toBe('41');
        });
    });

    describe('moneyFormat', () => {
        it('moneyFormat', () => {
            expect(helpers.moneyFormat(100)).toBe('100.00');
            expect(helpers.moneyFormat(1000, '-')).toBe('1-000.00');
            expect(helpers.moneyFormat(100000)).toBe('100 000.00');
            expect(helpers.moneyFormat(100000.1111)).toBe('100 000.11');
            expect(helpers.moneyFormat(100000.12992239)).toBe('100 000.12');
        });
    });

    describe('declOfNum', () => {
        const daysMock = ['минута', 'минуты', 'минут'];
        it('declOfNum', () => {
            expect(helpers.declOfNum(1, daysMock)).toBe('минута');
            expect(helpers.declOfNum(2, daysMock)).toBe('минуты');
            expect(helpers.declOfNum(5, daysMock)).toBe('минут');
        });
    });
});

describe('2. Value formatting - 2.2 Date formatting', () => {
    it('dateFromTimestamp error-template', () => {
        expect(helpers.dateFromTimestamp('2020-21-21')).toBe(null);
        expect(helpers.dateFromTimestamp('2020-01-01')).toStrictEqual(new Date('2020-01-01'));
        expect(helpers.dateFromTimestamp('2021-03-10T00:00:00+00:00')).toStrictEqual(new Date('2021-03-10T00:00:00+00:00'));
    });
});

describe('2. Value formatting - 2.3 String', () => {
    it('Cut string', () => {
        expect(helpers.cutString('test-test', 100)).toBe('test-test');
        expect(helpers.cutString('test-test-test', 7)).toBe('test...');
    });

    it('formatTimestamp', () => {
        const date = new Date('2021-03-10T00:00:00+00:00');
        expect(helpers.formatTimestamp('2021-03-10T00:00:00+00:00', 'ru')).toBe(
            `Март 10, 2021 ${helpers.addZeroToNumber(date.getHours())}:00`,
        );
        expect(helpers.formatTimestamp('2021-03-10', 'ru')).toBe('Март 10, 2021');
    });

    it('addMonthToDate', () => {
        const date1 = new Date('2020-03-10');
        expect(helpers.addMonthToDate(1, date1).getMonth() - date1.getMonth()).toBe(1);
        expect(helpers.addMonthToDate(3, date1).getMonth() - date1.getMonth()).toBe(3);
    });
});

describe('3. From lodash', () => {
    it('Throttle', () => {
        const func = jest.fn();
        const throttleFunc = helpers.throttle(func, 100);

        expect(func).toHaveBeenCalledTimes(0);
        for (let i = 0; i <= 10; i++) throttleFunc();

        setTimeout(() => {
            expect(func).toHaveBeenCalledTimes(1);
            for (let i = 0; i <= 10; i++) throttleFunc();
        }, 100);

        setTimeout(() => {
            expect(func).toHaveBeenCalledTimes(2);
        }, 300);
    });
});

describe('4. Work with cookies', () => {
    it('parseCookie', () => {
        expect(helpers.parseCookie('')).toStrictEqual(null);

        expect(helpers.parseCookie(authCookies)).toStrictEqual({
            access_token: null,
            loading: false,
        });

        expect(helpers.parseCookie(siteCookies, 'phoqer_config')).toStrictEqual({
            hideSearchFilters: true,
            hideTopOffers: true,
            hideTopSearchQuery: true,
            warning: false,
        });

        expect(helpers.parseCookie(siteCookiesReverse, 'phoqer_config')).toStrictEqual({
            hideSearchFilters: true,
            hideTopOffers: true,
            hideTopSearchQuery: true,
            warning: false,
        });
    });
});

describe('5. Site related helpers 5.2 Work with categories list', () => {
    it('formatCatList', () => {
        expect(helpers.formatCatList(catList)).toStrictEqual(dropValue);
    });

    it('findCategory', () => {
        expect(helpers.findCategory(catList, 'not_exist')).toBe(null);
        expect(helpers.findCategory(catList, 'test1')).toStrictEqual(catList[0]);
    });

    it('findSubCategory', () => {
        expect(helpers.findSubCategory(catList, 'not_exist')).toBe(null);
        expect(helpers.findSubCategory(catList, 'test3.2')).toStrictEqual({
            icon_image: 'test3.2',
            image: 'test3.2',
            slug: 'test3.2',
        });
    });

    it('findParentCategory', () => {
        expect(helpers.findParentCategory(dropValue, 'not_exist')).toBe(null);
        expect(helpers.findParentCategory(dropValue, 'test3.2')).toStrictEqual({
            icon_image: 'test3',
            image: 'test3',
            slug: 'test3',
            sub: [
                {
                    icon_image: 'test3.1',
                    image: 'test3.1',
                    slug: 'test3.1',
                },
                {
                    icon_image: 'test3.2',
                    image: 'test3.2',
                    slug: 'test3.2',
                },
            ],
        });
    });
});

describe('5. Site related helpers 5.3 SSR auth-form helpers', () => {
    it('serverCookie', () => {
        expect(helpers.serverCookie({ req: { headers: { cookie: 'phoqer_auth=null' } } })).toBe(null);
        expect(helpers.serverCookie({ req: { headers: { cookie: authCookies } } })).toStrictEqual({
            access_token: null,
            loading: false,
        });
        expect(helpers.serverCookie({ req: { headers: { cookie: siteCookies } } })).toStrictEqual({
            access_token: null,
            loading: false,
        });
    });
});
