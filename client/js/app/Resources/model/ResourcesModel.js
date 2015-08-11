(function (This) {
    This.ResourcesModel = Backbone.Model.extend({
        defaults: function () {
            return {
                'type': '',
                'name': '',
                'locationCity': '',
                'locationCountry': ''
            }
        },

        urlRoot: '/resources',

        validation: {
            type: [
                {
                    required: true,
                    msg: 'You forgot to choose a type'
                }
            ],
            name: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }
            ]
        }
    });
})(App.Resources);