(function (This) {
	This.ScheduleConfirmView = App.Messenger.ConfirmView.extend({
        template: templates.scheduleConfirmTpl,

        set: function (callbackYes, yesOptions, callback, messageOptions) {
        	this.callbackYes = callbackYes;
        	this.yesOptions = yesOptions;
            this.callback = callback;
            this.messageOptions = messageOptions;
        },

        delete: function () {

            this.callbackYes(this.yesOptions);
            this.remove();
            this.callback();
        },

        close: function () {
            
            this.remove();
            this.callback();
        },

        render: function () {
            this.createMessage();
            this.$el.html(this.template({message: this.message, newEvent: this.newWeekName, oldEvent: this.oldWeekName}))
                .removeClass('hidden');

            return this;
        },

        createMessage: function () {
            var oldDays = this.messageOptions.oldWeek.get('days'),
                oldDayNumber = Object.keys(oldDays),
                oldTimeline = Object.keys(oldDays[oldDayNumber]),
                oldEventId = Number(oldDays[oldDayNumber][oldTimeline]),
                oldEvent = collections.eventsCollection.get(oldEventId),
                conflictsDate = new Date (this.messageOptions.oldWeek.get('startDate')),
                newDays = this.messageOptions.newWeek.get('days'),
                newEventId = Number(newDays[oldDayNumber][oldTimeline]),
                newEvent = collections.eventsCollection.get(newEventId);

            conflictsDate.setDate(conflictsDate.getDate() + (oldDayNumber - 1));

            this.message = oldEvent.get('name') + ' and ' + newEvent.get('name') + ' use the same resources at ' 
                            + This.daysName[oldDayNumber] + ' ' + This.DateNormalize(conflictsDate.getMonth() + 1) + '-'
                            + This.DateNormalize(conflictsDate.getDate()) + '-' + conflictsDate.getFullYear();

            this.newWeekName = newEvent.get('name');
            this.oldWeekName = oldEvent.get('name');

        }
	})
})(App.Schedule);