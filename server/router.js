var express = require('express'),
	router = express.Router(),
	eventsRouter = require('./events/eventsRouter'),
	resourcesRouter = require('./resources/resourcesRouter'),
    scheduleRouter = require('./schedule/scheduleRouter'),   
    usersRouter = require('./users/usersRouter'),   
    aboutRouter = require('./about/aboutRouter'),
    contributorsRouter = require('./contributors/contributorsRouter');

router.use(/^\/events/, eventsRouter);
router.use(/^\/resources/, resourcesRouter);
router.use(/^\/schedule/, scheduleRouter);
router.use(/^\/users/, usersRouter);
router.use(/^\/about/, aboutRouter);
router.use(/^\/contributors/, contributorsRouter);

router.get(/^\/reset$/, function(req, res, next) {		
    var resetController = new require('./reset/resetController')(req, res);
});

router.get(/^\/login$/, function(req, res) {
    var staticRoute = /^\/build/.test(req.url)? './public': '../client'; 
    res.sendFile('login.html', { root: staticRoute });
});

router.post(/^\/login$/, function (req, res) {
    var staticRoute = /^\/build/.test(req.url)? './public': '../client';
    var post = req.body;
        if (post.username === 'caesar') {
            req.session.user = 'caesar';
            res.redirect('/Events');
        } else {          
            res.redirect('/login');
        }
});

router.get(/^\/logout$/, function (req, res) {
    if(req.session){
        req.session.reset();
    }  
    res.redirect('/login');
});


router.get('*', function (req, res) {
    var staticRoute = /^\/build/.test(req.url)? './public': '../client';

     if(req.session && req.session.user) {
        if (isRest()) {
            res.sendFile('index.html', { root: staticRoute });
        }
     }
    
    function isRest () {
        var notRest = [
            'events',
            'schedule',
            'resources',
            'users', 
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

