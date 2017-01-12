/**
 * Created by andrey on 27.11.16.
 */
'use strict';
const express = require('express');
const router = express.Router();
const booksGoogle = require('google-books-search');

router.post('/books/search', isLoggedIn, function(req, res) {
    let bookSearchOptions = {
        limit: 7,
        type: 'books',
        lang: 'ru'
    };

    if(req.body.bookLang) {
        console.log(req.body.bookLang);
        bookSearchOptions.lang = 'en';
    }
    if(req.body.bookTitle.length < 0) {//book title must have > 3 symbols
        return res.status(400).json('{"error": "Book title is to short"}')
    }

    booksGoogle.search(req.body.bookTitle, bookSearchOptions, (error, results) => {
        if (error) {
            return console.log(error);
        }
        var arr = [];
        results.forEach(function (item) {
            item.thumbnail = item.thumbnail.replace("http:", "https:");
            arr.push(item);
        });
        results = arr;
        res.json(results);
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).end();
}

module.exports = router;

