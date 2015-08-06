'use strict';
(function (This) {
    This.EventType = Backbone.Model.extend({
        defaults: {
            name: ''
        },
        urlRoot: '/eventTypes'
    });
})(App.Settings);