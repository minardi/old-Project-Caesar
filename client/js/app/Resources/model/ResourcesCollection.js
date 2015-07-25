(function (This) {
    This.ResourcesCollection = Backbone.Collection.extend({
        model: This.ResourcesModel,
        url: '/resources',

        comparator: function (resource) {
            return resource.get('type');
        }
    });
})(App.Resources);