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
};
