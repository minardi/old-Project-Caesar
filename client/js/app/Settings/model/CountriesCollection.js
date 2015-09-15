'use strict';
(function (This) {
    This.CountriesCollection = Backbone.Collection.extend({
        model: This.Country,
        url: '/countries',

        getNameById: function (id) {
            var model = this.get(id);
            return model.get('countryName');
        }
    });
})(App.Settings);
