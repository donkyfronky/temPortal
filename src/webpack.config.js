
const path = require('path');
const webpack = require('webpack')

const config = {
    context: path.resolve(__dirname, './client_src'),
    entry: {
        app: './index.js'
    },
    /*optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "initial",
                },
            },
        },
    },*/
    output: {
        path: path.resolve(__dirname, './'),
        chunkFilename: './public/js/[name].bundle.chunk.js',
        filename: './public/js/[name].bundle.js'
    },
    plugins: [
    ]
}

module.exports = config;