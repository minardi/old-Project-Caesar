(function (This) {
	This.Week = Backbone.Model.extend ({
		urlRoot: '/schedule',
		defaults: {
			startDate: new Date(),
			days: {},
		},

		initialize: function () {
			this.computedFields = new Backbone.ComputedFields(this);
		},

		computed: {
			weekNumber: {
				depends: ['startDate'],
				get: function (fields) {
					if (typeof(fields.startDate) === 'string') {
						fields.startDate = new Date(fields.startDate);
					};
					return fields.startDate.getWeekNumber();
				}
			}
		}
	})
})(App.Schedule);