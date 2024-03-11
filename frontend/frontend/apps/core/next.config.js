module.exports = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_BACK_URL: process.env.NEXT_PUBLIC_BACK_URL,
    },
    transpilePackages: ['ui', 'common', 'query', 'phoqer-auth', 'phoqer-author', 'phoqer-search'],
};
