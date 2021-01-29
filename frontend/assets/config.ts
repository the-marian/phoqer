const config = {
    baseUrl: {
        development: (version = 'v1'): string => 'http://phoqer.com/api/' + version,
        production: (version = 'v1'): string =>
            process.browser
                ? 'http://phoqer.com/api/' + version
                : version === 'v1'
                ? 'http://backend:8000/api/' + version
                : 'http://fastapi:8001',
    },
    uploadsUrl: (version = 'v1'): string => `http://phoqer.com/api/${version}/upload/`,
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
