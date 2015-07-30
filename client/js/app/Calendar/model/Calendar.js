(function (This) {
	This.CalendarCollection = Backbone.Collection.extend({
		model: This.Week
	})
})(App.Calendar);