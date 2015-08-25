(function (This) {
	This.timelines = {
		'1': '8:00',
		'2': '8:30',
		'3': '9:00',
		'4': '9:30',
		'5': '10:00',
		'6': '10:30',
		'7': '11:00',
		'8': '11:30',
		'9': '12:00',
		'10': '12:30',
		'11': '13:00',
		'12': '13:30',
		'13': '14:00',
		'14': '14:30',
		'15': '15:00',
		'16': '16:00',
		'17': '16:30',
		'18': '17:00',
		'19': '17:30',
		'20': '18:00'
	};

	This.daysName = {
		'1': 'Monday',
		'2': 'Tuesday',
		'3': 'Wednesday',
		'4': 'Thursday',
		'5': 'Friday'
	};

	This.createWeekItem = function (options) {
			var dayTimeline = {},
				day = {},
				week = new This.Week();

			dayTimeline[options.timeline] = [options.eventId];
			dayTimeline[options.timeline] = _.flatten(dayTimeline[options.timeline]);
			
			day[options.dayNumber] = dayTimeline;
			week.set({
				'startDate': options.startDate,
				'days': day
			});

			return week;
	};

	This.getFisrtDayOfWeek = function (date) {
		var tempDate = new Date(date);
		//find Monday's date with any date of week
		tempDate = tempDate.adjustDate(-(tempDate.getDay() -1));
		return tempDate;
	};

	This.isConflicts = function (eventsId) {
		var conflicts = [],
			isConflict = false,
			resources,
			event;

			_.each(eventsId, function (id) {
				event = collections.eventsCollection.findWhere({'id': id});
				resources = event.get('resources');

				conflicts = _.intersection(resources, conflicts);
				if (!_.isEmpty(conflicts)) {
					isConflict = true;
				};
				conflicts.push(resources);
				conflicts = _.flatten(conflicts);
			}, this);

		return isConflict;
	};
})(App.Schedule);