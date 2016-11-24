'use strict';
const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
const db = require("../db");
const bcrypt   = require('bcrypt-nodejs');

//Users schema
let Schema = mongoose.Schema;
let userSchema = new Schema({
    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    userId: Number,
    wishList: Array,
    name: {type: String, default: ''},
    city: {type: String, default: ''},
    state: {type: String, default: ''},
    createdAt: Date
});

userSchema.pre('save', function(next) {
    // get the current date
    this.createdAt = new Date();
    next();
});

autoIncrement.initialize(db);
userSchema.plugin(autoIncrement.plugin, {
    model: 'users',
    field: 'userId'
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', userSchema);