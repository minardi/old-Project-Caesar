'use strict';
(function (This) {
    This.AccountCollectionView = BaseView.extend({
		template: templates.accountCollectionTpl,
        className: 'accounts',
        tagName: 'div',
        itemViews: [],

        events: {
            'click .create': 'add',
            'click .name-header': 'sortByFullName',
            'click .login-header': 'sortByLogin',
            'click .location-header': 'sortByLocation'
        },

        initialize: function () {
            this.nameFlag = 'DESC';
            this.loginFlag = 'ASC';
            this.locationFlag = 'ASC';
            this.collection = collections.accountsCollection;
            this.listenTo(this.collection, 'add', this.renderGrid);
			this.listenTo(collections.accountsCollection, 'all', this.render);
        },

        render: function () {
           this.$el.empty();
           this.$el.html(this.template);
            this.renderGrid();
            return this;
        },

        renderGrid: function () {
            var fragment = document.createDocumentFragment();
            _.each(this.itemViews, function (view) {
                view.remove();
            });
            this.collection.each(function (account) {
                fragment.appendChild(this.renderOne(account));
            }, this);

            this.$('.account-list').append(fragment);
        },

        renderOne: function (model) {
            var accountView = new App.Accounts.AccountView({model: model});
            this.itemViews.push(accountView);
            accountView.render();
            return accountView.el;
        },

        add: function () {
            cs.mediator.publish('CreateAccount');
        },

        sortByFullName: function () {
            var flag = 'nameFlag',
                sortingAttribute = 'fullName';

            this.sortFunction(flag, sortingAttribute);
            this.renderGrid();
        },

        sortByLogin: function () {
            var flag = 'loginFlag',
                sortingAttribute = 'login';

            this.sortFunction(flag, sortingAttribute);
            this.renderGrid();
        },

        sortByLocation: function () {
            if (this.locationFlag === 'ASC') {
                this.collection.comparator = function (a, b) {
                    var firstValue = a.get('locationCity'),
                        secondValue = b.get('locationCity'),
                        result;

                    if (firstValue < secondValue) {
                        result = -1;
                    } else if (firstValue > secondValue) {
                        result = 1;
                    }else {
                        return a.get('fullName').toLowerCase() < b.get('fullName').toLowerCase() ? -1 : 1;
                    }

                    return result;
                };

                this.locationFlag  = 'DESC';
            } else {
                this.collection.comparator = function (a, b) {
                    var firstValue = a.get('locationCity'),
                        secondValue = b.get('locationCity'),
                        result;

                    if (firstValue > secondValue) {
                        result = -1;
                    } else if (firstValue < secondValue) {
                        result = 1;
                    }else {
                        return a.get('fullName').toLowerCase() < b.get('fullName').toLowerCase() ? -1 : 1;
                    }

                    return result;
                };

                this.locationFlag  = 'ASC';
            }

            this.collection.sort();
            this.renderGrid();
        }
    });
})(App.Accounts);