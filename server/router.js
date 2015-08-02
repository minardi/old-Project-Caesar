var express = require('express'),
	router = express.Router(),
	eventsRouter = require('./events/eventsRouter');
	resourcesRouter = require('./resources/resourcesRouter');
    aboutRouter = require('./about/aboutRouter');


router.use(/^\/(debug\/)?events/, eventsRouter);
router.use(/^\/(debug\/)?resources/, resourcesRouter);
router.use(/^\/(debug\/)?about/, aboutRouter);

router.get(/^\/(debug\/)?reset$/, function(req, res, next) {		
    var resetController = new require('./reset/resetController')(req, res);
});

router.get('*', function (request, response) {
    function isRest () {
        var notRest = ['events','resources', 'about', '.css', '.js', '.map', '.eot', '.ttf', '.svg', '.woff', '.ico'],
            rest = true;
        
        notRest.forEach(function (key) {
            if (request.url.indexOf(key) !== -1) {
                rest = false;
            }
        });
        
        return rest;
    }
    
    if (isRest()) {
        response.sendFile('index.html', { root: '../client/' });
    }
});



module.exports = router;

