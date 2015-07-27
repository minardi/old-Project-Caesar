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

        show: function () {
            this.$el.removeClass('hidden');
        },

        renderOne: function (model) {
            var eventView = new App.Events.EventView({model: model});
            this.$el.find('.event-list').append(eventView.render().el);
        },


        add: function () {
            cs.mediator.publish('CreateEvent');
        }


    });
})(App.Events);