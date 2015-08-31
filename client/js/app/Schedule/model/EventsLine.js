(function (This) {
	This.EventsLine = Backbone.Collection.extend({
		model: This.Week,		
	});
})(App.Schedule);