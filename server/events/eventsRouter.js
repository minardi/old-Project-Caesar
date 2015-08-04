var express = require('express'),
	eventsRouter = express.Router({mergeParams: true});



eventsRouter.all('/:id', function(req, res, next) {	
	console.log('event routing called')
    var eventsController = new require('./eventsController')(req, res);
});

eventsRouter.all('/', function(req, res, next) {	
	console.log('event routing called')	
    var eventsController = new require('./eventsController')(req, res);
});


module.exports = eventsRouter;
