'use strict';
var express = require('express');
var router = express.Router();

router.get('/user', isLoggedIn, function(req, res) {
    res.json(req.user);
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).end();
}

module.exports = router;



