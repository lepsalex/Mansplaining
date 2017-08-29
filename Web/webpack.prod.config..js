const {
    resolve,
    join
} = require('path')const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        './src/client'
    ],
    output: {
        path: join(__dirname, 'dist/public'),
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: __dirname,
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
