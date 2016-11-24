'use strict';
const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
const db = require("../db");

//Books schema
let Schema = mongoose.Schema;
let bookSchema = new Schema({
    bookId: Number,
    title: { type: String, required: true, unique: true},
    language: String,
    image: String,
    authors: Array,
    pageCount: Number,
    owner: String,
    request: {
        user: String,
        accepted: {type: Boolean, default: false}
    },
    createdAt: Date
});

bookSchema.pre('save', function(next) {
    // get the current date
    this.createdAt = new Date();
    next();
});

autoIncrement.initialize(db);
bookSchema.plugin(autoIncrement.plugin, {
    model: 'books',
    field: 'bookId'
});

module.exports = mongoose.model('books', bookSchema);

