(function (This) {
	This.Router = Backbone.Router.extend({
		routes: {
			'Calendar': 'showCalendar'
		},

		initialize: function () {
			var controller = new This.Controller();
			Backbone.history.loadUrl(Backbone.history.fragment);
		}
	})
})(App.Calendar);