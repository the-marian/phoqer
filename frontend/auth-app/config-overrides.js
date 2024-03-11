const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    webpack: config => {
        if (config.mode === 'production') {
            config.output.publicPath = process.env.PHOQER_APP_HOST + '/';
            config.plugins.push(
                new ModuleFederationPlugin({
                    name: 'auth',
                    filename: 'remoteEntry.js',
                    exposes: {
                        './root': './src/index',
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
        }

        return config;
    },
};
