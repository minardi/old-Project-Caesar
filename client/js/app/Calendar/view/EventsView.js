(function (This) {
	This.EventsView = Backbone.View.extend({
		tagName: 'ul',
		className: 'list-group',

		events: {
			'click': 'selectItem'
		},

		initialize: function () {
			this.$el.parent().addClass('list-group');
		},

		selectItem: function (event) {
			$(event.target).parent().children().removeClass('active');
			$(event.target).addClass('active');
		},

		render: function () {
			collections.eventsCollection.each(this.addEvent.bind(this));
			return this;
		},

		addEvent: function (event) {
			this.$el.append(this.renderOne(event));
		},

		renderOne: function (event) {
			var $li = $('<li>' + event.get('name') + '</li>');
			$li.addClass("list-group-item SheduleEventsLi");
			$li.on('click', function () {
				cs.mediator.publish('EventSelected', event);
			});
			return $li;
		},


	})
})(App.Schedule);