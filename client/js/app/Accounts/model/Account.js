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
            login: function (value) {
                var msg = '',
                    cool = collections.accountsCollection.toJSON(),
                    logins = [],
                    result;
                    cool.forEach(function (element) {
                        logins.push(element['login']);
                    });
                        
                result = _.contains(logins, value); 
                if (value !== '') { 
                    if(result) {
                        msg = 'That login already exists';
                        return msg;
                    }
                } else if (value === '') {
                    msg ='Field cannot be empty';
                    return msg;
                }
            },
            password: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }
            ]
        }
    });
})(App.Accounts);