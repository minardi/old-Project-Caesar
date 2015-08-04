'use strict';
(function (This) {
    This.AccountCollection = Backbone.Collection.extend({
        model: This.Account,
        url: '/admin'
    });

})(App.Accounts);
