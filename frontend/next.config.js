module.exports = {
    async redirects() {
        return [
            {
                source: '/new_offer',
                destination: '/new_offer/1',
                permanent: true,
            },
        ];
    },
    i18n: {
        locales: ['en', 'pl', 'ru'],
        defaultLocale: 'ru',
    },
    images: {
        domains: ['phoqer.com', 'images-na.ssl-images-amazon.com', 'example.com'],
    },
};
