'use strict';

(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'getEvents',
            'Events': 'getEvents',
            'Events/new': 'createEvent',
            'Events/:id/edit': 'editEvent'
        },

        initialize: function () {
            this.controller = new App.Events.Controller();
            this.controller.start();

            //URL navigation
            cs.mediator.subscribe('RouteToEvents', this.navigateEvents, null, this);
            cs.mediator.subscribe('ShowEventById', this.navigateShowEventById, null, this);
            cs.mediator.subscribe('CreateEvent', this.navigateNewEvent, null, this);
            cs.mediator.subscribe('EditEvent', this.navigateEditEvent, null, this);
            
            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        navigateEvents: function () {
            this.navigate('Events');
        },

        navigateShowEventById: function (id) {
            this.navigate('Events/' + id);
        },

        navigateNewEvent: function () {
            this.navigate('Events/new');
        },

        navigateEditEvent: function (event) {
            this.navigate('Events/' + event.id + '/edit');
        },

        getEvents: function () {
            this.controller.showAll();
        },

        createEvent: function () {
            this.controller.createView();
        },

        editEvent: function (id) {
            this.controller.editEventById(id);
        }
    });
})(App.Events);




