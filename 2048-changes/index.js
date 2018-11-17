var express = require('express');
var app = new express();
var cors = require('cors');
var bodyParser = require('body-parser'); // Required if we need to use HTTP post parameters
var validator = require('validator'); // See documentation at https://github.com/chriso/validator.js
const path = require('path')
// See https://stackoverflow.com/questions/5710358/how-to-get-post-query-in-express-node-js
app.use(bodyParser.json());
// See https://stackoverflow.com/questions/25471856/express-throws-error-as-body-parser-deprecated-undefined-extended
app.use(bodyParser.urlencoded({ extended: true })); // Required if we need to use HTTP post parameters
app.use(cors());
// Mongo initialization and connect to database
// process.env.MONGODB_URI is the default environment variable on Heroku for the MongoLab add-on
// If environment variables not found, fall back to mongodb://localhost/nodemongoexample
// nodemongoexample is the name of the local database
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/nodemongoexample';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});

// Serve static content in folder named "public"
app.use(express.static(path.join(__dirname, 'public')));

app.post("/submit", function(request, response) {
	var username = request.body.username;
	var score = parseInt(request.body.score);
	var grid = request.body.grid;
	var created_at = new Date();
	created_at = created_at.toUTCString();
	// username = username.replace(/[^\w\s]/gi, ''); // remove all special characters.  Can you explain why this is important?
	if (username != null && score != null & grid != null & username != '') {
		var toInsert = {
			"username": username,
			"score": score,
			"grid": grid,
			"created_at": created_at
		};

		db.collection('scores', function(error, coll) {
			coll.insert(toInsert, function(error, saved) {
				if (error) {
					response.send('error');
				} else {
					coll.find().sort({scores: -1}).limit(10).toArray(function(err, results) {
						if (!err) {
							response.send(results);
						} else {
							response.send('error');
						}
					});
				}
		    });	    
		});
	}
	else {
		response.send('error');
	}	
});

app.get("/scores.json", function(request, response){
	// if proper query string is used e.g., GET /scores.json?username=mchow
	// return all scores for that user in JSON

	response.set('Content-Type', 'text/html');
	var indexPage = '';
	var username = request.query.username;
	if (username != null & username != '') {

		// Line 50: equivalent to `db.fooditems` in MongoDB client shell
		db.collection('scores', function(er, collection) {

			// Line 53: equivalent to `db.fooditems.find()` in MongoDB client shell
			collection.find({"username": username}).sort({scores: -1}).limit(10).toArray(function(err, results) {

				// All results of db.fooditems.find() will go into...
				// ...`results`.  `results` will be an array (or list)
				if (!err) {
					response.send(results);
				} else {
					response.send('error');
				}
			});
		});
	} else {
		response.send([]);
	}

});

app.get("/", function(request, response){
	response.set('Content-Type', 'text/html');
	var indexPage = '';
	// ouputs all scores in descending order in a pretty way
	db.collection('scores', function(er, collection) {
			// Line 53: equivalent to `db.fooditems.find()` in MongoDB client shell
			collection.find().sort({score: -1}).toArray(function(error, results) {
				// All results of db.fooditems.find() will go into...
				// ...`results`.  `results` will be an array (or list)
				if (!error) {
					indexPage += "<!DOCTYPE HTML><html><head><title>2048 High Scores!</title></head><body><h1>2048 Scores</h1>";
					indexPage += "<table><tr><th>username</th><th>score</th><th>time</th></tr>";
					for (var count = 0; count < results.length; count++) {
						indexPage += "<tr><td>" + results[count].username + "</td><td>"+ results[count].score + "</td><td>" + results[count].created_at + "</td></tr>";
					}
					indexPage += "</table></body></html>"
					response.send(indexPage);
				} else {
					response.send('<!DOCTYPE HTML><body><h1>Whoops, something went terribly wrong!</h1></body></html>');
				}
			});
		});
});

app.listen(process.env.PORT || 5000);