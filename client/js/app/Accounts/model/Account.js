'use strict';

(function (This) {
    This.Account = Backbone.Model.extend({
        defaults: {
            login: '',
            password: '',
            city: '',
            country: '',
            role: ''
        },

        urlRoot: '/admin'
    });
})(App.Accounts);