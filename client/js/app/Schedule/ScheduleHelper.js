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

	This.createWeekItem = function (dayNumber, timeline, eventId, _startDate) {
			var dayTimeline = {},
				day = {},
				week = new This.Week();

			dayTimeline[timeline] = [eventId];
			day[dayNumber] = dayTimeline;
			week.set({
				'startDate': _startDate,
				'days': day
			});

			return week;
	}

})(App.Schedule);