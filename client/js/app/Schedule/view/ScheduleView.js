(function (This) {
	This.ScheduleView = This.CalendarView.extend({
		direction: 0,

		events: {
			'click td[class=calendarCell]': 'renderSelectedEvent'
		},

		setDirection: function (_direction) {
			this.direction = _direction;
		},

		setupSelectedEvent: function (event) {
			this.selectedEvent = event;
		},

		getElement: function () {
			return this.$el;
		},

		renderEvents: function () {
			this.chooseWeek();
			//this.checkHolidays();
		},

		chooseWeek: function () {
			var rightWeek = collections.scheduleCollection.findWhere({weekNumber: this.currentWeekNumber});
			
			rightWeek && (_.each(rightWeek.get('days'), this.showDay, this));
		},

		checkHolidays: function () {
			var holidays = new App.Holidays.HolidaysCollection(),
				holidayView,
				week,
				date,
				$cells;
			this.$el.find('.holidayCell').remove();

			_.each(holidays.models, function (holiday) {
				date = new Date(holiday.get('date'));
				week = date.getWeekNumber();
				if (week === this.currentWeekNumber) {
					
					$cells = this.$el.find('td[day="' + date.getDay() + '"]');
					$cells.each(function (i, el) {						
						holidayView = new This.HolidayView({model: holiday});
						($(el).has('div').length) && (holidayView.changeSize($(el))); 
						$(el).append(holidayView.render().el);
					});
				};
			}, this);
		},

		showDay: function (day, dayNumber) {	
			var $elements,
				event;	
			_.each(day, function (timelines, key) {
				$elements = this.$el.find('tr[timeline="' + key + '"]');
				$elements = $elements.find('td[day="' + dayNumber + '"]');
					_.each(timelines, function (eventId) {
						event = collections.eventsCollection.findWhere({id: Number(eventId)});
						event && ($elements.append(this.createCell(event, dayNumber, key, this.$el)));
					}, this);
			}, this);
		},

		createCell: function (event, dayNumber, timeline, $table) {
			var scheduleCellView = new This.ScheduleCellView({model: event});

			scheduleCellView.setDayNumber(dayNumber);
			scheduleCellView.setTimeline(timeline);
			scheduleCellView.setTable($table);

			return scheduleCellView.render().el;
		},

		renderSelectedEvent: function (event) {
			var $target = $(event.currentTarget),
				accept = $target.find('.conflictCell'),
				dayNumber,
				timeline;


			if (this.selectedEvent && !accept.length) {
					dayNumber = $target.attr('day'),
					timeline = $target.parent().attr('timeline');
				$target.append(this.createCell(this.selectedEvent, dayNumber, timeline, this.$el));

				this.addEventToCollection(dayNumber, timeline, this.selectedEvent.get('id'));

				this.checkAvailableCells();
			}
		},

		addEventToCollection: function (dayNumber, timeline, eventId) {
			var weekItem = This.createWeekItem({'dayNumber': dayNumber, 
												'timeline': timeline, 
												'eventId': eventId, 
												'startDate': this.startDate});
			collections.scheduleCollection.addEvent(weekItem);
		},

		checkAvailableCells: function (_event, _table) {
			var selectedResources,
				event = (_event)? _event: this.selectedEvent,
				$table = (_table)? _table: this.$el,
				$eventsCells = this.$el.find('.calendarCellDiv'),
				conflictView;

			$table.find('.conflictCell').remove();
			if (event) {
				selectedResources = event.toJSON()['resources'],
				$eventsCells = $table.find('.calendarCellDiv'),
	
				$eventsCells.each( function (i, el) {
					
					conflictView = new This.ConflictView($(el).attr('resources'), selectedResources);
					if (conflictView.isConflict === true) {
						conflictView.changeSize($(el).parent());
						$(el).parent().append(conflictView.render().el);

					};
				});
			};
		}
 	});
})(App.Schedule);