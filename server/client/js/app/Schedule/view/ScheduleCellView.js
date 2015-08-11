(function (This) {
	This.ScheduleCellView = Backbone.View.extend({
		className: 'calendarCellDiv',
		model: App.Events.Event,
		template: templates.sheduleCellTpl,
		weekItem: null,

		events: {
			'click button': 'close',
			'click': 'click'
		},

		render: function () {
			this.$el.attr('resources', this.model.get('resources'));
			this.$el.attr('event', this.model.get('id'));
			this.$el.html(this.template({'value': this.model.get('name')}));
			return this;
		},

		close: function () {
			var dayNumber = this.$el.parent().attr('day'), 
				timeline = this.$el.parent().attr('timeline'), 
				startDate = new Date($('table.schedule').attr('startDate')),
				weekItem = This.createWeekItem({'dayNumber': dayNumber, 
												'timeline': timeline, 
												'eventId': this.model.get('id'), 
												'startDate':startDate});
			weekItem.destroy();
			collections.scheduleCollection.deleteEvent(weekItem);
			this.remove();
		},

		click: function (event) {
			(this.$el.parent().find('.conflictCell').length) && (event.stopPropagation());
		}
	});
})(App.Schedule);