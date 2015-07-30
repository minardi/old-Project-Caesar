'use strict';

var App = {},
    cs = {};

//setUp models
setUp(App, ['Events', 'Resources', 'About', 'Menu', 'Calendar']);
setUp(cs, ['mediator', 'subRouters', 'router', 'menu']);

$(function () {

    cs.mediator = new Mediator();
    cs.router = new App.Router();
	cs.subRouters = {};

    cs.menu = new App.Menu.Controller();

    Backbone.history.start({pushState: true});
});