(function (This) {
	This.ScheduleView = Backbone.View.extend({
		tagName: 'table',
		template: templates.calendarRowTpl,
		direction: 0,

		events: {
			'click td:not(:nth-child(1)):not([class="calendarCell dangerCell"])': 'renderSelectedEvent'
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

		render: function () {
			this.renderGrid();
			this.$el.addClass('table table-bordered');
			this.delegateEvents();
			this.$el.children().children().addClass('calendarCell');
			return this;
		},

		setStartDate: function () {
			var date = new Date();

			(this.direction > 0) && (date.setDate(date.getDate() + 7*this.direction));
			(this.direction < 0) && (date.adjustDate(this.direction));

			date = date.adjustDate(-(date.getDay() -1));
			this.startDate = date;
			this.currentWeekNumber = this.startDate.getWeekNumber();
		},

		renderEvents: function (_scheduleCollection) {
			this.scheduleCollection = _scheduleCollection;

			this.choseWeek();
		},

		choseWeek: function () {
			var rightWeek = this.scheduleCollection.findWhere({weekNumber: this.currentWeekNumber});
			rightWeek && (_.each(rightWeek.get('days'), this.showDay, this));
		},

		showDay: function (day, dayNumber) {	
			var $elements;	

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
			var scheduleCellView = new This.ScheduleCellView({model:event, collection: this.scheduleCollection});
			return scheduleCellView.render().el;
		},

		//adding selectedEvent
		setupSelectedEvent: function (event) {

			this.selectedEvent = event;
		},

		renderSelectedEvent: function (event) {
		
			if (this.selectedEvent) {
				var $target = ($(event.target).attr('day'))? $(event.target): $(event.target.parentElement.parentElement),
					dayNumber = $target.attr('day'),
					timeline = $target.parent().attr('timeline');

				$target.append(this.createCell(this.selectedEvent));

				this.addEventToCollection(dayNumber, timeline, this.selectedEvent.get('id'));
			}

			this.checkAvailableCells();
		},

		addEventToCollection: function (dayNumber, timeline, eventId) {
			this.scheduleCollection.addEvent(This.createWeekItem(dayNumber, timeline, eventId, this.startDate));
		},

		setDirection: function (_direction) {
			this.direction = _direction;
		},

		checkAvailableCells: function () {
			if (this.selectedEvent) {
				var selectedResources = this.selectedEvent.toJSON()['resources'],
					$eventsCells = this.$el.children().children().children(),
					resources;
				this.$el.children().children().removeClass('dangerCell');

				$eventsCells.each( function () {
					resources = $(this).attr('resources');
					_.each(selectedResources, function (id) {
						(resources.indexOf(id) > 0) && $(this).parent().addClass('dangerCell');
					}, this)
				
				})
			}
		}
	});
})(App.Schedule);