(function (This) {
	This.Schedule = Backbone.Collection.extend({
		model: This.Week,
		url: '/schedule',

		addEvent: function (week) {
			var rightWeek = this.findWhere({weekNumber: week.get('weekNumber')}),
				attributes = {},
				days;

			if (!rightWeek) {
				this.push(week);
				rightWeek = this.findWhere({weekNumber: week.get('weekNumber')});
				
			} else {
				days = rightWeek.get('days');

				_.each(week.get('days'), function (day, dayNumber) {
					days[dayNumber] || (days[dayNumber] = {});
				
					_.each(day, function (eventsId, timeline) {
						days[dayNumber][timeline] || (days[dayNumber][timeline] = []);
						
							_.each(eventsId, function (eventId) {
								days[dayNumber][timeline].push(eventId);
								days[dayNumber][timeline] = _.flatten(days[dayNumber][timeline]);
								days[dayNumber][timeline] = _.uniq(days[dayNumber][timeline]);						
							}, this);
					}, this);
				}, this);
			};

			attributes = {
				'startDate': String(rightWeek.get('startDate')),
				'days': rightWeek.get('days')
			};
		
			rightWeek.save(attributes);
		
		},

		deleteEvent: function (week) {
			var rightWeek = this.findWhere({weekNumber: week.get('weekNumber')}),
				days = week.get('days'),
				rightDay = rightWeek.get('days')[Object.keys(days)],
				currentEvents;

				_.each(days, function (day, dayNumber) {

					_.each(day, function (eventId, timeline) {

						currentEvents = rightDay[timeline];
						currentEvents.splice(currentEvents.indexOf( Number(eventId)), 1);

						if (_.isEmpty(currentEvents)) {
							delete rightDay[timeline]
						};
						if (_.isEmpty(rightDay)) {
							delete rightWeek.get('days')[dayNumber]
						};
						if (_.isEmpty(rightWeek.get('days'))) {
							this.remove(this.models[this.models.indexOf(rightWeek)]);
						};
					}, this)
				}, this);

			if (_.isEmpty(rightWeek.get('days'))) {
				rightWeek.destroy();
			} else {
				rightWeek.save();
			};
		}
	})
})(App.Schedule);