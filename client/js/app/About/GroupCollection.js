"use strict";

(function (This) {
    This.GroupCollection = Backbone.Collection.extend({

        url: '/about',

        model: This.Group
    });

})(App.About);