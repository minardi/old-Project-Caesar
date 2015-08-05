'use strict';

var App = {},
    cs = {},
    collections = {};

setUp(App, ['Events', 'Resources', 'About', 'Menu', 'Messenger', 'Schedule', 'ErrorPage', 'Settings', 'Accounts']);
setUp(cs, ['mediator', 'subRouters', 'router', 'menu', 'messenger']);
setUp(collections, ['resouresCollection', 'eventsCollection', 'eventTypes', 'resourceTypes']);

$(function () {
    var dataLoader = new DataLoader(); //preload collections and start main function
    dataLoader.loadCollections(main);
    
    function main () {
        cs.mediator = new Mediator();
        cs.router = new App.Router();
        cs.messenger = new App.Messenger.Controller();
        cs.subRouters = {};

        cs.menu = new App.Menu.Controller();
        Backbone.history.start({pushState: true});
    }
});