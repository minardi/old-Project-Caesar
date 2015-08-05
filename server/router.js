var express = require('express'),
    router = express.Router(),
    eventsRouter = require('./events/eventsRouter'),
    resourcesRouter = require('./resources/resourcesRouter'),
    scheduleRouter = require('./schedule/scheduleRouter'),   
    accountsRouter = require('./accounts/accountsRouter'),   
    aboutRouter = require('./about/aboutRouter'),
    contributorsRouter = require('./contributors/contributorsRouter'),
    AccountsModel = require('./accounts/accountsModel');

router.use(/^\/events/, eventsRouter);
router.use(/^\/resources/, resourcesRouter);
router.use(/^\/schedule/, scheduleRouter);
router.use(/^\/accounts/, accountsRouter);
router.use(/^\/about/, aboutRouter);
router.use(/^\/contributors/, contributorsRouter);

router.get(/^\/reset$/, function(req, res, next) {      
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
        if (isRest()) {
            res.sendFile('home.html', { root: staticRoute });
        }
     }
    
    function isRest () {
        var notRest = [
            'events',
            'schedule',
            'resources',
            'accounts', 
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

