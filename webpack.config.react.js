const webpack = require('webpack');
const path = require('path')

module.exports = {
    entry: {
        react: ['react', 'react-dom'],
        lodash: ['lodash']
    },
    output: {
        filename: '_dll_[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '_dll_[name]',
            path: path.join(__dirname, 'dist', '[name]-manifest.json')
        })
    ]
}