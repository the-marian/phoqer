/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const pwa = withPWA({
    pwa: {
        disable: process.env.NODE_ENV === 'development',
        dest: '/public',
        runtimeCaching,
    },
});

module.exports = {
    async redirects() {
        return [
            {
                source: '/new-offer',
                destination: '/new-offer/1',
                permanent: true,
            },
            {
                source: '/profile',
                destination: '/',
                permanent: true,
            },
            {
                source: '/profile/private/:profileId',
                destination: '/profile/private/:profileId/my-offers/all',
                permanent: true,
            },
            {
                source: '/profile/private/:profileId/my-offers',
                destination: '/profile/private/:profileId/my-offers/all',
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
        domains: ['phoqer.com'],
    },
    ...pwa,
};
