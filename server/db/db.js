function DataBase () {
	var ObjectID = require('mongodb').ObjectID,
		MongoClient = require('mongodb').MongoClient,
		url = 'mongodb://localhost:27017/notes_app';

	this.fetch = function (collectionName) {
		MongoClient.connect(url, function(err, db) {
		 	var collection = db.collection(collectionName),
		 	searchCriteria = {};
		
		    console.log("Connected correctly to server");
		 	
		 	collection.find({}).toArray(function (err, result) {
		 		if (err) {
		 			console.log(err);
		 		} else {
		 			m.publish(collectionName + 'RequestHandeled', result);
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
   				db.collection('counters').findAndModify(
        			{ _id: name },
        			[],
        			{ $inc: { seq: 1 } },
        			{new: true},
        			function (err, res) {
        				attributes['id'] = res.value.seq;

        				cb(attributes);
        			}
          		);
			}

		    function saveWithNewId (attributes) {
			 	notes.insert(attributes, function (err, result) {
			 		if (err) {
			 			console.log(err);
			 		} else {
			 			m.publish(collectionName + 'RequestHandeled', result.ops[0]);
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
    			{new: true},
    			function (err, result) {
		 			m.publish(collectionName + 'RequestHandeled', result.value);

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
		 		if (err) {
		 			console.log(err);
		 		} else {
		 			m.publish(collectionName + 'RequestHandeled', result.result);
		 		}

		 		db.close();
		 	});
		});
	};

	this.reset = function (defaults) {
		MongoClient.connect(url, function(err, db) {
		 	var events = db.collection('events'),
		 		resources = db.collection('resources'),
		 		contributors = db.collection('contributors'),
		 		counters = db.collection('counters'),
		 		resetsCount = 0,
		 		collectionsCount = Object.keys(defaults).length,
		 		key;

		 	for (key in defaults) {
		 		resetsCount++;

		 		db.collection(key).remove({});

		 		db.collection(key).insert(defaults[key], function (err, res) {
	 				if (err) {
	 					console.log(err);
	 				} else {							
	 					if (resetsCount === collectionsCount) {
	 						m.publish('resetCompleted');

	 						db.close();
	 					}			 			
	 				}
		 		})
		 	}
		});
	};

	return this;
}

module.exports = DataBase;