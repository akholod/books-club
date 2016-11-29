/**
 * Created by andrey on 24.11.16.
 */
'use strict';
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI);


//create db connection
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
console.log('moongoose connect');

module.exports = db;
