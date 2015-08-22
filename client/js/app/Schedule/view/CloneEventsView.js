(function (This){
	This.CloneEventsView = Backbone.View.extend({
		template: templates.cloneEventsTpl,
		$table: '',

		events: {
			'click .weeks': 'clonetoWeeks',
			'click .days': 'clonetoDays'
		},

		render: function () {
			this.$el.html(this.template());
			return this;
		},

		setTableEl: function (_table) {
			this.$table = _table;
			this.$table.on('contextmenu', '.chooseDay', this.cloneToSelectedDay.bind(this));
			this.$table.on('click', '.chooseTimeline, .chooseWeek, .chooseDay', this.chooseTimelineDay.bind(this));
		},

		chooseTimelineDay: function (event) {
			var $target = $(event.currentTarget),
				targetClass = $target.attr('class').match(/choose.*/),
				attr = $target.attr('attribute'),
				findAttr = {
					'chooseDay': 'td[day="' + attr + '"]',
					'chooseTimeline': 'td[timeline="' + attr + '"]',
					'chooseWeek': 'td[timeline]'
				};				

			if ($target.attr('checked')) {
				this.$table.find(findAttr[targetClass]).removeClass('selectedCell');
				$target.attr('checked', false);
			} else {
				this.$table.find(findAttr[targetClass]).addClass('selectedCell');
				$target.attr('checked', true);
			}
		},

		generateWeekItem: function () {
			var $elements = this.$table.find('.selectedCell .calendarCellDiv'),
				startDate = this.$table.attr('startDate'),
				weekItem = new This.Week({'startDate': startDate}),
				dayArray = this.getDays($elements),
				daysHash  = {},
				context = this,
				$day;	
				
			_.each(dayArray, function (dayNumber) {
				$day = $elements.parent('td[day=' + dayNumber + ']');

				$day.each(function (i, el) {
					daysHash[dayNumber] = context.getTimelinesByDay(dayNumber, $day);
				});

			}, this);

			weekItem.set('days', daysHash);
			return weekItem;
		},

		getDays: function ($elements) {
			var dayNumber,
				days = [];

			$elements.each(function (i, el) {
				dayNumber = $(el).parent().attr('day');
				if (days.indexOf(dayNumber) < 0) {
					days.push(dayNumber);
				};
			});

			return days;
		}, 

		getTimelinesByDay: function (dayNumber, $elements) {
			var id = [],
				rez = {};

			$elements.each( function (i, el) {
				id = [];

				$(el).children().each(function (i, child) {
					if ($(child).attr('event')) {
						id.push(Number($(child).attr('event')));
					}
				});

				rez[$(el).attr('timeline')] = id;
			});

			return rez;	

		},

		clonetoWeeks: function () {
			var weekNum = this.$el.find('.weeksNumber').val(),
				weekItem = this.generateWeekItem(),
				date = new Date(weekItem.get('startDate')),
				temp,
				i;

			for (i = 0; i < weekNum; i++) {
				date.setDate(date.getDate() + 7);
				temp = weekItem.clone();
				temp.set('startDate', date);

				collections.scheduleCollection.addEvent(temp);
			}
		},

		cloneToSelectedDay: function (event) {
			var dayNumber = $(event.currentTarget).attr('attribute'),
				weekItem = this.generateWeekItem(),
				cloneWeekItem = weekItem.clone(),
				days = weekItem.get('days'),
				cloneDays = {};

			_.each(days, function (day) {
				this.addTimelinesToDay(day, dayNumber, cloneDays);
			}, this);
			
			cloneWeekItem.set('days', cloneDays);
			
			this.checkResourcesConflicts(cloneWeekItem);
			return false;
		},

		clonetoDays: function () {
			var daysNum = this.$el.find('.weeksNumber').val(),
				weekItem = this.generateWeekItem(),
				cloneWeekItem = weekItem.clone(),
				dayCollection = cloneWeekItem.get('days'),
				clodeDayCollection = {},
				i;

			_.each(dayCollection, function (day, dayNumber) {
				for (i = 0; i < daysNum; i++) {
					dayNumber ++;
					if (dayNumber < 6) {
						this.addTimelinesToDay(day, dayNumber, clodeDayCollection);
						
					}
				}
			}, this);

			cloneWeekItem.set('days', clodeDayCollection);
			this.checkResourcesConflicts(cloneWeekItem);
			
		},

		addTimelinesToDay: function (day, dayNumber, cloneDaysCollection) {
			var events;
			if (cloneDaysCollection[dayNumber]) {
				_.each(day, function (event, timeline) {
					if (cloneDaysCollection[dayNumber][timeline]) {
						events = _.flatten(day[timeline]);
						cloneDaysCollection[dayNumber][timeline].push(events);	
					
						cloneDaysCollection[dayNumber][timeline] = _.flatten(cloneDaysCollection[dayNumber][timeline]);
					} else {
						cloneDaysCollection[dayNumber][timeline] = day[timeline];
					}
				});
			} else {
				cloneDaysCollection[dayNumber] = day;
			};
		},

		checkResourcesConflicts: function (weekItemToClone) {
			var daysToClone = weekItemToClone.get('days'),
				actualWeek = collections.scheduleCollection.findWhere({'weekNumber': weekItemToClone.get('weekNumber')}),
				actualDays = actualWeek.get('days'),
				actualEvent, 
				isCellFonflict = false;
				event;
	
			this.conflicts = [];
			this.noConflicts = [];
			this.conflictsEventsId = [];

			_.each(daysToClone, function (timelines, dayNumber) {
				_.each(timelines, function (eventsToCopy, timeline) {
						if (!actualDays[dayNumber] || !actualDays[dayNumber][timeline]) {
							this.addEventsToWeek({
								'startDate': actualWeek.get('startDate'),
								'dayNumber': dayNumber,
								'timeline': timeline,
								'events': eventsToCopy
							});
						} else {
							_.each(eventsToCopy, function (eventId) {
								event = collections.eventsCollection.findWhere({'id': eventId});
								isCellFonflict = false;

								_.each(actualDays[dayNumber][timeline], function (actualEventId) {

									if (eventId !== actualEventId) {
										event = collections.eventsCollection.findWhere({'id': eventId});
										actualEvent = collections.eventsCollection.findWhere({'id': actualEventId});

										if (!(_.isEmpty(_.intersection(event.get('resources'), actualEvent.get('resources'))))) 
										{
											this.conflicts.push(This.createWeekItem({
												'startDate': actualWeek.get('startDate'),
												'dayNumber': dayNumber,
												'timeline': timeline,
												'eventId': actualEventId
											}));

											this.noConflicts.push(This.createWeekItem({
												'startDate': actualWeek.get('startDate'),
												'dayNumber': dayNumber,
												'timeline': timeline,
												'eventId': eventId
											}));

											this.conflictsEventsId.push(actualEventId);

											isCellFonflict = true;
										};

									};

								}, this);

								if (!isCellFonflict) {
									this.addEventsToWeek({
											'startDate': actualWeek.get('startDate'),
											'dayNumber': dayNumber,
											'timeline': timeline,
											'events': eventId
											});
								};
							}, this);
						}
					
				}, this);
			}, this);	

			this.solveConflict();
		},

		addEventsToWeek: function (options) {
			var weekItem = This.createWeekItem({
					'startDate': options.startDate,
					'dayNumber': options.dayNumber,
					'timeline': options.timeline,
					'eventId': options.events
			});

			collections.scheduleCollection.addEvent(weekItem);
			cs.mediator.publish('EventsCloned');
		},

		solveConflict: function () {
			var	eventName,
				startDate,
				dayNumber,
				timeline,
				eventId,
				message;

			if (!_.isEmpty(this.conflicts)) {
				startDate = this.conflicts[0].get('startDate');
				dayNumber = Number(Object.keys(this.conflicts[0].get('days')));
				timeline = Object.keys(this.conflicts[0].get('days')[dayNumber]);

				eventId = Number(Object.keys(this.conflicts[0].get('days')[dayNumber][timeline]));

				eventName = collections.eventsCollection.findWhere({'id': this.conflictsEventsId[0]});
				eventName = eventName.get('name');

				message = 'Resources conflicts found: '+ startDate.toDateString() + ' ' + This.daysName[dayNumber] + ' at  ' + timeline + ' : ' + eventName;
		
				this.showConfirm(message, this.deleteConflictEvent, 
														{
															'conflictWeekItem': this.conflicts[0].clone(),
															'weekItemtoCopy': this.noConflicts[0].clone()
														}, this.solveConflict.bind(this));

				this.conflicts.shift();
				this.noConflicts.shift();
				this.conflictsEventsId.shift();
			};

		},

		showConfirm: function (message, Yescallback, options, callback) {
			var confirmView = new This.ScheduleConfirmView();
            confirmView.set(message, Yescallback, options, callback);

            $('#confirm').html(confirmView.render().el);
		},

		deleteConflictEvent: function (options) {

			collections.scheduleCollection.deleteEvent(options.conflictWeekItem);
			collections.scheduleCollection.addEvent(options.weekItemtoCopy);

			cs.mediator.publish('EventsCloned');
		}
	})
})(App.Schedule);