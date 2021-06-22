var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/shop', function(req, res, next) {
  let shop= req.cookies.shop;
  if(!shop) shop=[];
  res.render("shop",{shop});
});
module.exports = router;
