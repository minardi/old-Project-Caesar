'use strict';
(function (This) {
    This.CitiesCollection = Backbone.Collection.extend({
        model: This.City,
        url: '/cities'
    });

})(App.Settings);
