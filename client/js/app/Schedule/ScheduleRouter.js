(function (This) {
	This.Router = Backbone.Router.extend({
		routes: {
			'Schedule': 'showSchedule',
			'Schedule*path': 'notFound'
		},

		initialize: function () {
			var controller = new This.Controller();
			Backbone.history.loadUrl(Backbone.history.fragment);
		},

		showSchedule: function () {
			cs.mediator.publish('ScheduleSelected');
		},

        notFound: function () {
			cs.mediator.publish('Show404');
        }		
	})
})(App.Schedule);