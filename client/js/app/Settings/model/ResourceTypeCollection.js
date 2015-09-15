'use strict';
(function (This) {
    This.ResourceTypeCollection = Backbone.Collection.extend({
        model: This.ResourceType,

        url: '/resourceTypes',

        getNameById: function (id) {
            var model = this.get(id);
            return model.get('name');
        }
    });
})(App.Settings);