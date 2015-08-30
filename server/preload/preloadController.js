function PreloadController (req, res) {
    var db = new require('../db/db')(),
        queue = require("queue-async"),
        _ = require('underscore-node'),
        collections = {
            'resouresCollection': [],
            'eventsCollection': [],
            'scheduleCollection': [],
            'eventTypes': [],
            'resourceTypes': [],
            'holidaysCollection': [],
            'accountsCollection': [],
            'citiesCollection': [],
            'countriesCollection': []
        };
    
    handle();
    
    function handle () {
        prepareCollections();
    }
    
    function prepareCollections () {
        queue()
            .defer(db.fetch, 'resources')
            .defer(db.fetch, 'events')
            .defer(db.fetch, 'weeks')
            .defer(db.fetch, 'eventTypes')
            .defer(db.fetch, 'resourceTypes')
            .defer(db.fetch, 'holidays')
            .defer(db.fetch, 'accounts')
            .defer(db.fetch, 'cities')
            .defer(db.fetch, 'countries')
            .awaitAll(function(error, results) { 
                var i = 0;
                _.each(collections, function (element, key) {
                    collections[key] = results[i++];
                });
                sendResponse();
            });
    }
	
	function checkRole () {
		var byCity = [ 'resouresCollection',
				       'eventsCollection'
		    ],
			byCountry = [ 'holidaysCollection'];
		
		if(globalMan[req.cookies.clientId].role !== "Admin") {
			collections.accountsCollection = [];

			function selsectByLocation (arr, location) {
				_.each(arr, function (item) {
					var contributorCollection = [];
					 _.each(collections[item], function (data) {
						 if(data[location] == globalMan[req.cookies.clientId][location]) {
							contributorCollection.push(data);
						 } 
					})
					collections[item] = contributorCollection;
			    })
			}
			selsectByLocation(byCity, "locationCity");
			selsectByLocation(byCountry, "locationCountry");
		}
		
	}
    
    function sendResponse () {
		checkRole();
        res.send(collections);    
    }   
    
    return this;
}

module.exports = PreloadController;