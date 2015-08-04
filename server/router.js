var express = require('express'),
	router = express.Router(),
	eventsRouter = require('./events/eventsRouter'),
    eventTypesRouter = require('./eventTypes/eventTypesRouter'),
	resourcesRouter = require('./resources/resourcesRouter'),
    resourceTypesRouter = require('./resourceTypes/resourceTypesRouter'),    
    scheduleRouter = require('./schedule/scheduleRouter'),   
    usersRouter = require('./users/usersRouter'),   
    contributorsRouter = require('./contributors/contributorsRouter');

router.use(/^\/events/, eventsRouter);
router.use(/^\/eventTypes/, eventTypesRouter);
router.use(/^\/resources/, resourcesRouter);
router.use(/^\/resourceTypes/, resourceTypesRouter);
router.use(/^\/schedule/, scheduleRouter);
router.use(/^\/users/, usersRouter);
router.use(/^\/contributors/, contributorsRouter);

router.get('/reset', function(req, res, next) {		
    var resetController = new require('./reset/resetController')(req, res);
});

router.get('*', function (req, res) {
    var staticRoute = /^\/build/.test(req.url)? './public': '../client';

    if (isRest()) {
        res.sendFile('index.html', { root: staticRoute });
    }

    function isRest () {
        var notRest = [
            'events',
            'eventTypes',
            'schedule',
            'resources',
            'resourceTypes',
            'users', 
            'contributors', 
            '.css', 
            '.js', 
            '.map', 
            '.eot', 
            '.ttf', 
            '.svg', 
            '.woff', 
            '.ico'
            ],
            rest = true;
        
        notRest.forEach(function (key) {
            if (req.url.indexOf(key) !== -1) {
                rest = false;
            }
        });
        
        return rest;
    }  
});

module.exports = router;

