'use strict';
(function (This) {
    This.EventCollection = Backbone.Collection.extend({
        model: This.Event,
        url: '/events',

        filterForSearch : function (searchRequest) {
            var filteredArray;

            filteredArray = this.filter(function (model) {
                return model.get('name').toLowerCase().indexOf(searchRequest.toLowerCase()) >= 0;
            });

            return new This.EventCollection(filteredArray);
        }
    });

})(App.Events);
