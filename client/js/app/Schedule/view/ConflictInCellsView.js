(function (This) {
	This.ConflictsInCellView = Backbone.View.extend({
				
		checkConflicts: function () {
			var conflictDate;

			collections.scheduleCollection.each(function (week) {
				_.each(week.get('days'), function (timelines, dayNumber) {
					_.each(timelines, function (eventsId, timeline) {		
						if (this.isConflicts(eventsId)) {
							conflictDate = new Date(week.get('startDate'));
							conflictDate.setDate(conflictDate.getDate() + (dayNumber - 1));
					
							this.$el.append('<br>' + conflictDate.toDateString());
						}
					}, this);
				}, this);
			}, this);
		},

		isConflicts: function (eventsId) {
			var conflicts = [],
				isConflict = false,
				resources,
				event;

			_.each(eventsId, function (id) {
				event = collections.eventsCollection.findWhere({'id': id});
				resources = event.get('resources');

				conflicts = _.intersection(resources, conflicts);
				if (!_.isEmpty(conflicts)) {
					isConflict = true;
				};
				conflicts.push(resources);
				conflicts = _.flatten(conflicts);
			}, this);

			return isConflict;
		},

		render: function () {
			this.$el.html('Conflicts are foind on:');
			this.checkConflicts();
			
			return this;
		}
	})
})(App.Schedule);
