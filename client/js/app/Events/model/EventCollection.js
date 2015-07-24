'use strict';
(function (This) {
    This.EventCollection = Backbone.Collection.extend({
        model: This.Event
    });

})(App.Events);
