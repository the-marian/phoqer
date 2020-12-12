const config = {
    baseUrl: {
        dev: process.browser ? 'http://140.82.39.245/api/v1' : 'http://140.82.39.245/api/v1',
        prod: process.browser ? 'http://140.82.39.245/api/v1' : 'http://140.82.39.245/api/v1',
    },
    offers: {
        grid: {
            desktop: 4,
            tablet: 3,
            mobile: 1,
        },
    },
    category: {
        grid: {
            desktop: 6,
            tablet: 4,
            mobile: 2,
        },
    },
};

export default config;
