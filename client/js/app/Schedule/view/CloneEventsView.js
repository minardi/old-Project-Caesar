(function (This){
	This.CloneEventsView = Backbone.View.extend({
		tagName: 'button',
		className: 'btn btn-primary',
		$table: '',

		events: {
			'click': 'generateWeekItem'
		},

		initialize: function () {
		
		},

		render: function () {
			this.$el.html('Clone');
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
				dayNumber,
				timeline,
				eventId,
				weekItems = [];
			
			$elements.each( function (i, el) {
				eventId = $(el).attr('event');
				dayNumber = $(el).parent().attr('day');
				timeline = $(el).parent().attr('timeline');

				weekItems.push(This.createWeekItem({'dayNumber': dayNumber, 
												'timeline': timeline, 
												'eventId': eventId, 
												'startDate': startDate}));
			});

			this.clone(weekItems);
		},

		clone: function (weekItems) {
			var date;

			_.each(weekItems, function (item) {
				date = new Date(item.get('startDate'));
				date.setDate(date.getDate() + 7);
				item.set({'startDate': date});
				collections.scheduleCollection.addEvent(item);
				debugger;
			}, this);
		}
	})
})(App.Schedule);