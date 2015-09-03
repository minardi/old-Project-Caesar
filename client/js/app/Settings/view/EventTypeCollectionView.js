'use strict';
(function (This) {
    This.EventTypeCollectionView = This.CollectionView.extend({
        tagName: 'div',
        className: 'col-md-3',
        tpl: templates.eventTypeTpl,

        events: {
            'keypress .new-type': 'createNew',
            'click .addEventSettings': 'save'
        },

        initialize: function () {
            this.collection = collections.eventTypes;
            this.listenTo(this.collection, 'add', this.renderOne);
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
			var docHeight = $(document).height(),
			    boxHeight = docHeight - 226 + 'px',
			    divHeight = 140 + 84 + (45 * this.count);

			if(divHeight >= docHeight) {
			    this.$('#eventsScroll').addClass('showScroll');
				this.$('.showScroll').css('height', boxHeight)
			} else {
				this.$('#eventsScroll').removeClass('showScroll');
			}
		}

    });
})(App.Settings);