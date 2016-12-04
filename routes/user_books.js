'use strict';
const express = require('express');
const router = express.Router();
const BooksModel = new require('../models/book');

router.get('/userbooks', function(req, res) {
    BooksModel.find({owner: req.user.userId}, function (err, books) {
        if (err) {
            res.status(500).send("Database error");
            return new Error(err);
        }
        if(!books) {
            return res.json([]);
        }
        res.json(books);
    })
});

router.get('/userbooks/wishlist', function(req, res) {

    BooksModel.find({requestUser: req.user.local.email}, function (err, books) {
        if (err) {
            res.status(500).send("Database error");
            return new Error(err);
        }
        if(!books) {
            return res.json([]);
        }
        res.json(books);
    })
});

router.put('/userbooks/wishlist/:book_id', function(req, res) {
        if (req.params.book_id) {
            BooksModel.update({bookId: req.params.book_id}, {requestUser: ''},(err) => {
                if (err) {
                    res.status(500).send("Database error");
                    return new Error(err);
                }
                res.json({ message: 'Successfully updated' });

            })
        } else {
            BooksModel.find({requestUser: req.user.local.email}, function (err, books) {
                if (err) {
                    res.status(500).send("Database error");
                    return new Error(err);
                }
                if(!books) {
                    return res.json([]);
                }
                res.json(books);
            })
        }

});

module.exports = router;