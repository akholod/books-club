/**
 * Created by andrey on 25.11.16.
 */
'use strict';
var express = require('express');
var router = express.Router();


//home page
router.get('/user', isLoggedIn, function(req, res) {
    res.json(req.user);
});

// if they aren't redirect them to the home page
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/#login');
}

module.exports = router;



