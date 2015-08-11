'use strict';
(function (This) {
    This.AccountsCollection = Backbone.Collection.extend({
        model: This.Account,
        url: '/accounts'
    });

})(App.Accounts);
