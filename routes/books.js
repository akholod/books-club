/**
 * Created by andrey on 25.11.16.
 */
'use strict';
const express = require('express');
const router = express.Router();
const booksGoogle = require('google-books-search');
const BooksModel = new require('../models/book');

router.route('/books')
    .post(function(req, res)  {//add new book
        let bookSearchOptions = {
            limit: 1,
            type: 'books'
        };
        if(req.body.bookTitle.length < 3) {//book title must have > 3 symbols
            return res.status(400).json('{"error": "Book title is to short"}')
        }
        if(req.body.bookLang) {//if lang is not English set option lang (two-letter ISO-639-1 code)
            bookSearchOptions.lang = req.body.bookLang;
        }

        //search book with Google Books API for receive complete book info
        booksGoogle.search(req.body.bookTitle, bookSearchOptions, (error, results) => {
            if (error) {
                let book = new BooksModel();
                book.title = req.body.bookTitle;
                //if book doesn't exist save just received book title
                book.save(function(err) {
                    if (err) {
                        res.status(500).send("Database error");
                        return new Error(err);
                    }
                    return console.log('Book added without description');
                });
                return console.log(error);
            }
            results = results[0];
            BooksModel.findOne({'title': results.title}, (err, books) => {
                if (err) {
                    res.status(500).send("Database error");
                    return new Error(err)
                }
                if (books) {
                    return res.json({"error": "Book already added"});
                }
                //save new book in db
                let book = new BooksModel();
                book.title = results.title;
                book.language = results.language;
                book.image = results.thumbnail;
                book.authors = results.authors;
                book.pageCount = results.pageCount;
                book.owner = req.user.userId;
                book.save(function(err) {
                    if (err) {
                        res.status(500).send("Database error");
                        return new Error(err);
                    }
                    res.json({ message: 'Book added'});
                    return console.log('Book added');
                });

            });

        });
    }).get(function(req,res)  { // get all saved books from db
    BooksModel.find(function(err, books) {
        if (err) {
            res.status(500).send("Database error");
            return new Error(err);
        }
        res.json(books);
    });
});

module.exports = router;