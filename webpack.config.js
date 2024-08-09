const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',

    entry: {
        app: ['./sample/src/app.tsx'],
    },

    devServer: {
        static: './sample/app',
        compress: true,
        port: 9000,
    },

    output: {
        path: path.resolve(__dirname, 'distsample'),
        filename: 'bundle.js',
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'My App',
            template: './sample/app/index.html',
        }),
    ],

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
        ],
    },
};
