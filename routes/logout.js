'use strict';
const express = require('express');
const router = express.Router();

//logout func
router.get('/', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
