var express = require('express');
var router = express.Router();
const path = require('path');

//home page
router.get('/', function(req, res, next) {
  res.sendfile(path.join(__dirname, 'public', 'index'));
});

module.exports = router;
