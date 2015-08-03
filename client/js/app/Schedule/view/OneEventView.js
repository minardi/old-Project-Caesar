(function (This) {
	This.OneEventView = Backbone.View.extend({
		model: App.Events.Event,
		tagName: 'li',
		className: 'list-group-item SheduleEventsLi',

		events: {
			'click': 'sendEvent'
		},

		sendEvent: function () {
			cs.mediator.publish('EventSelected', this.model);
		},

		render: function () {
			this.$el.html(this.model.get('name'));
			return this;
		} 
	})
})(App.Schedule);