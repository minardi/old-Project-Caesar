var express = require('express'),
	router = express.Router(),
	eventsRouter = require('./events/eventsRouter');
	resourcesRouter = require('./resources/resourcesRouter');

// router.all('/events', function(req, res, next) {		
//     var eventsController = new require('./events/eventsController')(req, res);
// });

// router.all('/events/:id', function(req, res, next) {		
//     var eventsController = new require('./events/eventsController')(req, res);
// });


// router.all('/resources', function(req, res, next) {		
//     var resourcesController = new require('./resources/resourcesController')(req, res);
// });

// router.all('/resources/:id', function(req, res, next) {		
//     var resourcesController = new require('./resources/resourcesController')(req, res);
// });

router.get('/reset', function(req, res, next) {		
    var resetController = new require('./reset/resetController')(req, res);
});

module.exports = router;


router.use('/events', eventsRouter);
router.use('/resources', resourcesRouter)