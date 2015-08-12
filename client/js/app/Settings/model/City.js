'use strict';

(function (This) {
    This.City = Backbone.Model.extend({
        defaults: {
            name: '',
            location: ''
        }
        
    });
})(App.Accounts);