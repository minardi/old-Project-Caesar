var express = require('express'),
	router = express.Router(),
	eventsRouter = require('./events/eventsRouter'),
    eventTypesRouter = require('./eventTypes/eventTypesRouter'),
	resourcesRouter = require('./resources/resourcesRouter'),
    resourceTypesRouter = require('./resourceTypes/resourceTypesRouter'),    
    scheduleRouter = require('./schedule/scheduleRouter'),   
    usersRouter = require('./users/usersRouter'),   
    contributorsRouter = require('./contributors/contributorsRouter');

router.use(/^\/events\b/, eventsRouter);
router.use(/^\/eventTypes\b/, eventTypesRouter);
router.use(/^\/resources(\/.+)?$/, resourcesRouter);
router.use(/^\/resourceTypes\b/, resourceTypesRouter);
router.use(/^\/schedule\b/, scheduleRouter);
router.use(/^\/users\b/, usersRouter);
router.use(/^\/contributors\b/, contributorsRouter);

router.get('/reset', function(req, res, next) {		
    var resetController = new require('./reset/resetController')(req, res);
});

router.get('*', function (req, res) {
    var staticRoute = /^\/build/.test(req.url)? './public': '../client';

    if (!isRest(req.url)) {        
        res.sendFile('index.html', { root: staticRoute });
    }  
});

function isRest (url) {
    var restList = [
        'events',
        'eventTypes',
        'schedule',
        'resources',
        'resourceTypes',
        'users', 
        'contributors', 
        ],
        rest = false;
    
    restList.forEach(function (restName) {
        var regExp = new RegExp(restName + '\\b');

        if (regExp.test(url)) {
            rest = true;
        }
    });
    console.log('isRest= ' + rest)
    return rest;
}

module.exports = router;

