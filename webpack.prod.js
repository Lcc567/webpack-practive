const merge = require('webpack-merge');
const common = require('./webpack.common');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',
    // 避免在生产中使用 inline-*** 和 eval-***，因为它们可以增加 bundle 大小，并降低整体性能
    // 报错时，可以具体到文件
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'precess.env.NODE_ENV': JSON.stringify('production')
        })
    ]
})