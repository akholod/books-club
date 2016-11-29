'use strict';
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/', passport.authenticate('local-signup', {
    successRedirect : '/#',
    failureRedirect : '/#signup',
    failureFlash : true
}));

module.exports = router;