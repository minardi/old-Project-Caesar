(function (This) {
	This.CalendarEventsView = Backbone.View.extend({
		template: callendarEventsTpl,

		initialize: function () {
			this.eventsView = new This.EventsView();
			this.calendarView = new This.CalendarView();
			this.collection = new This.CalendarCollection();
			this.collection.push({
				'startDate': new Date(2015, 7, 27),
					'Monday': {
							'7:00': [1,2],
							'8:30': [2]
					}, 
					'Tuesday': {
							'10:30': [2],
							'11:00': [2]
						}		
			});

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

		render: function () {
			this.$el.html(this.template());
			this.$el.find('.events').append(this.eventsView.render().el);
			this.$el.find('.calendar').append(this.calendarView.render().el);
			return this;
		}
	})
})(App.Calendar);