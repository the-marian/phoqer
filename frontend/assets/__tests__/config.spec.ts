import '@testing-library/react';

import { userNavLinks, userProfileLinks } from '../__mocks__/config.mock';
import config from '../config';

describe('Test config functions', () => {
    it('Get development base url without params', () => {
        expect(config.baseUrl.development()).toBe('http://phoqer.com/api/v1');
    });

    it('Get development base url with params', () => {
        expect(config.baseUrl.development('v20')).toBe('http://phoqer.com/api/v20');
    });

    it('Get production url', () => {
        expect(config.baseUrl.production()).toBe('http://backend:8001');
    });

    it('Get uploads url without params', () => {
        expect(config.uploadsUrl()).toBe('http://phoqer.com/api/v2/upload');
    });

    it('Get uploads url with params', () => {
        expect(config.uploadsUrl('v20')).toBe('http://phoqer.com/api/v20/upload');
    });

    it('Get site url without lags params', () => {
        expect(config.host()).toBe('http://phoqer.com');
    });

    it('Get site url with pl lang', () => {
        expect(config.host('pl')).toBe('http://phoqer.com');
    });

    it('Get site url with ru lang', () => {
        expect(config.host('ru')).toBe('http://phoqer.com/ru');
    });

    it('Get site url with en lang', () => {
        expect(config.host('en')).toBe('http://phoqer.com/en');
    });

    it('Test userNavLinks', () => {
        expect(JSON.stringify(config.userNavLinks('userId', { reviews: 0, messages: 0 }))).toBe(JSON.stringify(userNavLinks));
    });

    it('Test userNavLinks params "User Id"', () => {
        expect(JSON.stringify(config.userNavLinks('1', { reviews: 0, messages: 0 }))).not.toBe(JSON.stringify(userNavLinks));
    });

    it('Test userNavLinks params "reviews"', () => {
        expect(JSON.stringify(config.userNavLinks('userId', { reviews: 1, messages: 0 }))).not.toBe(JSON.stringify(userNavLinks));
    });

    it('Test userNavLinks params "messages', () => {
        expect(JSON.stringify(config.userNavLinks('userId', { reviews: 0, messages: 1 }))).not.toBe(JSON.stringify(userNavLinks));
    });

    it('Test userNavLinks', () => {
        expect(JSON.stringify(config.userProfileLinks({ reviews: 0, messages: 0 }))).toBe(JSON.stringify(userProfileLinks));
    });

    it('Test userProfileLinks params "reviews"', () => {
        expect(JSON.stringify(config.userProfileLinks({ reviews: 1, messages: 0 }))).not.toBe(JSON.stringify(userProfileLinks));
    });

    it('Test userProfileLinks params "messages', () => {
        expect(JSON.stringify(config.userProfileLinks({ reviews: 0, messages: 1 }))).not.toBe(JSON.stringify(userProfileLinks));
    });
});
