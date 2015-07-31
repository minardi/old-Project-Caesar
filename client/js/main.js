'use strict';

var App = {},
    cs = {},
    collections = {};

//setUp models
<<<<<<< HEAD
setUp(App, ['Events', 'Resources', 'About', 'Menu', 'Calendar']);
setUp(cs, ['mediator', 'subRouters', 'router', 'menu']);
=======
setUp(App, ['Events', 'Resources', 'About', 'Menu', 'Messenger']);
setUp(cs, ['mediator', 'subRouters', 'router', 'menu', 'messenger']);
setUp(collections, ['resouresCollection', 'eventsCollection']);
>>>>>>> 5a9b6790c2cfada25a2212cdca9e21b33377717a

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