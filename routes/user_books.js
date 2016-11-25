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

module.exports = router;