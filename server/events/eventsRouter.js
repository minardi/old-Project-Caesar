var express = require('express'),
	eventsRouter = express.Router({mergeParams: true});

eventsRouter.all('/:id', function(req, res, next) {	
	// console.log(req.method + ' request captured');
	// console.dir(req.params);	
    var eventsController = new require('./eventsController')(req, res);
});

eventsRouter.all('/', function(req, res, next) {		
    var eventsController = new require('./eventsController')(req, res);
});


module.exports = eventsRouter;
