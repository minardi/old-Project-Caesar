'use strict';

var App = {},
    cs = {},
    collections = {};

//setUp models
setUp(App, ['Events', 'Resources', 'About', 'Menu' ]);
setUp(cs, ['mediator', 'subRouters', 'router', 'menu']);
setUp(collections, ['resouresCollection', 'eventsCollection']);

$(function () {
    var dataLoader = new DataLoader(); //preload collections and start main function
});

function main () {
    cs.mediator = new Mediator();
    cs.router = new App.Router();
    cs.subRouters = {};

    cs.menu = new App.Menu.Controller();

    Backbone.history.start({pushState: true});
}