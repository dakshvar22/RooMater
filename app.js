var express = require('express')
  , routes = require('./routes')
 
  , http = require('http')
  , path = require('path')
  , watson = require('watson-developer-cloud');

var url = require('url');
//var hbs = require('hbs');
var fs = require('fs');

var credentials = {
  version: 'v1',
  url:'https://gateway.watsonplatform.net/tradeoff-analytics/api',
  username: 'b0300f5a-8065-46bf-bdc8-1e16af38ddca',
  password: 'se4K4B5Zx7tO'
};

var tradeoffAnalytics = watson.tradeoff_analytics(credentials);


var mongo = process.env.VCAP_SERVICES;
var port = process.env.PORT || 3030;
var conn_str = "";
if (mongo) {
  var env = JSON.parse(mongo);
  if (env['mongolab']) {
    mongo = env['mongolab'][0]['credentials'];
    if (mongo.uri) {
      conn_str = mongo.uri;
    } else {
      console.log("No mongo found");
    }  
  } else {
    conn_str = 'mongodb://localhost:27017';
  }
} else {
  conn_str = 'mongodb://localhost:27017/roommate';
}

var MongoClient = require('mongodb').MongoClient;
var db; 
MongoClient.connect(conn_str, function(err, database) {
  if(err) throw err;
  db = database;
}); 


var app = express();
var output = {};

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views/bootclassified');
  app.set('view engine', 'html');
  app.engine('html', require('ejs').renderFile);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'views/bootclassified')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

// Invoke the appropriate Express middleware
app.get('/', routes.index);

app.get('/login', function(req,res){
	var url_parts = url.parse(req.url, true);
	var emailId = url_parts.query.email;
	var pwd = url_parts.query.pwd;
	db.collection('users').find({email:emailId,password:pwd}).toArray(function(err,items){
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'Content-Type');
		res.json({'user':items});
	});
});
app.post('/addUser',function(req,res){
	var collection = db.collection('users');
	collection.insert({
		"name" : req.body.name,
		"email" : req.body.email,
		"password" : req.body.password,
		"age" : req.body.age,
		"gender" : req.body.gender,
		"work" : req.body.work,
		"twitter" : req.body.twitter,
		"languages" : req.body.languages,
		"home" : req.body.home,
		"food" : req.body.food,
		"popularity" : req.body.friends
		
	},function(err,doc) {
		if(err)
		{
			res.send("There was a problem adding the information to the database.");
        }
        else{
            res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
			res.header('Access-Control-Allow-Headers', 'Content-Type');
            res.json(true);
        }
    });     
});
		
app.post('/addListing',function(req,res){
    if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('address')) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect.');
    } 
	
    var newListing = {
        name : req.body.name,
        address : req.body.address
      }; 

    var collection = db.collection('listings');
    collection.insert({
        "Owner" : req.body.owner,
        "address" : newListing.address,
        "name" : req.body.name,
        "rent" : req.body.rent,
        "coordinates" : req.body.coordinates
        
    },function(err,doc) {
        if(err)
        {
            res.send("There was a problem adding the information to the database.");
        }
        else{
            res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
			res.header('Access-Control-Allow-Headers', 'Content-Type');
            res.json(true);
        }
    });     
});

app.get('/getListings', function(req,res){
		db.collection('listings').find().toArray(function (err, items) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'Content-Type');
		res.json({'Listings':items});
    });
});

app.get('/profile/:name', function(req, res) {
	var name = req.params.name;
	db.collection('users').find({name:name}).toArray(function(err,items){
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'Content-Type');
		res.json({'user':items});
	});
});

app.post('/analyze', function(req, res) {
  tradeoffAnalytics.dilemmas(req.body, function(err, dilemmas) {
    if (err)
      return res.status(err.code || 500).json(err.error || 'Error processin the request');
    else
      return res.json(dilemmas);
  });
});
// Create Web server and listen on port 3000
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
module.exports=app;
