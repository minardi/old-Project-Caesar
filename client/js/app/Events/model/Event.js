'use strict';

(function (This) {
    This.Event = Backbone.Model.extend({
        defaults: {
            name: '',
            type: '',
            locationCity:'',
            locationCountry: '',
            resources: []
        },

        urlRoot: '/events',

        validation: {
            name: [
                {
                    maxLength: 18,
                    msg: 'Max length is 18 symbols'
                },
                {
                    minLength: 2,
                    msg: 'Min length is 2 symbols'
                },
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }
            ],
            type: [
                {
                    required: true,
                    msg: 'You forgot to choose a type'
                }
            ]
        }
    });
})(App.Events);