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
                source: '/profile/private/',
                destination: '/profile/private/my-offers/all',
                permanent: true,
            },
            {
                source: '/profile/private/my-offers',
                destination: '/profile/private/my-offers/all',
                permanent: true,
            },
        ];
    },
    i18n: {
        locales: ['en', 'pl', 'ru'],
        defaultLocale: 'pl',
    },
    images: {
        domains: ['phoqer.com'],
    },
    ...pwa,
};
