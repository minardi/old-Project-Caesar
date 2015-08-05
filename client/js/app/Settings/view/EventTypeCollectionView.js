'use strict';
(function (This) {
    This.EventTypeCollectionView = Backbone.View.extend({
        tagName: 'ul',

        initialize: function () {
            this.collection = collections.eventTypes;
        },
        
        render: function () {
            this.collection.each(function (model) {
                var eventTypeView = new App.Settings.EventTypeView({model: model});
                this.$el.append(eventTypeView.render().el);
            }, this);

            return this;
        },

        renderOne: function (model) {
            var eventTypeView = App.Settings.EventTypeView({model: model});
            this.$el.append(eventTypeView.render().$el);
        }
        
    });
})(App.Settings);