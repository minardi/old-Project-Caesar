var express = require('express'),
    mongoose = require('mongoose'),
	router = express.Router(),
	eventsRouter = require('./events/eventsRouter'),
    eventTypesRouter = require('./eventTypes/eventTypesRouter'),
	resourcesRouter = require('./resources/resourcesRouter'),
    resourceTypesRouter = require('./resourceTypes/resourceTypesRouter'),    
    scheduleRouter = require('./schedule/scheduleRouter'),   
    accountsRouter = require('./accounts/accountsRouter'),   
    contributorsRouter = require('./contributors/contributorsRouter'),
    holidaysRouter = require('./holidays/holidaysRouter');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://localhost:27017/notes_app');

var Account = mongoose.model('Account', new Schema({
    id: ObjectId,
    fullName: String,
    login: String,
    password: String,
    locationCity: String,
    locationCountry: String,
    role: String
}));

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

router.post('/', function (req, res) {
    Account.findOne( { login: req.body.login }, function (err, account) {
        if(!account){
            console.log('Invalid login');
        } else {
            if (req.body.password === account.password) {
                req.session.account = account;
                // res.cookie('role', account.role, { maxAge: 3600000 });
                // res.cookie('locationCity', account.locationCity, { maxAge: 900000, httpOnly: false });
                // res.cookie('locationCountry', account.locationCountry, { maxAge: 900000, httpOnly: false });
                res.redirect('/Events');
            } else {     
                req.session.reset();    
                res.redirect('/');
            }   
        } 
    });
});

router.get('/logout', function (req, res) {
    if(req.session){
        req.session.reset();
    }  
    res.redirect('/');
});

router.get('/', function (req, res) {
    console.log('hello from /');
    var staticRoute = /^\/build/.test(req.url)? './public': '../client';
    if(req.session && req.session.account){
        req.session.reset();
        
    }  
    
    res.sendFile('index.html', { root: staticRoute });
    
});

router.get('*', function (req, res) {
    var staticRoute = /^\/build/.test(req.url)? './public': '../client';

     if(req.session && req.session.account) {
        Account.findOne({ login: req.session.account.login }, function (err, account) {
            if(!account){
                console.log('no account');
                req.session.reset();
            } else {
                if (!isRest(req.url)) { 
                console.log('hello from send File'); 
                res.sendFile('home.html', { root: staticRoute });
                }
            }
        });
     } else {
         res.redirect('/');
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

