function DataBase () {
	var ObjectID = require('mongodb').ObjectID,
		MongoClient = require('mongodb').MongoClient,
		url = 'mongodb://localhost:27017/caesar';

	this.fetch = function (collectionName, cb) {
		MongoClient.connect(url, function(err, db) {
		 	var collection = db.collection(collectionName);
		
		 	collection.find({}).toArray(function (err, result) {
		 		cb(err, result);

		 		db.close();
		 	});
		});
	};

	this.create = function (collectionName, attributes, cb) {
		MongoClient.connect(url, function(err, db) {
		 	var notes = db.collection(collectionName);

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
			 		cb(err, result.ops[0]);

			 		db.close();
			 	});
		    }
		});
	};	

	this.update = function (collectionName, attributes, id, cb) {
		MongoClient.connect(url, function(err, db) {
		 	var collection = db.collection(collectionName);

		 	collection.findAndModify(
    			{ id: Number(id) },
    			[],
    			{ $set: attributes },
    			{new: true},
    			function (err, result) {
			 		cb(err, result.value);

		 			db.close();
    			}
          	);
		});
	};

	this.remove = function (collectionName, id, cb) {
		MongoClient.connect(url, function(err, db) {
		 	var collection = db.collection(collectionName);
	 	
		 	collection.remove({id: Number(id)}, function (err, result) {	 		
		 		cb(err, result.result);

		 		db.close();
		 	});
		});
	};

	this.findUser = function (login, password, cb) {
		MongoClient.connect(url, function(err, db) {
		 	var collection = db.collection('accounts');
		
		 	collection.findOne({login: login, password: password}, function (err, result) {
		 		cb(err, result);

		 		db.close();
		 	});
		});
	};

	this.reset = function (defaults, cb) {
		MongoClient.connect(url, function(err, db) {
		 	var resetsCount = 0,
		 		collectionsCount = Object.keys(defaults).length,
		 		key;

		 	for (key in defaults) {
		 		db.collection(key).remove({});

		 		console.log(key);


		 		db.collection(key).insert(defaults[key], function (err, res) {
		 			
	 				resetsCount++;	

 					if (resetsCount === collectionsCount) {
 						cb(err, 'resetCompleted');

 						db.close();
 					}			 			
		 		})
		 	}
		});
	};

	return this;
}

module.exports = DataBase;