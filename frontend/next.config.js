const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const pwa =
    process.env.NODE_ENV === 'development'
        ? {}
        : withPWA({
              pwa: {
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
                destination: '/profile/private',
                permanent: true,
            },
            {
                source: '/profile/private/my-offers',
                destination: '/profile/private/my-offers/all',
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
        locales: ['en', 'ru', 'ua'],
        defaultLocale: 'en',
    },
    images: {
        domains: ['phoqer.com'],
    },
    ...pwa,
};
