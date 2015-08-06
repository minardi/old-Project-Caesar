'use strict';

(function (This) {
    This.Account = Backbone.Model.extend({
        defaults: {
            fullName: '',
            login: '',
            password: '',
            locationCity: '',
            locationCountry: '',
            role: ''
        },

        urlRoot: '/accounts'
    });
})(App.Accounts);