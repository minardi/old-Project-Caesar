'use strict';
(function (This) {
    This.ResourceTypeCollectionView = Backbone.View.extend({
        tagName: 'ul',

        initialize: function () {
            this.collection = collections.resourceTypesCollection;
        },

        render: function () {
            this.collection.each(function (model) {
                this.renderOne(model);
            }, this);

            return this;
        },

        renderOne: function (model) {
            var eventTypeView = App.Settings.EventTypeView({model: model});
            this.$el.append(eventTypeView.render().$el);
        }

    });
})(App.Settings);