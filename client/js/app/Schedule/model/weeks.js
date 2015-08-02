(function (This) {
    This.Weeks = Backbone.Collection.extend({
    	model: This.Week,
        url: '/weeks'
    });
})(App.Schedule);