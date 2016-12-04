'use strict';
'use strict';
const express = require('express');
const router = express.Router();
const BooksModel = new require('../models/book');

router.route('/books/:book_id')
    .get(function(req,res) { //get single book by title
        BooksModel.findOne({bookId: req.params.book_id}, (err, book) => {
            if (err) {
                res.status(500).send("Database error");
                return new Error(err);
            }
            if(!book) {
                console.log(req.params.book_id);
                return res.json({ message: 'Book not found' });
            }
            res.json(book);
        });
    })
    .put(function(req, res) {//update book title in db, request body must have new title as 'UpdateTitle'
        console.log(req.user.local.email);
        BooksModel.update({bookId: req.params.book_id}, {requestUser: req.user.local.email},(err) => {
            if (err) {
                res.status(500).send("Database error");
                return new Error(err);
            }
            res.json({ message: 'Successfully updated' });
        })
    })
    .delete(function(req, res) {  //delete book from db by title
        BooksModel.remove({bookId: req.params.book_id}, (err) => {
            console.log(req.params.bookId);
            if (err) {
                res.status(500).send("Database error");
                return new Error(err);
            }
        });
        res.json({ message: 'Successfully deleted' });
    });

module.exports = router;