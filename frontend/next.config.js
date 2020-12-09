module.exports = {
    async redirects() {
        return [
            {
                source: '/new_product',
                destination: '/new_product/1',
                permanent: true,
            },
        ];
    },
};
