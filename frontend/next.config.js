/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
    async redirects() {
        return [
            {
                source: '/new_offer',
                destination: '/new_offer/1',
                permanent: true,
            },
            {
                source: '/profile',
                destination: '/',
                permanent: true,
            },
        ];
    },
    i18n: {
        locales: ['en', 'pl', 'ru'],
        defaultLocale: 'pl',
    },
    images: {
        domains: ['phoqer.com', 'pixabay.com', 'images-na.ssl-images-amazon.com', 'example.com'],
    },
    pwa: {
        dest: 'public',
        runtimeCaching,
    },
});
