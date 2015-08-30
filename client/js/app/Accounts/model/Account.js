'use strict';

(function (This) {
    This.Account = Backbone.Model.extend({
        defaults: {
            name: '',
            lastName: '',
            login: '',
            password: '',
            locationCity: '',
            locationCountry: '',
            role: ''
        },

        urlRoot: '/accounts',

        validation: {
            name: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }, {
                    minLength: 2,
                    msg: 'Min length is 2 symbols'
                }, {
                    maxLength: 60,
                    msg: 'Max length is 60 symbols'
                }],
			lastName: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }, {
                    minLength: 2,
                    msg: 'Min length is 2 symbols'
                }, {
                    maxLength: 60,
                    msg: 'Max length is 60 symbols'
                }],
            password: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }, {
                    minLength: 2,
                    msg: 'Min length is 2 symbols'
                }, {
                    maxLength: 18,
                    msg: 'Max length is 18 symbols'
                }
            ],
            login: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }, {
                    minLength: 2,
                    msg: 'Min length is 2 symbols'
                }, {
                    maxLength: 18,
                    msg: 'Max length is 18 symbols'
                }
            ],
            locationCity: function (value) {
                if(value === null) {
                    return 'Select city';
                }
            }

        }
    });
})(App.Accounts);