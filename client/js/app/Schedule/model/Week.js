(function (This) {
	This.Week = Backbone.Model.extend ({
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
					return fields.startDate.getWeekNumber();
				}
			}
		}
	})
})(App.Schedule);