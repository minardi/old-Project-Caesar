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
                }, {
                    minLength: 2,
                    msg: 'Поле не может содержать менее 2 символов'
                }
            ],
            password: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }
            ]
        }
    });
})(App.Accounts);