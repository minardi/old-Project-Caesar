'use strict';

var App = {},
    cs = {};

//setUp models
setUp(App, ['Events', 'Resources']);
setUp(cs, ['mediator', 'subRouters', 'router']);

$(function () {

    cs.mediator = new Mediator();
    cs.router = new App.Router();
	cs.subRouters = {};
    
    Backbone.history.start({pushState: true});
});