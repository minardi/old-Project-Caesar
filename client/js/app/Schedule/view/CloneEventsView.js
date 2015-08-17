(function (This){
	This.CloneEventsView = Backbone.View.extend({
		template: templates.cloneEventsTpl,
		$table: '',

		events: {
			'click button': 'generateWeekItem'
		},

		render: function () {
			this.$el.html(this.template());
			return this;
		},

		setTableEl: function (_table) {
			this.$table = _table;
			this.$table.on('click', '[chooseDay]', this.chooseTimelineDay.bind(this));
			this.$table.on('click', '[chooseTimeline]', this.chooseTimelineDay.bind(this));
		},

		chooseTimelineDay: function (event) {
			var $target = $(event.currentTarget),
				attr = $target.attr('chooseDay')? $target.attr('chooseDay'): $target.attr('chooseTimeline'),
				tdAttr = $target.attr('chooseDay')? 'day': 'timeline';

			this.$table.find('td[' + tdAttr + '="' + attr + '"]').toggleClass('selectedCell');
		},


		generateWeekItem: function () {
			var $elements = this.$table.find('.selectedCell .calendarCellDiv'),
				startDate = this.$table.attr('startDate'),
				weekItem = new This.Week({'startDate': startDate}),
				cloneMode = this.$el.find('.cloneMode').val(),
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
			 if (cloneMode === '0') {
			 	this.clonetoWeeks(weekItem);	
			 } else {
			 	this.clonetoDays(weekItem);
			 }	
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

		clonetoWeeks: function (weekItem) {
			var weekNum = this.$el.find('.weeksNumber').val(),
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

		clonetoDays: function (weekItem) {
			
			var daysNum = this.$el.find('.weeksNumber').val(),
				cloneWeekItem = weekItem.clone(),
				dayCollection = cloneWeekItem.get('days'),
				clodeDayCollection = {},
				i;

			_.each(dayCollection, function (day, dayNumber, dayCollection) {
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

		addTimelinesToDay: function (day, dayNumber, clodeDayCollection) {
			var events;
			if (clodeDayCollection[dayNumber]) {
				_.each(day, function (event, timeline) {
					if (clodeDayCollection[dayNumber][timeline]) {
						events = _.flatten(day[timeline]);
						clodeDayCollection[dayNumber][timeline].push(events);	
					
						clodeDayCollection[dayNumber][timeline] = _.flatten(clodeDayCollection[dayNumber][timeline]);
					} else {
						clodeDayCollection[dayNumber][timeline] = day[timeline];
					}
				});
			} else {
				clodeDayCollection[dayNumber] = day;
			};
		}
	})
})(App.Schedule);