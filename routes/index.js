var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get("/t", function(req, res){
   res.render('index', {title: "House", name: "Mary"});
});

router.get("/app", function(req, res){
   res.render('rindex', {title: "Restaurant in the Bay Area"});
});

module.exports = router;
