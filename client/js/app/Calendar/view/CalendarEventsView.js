(function (This) {
	This.ScheduleEventsView = Backbone.View.extend({
		template: scheduleEventsTpl,

	/*	initialize: function () {
			this.eventsView = new This.EventsView();
			this.calendarView = new This.CalendarView();
			this.collection = new This.CalendarCollection();
			this.currentWeekNumber = new Date();
			this.currentWeekNumber.setMonth(this.currentWeekNumber.getMonth() + 1);
			this.currentWeekNumber = this.currentWeekNumber.getWeekNumber();

			cs.mediator.subscribe('DaySelected', this.addEvent, null, this);		
		},

		showEvents: function () {
			var weekNumber;

			this.collection.each(function (item) {
				weekNumber = item.get('startDate').getWeekNumber();
				if (this.currentWeekNumber === weekNumber) {
					cs.mediator.publish('CurrentWeekSelected', item);
				}			
			}, this);
		},

		addEvent: function (day, timeline, eventId, startDate) {
			var weekNumber,
				selectedDay;

			this.collection.each(function (week) {
				weekNumber = week.get('startDate').getWeekNumber();
				if (this.currentWeekNumber === weekNumber) {
					selectedDay = week.get(day);
					if (selectedDay[timeline]) {
						selectedDay[timeline].push(eventId);
					} else {
						selectedDay[timeline] = [eventId];
					}					
				}	
			}, this);

			cs.mediator.publish('EvendAdded', this.collection);

		},

		renderDays: function () {
			var $el = this.$el.find('.dateRow');
		},
*/
		appendView: function (moduleName, element) {
			var modules = {
				'events': 'events',
				'shedule': 'shedule'
			};

			this.$el.html(this.template());
			this.$el.find(modules[moduleName]).html(element);
		},

		render: function () {
			return this;
		}
	})
})(App.Schedule);