var express = require('express'),
	router = express.Router(),
	eventsRouter = require('./events/eventsRouter'),
    eventTypesRouter = require('./eventTypes/eventTypesRouter'),
	resourcesRouter = require('./resources/resourcesRouter'),
    resourceTypesRouter = require('./resourceTypes/resourceTypesRouter'),    
    scheduleRouter = require('./schedule/scheduleRouter'),   
    accountsRouter = require('./accounts/accountsRouter'),   
    contributorsRouter = require('./contributors/contributorsRouter'),
    holidaysRouter = require('./holidays/holidaysRouter');

// router.use('*', function (req, res, next) {
//     var staticRoute = /^\/build/.test(req.url)? './public': '../client',
//         user = req.cookies.login,
//         userExists = Boolean(user);  
          
//         if (userExists) {
            
//             next(req, res);
//         } else {
//             res.sendFile('index.html', { root: staticRoute });  
//         } 
// });

router.use(/^\/events\b/, eventsRouter);
router.use(/^\/eventTypes\b/, eventTypesRouter);
router.use(/^\/resources(\/.+)?$/, resourcesRouter);
router.use(/^\/resourceTypes\b/, resourceTypesRouter);
router.use(/^\/schedule\b/, scheduleRouter);
router.use(/^\/accounts/, accountsRouter);
router.use(/^\/contributors\b/, contributorsRouter);
router.use(/^\/holidays\b/, holidaysRouter);

router.get('/reset', function(req, res, next) {     
    var resetController = new require('./reset/resetController')(req, res);
});

router.all('/download', function(req, res, next) {     
    var generatorController = new require('./generator/generatorController')(req, res);
});

// router.post('/', function (req, res) {
//     var user = req.body.login,
//         userExists = Boolean(user),
//         minute = 60 * 1000,
//         staticRoute = /^\/build/.test(req.url)? './public': '../client';;

//     // check if exists in db
//     if (userExists) {
//         res.cookie('login', user, { maxAge: minute });
//         res.sendFile('home.html', { root: staticRoute }); 
//     } else {
//         res.redirect('back'); 
//     }    
// });

router.all('*', function (req, res, next) {
    var staticRoute = /^\/build/.test(req.url)? './public': '../client',
        user = req.cookies.login,
        userExists = Boolean(user);


    console.log('* route called');

    //if (userExists) {
        if (!isRest(req.url)) {  
            res.sendFile('index.html', { root: staticRoute });
        }           
    //} else {
    //        res.sendFile('index.html', { root: staticRoute });            
    //}
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
        'holidays'
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

