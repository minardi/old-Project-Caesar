'use strict';
(function (This) {
    This.EventTypeCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'col-md-3',
        tpl: templates.eventTypeTpl,

        events: {
            'keypress .new-type': 'createNewType'
        },

        initialize: function () {
            this.collection = collections.eventTypes;
            this.listenTo(this.collection, 'add', this.renderOne);
			cs.mediator.subscribe('UpdateEvents', this.updateCollection, {}, this);
        },
        
        render: function () {
			this.count = 0;
            this.$el.html(this.tpl);
            this.collection.each(function (model) {
                this.renderOne(model);
            }, this);

            return this;
        },

        renderOne: function (model) {
            var eventTypeView = new App.Settings.ItemView({model: model});
            this.$('.event-type').append(eventTypeView.render().el);
			this.count++;
			this.showScroll();

            return this;
        },
		
		showScroll: function () {
			if(this.count >= 7) {
				this.$('#eventsScroll').addClass('showScroll');
			} else {
				this.$('#eventsScroll').removeClass('showScroll');
			}
		},

        createNewType: function (e) {
            var ENTER = 13;
            if(e.which !== ENTER || !this.$('.new-type').val().trim()){
                return;
            }

            this.collection.create({name: this.$('.new-type').val()});
            this.$('.new-type').val('');
        },
		
		updateCollection: function (){
            this.render();  
        }
        
    });
})(App.Settings);