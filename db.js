/**
 * Created by andrey on 24.11.16.
 */
'use strict';
const mongoose = require('mongoose');
//conect to DB or testDB
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://akholod:3v1a6l0e0r2a@ds163667.mlab.com:63667/books_club');


//create db connection
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
console.log('moongoose connect');

module.exports = db;
