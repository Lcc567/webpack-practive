const path = require('path')
const webpack = require('webpack');
var HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

console.log('process123', __dirname);
module.exports = {
    entry: {
        index: './src/index.js',
    },
    // mode: 'production',
    mode: 'development',
    // devtool: 'source-map',
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].[chunkhash].js",
        // sourcePrefix: "-------",
        // pathinfo: true
        // sourceMapFilename: "[filebase].map",
        // publicPath: '/'
    },
    // devServer: {
    //     // before(app) {
    //     //     app.get('/api/user', function (req, res) {
    //     //         res.json({ user: 'lee' })
    //     //     })
    //     // }
    //     // proxy: {
    //     //     '/api': {
    //     //         target: 'http://localhost:3000',
    //     //         pathRewrite: { '^/api': '' }
    //     //     }
    //     // }
    // },
    resolve: {
        alias: {
            print: path.resolve(__dirname, 'src/print.js')
        }
    },
    module: {
        noParse: /lodash/,
        rules: [
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'eslint-loader',
            //         options: {
            //             enforce: 'pre'
            //         }
            //     }
            // },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    // options: {
                    //     // 预设，箭头函数之类
                    //     presets: ['@babel/preset-env'],
                    //     plugins: [
                    //         // 装饰器
                    //         ["@babel/plugin-proposal-decorators", { legacy: true }],
                    //         // class属性
                    //         ["@babel/plugin-proposal-class-properties", { "loose": true }]
                    //     ]
                    // }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        esModule: false,
                        // outputPath: 'assets/'
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
            // '**/*' 删除所有文件，后面可以对删除的文件进行排除
            // cleanOnceBeforeBuildPatterns: ['**/*', '!_dll_react.js', '!react-manifest.json', '!_dll_lodash.js', '!lodash-manifest.json']
            // dry: true,
            // cleanStaleWebpackAssets: true,
        }),
       
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        // new webpack.DllReferencePlugin({
        //     manifest: path.resolve(__dirname, 'dist', 'react-manifest.json')
        // }),
        // // 多个动态文件链接
        // new webpack.DllReferencePlugin({
        //     manifest: path.resolve(__dirname, 'dist', 'lodash-manifest.json')
        // }),
        // 每一个HtmlWebpackPlugin对应一个html页面
        new HtmlWebpackPlugin({
            title: 'caching',
            filename: 'index.html',
            inject: true,
            template: './src/index.html',
            // minify: {
            //     removeComments: true,
            //     // collapseWhitespace: true,
            //     // removeAttributeQuotes: true
            // }
            // 在这里可以指定html引入的chunk，否则，会引入所有的 chunk
            // chunks: ['index'],
        }),
        new AutoDllPlugin({
            inject: true,
            filename: '_dll_[name].js',
            context: path.resolve(__dirname, 'dist'),
            entry: {
                react: ['react', 'react-dom']
            }
        }),
        // 给HtmlWebpackPlugin生成的html注入资源
        // append   false时，将资源插入index.js前面
        // new HtmlWebpackTagsPlugin({ tags: ['./_dll_react.js'], append: false }),
        // new HtmlWebpackPlugin({
        //     title: 'title',
        //     filename: 'another.html',
        //     chunks: ['another'],
        // }),
        // new ManifestPlugin(),
        // 在没有新的依赖引入是，可以避免本地改动后，vendor都重新打包，生成新的hash，
        // 可以做缓存
        new webpack.HashedModuleIdsPlugin(),
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/
        })
    ],
    optimization: {
        minimizer: [
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
            //压缩css资源的
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                //cssnano是PostCSS的CSS优化和分解插件。cssnano采用格式很好的CSS，并通过许多优化，以确保最终的生产环境尽可能小。
                cssProcessor: require('cssnano')
            })
        ],
        // splitChunks: {
        //     cacheGroups: {
        //         commons: {
        //             test: /[\\/]node_modules[\\/]/,
        //             name: "vendors",
        //             chunks: "all"
        //         }
        //     }
        // },
    }
}