'use strict';
(function (This) {
    This.ResourceTypeCollectionView = Backbone.View.extend({
        tagName: 'ul',

        initialize: function () {
            this.collection = collections.resourceTypes;
        },

        render: function () {
            this.collection.each(function (model) {
                this.renderOne(model);
            }, this);

            return this;
        },

        renderOne: function (model) {
            var eventTypeView = new App.Settings.EventTypeView({model: model});
            this.$el.append(eventTypeView.render().$el);
        }

    });
})(App.Settings);