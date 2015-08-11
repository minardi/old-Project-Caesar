'use strict';
(function (This) {
    This.EventCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'events',
        tpl: templates.eventCollectionTpl,
		
		events: {
            'click .add': 'add',
            'change .resourceSorting': 'sorting'
        },

        initialize: function () {
            this.listenTo(this.collection, 'add', this.renderOne);
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
        },
        
        sorting: function () {
            var sortingType = $('.resourceSorting').val();
            
            if (sortingType === '0') {
                this.collection.comparator = function(event) {
                    return event.get('type');
                }
                this.collection.sort();
                this.render();
            } else {
                this.collection.comparator = function(event) {
                    return event.get('name');
                }
                this.collection.sort();
                this.render();
            }
        }
    });
})(App.Events);