const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const packageJson = require('./package.json');

module.exports = {
    webpack: config => {
        if (config.mode === 'production') {
            config.output.publicPath = process.env.PHOQER_APP_HOST + '/';
            config.plugins.push(
                new ModuleFederationPlugin({
                    name: 'author',
                    filename: 'bundle.js',
                    exposes: {
                        './{{phoqer.app_name}}': './src/index',
                    },
                    shared: packageJson.dependencies,
                }),
            );
        }

        return config;
    },
};
