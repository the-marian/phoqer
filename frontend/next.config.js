/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const pwa = withPWA({
    pwa: {
        dest: '/public',
        runtimeCaching,
    },
});

module.exports = {
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
            {
                source: '/profile/private/:profileId',
                destination: '/profile/private/:profileId/my_offers',
                permanent: true,
            },
        ];
    },
    i18n: {
        locales: ['en', 'pl', 'ru'],
        defaultLocale: 'pl',
        domains: [
            {
                domain: 'en.phoqer.com',
                defaultLocale: 'en',
            },
            {
                domain: 'pl.phoqer.com',
                defaultLocale: 'pl',
            },
            {
                domain: 'ru.phoqer.com',
                defaultLocale: 'ru',
            },
        ],
    },
    images: {
        domains: ['phoqer.com', 'pixabay.com', 'images-na.ssl-images-amazon.com', 'example.com'],
    },
    ...pwa,
};
