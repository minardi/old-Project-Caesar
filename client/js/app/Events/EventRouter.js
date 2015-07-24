'use strict';

(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            'Events': 'getEvents',
            'Events/new': 'createEvent',
            'Events/:id/edit': 'editEvent',
            'Events/:id': 'getEvent',
            'Events*path': 'notFound'
        },

        initialize: function () {
            var controller = new App.Events.Controller();

            //URL navigation
            cs.mediator.subscribe('ShowEvents', this.navigateEvents, null, this);
            cs.mediator.subscribe('ShowTEventInfo', this.navigateShowEvent, null, this);
            cs.mediator.subscribe('ShowEventById', this.navigateShowEventById, null, this);
            cs.mediator.subscribe('CreateEvent', this.navigateNewEvent, null, this);
            cs.mediator.subscribe('EditEvent', this.navigateEditEvent, null, this);
            cs.mediator.subscribe('EditTEventById', this.navigateEditEventById, null, this);
            
            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        navigateEvents: function () {
            this.navigate('Events');
        },

        navigateShowEvent: function (event) {
            this.navigate('Events/' + event.id);
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

        navigateEditEventById: function (id) {
            this.navigate('Events/' + id + '/edit');
        },

        getEvents: function () {
            cs.mediator.publish('ShowEvents');
        },

        createEvent: function () {
            cs.mediator.publish('CreateEvent');
        },

        editEvent: function (id) {
            cs.mediator.publish('EditEventById', id);
        },

        getEvent: function (id) {
            cs.mediator.publish('ShowEventById', id);
        },

        notFound: function () {
            cs.mediator.publish('Show404View');
        }
    });
})(App.Events);




