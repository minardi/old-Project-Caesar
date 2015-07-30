(function (This) {
	This.CalendarView = Backbone.View.extend({
		tagName: 'table',
		template: calendarRowTpl,

		initialize: function () {
			this.$el.addClass('calendarTable ');
			this.timelines = {
				'1': '7:00',
				'2': '7:30',
				'3': '8:00',
				'4': '8:30',
				'5': '9:00',
				'6': '9:30',
				'7': '10:00',
				'8': '10:30',
				'9': '11:00',
				'10': '11:30',
				'11': '12:00',
				'12': '12:30',
				'13': '13:00',
				'14': '13:30',
				'15': '14:00',
				'16': '14:30',
				'17': '15:00',
				'18': '16:00',
				'19': '16:30',
				'20': '17:00',
				'21': '17:30',
				'22': '18:00'
			};
			this.days = {
				'Monday': 1,
				'Tuesday': 2,
				'Wednesday': 3,
				'Thursday': 4,
				'Friday': 5
			};
			this.getStartDate();

			$(this.$el).on('click', this.renderSelectedEvent.bind(this));
		},

		setCollection: function (_collection) {
			this.collection = _collection;
		},

		setupSelectedEvent: function (event) {
			this.currentEvent = event;
		},

		getStartDate: function () {
			var date = new Date();
			date = date.adjustDate(-(date.getDay() -1));
			this.startDate = date;

		},

		setStartDate: function (_startdate) {
			this.startDate = _startdate;
			this.weekNumber = this.startDate.getWeekNumber();
		},

		renderSelectedEvent: function (event) {
			var daysReverce = {
					'1': 'Monday',
					'2': 'Tuesday',
					'3': 'Wednesday',
					'4': 'Thursday',
					'5': 'Friday'
				},
				$target = ($(event.target).attr('day'))? $(event.target): $(event.target.parentElement),
				dayNumber = daysReverce[$target.attr('day')],
				timeline = $target.attr('timeline');
				cs.mediator.publish('DaySelected', dayNumber, timeline, this.currentEvent.get('id'), this.startDate);		
		},

		renderGrid: function () {
			var daysTpl = daysRowTpl;
			this.getStartDate();
			this.$el.append(daysTpl({'startDate': this.startDate}));

			_.each(this.timelines, function (value) {
				this.$el.append(this.template({'day': 1, 'timeline': value}));
			}, this);
		},

		render: function () {
			this.renderGrid();
			return this;
		},

		showDay: function (day, name) {
			var dayNum = this.days[name],
				$elements,
				event;
			
			_.each(day, function (values, key) {
					$elements = this.$el.find('td[day=' + dayNum + '][timeline="' + key + '"]');
					_.each(values, function (eventId) {
						event = this.collection.findWhere({id: Number(eventId)});
						event && ($elements.append(this.createCell(event.get('name'))));
					}, this)
			}, this);
		},

		createCell: function (value) {
			$div = $('<div>' + value + '</div>');
			$div.addClass('calendarCell');
			return $div;
		},

		showEvents: function (week) {
			this.$el.empty();
			this.renderGrid();
			this.showDay(week.get('Monday'), 'Monday');
			this.showDay(week.get('Tuesday'), 'Tuesday');
			this.showDay(week.get('Wednesday'), 'Wednesday');
			this.showDay(week.get('Thursday'), 'Thursday');
			this.showDay(week.get('Friday'), 'Friday');
		}
	})
})(App.Calendar);