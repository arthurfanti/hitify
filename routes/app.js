var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('app route');
  res.render('index', { title: 'Hitify App' });
});

module.exports = router;
