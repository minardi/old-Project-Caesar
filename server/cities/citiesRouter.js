var express = require('express'),
	usersRouter = express.Router({mergeParams: true});

usersRouter.all('/:id', function(req, res, next) {	
    var usersController = new require('./usersController')(req, res);
});

usersRouter.all('/', function(req, res, next) {		
    var usersController = new require('./usersController')(req, res);
});


module.exports = usersRouter;
