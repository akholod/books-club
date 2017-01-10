'use strict';
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const favicon = require('serve-favicon');

const port = process.env.PORT || 8080;
require('./server/config/passport')(passport);
require('./db');

let index = require('./server/routes/index');
let books = require('./server/routes/books');
let booksId = require('./server/routes/books_id');
let userBooks = require('./server/routes/user_books');
let searchBooks = require('./server/routes/search-books');
let signup = require('./server/routes/signup');
let login = require('./server/routes/login');
let logout = require('./server/routes/logout');
let profile = require('./server/routes/profile');

//init app
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'client', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));

//for passport auth
app.use(session({secret: 'mysecret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//router
app.use('/', index);
app.use('/api', books);
app.use('/api', booksId);
app.use('/api', userBooks);
app.use('/api', searchBooks);
app.use('/signup', signup);
app.use('/login', login);
app.use('/logout', logout);
app.use('/api', profile);

app.listen(port, () => {
    console.log('App listen on port ' + port);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;




