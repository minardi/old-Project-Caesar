'use strict';
(function (This) {
    This.AccountsCollection = Backbone.Collection.extend({
        model: This.Account,
        url: '/accounts',
        
        comparator: function (model) {
            return model.get('fullName');
        }
        	
    });

})(App.Accounts);
