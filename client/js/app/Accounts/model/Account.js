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

        urlRoot: '/accounts',

        validation: {
            fullName: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }
            ],
            login: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }
            ],
            password: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }
            ],
            role: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }
            ],
        }
    });
})(App.Accounts);