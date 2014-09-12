var express = require("express");

var router = express.Router();


var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOHQ_URL);

// ----- User Info --------//
var peopleInfo = new mongoose.Schema({
	code: String,
    name: String,
    email: String,
    phone: String,
    comments: String
});

var Info = mongoose.model('Info', peopleInfo);

//var testi1 = new Info( { name: 'Bob Smith', email: 'b@s.com', phone: '000-000-9999', comments: 'hi'} );

//testi1.save();


// ----------- Restaurant ------------ //
var restaurant = new mongoose.Schema({
	code: String,
    restaurant: String
});

var Rest = mongoose.model('Rest', restaurant);

//------test sample------//
// router.get("/test", function(req, res){
// 	res.json({method: 'GET', serverTime: new Date()});
// });

// router.post("/test", function(req, res){
// 	var output = { method: 'POST', serverTime: new Date() };
// 	// ['varA', 'varB', 'varC']
// 	Object.keys(req.body).forEach(function(key) {
// 		output[key] = req.body[key];
// 	// output ['varA'] = req.body['varA'];
// 	});
// 	res.json(output);
// });


// router.post("/test", function(req, res){
	
// 	var output = req.body;
// 	output['method'] = "POST";
// 	output['serverTime'] = new Date();
// 	output['numberKeysInData'] = Object.keys(req.body).length;
	
// 	res.json(output);
// });


// --------------- UserInfo ----------------//

router.post("/info", function(req, res){
	var info = new Info({ 
		code: (new Date()).getTime().toString(),
		name:req.body.name, 
		email:req.body.email, 
		phone:req.body.phone, 
		comments:req.body.comments 
	});
	
	info.save(function(err, postedInfo){
		res.json(postedInfo);
	});
});

router.get("/info", function(req, res){
	Info.find({}).exec(function(err, result){
		res.json(result);
	});
});

router.get("/info/:infoCode", function(req, res){
	Info.findOne({ code:req.params.infoCode }).exec(function(err, info){
		if (info) {
			res.json(info);
		} else {
			res.json(404, {error: "Nothing found"});
		}
	});
});



// ---------------- Restaurants ----------------- //

router.post("/restaurant", function(req, res){
	var restaurant = new Rest({ 
		code: (new Date()).getTime().toString(),
		restaurant:req.body.restaurant
	});
	
	restaurant.save(function(err, postedRest){
		res.json(postedRest);
	});
});

router.get("/restaurant", function(req, res){
	Rest.find({}).exec(function(err, result){
		res.json(result);
	});
});

router.get("/restaurant/:restCode", function(req, res){
	Restaurant.findOne({ code:req.params.restCode }).exec(function(err, restaurant){
		if (restaurant) {
			res.json(restaurant);
		} else {
			res.json(404, {error: "Nothing found"});
		}
	});
});


module.exports = router;