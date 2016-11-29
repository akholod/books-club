'use strict';
const express = require('express');
const router = express.Router();
const passport = require('passport');

//send login form
router.post('/', passport.authenticate('local-login', {
    successRedirect : '/#', // redirect to the secure profile section
    failureRedirect : '/#login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

module.exports = router;