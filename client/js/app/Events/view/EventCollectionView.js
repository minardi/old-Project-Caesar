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
			'keydown': 'closeOnEscape',
            'click .pageEl': 'changePage'
        },

        initialize: function () {
            this.pageSize = 15;
            this.pageIndex = 0;
            this.collection = collections.eventsCollection;
            this.listenTo(this.collection, 'add', this.renderOne);
            this.listenTo(this.collection, 'destroy', this.render);
			$('body').on('keydown', this.closeOnEscape.bind(this));
        },

        render: function () {
            var pageCount = Math.ceil(this.collection.length / this.pageSize),
                startPosition = this.pageIndex * this.pageSize,
                endPosition = startPosition + this.pageSize,
                currentModel,
                i;

            this.$el.html(this.tpl({
                pageCount: pageCount
            }));

            for (i = startPosition; i < endPosition; i++) {
                currentModel = this.collection.models[i];
                if (currentModel) {
                    this.renderOne(currentModel)
                }
            }

            this.$(".pagination li").eq(this.pageIndex).addClass('active');

            return this;
        },

        renderOne: function (model) {
            var eventView = new App.Events.EventView({model: model});
            this.$('.event-list').append(eventView.render().el);
        },

        add: function () {
            cs.mediator.publish('CreateEvent');
		    this.fullEveClose();
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
			$('.toshowfirst').switchClass('col-md-8', 'col-md-12', 1000);
			$('.shortInfo').removeClass('warning');
		},

        changePage: function (e) {
            this.pageIndex = e.currentTarget.value - 1;
            this.render();
        }
    });
})(App.Events);