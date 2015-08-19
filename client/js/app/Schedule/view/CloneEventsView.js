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
			collections.scheduleCollection.addEvent(cloneWeekItem);

			cs.mediator.publish('EventsCloned');
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
			collections.scheduleCollection.addEvent(cloneWeekItem);
			cs.mediator.publish('EventsCloned');
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

		checkResourcesConflicts: function (weekItem) {
			var weekNumber = weekItem.get('weekNumber'),
				updatedDays = weekItem.get('days'),
				rightWeek = collections.scheduleCollection.findWhere({'weekNumber': weekNumber}),
				days = rightWeek.get('days'),
				resources = [],
				updateRecources = [],
				conflicts = [],
				deletedWeekItem,
				message,
				eventName,
				events = [];

			_.each(updatedDays, function (timelines, dayNumber) {
				_.each(timelines, function (eventsId, timeline) {
				
						if (days[dayNumber] && days[dayNumber][timeline]) {
							updateRecources = this. getResources(eventsId);
							
							events = _.difference(days[dayNumber][timeline], eventsId);
							_.each(events, function (id) {
								resources = this.getResources([id]);
								conflicts = _.intersection(updateRecources, resources);
								
								if (!_.isEmpty(conflicts)) {
									eventName = collections.eventsCollection.findWhere({'id': id});
									eventName = eventName.get('name');

									message = 'Resources conflicts found: day - ' + This.daysName[dayNumber] + 'at ' + timeline + eventName;

									cs.mediator.publish('Confirm', message, function () {
										deletedWeekItem = This.createWeekItem({
																		'startDate': weekItem.get('startDate'),
																		'timeline': timeline,
																		'dayNumber': dayNumber,
																		'eventId': id
																		});

										collections.scheduleCollection.deleteEvent(deletedWeekItem);
										cs.mediator.publish('EventsCloned');
									});
								}	
							}, this);			
						}
				}, this);
			}, this);

		
		},

		getResources: function (eventsId) {
			var resources = [],
				event;
		
			_.each(eventsId, function (id) {
				event = collections.eventsCollection.findWhere({'id': id});
				resources.push(event.get('resources'));

			});
			resources = _.flatten(resources);
			return resources;
		}
	})
})(App.Schedule);