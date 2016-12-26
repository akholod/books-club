'use strict';
const express = require('express');
const router = express.Router();
const passport = require('passport');

//send login form
router.post('/', passport.authenticate('local-login', {
    failureFlash : true // allow flash messages
}), function (req, res) {
    res.json(req.user);
});

module.exports = router;