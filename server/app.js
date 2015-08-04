var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var router = require('./router');

var Mediator = new require('./mediator');

global.m = new Mediator();

var app = express();

// // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in ../client
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    cookieName: 'session',
    secret: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    duration: 90* 60* 1000,
    activeDuration: 30* 60* 1000,
}));

app.use('/build', express.static('./public'));
app.use(express.static('../client'));

app.use(router);

module.exports = app;
