'use strict';

(function (This) {
    This.City = Backbone.Model.extend({
        defaults: {
            name: '',
            location: ''
        },

        urlRoot: '/cities'
    });
})(App.Accounts);