const config = {
    baseUrl: {
        dev: process.browser ? 'http://140.82.39.245/api/v1' : 'http://140.82.39.245/api/v1',
        prod: process.browser ? 'http://140.82.39.245/api/v1' : 'http://backend:8000/api/v1',
    },
};

export default config;
