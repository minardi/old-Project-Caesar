function DataBase () {
	var ObjectID = require('mongodb').ObjectID,
		MongoClient = require('mongodb').MongoClient,
		url = 'mongodb://localhost:27017/notes_app';


	// searchCriteria: {title: "some title"}
	this.fetch = function (collectionName) {
		MongoClient.connect(url, function(err, db) {
		 	var collection = db.collection(collectionName),
		 	searchCriteria = {};
		
		    console.log("Connected correctly to server");
		 	
		 	collection.find({}).toArray(function (err, result) {
		 		if (err) {
		 			console.log(err)
		 		} else {
		 			m.publish(collectionName + 'RequestHandeled', result)
		 		}

		 		db.close();
		 	});
		});
	};

	this.create = function (collectionName, attributes) {
		MongoClient.connect(url, function(err, db) {
		 	var notes = db.collection(collectionName);


		    console.log("Connected correctly to server");	 	

		    getNextSequence(collectionName + 'Id', saveWithNewId);

		 	function getNextSequence(name, cb) {
		 		console.log(name);
   				db.collection('counters').findAndModify(
        			{ _id: name },
        			[],
        			{ $inc: { seq: 1 } },
        			{new: true},
        			function (err, res) {
        				console.dir(res)
        				attributes['id'] = res.value.seq;

        				cb(attributes);
        			}
          		);
			}

		    function saveWithNewId (attributes) {
			 	notes.insert(attributes, function (err, result) {
			 		if (err) {
			 			console.log(err)
			 		} else {
			 			m.publish(collectionName + 'RequestHandeled', result.ops[0])
			 		}

			 		db.close();
			 	});
		    }
		});
	};	

	this.update = function (collectionName, attributes, id) {
		MongoClient.connect(url, function(err, db) {
		 	var collection = db.collection(collectionName);

		    console.log("Connected correctly to server");

		 	collection.findAndModify(
    			{ id: Number(id) },
    			[],
    			{ $set: attributes },
    			{},
    			function (err, result) {
    				console.dir(result)
		 			m.publish(collectionName + 'RequestHandeled', result.value)
		 			db.close();
    			}
          	);
		});
	};

	this.remove = function (collectionName, id) {
		MongoClient.connect(url, function(err, db) {
		 	var collection = db.collection(collectionName);

		    console.log("Connected correctly to server");	 	
		 	collection.remove({id: Number(id)}, function (err, result) {
		 		console.log("ID: " + id);		 		
		 		console.log(result.result);

		 		if (err) {
		 			console.log(err)
		 		} else {
		 			m.publish(collectionName + 'RequestHandeled', result.result)
		 		}

		 		db.close();
		 	});
		});
	};

	this.reset = function (defaults) {
		MongoClient.connect(url, function(err, db) {
		 	var events = db.collection('events'),
		 		resources = db.collection('resources'),
		 		counters = db.collection('counters');

		    console.log("Connected correctly to server");

		    events.remove({});
		    resources.remove({});
		    counters.remove({});

		 	events.insert(defaults.events, function (err, res) {
		 		if (err) {
		 			console.log(err);
		 		} else {
		 			resources.insert(defaults.resources, function (err, res) {
		 				if (err) {
		 					console.log(err);
		 				} else {
		 					counters.insert(defaults.counters, function (err, res) {
				 				if (err) {
				 					console.log(err);
				 				} else {
				 					m.publish('resetCompleted', res)
				 					db.close();
				 				}								
		 					});
		 				}
		 			});
		 		}
		 	});
		 	

		});
	};

}

module.exports = new DataBase();