const config = {
    baseUrl: {
        development: 'http://140.82.39.245/api/v1',
        production: process.browser ? 'http://140.82.39.245/api/v1' : 'http://backend:8000/api/v1',
    },
    uploadsUrl: 'http://140.82.39.245/api/v1/upload/',
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
