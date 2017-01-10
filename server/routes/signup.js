'use strict';
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/', passport.authenticate('local-signup', {
    failureFlash : true
}), function (req, res) {
    res.json(req.user);
});

module.exports = router;