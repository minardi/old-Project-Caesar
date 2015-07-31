(function (This) {
	This.ScheduleEventsView = Backbone.View.extend({
		template: scheduleEventsTpl,

		initialize: function () {
			this.$el.html(this.template());
		},
		
		appendView: function (moduleName, element) {
			var modules = {
				'events': 'scheduleEvents',
				'schedule': 'Myschedule'
			};
			this.$el.find('.' + modules[moduleName]).html(element);
		},

		show: function () {
			this.$el.removeClass('hidden');
		},

		render: function () {
			return this;
		}
	})
})(App.Schedule);