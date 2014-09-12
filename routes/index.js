var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  	res.send("Hello World");
  //res.render('index', { title: 'Express' });
});

router.get("/sample", function(req, res){
   res.render('index', {title: "House", name: "Mary"});
});

router.get("/app", function(req, res){
   res.render('index', {script: '../public/javascripts/index.js'});
});

router.get("/orderpage", function(req, res){
	res.render('orderpage', {script: '../public/javascripts/index.js'});
});
module.exports = router;
