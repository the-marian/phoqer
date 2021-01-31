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
        defaultLocale: 'pl',
    },
    images: {
        domains: ['phoqer.com', 'pixaba.com', 'images-na.ssl-images-amazon.com', 'example.com'],
    },
};
