/**
 * Created by andrey on 24.11.16.
 */
'use strict';
const mongoose = require('mongoose');
mongoose.connect("mongodb://akholod:3v1a6l0e0r2a@ds139277.mlab.com:39277/shop");
//export MONGOLAB_URI="mongodb://akholod:3v1a6l0e0r2a@ds139277.mlab.com:39277/shop"

//create db connection
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
console.log('moongoose connect');

module.exports = db;
