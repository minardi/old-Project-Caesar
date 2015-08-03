var express = require('express'),
	router = express.Router(),
	eventsRouter = require('./events/eventsRouter'),
	resourcesRouter = require('./resources/resourcesRouter'),
    aboutRouter = require('./about/aboutRouter'),
    contributorsRouter = require('./contributors/contributorsRouter');

router.use(/^\/events/, eventsRouter);
router.use(/^\/resources/, resourcesRouter);
router.use(/^\/about/, aboutRouter);
router.use(/^\/contributors/, contributorsRouter);

router.get(/^\/reset$/, function(req, res, next) {		
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
            'resources', 
            'about',
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

