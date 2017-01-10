'use strict';
const path = require('path');
const webpack = require("webpack");

module.exports = {
    context: path.join(__dirname, '/client/'),
    entry: './js',
    output: {
        path: path.join(__dirname, '/client/build'),
        filename: 'bundle.js'
    }
};