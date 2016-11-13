var webpack = require('webpack');

module.exports = {
    entry: {
        mainApp: './client/mainApp/AppRouter',
        login: './client/login/AppRouter'
    },
    output: {
        path: './assets',
        filename: '[name].bundle.js',
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react']
            }
        }]
    },
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false,
    //         },
    //         output: {
    //             comments: false,
    //         },
    //     }),
    // ],
};
