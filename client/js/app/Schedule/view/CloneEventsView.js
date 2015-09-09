(function (This){
	This.CloneEventsView = This.CloneToWeekDaysView.extend({

		clonetoEndOfDays: function () {
			var weekItem = this.generateWeekItem(),
				weeksCollection = new This.Schedule(),
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
									weeksCollection.push(weekItemToClone);
								};
							};
						}, this);
					}, this);
				}, this)
			}, this);

			this.unionWeeks(weeksCollection);
		},

		clonetoEndOfWeeks: function () {
			var weekItem = this.generateWeekItem(),
				daysNumInWeek = 7,
				weekItemToClone,
				weeksCollection = new This.Schedule(),
				currentDate,
				event,
				finish,
				resources;

			_.each(weekItem.get('days'), function (day, dayNumber) {
				_.each(day, function (events, timeline) {
					_.each(events, function (id) {
						event = collections.eventsCollection.get(id);
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
								weeksCollection.push(weekItemToClone);
								currentDate.setDate(currentDate.getDate() + daysNumInWeek);
							};
						}, this);
					}, this);
				}, this);
			},this);

			this.unionWeeks(weeksCollection);
		},

		unionWeeks: function (weeksCollection) {
			var weeksNumbers = _.uniq(weeksCollection.pluck('weekNumber')),
				weeks,
				weekToClone,
				daysToClone = {};

			_.each(weeksNumbers, function (weekNumber) {
				weeks = weeksCollection.where({'weekNumber': weekNumber});
				weekToClone = weeksCollection.findWhere({'weekNumber': weekNumber});

				_.each(weeks, function (week) {

					_.each(week.get('days'), function (day, dayNumber) {
						this.addTimelinesToDay(day, dayNumber, daysToClone);
					}, this);
				}, this);

				weekToClone.set('days', daysToClone);
				this.checkResourcesConflicts(weekToClone);

				daysToClone = {};
			}, this);
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
		}
	})
})(App.Schedule);