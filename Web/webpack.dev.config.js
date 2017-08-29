const {
    resolve,
    join
} = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './src/client'
    ],
    output: {
        path: join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin()
    ],
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            include: __dirname,
            query: {
                presets: ['react', 'es2015', 'stage-1']
            }
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
