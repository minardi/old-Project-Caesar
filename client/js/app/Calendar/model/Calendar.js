(function (This) {
	This.Schedule = Backbone.Collection.extend({
		model: This.Week
	})
})(App.Schedule);