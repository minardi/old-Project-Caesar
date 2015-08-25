(function (This){
	This.CloneEventsView = Backbone.View.extend({
		template: templates.cloneEventsTpl,
		$table: '',

		events: {
			'click .weeks': 'clonetoWeeks',
			'click .days': 'clonetoDays',
			'click .endDays': 'clonetoEndOfDays',
			'click .endWeeks': 'clonetoEndOfWeeks',
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

				this.checkResourcesConflicts(temp);
			}
		},

		cloneToSelectedDay: function (event) {
			var dayNumber = $(event.currentTarget).attr('attribute'),
				weekItem = this.generateWeekItem(),
				cloneWeekItem = weekItem.clone(),
				cloneDays = {};

			_.each(weekItem.get('days'), function (day) {
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

		clonetoEndOfDays: function () {
			var weekItem = this.generateWeekItem(),
				weekItemToClone,
				currentDate,
				saturdayDayNumber = 6,
				sundayDayNumber = 0,
				event,
				finish,
				resources;

			_.each(weekItem.get('days'), function (day, dayNumber) {
				_.each(day, function (events, timeline) {
					_.each(events, function (id) {
						event = collections.eventsCollection.findWhere({'id': id});
						resources = this.getGroupsWithFinishDate(event);
				
						currentDate = new Date(weekItem.get('startDate'));
						currentDate.setDate(currentDate.getDate() + (dayNumber - 1));

						_.each(resources, function (finishDate, resourceId) {
							finish = new Date(finishDate);
						
							while (currentDate <= finish) {
								currentDate.setDate(currentDate.getDate() + 1);
							

								if ((currentDate.getDay() < saturdayDayNumber ) && (currentDate.getDay() > sundayDayNumber)) {
									weekItemToClone = This.createWeekItem({
																'startDate': This.getFisrtDayOfWeek(currentDate),
																'dayNumber': currentDate.getDay(),
																'timeline': timeline,
																'eventId': id
									});
								
									this.checkResourcesConflicts(weekItemToClone);
								};
							};
						}, this);
					}, this);
				}, this)
			}, this);
		},

		clonetoEndOfWeeks: function () {
			var weekItem = this.generateWeekItem(),
				daysNumInWeek = 7,
				weekItemToClone,
				currentDate,
				event,
				finish,
				resources;

			_.each(weekItem.get('days'), function (day, dayNumber) {
				_.each(day, function (events, timeline) {
					_.each(events, function (id) {
						event = collections.eventsCollection.findWhere({'id': id});
						resources = this.getGroupsWithFinishDate(event);
				
						currentDate = new Date(weekItem.get('startDate'));
						currentDate.setDate(currentDate.getDate() + (dayNumber - 1));

						_.each(resources, function (finishDate, resourceId) {
							finish = new Date(finishDate);
							currentDate.setDate(currentDate.getDate() + daysNumInWeek);

							while (currentDate <= finish) {
								weekItemToClone = This.createWeekItem({
											'startDate': This.getFisrtDayOfWeek(currentDate),
											'dayNumber': currentDate.getDay(),
											'timeline': timeline,
											'eventId': id
									});
								this.checkResourcesConflicts(weekItemToClone);
								currentDate.setDate(currentDate.getDate() + daysNumInWeek);
							};
						}, this);
					}, this);
				}, this);
			},this);
		},

		getGroupsWithFinishDate: function (event) {
			var resources = event.get('resources'),
				resType,
				oneRes,
				resourcesWithDate = {};

			_.each(resources, function (id) {
				oneRes = collections.resouresCollection.findWhere({'id': id});
				resType = oneRes.get('type');
				resType = collections.resourceTypes.findWhere({'id': Number(resType)});

				if (resType.get('name') === 'group') {
					resourcesWithDate[id] = oneRes.get('dateFinish');
				};
			}, this);

			return resourcesWithDate;
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
				actualDays,
				actualEvent, 
				isCellFonflict = false;
				event;
	
			this.conflicts = [];
			this.noConflicts = [];

			if (actualWeek) {
				actualDays = actualWeek.get('days');

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
			} else {
				collections.scheduleCollection.addEvent(weekItemToClone);
			}
			

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
				date,
				dayNumber,
				timeline,
				eventId,
				message;

			if (!_.isEmpty(this.conflicts)) {
				dayNumber = Number(Object.keys(this.conflicts[0].get('days')));

				date = this.conflicts[0].get('startDate');
				date.setDate(date.getDate() + (dayNumber - 1));
				timeline = Object.keys(this.conflicts[0].get('days')[dayNumber]);

				eventId = Number(Object.keys(this.conflicts[0].get('days')[dayNumber][timeline]));

				eventName = collections.eventsCollection.findWhere({'id': eventId});
				eventName = eventName.get('name');

				message = 'Resources conflicts found: ' + date.toDateString() + This.daysName[dayNumber] + ' at  ' + timeline + ' : ' + eventName;
		
				this.showConfirm(message, this.deleteConflictEvent, 
														{
															'conflictWeekItem': this.conflicts[0].clone(),
															'weekItemtoCopy': this.noConflicts[0].clone()
														}, this.solveConflict.bind(this));

				this.conflicts.shift();
				this.noConflicts.shift();
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