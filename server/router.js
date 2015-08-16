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
    holidaysRouter = require('./holidays/holidaysRouter'),
    citiesRouter = require('./cities/citiesRouter');
    countriesRouter = require('./countries/countriesRouter');

	
globalMan = {};


var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://localhost:27017/caesar');

var Account = mongoose.model('Account', new Schema({
    id: ObjectId,
    fullName: String,
    login: String, //{ type: String, unique: true },
    password: String,
    locationCity: String,
    locationCountry: String,
    role: String
}));

router.use(/^\/events\b/, eventsRouter);
router.use(/^\/eventTypes\b/, eventTypesRouter);
router.use(/^\/resources\b/, resourcesRouter);
router.use(/^\/resourceTypes\b/, resourceTypesRouter);
router.use(/^\/schedule\b/, scheduleRouter);
router.use(/^\/accounts/, accountsRouter);
router.use(/^\/contributors\b/, contributorsRouter);
router.use(/^\/holidays\b/, holidaysRouter);
router.use(/^\/cities\b/, citiesRouter);
router.use(/^\/countries\b/, countriesRouter);

router.get('/reset', function(req, res, next) {     
    var resetController = new require('./reset/resetController')(req, res);
});

router.all('/download', function(req, res, next) {     
    var generatorController = new require('./generator/generatorController')(req, res);
});

router.get('/name', function(req, res, next) {
	var json = JSON.stringify(globalMan[req.cookies.clientId]);
	
	res.writeHead(200, {"Content-Type": "application/json"});
    res.end(json);
});

router.post('/', function (req, res) {
    var staticRoute = /^\/build/.test(req.url)? './public': '../client';
    Account.findOne( { login: req.body.login }, function (err, account) {
        if(!account){
            console.log('Invalid login');
            res.render('index.jade', { error: 'No such user'});
        } else {
            if (req.body.password === account.password) {
                var id = setRandomId();
				globalMan[id] = account;
                res.cookie('clientId', id, { maxAge: 3600000 });
                res.sendFile('home.html', { root: staticRoute });
            } else {       
                res.render('index.jade', { error: 'Invalid password'});
            }   
        } 
    });
});


router.get('/', function (req, res) {
    console.log('hello from get/'); 
    var staticRoute = /^\/build/.test(req.url)? './public': '../client';
    if(req.cookies && req.cookies.clientId) {
         res.sendFile('home.html', { root: staticRoute });
    } else {
        res.render('index.jade');
    }
});

router.get('/logout', function (req, res) {
    console.log('hello from logout');
    if(req.cookies && req.cookies.clientId){
        res.clearCookie('clientId');
		delete globalMan[req.cookies.clientId];
    }
    res.redirect('/');
});


router.get('*', function (req, res) {
    var staticRoute = /^\/build/.test(req.url)? './public': '../client';
	
	if(globalMan[req.cookies.clientId] == undefined) {
		 res.clearCookie('clientId');
		 res.redirect('/');
	}
	
    if(req.cookies && req.cookies.clientId) {
        Account.findOne({ login: req.cookies.clientId.login }, function (err, clientId) {
            if(!clientId){
                res.clearCookie('clientId');
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

function setRandomId () {
    var lettersNumbers = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        length = 16,
        clientId = '';
    for( var i = 0; i < length; i++ ) {
       clientId += lettersNumbers.charAt(Math.floor(Math.random() * length));
    }
    return clientId;
}

function isRest (url) {
    var restList = [
        'events',
        'eventTypes',
        'schedule',
        'resources',
        'resourceTypes',
        'accounts', 
        'contributors', 
        'holidays',
        'cities',
        'countries'
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

