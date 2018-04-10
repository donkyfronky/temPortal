
const path = require('path');
const webpack = require('webpack')

const config = {
    context: path.resolve(__dirname, './client_src'),
    entry: {
        app: './index.js'
    },
    output: {
        path: path.resolve(__dirname, './'),
        filename: './public/js/[name].bundle.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
}

module.exports = config;