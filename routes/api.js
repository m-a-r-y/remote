var express = require("express");

var router = express.Router();

var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOHQ_URL);

// ----- User Info Schema --------//
var peopleInfoSchema = new mongoose.Schema({
	code: String,
    name: String,
    email: String,
    phone: String,
    comments: String
});

var INFO = mongoose.model('Info', peopleInfoSchema);

//------------- User Info Schema -------------//
router.post("/info", function(req, res){
	var info = new INFO({ 
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
	INFO.find({}).exec(function(err, result){
		res.json(result);
	});
});

router.get("/info/:infoCode", function(req, res){
	INFO.findOne({ code:req.params.infoCode }).exec(function(err, info){
		if (info) {
			res.json(info);
		} else {
			res.json(404, {error: "Nothing found"});
		}
	});
});

// ----------- Restaurant Schema ------------ //
var restaurantSchema = new mongoose.Schema({
	code: String,
    restaurantName: String
});

// 'rest' = name of the collection in Mongo database ; REST = model
var REST = mongoose.model('rest', restaurantSchema);

// ---------------- Restaurants ----------------- //
//create a new restaurant
router.post("/restaurants", function(req, res){
	var restaurant = new REST({ 
		code: (new Date()).getTime().toString(),
		restaurantName:req.body.restaurantName
	});
	restaurant.save(function(err, postedRestaurant){
		res.json(postedRestaurant);
	});
});

//list all restaurants ; model is an object
router.get("/restaurants", function(req, res){
	REST.find({}).exec(function(err, result){
		res.json(result);
	});
});

//get one restaurant ; params = URL
router.get("/restaurants/:restCode", function(req, res){
	REST.findOne({ code:req.params.restCode }).exec(function(err, restaurant){
		if (restaurant) {
			res.json(restaurant);
		} else {
			res.json(404, {error: "Nothing found"});
		}
	});
});

// edit a single restaurant
router.put('/restaurants/:restCode', function(req, res) {
   REST.findOne({ code:req.params.restCode }).exec(function(err, result){
       console.log("update begin");
       result.restaurantName = req.body.restaurantName || result.restaurantName;
       //result.price = req.body.price || result.price;
       //result.restaurant_code = req.body.restaurant_code || result.restaurant_code;
       result.save(function(err) {
           if (!err) {
               console.log("updated");
           } else {
               console.log(err);
           }
           res.json(result);
       });
   });
});


// --------- Menu Items Schema-----------//
var menuItemsSchema = new mongoose.Schema({
	code: String,
    itemName: String,
    price: String,
    restaurantID : String,
    restaurantName: String
});

var ITEM = mongoose.model('items', menuItemsSchema);

// ---------------- Menu Items ----------------- //

router.post("/menuitems", function(req, res){
	var menuitems = new ITEM ({ 
		code: (new Date()).getTime().toString(),
		itemName:req.body.itemName,
		price: req.body.price,
		restaurantID: req.body.restaurantID,
		restaurantName: req.body.restaurantName
	});
	menuitems.save(function(err, result){
		res.json(result);
	});
});

router.get("/menuitems", function(req, res){
	ITEM.find({}).exec(function(err, result){
		res.json(result);
	});
});

router.get("/menuitems/:itemCode", function(req, res){
	ITEM.findOne({ code:req.params.itemCode }).exec(function(err, result){
		if (result) {
			res.json(result);
		} else {
			res.json(404, {error: "Nothing found"});
		}
	});
});


module.exports = router;



