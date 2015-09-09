(function (This){
	This.CloneToSelectedDayView = This.CloneToWeekDaysView.extend({
		
		events: {
			'click input[type="radio"]': 'setCloneParam',
			'click .weeks': 'chooseWeekClone',
			'click .days': 'chooseDaysClone',
			'click .copySelected': 'collectSelectedEvents',
		},

		cloneToSelectedDay: function (event) {
			var dayNumber = $(event.currentTarget).attr('attribute'),
				cloneWeekItem, 
				cloneDays = {};

			if (this.weekItem) {
				cloneWeekItem = this.weekItem.clone();

				_.each(this.weekItem.get('days'), function (day) {
					this.addTimelinesToDay(day, dayNumber, cloneDays);
				}, this);
				
				cloneWeekItem.set('days', cloneDays);
				cloneWeekItem.set('startDate', new Date(this.$table.attr('startdate')));
				
				this.checkResourcesConflicts(cloneWeekItem);
			};

			return false;
		}
	})
})(App.Schedule);