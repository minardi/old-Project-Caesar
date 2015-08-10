'use strict';

(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            'Accounts': 'showAccountsView',
            'Accounts/new': 'createAccountView',
            'Accounts/:id/edit': 'editAccount',
            'Accounts*path': 'notFound'
        },

        initialize: function () {
            var controller = new App.Accounts.Controller();

            cs.mediator.subscribe('ShowAccounts', this.navigateAccounts, null, this);
            cs.mediator.subscribe('CreateAccount', this.navigateNewAccount, null, this);
            cs.mediator.subscribe('EditAccount', this.navigateEditAccount, null, this);
            cs.mediator.subscribe('EditAccountById', this.navigateEditAccountById, null, this);
            cs.mediator.subscribe('CreateAccountViewClosed', this.navigateAccounts, null, this);

            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        navigateAccounts: function () {
            this.navigate('Accounts');
        },

        navigateNewAccount: function () {
            this.navigate('Accounts/new');
        },

        navigateEditAccount: function (account) {
            this.navigate('Accounts/' + account.id + '/edit');
        },

        navigateEditAccountById: function (id) {
            this.navigate('Accounts/' + id + '/edit');
        },

        showAccountsView: function () {
            cs.mediator.publish('ShowAccounts');
        },

        createAccountView: function () {
            cs.mediator.publish('CreateAccount');
        },

        editAccount: function (id) {
            cs.mediator.publish('EditAccount', id);
        },

        notFound: function () {
            var errorPage = errorPage || new App.ErrorPage.Controller();
        }
    });
})(App.Accounts);




