const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

console.log('process123', __dirname);
module.exports = {
    entry: './src/index.js',
    mode: 'production',
    // mode: 'development',
    // devtool: 'source-map',
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].[chunkhash].js",
        // sourcePrefix: "-------",
        // pathinfo: true
        // sourceMapFilename: "[filebase].map",
        // publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            },

            {
                test: /\.(png|jpg|gif)/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        esModule: false,
                        outputPath: 'assets/'
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['last 2 version']  //兼容信息设置
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['last 2 version']  //兼容信息设置
                                })
                            ]
                        }
                    },
                    'less-loader'
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            // dry: true,
            // cleanStaleWebpackAssets: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
        }),
        // 每一个HtmlWebpackPlugin对应一个html页面
        new HtmlWebpackPlugin({
            title: 'caching',
            filename: 'index.html',
            template: './src/index.html'
            // 在这里可以指定html引入的chunk，否则，会引入所有的 chunk
            // chunks: ['index'],
        }),
        // new HtmlWebpackPlugin({
        //     title: 'title',
        //     filename: 'another.html',
        //     chunks: ['another'],
        // }),
        new ManifestPlugin(),
        // 在没有新的依赖引入是，可以避免本地改动后，vendor都重新打包，生成新的hash，
        // 可以做缓存
        new webpack.HashedModuleIdsPlugin()
    ],
    optimization: {
        // minimizer: [
        //     /*  new UglifyJsPlugin({
        //          cache: true,//启动缓存
        //          parallel: true,//启动并行压缩
        //          //如果为true的话，可以获得sourcemap
        //          sourceMap: true // set to true if you want JS source maps
        //      }), */
        //     new TerserPlugin({
        //         parallel: true,
        //         cache: true
        //     }),
        //     //压缩css资源的
        //     new OptimizeCSSAssetsPlugin({
        //         assetNameRegExp: /\.css$/g,
        //         //cssnano是PostCSS的CSS优化和分解插件。cssnano采用格式很好的CSS，并通过许多优化，以确保最终的生产环境尽可能小。
        //         cssProcessor: require('cssnano')
        //     })
        // ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        },
    }
}