'use strict';

(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            'logout': 'showLogout',
            '': 'showLoginPage'
        },

        initialize: function () {
            //this.controller = new App.Accounts.Controller();

            //URL navigation
            cs.mediator.subscribe('ShowLogout', this.navigateLoginout, null, this);
            cs.mediator.subscribe('ShowLoginPage', this.navigateLoginPage, null, this);
            
            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        navigateLoginout: function () {
            this.navigate('logout');
        },
        navigateLoginPage: function () {
            this.navigate('login');
        },

        showLogout: function () {
            cs.mediator.publish('ShowLogout');
        },
        showLoginPage: function () {
            cs.mediator.publish('ShowLoginPage');
        }
    });
})(App.Login);




