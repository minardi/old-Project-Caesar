var express = require('express'),
	resourcesRouter = express.Router();
    console.log('resources router called')  
resourcesRouter.all('/:id', function(req, res, next) {		
    var resourcesController = new require('./resourcesController')(req, res);
});

resourcesRouter.all('/', function(req, res, next) {		
    var resourcesController = new require('./resourcesController')(req, res);
});

module.exports = resourcesRouter;
