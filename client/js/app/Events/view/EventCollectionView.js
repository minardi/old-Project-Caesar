'use strict';
(function (This) {
    This.EventCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'events',
        tpl: templates.eventCollectionTpl,
		
		events: {
            'click .add': 'add',
            'change .resourceSorting': 'sorting',
			'click .fullEventClose': 'fullEveClose',
			'keydown': 'closeOnEscape'
        },

        initialize: function () {
            this.collection = collections.eventsCollection;
            this.listenTo(this.collection, 'add', this.renderOne);
			$('body').on('keydown', this.closeOnEscape.bind(this));
        },

        render: function () {
            this.$el.html(this.tpl);
            this.collection.each(function (event) {
                this.renderOne(event)
            }, this);

            return this;
        },

        renderOne: function (model) {
            var eventView = new App.Events.EventView({model: model});
            this.$('.event-list').append(eventView.render().el);
			
			var eventFullView = new App.Events.EventFullView({model: model});
			this.$('.fullEvent').append(eventFullView.render().el);
        },

        add: function () {
            cs.mediator.publish('CreateEvent');
        },

        show: function () {
            this.$el.removeClass('hidden');
        },

        getModelById: function (id, callback) {
            var model = this.collection.get(id);
            if (model) {
                callback(model);
            } else {
                cs.mediator.publish('Show404');
            }
        },
		
		closeOnEscape: function (e) {
            if (e.which === ESC) {
                this.fullEveClose();
            }
        },
        
        sorting: function () {
            var sortingType = $('.resourceSorting').val();
            
            if (sortingType === '0') {
                this.collection.comparator = function(event) {
                    return event.get('type');
                };
                this.collection.sort();
                this.render();
            } else {
                this.collection.comparator = function(event) {
                    return event.get('name');
                };
                this.collection.sort();
                this.render();
            }
        },
		
		fullEveClose: function () {
			$('.toshow').addClass('hidden');
			$('.toshowfirst').removeClass('col-md-8');
			$('.toshowfirst').addClass('col-md-12');
			$('.shortInfo').removeClass('warning');
		}
    });
})(App.Events);