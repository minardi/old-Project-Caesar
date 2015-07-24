'use strict';

(function (This) {
    This.Event = Backbone.Model.extend({
        defaults: {
            name: '',
            type: '',
            resources: []
        }
    });
})(App.Events);