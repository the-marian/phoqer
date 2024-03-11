// optional: configure or set up a testing framework before each test
// if you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// used for tests/testing-library.js
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

window.matchMedia = jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
}));

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockImplementation(() => ({
        locale: 'ua',
    })),
    Router: {
        events: {
            on: jest.fn(),
            off: jest.fn(),
        },
    },
}));
