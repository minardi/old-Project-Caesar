(function (This) {
	This.ConflictsInCellView = Backbone.View.extend({
				
		checkConflicts: function () {
			var conflictDate;

			this.dateCollection = [];

			collections.scheduleCollection.each(function (week) {
				_.each(week.get('days'), function (timelines, dayNumber) {
					_.each(timelines, function (eventsId, timeline) {		
						if (This.isConflicts(eventsId)) {
							conflictDate = new Date(week.get('startDate'));
							conflictDate.setDate(conflictDate.getDate() + (dayNumber - 1));
					
							this.dateCollection.push(conflictDate.toDateString());
						}
					}, this);
				}, this);
			}, this);

			this.dateCollection = _.uniq(this.dateCollection);
		},

		showConflicts: function () {
			_.each(this.dateCollection, function (date) {
				this.$el.append('<br>' + date);
			}, this);
		},

		render: function () {
			this.$el.html('Conflicts are found on:');
			this.checkConflicts();
			this.showConflicts();
			
			return this;
		}
	})
})(App.Schedule);
