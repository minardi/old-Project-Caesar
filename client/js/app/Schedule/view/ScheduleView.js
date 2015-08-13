(function (This) {
	This.ScheduleView = Backbone.View.extend({
		tagName: 'table',
		className: 'schedule table table-bordered',
		template: templates.calendarRowTpl,
		direction: 0,

		events: {
			'click td[class=calendarCell]': 'renderSelectedEvent'
		},

		setStartDate: function () {
			var date = new Date();

			(this.direction > 0) && (date.setDate(date.getDate() + 7 * this.direction));
			(this.direction < 0) && (date.adjustDate(this.direction * 7));

			this.startDate = this.getFisrtDayOfWeek(date);
			this.currentWeekNumber = this.startDate.getWeekNumber();
		},

		getFisrtDayOfWeek: function (date) {
			//find Monday's date with any date of week
			date = date.adjustDate(-(date.getDay() -1));
			return date;
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

		render: function () {
			this.renderGrid();
			this.delegateEvents();
			return this;
		},

	
		renderGrid: function () {
			var daysTpl = templates.daysRowTpl,
				$fragment = $(document.createDocumentFragment());

			this.setStartDate();
			$fragment.append(daysTpl({'startDate': this.startDate}));

			//return startDate value after template
			this.startDate.adjustDate(-4);

			_.each(This.timelines, function (value) {
				$fragment.append(this.template({'day': 1, 'timeline': value}));
			}, this);

			this.$el.attr('startDate', this.startDate);
			this.$el.html($fragment);
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

			holidays.push({"id": 0,
						  "name": "Labor Day",
						  "location": "Ukraine",
						  "date": "2015.08.06"});

			holidays.push({"id": 1,
						  "name": "Holiday",
						  "location": "Ukraine",
						  "date": "2015.08.12"});

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
						event && ($elements.append(this.createCell(event)));
					}, this);
			}, this);
		},

		createCell: function (event) {
			var scheduleCellView = new This.ScheduleCellView({model:event});
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
				$target.append(this.createCell(this.selectedEvent));

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
			var selectedResources,
				event = (_event)? _event: this.selectedEvent,
				$eventsCells = this.$el.find('.calendarCellDiv'),
				conflictView;

			this.$el.find('.conflictCell').remove();
			if (event) {
				selectedResources = event.toJSON()['resources'],
				$eventsCells = this.$el.find('.calendarCellDiv'),
	
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