(function (This) {
	This.HolidayView = Backbone.View.extend({
		className: 'holidayCell',
		model: App.Holidays.HolidaysModel,

		events: {
			'click': 'stopPropagation'
		},

		render: function () {
			this.$el.html("Holiday:" + this.model.get('name'));
			return this;
		},

		stopPropagation: function () {
			return false;

		},

	})
})(App.Schedule);