"use strict";

(function (This) {
    This.GroupCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'About',

        template: groupCollectionTpl,
       
        initialize: function () {
            this.groupCollection = new This.GroupCollection(this.cleargroupList);
            this.groupCollection.fetch();
			this.groupCollection.once('sync', this.sortContributors, this);
        },

        render: function () {
            this.$el.html(this.template());

            return this;
        },

        sortContributors: function () {
            this.groupCollection.forEach(function (group) {
                var groupContributors = group.get('students');
                this.addOne(group, groupContributors);
            }, this);
        },

        addOne: function (_group, _contributors) {
            var view = new This.GroupView(_group, _contributors);
            this.$('.list-group-container').append(view.render().el);
        },

        show: function () {
            this.$el.removeClass('hidden');
        }
    });
})(App.About);