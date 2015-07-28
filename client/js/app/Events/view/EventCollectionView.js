'use strict';
(function (This) {
    This.EventCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'events',
        tpl: eventCollectionTpl,
		
		events: {
            'click .add': 'add'
        },

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
            this.$('.event-list').append(eventView.render().el);
        },

        add: function () {
            cs.mediator.publish('CreateEvent');
        },

        show: function () {
            this.$el.removeClass('hidden');
        },

        getModelById: function (id, callback) {
            if (this.collection.get(id)) {
                callback(this.collection.get(id));
            } else {
                this.collection.once('sync', function () {
                    if (this.collection.get(id)) {
                        callback(this.collection.get(id));
                    } else {
                        cs.mediator.publish('Show404');
                    }
                }, this);
            }
        }
    });
})(App.Events);