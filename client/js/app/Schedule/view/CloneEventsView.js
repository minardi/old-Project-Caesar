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
			this.$table.on('click', '.chooseDay', this.chooseTimelineDay.bind(this));
			this.$table.on('contextmenu', '.chooseDay', this.cloneToSelectedDay.bind(this));
			this.$table.on('click', '.chooseTimeline', this.chooseTimelineDay.bind(this));
			this.$table.on('click', '.chooseWeek', this.chooseTimelineDay.bind(this));
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

			for (i = 1; i <= weekNum; i++) {
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
		}
	})
})(App.Schedule);