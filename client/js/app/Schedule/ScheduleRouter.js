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
            var errorPage = errorPage || new App.ErrorPage.Controller();
        }		
	})
})(App.Schedule);