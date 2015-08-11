'use strict';
(function (This) {
    This.ResourceTypeCollection = Backbone.Collection.extend({
        model: This.ResourceType,

        url: '/resourceTypes'
    });
})(App.Settings);