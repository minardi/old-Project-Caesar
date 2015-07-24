'use strict';
(function (This) {
    This.EventCollectionView = Backbone.View.extend({
        tagName: 'div',
        tpl: eventCollectionTpl,

        initialize: function () {
        },

        render: function () {
            this.$el.append(this.tpl);

            this.collection.each(function (event) {
                this.renderOne(event)
            }, this);

            return this;
        },

        renderOne: function (event) {
            var eventView = new App.Events.EventView({model: event});
            this.$el.find('.event-list').append(eventView.render().el);
        }


    });
})(App.Events);