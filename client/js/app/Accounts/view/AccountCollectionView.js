'use strict';
(function (This) {
    This.AccountCollectionView = Backbone.View.extend({
		template: templates.accountCollectionTpl,
        className: 'accounts',
        tagName: 'div',

        events: {
            'click .create': 'add'
        },

        initialize: function () {
            this.collection = collections.accountsCollection;
            this.listenTo(this.collection, 'add', this.renderOne);
        },

        render: function () {
           this.$el.html(this.template);
           this.collection.each(function (account) {
                this.renderOne(account);
            }, this);

            return this;
        },

        renderOne: function (model) {
            var accountView = new App.Accounts.AccountView({model: model});
            this.$('.account-list').append(accountView.render().el);
        },

        add: function () {
            cs.mediator.publish('CreateAccount');
        },

        show: function () {
            this.$el.removeClass('hidden');
        },

        getModelById: function (id, callback) {
            var model = this.collection.get(id);
            if (model) {
                callback(model);
            } else {
                cs.mediator.publish('Show404');
            }
        }

    });
})(App.Accounts);