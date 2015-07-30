(function (This) {
	This.Week = Backbone.Model.extend ({
		defaults: {
			number: 0,
			startDate: new Date(),
			
			'Monday': {},
			'Tuesday': {},
			'Wednesday': {},
			'Thursday': {},
			'Friday': {}
		}
	})
})(App.Schedule);