'use strict';
(function (This) {
    This.EventCollectionView = Backbone.View.extend({
        tagName: 'div',
        tpl: eventCollectionTpl,

        initialize: function () {
            this.collection.fetch();
            this.listenTo(this.collection, 'add', this.renderOne);
        },

        render: function () {
            this.$el.append(this.tpl);

            this.collection.each(function (event) {
                this.renderOne(event)
            }, this);

            return this;
        },

        renderOne: function (model) {
            var eventView = new App.Events.EventView({model: model});
            this.$el.find('.event-list').append(eventView.render().el);
        }


    });
})(App.Events);