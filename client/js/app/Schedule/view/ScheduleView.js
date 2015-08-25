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
			this.checkHolidays();
			this.checkConglictsInCells();
		},

		chooseWeek: function () {
			var rightWeek = collections.scheduleCollection.findWhere({weekNumber: this.currentWeekNumber});
			
			if (rightWeek) {
				_.each(rightWeek.get('days'), this.showDay, this)
			};
		},

		showDay: function (day, dayNumber) {	
			var $elements,
				event;	
			_.each(day, function (timelines, key) {
				$elements = this.$el.find('tr[timeline="' + key + '"]');
				$elements = $elements.find('td[day="' + dayNumber + '"]');
					_.each(timelines, function (eventId) {
						event = collections.eventsCollection.findWhere({id: Number(eventId)});
						if (event) {
							$elements.append(this.createCell(event, dayNumber, key, this.$el))
						};
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

		checkHolidays: function () {
			var holidayView,
				date,
				$cells;
			this.$el.find('.holidayCell').remove();

			collections.holidaysCollection.each(function (holiday) {
				if (holiday.skipped().skip) {
					date = new Date(holiday.get('date'));
				
					if (date.getWeekNumber() === this.currentWeekNumber) {

						$cells = this.$el.find('td[day="' + date.getDay() + '"]');
						$cells.each(function (i, el) {			

							holidayView = new This.HolidayView({model: holiday});
							$(el).append(holidayView.render().el);
						});
					};
				};
			}, this);
		},

		renderSelectedEvent: function (event) {
			var $target = $(event.currentTarget),
				accept = $target.find('.conflictCell, .holidayCell'),
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

		checkAvailableCells: function (_event) {
			var selectedEvent = (_event)? _event: this.selectedEvent,
				resources,
				conflictView,
				weekItem,
				conflicts,
				event,
				$cell;
				
			this.$el.find('.conflictCell').remove();

			if (selectedEvent) {
				weekItem = collections.scheduleCollection.findWhere({'weekNumber': this.currentWeekNumber});
				resources = selectedEvent.get('resources');

				_.each(weekItem.get('days'), function (timelines, dayNumber) {
					_.each(timelines, function (eventsId, timeline) {
						_.each(eventsId, function (id) {
							event = collections.eventsCollection.findWhere({'id': id});
							conflicts = _.intersection(event.get('resources'), resources);

							if (!_.isEmpty(conflicts)) {
								$cell = this.$el.find('tr[timeline="' + timeline + '"]');
								$cell = $cell.find('td[day="' + dayNumber + '"]');

								if ($cell.children('.conflictCell').length === 0) {
									conflictView =  new This.ConflictView();

									$cell.append(conflictView.render().el);

									if (this.isOneChild($cell, selectedEvent.get('id'))) {
										$cell.find('.conflictCell').hide();
									};
								};
							};
						}, this);
					}, this);
				}, this);
			};
		},

		isOneChild: function ($cell, eventId) {
			var $children = $cell.children('.calendarCellDiv'),
				cellEvent = Number($children.attr('event'));
				isOne = false;

			if ($children.length === 1 && cellEvent === eventId) {
				isOne = true;
			};

			return isOne;
		},

		checkConglictsInCells: function () {
			var weekItem = collections.scheduleCollection.findWhere({'weekNumber': this.currentWeekNumber}),
				conflictView,
				$elements;

			this.$el.find('.extendedConflictCell').remove();
			_.each(weekItem.get('days'), function (timelines, dayNumber) {
				_.each(timelines, function (eventsId, timeline) {

					if (This.isConflicts(eventsId)) {
						conflictView = new This.ExtendedConflictView();
						conflictView.setEvents(eventsId);
						$elements = this.$el.find('tr[timeline="' + timeline + '"]');
						$elements = $elements.find('td[day="' + dayNumber + '"]');

						$elements.append(conflictView.render().el);
					}
				}, this);
			}, this);
		}
 	});
})(App.Schedule);