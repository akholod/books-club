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

        BooksModel.findOne({'title': req.body.title}, (err, books) => {
            if (err) {
                res.status(500).send("Database error");
                return new Error(err)
            }
            if (books) {
                return res.json({"error": "Book already added"});
            }
            //save new book in db
            let book = new BooksModel();
            book.title = req.body.title || 'Unknown';
            book.language = req.body.language || '';
            book.image = req.body.image || '';
            book.authors = req.body.authors || [];
            book.pageCount = req.body.pageCount;
            book.owner = req.user.userId;
            book.description = req.body.description;
            book.save(function(err) {
                if (err) {
                    res.status(500).send("Database error");
                    return new Error(err);
                }
                res.json({ message: 'Book added'});
                return console.log('Book added');
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