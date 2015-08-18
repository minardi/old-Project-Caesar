'use strict';

(function (This) {
    This.Country = Backbone.Model.extend({
        defaults: {
            countryName: ''
        }
    });
})(App.Settings);