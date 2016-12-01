/**
 * Created by andrey on 27.11.16.
 */
'use strict';
const express = require('express');
const router = express.Router();
const booksGoogle = require('google-books-search');

router.post('/books/search', function(req, res) {
    let bookSearchOptions = {
        limit: 5,
        type: 'books',
        lang: 'ru'
    };
    if(req.body.bookTitle.length < 0) {//book title must have > 3 symbols
        return res.status(400).json('{"error": "Book title is to short"}')
    }
    if(req.body.bookLang) {//if lang is not English set option lang (two-letter ISO-639-1 code)
        bookSearchOptions.lang = 'en';
    }

    booksGoogle.search(req.body.bookTitle, bookSearchOptions, (error, results) => {
        if (error) {
            return console.log(error);
        }
        res.json(results);
    });
});

module.exports = router;

