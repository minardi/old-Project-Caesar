(function (This){
	This.CloneEventsView = Backbone.View.extend({
		template: templates.cloneEventsTpl,
		$table: '',

		events: {
			'click button': 'generateWeekItem'
		},

		initialize: function () {
		
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
				$els,
				cloneMode = this.$el.find('.cloneMode'),
				startDate = this.$table.attr('startDate'),
				days = this.getDays($elements),
				daysHash  = {},
				context = this,
				weekItem = new This.Week({'startDate': startDate});

			_.each(days, function (dayNumber) {
				$els = $elements.parent('td[day=' + dayNumber + ']');
				$els.each(function (i, el) {
					daysHash[dayNumber] = context.getTimelinesByDay(dayNumber, $els);
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
			var children,
				id = [],
				rez = {};

			$elements.each( function (i, el) {

				$children = $(el).children();
				id = [];
				$children.each(function (i, child) {
					if ($(child).attr('event')) {
						id.push($(child).attr('event'));
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
						if (clodeDayCollection[dayNumber]) {
							_.each(day, function (event, timeline) {
									if (clodeDayCollection[dayNumber][timeline]) {
										clodeDayCollection[dayNumber][timeline].push(day[timeline]);
										
									} else {
											clodeDayCollection[dayNumber][timeline] = day[timeline];
									}
							});
						} else {
							clodeDayCollection[dayNumber] = day;
						}
						
					}
				}
			});
			console.log(clodeDayCollection);
			cloneWeekItem.set('days', clodeDayCollection);
			collections.scheduleCollection.addEvent(cloneWeekItem);
		}
	})
})(App.Schedule);