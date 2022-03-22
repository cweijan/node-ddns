const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');
const isProd = process.argv.indexOf('--mode=production') >= 0;

module.exports = [
    {
        target: "node",
        entry: ['./index.js'],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'app.js',
        },
        resolve: {
            extensions: ['.js'],
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        externals: {
            whistle: 'commonjs whistle',
        },
        optimization: {
            // minimize: isProd,
            minimize: false,
            minimizer: [new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            })],
        },
        watch: !isProd,
        mode: isProd ? 'production' : 'development',
        devtool: isProd ? false : 'source-map',
    }
];
