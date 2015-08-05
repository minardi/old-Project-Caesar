'use strict';

(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            'Accounts': 'createAccount',
        },

        initialize: function () {
            this.controller = new App.Accounts.Controller();
            cs.mediator.subscribe('CreateAccount', this.navigateNewAccount, null, this);
            
            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        navigateNewAccount: function () {
            this.navigate('Accounts');
        },

        createAccount: function () {
            cs.mediator.publish('CreateAccount');
        }

    });
})(App.Accounts);




