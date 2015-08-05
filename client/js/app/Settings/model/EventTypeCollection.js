'use strict';
(function (This) {
    This.EventTypeCollection = Backbone.Collection.extend({
        model: This.EventType,

        url: '/eventTypes'
    });
})(App.Settings);