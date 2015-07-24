'use strict';

var App = {},
    cs = {};

//setUp models
setUp(App, ['Events', ]);
setUp(cs, ['mediator', 'subRouters', 'router']);

$(function () {
    new App.Events.Controller();


    cs.mediator = new Mediator();
    cs.router = new App.Router();
	cs.subRouters = {};
    
    Backbone.history.start({pushState: true});
});