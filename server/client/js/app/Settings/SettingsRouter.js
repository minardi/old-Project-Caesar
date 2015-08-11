'use strict';
(function (This) {
    This.Router = Backbone.Router.extend({
        routes: {
            'Settings': 'getSettings'
        },

        initialize: function () {
            this.controller = new App.Settings.Controller();
        },

        getSettings: function () {
            this.controller.showAll();
        }

    });
})(App.Settings);