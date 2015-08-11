'use strict';
(function (This) {
    This.ResourceType = Backbone.Model.extend({
        defaults: {
            name: ''
        },
        urlRoot: '/resourceTypes'
    });
})(App.Settings);