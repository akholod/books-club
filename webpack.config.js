'use strict';
const path = require('path');
const webpack = require("webpack");

module.exports = {
    context: __dirname,
    entry: './client/js',
    output: {
        path: path.join(__dirname, '/client/build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {test: /\.html$/, loader: 'raw-loader'},

        ]
    },
    devtool: "source-map",
    watch: true
};