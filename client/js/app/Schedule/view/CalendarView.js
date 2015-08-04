(function (This) {
	This.ScheduleView = Backbone.View.extend({
		tagName: 'table',
		template: calendarRowTpl,
		direction: 0,

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
			var daysTpl = daysRowTpl,
				$fragment = $(document.createDocumentFragment());

			this.setStartDate();
			$fragment.append(daysTpl({'startDate': this.startDate}));

			//return startDate value after template
			this.startDate.adjustDate(-4);

			_.each(this.timelines, function (value) {
				$fragment.append(this.template({'day': 1, 'timeline': value}));
			}, this);

			this.$el.attr('startDate') = this.startDate;
			this.$el.html($fragment);
		},

		render: function () {
			this.renderGrid();
			this.$el.addClass('table table-bordered');
			this.delegateEvents();
			this.$el.children().children().addClass('calendarCell');
			return this;
		},

		setStartDate: function () {
			var date = new Date();
			console.log(this.direction);
			(this.direction > 0) && (date.setDate(date.getDate() + 7*this.direction));
			(this.direction < 0) && (date.adjustDate(this.direction));
			date = date.adjustDate(-(date.getDay() -1));
			this.startDate = date;
			this.currentWeekNumber = this.startDate.getWeekNumber();
		},

		renderEvents: function (_scheduleCollection) {
			this.scheduleCollection = _scheduleCollection;

			this.choseWeek();
		},

		choseWeek: function () {
			var rightWeek = this.scheduleCollection.findWhere({weekNumber: this.currentWeekNumber});
			rightWeek && (_.each(rightWeek.get('days'), this.showDay, this));
		},

		showDay: function (day, dayNumber) {	
			var $elements;	

			_.each(day, function (timelines, key) {
				$elements = this.$el.find('tr[timeline="' + key + '"]');
					$elements = $elements.find('td[day="' + dayNumber + '"]');
					_.each(timelines, function (eventId) {
						event = collections.eventsCollection.findWhere({id: Number(eventId)});
						event && ($elements.append(this.createCell(event)));
					}, this);
			}, this);
		},

		createCell: function (event) {
			var cellView = new This.ScheduleCellView(event);
	
			return cellView.render().el;
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

				this.addEventToCollection(dayNumber, timeline, this.selectedEvent.get('id'));
			}
		},

		addEventToCollection: function (dayNumber, timeline, eventId) {
			var dayTimeline = {},
				day = {},
				week = new This.Week();

			dayTimeline[timeline] = [eventId];
			day[dayNumber] = dayTimeline;
			week.set({
				'startDate': this.startDate,
				'days': day
			});

			this.scheduleCollection.addEvent(week);

			//delete before push
			cs.mediator.publish('test');
		},

		setDirection: function (_direction) {
			this.direction = _direction;
		}
	})
})(App.Schedule);