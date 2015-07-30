'use strict';

var App = {},
    cs = {};

//setUp models
setUp(App, ['Events', 'Resources', 'About', 'Menu', 'Messenger']);
setUp(cs, ['mediator', 'subRouters', 'router', 'menu', 'messenger']);

$(function () {

    cs.mediator = new Mediator();
    cs.router = new App.Router();
    cs.messenger = new App.Messenger.Controller();
	cs.subRouters = {};

    cs.menu = new App.Menu.Controller();

    Backbone.history.start({pushState: true});
});