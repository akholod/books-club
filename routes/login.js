'use strict';
const express = require('express');
const router = express.Router();
const passport = require('passport');

//send login form
router.post('/', passport.authenticate('local-login', {
    successRedirect : '/#',
    failureRedirect : '/#login',
    failureFlash : true // allow flash messages
}));

module.exports = router;