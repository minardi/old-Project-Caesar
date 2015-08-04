(function (This) {
	This.Schedule = Backbone.Collection.extend({
		model: This.Week,

		addEvent: function (week) {
			var rightWeek = this.findWhere({weekNumber: week.get('weekNumber')}),
				days;

			if (!rightWeek) {
				this.push(week);
			} else {
				days = rightWeek.get('days');

				_.each(week.get('days'), function (day, dayNumber) {
					days[dayNumber] || (days[dayNumber] = {});
				
					_.each(day, function (eventsId, timeline) {
						days[dayNumber][timeline] || (days[dayNumber][timeline] = []);
							_.each(eventsId, function (eventId) {
								days[dayNumber][timeline].push(eventId);
							}, this);
					}, this)
				}, this);
			}
		},

		deleteEvent: function (week) {
			var rightWeek = this.findWhere({weekNumber: week.get('weekNumber')}),
				days = week.get('days'),
				rightDay = rightWeek.get('days')[Object.keys(days)],
				currentEvents;

				_.each(days, function (day, dayNumber) {

					_.each(day, function (eventId, timeline) {

						currentEvents = rightDay[timeline];
						currentEvents.splice(currentEvents.indexOf(+eventId), 1);

						_.isEmpty(currentEvents) && (delete rightDay[timeline]);
						_.isEmpty(rightDay) && (delete rightWeek.get('days')[dayNumber]);
						_.isEmpty(rightWeek.get('days')) && (this.remove(this.models[this.models.indexOf(rightWeek)]));

					}, this)
				}, this);
		}
	})
})(App.Schedule);