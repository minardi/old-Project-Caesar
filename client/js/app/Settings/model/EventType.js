'use strict';
(function (This) {
    This.EventType = Backbone.Model.extend({
        defaults: {
            type: ''
        }
    });
})(App.Settings);