'use strict';
(function (This) {
    This.CitiesCollection = Backbone.Collection.extend({
        model: This.City,
        url: '/cities',

        getNameById: function (id) {
            var model = this.get(id);

            return model.get('name');
        }
    });

})(App.Settings);
