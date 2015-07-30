(function (This) {
	This.Router = Backbone.Router.extend({
		routes: {
			'Schedule': 'showSchedule'
		},

		initialize: function () {
			var controller = new This.Controller();
			Backbone.history.loadUrl(Backbone.history.fragment);
		},

		showSchedule: function () {
			cs.mediator.publish('ScheduleSelected');
		}
	})
})(App.Schedule);