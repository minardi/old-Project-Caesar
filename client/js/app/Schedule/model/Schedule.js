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
		}
	})
})(App.Schedule);