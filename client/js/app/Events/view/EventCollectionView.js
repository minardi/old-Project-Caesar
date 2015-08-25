'use strict';
(function (This) {
    This.EventCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'events',
        tpl: templates.eventCollectionTpl,
        itemViews: [],
		
		events: {
            'click .add': 'add',
            'change .resourceSorting': 'sorting',
			'click .fullEventClose': 'fullEveClose',
			'keydown': 'closeOnEscape',
            'click .pageEl': 'changePage',
            'keyup .searchField': 'startSearch'
        },

        initialize: function () {
            this.collection = collections.eventsCollection;
            this.pageSize = 5;
            this.pageIndex = 0;
            this.listenTo(this.collection, 'add', this.renderGrid);
            this.listenTo(this.collection, 'destroy', this.renderAfterDestroy);
			$('body').on('keydown', this.closeOnEscape.bind(this));
        },

        render: function () {
            this.pageCount = Math.ceil(this.collection.length / this.pageSize);
            this.$el.empty();
            this.$el.html(this.tpl());

            this.renderGrid();

            return this;
        },

        renderGrid: function () {
            var tpl = templates.paginationTpl,
                currentModel,
                i;

            this.pageCount = Math.ceil(this.collection.length / this.pageSize);
            this.startPosition = this.pageIndex * this.pageSize;
            this.endPosition = this.startPosition + this.pageSize;

            _.each(this.itemViews, function (view) {
                view.remove();
            });

            for(i = this.startPosition; i < this.endPosition; i ++){
                currentModel = this.collection.models[i];
                if(currentModel) {
                    this.renderOne(currentModel);
                }else {
                    break;
                }
            }

            this.$('nav').html(tpl({
                pageCount: this.pageCount
            }));

            this.$(".pagination li").eq(this.pageIndex).addClass('active');
        },


        renderOne: function (model) {
            var eventView = new App.Events.EventView({model: model});
            this.$('.event-list').append(eventView.render().el);
			this.itemViews.push(eventView);
			var eventFullView = new App.Events.EventFullView({model: model});
			this.$('.fullEvent').append(eventFullView.render().el);
        },

        renderAfterDestroy: function () {
            this.startSearch();
            if(!this.collection.at(this.startPosition)){
                this.pageIndex = this.pageIndex -1;
            }

            this.renderGrid();
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
                this.renderGrid();
            } else {
                this.collection.comparator = function(event) {
                    return event.get('name');
                };
                this.collection.sort();
                this.renderGrid();
            }
        },
		
		fullEveClose: function () {
			$('.toshow').addClass('hidden');
			$('.toshowfirst').switchClass('col-md-8', 'col-md-12', 1000);
			$('.shortInfo').removeClass('warning');
		},

        changePage: function (e) {
            this.pageIndex = e.currentTarget.value - 1;
            this.renderGrid();
        },

        startSearch: function () {
            var searchRequest = this.$('.searchField').val(),
                filteredArray;
            if (searchRequest !== '') {
                filteredArray = collections.eventsCollection.filter(function (model) {
                    return model.get('name').toLowerCase().indexOf(searchRequest.toLowerCase()) >= 0;
                });

                this.collection = new App.Events.EventCollection(filteredArray);
                this.pageIndex = 0;
            } else {
                this.collection = collections.eventsCollection;
            }

            this.renderGrid();
        }
    });
})(App.Events);