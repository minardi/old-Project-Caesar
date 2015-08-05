var express = require('express'),
	router = express.Router(),
	eventsRouter = require('./events/eventsRouter'),
    eventTypesRouter = require('./eventTypes/eventTypesRouter'),
	resourcesRouter = require('./resources/resourcesRouter'),
    resourceTypesRouter = require('./resourceTypes/resourceTypesRouter'),    
    scheduleRouter = require('./schedule/scheduleRouter'),   
    accountsRouter = require('./accounts/accountsRouter'),   
    contributorsRouter = require('./contributors/contributorsRouter');

router.use(/^\/events\b/, eventsRouter);
router.use(/^\/eventTypes\b/, eventTypesRouter);
router.use(/^\/resources(\/.+)?$/, resourcesRouter);
router.use(/^\/resourceTypes\b/, resourceTypesRouter);
router.use(/^\/schedule\b/, scheduleRouter);
router.use(/^\/accounts/, accountsRouter);
router.use(/^\/contributors\b/, contributorsRouter);

router.get('/reset', function(req, res, next) {		
    var resetController = new require('./reset/resetController')(req, res);
});

router.post('/', function (req, res) {
    var post = req.body;
        if (post.login === 'caesar') {
            req.session.user = 'caesar';
            res.redirect('/Events');
        } else {          
            res.redirect('/');
        }

});


router.get('/', function (req, res) {
    var staticRoute = /^\/build/.test(req.url)? './public': '../client';
    if(req.session){
        req.session.reset();
    }  
    res.sendFile('index.html', { root: staticRoute });
    
});

router.get('*', function (req, res) {
    var staticRoute = /^\/build/.test(req.url)? './public': '../client';

     if(req.session && req.session.user) {
       if (!isRest(req.url)) {  
            res.sendFile('home.html', { root: staticRoute });
        }
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
    
    return rest;
}

module.exports = router;

