'use strict';

(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            'Account': 'showAccount',
            'Register': 'showRegister'
        },

        initialize: function () {
            this.controller = new App.Accounts.Controller();

            //URL navigation
            cs.mediator.subscribe('ShowLoginForm', this.navigateLoginForm, null, this);
            cs.mediator.subscribe('ShowRegisterForm', this.navigateRegisterForm, null, this);
            
            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        navigateLoginForm: function () {
            this.navigate('Login');
        },
        navigateRegisterForm: function () {
            this.navigate('Register');
        },

        showAccount: function () {
            cs.mediator.publish('ShowLoginForm');
        },
        showRegister: function () {
            cs.mediator.publish('ShowRegisterForm');
        }
    });
})(App.Accounts);




