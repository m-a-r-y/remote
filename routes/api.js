var express = require("express");

var router = express.Router();

router.get("/test", function(req, res){
	res.json({method: 'GET', serverTime: new Date()});
});

// router.post("/test", function(req, res){
// 	var output = { method: 'POST', serverTime: new Date() };
// 	// ['varA', 'varB', 'varC']
// 	Object.keys(req.body).forEach(function(key) {
// 		output[key] = req.body[key];
// 	// output ['varA'] = req.body['varA'];
// 	});
// 	res.json(output);
// });


router.post("/test", function(req, res){
	
	var output = req.body;
	output['method'] = "POST";
	output['serverTime'] = new Date();
	output['numberKeysInData'] = Object.keys(req.body).length;
	
	res.json(output);
});

module.exports = router;