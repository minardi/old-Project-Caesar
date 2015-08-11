(function (This){
	This.CloneEventsView = Backbone.View.extend({
		tagName: 'button',
		className: 'btn btn-primary',

		events: {
			'click': 'generateWeekItem'
		},

		render: function () {
			this.$el.html('Clone');
			return this;
		},

		generateWeekItem: function () {
			var $elements = $('.selectedCell').find('.calendarCellDiv');

			console.log($elements);
		}
	})
})(App.Schedule);