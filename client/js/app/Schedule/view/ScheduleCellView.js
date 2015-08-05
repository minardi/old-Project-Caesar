(function (This) {
	This.ScheduleCellView = Backbone.View.extend({
		className: 'calendarCellDiv',
		model: App.Events.Event,
		template: sheduleCellTpl,
		weekItem: null,

		events: {
			'click button': 'close',
			'click': 'click'
		},

		render: function () {
			this.$el.attr('resources', this.model.get('resources'));
			this.$el.html(this.template({'value': this.model.get('name')}));
			return this;
		},

		close: function () {
			var dayNumber = this.$el.parent().attr('day'), 
				timeline = this.$el.parent().parent().attr('timeline'), 
				startDate = new Date(this.$el.parent().parent().parent().attr('startDate')),
				weekItem = This.createWeekItem(dayNumber, timeline, this.model.get('id'), startDate);


			collections.scheduleCollection.deleteEvent(weekItem);
			this.remove();
		},

		click: function (event) {
			(this.$el.parent().find('.conflictCell').length) && (event.stopPropagation());
		}
	});
})(App.Schedule);