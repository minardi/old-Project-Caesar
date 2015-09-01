'use strict';
(function (This) {
    This.AccountCollectionView = BaseView.extend({
		template: templates.accountCollectionTpl,
        className: 'accounts',
        tagName: 'div',
        itemViews: [],

        events: {
            'click .create': 'add',
            'click .name-header': 'sortByName',
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

        sortByLogin: function () {
            var flag = 'loginFlag',
                sortingAttribute = 'login',
                $el = $('.login-header');

            this.sortFunction(flag, sortingAttribute, $el);
            this.renderGrid();
        },

        sortByLocation: function () {
            var $el = this.$('.location-header');

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
                        return a.get('name').toLowerCase() < b.get('name').toLowerCase() ? -1 : 1;
                    }

                    return result;
                };

                this.locationFlag  = 'DESC';
                this.$('.sort-flag').removeClass('glyphicon-triangle-top').removeClass('glyphicon-triangle-bottom');
                $el.find('.sort-flag').addClass('glyphicon-triangle-bottom');
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
                        return a.get('name').toLowerCase() < b.get('name').toLowerCase() ? -1 : 1;
                    }

                    return result;
                };

                this.locationFlag  = 'ASC';
                this.$('.sort-flag').removeClass('glyphicon-triangle-top').removeClass('glyphicon-triangle-bottom');
                $el.find('.sort-flag').addClass('glyphicon-triangle-top');
            }

            this.collection.sort({silent: true});
            this.renderGrid();
        }
    });
})(App.Accounts);