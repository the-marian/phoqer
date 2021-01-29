const config = {
    baseUrl: {
        development: (version = 'v1'): string => 'http://phoqer.com/api/' + version,
        production: (version = 'v1'): string =>
            (process.browser
                ? 'http://phoqer.com/api/'
                : version === 'v1'
                ? 'http://backend:8000/api/'
                : 'http://fastapi:8001/api/') + version,
    },
    uploadsUrl: (version = 'v1'): string => `http://140.82.39.245/api/${version}/upload/`,
    host: 'http://phoqer.com/',
    img: 'http://phoqer.com/',
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
