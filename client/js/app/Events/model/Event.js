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
                    required: true,
                    msg: 'You forgot to choose a type'
                }
            ],
            type: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }
            ]
        }
    });
})(App.Events);