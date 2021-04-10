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
                source: '/new',
                destination: '/new/1',
                permanent: true,
            },
            {
                source: '/profile',
                destination: '/',
                permanent: true,
            },
            {
                source: '/profile/private/',
                destination: '/profile/private/my-searchHiddenBlocks/all',
                permanent: true,
            },
            {
                source: '/profile/private/my-searchHiddenBlocks',
                destination: '/profile/private/my-searchHiddenBlocks/all',
                permanent: true,
            },
            {
                source: '/profile/private/settings/',
                destination: '/profile/private/settings/general',
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
