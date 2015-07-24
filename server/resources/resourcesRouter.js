var express = require('express'),
	resourcesRouter = express.Router();

resourcesRouter.all('/', function(req, res, next) {		
    var resourcesController = new require('./resourcesController')(req, res);
});

resourcesRouter.all('/:id', function(req, res, next) {		
    var resourcesController = new require('./resourcesController')(req, res);
});

module.exports = resourcesRouter;
