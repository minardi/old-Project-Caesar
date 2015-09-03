'use strict';

(function (This) {
    This.Country = Backbone.Model.extend({
        defaults: {
            name: ''
        }
    });
})(App.Settings);