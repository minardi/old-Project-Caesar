'use strict';
(function (This) {
    This.AccountCollectionView = Backbone.View.extend({
		template: accountCollectionTpl,
        className: 'accounts',

        events: {
            'click .create': 'createView'
        },

        initialize: function () {
            this.listenTo(this.collection, 'add', this.renderOne);
            this.collection = collections.accountsCollection;

        },
        render: function () {
           this.$el.append(this.template);
            this.collection.each(function (account) {
                this.renderOne(account);
            }, this);

            return this;
        },

        renderOne: function (model) {
            var accountView = new App.Accounts.AccountView({model: model}).render();
            this.$('.account-list').append(accountView.render().el);
        },

        add: function () {
            cs.mediator.publish('CreateAccount');
        },

        show: function () {
            this.$el.removeClass('hidden');
        },

        createView: function () {
            cs.mediator.publish('CreateAccountView');
        }
    });
})(App.Accounts);