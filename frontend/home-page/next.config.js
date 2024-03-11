const path = require('path');

const nextConfig = {
    reactStrictMode: false,
    i18n: {
        locales: ['en-US', 'pl', 'uk'],
        defaultLocale: 'en-US',
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        domains: ['images.unsplash.com'],
    },
    webpack5: true,
    webpack: (config, options) => {
        config.plugins.push(
            new options.webpack.container.ModuleFederationPlugin({
                name: 'container',
                filename: 'remoteEntry.js',
                remotes: {
                    auth: `auth@${process.env.PHOQER_AUTH_MODULE}/remoteEntry.js`,
                    author: `author@${process.env.PHOQER_AUTHOR_DASHBOARD}/remoteEntry.js`,
                    client: `client@${process.env.PHOQER_CLIENT_DASHBOARD}/remoteEntry.js`,
                    chats: `chats@${process.env.PHOQER_CHATS_MODULE}/remoteEntry.js`,
                },
                shared: [
                    {
                        react: {
                            eager: true,
                            singleton: true,
                            requiredVersion: false,
                        },
                    },
                    {
                        'react-dom': {
                            eager: true,
                            singleton: true,
                            requiredVersion: false,
                        },
                    },
                    {
                        phoqer: {
                            eager: true,
                            singleton: true,
                            requiredVersion: false,
                        },
                    },
                    {
                        'phoqer-shared': {
                            eager: true,
                            singleton: true,
                            requiredVersion: false,
                        },
                    },
                ],
            }),
        );
        return config;
    },
};

module.exports = nextConfig;
