'use strict';
(function (This) {
    This.CountriesCollection = Backbone.Collection.extend({
        model: This.Country,
        url: '/countries'
    });
})(App.Settings);
