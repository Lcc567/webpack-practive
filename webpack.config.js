const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

console.log('process123', process.env.NODE_ENV);
module.exports = {
    entry: {
        index: './src/index.js',
        another: './src/another.js'
    },
    mode: 'production',
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'code splitting'
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    }
}