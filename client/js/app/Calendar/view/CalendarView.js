(function (This) {
	This.ScheduleView = Backbone.View.extend({
		tagName: 'table',
		template: calendarRowTpl,

		events: {
			'click td:not(:nth-child(1))': 'renderSelectedEvent'
		},

		initialize: function () {
			this.timelines = {
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
			this.$el.addClass('table table-bordered');
			this.$el.children().children().addClass('calendarCell');
			return this;
		},

		getStartDate: function () {
			var date = new Date();
			date = date.adjustDate(-(date.getDay() -1));
			this.startDate = date;
			this.startDate.setMonth(this.startDate.getMonth() + 1);

			this.currentWeekNumber = this.startDate.getWeekNumber();
		},

		renderEvents: function (_cheduleCollection) {
			this.cheduleCollection = _cheduleCollection;

			this.choseWeek();
		},

		choseWeek: function () {
			var rightWeek = this.cheduleCollection.findWhere({weekNumber: this.currentWeekNumber});
			_.each(rightWeek.get('days'), this.showDay, this);
		},

		showDay: function (day, dayNumber) {	
			var $elements;	

			_.each(day, function (timelines, key) {
				$elements = this.$el.find('tr[timeline="' + key + '"]');
					$elements = $elements.find('td[day="' + dayNumber + '"]');
					_.each(timelines, function (eventId) {
						event = collections.eventsCollection.findWhere({id: Number(eventId)});
						event && ($elements.append(this.createCell(event.get('name'))));
					}, this);
			}, this);
		},

		createCell: function (value) {
			$div = $('<div>' + value + '</div>');
			$div.addClass('calendarCellDiv');
			return $div;
		},

		//adding selectedEvent
		setupSelectedEvent: function (event) {
			this.selectedEvent = event;
		},

		renderSelectedEvent: function (event) {
			if (this.selectedEvent) {
				var $target = ($(event.target).attr('day'))? $(event.target): $(event.target.parentElement),
				dayNumber = $target.attr('day'),
				timeline = $target.parent().attr('timeline');
				$target.append(this.createCell(this.selectedEvent.get('name')));
				cs.mediator.publish('NewSheduleItemCreated', this.currentWeekNumber, dayNumber, timeline, this.selectedEvent.get('id'));
			}
		}
	})
})(App.Schedule);