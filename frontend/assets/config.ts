const config = {
    baseUrl: process.env.NODE_ENV === 'production' ? 'http://140.82.39.245/api/v1' : 'http://140.82.39.245/api/v1',
    uploadsUrl: 'http://140.82.39.245/api/upload/',
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
