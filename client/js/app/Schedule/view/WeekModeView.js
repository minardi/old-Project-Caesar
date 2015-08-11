(function(This) {
	This.WeekModeView = Backbone.View.extend({
		template: templates.weekModeTpl,

		events: {
			'click .allEvents': 'showAllEvents',
			'click .selectedEvent': 'showSelectedEvent',
		},

		render: function () {
			this.$el.html(this.template());
			return this;
		},

		showAllEvents: function () {
			this.$el.find('.weekModeCaption').html('Weeks mode: All Events');
			cs.mediator.publish('WeekModeSelected', 'allEvents');
		},

		showSelectedEvent: function () {
			this.$el.find('.weekModeCaption').html('Weeks mode: Selected Event');
			cs.mediator.publish('WeekModeSelected', 'selectedEvent');
		}
	})
})(App.Schedule);