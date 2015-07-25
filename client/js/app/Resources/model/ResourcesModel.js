(function (This) {
    This.ResourcesModel = Backbone.Model.extend({
        defaults: function () {
            return {
                'type': '',
                'name': ''
            }
        },

        urlRoot: '/resources'
    });
})(App.Resources);